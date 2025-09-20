import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { MediaSection } from "@/components/media-section";
import { EventsSection } from "@/components/events-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import tracksData from "@/data/tracks.json";

import eventsData from "@/data/shows.json";
import { getEvents } from "@/lib/events";
import HeroTrack from "@/components/spotify/HeroTrack";
import { TrackSoundcloud, TrackSpotify } from "@/lib/types";
import TrackCard from "@/components/spotify/TrackCard";
import TrackListItem from "@/components/spotify/TrackListenItem";
import { MusicSection } from "@/components/music-section";
export const revalidate = 3600;

async function getSoundcloudTracks(): Promise<TrackSoundcloud[]> {
  try {
    // Llama a tu propia API Route interna para mayor seguridad
    // Asegúrate de que NEXT_PUBLIC_BASE_URL esté configurado correctamente en .env.local
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/soundcloud`
      /*
      {
        // Configuración de revalidación para el App Router
        // Esto le dice a Next.js que revalide estos datos cada 24 horas (86400 segundos)
        next: { revalidate: 86400 },
      }*/
    );

    if (!response.ok) {
      // Si la respuesta no es OK, lanza un error para que el catch lo maneje
      const errorText = await response.text();
      console.error(
        "Failed to fetch data from internal API:",
        response.status,
        errorText
      );
      throw new Error("Failed to fetch data from internal API");
    }

    const tracks: TrackSoundcloud[] = await response.json();
    return tracks;
  } catch (error) {
    console.error("Error fetching SoundCloud data in Server Component:", error);
    return []; // Retorna un array vacío en caso de error
  }
}

export default async function Home() {
  const data = await getEvents();
  const tracks = await getSoundcloudTracks(); // Llama a la función de fetching

  const featuredTrack: TrackSpotify = tracksData.tracks[0];
  const latestTrack: TrackSpotify = tracksData.tracks.sort(
    (a, b) =>
      new Date(b.album.release_date).getTime() -
      new Date(a.album.release_date).getTime()
  )[0];
  return (
    <main className="min-h-screen">
      <Navigation />
      {tracks.length > 0 ? (
        <ul>
          {tracks.map((track) => (
            <li key={track.id}>
              <a
                href={track.permalink_url}
                target="_blank"
                rel="noopener noreferrer"
              >
                {track.title}
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p>No se pudieron cargar las pistas de SoundCloud.</p>
      )}
      <HeroSection />
      <EventsSection data={eventsData} />
      <HeroTrack track={latestTrack} />
      <AboutSection />
      <MusicSection />
      <MediaSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
