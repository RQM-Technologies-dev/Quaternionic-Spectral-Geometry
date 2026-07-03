import { PrettyBlockMath, PrettyInlineMath } from "@/components/math/PrettyMath";

interface MathProps {
  children: string;
  block?: boolean;
  display?: boolean;
  size?: 'small' | 'normal' | 'large' | 'display';
  color?: 'primary' | 'accent' | 'muted' | 'blue';
  className?: string;
}

export function Math({
  children,
  block = false,
  display = false,
  size = 'normal',
  color = 'primary',
  className = ""
}: MathProps) {
  // Size classes
  const sizeClasses = {
    small: 'text-sm',
    normal: 'text-base',
    large: 'text-xl',
    display: 'text-2xl md:text-3xl'
  };

  // Color classes for mathematical content
  const colorClasses = {
    primary: 'text-quantum-dark',
    accent: 'text-blue-900',
    muted: 'text-gray-700',
    blue: 'text-blue-900'
  };

  const mathClasses = `${sizeClasses[size]} ${colorClasses[color]} ${className}`;

  if (block || display) {
    return (
      <div className={`my-4 text-center ${mathClasses}`}>
        <PrettyBlockMath math={children} />
      </div>
    );
  }

  return (
    <span className={mathClasses}>
      <PrettyInlineMath math={children} />
    </span>
  );
}

export default Math;
