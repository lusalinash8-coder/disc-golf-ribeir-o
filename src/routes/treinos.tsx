import { createFileRoute, Link } from "@tanstack/react-router";
import { CalendarDays, Clock, MapPin, Users, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TRAININGS, SITE } from "@/lib/site-data";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/treinos")({
  head: () => ({
    meta: [
      { title: "Treinos e Agenda — A Turma do Disc Golf" },
      { name: "description", content: "Veja nossa agenda de treinos abertos, aulas de iniciação e eventos especiais de disc golf em Ribeirão Preto." },
      { property: "og:title", content: "Treinos e Agenda — A Turma do Disc Golf" },
      { property: "og:description", content: "Veja nossa agenda de treinos abertos, aulas de iniciação e eventos especiais de disc golf em Ribeirão Preto." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: TrainingsPage,
});

function TrainingsPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Treinos e Agenda</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Treinos regulares, aulas de iniciação e eventos especiais. Escolha o melhor momento para entrar na turma.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2">
          {TRAININGS.map((t) => (
            <Card key={t.id} className="border-border bg-card">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <CardTitle className="text-2xl">{t.title}</CardTitle>
                  <Badge variant="outline" className="border-acid text-acid">{t.level}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <CalendarDays className="h-4 w-4 text-buzz" />
                    {t.day}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-buzz" />
                    {t.time}
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-buzz" />
                    {t.location}
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-buzz" />
                    Aberto à comunidade
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{t.description}</p>
                <Button asChild className="w-full bg-primary text-primary-foreground hover:bg-primary/90">
                  <a href={SITE.whatsapp} target="_blank" rel="noopener noreferrer">Confirmar presença no WhatsApp</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-carbon">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="text-2xl font-bold">O que levar para o treino</h2>
              <ul className="mt-6 space-y-3">
                {[
                  "Água e protetor solar",
                  "Roupas confortáveis para caminhar no parque",
                  "Seus discos (ou peça emprestado conosco)",
                  "Bom humor e vontade de aprender",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-muted-foreground">
                    <CheckCircle2 className="h-5 w-5 text-acid" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl font-bold">Fique por dentro</h2>
              <p className="mt-4 text-muted-foreground">
                A agenda pode mudar por causa de clima ou eventos especiais. Siga nosso Instagram para avisos e confirme presença pelo WhatsApp.
              </p>
              <div className="mt-6 flex gap-4">
                <Button asChild variant="outline" className="border-buzz text-buzz hover:bg-buzz/10">
                  <a href={SITE.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
                </Button>
                <Button asChild variant="outline" className="border-acid text-acid hover:bg-acid/10">
                  <Link to="/torneios">Ver torneios</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
