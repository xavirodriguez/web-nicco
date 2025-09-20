// app/api/soundcloud/route.ts
import { NextResponse } from 'next/server';

const SOUNDCLOUD_CLIENT_ID = process.env.SOUNDCLOUD_CLIENT_ID!;
const SOUNDCLOUD_CLIENT_SECRET = process.env.SOUNDCLOUD_CLIENT_SECRET!;
const NICCOLUPEN_SOUNDCLOUD_ID = '4032579';

interface SoundCloudTokenResponse {
  access_token: string;
  expires_in: number;
  token_type: string;
}

interface SoundCloudTrack {
  id: number;
  title: string;
  permalink_url: string;
  artwork_url?: string;
  duration: number;
}

async function getAccessToken(): Promise<string> {
  console.log('Enviando request de token a SoundCloud...');
  
  try {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: SOUNDCLOUD_CLIENT_ID,
      client_secret: SOUNDCLOUD_CLIENT_SECRET,
    });
    
    console.log('Body params:', body.toString().replace(SOUNDCLOUD_CLIENT_SECRET, 'HIDDEN'));
    
    const response = await fetch('https://api.soundcloud.com/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: body,
    });

    console.log('Token response status:', response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Token error completo:', {
        status: response.status,
        statusText: response.statusText,
        headers: Object.fromEntries(response.headers.entries()),
        body: errorText
      });
      throw new Error(`Token request failed: ${response.status} - ${errorText}`);
    }

    const data: SoundCloudTokenResponse = await response.json();
    console.log('✅ Access token obtenido, tipo:', data.token_type, 'expira en:', data.expires_in);
    return data.access_token;
    
  } catch (error) {
    console.error('❌ Error crítico obteniendo access token:', error);
    throw error;
  }
}

export async function GET(): Promise<NextResponse> {
  console.log('=== DEBUG SOUNDCLOUD ROUTE ===');
  console.log('CLIENT_ID presente:', !!SOUNDCLOUD_CLIENT_ID);
  console.log('CLIENT_SECRET presente:', !!SOUNDCLOUD_CLIENT_SECRET);
  console.log('CLIENT_ID length:', SOUNDCLOUD_CLIENT_ID?.length);
  console.log('CLIENT_SECRET length:', SOUNDCLOUD_CLIENT_SECRET?.length);
  
  if (!SOUNDCLOUD_CLIENT_ID || !SOUNDCLOUD_CLIENT_SECRET) {
    console.error('Variables de entorno faltantes');
    return NextResponse.json(
      { error: 'Server configuration error' }, 
      { status: 500 }
    );
  }

  try {
    console.log('Paso 1: Intentando obtener access token...');
    // 1. Obtener access token
    const accessToken = await getAccessToken();
    console.log('Paso 1: ✅ Access token obtenido');
    
    // 2. Llamar a la API con el token
    const tracksUrl = `https://api.soundcloud.com/users/${NICCOLUPEN_SOUNDCLOUD_ID}/tracks`;
    
    console.log('Obteniendo tracks con access token...');
    
    const response = await fetch(tracksUrl, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept': 'application/json',
      },
      next: { revalidate: 86400 } // Cache 24h
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('API tracks error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      return NextResponse.json(
        { error: `SoundCloud API error: ${response.status}` }, 
        { status: response.status }
      );
    }

    const tracks: SoundCloudTrack[] = await response.json();
    console.log(`Tracks obtenidos: ${tracks.length}`);
    
    // Limita a 10 tracks más recientes
    return NextResponse.json(tracks.slice(0, 10));
    
  } catch (error) {
    console.error('Error completo:', error);
    return NextResponse.json(
      { error: 'Internal server error' }, 
      { status: 500 }
    );
  }
}