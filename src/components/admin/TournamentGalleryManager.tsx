import { useRef, useState } from "react";
import { Loader2, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  addTournamentPhotos,
  removeTournamentPhoto,
  MAX_TOURNAMENT_IMAGE_BYTES,
} from "@/lib/tournaments";

export function TournamentGalleryManager({
  slug,
  photos,
  onChange,
}: {
  slug: string;
  photos: string[];
  onChange: (photos: string[]) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [removingUrl, setRemovingUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleFiles(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const files = Array.from(fileList);
    const tooLarge = files.find((f) => f.size > MAX_TOURNAMENT_IMAGE_BYTES);
    if (tooLarge) {
      setError(`"${tooLarge.name}" passa de 10 MB.`);
      return;
    }
    setError(null);
    setUploading(true);
    try {
      const updated = await addTournamentPhotos(slug, files);
      onChange(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível enviar as fotos.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  }

  async function handleRemove(url: string) {
    setRemovingUrl(url);
    setError(null);
    try {
      const updated = await removeTournamentPhoto(slug, url);
      onChange(updated);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Não foi possível remover a foto.");
    } finally {
      setRemovingUrl(null);
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs text-muted-foreground">Galeria de fotos ({photos.length})</p>
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="border-border bg-background"
          disabled={uploading}
          onClick={() => inputRef.current?.click()}
        >
          {uploading ? (
            <Loader2 className="mr-1 h-3 w-3 animate-spin" />
          ) : (
            <Plus className="mr-1 h-3 w-3" />
          )}
          Adicionar fotos
        </Button>
        <input
          ref={inputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/avif"
          multiple
          hidden
          onChange={(e) => handleFiles(e.target.files)}
        />
      </div>

      {error && <p className="text-xs text-destructive">{error}</p>}

      {photos.length > 0 && (
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6">
          {photos.map((url) => (
            <div
              key={url}
              className="group relative aspect-square overflow-hidden rounded-lg border border-border"
            >
              <img src={url} alt="" className="h-full w-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(url)}
                disabled={removingUrl === url}
                className="absolute right-1 top-1 rounded-full bg-background/80 p-1 text-foreground opacity-0 transition-opacity group-hover:opacity-100 disabled:opacity-100"
                aria-label="Remover foto"
              >
                {removingUrl === url ? (
                  <Loader2 className="h-3 w-3 animate-spin" />
                ) : (
                  <X className="h-3 w-3" />
                )}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
