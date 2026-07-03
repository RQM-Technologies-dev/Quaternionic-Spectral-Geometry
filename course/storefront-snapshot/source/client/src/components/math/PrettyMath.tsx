import type { ReactNode } from "react";
import { BlockMath, InlineMath } from "react-katex";

type MathTone = "default" | "qsg" | "qc" | "qsp";

interface PrettyMathProps {
  math: string;
  ariaLabel?: string;
  className?: string;
}

interface FormulaCardProps extends PrettyMathProps {
  label?: string;
  title?: string;
  readAs?: ReactNode;
  children?: ReactNode;
  tone?: MathTone;
}

interface FormulaRecapProps extends Omit<FormulaCardProps, "label"> {
  label?: string;
}

interface EquationListItem {
  math: string;
  title?: string;
  readAs?: ReactNode;
}

interface EquationListProps {
  items: EquationListItem[];
  label?: string;
  tone?: MathTone;
}

const toneClasses: Record<MathTone, string> = {
  default: "border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900",
  qsg: "border-[#4d9aaf]/25 bg-[#4d9aaf]/5 dark:border-cyan-400/30 dark:bg-cyan-950/20",
  qc: "border-indigo-200 bg-indigo-50/60 dark:border-indigo-500/35 dark:bg-indigo-950/25",
  qsp: "border-violet-200 bg-violet-50/60 dark:border-violet-500/35 dark:bg-violet-950/25",
};

const toneAccentClasses: Record<MathTone, string> = {
  default: "text-slate-600 dark:text-slate-300",
  qsg: "text-[#2d5a69] dark:text-cyan-300",
  qc: "text-indigo-700 dark:text-indigo-300",
  qsp: "text-violet-700 dark:text-violet-300",
};

export function PrettyInlineMath({ math, ariaLabel, className = "" }: PrettyMathProps) {
  return (
    <span className={`pretty-inline-math ${className}`} aria-label={ariaLabel}>
      <InlineMath math={math} />
    </span>
  );
}

export function PrettyBlockMath({ math, ariaLabel, className = "" }: PrettyMathProps) {
  return (
    <div className={`pretty-math-scroll ${className}`} aria-label={ariaLabel}>
      <BlockMath math={math} />
    </div>
  );
}

export function FormulaCard({
  math,
  ariaLabel,
  label = "Key Equation",
  title,
  readAs,
  children,
  tone = "default",
  className = "",
}: FormulaCardProps) {
  return (
    <div className={`pretty-formula-card rounded-lg border p-4 sm:p-5 ${toneClasses[tone]} ${className}`}>
      <div className={`text-xs font-bold uppercase tracking-wide ${toneAccentClasses[tone]}`}>
        {label}
      </div>
      {title && <div className="mt-1 text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</div>}
      <PrettyBlockMath math={math} ariaLabel={ariaLabel ?? title ?? label} className="my-3" />
      {readAs && (
        <div className="pretty-formula-reading text-sm leading-relaxed text-slate-700 dark:text-slate-300">
          <span className="font-semibold">Read it as:</span> {readAs}
        </div>
      )}
      {children && <div className="mt-3 text-sm leading-relaxed text-slate-700 dark:text-slate-300">{children}</div>}
    </div>
  );
}

export function FormulaRecap({
  label = "Formula Recap",
  ...props
}: FormulaRecapProps) {
  return <FormulaCard label={label} {...props} />;
}

export function EquationList({ items, label = "Equations", tone = "default" }: EquationListProps) {
  return (
    <div className="space-y-3">
      <div className={`text-xs font-bold uppercase tracking-wide ${toneAccentClasses[tone]}`}>
        {label}
      </div>
      {items.map((item) => (
        <FormulaCard
          key={`${item.title ?? item.math}-${item.math}`}
          math={item.math}
          title={item.title}
          readAs={item.readAs}
          tone={tone}
          label="Equation"
        />
      ))}
    </div>
  );
}
