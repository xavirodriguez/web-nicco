"use client";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { EventDescription } from "./event-description";
import { Description } from "./description";

// Tipos exactos para los datos de Bands in Town
interface BandsInTownArtist {
  id: string;
  name: string;
  url: string;
  mbid: string;
  options: {
    display_listen_unit: boolean;
  };
  tracking: never[];
  image_url: string;
  thumb_url: string;
  facebook_page_url: string;
  tracker_count: number;
  upcoming_event_count: number;
  support_url: string;
  links: Array<{
    type: string;
    url: string;
  }>;
  artist_optin_show_phone_number: boolean;
  show_multi_ticket: boolean;
}

interface BandsInTownVenue {
  location: string;
  name: string;
  latitude: string;
  longitude: string;
  street_address: string;
  postal_code: string;
  city: string;
  country: string;
  region: string;
}

interface BandsInTownOffer {
  status: string;
  type: string;
  url: string;
}

interface BandsInTownEvent {
  id: string;
  url: string;
  datetime: string;
  title: string;
  description: string;
  artist?: BandsInTownArtist;
  venue: BandsInTownVenue;
  lineup: string[];
  offers: BandsInTownOffer[];
  free: boolean;
  artist_id: string;
  on_sale_datetime: string;
  festival_start_date: string;
  festival_end_date: string;
  festival_datetime_display_rule: string;
  starts_at: string;
  ends_at: string;
  datetime_display_rule: string;
  bandsintown_plus: boolean;
  presale: string;
  sold_out: boolean;
}

interface EventsSectionProps {
  data: BandsInTownEvent[];
}

export function EventsSection({ data }: EventsSectionProps) {
  const events = data || [];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("es-ES", {
      month: "short",
      day: "numeric",
    });
  };

  const getTicketUrl = (event: BandsInTownEvent) => {
    if (event.offers && event.offers.length > 0) {
      return event.offers[0].url;
    }
    return event.url;
  };

  const getEventTitle = (event: BandsInTownEvent) => {
    if (event.title) return event.title;
    if (event.artist?.name) return `${event.artist.name} Live`;
    if (event.lineup.length > 0) return `${event.lineup[0]} Live`;
    return "Evento Musical";
  };

  const getLocation = (event: BandsInTownEvent) => {
    const { venue } = event;

    return (
      <span className="text-sm">
        <address itemScope itemType="https://schema.org/PostalAddress">
          <span itemProp="streetAddress">{venue.street_address}</span>,
          <span itemProp="postalCode">{venue.postal_code}</span>
          <br />
          <span itemProp="addressLocality">{venue.city}</span>,
          <span itemProp="addressCountry">{venue.country}</span>
        </address>
        <a
          href={`https://maps.google.com/?q=${venue.latitude},${venue.longitude}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Map
        </a>
      </span>
    );
  };

  const getButtonText = (event: BandsInTownEvent) => {
    if (event.sold_out) return "AGOTADO";
    if (event.free) return "GRATIS";
    if (event.offers.length === 0) return "PRÓXIMAMENTE";
    return "COMPRAR TICKETS";
  };

  const getButtonVariant = (event: BandsInTownEvent) => {
    if (event.sold_out) return "secondary";
    if (event.free) return "default";
    if (event.offers.length === 0) return "outline";
    return "default";
  };

  return (
    <section id="events" className="py-20 px-4 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-2">
            Upcoming Shows
          </h2>
        </motion.div>

        {events.length === 0 ? (
          <div className="text-center text-gray-400 py-12">
            No hay eventos próximos programados
          </div>
        ) : (
          <div className="space-y-0">
            {events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="grid grid-cols-12 gap-4 items-center py-6 border-b border-gray-800 hover:bg-gray-900/30 transition-colors duration-200"
              >
                {/* Fecha */}
                <div className="col-span-1 sm:col-span-1">
                  <div className="text-gray-400 text-sm font-medium">
                    {formatDate(event.starts_at)}
                  </div>
                </div>

                {/* Evento/Venue */}
                <div className="col-span-2 sm:col-span-4">
                  <div className="font-medium">{getEventTitle(event)}</div>
                  <div className="text-gray-400 text-sm">
                    {event.venue.name}
                  </div>
                </div>

                {/* Ubicación */}
                <div className="col-span-2 sm:col-span-2">
                  {getLocation(event)}
                </div>

                <div className="col-span-6 sm:col-span-2">
                  <div className="text-gray-400 text-sm">
                    <EventDescription text={event.description} />
                  </div>
                </div>

                {/* Botón */}
                <div className="col-span-1 sm:col-span-1 flex justify-end">
                  <Button
                    variant={getButtonVariant(event)}
                    size="sm"
                    className="bg-transparent border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-black transition-colors duration-200"
                    asChild={
                      !event.sold_out && (event.offers.length > 0 || event.free)
                    }
                    disabled={event.sold_out || event.offers.length === 0}
                  >
                    {!event.sold_out &&
                    (event.offers.length > 0 || event.free) ? (
                      <a
                        href={getTicketUrl(event)}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs font-medium"
                      >
                        {getButtonText(event)}
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    ) : (
                      <span className="text-xs font-medium">
                        {getButtonText(event)}
                      </span>
                    )}
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
