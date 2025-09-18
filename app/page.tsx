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
import { Track } from "@/lib/types";
import TrackCard from "@/components/spotify/TrackCard";
import TrackListItem from "@/components/spotify/TrackListenItem";
import { MusicSection } from "@/components/music-section";
export const revalidate = 3600;

export default async function Home() {
  const data = await getEvents();

  const featuredTrack: Track = tracksData.tracks[0];
  const latestTrack: Track = tracksData.tracks.sort(
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
      <MediaSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
