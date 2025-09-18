import React from "react";
import { Track } from "@/lib/types"; // Asegúrate de que la ruta sea correcta

interface TrackListItemProps {
  track: Track;
}

const TrackListItem: React.FC<TrackListItemProps> = ({ track }) => {
  if (!track) return null;

  const imageUrl = track.album.images[2]?.url; // Usamos una imagen más pequeña para la lista (64x64)
  const artistNames = track.artists.map((artist) => artist.name).join(", ");
  const releaseDate = track.album.release_date;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        padding: "10px",
        borderBottom: "1px solid #282828",
        backgroundColor: "#121212",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        marginBottom: "5px",
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Portada de ${track.album.name}`}
          style={{
            width: "40px",
            height: "40px",
            borderRadius: "2px",
            marginRight: "15px",
          }}
        />
      )}
      <div style={{ flexGrow: 1 }}>
        <h4 style={{ margin: "0", fontSize: "1.1em", color: "#fff" }}>
          {track.name}
        </h4>
        <p style={{ margin: "0", fontSize: "0.85em", color: "#bbb" }}>
          {artistNames} - {releaseDate}
        </p>
      </div>
      <a
        href={track.external_urls.spotify}
        target="_blank"
        rel="noopener noreferrer"
        style={{ marginLeft: "15px", color: "#1DB954", textDecoration: "none" }}
      >
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M18 13.5A10.5 10.5 0 0 0 12 3C6.48 3 2 7.48 2 13s4.48 10 10 10 10-4.48 10-10V8h-2.5c-1.38 0-2.5-1.12-2.5-2.5V3"></path>
          <path d="M12 13.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z"></path>
        </svg>
      </a>
    </div>
  );
};

export default TrackListItem;
