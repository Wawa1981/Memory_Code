import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, Video, VideoOff, PhoneOff, Monitor } from 'lucide-react';
import { Button } from '@/components/ui/button';
import webrtcService from '@/lib/webrtc';

export default function VideoPanel({ roomId, onClose }) {
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(false);
  const [remoteStreams, setRemoteStreams] = useState({});
  const [isConnected, setIsConnected] = useState(false);
  const localVideoRef = useRef(null);
  const remoteVideoRefs = useRef({});

  const initCall = useCallback(async (withVideo) => {
    try {
      webrtcService.onLocalStream = (stream) => {
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = stream;
        }
      };

      webrtcService.onRemoteStream = (userId, stream) => {
        setRemoteStreams(prev => ({ ...prev, [userId]: stream }));
      };

      await webrtcService.initMedia({ audio: true, video: withVideo });
      webrtcService.joinRoom(roomId);
      setIsConnected(true);
    } catch (error) {
      console.error('Failed to init media:', error);
    }
  }, [roomId]);

  useEffect(() => {
    initCall(false);
    return () => {
      webrtcService.leaveRoom();
      setRemoteStreams({});
      setIsConnected(false);
    };
  }, [initCall]);

  // Assign remote streams to video elements
  useEffect(() => {
    Object.entries(remoteStreams).forEach(([userId, stream]) => {
      const el = remoteVideoRefs.current[userId];
      if (el && el.srcObject !== stream) {
        el.srcObject = stream;
      }
    });
  }, [remoteStreams]);

  const toggleAudio = () => {
    const next = !audioEnabled;
    setAudioEnabled(next);
    webrtcService.toggleAudio(next);
  };

  const toggleVideo = async () => {
    const next = !videoEnabled;
    setVideoEnabled(next);
    if (next && !webrtcService.localStream?.getVideoTracks().length) {
      await webrtcService.initMedia({ audio: audioEnabled, video: true });
    } else {
      webrtcService.toggleVideo(next);
    }
  };

  const hangUp = () => {
    webrtcService.leaveRoom();
    setRemoteStreams({});
    setIsConnected(false);
    onClose?.();
  };

  return (
    <div className="flex flex-col h-full bg-[hsl(230,25%,6%)]">
      {/* Video Grid */}
      <div className="flex-1 p-2 grid grid-cols-1 gap-2 overflow-hidden">
        {/* Local Video */}
        <div className="relative rounded-xl overflow-hidden bg-[hsl(230,25%,10%)] border border-border">
          <video
            ref={localVideoRef}
            autoPlay
            muted
            playsInline
            className={`w-full h-full object-cover ${!videoEnabled ? 'hidden' : ''}`}
          />
          {!videoEnabled && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 rounded-full bg-[hsl(187,92%,55%,0.1)] flex items-center justify-center border border-[hsl(187,92%,55%,0.2)]">
                <span className="text-xl font-bold text-[hsl(187,92%,55%)]">Moi</span>
              </div>
            </div>
          )}
          <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-[10px] text-white">Vous</span>
          </div>
          {isConnected && (
            <div className="absolute top-2 right-2 flex items-center gap-1 bg-green-500/20 backdrop-blur-sm rounded-full px-2 py-0.5">
              <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-[9px] text-green-300">Connecté</span>
            </div>
          )}
        </div>

        {/* Remote Videos */}
        {Object.entries(remoteStreams).map(([userId]) => (
          <div key={userId} className="relative rounded-xl overflow-hidden bg-[hsl(230,25%,10%)] border border-border">
            <video
              ref={el => { remoteVideoRefs.current[userId] = el; }}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-2 left-2 bg-black/60 backdrop-blur-sm rounded-lg px-2 py-1">
              <span className="text-[10px] text-white">Joueur</span>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="p-4 flex items-center justify-center gap-3 border-t border-border">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleAudio}
          className={`rounded-full h-11 w-11 ${!audioEnabled ? 'bg-red-500/20 border-red-500/30 text-red-400' : 'border-border'}`}
        >
          {audioEnabled ? <Mic className="w-4 h-4" /> : <MicOff className="w-4 h-4" />}
        </Button>

        <Button
          variant="outline"
          size="icon"
          onClick={toggleVideo}
          className={`rounded-full h-11 w-11 ${!videoEnabled ? 'border-border' : 'bg-[hsl(187,92%,55%,0.15)] border-[hsl(187,92%,55%,0.3)] text-[hsl(187,92%,55%)]'}`}
        >
          {videoEnabled ? <Video className="w-4 h-4" /> : <VideoOff className="w-4 h-4" />}
        </Button>

        <Button
          onClick={hangUp}
          className="rounded-full h-11 w-11 bg-red-500 hover:bg-red-600 text-white"
          size="icon"
        >
          <PhoneOff className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
}