import { useState } from "react";
import { Calendar, MapPin, ChevronDown, ImageOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { TournamentLogoTile } from "@/components/TournamentLogoTile";
import { PhotoLightbox } from "@/components/PhotoLightbox";
import { PhotoThumbRow } from "@/components/PhotoThumbRow";
import { parseLocalDate, TOURNAMENT_DEFAULT_SPONSORS, type PastTournament } from "@/lib/site-data";

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

export function PastTournamentCard({ tournament: t }: { tournament: PastTournament }) {
  const [open, setOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sponsors = t.sponsors ?? TOURNAMENT_DEFAULT_SPONSORS;
  const photos = t.photos ?? [];

  return (
    <Collapsible open={open} onOpenChange={setOpen} className="overflow-hidden rounded-2xl border border-border bg-card">
      <div className="flex flex-col gap-5 p-6 sm:p-8 lg:flex-row lg:items-center">
        <TournamentLogoTile logo={t.image} title={t.title} className="mx-auto h-28 w-28 opacity-90 grayscale-[30%] sm:h-32 sm:w-32 lg:mx-0" />

        <div className="min-w-0 flex-1">
          <Badge variant="outline" className="border-muted-foreground bg-muted text-muted-foreground">Encerrado</Badge>
          <h2 className="mt-2 text-xl font-bold">{t.title}</h2>
          <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-acid" />
              {formatDateRange(t.date, t.endDate)}
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-acid" />
              {t.location}
            </div>
          </div>
        </div>

        <CollapsibleTrigger asChild>
          <Button variant="ghost" className="shrink-0 text-muted-foreground hover:bg-acid/10 hover:text-acid [&[data-state=open]>svg]:rotate-180">
            Ver fotos <ChevronDown className="ml-2 h-4 w-4 transition-transform duration-200" />
          </Button>
        </CollapsibleTrigger>
      </div>

      <CollapsibleContent className="overflow-hidden data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
        <div className="border-t border-border px-6 py-6 sm:px-8">
          {t.divisions && t.divisions.length > 0 && (
            <div className="mb-5 flex flex-wrap items-center gap-2">
              <span className="text-sm text-muted-foreground">Divisões:</span>
              {t.divisions.map((d) => (
                <Badge key={d} variant="outline" className="border-border text-foreground">
                  {d}
                </Badge>
              ))}
            </div>
          )}
          {photos.length > 0 ? (
            <PhotoThumbRow photos={photos} title={t.title} onOpen={setLightboxIndex} />
          ) : (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <ImageOff className="h-4 w-4" /> Fotos em breve.
            </div>
          )}
        </div>
      </CollapsibleContent>

      <PhotoLightbox photos={photos} index={lightboxIndex} onIndexChange={setLightboxIndex} title={t.title} />

      <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-border px-6 py-4 sm:px-8">
        <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">Apoio e parceria:</span>
        {sponsors.map((s) => (
          <img key={s.name} src={s.logo} alt={s.fullName} title={s.fullName} className="h-6 w-auto object-contain opacity-70" />
        ))}
      </div>
    </Collapsible>
  );
}
