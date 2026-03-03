import * as React from "react";

type SectionHeaderProps = {
  eyebrow?: string;
  title?: string;
  subtitle?: string;
  align?: "left" | "center";
};

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
}: SectionHeaderProps) {
  const alignment =
    align === "center" ? "items-center text-center" : "items-start text-left";

  return (
    <div className={`flex flex-col gap-2 ${alignment}`}>
      {eyebrow && (
        <p className="text-xs font-semibold uppercase tracking-[0.16em] text-sky-600">
          {eyebrow}
        </p>
      )}
      {title && (
        <h2 className="text-2xl sm:text-3xl font-semibold text-slate-900">
          {title}
        </h2>
      )}
      {subtitle && (
        <p className="max-w-2xl text-sm sm:text-base text-slate-600">
          {subtitle}
        </p>
      )}
    </div>
  );
}

