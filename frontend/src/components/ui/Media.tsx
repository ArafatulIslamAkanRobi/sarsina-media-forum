import Image from "next/image";
import { ImageIcon } from "lucide-react";
import type { ImageRef } from "@/content/types";
import { cx } from "@/lib/format";

/**
 * Fixed-ratio image frame. When no real photo exists yet it renders a calm,
 * on-brand placeholder instead of a stock or AI image.
 */
export function Media({
  image,
  ratio = "16x9",
  className,
  sizes = "(min-width: 1024px) 33vw, 100vw",
  priority,
  label = "ছবি শীঘ্রই যুক্ত হবে",
  dark,
  icon,
  children,
}: {
  image: ImageRef;
  ratio?: "16x9" | "4x3" | "3x2" | "1x1" | "3x4" | "none";
  className?: string;
  sizes?: string;
  priority?: boolean;
  label?: string | null;
  dark?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className={cx("media", ratio !== "none" && `ratio-${ratio}`, className)}>
      {image ? (
        <Image src={image.src} alt={image.alt} fill sizes={sizes} priority={priority} style={{ objectFit: "cover" }} />
      ) : (
        <div className={cx("media-ph", dark && "media-ph--dark")} aria-hidden>
          {icon ?? <ImageIcon />}
          {label && <span>{label}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
