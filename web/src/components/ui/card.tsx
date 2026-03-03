import * as React from "react";

type CardProps = {
  className?: string;
  children: React.ReactNode;
};

export function Card({ className = "", children }: CardProps) {
  const base =
    "rounded-2xl bg-white shadow-sm ring-1 ring-slate-100";

  return <div className={`${base} ${className}`.trim()}>{children}</div>;
}

