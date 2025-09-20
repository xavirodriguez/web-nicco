"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import content from "@/data/content.json";
import { YouTubeEmbed } from "@next/third-parties/google";

export function MediaSection() {
  const { media } = content;

  return (
    <section id="media" className="py-20 px-4 bg-muted/20">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-balance">
            {media.title}
          </h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          {/* SoundCloud */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="lg:col-span-2 xl:col-span-1"
          >
            <Card className="h-full bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl">
                  {media.soundcloud.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center">
                  <iframe
                    width="100%"
                    height="100%"
                    scrolling="no"
                    frameBorder="no"
                    allow="autoplay"
                    src={media.soundcloud.embedUrl}
                    className="rounded-lg"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Spotify */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Card className="h-full bg-card border-border">
              <CardHeader>
                <CardTitle className="text-xl">{media.spotify.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <iframe
                  src={media.spotify.embedUrl}
                  width="100%"
                  allow="encrypted-media"
                  className="rounded-lg"
                />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
