import { Link } from "@tanstack/react-router";
import { Instagram, Youtube, Mail, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, NAV } from "@/lib/site-data";
import symbol from "@/assets/symbol.png";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-carbon">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={symbol} alt="" className="h-10 w-auto" />
              <span className="font-['Orbitron'] text-lg font-bold">{SITE.name}</span>
            </div>
            <p className="mt-3 max-w-sm text-sm text-muted-foreground">
              {SITE.description}
            </p>
            <div className="mt-4 flex gap-3">
              <Button size="icon" variant="outline" asChild className="rounded-full border-border bg-background/50">
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild className="rounded-full border-border bg-background/50">
                <a href={SITE.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <Youtube className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild className="rounded-full border-border bg-background/50">
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <MessageCircle className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild className="rounded-full border-border bg-background/50">
                <a href={`mailto:${SITE.email}`} aria-label="E-mail">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-['Orbitron'] text-sm font-semibold uppercase tracking-wider">Mapa</h3>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-muted-foreground transition-colors hover:text-acid"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-['Orbitron'] text-sm font-semibold uppercase tracking-wider">Contato</h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                {SITE.city}
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-acid" />
                <a href={`mailto:${SITE.email}`} className="hover:text-acid">{SITE.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-xs text-muted-foreground">
          <p>
            © {year} {SITE.name}. Todos os direitos reservados.
          </p>
          <p className="mt-2">
            Dirigido por {SITE.director}. Trabalhamos de perto com USP, AJED, Disc Golf Brasil e PDGA.
          </p>
        </div>
      </div>
    </footer>
  );
}
