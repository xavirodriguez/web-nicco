"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, Instagram, Music, Youtube, Twitter } from "lucide-react";
import content from "@/data/content.json";

export function ContactSection() {
  const { contact } = content;

  const socialIcons = {
    instagram: Instagram,
    soundcloud: Music,
    spotify: Music,
    youtube: Youtube,
    twitter: Twitter,
  };

  return (
    <section id="contact" className="py-20 px-4 bg-muted/20">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-6 text-balance">
            {contact.title}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            {contact.description}
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4 mb-4">
                  <Mail className="w-6 h-6 text-accent" />
                  <div>
                    <h3 className="font-semibold">Email</h3>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      {contact.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <Phone className="w-6 h-6 text-accent" />
                  <div>
                    <h3 className="font-semibold">Phone</h3>
                    <a
                      href={`tel:${contact.phone}`}
                      className="text-muted-foreground hover:text-accent transition-colors"
                    >
                      {contact.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Social Links */}
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Follow Me</h3>
                <div className="grid grid-cols-2 gap-4">
                  {/* }
                  {Object.entries(contact.social).map(([platform, url]) => {
                    const Icon = socialIcons[platform as keyof typeof socialIcons]
                    return (
                      <Button
                        key={platform}
                        variant="outline"
                        size="sm"
                        className="justify-start gap-2 border-border hover:bg-accent hover:text-accent-foreground bg-transparent"
                        asChild
                      >
                        <a href={url} target="_blank" rel="noopener noreferrer">
                          <Icon className="w-4 h-4" />
                          {platform.charAt(0).toUpperCase() + platform.slice(1)}
                        </a>
                      </Button>
                    )
                  })}
                */}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4">Quick Booking Inquiry</h3>
                <form className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <input
                      type="date"
                      placeholder="Event Date"
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    />
                  </div>
                  <div>
                    <textarea
                      placeholder="Tell me about your event..."
                      rows={4}
                      className="w-full p-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
                  >
                    Send Inquiry
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
