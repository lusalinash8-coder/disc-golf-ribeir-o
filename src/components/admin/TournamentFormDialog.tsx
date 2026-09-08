import { useEffect, useState } from "react";
import { ImageOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  createTournament,
  updateTournament,
  uploadTournamentLogo,
  slugifyTournamentTitle,
  MAX_TOURNAMENT_IMAGE_BYTES,
  type TournamentGeneralInput,
} from "@/lib/tournaments";
import type { Tournament } from "@/lib/site-data";

const STATUS_LABEL: Record<Tournament["status"], string> = {
  open: "Aberto",
  closed: "Fechado",
  waitlist: "Lista de espera",
};

type FormState = {
  title: string;
  slug: string;
  date: string;
  endDate: string;
  registrationDeadline: string;
  registrationDeadlineConfirmed: boolean;
  location: string;
  description: string;
  status: Tournament["status"];
  pricesApproximate: boolean;
  pdgaLink: string;
};

function emptyForm(): FormState {
  return {
    title: "",
    slug: "",
    date: "",
    endDate: "",
    registrationDeadline: "",
    registrationDeadlineConfirmed: true,
    location: "",
    description: "",
    status: "open",
    pricesApproximate: false,
    pdgaLink: "",
  };
}

function formFromTournament(t: Tournament): FormState {
  return {
    title: t.title,
    slug: t.slug,
    date: t.date,
    endDate: t.endDate ?? "",
    registrationDeadline: t.registrationDeadline,
    registrationDeadlineConfirmed: t.registrationDeadlineConfirmed,
    location: t.location,
    description: t.description,
    status: t.status,
    pricesApproximate: t.pricesApproximate ?? false,
    pdgaLink: t.pdgaLink ?? "",
  };
}

