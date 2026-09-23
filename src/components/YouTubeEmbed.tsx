import React, { useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface YouTubeEmbedProps {
  videoId: string;
  type?: 'viewport-cover' | 'aspect-video' | 'aspect-4-3';
  className?: string;
  showAudioControl?: boolean;
}

export const YouTubeEmbed: React.FC<YouTubeEmbedProps> = ({
  videoId,
  type = 'aspect-video',
  className = '',
  showAudioControl = false,
}) => {
  const [isMuted, setIsMuted] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  // Build clean parameters for seamless looping background
  const params = new URLSearchParams({
    autoplay: '1',
    mute: isMuted ? '1' : '0',
    controls: '0',
    loop: '1',
    playlist: videoId,
    playsinline: '1',
    rel: '0',
    modestbranding: '1',
    iv_load_policy: '3',
    disablekb: '1',
    fs: '0',
  });

  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`;

  if (type === 'viewport-cover') {
    return (
      <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <iframe
          src={embedUrl}
          title="Hero Video"
          allow="autoplay; encrypted-media; picture-in-picture"
          onLoad={() => setIsLoaded(true)}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] min-w-[177.78vh] h-[56.25vw] min-h-[100vh] border-0 transition-opacity duration-1000 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
        {/* Subtle dark tint to preserve high contrast for hero typography */}
        <div className="absolute inset-0 bg-black/45 pointer-events-none" />
      </div>
    );
  }

  if (type === 'aspect-4-3') {
    return (
      <div className={`relative w-full h-full overflow-hidden bg-neutral-950 ${className}`}>
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <iframe
            src={embedUrl}
            title="Philosophy Video"
            allow="autoplay; encrypted-media; picture-in-picture"
            onLoad={() => setIsLoaded(true)}
            className={`w-[140%] h-[140%] max-w-none border-0 pointer-events-none transition-opacity duration-700 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
          />
        </div>

        {/* Ambient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

        {showAudioControl && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setIsMuted(!isMuted);
            }}
            className="absolute top-4 right-4 z-20 liquid-glass rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label={isMuted ? 'Unmute video' : 'Mute video'}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </button>
        )}
      </div>
    );
  }

  // default: 'aspect-video' (16:9)
  return (
    <div className={`relative w-full h-full overflow-hidden bg-neutral-950 ${className}`}>
      <iframe
        src={embedUrl}
        title="Featured Video"
        allow="autoplay; encrypted-media; picture-in-picture"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-full border-0 pointer-events-none transition-opacity duration-700 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Ambient gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

      {showAudioControl && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted(!isMuted);
          }}
          className="absolute top-4 right-4 z-20 liquid-glass rounded-full p-2 text-white/80 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>
      )}
    </div>
  );
};
