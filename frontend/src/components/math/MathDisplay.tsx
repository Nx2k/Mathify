import 'katex/dist/katex.min.css';
import { BlockMath, InlineMath } from 'react-katex';

interface MathDisplayProps {
  formula: string;
  inline?: boolean;
  className?: string;
}

export default function MathDisplay({ formula, inline = false, className = '' }: MathDisplayProps) {
  return (
    <div className={`math-display ${className}`}>
      {inline ? (
        <InlineMath math={formula} />
      ) : (
        <BlockMath math={formula} />
      )}
    </div>
  );
} 