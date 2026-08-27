import { createFileRoute, Link } from "@tanstack/react-router";
import { Target, HeartHandshake, Users2, Award } from "lucide-react";
import { PARTNERS, SITE } from "@/lib/site-data";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — A Turma do Disc Golf" },
      { name: "description", content: "Conheça a Turma do Disc Golf: nossa história, valores e como promovemos o disc golf em Ribeirão Preto." },
      { property: "og:title", content: "Sobre — A Turma do Disc Golf" },
      { property: "og:description", content: "Conheça a Turma do Disc Golf: nossa história, valores e como promovemos o disc golf em Ribeirão Preto." },
      { property: "og:type", content: "website" },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0">
          <img src={hero} alt="" className="h-full w-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold sm:text-5xl">Sobre a Turma</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            Somos um grupo apaixonado por disc golf que acredita no poder do esporte para transformar pessoas e comunidades.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Nossa história</h2>
            <p className="mt-4 text-muted-foreground">
              A Turma do Disc Golf surgiu da vontade de popularizar o disc golf em Ribeirão Preto. Oky Leon reuniu amigos, atletas e curiosos para treinar em parques, gravar conteúdos e organizar os primeiros eventos da cidade.
            </p>
            <p className="mt-4 text-muted-foreground">
              Hoje, somos uma comunidade vibrante que recebe iniciantes, organiza campeonatos e representa a cidade em eventos nacionais.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Nossos valores</h2>
            <ul className="mt-4 space-y-4">
              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <Users2 className="h-5 w-5 text-acid" />
                </div>
                <div>
                  <p className="font-semibold">Inclusão</p>
                  <p className="text-sm text-muted-foreground">Todas as idades, gêneros e níveis são bem-vindos.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                  <HeartHandshake className="h-5 w-5 text-buzz" />
                </div>
                <div>
                  <p className="font-semibold">Respeito</p>
                  <p className="text-sm text-muted-foreground">Espírito esportivo, cuidado com a natureza e ética de jogo.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20">
                  <Target className="h-5 w-5 text-acid" />
                </div>
                <div>
                  <p className="font-semibold">Evolução</p>
                  <p className="text-sm text-muted-foreground">Treinos regulares, feedback e competições para crescer junto.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/20">
                  <Award className="h-5 w-5 text-buzz" />
                </div>
                <div>
                  <p className="font-semibold">Excelência</p>
                  <p className="text-sm text-muted-foreground">Organizamos eventos com padronização PDGA e experiência de alto nível.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-carbon">
        <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Quem trabalha com a gente</h2>
          <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
            Desenvolvemos nossas atividades de mãos dadas com instituições que fortalecem o disc golf no Brasil e no mundo.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((p) => (
              <div key={p.name} className="rounded-xl border border-border bg-background p-6 transition-transform hover:-translate-y-1">
                <p className="font-['Orbitron'] text-xl font-bold">{p.name}</p>
                <p className="mt-2 text-sm text-muted-foreground">{p.role}</p>
              </div>
            ))}
          </div>
          <p className="mt-8 text-xs text-muted-foreground">
            A Turma do Disc Golf é um grupo independente e colabora com estas entidades sem vínculos jurídicos.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-20 text-center sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold">Quer fazer parte?</h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Apareça em um treino, acompanhe nossas redes ou se inscreva no próximo torneio.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Link
            to="/treinos"
            className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Ver treinos
          </Link>
          <Link
            to="/torneios"
            className="inline-flex items-center justify-center rounded-md border border-buzz px-6 py-3 font-medium text-buzz transition-colors hover:bg-buzz/10"
          >
            Ver torneios
          </Link>
        </div>
      </section>
    </>
  );
}
