const client_id = process.env.SPOTIFY_CLIENT_ID!;
const client_secret = process.env.SPOTIFY_CLIENT_SECRET!;
const refresh_token = process.env.SPOTIFY_REFRESH_TOKEN!;
// b07f30649e0e4d429061959c91182571

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

export async function getTopTracks(artistId: string) {
  const { access_token } = await getAccessToken();
  const res = await fetch(
    `https://api.spotify.com/v1/artists/${artistId}/top-tracks?market=ES`,
    {
      headers: { Authorization: `Bearer ${access_token}` },
      next: { revalidate: 86400 }, // 24h
    }
  );
  return res.json();
}
