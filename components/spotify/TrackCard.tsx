import React from "react";
import { Track } from "@/lib/types"; // Asegúrate de que la ruta sea correcta

// Helper para formatear la duración de milisegundos a minutos:segundos
const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000);
  const seconds = ((ms % 60000) / 1000).toFixed(0);
  return `${minutes}:${parseInt(seconds) < 10 ? "0" : ""}${seconds}`;
};

interface TrackCardProps {
  track: Track;
}

const TrackCard: React.FC<TrackCardProps> = ({ track }) => {
  if (!track) return null;

  const imageUrl = track.album.images[0]?.url;
  const artistNames = track.artists.map((artist) => artist.name).join(", ");
  const releaseYear = new Date(track.album.release_date).getFullYear();

  return (
    <div
      className="
      border border-gray-700 rounded-lg p-4
      bg-neutral-900 text-white font-sans shadow-md
      max-w-[300px]
      flex flex-col items-center text-center
    "
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Portada de ${track.album.name}`}
          className="w-full h-auto rounded mb-3"
        />
      )}
      <h3 className="mb-1.5 text-xl text-brand-complementary font-semibold">
        {track.name}
      </h3>
      <p className="mb-1.5 text-sm text-gray-400">
        Album: {track.album.name} ({releaseYear})
      </p>
      <p className="mb-4 text-sm text-gray-400">
        Duration: {formatDuration(track.duration_ms)}
      </p>
      <a
        href={track.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        className="
          inline-block bg-green-500 text-white
          py-2 px-4 rounded-full no-underline
          text-sm font-bold
          hover:bg-green-600 transition-colors duration-200
        "
      >
        Listen in Spotify
      </a>
    </div>
  );
};

export default TrackCard;
