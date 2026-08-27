import { createFileRoute, Link } from "@tanstack/react-router";
import { Disc3, Target, Wind, Footprints } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { WHAT_IS_DISC_GOLF, DISC_TYPES, SITE } from "@/lib/site-data";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/aprenda")({
  head: () => ({
    meta: [
      { title: "Aprenda Disc Golf — A Turma do Disc Golf" },
      { name: "description", content: "Entenda como funciona o disc golf, quais são os tipos de disco e por onde começar a jogar em Ribeirão Preto." },
      { property: "og:title", content: "Aprenda Disc Golf — A Turma do Disc Golf" },
      { property: "og:description", content: "Entenda como funciona o disc golf, quais são os tipos de disco e por onde começar a jogar em Ribeirão Preto." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: LearnPage,
});

function LearnPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Aprenda Disc Golf</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            O esporte que combina precisão, estratégia e passeio ao ar livre. Aprenda as regras básicas e venha jogar com a gente.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-3">
          {WHAT_IS_DISC_GOLF.map((item, idx) => (
            <Card key={idx} className="border-border bg-card">
              <CardContent className="p-6">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/20">
                  {[<Target key="t" />, <Footprints key="f" />, <Wind key="w" />][idx]}
                </div>
                <h3 className="text-xl font-bold">{item.title}</h3>
                <p className="mt-2 text-muted-foreground">{item.text}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="bg-carbon">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-center text-3xl font-bold">Os três discos essenciais</h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-muted-foreground">
            Cada disco tem uma função no jogo. Comece com esses três e depois expanda sua bagagem.
          </p>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {DISC_TYPES.map((disc) => (
              <Card key={disc.name} className="overflow-hidden border-border bg-background">
                <div className="h-2 bg-gradient-to-r from-acid to-buzz" />
                <CardContent className="p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <Disc3 className="h-6 w-6 text-acid" />
                    <h3 className="text-xl font-bold">{disc.name}</h3>
                  </div>
                  <p className="text-muted-foreground">{disc.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Como começar agora</h2>
            <ol className="mt-6 space-y-4">
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-buzz text-sm font-bold text-secondary-foreground">1</span>
                <p className="text-muted-foreground">Venha a um treino aberto aos sábados e peça um disco emprestado.</p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-buzz text-sm font-bold text-secondary-foreground">2</span>
                <p className="text-muted-foreground">Aprenda o backhand e o putt básicos com nossos instrutores.</p>
              </li>
              <li className="flex gap-4">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-buzz text-sm font-bold text-secondary-foreground">3</span>
                <p className="text-muted-foreground">Participe de um torneio iniciante para sentir a adrenalha da competição.</p>
              </li>
            </ol>
          </div>
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <h3 className="text-xl font-bold">Assista nossos vídeos</h3>
            <p className="mt-2 text-muted-foreground">
              No nosso canal do YouTube você encontra dicas, coberturas de torneios e bastidores da turma.
            </p>
            <Button asChild className="mt-6 bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <a href={SITE.youtube} target="_blank" rel="noopener noreferrer">Abrir canal no YouTube</a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
