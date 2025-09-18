"use client";

import { motion } from "framer-motion";
import content from "@/data/content.json";
import tracksData from "@/data/tracks.json";
import TrackCard from "./spotify/TrackCard";
import { Track } from "@/lib/types";

export function MusicSection() {
  const { media } = content;

  return (
    <section id="music" className="py-20 px-4 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <div
          className="
        grid grid-cols-4      
        sm:grid-cols-2      
        md:grid-cols-3 
        lg:grid-cols-4      
        xl:grid-cols-4 
        gap-6 
        justify-items-center"
        >
          {tracksData.tracks.map((track: Track) => (
            <TrackCard key={track.id} track={track} />
          ))}
        </div>
      </div>
    </section>
  );
}