export function TournamentFormDialog({
  open,
  onOpenChange,
  tournament,
  onSaved,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** undefined = criar torneio novo */
  tournament: Tournament | undefined;
  onSaved: (tournament: Tournament) => void;
}) {
  const isEditing = tournament !== undefined;
  const [form, setForm] = useState<FormState>(() =>
    tournament ? formFromTournament(tournament) : emptyForm(),
  );
  const [slugTouched, setSlugTouched] = useState(isEditing);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoError, setLogoError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open) return;
    setForm(tournament ? formFromTournament(tournament) : emptyForm());
    setSlugTouched(isEditing);
    setLogoFile(null);
    setLogoError(null);
    setError(null);
  }, [open, tournament, isEditing]);

  function handleTitleChange(title: string) {
    setForm((f) => ({
      ...f,
      title,
      slug: slugTouched ? f.slug : slugifyTournamentTitle(title),
    }));
  }

  function handleLogoChange(file: File | null) {
    setLogoError(null);
    if (file && file.size > MAX_TOURNAMENT_IMAGE_BYTES) {
      setLogoError("A imagem passa de 10 MB. Escolha um arquivo menor.");
      setLogoFile(null);
      return;
    }
    setLogoFile(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.slug.trim()) {
      setError("Informe um slug válido para o torneio.");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      let imageUrl = tournament?.image;
      if (logoFile) {
        imageUrl = await uploadTournamentLogo(form.slug, logoFile);
      }
      const input: TournamentGeneralInput = {
        title: form.title,
        date: form.date,
        registrationDeadline: form.registrationDeadline,
        registrationDeadlineConfirmed: form.registrationDeadlineConfirmed,
        location: form.location,
        description: form.description,
        status: form.status,
        pricesApproximate: form.pricesApproximate,
        ...(form.endDate ? { endDate: form.endDate } : {}),
        ...(imageUrl ? { imageUrl } : {}),
        ...(form.pdgaLink ? { pdgaLink: form.pdgaLink } : {}),
      };
      const saved = isEditing
        ? await updateTournament(tournament.slug, input)
        : await createTournament(form.slug, input);
      onSaved(saved);
      onOpenChange(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível salvar o torneio.");
    } finally {
      setSaving(false);
    }
  }

  const logoPreview = logoFile ? URL.createObjectURL(logoFile) : tournament?.image;

  return (
    <Dialog open={open} onOpenChange={(next) => !saving && onOpenChange(next)}>
      <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto border-border bg-card">
        <DialogHeader>
          <DialogTitle>{isEditing ? "Editar torneio" : "Novo torneio"}</DialogTitle>
          <DialogDescription>
            Dados gerais do torneio. Divisões e preços continuam sendo cadastrados direto no
            Supabase por enquanto.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-border bg-background">
              {logoPreview ? (
                <img src={logoPreview} alt="" className="h-full w-full object-cover" />
              ) : (
                <ImageOff className="h-6 w-6 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 space-y-1">
              <Label htmlFor="logo">Logo do torneio (máx. 10 MB)</Label>
              <Input
                id="logo"
                type="file"
                accept="image/png,image/jpeg,image/webp,image/avif"
                onChange={(e) => handleLogoChange(e.target.files?.[0] ?? null)}
              />
              {logoError && <p className="text-xs text-destructive">{logoError}</p>}
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="title">Título</Label>
              <Input
                id="title"
                required
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="slug">Slug (usado na URL /torneios/slug)</Label>
              <Input
                id="slug"
                required
                disabled={isEditing}
                value={form.slug}
                onChange={(e) => {
                  setSlugTouched(true);
                  setForm((f) => ({ ...f, slug: e.target.value }));
                }}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="date">Data</Label>
              <Input
                id="date"
                type="date"
                required
                value={form.date}
                onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="endDate">Data final (opcional)</Label>
              <Input
                id="endDate"
                type="date"
                value={form.endDate}
                onChange={(e) => setForm((f) => ({ ...f, endDate: e.target.value }))}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="registrationDeadline">Prazo de inscrição</Label>
              <Input
                id="registrationDeadline"
                type="date"
                required
                value={form.registrationDeadline}
                onChange={(e) => setForm((f) => ({ ...f, registrationDeadline: e.target.value }))}
              />
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
              <Label htmlFor="deadlineConfirmed" className="text-sm">
                Prazo confirmado
              </Label>
              <Switch
                id="deadlineConfirmed"
                checked={form.registrationDeadlineConfirmed}
                onCheckedChange={(v) =>
                  setForm((f) => ({ ...f, registrationDeadlineConfirmed: v }))
                }
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="location">Local</Label>
              <Input
                id="location"
                required
                value={form.location}
                onChange={(e) => setForm((f) => ({ ...f, location: e.target.value }))}
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                required
                rows={4}
                value={form.description}
                onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
              />
            </div>

            <div className="space-y-1">
              <Label htmlFor="status">Status de inscrição</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as Tournament["status"] }))}
              >
                <SelectTrigger id="status" className="border-border bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(Object.keys(STATUS_LABEL) as Tournament["status"][]).map((s) => (
                    <SelectItem key={s} value={s}>
                      {STATUS_LABEL[s]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center justify-between rounded-lg border border-border bg-background p-3">
              <Label htmlFor="pricesApproximate" className="text-sm">
                Preços ainda são estimativa
              </Label>
              <Switch
                id="pricesApproximate"
                checked={form.pricesApproximate}
                onCheckedChange={(v) => setForm((f) => ({ ...f, pricesApproximate: v }))}
              />
            </div>

            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="pdgaLink">Link PDGA (opcional)</Label>
              <Input
                id="pdgaLink"
                value={form.pdgaLink}
                onChange={(e) => setForm((f) => ({ ...f, pdgaLink: e.target.value }))}
              />
            </div>
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={saving}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="bg-acid text-background hover:bg-acid/90"
              disabled={saving}
            >
              {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEditing ? "Salvar alterações" : "Criar torneio"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
