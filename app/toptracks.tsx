"use client";
import useSWR from "swr";

export function TopTracks() {
  const { data } = useSWR("/api/spotify", (url) =>
    fetch(url).then((r) => r.json())
  );

  if (!data) return <p>Cargando…</p>;

  return (
    <ul>
      {data.tracks.map((t: any) => (
        <li key={t.id} className="flex items-center gap-2">
          <img src={t.album.images[2].url} alt={t.name} className="w-10 h-10" />
          <span>{t.name}</span>
        </li>
      ))}
    </ul>
  );
}
