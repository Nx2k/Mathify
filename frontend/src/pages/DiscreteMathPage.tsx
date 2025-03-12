import { useState } from 'react';
import MathInput from '../components/math/MathInput';
import MathDisplay from '../components/math/MathDisplay';

type OperationType = 'combination' | 'permutation' | 'binomial' | 'stirling' | 'catalan' | 'bell' | 'fibonacci' | 'lucas';

interface OperationInfo {
  title: string;
  description: string;
  inputFormat: string;
  formula: string;
}

export default function DiscreteMathPage() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [operation, setOperation] = useState<OperationType>('combination');
  const [explanation, setExplanation] = useState<string | null>(null);
  const [steps, setSteps] = useState<string[]>([]);

  const operationInfo: Record<OperationType, OperationInfo> = {
    combination: {
      title: 'Combinaciones',
      description: 'Número de formas de seleccionar k elementos de un conjunto de n elementos sin importar el orden.',
      inputFormat: 'n,k (ejemplo: 5,2)',
      formula: 'C(n,k) = \\frac{n!}{k!(n-k)!}'
    },
    permutation: {
      title: 'Permutaciones',
      description: 'Número de formas de ordenar k elementos de un conjunto de n elementos.',
      inputFormat: 'n,k (ejemplo: 5,2)',
      formula: 'P(n,k) = \\frac{n!}{(n-k)!}'
    },
    binomial: {
      title: 'Coeficiente Binomial',
      description: 'Coeficiente de x^k en la expansión de (1+x)^n.',
      inputFormat: 'n,k (ejemplo: 5,2)',
      formula: '\\binom{n}{k} = \\frac{n!}{k!(n-k)!}'
    },
    stirling: {
      title: 'Números de Stirling (2ª clase)',
      description: 'Número de formas de particionar un conjunto de n elementos en k subconjuntos no vacíos.',
      inputFormat: 'n,k (ejemplo: 5,2)',
      formula: 'S(n,k) = k·S(n-1,k) + S(n-1,k-1)'
    },
    catalan: {
      title: 'Números de Catalan',
      description: 'Secuencia que aparece en diversos problemas de conteo en combinatoria.',
      inputFormat: 'n (ejemplo: 5)',
      formula: 'C_n = \\frac{1}{n+1}\\binom{2n}{n}'
    },
    bell: {
      title: 'Números de Bell',
      description: 'Número de particiones de un conjunto de n elementos.',
      inputFormat: 'n (ejemplo: 5)',
      formula: 'B_n = \\sum_{k=0}^{n-1} \\binom{n-1}{k} B_k'
    },
    fibonacci: {
      title: 'Números de Fibonacci',
      description: 'Secuencia donde cada número es la suma de los dos anteriores.',
      inputFormat: 'n (ejemplo: 10)',
      formula: 'F_n = F_{n-1} + F_{n-2}, \\quad F_0 = 0, F_1 = 1'
    },
    lucas: {
      title: 'Números de Lucas',
      description: 'Secuencia relacionada con Fibonacci pero con valores iniciales diferentes.',
      inputFormat: 'n (ejemplo: 10)',
      formula: 'L_n = L_{n-1} + L_{n-2}, \\quad L_0 = 2, L_1 = 1'
    }
  };

  const handleCalculate = (inputText: string) => {
    setError(null);
    setResult(null);
    setExplanation(null);
    setSteps([]);
    
    try {
      // Limpiar la entrada y dividir en partes
      const cleanedInput = inputText.replace(/\s+/g, ',').replace(/,+/g, ',').trim();
      const parts = cleanedInput.split(',').map(part => parseInt(part.trim(), 10));
      
      if (parts.some(isNaN) || parts.some(num => num < 0)) {
        throw new Error('Formato inválido: todos los valores deben ser enteros no negativos');
      }
      
      let calculatedResult: number;
      let formula: string;
      let explanationText: string;
      let calculationSteps: string[] = [];
      
      switch (operation) {
        case 'combination':
        case 'binomial': {
          if (parts.length !== 2) {
            throw new Error('Se requieren exactamente dos números (n,k)');
          }
          
          const [n, k] = parts;
          
          if (k > n) {
            throw new Error('k no puede ser mayor que n');
          }
          
          calculatedResult = calculateCombination(n, k);
          
          if (operation === 'combination') {
            formula = `C(${n},${k}) = \\frac{${n}!}{${k}!(${n}-${k})!} = ${calculatedResult}`;
            explanationText = `El número de formas de seleccionar ${k} elementos de un conjunto de ${n} elementos sin importar el orden es ${calculatedResult}.`;
          } else {
            formula = `\\binom{${n}}{${k}} = ${calculatedResult}`;
            explanationText = `El coeficiente binomial \\binom{${n}}{${k}} representa el coeficiente de x^${k} en la expansión de (1+x)^${n}, que es ${calculatedResult}.`;
          }
          
          // Generar pasos de cálculo
          calculationSteps = generateCombinationSteps(n, k);
          break;
        }
        
        case 'permutation': {
          if (parts.length !== 2) {
            throw new Error('Se requieren exactamente dos números (n,k)');
          }
          
          const [n, k] = parts;
          
          if (k > n) {
            throw new Error('k no puede ser mayor que n');
          }
          
          calculatedResult = calculatePermutation(n, k);
          formula = `P(${n},${k}) = \\frac{${n}!}{(${n}-${k})!} = ${calculatedResult}`;
          explanationText = `El número de formas de ordenar ${k} elementos de un conjunto de ${n} elementos es ${calculatedResult}.`;
          
          // Generar pasos de cálculo
          calculationSteps = generatePermutationSteps(n, k);
          break;
        }
        
        case 'stirling': {
          if (parts.length !== 2) {
            throw new Error('Se requieren exactamente dos números (n,k)');
          }
          
          const [n, k] = parts;
          
          if (k > n || k === 0) {
            throw new Error('k debe estar entre 1 y n');
          }
          
          calculatedResult = calculateStirling2(n, k);
          formula = `S(${n},${k}) = ${calculatedResult}`;
          explanationText = `El número de Stirling de segunda clase S(${n},${k}) representa el número de formas de particionar un conjunto de ${n} elementos en ${k} subconjuntos no vacíos, que es ${calculatedResult}.`;
          
          // Generar pasos de cálculo
          calculationSteps = [`Los números de Stirling de segunda clase se calculan usando la recurrencia: S(n,k) = k·S(n-1,k) + S(n-1,k-1)`];
          break;
        }
        
        case 'catalan': {
          if (parts.length !== 1) {
            throw new Error('Se requiere exactamente un número (n)');
          }
          
          const [n] = parts;
          calculatedResult = calculateCatalan(n);
          formula = `C_{${n}} = \\frac{1}{${n}+1}\\binom{2·${n}}{${n}} = ${calculatedResult}`;
          explanationText = `El número de Catalan C_${n} es ${calculatedResult}. Estos números aparecen en muchos problemas de conteo, como el número de formas de triangular un polígono con ${n+2} lados.`;
          
          // Generar pasos de cálculo
          calculationSteps = [
            `C_${n} = \\frac{1}{${n}+1}\\binom{2·${n}}{${n}}`,
            `= \\frac{1}{${n+1}}\\frac{(2·${n})!}{${n}!(2·${n}-${n})!}`,
            `= \\frac{1}{${n+1}}\\frac{(2·${n})!}{${n}!${n}!}`,
            `= ${calculatedResult}`
          ];
          break;
        }
        
        case 'bell': {
          if (parts.length !== 1) {
            throw new Error('Se requiere exactamente un número (n)');
          }
          
          const [n] = parts;
          calculatedResult = calculateBell(n);
          formula = `B_{${n}} = ${calculatedResult}`;
          explanationText = `El número de Bell B_${n} representa el número de formas de particionar un conjunto de ${n} elementos, que es ${calculatedResult}.`;
          
          // Generar pasos de cálculo
          calculationSteps = [`Los números de Bell se calculan usando la fórmula: B_n = \\sum_{k=0}^{n-1} \\binom{n-1}{k} B_k`];
          break;
        }
        
        case 'fibonacci': {
          if (parts.length !== 1) {
            throw new Error('Se requiere exactamente un número (n)');
          }
          
          const [n] = parts;
          calculatedResult = calculateFibonacci(n);
          formula = `F_{${n}} = ${calculatedResult}`;
          explanationText = `El número de Fibonacci F_${n} es ${calculatedResult}.`;
          
          // Generar pasos de cálculo
          calculationSteps = generateFibonacciSteps(n);
          break;
        }
        
        case 'lucas': {
          if (parts.length !== 1) {
            throw new Error('Se requiere exactamente un número (n)');
          }
          
          const [n] = parts;
          calculatedResult = calculateLucas(n);
          formula = `L_{${n}} = ${calculatedResult}`;
          explanationText = `El número de Lucas L_${n} es ${calculatedResult}.`;
          
          // Generar pasos de cálculo
          calculationSteps = [`Los números de Lucas siguen la misma recurrencia que Fibonacci pero con valores iniciales L_0 = 2, L_1 = 1`];
          break;
        }
        
        default:
          throw new Error('Operación no soportada');
      }
      
      setResult(formula);
      setExplanation(explanationText);
      setSteps(calculationSteps);
    } catch (error) {
      console.error('Error al calcular:', error);
      setError(`Error: ${error instanceof Error ? error.message : 'Cálculo fallido'}`);
    }
  };

  const calculateCombination = (n: number, k: number): number => {
    // Para evitar desbordamientos con factoriales grandes
    if (k > n - k) {
      k = n - k;
    }
    
    let result = 1;
    for (let i = 1; i <= k; i++) {
      result *= (n - (k - i));
      result /= i;
    }
    
    return result;
  };

  const calculatePermutation = (n: number, k: number): number => {
    let result = 1;
    for (let i = 0; i < k; i++) {
      result *= (n - i);
    }
    return result;
  };

  const calculateStirling2 = (n: number, k: number): number => {
    // Caso base
    if (n === 0 && k === 0) return 1;
    if (n === 0 || k === 0) return 0;
    if (k === 1 || k === n) return 1;
    
    // Usar la recurrencia: S(n,k) = k*S(n-1,k) + S(n-1,k-1)
    return k * calculateStirling2(n - 1, k) + calculateStirling2(n - 1, k - 1);
  };

  const calculateCatalan = (n: number): number => {
    // C_n = (1/(n+1)) * binomial(2n,n)
    return calculateCombination(2 * n, n) / (n + 1);
  };

  const calculateBell = (n: number): number => {
    if (n === 0) return 1;
    
    // Usar el triángulo de Bell para calcular B_n
    const bellTriangle: number[][] = [[1]];
    
    for (let i = 1; i <= n; i++) {
      const row: number[] = [];
      row[0] = bellTriangle[i-1][i-1];
      
      for (let j = 1; j <= i; j++) {
        row[j] = row[j-1] + bellTriangle[i-1][j-1];
      }
      
      bellTriangle.push(row);
    }
    
    return bellTriangle[n][0];
  };

  const calculateFibonacci = (n: number): number => {
    if (n <= 1) return n;
    
    let a = 0, b = 1;
    for (let i = 2; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    
    return b;
  };

  const calculateLucas = (n: number): number => {
    if (n === 0) return 2;
    if (n === 1) return 1;
    
    let a = 2, b = 1;
    for (let i = 2; i <= n; i++) {
      const temp = a + b;
      a = b;
      b = temp;
    }
    
    return b;
  };

  const generateCombinationSteps = (n: number, k: number): string[] => {
    const steps: string[] = [];
    
    steps.push(`C(${n},${k}) = \\frac{${n}!}{${k}!(${n}-${k})!}`);
    
    // Si n y k son pequeños, mostrar el cálculo completo
    if (n <= 12) {
      const nFactorial = factorial(n);
      const kFactorial = factorial(k);
      const nMinusKFactorial = factorial(n - k);
      
      steps.push(`= \\frac{${nFactorial}}{${kFactorial} \\cdot ${nMinusKFactorial}}`);
      steps.push(`= ${calculateCombination(n, k)}`);
    } else {
      // Para números grandes, usar el método de cálculo directo
      steps.push("Para evitar desbordamientos con factoriales grandes, calculamos:");
      steps.push(`C(${n},${k}) = \\prod_{i=1}^{${k}} \\frac{${n}-(${k}-i)}{i}`);
      steps.push(`= ${calculateCombination(n, k)}`);
    }
    
    return steps;
  };

  const generatePermutationSteps = (n: number, k: number): string[] => {
    const steps: string[] = [];
    
    steps.push(`P(${n},${k}) = \\frac{${n}!}{(${n}-${k})!}`);
    
    // Si n es pequeño, mostrar el cálculo completo
    if (n <= 12) {
      const nFactorial = factorial(n);
      const nMinusKFactorial = factorial(n - k);
      
      steps.push(`= \\frac{${nFactorial}}{${nMinusKFactorial}}`);
      steps.push(`= ${calculatePermutation(n, k)}`);
    } else {
      // Para números grandes, usar el método de cálculo directo
      steps.push("Para evitar desbordamientos con factoriales grandes, calculamos:");
      steps.push(`P(${n},${k}) = \\prod_{i=0}^{${k}-1} (${n}-i)`);
      steps.push(`= ${calculatePermutation(n, k)}`);
    }
    
    return steps;
  };

  const generateFibonacciSteps = (n: number): string[] => {
    const steps: string[] = [];
    
    steps.push(`F_0 = 0, F_1 = 1`);
    steps.push(`F_n = F_{n-1} + F_{n-2} para n ≥ 2`);
    
    // Si n es pequeño, mostrar la secuencia completa
    if (n <= 10) {
      const sequence: number[] = [0, 1];
      for (let i = 2; i <= n; i++) {
        sequence.push(sequence[i-1] + sequence[i-2]);
      }
      
      steps.push(`Secuencia: ${sequence.slice(0, n+1).join(', ')}`);
    }
    
    steps.push(`F_${n} = ${calculateFibonacci(n)}`);
    
    return steps;
  };

  // Función auxiliar para calcular factoriales (solo para números pequeños)
  const factorial = (n: number): number => {
    if (n <= 1) return 1;
    let result = 1;
    for (let i = 2; i <= n; i++) {
      result *= i;
    }
    return result;
  };

  return (
    <div className="py-12" style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold text-accent sm:text-4xl">
            Matemáticas Discretas
          </h1>
          <p className="mt-4 text-lg text-secondary opacity-80">
            Combinatoria, teoría de grafos, lógica y más.
          </p>
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-bold text-accent mb-4">Calculadora de Combinatoria</h2>
            
            <div className="mb-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {(Object.keys(operationInfo) as OperationType[]).map((op) => (
                  <button
                    key={op}
                    className={operation === op ? 'btn btn-primary' : 'btn btn-secondary'}
                    onClick={() => setOperation(op)}
                  >
                    {operationInfo[op].title}
                  </button>
                ))}
              </div>
              
              <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                <h3 className="text-lg font-semibold text-accent mb-2">{operationInfo[operation].title}</h3>
                <p className="mb-4 opacity-80">{operationInfo[operation].description}</p>
                <div className="mb-2">
                  <MathDisplay formula={operationInfo[operation].formula} />
                </div>
                <p className="text-sm opacity-70 mt-2">
                  Formato de entrada: {operationInfo[operation].inputFormat}
                </p>
              </div>
              
              <p className="mb-2 text-sm opacity-70">
                Ingresa los valores según el formato indicado:
              </p>
              <MathInput 
                placeholder={`Ingresa ${operationInfo[operation].inputFormat}`}
                onSubmit={handleCalculate}
              />
              
              {error && (
                <div className="mt-4 p-3 rounded-md text-error" 
                  style={{ 
                    backgroundColor: 'rgba(220, 38, 38, 0.2)', 
                    borderColor: 'rgba(220, 38, 38, 0.5)',
                    border: '1px solid'
                  }}>
                  {error}
                </div>
              )}
            </div>
            
            {result && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-secondary mb-4">Resultado:</h3>
                <div className="p-4 rounded-lg mb-6" style={{ backgroundColor: 'rgba(0, 191, 255, 0.1)', border: '1px solid rgba(0, 191, 255, 0.2)' }}>
                  <MathDisplay formula={result} />
                </div>
                
                {steps.length > 0 && (
                  <div className="mt-4">
                    <h4 className="text-md font-medium text-secondary mb-2">Pasos del cálculo:</h4>
                    <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
                      {steps.map((step, index) => (
                        <div key={index} className="mb-2">
                          <MathDisplay formula={step} />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                
                {explanation && (
                  <div className="mt-4 p-4 rounded-lg" style={{ backgroundColor: 'rgba(0, 191, 255, 0.05)', border: '1px solid rgba(0, 191, 255, 0.1)' }}>
                    <h4 className="text-md font-medium text-secondary mb-2">Explicación:</h4>
                    <p className="opacity-80">{explanation}</p>
                  </div>
                )}
              </div>
            )}
            
            <div className="mt-8 p-4 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
              <h3 className="text-lg font-semibold text-accent mb-2">Aplicaciones</h3>
              <ul className="space-y-2 opacity-80">
                <li>• <strong>Combinaciones:</strong> Selección de equipos, loterías, manos de cartas.</li>
                <li>• <strong>Permutaciones:</strong> Ordenamientos, códigos PIN, anagramas.</li>
                <li>• <strong>Números de Stirling:</strong> Particiones de conjuntos, teoría de probabilidad.</li>
                <li>• <strong>Números de Catalan:</strong> Expresiones con paréntesis, triangulaciones de polígonos.</li>
                <li>• <strong>Números de Bell:</strong> Particiones de conjuntos, teoría de la información.</li>
                <li>• <strong>Fibonacci y Lucas:</strong> Crecimiento poblacional, espirales en la naturaleza.</li>
              </ul>
            </div>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-bold text-accent mb-4">Próximamente</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '1px dashed rgba(0, 191, 255, 0.3)' }}>
                <h3 className="text-lg font-semibold text-accent mb-2">Teoría de Grafos</h3>
                <p className="opacity-70">Algoritmos de caminos más cortos, árboles de expansión mínima, coloración de grafos y más.</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '1px dashed rgba(0, 191, 255, 0.3)' }}>
                <h3 className="text-lg font-semibold text-accent mb-2">Lógica Proposicional</h3>
                <p className="opacity-70">Tablas de verdad, formas normales, validez de argumentos y más.</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '1px dashed rgba(0, 191, 255, 0.3)' }}>
                <h3 className="text-lg font-semibold text-accent mb-2">Teoría de Números</h3>
                <p className="opacity-70">Algoritmo de Euclides, aritmética modular, teorema chino del resto y más.</p>
              </div>
              <div className="p-4 rounded-lg" style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', border: '1px dashed rgba(0, 191, 255, 0.3)' }}>
                <h3 className="text-lg font-semibold text-accent mb-2">Relaciones de Recurrencia</h3>
                <p className="opacity-70">Resolución de relaciones de recurrencia, funciones generadoras y más.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 