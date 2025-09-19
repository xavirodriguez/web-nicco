// lib/types.ts - EXPANDIDO
export interface SpotifyImage {
url: string;
height: number | null;
width: number | null;
}

export interface SpotifyArtist {
id: string;
name: string;
external_urls: { spotify: string };
}

export interface SpotifyAlbum {
id: string;
name: string;
images: SpotifyImage[];
release_date: string;
artists: SpotifyArtist[];
}

export interface SpotifyTrack {
id: string;
name: string;
album: SpotifyAlbum;
artists: SpotifyArtist[];
preview_url: string | null;
external_urls: { spotify: string };
}

export interface SpotifyTopTracksResponse {
tracks: SpotifyTrack[];
}

// app/toptracks.tsx - TIPADO CORRECTO
"use client";
import useSWR from "swr";
import { SpotifyTopTracksResponse } from "@/lib/types";

const fetcher = (url: string): Promise<SpotifyTopTracksResponse> =>
fetch(url).then((r) => r.json());

export function TopTracks() {
const { data, error } = useSWR<SpotifyTopTracksResponse>("/api/spotify", fetcher);

if (error) return <p>Error al cargar</p>;
if (!data) return <p>Cargando…</p>;

return (
<ul>
{data.tracks.map((track) => (
<li key={track.id} className="flex items-center gap-2">
<img
src={track.album.images[2]?.url || track.album.images[0]?.url}
alt={track.name}
className="w-10 h-10"
/>
<span>{track.name}</span>
</li>
))}
</ul>
);
}

// lib/spotify.ts - TIPADO CORRECTO
import { SpotifyTopTracksResponse } from "./types";

interface SpotifyTokenResponse {
access_token: string;
token_type: string;
expires_in: number;
}

async function getAccessToken(): Promise<string> {
if (!process.env.SPOTIFY_CLIENT_ID || !process.env.SPOTIFY_CLIENT_SECRET) {
throw new Error("Variables Spotify no configuradas");
}

const res = await fetch("https://accounts.spotify.com/api/token", {
method: "POST",
headers: {
Authorization: `Basic ${Buffer.from(
        `${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`
      ).toString("base64")}`,
"Content-Type": "application/x-www-form-urlencoded",
},
body: new URLSearchParams({
grant_type: "refresh_token",
refresh_token: process.env.SPOTIFY_REFRESH_TOKEN!,
}),
});

if (!res.ok) {
throw new Error(`Spotify token error: ${res.status}`);
}

const data: SpotifyTokenResponse = await res.json();
return data.access_token;
}

export async function getTopTracks(artistId: string): Promise<SpotifyTopTracksResponse> {
const accessToken = await getAccessToken();

const res = await fetch(
`https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`,
{
headers: { Authorization: `Bearer ${accessToken}` },
next: { revalidate: 86400 },
}
);

if (!res.ok) {
throw new Error(`Spotify API error: ${res.status}`);
}

return res.json();
}
