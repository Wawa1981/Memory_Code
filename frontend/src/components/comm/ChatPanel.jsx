import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import wsService from '@/lib/websocket';

export default function ChatPanel({ roomId, username, isOpen, onClose }) {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!roomId || !isOpen) return;

    wsService.connectToChat(roomId, (data) => {
      if (data.type === 'chat_message') {
        setMessages(prev => [...prev, {
          id: Date.now(),
          sender: data.username,
          text: data.message,
          timestamp: new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' }),
          isOwn: data.username === username,
        }]);
      }
    });

    return () => wsService.disconnect(`chat_${roomId}`);
  }, [roomId, isOpen, username]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = () => {
    const text = inputValue.trim();
    if (!text) return;
    wsService.sendChatMessage(roomId, text);
    setInputValue('');
    inputRef.current?.focus();
  };

  if (!isOpen) return null;

  return (
    <div className="flex flex-col h-full bg-[hsl(230,25%,8%)] border-l border-border">
      <div className="flex items-center justify-between p-3 border-b border-border">
        <div className="flex items-center gap-2">
          <MessageCircle className="w-4 h-4 text-[hsl(187,92%,55%)]" />
          <h3 className="text-sm font-semibold">Chat</h3>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={onClose}>
          <X className="w-3.5 h-3.5" />
        </Button>
      </div>

      <ScrollArea className="flex-1 p-3">
        <div className="space-y-2">
          {messages.length === 0 && (
            <p className="text-xs text-muted-foreground text-center py-4">
              Aucun message pour le moment...
            </p>
          )}
          {messages.map(msg => (
            <div key={msg.id} className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                msg.isOwn
                  ? 'bg-[hsl(187,92%,55%,0.15)] border border-[hsl(187,92%,55%,0.2)]'
                  : 'bg-[hsl(230,25%,14%)] border border-border'
              }`}>
                {!msg.isOwn && (
                  <p className="text-[10px] font-semibold text-[hsl(270,60%,65%)] mb-0.5">{msg.sender}</p>
                )}
                <p className="text-xs text-foreground">{msg.text}</p>
                <p className="text-[9px] text-muted-foreground mt-0.5 text-right">{msg.timestamp}</p>
              </div>
            </div>
          ))}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="p-3 border-t border-border">
        <div className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={e => setInputValue(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder="Message..."
            className="bg-[hsl(230,25%,12%)] border-border text-sm h-9"
          />
          <Button
            onClick={sendMessage}
            disabled={!inputValue.trim()}
            size="icon"
            className="h-9 w-9 bg-[hsl(187,92%,55%)] text-[hsl(230,25%,7%)] hover:bg-[hsl(187,92%,45%)]"
          >
            <Send className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
}