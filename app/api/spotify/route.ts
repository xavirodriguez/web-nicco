// app/api/soundcloud/route.ts
import { NextResponse } from 'next/server';
const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;

async function getAccessToken() {
  const res = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization:
        "Basic " + Buffer.from(client_id + ":" + client_secret).toString("base64"),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token,
    }),
  });
  return res.json() as Promise<{ access_token: string }>;
}

export async function GET(): Promise<NextResponse> {

  const artistId = process.env.SPOTIFY_USER_ID;
  const { access_token } = await getAccessToken();
  try {
  const response = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 86400 }, // 24h
    }
  );
  if (!response.ok) {
    const errorText = await response.text();
    console.error('API tracks error:', {
      status: response.status,
      statusText: response.statusText,
      body: errorText
    });
    
    return NextResponse.json(
      { error: `Spotify API error: ${response.status}` }, 
      { status: response.status }
    );
  }
  const tracks = await response.json();
  return NextResponse.json(tracks.slice(0, 10));
} catch (error) {
    console.error('Error completo:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }

  
}
