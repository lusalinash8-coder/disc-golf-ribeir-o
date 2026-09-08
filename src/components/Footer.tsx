import { Link } from "@tanstack/react-router";
import { Instagram, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "@/components/icons/WhatsAppIcon";
import { SITE, NAV } from "@/lib/site-data";
import logo from "@/assets/logo-vertical-light.png";

export function Footer() {
  // O SSR roda em UTC (Workers) e o cliente no fuso do visitante, então
  // `new Date().getFullYear()` divergia entre servidor e cliente na virada do
  // ano (21h–24h de 31/12 no horário de Brasília) e quebrava a hidratação.
  // Fixar o fuso do site faz os dois computarem o mesmo ano.
  const year = new Intl.DateTimeFormat("pt-BR", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
  }).format(new Date());

  return (
    <footer className="border-t border-black/10 bg-white text-carbon">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 text-center md:grid-cols-4 md:text-left">
          <div className="md:col-span-2">
            <div className="mx-auto max-w-sm md:mx-0">
              <img src={logo} alt={SITE.name} className="mx-auto h-20 w-auto" />
              <p className="mt-3 text-sm text-gray-600">
                {SITE.description}
              </p>
            </div>
          </div>

          <div>
            <h3 className="font-['Orbitron'] text-sm font-semibold uppercase tracking-wider">Mapa</h3>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    className="text-sm text-gray-600 transition-colors hover:text-acid"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-['Orbitron'] text-sm font-semibold uppercase tracking-wider">Contato</h3>
            <ul className="mt-4 space-y-3 text-sm text-gray-600">
              <li className="flex items-center justify-center gap-2 md:justify-start">
                <MapPin className="h-4 w-4 shrink-0 text-acid" />
                {SITE.city}
              </li>
            </ul>
            <div className="mt-4 flex justify-center gap-3 md:justify-start">
              <Button size="icon" variant="outline" asChild className="rounded-full border-black/10 bg-black/5">
                <a href={SITE.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <Instagram className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild className="rounded-full border-black/10 bg-black/5">
                <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
                  <WhatsAppIcon className="h-4 w-4" />
                </a>
              </Button>
              <Button size="icon" variant="outline" asChild className="rounded-full border-black/10 bg-black/5">
                <a href={`mailto:${SITE.email}`} aria-label="E-mail">
                  <Mail className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-black/10 pt-8 text-center text-xs text-gray-600">
          {/* Resta uma janela de milissegundos exatamente na virada do ano,
              entre o render no servidor e a hidratação — irrelevante visualmente. */}
          <p suppressHydrationWarning>
            © {year} {SITE.name}. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
