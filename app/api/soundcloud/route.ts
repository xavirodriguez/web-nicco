// pages/api/soundcloud-data.ts (Pages Router)
// o app/api/soundcloud-data/route.ts (App Router)

import { NextResponse } from 'next/server';

const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
const NICCOLUPEN_SOUNDCLOUD_ID = 'tu_id_de_usuario_soundcloud'; // Asegúrate de obtener el ID numérico

export default async function handler(req, res) { // Para Pages Router
// export async function GET(request: Request) { // Para App Router
  try {
    const response = await fetch(`https://api-v2.soundcloud.com/users/${NICCOLUPEN_SOUNDCLOUD_ID}/tracks?client_id=${SOUNDCLOUD_CLIENT_ID}&limit=10`);

    if (!response.ok) {
      throw new Error('Failed to fetch tracks from SoundCloud');
    }

    const data = await response.json();
    // Para Pages Router:
    res.status(200).json(data.collection);
    // Para App Router:
    // return NextResponse.json(data.collection);
  } catch (error) {
    console.error('Error fetching SoundCloud data:', error);
    // Para Pages Router:
    res.status(500).json({ error: 'Internal server error' });
    // Para App Router:
    // return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}