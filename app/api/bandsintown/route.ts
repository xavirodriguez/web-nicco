// app/api/bandsintown/route.ts
import { NextResponse } from 'next/server';

const BANDSINTOWN_API_KEY = process.env.BANDSINTOWN_API_KEY!;
const ARTIST_NAME = process.env.BANDSINTOWN_ARTIST_NAME || 'niccolupen'; // Añade a .env

interface BandsintownEvent {
  id: string;
  title: string;
  datetime: string;
  venue: {
    name: string;
    city: string;
    country: string;
  };
  offers: Array<{
    type: string;
    url: string;
  }>;
}
export async function GET(): Promise<NextResponse> {
  console.log('✅ === DEBUG BANDSINTOWN ===✅ ');
  console.log('API_KEY presente:', !!BANDSINTOWN_API_KEY);
  console.log('ARTIST_NAME:', ARTIST_NAME);
  
  if (!BANDSINTOWN_API_KEY) {
    console.error('BANDSINTOWN_API_KEY faltante');
    return NextResponse.json({ error: 'Server config error' }, { status: 500 });
  }

  try {
    console.log('🎫 Obteniendo eventos de Bandsintown...');
    
    // URL para eventos del artista
    const eventsUrl = `https://rest.bandsintown.com/artists/${encodeURIComponent(ARTIST_NAME)}/events?app_id=${BANDSINTOWN_API_KEY}&date=upcoming`;
    console.log('URL completa:', eventsUrl.replace(BANDSINTOWN_API_KEY, 'HIDDEN'));
    
    const response = await fetch(eventsUrl, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'YourAppName/1.0' // Bandsintown requiere User-Agent
      },
      next: { revalidate: 36000 } // 10h cache
    });

    console.log('Response status:', response.status, response.statusText);
    console.log('Response headers:', Object.fromEntries(response.headers.entries()));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Bandsintown API error:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      
      // Si es 404, probablemente el artista no existe
      if (response.status === 404) {
        console.log('⚠️  Artista no encontrado, devolviendo array vacío');
        return NextResponse.json([]); // Devolver array vacío
      }
      
      return NextResponse.json(
        { error: `Bandsintown API error: ${response.status}` },
        { status: response.status }
      );
    }

    const events: BandsintownEvent[] = await response.json();
    console.log(`✅ Eventos obtenidos: ${events.length}`);
    console.log('Primer evento (si existe):', events[0] ? JSON.stringify(events[0], null, 2) : 'N/A');
    
    return NextResponse.json(events);

  } catch (error) {
    console.error('❌ Error Bandsintown completo:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
