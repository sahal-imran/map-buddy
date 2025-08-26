import dashcamImage from '@/assets/dashcam-footage.jpg';
import { Play, Pause, Volume2, Maximize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

export function DashcamView() {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="relative w-full bg-black rounded-lg overflow-hidden">
      <div className="aspect-video relative">
        <img 
          src={dashcamImage} 
          alt="Dashcam footage" 
          className="w-full h-full object-cover"
        />
        
        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-black/0 hover:bg-black/20 transition-colors group">
          <div className="absolute bottom-4 left-4 right-4">
            <div className="flex items-center gap-3 bg-black/70 backdrop-blur-sm rounded-lg px-4 py-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
                onClick={() => setIsPlaying(!isPlaying)}
              >
                {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </Button>
              
              <div className="flex-1 h-1 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full w-1/3 bg-white rounded-full"></div>
              </div>
              
              <span className="text-white text-sm font-mono">00:15 / 00:45</span>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20"
              >
                <Maximize className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Event Info Overlay */}
        <div className="absolute top-4 right-4 bg-fleet-warning/90 backdrop-blur-sm rounded-lg px-3 py-2">
          <div className="text-sm font-medium text-black">BRAKE EVENT</div>
          <div className="text-xs text-black/80">High Deceleration Detected</div>
        </div>
        
        {/* Timestamp Overlay */}
        <div className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm rounded px-2 py-1">
          <div className="text-white text-sm font-mono">2025-07-23 03:32:13</div>
        </div>
      </div>
    </div>
  );
}