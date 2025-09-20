// components/SoundcloudPlayer.tsx
"use client";

import { useState } from "react";
import { Play, Pause, Volume2 } from "lucide-react";

interface Track {
  id: number;
  title: string;
  stream_url: string;
  permalink_url: string;
  artwork_url?: string;
}

interface SoundcloudPlayerProps {
  track: Track;
}

export default function SoundcloudPlayer(track: Track) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  // Construye la URL de streaming con client_id
  const getStreamUrl = (streamUrl: string) => {
    const clientId = process.env.NEXT_PUBLIC_SOUNDCLOUD_CLIENT_ID;
    return `${streamUrl}?client_id=${clientId}`;
  };

  const togglePlay = async () => {
    try {
      if (!audio) {
        // Crear nuevo audio element
        const newAudio = new Audio(getStreamUrl(track.stream_url));
        newAudio.crossOrigin = "anonymous";

        newAudio.addEventListener("ended", () => setIsPlaying(false));
        newAudio.addEventListener("error", (e) => {
          console.error("Error de audio:", e);
          setIsPlaying(false);
        });

        setAudio(newAudio);
        await newAudio.play();
        setIsPlaying(true);
      } else {
        if (isPlaying) {
          audio.pause();
          setIsPlaying(false);
        } else {
          await audio.play();
          setIsPlaying(true);
        }
      }
    } catch (error) {
      console.error("Error reproduciendo:", error);
      setIsPlaying(false);
    }
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-card rounded-lg">
      <h1>Hola</h1>Hola,
      {/* Artwork */}
      {track.artwork_url && (
        <img
          src={track.artwork_url.replace("large.jpg", "t300x300.jpg")}
          alt={track.title}
          className="w-16 h-16 rounded object-cover"
        />
      )}

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <h3 className="font-medium truncate">{track.title}</h3>
        <a
          href={track.permalink_url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-muted-foreground hover:underline"
        >
          Ver en SoundCloud
        </a>
      </div>

      {/* Play button */}
      <button
        onClick={togglePlay}
        className="flex items-center justify-center w-10 h-10 bg-primary text-primary-foreground rounded-full hover:bg-primary/80 transition-colors"
      >
        {isPlaying ? <Pause size={16} /> : <Play size={16} />}
      </button>
    </div>
  );
}
