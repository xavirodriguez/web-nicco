import React from "react";
import { Track } from "@/lib/types"; // Asegúrate de que la ruta sea correcta

interface HeroTrackProps {
  track: Track;
}

const HeroTrack: React.FC<HeroTrackProps> = ({ track }) => {
  if (!track) return null;

  const imageUrl = track.album.images[0]?.url; // Imagen de mayor resolución
  const artistNames = track.artists
    .map((artist: { name: any }) => artist.name)
    .join(", ");
  const releaseYear = new Date(track.album.release_date).getFullYear();

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        minHeight: "400px",
        backgroundColor: "#000",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        textAlign: "center",
      }}
    >
      {imageUrl && (
        <img
          src={imageUrl}
          alt={`Portada de ${track.album.name}`}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            opacity: 0.4, // Para que el texto sea legible
            zIndex: 1,
          }}
        />
      )}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          padding: "20px",
          backgroundColor: "rgba(0,0,0,0.6)",
          borderRadius: "10px",
        }}
      >
        <p style={{ margin: "0 0 10px 0", fontSize: "1.2em", color: "#bbb" }}>
          Último Lanzamiento
        </p>
        <h2
          style={{ margin: "0 0 10px 0", fontSize: "2.5em", color: "#1DB954" }}
        >
          {track.name}
        </h2>
        <h3 style={{ margin: "0 0 15px 0", fontSize: "1.5em", color: "#fff" }}>
          {artistNames} - {track.album.name} ({releaseYear})
        </h3>
        <a
          href={track.external_urls.spotify}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            backgroundColor: "#1DB954",
            color: "white",
            padding: "12px 25px",
            borderRadius: "30px",
            textDecoration: "none",
            fontSize: "1.1em",
            fontWeight: "bold",
            marginTop: "20px",
            transition: "background-color 0.3s ease",
          }}
        >
          ¡Escúchalo Ahora en Spotify!
        </a>
        {track.preview_url && (
          <audio controls style={{ width: "100%", marginTop: "20px" }}>
            <source src={track.preview_url} type="audio/mpeg" />
            Tu navegador no soporta el elemento de audio.
          </audio>
        )}
      </div>
    </div>
  );
};

export default HeroTrack;
