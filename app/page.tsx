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
import SoundcloudPlayer from "@/components/soundcloud/SoundcloudPlayer";
import SoundcloudTracks from "@/components/soundcloud/SoundcloudTracks";
export const revalidate = 3600;
import content from "@/data/content.json";

async function getSoundcloudTracks(): Promise<TrackSoundcloud[]> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

  try {
    console.log("Fetching from internal API...");

    const response = await fetch(`${baseUrl}/api/soundcloud`, {
      next: { revalidate: 86400 }, // Cache 24h en servidor
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Internal API error:", {
        status: response.status,
        statusText: response.statusText,
        body: errorText,
      });
      throw new Error(`Internal API error: ${response.status}`);
    }

    const tracks: TrackSoundcloud[] = await response.json();
    console.log(`Tracks recibidos: ${tracks.length}`);

    return tracks;
  } catch (error) {
    console.error("Error en getSoundcloudTracks:", error);
    return []; // Fallback silencioso
  }
}

export default async function Home() {
  const data = await getEvents();
  const tracks: TrackSoundcloud[] = await getSoundcloudTracks(); // Llama a la función de fetching
  console.log(tracks);
  const featuredTrack: TrackSpotify = tracksData.tracks[0];
  const latestTrack: TrackSpotify = tracksData.tracks.sort(
    (a, b) =>
      new Date(b.album.release_date).getTime() -
      new Date(a.album.release_date).getTime()
  )[0];
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <EventsSection data={eventsData} />

      <HeroTrack track={latestTrack} />
      <AboutSection />
      <MusicSection />
      <div className="absolute inset-0 z-0">
        <img
          src={content.hero.background2 || "/placeholder.svg"}
          alt="DJ performing"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <SoundcloudTracks tracks={tracks} />
      <MediaSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
