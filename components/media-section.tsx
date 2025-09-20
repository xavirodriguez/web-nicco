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
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="lg:col-span-2 xl:col-span-1"
          >
            <Card className="h-full bg-card border-border">
              <CardContent
                className="
               grid grid-cols-3 md:grid-cols-2 sm:grid-cols-1
               gap-6
        "
              >
                <YouTubeEmbed videoid="KAO9syGw_qs" />
                <YouTubeEmbed videoid="gv3MkEmbuVA" />
                <YouTubeEmbed videoid="8mMzy8ZTdGE" />
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
