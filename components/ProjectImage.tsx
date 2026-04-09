import type { ProjectImageSource } from "@/lib/projects";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export type ProjectImageProps = {
  src: ProjectImageSource | null | undefined;
  alt: string;
  className?: string;
  /** Placeholder style on dark surfaces (e.g. project hover card) */
  placeholderTone?: "light" | "dark";
};

function imgProps(src: ProjectImageSource) {
  if (typeof src === "string") {
    return { src, width: undefined, height: undefined };
  }
  return { src: src.src, width: src.width, height: src.height };
}

export function ProjectImage({
  src,
  alt,
  className,
  placeholderTone = "light",
}: ProjectImageProps) {
  if (!src) {
    return (
      <ImagePlaceholder
        className={className}
        tone={placeholderTone}
        label={`${alt} (placeholder)`}
      />
    );
  }
  const { src: url, width, height } = imgProps(src);
  return (
    <img src={url} width={width} height={height} alt={alt} className={className} />
  );
}
