// components/SoundcloudTracks.jsx
"use server";

import { TrackSoundcloud } from "@/lib/types";

const SoundcloudTracks = ({ tracks }) => {
  const formatDuration = (ms) => {
    if (typeof ms !== "number" || ms < 0) return "N/A";
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };
  console.log(tracks);
  return (
    <section id="media" className="py-20 px-4 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <h2>Últimas Pistas de SoundCloud</h2>

        {tracks.length > 0 ? (
          tracks.map((track) => (
            <div className="grid grid-cols-12 gap-4 items-center py-6 border-b">
              <div className="col-span-1">
                <img
                  src={track.artwork_url}
                  alt={`Artwork for "${track.title}" by ${track.user.username}`}
                />
              </div>
              <div className="col-span-3">
                <h2>{track.title}</h2>
              </div>
              {/*
              <div className="col-span-1">{track.genre}</div>
         
              <div className="col-span-1">
                {track.tag_list && (
                  <p className="text-xs text-gray-500 mt-1">
                    Etiquetas:{" "}
                    {track.tag_list.replace(/"/g, "").replace(/, /g, ", ")}
                  </p>
                )}
              </div>
                */}
              <div className="col-span-4 line-clamp-2">{track.description}</div>

              <div className="col-span-1">{formatDuration(track.duration)}</div>
              <div className="col-span-1">
                {track.purchase_url && <a href={track.purchase_url}> GET IT</a>}
              </div>
              <a
                href={track.permalink_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                LISTEN IT
              </a>
            </div>
          ))
        ) : (
          <p>No se pudieron cargar las pistas de SoundCloud.</p>
        )}
      </div>
    </section>
  );
};

export default SoundcloudTracks;
