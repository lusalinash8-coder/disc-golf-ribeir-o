import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Calendar, MapPin, Users, Trophy, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PARTNERS, TRAININGS, TOURNAMENTS, SITE } from "@/lib/site-data";
import hero from "@/assets/hero.jpg";
import symbol from "@/assets/symbol.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "A Turma do Disc Golf — Disc Golf em Ribeirão Preto" },
      { name: "description", content: "Grupo esportivo e inclusivo de disc golf em Ribeirão Preto. Treinos, campeonatos e muita diversão ao ar livre." },
      { property: "og:title", content: "A Turma do Disc Golf — Disc Golf em Ribeirão Preto" },
      { property: "og:description", content: "Grupo esportivo e inclusivo de disc golf em Ribeirão Preto. Treinos, campeonatos e muita diversão ao ar livre." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const nextTournament = TOURNAMENTS[0];
  const openTraining = TRAININGS[0];

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={hero}
            alt="Cesta de disc golf ao pôr do sol"
            className="h-full w-full object-cover"
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/60" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
        </div>
        <div className="relative mx-auto flex min-h-[80vh] max-w-7xl items-center px-4 py-24 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="outline" className="mb-4 border-acid text-acid">
              Esporte • Natureza • Comunidade
            </Badge>
            <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              Jogue <span className="text-gradient-brand">disc golf</span> em Ribeirão Preto
            </h1>
            <p className="mt-6 text-lg text-muted-foreground sm:text-xl">
              Somos um grupo esportivo e inclusivo que promove, ensina e pratica o disc golf na região. Venha treinar, competir e fazer parte da turma.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button asChild size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Link to="/torneios">
                  Ver torneios <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-buzz text-buzz hover:bg-buzz/10">
                <Link to="/treinos">Encontrar treinos</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Quick info cards */}
      <section className="mx-auto -mt-16 max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="border-border bg-card/80 backdrop-blur">
            <CardContent className="p-5">
              <Calendar className="h-6 w-6 text-acid" />
              <p className="mt-2 text-sm text-muted-foreground">Próximo treino</p>
              <p className="font-semibold">{openTraining.day}, {openTraining.time}</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card/80 backdrop-blur">
            <CardContent className="p-5">
              <Trophy className="h-6 w-6 text-buzz" />
              <p className="mt-2 text-sm text-muted-foreground">Próximo torneio</p>
              <p className="font-semibold">{nextTournament.title}</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card/80 backdrop-blur">
            <CardContent className="p-5">
              <MapPin className="h-6 w-6 text-acid" />
              <p className="mt-2 text-sm text-muted-foreground">Onde jogamos</p>
              <p className="font-semibold">{SITE.city}</p>
            </CardContent>
          </Card>
          <Card className="border-border bg-card/80 backdrop-blur">
            <CardContent className="p-5">
              <Users className="h-6 w-6 text-buzz" />
              <p className="mt-2 text-sm text-muted-foreground">Comunidade</p>
              <p className="font-semibold">Aberto a todos</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* About teaser */}
      <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-3xl font-bold sm:text-4xl">Quem somos</h2>
            <p className="mt-4 text-muted-foreground">
              A Turma do Disc Golf nasceu da vontade de reunir pessoas ao redor de um esporte acessível, divertido e desafiador. Sob a coordenação de {SITE.director}, realizamos treinos, eventos e campeonatos para todos os níveis.
            </p>
            <p className="mt-4 text-muted-foreground">
              Trabalhamos de perto com USP, AJED, Disc Golf Brasil e PDGA para fortalecer o disc golf em Ribeirão Preto e região.
            </p>
            <Button asChild variant="link" className="mt-2 p-0 text-acid">
              <Link to="/sobre">Conheça nossa história <ChevronRight className="ml-1 h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl bg-gradient-to-br from-acid/20 to-buzz/20 blur-2xl" />
            <img
              src={symbol}
              alt="Símbolo da Turma do Disc Golf"
              className="relative rounded-2xl bg-carbon p-8"
              width={400}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* Learn teaser */}
      <section className="bg-carbon">
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">Nunca jogou?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
              Disc golf é fácil de começar e difícil de abandonar. Aprenda as regras, conheça os discos e venha fazer o primeiro arremesso com a gente.
            </p>
            <Button asChild className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <Link to="/aprenda">Aprenda disc golf</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <p className="text-center text-sm font-medium uppercase tracking-widest text-muted-foreground">
          Trabalhamos de perto com
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-8 opacity-80 grayscale hover:grayscale-0">
          {PARTNERS.map((p) => (
            <div key={p.name} className="flex flex-col items-center">
              <span className="font-['Orbitron'] text-xl font-bold text-foreground">{p.name}</span>
              <span className="text-xs text-muted-foreground">{p.role}</span>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
