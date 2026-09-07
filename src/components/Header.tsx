import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE, NAV } from "@/lib/site-data";
import logo from "@/assets/logo.png";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt={SITE.name} className="h-12 w-auto" />
          <span className="sr-only">{SITE.name}</span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeProps={{ className: "text-acid" }}
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-acid"
            >
              {item.label}
            </Link>
          ))}
          <Button asChild className="ml-4 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link to="/torneios">Inscreva-se</Link>
          </Button>
          <Button asChild variant="ghost" size="icon" className="ml-1" aria-label="Painel administrativo">
            {/* Plain anchor, not router Link: /admin redirects unauthenticated
                users client-side (the _authenticated layout has ssr: false), so
                a Link's active-state would be computed differently on the server
                (still "/admin") than after client hydration redirects to "/auth",
                crashing hydration. A plain <a> has no active-state to mismatch. */}
            <a href="/admin">
              <User className="h-5 w-5" />
            </a>
          </Button>
        </nav>

        <button
          className="rounded-md p-2 text-foreground md:hidden"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col px-4 py-3">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setOpen(false)}
                activeProps={{ className: "text-acid" }}
                className="rounded-md px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-acid"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild className="mt-3 w-full bg-primary text-primary-foreground hover:bg-primary/90">
              <Link to="/torneios" onClick={() => setOpen(false)}>
                Inscreva-se em um torneio
              </Link>
            </Button>
            <Button asChild variant="outline" className="mt-2 w-full border-border bg-background">
              <a href="/admin" onClick={() => setOpen(false)}>
                <User className="mr-2 h-4 w-4" /> Painel administrativo
              </a>
            </Button>
          </nav>
        </div>
      )}
    </header>
  );
}
