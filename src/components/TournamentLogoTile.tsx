import { cn } from "@/lib/utils";

type TournamentLogoTileProps = {
  logo: string;
  title: string;
  className?: string;
};

export function TournamentLogoTile({ logo, title, className }: TournamentLogoTileProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 items-center justify-center overflow-hidden rounded-xl border border-acid/20 bg-carbon",
        className,
      )}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,var(--color-acid)_0%,transparent_70%)] opacity-40 blur-2xl" />
      <img src={logo} alt={title} className="relative h-[82%] w-[82%] object-contain drop-shadow-lg" />
    </div>
  );
}
