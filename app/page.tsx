import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { MediaSection } from "@/components/media-section";
import { EventsSection } from "@/components/events-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";

import eventsData from "@/data/shows.json";
import { getEvents } from "@/lib/events";

export const revalidate = 3600;

export default async function Home() {
  const data = await getEvents();
  console.log("NODE_ENV:", process.env.NODE_ENV);
  console.log("API_URL exists:", !!process.env.API_URL);
  console.log(
    "All env keys:",
    Object.keys(process.env).filter((k) => k.includes("API"))
  );

  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />
      <EventsSection data={eventsData} />
      <AboutSection />
      <MediaSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
