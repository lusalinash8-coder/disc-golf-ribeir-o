import { Link } from "@tanstack/react-router";
import { Calendar, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { TournamentLogoTile } from "@/components/TournamentLogoTile";
import { parseLocalDate, TOURNAMENT_DEFAULT_SPONSORS, type Tournament } from "@/lib/site-data";

function formatDateRange(date: string, endDate?: string) {
  const start = parseLocalDate(date);
  const startLabel = start.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" });
  if (!endDate) return startLabel;
  const end = parseLocalDate(endDate);
  const sameMonth = start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();
  if (sameMonth) {
    return `${start.getDate()} e ${end.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}`;
  }
  return `${startLabel} a ${end.toLocaleDateString("pt-BR", { day: "2-digit", month: "long", year: "numeric" })}`;
}

export function statusLabel(status: string) {
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

export function statusBadgeClass(status: string) {
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

export { formatDateRange };

export function TournamentCard({ tournament: t }: { tournament: Tournament }) {
  const sponsors = t.sponsors ?? TOURNAMENT_DEFAULT_SPONSORS;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center">
        <TournamentLogoTile logo={t.image} title={t.title} className="mx-auto h-32 w-32 sm:h-36 sm:w-36 lg:mx-0" />

        <div className="min-w-0 flex-1">
          <Badge variant="outline" className={statusBadgeClass(t.status)}>{statusLabel(t.status)}</Badge>
          <h2 className="mt-2 text-2xl font-bold">{t.title}</h2>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-acid" />
              {formatDateRange(t.date, t.endDate)}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-acid" />
              {t.location}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-buzz" />
              Inscrições até {parseLocalDate(t.registrationDeadline).toLocaleDateString("pt-BR")}
              {!t.registrationDeadlineConfirmed && " (a confirmar)"}
            </div>
          </div>
        </div>

        <Button asChild size="lg" className="shrink-0 bg-primary text-primary-foreground hover:bg-primary/90">
          <Link to="/torneios/$slug" params={{ slug: t.slug }}>
            Conhecer mais detalhes <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border px-6 py-4 sm:px-8">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Apoio e parceria:</span>
        {sponsors.map((s) => (
          <img key={s.name} src={s.logo} alt={s.fullName} title={s.fullName} className="h-6 w-auto object-contain opacity-70" />
        ))}
      </div>
    </div>
  );
}
