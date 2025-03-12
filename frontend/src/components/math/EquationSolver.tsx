import { useState } from 'react';
import { evaluate, simplify } from 'mathjs';
import MathInput from './MathInput';
import MathDisplay from './MathDisplay';

export default function EquationSolver() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const solveEquation = (input: string) => {
    setError(null);
    setResult(null);
    
    try {
      // Verificar si es una ecuación (contiene un signo igual)
      if (input.includes('=')) {
        const [leftSide, rightSide] = input.split('=').map(side => side.trim());
        
        // Mover todo a un lado: leftSide - rightSide = 0
        const expression = `${leftSide}-(${rightSide})`;
        
        // Intentar resolver la ecuación
        try {
          // Para ecuaciones simples, podemos usar simplify
          const simplified = simplify(expression).toString();
          
          // Si la ecuación es de la forma x + algo = 0, podemos resolverla
          // Intentamos resolver para x
          const solution = evaluate(`solve(${simplified}, x)`);
          
          if (Array.isArray(solution)) {
            setResult(`x = ${solution.join(' \\text{ o } x = ')}`);
          } else {
            setResult(`x = ${solution}`);
          }
        } catch {
          // Si no podemos resolver directamente, mostramos la forma simplificada
          setResult(`\\text{Forma simplificada: } ${simplify(expression).toString()} = 0`);
        }
      } else {
        // Si no es una ecuación, evaluamos la expresión
        const result = evaluate(input);
        setResult(result.toString());
      }
    } catch (error) {
      console.error('Error al resolver la ecuación:', error);
      setError('No se pudo resolver la ecuación. Verifica la sintaxis.');
    }
  };

  return (
    <div className="card w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-accent mb-4">Resolver Ecuaciones</h2>
      
      <MathInput 
        placeholder="Ingresa una ecuación (ej: 2x + 3 = 7)" 
        onSubmit={solveEquation}
      />
      
      {error && (
        <div className="mt-4 p-3 rounded-md text-red-300" 
          style={{ 
            backgroundColor: 'rgba(220, 38, 38, 0.2)', 
            borderColor: 'rgba(220, 38, 38, 0.5)',
            border: '1px solid'
          }}>
          {error}
        </div>
      )}
      
      {result && (
        <div className="mt-6 p-4 rounded-md border" 
          style={{ 
            backgroundColor: 'rgba(0, 191, 255, 0.1)', 
            borderColor: 'rgba(0, 191, 255, 0.3)' 
          }}>
          <h3 className="text-lg font-semibold text-secondary mb-2">Resultado:</h3>
          <MathDisplay formula={result} />
        </div>
      )}
      
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Ejemplos:</h3>
        <ul className="text-sm space-y-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          <li>• Ecuación lineal: <span className="text-accent">2x + 3 = 7</span></li>
          <li>• Ecuación cuadrática: <span className="text-accent">x^2 - 4 = 0</span></li>
          <li>• Expresión: <span className="text-accent">sin(pi/4) + cos(pi/3)</span></li>
        </ul>
      </div>
    </div>
  );
} 