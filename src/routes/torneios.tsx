import { createFileRoute, Link } from "@tanstack/react-router";
import { Calendar, MapPin, ArrowRight, Trophy, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TOURNAMENTS } from "@/lib/site-data";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/torneios")({
  head: () => ({
    meta: [
      { title: "Torneios — A Turma do Disc Golf" },
      { name: "description", content: "Inscreva-se nos torneios de disc golf em Ribeirão Preto. Veja datas, divisões, valores e garanta sua vaga com cartão." },
      { property: "og:title", content: "Torneios — A Turma do Disc Golf" },
      { property: "og:description", content: "Inscreva-se nos torneios de disc golf em Ribeirão Preto. Veja datas, divisões, valores e garanta sua vaga com cartão." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: TournamentsPage,
});

function TournamentsPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Torneios</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Competições organizadas pela Turma em parceria com as principais entidades do disc golf. Escolha sua divisão e garanta sua vaga.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2">
          {TOURNAMENTS.map((t) => (
            <Card key={t.slug} className="group overflow-hidden border-border bg-card transition-transform hover:-translate-y-1">
              <div className="relative h-48 overflow-hidden">
                <img
                  src={t.image}
                  alt={t.title}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  width={800}
                  height={400}
                />
                <div className="absolute left-4 top-4">
                  <Badge className={statusBadgeClass(t.status)}>{statusLabel(t.status)}</Badge>
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-2xl">{t.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4 text-acid" />
                  {new Date(t.date).toLocaleDateString("pt-BR", { weekday: "long", day: "2-digit", month: "long", year: "numeric" })}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-acid" />
                  {t.location}
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="h-4 w-4 text-buzz" />
                  Inscrições até {new Date(t.registrationDeadline).toLocaleDateString("pt-BR")}
                </div>
                <p className="text-sm text-muted-foreground">{t.description}</p>
                <Button asChild className="mt-2 w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <Link to="/torneios/$slug" params={{ slug: t.slug }}>
                    Ver detalhes <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

function statusLabel(status: string) {
  switch (status) {
    case "open":
      return "Inscrições abertas";
    case "waitlist":
      return "Lista de espera";
    case "closed":
      return "Encerrado";
    default:
      return status;
  }
}

function statusBadgeClass(status: string) {
  switch (status) {
    case "open":
      return "border-acid bg-acid/10 text-acid";
    case "waitlist":
      return "border-buzz bg-buzz/10 text-buzz";
    case "closed":
      return "border-muted-foreground bg-muted text-muted-foreground";
    default:
      return "";
  }
}
