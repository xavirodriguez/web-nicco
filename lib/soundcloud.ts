// app/api/soundcloud/route.ts (para Next.js 13+ App Router)
// o pages/api/soundcloud.ts (para Pages Router)

import { NextResponse } from 'next/server';

// Asegúrate de tener estas variables de entorno configuradas
const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID;
const SOUNDCLOUD_CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET; // Solo si necesitas OAuth para acciones de usuario

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId'); // Por ejemplo, para obtener las pistas de un usuario específico

  if (!userId) {
    return NextResponse.json({ error: 'User ID is required' }, { status: 400 });
  }

  try {
    // Aquí harías la llamada a la API de SoundCloud
    // Para datos públicos, a menudo solo necesitas el client_id
    const response = await fetch(`https://api-v2.soundcloud.com/users/${userId}/tracks?client_id=${SOUNDCLOUD_CLIENT_ID}&limit=10`);

    if (!response.ok) {
      const errorData = await response.json();
      console.error('SoundCloud API error:', errorData);
      return NextResponse.json({ error: 'Failed to fetch tracks from SoundCloud', details: errorData }, { status: response.status });
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching SoundCloud data:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

// Si necesitas manejar el flujo de OAuth, tendrías rutas POST o GET adicionales
// para iniciar la autorización y manejar el callback.