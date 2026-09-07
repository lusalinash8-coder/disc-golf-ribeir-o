import { useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

type PhotoLightboxProps = {
  photos: string[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
  title: string;
};

export function PhotoLightbox({ photos, index, onIndexChange, title }: PhotoLightboxProps) {
  const open = index !== null;

  const goTo = (next: number) => {
    onIndexChange((next + photos.length) % photos.length);
  };

  useEffect(() => {
    if (!open || index === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index, photos.length]);

  return (
    <Dialog open={open} onOpenChange={(next) => !next && onIndexChange(null)}>
      <DialogContent className="max-w-4xl border-none bg-transparent p-0 shadow-none [&>button]:text-white">
        <DialogTitle className="sr-only">{title}</DialogTitle>
        {index !== null && (
          <div className="relative flex items-center justify-center">
            <img
              src={photos[index]}
              alt={`${title} — foto ${index + 1}`}
              className="max-h-[85vh] w-full rounded-lg object-contain"
            />
            {photos.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => goTo(index - 1)}
                  aria-label="Foto anterior"
                  className="absolute left-2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={() => goTo(index + 1)}
                  aria-label="Próxima foto"
                  className="absolute right-2 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                  {index + 1} / {photos.length}
                </div>
              </>
            )}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
