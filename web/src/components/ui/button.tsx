import * as React from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = {
  variant?: Variant;
  asChild?: boolean;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function getVariantClasses(variant: Variant) {
  switch (variant) {
    case "secondary":
      // Fundo claro com texto escuro
      return "border border-slate-300 bg-white text-slate-900 hover:bg-slate-50";
    case "ghost":
      // Só texto com leve hover
      return "border border-transparent bg-transparent text-slate-700 hover:bg-slate-50";
    case "primary":
    default:
      // Verde principal da marca
      return "border border-[#8bc53f] bg-[#8bc53f] text-white hover:bg-[#6da12f]";
  }
}

export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    className = "",
    asChild,
    children,
    ...rest
  } = props;

  const baseClasses =
    "inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold shadow-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8bc53f] focus-visible:ring-offset-2";

  const combined = `${baseClasses} ${getVariantClasses(variant)} ${className}`.trim();

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      className: `${combined} ${child.props.className ?? ""}`.trim(),
    });
  }

  return (
    <button className={combined} {...rest}>
      {children}
    </button>
  );
}

