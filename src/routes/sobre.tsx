import { createFileRoute } from "@tanstack/react-router";
import { Target, HeartHandshake, Users2, Award } from "lucide-react";
import { PARTNERS, SITE } from "@/lib/site-data";
import hero from "@/assets/hero.jpg";
import okyPhoto from "@/assets/sobre/Oky.jpg";
import teamPhoto1 from "@/assets/sobre/IMG_5962.jpg";
import teamPhoto2 from "@/assets/sobre/IMG_5963.jpg";
import teamPhoto3 from "@/assets/sobre/IMG_5964.jpg";
import teamPhoto4 from "@/assets/sobre/IMG_5965.jpg";
import teamPhoto5 from "@/assets/sobre/IMG_5966.jpg";
import teamPhoto6 from "@/assets/sobre/IMG_5967.jpg";
import teamPhoto7 from "@/assets/sobre/IMG_5968.jpg";
import teamPhoto8 from "@/assets/sobre/IMG_5969.jpg";
import teamPhoto9 from "@/assets/sobre/IMG_5970.jpg";
import teamPhoto10 from "@/assets/sobre/IMG_5971.jpg";
import teamPhoto11 from "@/assets/sobre/IMG_5972.jpg";
import teamPhoto12 from "@/assets/sobre/IMG_5973.jpg";
import teamPhoto13 from "@/assets/sobre/IMG_5974.jpg";

const TEAM_PHOTOS = [
  okyPhoto,
  teamPhoto1,
  teamPhoto2,
  teamPhoto3,
  teamPhoto4,
  teamPhoto5,
  teamPhoto6,
  teamPhoto7,
  teamPhoto8,
  teamPhoto9,
  teamPhoto10,
  teamPhoto11,
  teamPhoto12,
  teamPhoto13,
];

const MARQUEE_SIZES = [
  "h-36 w-52 sm:h-44 sm:w-64",
  "h-48 w-64 sm:h-60 sm:w-80",
  "h-40 w-56 sm:h-48 sm:w-72",
  "h-52 w-72 sm:h-64 sm:w-96",
];

const MARQUEE_PHOTOS = TEAM_PHOTOS.map((photo, i) => ({
  photo,
  size: MARQUEE_SIZES[i % MARQUEE_SIZES.length],
}));

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: "Sobre — A Turma do Disc Golf" },
      { name: "description", content: "Conheça a Turma do Disc Golf: nossa história, valores e como promovemos o Disc Golf em Ribeirão Preto." },
      { property: "og:title", content: "Sobre — A Turma do Disc Golf" },
      { property: "og:description", content: "Conheça a Turma do Disc Golf: nossa história, valores e como promovemos o Disc Golf em Ribeirão Preto." },
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
            Somos um grupo apaixonado por Disc Golf que acredita no poder do esporte para transformar pessoas e comunidades.
          </p>
        </div>
      </section>

      <section className="overflow-hidden py-6">
        <div
          className="animate-marquee flex w-max items-center gap-4"
          style={{
            maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
          }}
        >
          {[...MARQUEE_PHOTOS, ...MARQUEE_PHOTOS].map((item, idx) => (
            <div
              key={idx}
              className={`${item.size} shrink-0 overflow-hidden rounded-lg border border-border`}
            >
              <img
                src={item.photo}
                alt=""
                loading="lazy"
                className="h-full w-full object-cover grayscale transition-all duration-500 hover:scale-110 hover:grayscale-0"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold">Nossa história</h2>
            <p className="mt-4 text-muted-foreground">
              A Turma do Disc Golf surgiu do desejo de popularizar o Disc Golf em Ribeirão Preto, um esporte que vem ganhando muito impulso globalmente.
            </p>
            <p className="mt-4 text-muted-foreground">
              Movido por Oky Leon, o projeto começou reunindo amigos, atletas e entusiastas para treinar em parques locais, criar conteúdo e organizar eventos na cidade para crescer em comunidade.
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
                  <p className="font-semibold">Comunidade</p>
                  <p className="text-sm text-muted-foreground">Aberto a todas as idades, famílias e níveis de habilidade.</p>
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
                  <p className="text-sm text-muted-foreground">Buscamos a melhor experiência em cada treino e evento.</p>
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
            Desenvolvemos nossas atividades de mãos dadas com instituições que fortalecem o Disc Golf no Brasil e no mundo.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {PARTNERS.map((p) => (
              <div
                key={p.name}
                className="flex flex-col items-center rounded-xl border border-border bg-background p-6 transition-transform hover:-translate-y-1"
              >
                <img src={p.logo} alt={p.name} className="h-14 w-auto object-contain" />
                <p className="mt-4 text-sm text-muted-foreground">{p.fullName}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
