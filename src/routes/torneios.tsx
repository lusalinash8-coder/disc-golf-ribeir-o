import { createFileRoute } from "@tanstack/react-router";
import { ImageOff } from "lucide-react";
import { TournamentCard } from "@/components/TournamentCard";
import { PastTournamentCard } from "@/components/PastTournamentCard";
import { fetchPastTournaments, fetchTournaments } from "@/lib/tournaments";
import { isTournamentPast, type PastTournament } from "@/lib/site-data";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/torneios")({
  head: () => ({
    meta: [
      { title: "Torneios — A Turma do Disc Golf" },
      {
        name: "description",
        content:
          "Inscreva-se nos torneios de Disc Golf em Ribeirão Preto. Veja datas, divisões, valores e garanta sua vaga com cartão.",
      },
      { property: "og:title", content: "Torneios — A Turma do Disc Golf" },
      {
        property: "og:description",
        content:
          "Inscreva-se nos torneios de Disc Golf em Ribeirão Preto. Veja datas, divisões, valores e garanta sua vaga com cartão.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: hero },
      { name: "twitter:image", content: hero },
    ],
  }),
  loader: async () => {
    const [tournaments, pastTournaments] = await Promise.all([
      fetchTournaments(),
      fetchPastTournaments(),
    ]);
    return { tournaments, pastTournaments };
  },
  component: TournamentsPage,
});

function TournamentsPage() {
  const { tournaments, pastTournaments } = Route.useLoaderData();

  const upcomingTournaments = tournaments.filter((t) => !isTournamentPast(t));
  const finishedTournaments: PastTournament[] = tournaments
    .filter((t) => isTournamentPast(t))
    .map((t) => ({
      slug: t.slug,
      title: t.title,
      date: t.date,
      location: t.location,
      image: t.image,
      divisions: t.divisions.map((d) => d.name),
      photos: t.photos && t.photos.length > 0 ? t.photos : t.image ? [t.image] : [],
      ...(t.endDate ? { endDate: t.endDate } : {}),
      ...(t.sponsors ? { sponsors: t.sponsors } : {}),
    }));
  const allPastTournaments = [...finishedTournaments, ...pastTournaments].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );

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
            Competições organizadas pela Turma em parceria com as principais entidades do Disc Golf.
            Escolha sua divisão e garanta sua vaga.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="space-y-6">
          {upcomingTournaments.map((t) => (
            <TournamentCard key={t.slug} tournament={t} />
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold">Torneios realizados</h2>
        <p className="mt-2 text-muted-foreground">Um registro das edições anteriores da Turma.</p>

        <div className="mt-6 space-y-6">
          {allPastTournaments.length > 0 ? (
            allPastTournaments.map((t) => <PastTournamentCard key={t.slug} tournament={t} />)
          ) : (
            <div className="flex items-center gap-2 rounded-2xl border border-dashed border-border p-6 text-sm text-muted-foreground">
              <ImageOff className="h-4 w-4" /> Em breve, o registro dos nossos torneios anteriores.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
