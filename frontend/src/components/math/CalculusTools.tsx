import { useState } from 'react';
import { derivative } from 'mathjs';
import MathInput from './MathInput';
import MathDisplay from './MathDisplay';

type CalculusType = 'derivative' | 'integral';

export default function CalculusTools() {
  const [expression, setExpression] = useState('');
  const [variable, setVariable] = useState('x');
  const [calculusType, setCalculusType] = useState<CalculusType>('derivative');
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const calculateResult = (input: string) => {
    setExpression(input);
    setError(null);
    setResult(null);
    
    try {
      if (calculusType === 'derivative') {
        const result = derivative(input, variable).toString();
        setResult(result);
      } else {
        // Mathjs no tiene una función de integración directa, así que simulamos el resultado
        // En una aplicación real, se usaría una biblioteca específica para cálculo simbólico
        const result = `\\int ${input} \\, d${variable}`;
        setResult(result);
      }
    } catch (error) {
      console.error(`Error al calcular ${calculusType === 'derivative' ? 'la derivada' : 'la integral'}:`, error);
      setError(`No se pudo calcular ${calculusType === 'derivative' ? 'la derivada' : 'la integral'}. Verifica la sintaxis.`);
    }
  };

  return (
    <div className="card w-full max-w-2xl mx-auto">
      <h2 className="text-xl font-bold text-accent mb-4">
        {calculusType === 'derivative' ? 'Calcular Derivadas' : 'Calcular Integrales'}
      </h2>
      
      <div className="flex space-x-4 mb-4">
        <button
          className={calculusType === 'derivative' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setCalculusType('derivative')}
        >
          Derivadas
        </button>
        <button
          className={calculusType === 'integral' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setCalculusType('integral')}
        >
          Integrales
        </button>
      </div>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-secondary mb-1">Variable:</label>
        <input
          type="text"
          value={variable}
          onChange={(e) => setVariable(e.target.value)}
          className="input w-16 text-center"
          maxLength={1}
        />
      </div>
      
      <MathInput 
        placeholder={calculusType === 'derivative' ? "Ingresa una función (ej: x^2 + 3x)" : "Ingresa una función (ej: 2x + 1)"}
        onSubmit={calculateResult}
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
          <div className="flex items-center">
            {calculusType === 'derivative' ? (
              <span className="mr-2 text-secondary">
                <MathDisplay inline formula={`\\frac{d}{d${variable}}(${expression}) = `} />
              </span>
            ) : (
              <span className="mr-2 text-secondary">
                <MathDisplay inline formula={`\\int ${expression} \\, d${variable} = `} />
              </span>
            )}
            <MathDisplay formula={result} inline />
            {calculusType === 'integral' && <span className="ml-2 text-secondary">+ C</span>}
          </div>
        </div>
      )}
      
      <div className="mt-6">
        <h3 className="text-sm font-medium mb-2" style={{ color: 'rgba(255, 255, 255, 0.7)' }}>Ejemplos:</h3>
        <ul className="text-sm space-y-1" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
          {calculusType === 'derivative' ? (
            <>
              <li>• Polinomio: <span className="text-accent">x^3 + 2x^2 - 5x + 3</span></li>
              <li>• Trigonométrica: <span className="text-accent">sin(x) * cos(x)</span></li>
              <li>• Exponencial: <span className="text-accent">e^x * x</span></li>
            </>
          ) : (
            <>
              <li>• Polinomio: <span className="text-accent">3x^2 + 2x</span></li>
              <li>• Trigonométrica: <span className="text-accent">sin(x)</span></li>
              <li>• Racional: <span className="text-accent">1/(x^2 + 1)</span></li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
} 