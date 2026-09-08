import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import {
  Archive,
  ArchiveRestore,
  ArrowRight,
  Calendar,
  DollarSign,
  Loader2,
  MapPin,
  Pencil,
  Plus,
  Trash2,
  Users,
} from "lucide-react";
import { isTournamentPast, parseLocalDate, type Tournament } from "@/lib/site-data";
import {
  fetchTournamentBySlug,
  fetchTournaments,
  deleteTournament,
  setTournamentArchived,
} from "@/lib/tournaments";
import { fetchRegistrations, type Registration } from "@/lib/registrations";
import { TournamentFormDialog } from "@/components/admin/TournamentFormDialog";
import { TournamentGalleryManager } from "@/components/admin/TournamentGalleryManager";

const STATUS_LABEL: Record<string, string> = {
  open: "Aberto",
  closed: "Fechado",
  waitlist: "Lista de espera",
};

export const Route = createFileRoute("/_authenticated/admin/torneios")({
  head: () => ({
    meta: [{ title: "Torneios — Painel Administrativo" }],
  }),
  loader: async () => ({
    tournaments: await fetchTournaments(),
    registrations: await fetchRegistrations(),
  }),
  component: AdminTorneios,
});

function confirmedStatsFor(slug: string, registrations: Registration[]) {
  const confirmed = registrations.filter(
    (r) => r.tournamentSlug === slug && r.status === "confirmed",
  );
  return {
    count: confirmed.length,
    revenue: confirmed.reduce((acc, r) => acc + r.price, 0),
  };
}

/** Considera só a data (ignora arquivamento manual) — usado para decidir se "Desarquivar" faz sentido. */
function isPastByDateOnly(t: Tournament): boolean {
  const today = new Date().toISOString().slice(0, 10);
  return (t.endDate ?? t.date) < today;
}

