import { useState } from 'react';
import MathInput from '../components/math/MathInput';
import MathDisplay from '../components/math/MathDisplay';

export default function NumberTheoryPage() {
  const [number, setNumber] = useState<number | null>(null);
  const [results, setResults] = useState<{[key: string]: string | number | boolean}>({});
  const [error, setError] = useState<string | null>(null);

  const handleNumberInput = (input: string) => {
    setError(null);
    setResults({});
    
    try {
      // Verificar si es un número entero positivo
      const num = parseInt(input.trim(), 10);
      
      if (isNaN(num) || num <= 0 || num !== parseFloat(input.trim())) {
        throw new Error('Debe ser un número entero positivo');
      }
      
      setNumber(num);
      analyzeNumber(num);
    } catch (error) {
      console.error('Error al procesar el número:', error);
      setError('Ingresa un número entero positivo válido.');
    }
  };

  const isPrime = (n: number): boolean => {
    if (n <= 1) return false;
    if (n <= 3) return true;
    if (n % 2 === 0 || n % 3 === 0) return false;
    
    let i = 5;
    while (i * i <= n) {
      if (n % i === 0 || n % (i + 2) === 0) return false;
      i += 6;
    }
    return true;
  };

  const findFactors = (n: number): number[] => {
    const factors: number[] = [];
    
    for (let i = 1; i <= Math.sqrt(n); i++) {
      if (n % i === 0) {
        factors.push(i);
        if (i !== n / i) {
          factors.push(n / i);
        }
      }
    }
    
    return factors.sort((a, b) => a - b);
  };

  const findPrimeFactors = (n: number): {factor: number, power: number}[] => {
    const primeFactors: {factor: number, power: number}[] = [];
    let num = n;
    
    // Factorizar por 2
    if (num % 2 === 0) {
      let count = 0;
      while (num % 2 === 0) {
        num /= 2;
        count++;
      }
      primeFactors.push({ factor: 2, power: count });
    }
    
    // Factorizar por impares
    for (let i = 3; i <= Math.sqrt(num); i += 2) {
      if (num % i === 0) {
        let count = 0;
        while (num % i === 0) {
          num /= i;
          count++;
        }
        primeFactors.push({ factor: i, power: count });
      }
    }
    
    // Si queda un número primo mayor que 2
    if (num > 2) {
      primeFactors.push({ factor: num, power: 1 });
    }
    
    return primeFactors;
  };

  const gcd = (a: number, b: number): number => {
    while (b) {
      const temp = b;
      b = a % b;
      a = temp;
    }
    return a;
  };

  const analyzeNumber = (n: number) => {
    const factors = findFactors(n);
    const primeFactors = findPrimeFactors(n);
    const primeFactorization = primeFactors.map(pf => 
      pf.power === 1 ? `${pf.factor}` : `${pf.factor}^{${pf.power}}`
    ).join(' \\cdot ');
    
    const isPrimeNumber = isPrime(n);
    const isEven = n % 2 === 0;
    const isOdd = !isEven;
    const isPerfectSquare = Math.sqrt(n) % 1 === 0;
    
    // Suma de divisores
    const sumOfDivisors = factors.reduce((sum, factor) => sum + factor, 0);
    
    // Número perfecto (igual a la suma de sus divisores propios)
    const isPerfect = sumOfDivisors - n === n;
    
    // Función totient de Euler (cantidad de enteros positivos <= n que son coprimos con n)
    let totient = 0;
    for (let i = 1; i <= n; i++) {
      if (gcd(i, n) === 1) {
        totient++;
      }
    }
    
    setResults({
      'Es primo': isPrimeNumber ? 'Sí' : 'No',
      'Es par': isEven ? 'Sí' : 'No',
      'Es impar': isOdd ? 'Sí' : 'No',
      'Es cuadrado perfecto': isPerfectSquare ? 'Sí' : 'No',
      'Es número perfecto': isPerfect ? 'Sí' : 'No',
      'Divisores': factors.join(', '),
      'Cantidad de divisores': factors.length,
      'Suma de divisores': sumOfDivisors,
      'Factorización prima': primeFactorization,
      'Función totient φ(n)': totient
    });
  };

  return (
    <div className="py-12" style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold text-accent sm:text-4xl">
            Teoría de Números
          </h1>
          <p className="mt-4 text-lg text-secondary opacity-80">
            Explora propiedades de números, primos, divisibilidad y más.
          </p>
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-bold text-accent mb-4">Análisis de Números</h2>
            
            <div className="mb-6">
              <p className="mb-2 text-sm opacity-70">
                Ingresa un número entero positivo para analizar sus propiedades
              </p>
              <MathInput 
                placeholder="Ingresa un número entero positivo..." 
                onSubmit={handleNumberInput}
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
            
            {number !== null && Object.keys(results).length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-secondary mb-4">Propiedades de {number}:</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(results).map(([key, value]) => {
                    // Manejar casos especiales para mostrar con MathDisplay
                    if (key === 'Factorización prima') {
                      return (
                        <div 
                          key={key} 
                          className="p-3 rounded-md"
                          style={{ 
                            backgroundColor: 'rgba(0, 191, 255, 0.05)',
                            border: '1px solid rgba(0, 191, 255, 0.2)'
                          }}
                        >
                          <span className="font-medium block mb-1">{key}:</span>
                          <MathDisplay formula={value.toString()} />
                        </div>
                      );
                    }
                    
                    return (
                      <div 
                        key={key} 
                        className="p-3 rounded-md flex flex-col"
                        style={{ 
                          backgroundColor: 'rgba(0, 191, 255, 0.05)',
                          border: '1px solid rgba(0, 191, 255, 0.2)'
                        }}
                      >
                        <span className="font-medium">{key}:</span>
                        <span className="mt-1">{value.toString()}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <h3 className="text-sm font-medium mb-2 opacity-70">Ejemplos:</h3>
              <ul className="text-sm space-y-1 opacity-60">
                <li>• Número primo: <span className="text-accent">17</span></li>
                <li>• Número perfecto: <span className="text-accent">28</span></li>
                <li>• Número con muchos factores: <span className="text-accent">60</span></li>
              </ul>
            </div>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-bold text-accent mb-4">Calculadora de MCD y MCM</h2>
            <p className="opacity-80 mb-4">
              Próximamente: Cálculo de máximo común divisor y mínimo común múltiplo.
            </p>
            
            <div className="p-6 rounded-lg text-center" 
              style={{ 
                backgroundColor: 'rgba(0, 0, 0, 0.2)',
                border: '1px dashed rgba(0, 191, 255, 0.3)'
              }}>
              <p className="text-lg opacity-70">
                ¡Estamos trabajando en esta funcionalidad!
              </p>
              <p className="mt-2 opacity-50">
                Pronto podrás calcular MCD, MCM y otras operaciones de teoría de números.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 