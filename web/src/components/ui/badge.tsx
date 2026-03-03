import * as React from "react";

type BadgeProps = {
  className?: string;
  children: React.ReactNode;
};

export function Badge({ className = "", children }: BadgeProps) {
  const base =
    "inline-flex items-center rounded-full bg-sky-50 px-3 py-1 text-[11px] font-medium text-sky-700 ring-1 ring-sky-100";

  return <span className={`${base} ${className}`.trim()}>{children}</span>;
}

