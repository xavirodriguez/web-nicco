import express from "express";
import fetch from "node-fetch";
import open from "open";

const clientId = process.env.SPOTIFY_CLIENT_ID;
const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;
const redirectUri = "http://localhost:3000/callback";
const scopes = [
  "user-read-email",
  "user-top-read",
  "playlist-read-private",
].join(" ");

// 1. Servidor local para recibir el "code"
const app = express();

app.get("/login", (req, res) => {
  const authUrl = new URL("https://accounts.spotify.com/authorize");
  authUrl.search = new URLSearchParams({
    response_type: "code",
    client_id: clientId,
    scope: scopes,
    redirect_uri: redirectUri,
  }).toString();

  res.redirect(authUrl.toString());
});

app.get("/callback", async (req, res) => {
  const code = req.query.code;

  const basic = Buffer.from(`${clientId}:${clientSecret}`).toString("base64");

  const tokenRes = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  const data = await tokenRes.json();

  console.log("🎉 Refresh Token obtenido:\n");
  console.log(data.refresh_token);

  res.send("Listo. Mira tu terminal para copiar el refresh token.");
  process.exit(0);
});

app.listen(3000, () => {
  console.log("➡️ Abriendo navegador...");
  open("http://localhost:3000/login");
});
