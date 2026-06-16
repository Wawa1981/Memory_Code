// WebSocket Service - Django Channels integration
const WS_BASE = import.meta.env.VITE_WS_URL || 'ws://localhost:8000/ws';

class WebSocketService {
  constructor() {
    this.connections = {};
    this.listeners = {};
    this.reconnectAttempts = {};
    this.maxReconnectAttempts = 5;
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  connect(channel, path, onMessage) {
    if (this.connections[channel]?.readyState === WebSocket.OPEN) {
      return this.connections[channel];
    }

    const token = this.getToken();
    const url = `${WS_BASE}${path}?token=${token}`;
    const ws = new WebSocket(url);

    ws.onopen = () => {
      console.log(`[WS] Connected: ${channel}`);
      this.reconnectAttempts[channel] = 0;
      this.emit(channel, 'connected', {});
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (onMessage) onMessage(data);
      this.emit(channel, data.type, data);
    };

    ws.onclose = (event) => {
      console.log(`[WS] Disconnected: ${channel}`, event.code);
      this.emit(channel, 'disconnected', { code: event.code });
      
      // Auto-reconnect
      if (!event.wasClean && (this.reconnectAttempts[channel] || 0) < this.maxReconnectAttempts) {
        this.reconnectAttempts[channel] = (this.reconnectAttempts[channel] || 0) + 1;
        const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts[channel]), 30000);
        setTimeout(() => this.connect(channel, path, onMessage), delay);
      }
    };

    ws.onerror = (error) => {
      console.error(`[WS] Error: ${channel}`, error);
      this.emit(channel, 'error', { error });
    };

    this.connections[channel] = ws;
    return ws;
  }

  send(channel, data) {
    const ws = this.connections[channel];
    if (ws?.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(data));
    }
  }

  disconnect(channel) {
    const ws = this.connections[channel];
    if (ws) {
      ws.close(1000, 'Client disconnect');
      delete this.connections[channel];
      delete this.listeners[channel];
    }
  }

  disconnectAll() {
    Object.keys(this.connections).forEach(ch => this.disconnect(ch));
  }

  on(channel, eventType, callback) {
    const key = `${channel}:${eventType}`;
    if (!this.listeners[key]) this.listeners[key] = [];
    this.listeners[key].push(callback);
    return () => {
      this.listeners[key] = this.listeners[key]?.filter(cb => cb !== callback);
    };
  }

  emit(channel, eventType, data) {
    const key = `${channel}:${eventType}`;
    this.listeners[key]?.forEach(cb => cb(data));
  }

  // Game-specific connections
  connectToGame(gameId, onMessage) {
    return this.connect(`game_${gameId}`, `/game/${gameId}/`, onMessage);
  }

  connectToMatchmaking(onMessage) {
    return this.connect('matchmaking', '/matchmaking/', onMessage);
  }

  connectToChat(roomId, onMessage) {
    return this.connect(`chat_${roomId}`, `/chat/${roomId}/`, onMessage);
  }

  connectToLobby(onMessage) {
    return this.connect('lobby', '/lobby/', onMessage);
  }

  // Game actions via WebSocket
  sendFlip(gameId, cardIndex) {
    this.send(`game_${gameId}`, { type: 'flip_card', card_index: cardIndex });
  }

  sendChatMessage(roomId, message) {
    this.send(`chat_${roomId}`, { type: 'chat_message', message });
  }

  sendMatchmakingAction(action, data = {}) {
    this.send('matchmaking', { type: action, ...data });
  }
}

export const wsService = new WebSocketService();
export default wsService;