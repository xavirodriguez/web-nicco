import { Navigation } from "@/components/navigation";
import { HeroSection } from "@/components/hero-section";
import { AboutSection } from "@/components/about-section";
import { MediaSection } from "@/components/media-section";
import { EventsSection } from "@/components/events-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import { EventsSection2 } from "@/components/events-section2";
import eventsData from "@/data/shows.json";

async function getData() {
  const apiUrl = process.env.BANDSINTOWN_URL;

  if (!apiUrl) {
    throw new Error("BANDSINTOWN_URL no configurada");
  }

  const res = await fetch(apiUrl, {
    next: { revalidate: 3600 }, // 1 hora en segundos
  });
  return res.json();
}

export default async function Home() {
  const data = await getData();
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
