// WebRTC Service - Audio/Video communication
import wsService from './websocket';

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
];

class WebRTCService {
  constructor() {
    this.peerConnections = {};
    this.localStream = null;
    this.onRemoteStream = null;
    this.onLocalStream = null;
    this.signalingChannel = null;
    this.roomId = null;
  }

  async initMedia({ audio = true, video = false }) {
    try {
      this.localStream = await navigator.mediaDevices.getUserMedia({ audio, video });
      if (this.onLocalStream) this.onLocalStream(this.localStream);
      return this.localStream;
    } catch (error) {
      console.error('[WebRTC] Media access error:', error);
      throw error;
    }
  }

  joinRoom(roomId) {
    this.roomId = roomId;
    wsService.connect(`rtc_${roomId}`, `/rtc/${roomId}/`, (data) => {
      this.handleSignaling(data);
    });

    // Announce presence
    wsService.send(`rtc_${roomId}`, { type: 'join_room', room_id: roomId });
  }

  handleSignaling(data) {
    switch (data.type) {
      case 'user_joined':
        this.createOffer(data.user_id);
        break;
      case 'offer':
        this.handleOffer(data.user_id, data.offer);
        break;
      case 'answer':
        this.handleAnswer(data.user_id, data.answer);
        break;
      case 'ice_candidate':
        this.handleIceCandidate(data.user_id, data.candidate);
        break;
      case 'user_left':
        this.closePeer(data.user_id);
        break;
    }
  }

  createPeerConnection(userId) {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    // Add local tracks
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => {
        pc.addTrack(track, this.localStream);
      });
    }

    // Handle remote stream
    pc.ontrack = (event) => {
      if (this.onRemoteStream) {
        this.onRemoteStream(userId, event.streams[0]);
      }
    };

    // Handle ICE candidates
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        wsService.send(`rtc_${this.roomId}`, {
          type: 'ice_candidate',
          target_user_id: userId,
          candidate: event.candidate.toJSON(),
        });
      }
    };

    pc.onconnectionstatechange = () => {
      if (pc.connectionState === 'failed' || pc.connectionState === 'disconnected') {
        this.closePeer(userId);
      }
    };

    this.peerConnections[userId] = pc;
    return pc;
  }

  async createOffer(userId) {
    const pc = this.createPeerConnection(userId);
    const offer = await pc.createOffer();
    await pc.setLocalDescription(offer);
    
    wsService.send(`rtc_${this.roomId}`, {
      type: 'offer',
      target_user_id: userId,
      offer: pc.localDescription.toJSON(),
    });
  }

  async handleOffer(userId, offer) {
    const pc = this.createPeerConnection(userId);
    await pc.setRemoteDescription(new RTCSessionDescription(offer));
    const answer = await pc.createAnswer();
    await pc.setLocalDescription(answer);

    wsService.send(`rtc_${this.roomId}`, {
      type: 'answer',
      target_user_id: userId,
      answer: pc.localDescription.toJSON(),
    });
  }

  async handleAnswer(userId, answer) {
    const pc = this.peerConnections[userId];
    if (pc) {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    }
  }

  async handleIceCandidate(userId, candidate) {
    const pc = this.peerConnections[userId];
    if (pc) {
      await pc.addIceCandidate(new RTCIceCandidate(candidate));
    }
  }

  closePeer(userId) {
    const pc = this.peerConnections[userId];
    if (pc) {
      pc.close();
      delete this.peerConnections[userId];
    }
  }

  toggleAudio(enabled) {
    if (this.localStream) {
      this.localStream.getAudioTracks().forEach(track => {
        track.enabled = enabled;
      });
    }
  }

  toggleVideo(enabled) {
    if (this.localStream) {
      this.localStream.getVideoTracks().forEach(track => {
        track.enabled = enabled;
      });
    }
  }

  leaveRoom() {
    if (this.roomId) {
      wsService.send(`rtc_${this.roomId}`, { type: 'leave_room' });
      wsService.disconnect(`rtc_${this.roomId}`);
    }

    Object.keys(this.peerConnections).forEach(uid => this.closePeer(uid));

    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }

    this.roomId = null;
  }
}

export const webrtcService = new WebRTCService();
export default webrtcService;