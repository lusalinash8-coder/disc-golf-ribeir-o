import { createFileRoute } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Clock, MapPin } from "lucide-react";
import { fetchTrainings } from "@/lib/trainings";

export const Route = createFileRoute("/_authenticated/admin/treinos")({
  head: () => ({
    meta: [{ title: "Treinos — Painel Administrativo" }],
  }),
  loader: async () => ({
    trainings: await fetchTrainings(),
  }),
  component: AdminTreinos,
});

function AdminTreinos() {
  const { trainings } = Route.useLoaderData();

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Treinos</h1>
        <p className="text-muted-foreground">Treinos semanais cadastrados no site.</p>
      </div>

      <Card className="border-border bg-card">
        <CardContent className="space-y-3 p-5">
          {trainings.length === 0 && (
            <p className="text-sm text-muted-foreground">Nenhum treino cadastrado.</p>
          )}
          {trainings.map((t) => (
            <div key={t.id} className="rounded-lg border border-border bg-background p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-semibold">{t.title}</p>
                <div className="flex items-center gap-2">
                  {!t.confirmed && (
                    <Badge variant="secondary" className="bg-muted text-muted-foreground">
                      Não confirmado
                    </Badge>
                  )}
                  <Badge
                    variant={t.status === "active" ? "default" : "secondary"}
                    className={t.status === "active" ? "bg-acid text-background" : ""}
                  >
                    {t.status === "active" ? "Ativo" : "Suspenso"}
                  </Badge>
                </div>
              </div>
              <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Calendar className="h-3 w-3" /> {t.day}
                </span>
                <span className="inline-flex items-center gap-1">
                  <Clock className="h-3 w-3" /> {t.time}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> {t.location}
                </span>
                <span>Nível: {t.level}</span>
              </p>
              <p className="mt-2 text-sm text-muted-foreground">{t.description}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </section>
  );
}
