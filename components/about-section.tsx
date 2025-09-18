"use client";

import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import content from "@/data/content.json";

export function AboutSection() {
  const { about } = content;

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="font-playfair text-4xl md:text-5xl font-bold text-balance">
              {about.title}
            </h2>

            <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
              {about.description}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              {about.stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="p-6 text-center bg-card border-border">
                    <div className="text-3xl font-bold text-accent mb-2">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
