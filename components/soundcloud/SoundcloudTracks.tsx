// components/SoundcloudTracks.jsx
"use client"; // Si usas App Router y es un componente de cliente

import React, { useState, useEffect } from "react";

const SoundcloudTracks = ({
  niccolupenSoundcloudId,
}: {
  niccolupenSoundcloudId: string;
}) => {
  const [tracks, setTracks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        setLoading(true);
        // Llama a tu propia API Route de Next.js
        const response = await fetch(
          `/api/soundcloud?userId=${niccolupenSoundcloudId}`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch tracks");
        }

        const data = await response.json();
        setTracks(data.collection); // La API v2 de SoundCloud a menudo devuelve los datos en 'collection'
      } catch (err) {
        console.log(err);
        //setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (niccolupenSoundcloudId) {
      fetchTracks();
    }
  }, [niccolupenSoundcloudId]);

  if (loading) return <p>Cargando pistas de SoundCloud...</p>;
  if (error) return <p>Error al cargar pistas: {error}</p>;
  if (tracks.length === 0) return <p>No se encontraron pistas.</p>;

  return (
    <div>
      <h2>Últimas Pistas de SoundCloud</h2>
      <ul>
        {tracks.map(
          (track: { id: string; permalink_url: string; title: string }) => (
            <li key={track.id}>
              <a
                href={track.permalink_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {track.title}
              </a>
              {/* Puedes añadir más detalles como la imagen de la pista, etc. */}
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default SoundcloudTracks;
