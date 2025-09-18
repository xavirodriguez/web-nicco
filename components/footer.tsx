import content from "@/data/content.json"

export function Footer() {
  const { contact } = content

  return (
    <footer className="bg-muted py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="font-playfair text-2xl font-bold mb-4">ALEX NOVA</h3>
            <p className="text-muted-foreground text-sm">Electronic Music Producer & Live Performer</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm">
              <a href="#about" className="block text-muted-foreground hover:text-accent transition-colors">
                About
              </a>
              <a href="#media" className="block text-muted-foreground hover:text-accent transition-colors">
                Media
              </a>
              <a href="#events" className="block text-muted-foreground hover:text-accent transition-colors">
                Events
              </a>
              <a href="#contact" className="block text-muted-foreground hover:text-accent transition-colors">
                Contact
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>{contact.email}</p>
              <p>{contact.phone}</p>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-muted-foreground">© 2024 Alex Nova. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            {Object.entries(contact.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-accent transition-colors text-sm"
              >
                {platform.charAt(0).toUpperCase() + platform.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