function AdminTorneios() {
  const { tournaments: initialTournaments, registrations } = Route.useLoaderData();
  const [tournaments, setTournaments] = useState(initialTournaments);
  const [formOpen, setFormOpen] = useState(false);
  const [editingTournament, setEditingTournament] = useState<Tournament | undefined>(undefined);
  const [archivingSlug, setArchivingSlug] = useState<string | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Tournament | null>(null);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [deleting, setDeleting] = useState(false);

  const activeTournaments = tournaments.filter((t) => !isTournamentPast(t));
  const pastTournaments = tournaments.filter((t) => isTournamentPast(t));

  function upsertTournament(t: Tournament) {
    setTournaments((prev) => {
      const exists = prev.some((x) => x.slug === t.slug);
      const next = exists ? prev.map((x) => (x.slug === t.slug ? t : x)) : [...prev, t];
      return [...next].sort((a, b) => (a.date < b.date ? -1 : 1));
    });
  }

  function openCreate() {
    setEditingTournament(undefined);
    setFormOpen(true);
  }

  function openEdit(t: Tournament) {
    setEditingTournament(t);
    setFormOpen(true);
  }

  async function handleArchiveToggle(t: Tournament, archived: boolean) {
    setArchivingSlug(t.slug);
    try {
      await setTournamentArchived(t.slug, archived);
      const updated = await fetchTournamentBySlug(t.slug);
      if (updated) upsertTournament(updated);
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Não foi possível atualizar o torneio.");
    } finally {
      setArchivingSlug(null);
    }
  }

  async function handleDeleteConfirm() {
    if (!deleteTarget) return;
    setDeleting(true);
    try {
      await deleteTournament(deleteTarget.slug);
      setTournaments((prev) => prev.filter((x) => x.slug !== deleteTarget.slug));
      setDeleteTarget(null);
      setDeleteConfirmText("");
    } catch (err) {
      window.alert(err instanceof Error ? err.message : "Não foi possível excluir o torneio.");
    } finally {
      setDeleting(false);
    }
  }

  function handlePhotosChange(slug: string, photos: string[]) {
    setTournaments((prev) => prev.map((t) => (t.slug === slug ? { ...t, photos } : t)));
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold">Torneios</h1>
          <p className="text-muted-foreground">Torneios cadastrados, divisões e vagas.</p>
        </div>
        <Button className="bg-acid text-background hover:bg-acid/90" onClick={openCreate}>
          <Plus className="mr-1 h-4 w-4" /> Novo torneio
        </Button>
      </div>

      <div className="space-y-4">
        {activeTournaments.length === 0 && (
          <Card className="border-border bg-card">
            <CardContent className="p-5 text-sm text-muted-foreground">
              {tournaments.length === 0
                ? "Nenhum torneio cadastrado."
                : "Nenhum torneio ativo no momento."}
            </CardContent>
          </Card>
        )}
        {activeTournaments.map((t) => (
          <Card key={t.slug} className="border-border bg-card">
            <CardContent className="space-y-4 p-5">
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-semibold">{t.title}</p>
                    <Badge
                      variant={t.status === "open" ? "default" : "secondary"}
                      className={t.status === "open" ? "bg-acid text-background" : ""}
                    >
                      {STATUS_LABEL[t.status] ?? t.status}
                    </Badge>
                  </div>
                  <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="h-3 w-3" />{" "}
                      {parseLocalDate(t.date).toLocaleDateString("pt-BR")}
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {t.location}
                    </span>
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border bg-background"
                    onClick={() => openEdit(t)}
                  >
                    <Pencil className="mr-1 h-3 w-3" /> Editar
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-border bg-background"
                  >
                    <Link to="/admin/inscricoes" search={{ torneio: t.slug }}>
                      <Users className="mr-1 h-3 w-3" /> Ver inscritos
                    </Link>
                  </Button>
                  <Button
                    asChild
                    size="sm"
                    variant="outline"
                    className="border-acid text-acid hover:bg-acid/10 hover:text-acid"
                  >
                    <Link to="/torneios/$slug" params={{ slug: t.slug }}>
                      Ver no site <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-border bg-background"
                    disabled={archivingSlug === t.slug}
                    onClick={() => handleArchiveToggle(t, true)}
                  >
                    {archivingSlug === t.slug ? (
                      <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                    ) : (
                      <Archive className="mr-1 h-3 w-3" />
                    )}
                    Arquivar agora
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                    onClick={() => setDeleteTarget(t)}
                  >
                    <Trash2 className="mr-1 h-3 w-3" /> Excluir
                  </Button>
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                {t.divisions.map((div) => (
                  <div
                    key={div.name}
                    className="rounded-lg border border-border bg-background p-3 text-sm"
                  >
                    <p className="font-medium">{div.name}</p>
                    <p className="text-xs text-muted-foreground">{div.spots ?? "—"} vagas</p>
                    <p className="text-xs text-muted-foreground">
                      {div.prices.map((p) => `${p.label}: R$ ${p.price}`).join(" · ") ||
                        "Sem preço cadastrado"}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-bold">Torneios passados</h2>
        <p className="text-sm text-muted-foreground">
          Arquivados automaticamente quando a data do torneio passa (ou manualmente, a qualquer
          momento) — inscrições e receita continuam contando no Financeiro.
        </p>

        <div className="mt-4 space-y-4">
          {pastTournaments.length === 0 && (
            <Card className="border-border bg-card">
              <CardContent className="p-5 text-sm text-muted-foreground">
                Nenhum torneio passado ainda.
              </CardContent>
            </Card>
          )}
          {pastTournaments.map((t) => {
            const stats = confirmedStatsFor(t.slug, registrations);
            const manuallyArchived = Boolean(t.archivedAt) && !isPastByDateOnly(t);
            return (
              <Card key={t.slug} className="border-border bg-card">
                <CardContent className="space-y-4 p-5">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold">{t.title}</p>
                        <Badge variant="secondary">Encerrado</Badge>
                      </div>
                      <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                        <span className="inline-flex items-center gap-1">
                          <Calendar className="h-3 w-3" />{" "}
                          {parseLocalDate(t.date).toLocaleDateString("pt-BR")}
                        </span>
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {t.location}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-border bg-background"
                        onClick={() => openEdit(t)}
                      >
                        <Pencil className="mr-1 h-3 w-3" /> Editar
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-border bg-background"
                      >
                        <Link to="/admin/inscricoes" search={{ torneio: t.slug }}>
                          <Users className="mr-1 h-3 w-3" /> Ver inscritos
                        </Link>
                      </Button>
                      <Button
                        asChild
                        size="sm"
                        variant="outline"
                        className="border-acid text-acid hover:bg-acid/10 hover:text-acid"
                      >
                        <Link to="/torneios/$slug" params={{ slug: t.slug }}>
                          Ver no site <ArrowRight className="ml-1 h-3 w-3" />
                        </Link>
                      </Button>
                      {manuallyArchived && (
                        <Button
                          size="sm"
                          variant="outline"
                          className="border-border bg-background"
                          disabled={archivingSlug === t.slug}
                          onClick={() => handleArchiveToggle(t, false)}
                        >
                          {archivingSlug === t.slug ? (
                            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
                          ) : (
                            <ArchiveRestore className="mr-1 h-3 w-3" />
                          )}
                          Desarquivar
                        </Button>
                      )}
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-destructive text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => setDeleteTarget(t)}
                      >
                        <Trash2 className="mr-1 h-3 w-3" /> Excluir
                      </Button>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2">
                    <div className="rounded-lg border border-border bg-background p-3">
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" /> Inscritos confirmados
                      </p>
                      <p className="text-lg font-bold">{stats.count}</p>
                    </div>
                    <div className="rounded-lg border border-border bg-background p-3">
                      <p className="flex items-center gap-1 text-xs text-muted-foreground">
                        <DollarSign className="h-3 w-3" /> Receita confirmada
                      </p>
                      <p className="text-lg font-bold text-acid">R$ {stats.revenue}</p>
                    </div>
                  </div>

                  <TournamentGalleryManager
                    slug={t.slug}
                    photos={t.photos ?? []}
                    onChange={(photos) => handlePhotosChange(t.slug, photos)}
                  />
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>

      <TournamentFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        tournament={editingTournament}
        onSaved={upsertTournament}
      />

      <AlertDialog
        open={deleteTarget !== null}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteTarget(null);
            setDeleteConfirmText("");
          }
        }}
      >
        <AlertDialogContent className="border-border bg-card">
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir "{deleteTarget?.title}"?</AlertDialogTitle>
            <AlertDialogDescription>
              Isso apaga o torneio e, junto com ele,{" "}
              <strong>todas as inscrições e o histórico financeiro associados</strong> — a exclusão
              não pode ser desfeita. Para confirmar, digite o título do torneio abaixo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <Input
            value={deleteConfirmText}
            onChange={(e) => setDeleteConfirmText(e.target.value)}
            placeholder={deleteTarget?.title}
            className="border-border bg-background"
          />
          <AlertDialogFooter>
            <AlertDialogCancel disabled={deleting}>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              disabled={deleting || deleteConfirmText !== deleteTarget?.title}
              onClick={(e) => {
                e.preventDefault();
                handleDeleteConfirm();
              }}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              {deleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Excluir definitivamente
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}
