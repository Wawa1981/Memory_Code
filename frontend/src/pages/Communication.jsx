import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Video, Mic, Users, Hash } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ChatPanel from '@/components/comm/ChatPanel';
import VideoPanel from '@/components/comm/VideoPanel';

const ROOMS = [
  { id: 'general', name: 'Général', icon: Hash, members: 42 },
  { id: 'python', name: 'Python', icon: Hash, members: 18 },
  { id: 'javascript', name: 'JavaScript', icon: Hash, members: 12 },
  { id: 'duels', name: 'Duels', icon: Hash, members: 8 },
];

export default function Communication() {
  const [selectedRoom, setSelectedRoom] = useState('general');
  const [showVideo, setShowVideo] = useState(false);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[hsl(187,92%,55%)] to-[hsl(270,60%,55%)] flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Communication</h1>
            <p className="text-sm text-muted-foreground">Chat, audio et vidéo en temps réel</p>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4" style={{ height: 'calc(100vh - 160px)' }}>
        {/* Room List */}
        <div className="lg:col-span-1 rounded-xl bg-[hsl(230,25%,9%)] border border-border p-3 overflow-y-auto">
          <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Salons</h3>
          <div className="space-y-1">
            {ROOMS.map(room => (
              <button
                key={room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                  selectedRoom === room.id
                    ? 'bg-[hsl(187,92%,55%,0.1)] text-[hsl(187,92%,55%)]'
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                }`}
              >
                <room.icon className="w-4 h-4" />
                <span className="flex-1 text-left">{room.name}</span>
                <span className="text-[10px] text-muted-foreground">{room.members}</span>
              </button>
            ))}
          </div>

          <div className="border-t border-border mt-3 pt-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Actions</h3>
            <button
              onClick={() => setShowVideo(!showVideo)}
              className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                showVideo
                  ? 'bg-[hsl(270,60%,55%,0.1)] text-[hsl(270,60%,65%)]'
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`}
            >
              <Video className="w-4 h-4" />
              <span>{showVideo ? 'Fermer visio' : 'Lancer visio'}</span>
            </button>
          </div>
        </div>

        {/* Chat + Video */}
        <div className="lg:col-span-3 flex gap-4">
          <div className={`flex-1 rounded-xl overflow-hidden border border-border ${showVideo ? '' : 'w-full'}`}>
            <ChatPanel
              roomId={selectedRoom}
              username="Player"
              isOpen={true}
              onClose={() => {}}
            />
          </div>

          {showVideo && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-80 rounded-xl overflow-hidden border border-border flex-shrink-0"
            >
              <VideoPanel roomId={selectedRoom} onClose={() => setShowVideo(false)} />
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}