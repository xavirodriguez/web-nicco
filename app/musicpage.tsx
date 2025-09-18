import { getTopTracks } from "@/lib/spotify";

export const revalidate = 86400; // 24h

export default async function MusicPage() {
  const data = await getTopTracks("SPOTIFY_ARTIST_ID");

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Top Tracks</h1>
      <ul className="space-y-2">
        {data.tracks.map((t: any) => (
          <li key={t.id} className="flex items-center gap-2">
            <img
              src={t.album.images[2].url}
              alt={t.name}
              className="w-10 h-10 rounded"
            />
            <span>{t.name}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
