type ImagePlaceholderProps = {
  className?: string;
  /** Shown to screen readers when used as image stand-in */
  label?: string;
  /** Use `dark` on deep backgrounds (e.g. project preview card) */
  tone?: "light" | "dark";
};

const toneClass: Record<NonNullable<ImagePlaceholderProps["tone"]>, string> = {
  light: "bg-zinc-100 text-zinc-300",
  dark: "bg-zinc-800/90 text-zinc-500",
};

/**
 * Classic “missing image” affordance: two thin diagonals corner-to-corner.
 */
export function ImagePlaceholder({
  className = "",
  label = "Image placeholder",
  tone = "light",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`relative overflow-hidden ${toneClass[tone]} ${className}`}
      role="img"
      aria-label={label}
    >
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <line
          x1="0"
          y1="0"
          x2="100"
          y2="100"
          stroke="currentColor"
          strokeWidth="0.35"
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1="100"
          y1="0"
          x2="0"
          y2="100"
          stroke="currentColor"
          strokeWidth="0.35"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    </div>
  );
}
