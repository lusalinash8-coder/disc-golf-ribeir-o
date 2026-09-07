import { useLayoutEffect, useRef, useState } from "react";

type PhotoThumbRowProps = {
  photos: string[];
  title: string;
  onOpen: (index: number) => void;
};

export function PhotoThumbRow({ photos, title, onOpen }: PhotoThumbRowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [visibleCount, setVisibleCount] = useState(photos.length);

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const recompute = () => {
      const children = Array.from(container.children) as HTMLElement[];
      if (children.length === 0) return;
      const containerWidth = container.clientWidth;
      let fit = 0;
      for (const child of children) {
        if (child.offsetLeft + child.offsetWidth <= containerWidth + 1) {
          fit++;
        } else {
          break;
        }
      }
      setVisibleCount(Math.max(1, Math.min(fit, photos.length)));
    };

    recompute();
    const observer = new ResizeObserver(recompute);
    observer.observe(container);
    return () => observer.disconnect();
  }, [photos.length]);

  const extra = photos.length - visibleCount;

  return (
    <div ref={containerRef} className="flex gap-2 overflow-hidden">
      {photos.slice(0, visibleCount).map((photo, i) => {
        const isLastWithMore = i === visibleCount - 1 && extra > 0;
        return (
          <button
            key={photo}
            type="button"
            onClick={() => onOpen(i)}
            className="relative aspect-square h-14 shrink-0 overflow-hidden rounded-md transition-opacity hover:opacity-80 sm:h-16 md:h-20"
          >
            <img src={photo} alt={`${title} — foto ${i + 1}`} className="h-full w-full object-cover" />
            {isLastWithMore && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/60 text-lg font-bold text-white">
                +{extra + 1}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}
