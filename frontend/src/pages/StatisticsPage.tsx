import { useState } from 'react';
import { std, mean, median, quantileSeq, variance } from 'mathjs';
import MathInput from '../components/math/MathInput';
import MathDisplay from '../components/math/MathDisplay';

interface StatResults {
  [key: string]: string;
}

export default function StatisticsPage() {
  const [data, setData] = useState<number[]>([]);
  const [results, setResults] = useState<StatResults>({});
  const [error, setError] = useState<string | null>(null);

  const handleDataInput = (input: string) => {
    setError(null);
    
    try {
      // Convertir la entrada en un array de números
      // Aceptamos formatos como "1,2,3,4,5" o "1 2 3 4 5"
      const cleanedInput = input.replace(/\s+/g, ',').replace(/,+/g, ',').trim();
      
      if (cleanedInput.endsWith(',')) {
        const parsed = cleanedInput.slice(0, -1).split(',').map(Number);
        if (parsed.some(isNaN)) {
          throw new Error('Datos inválidos');
        }
        setData(parsed);
      } else {
        const parsed = cleanedInput.split(',').map(Number);
        if (parsed.some(isNaN)) {
          throw new Error('Datos inválidos');
        }
        setData(parsed);
      }
      
      // Calcular estadísticas
      if (data.length > 0) {
        calculateStatistics(data);
      }
    } catch (error) {
      console.error('Error al procesar los datos:', error);
      setError('No se pudieron procesar los datos. Verifica el formato (números separados por comas).');
    }
  };

  const calculateStatistics = (numbers: number[]) => {
    if (numbers.length === 0) return;
    
    try {
      const stats: StatResults = {
        'Media': mean(numbers).toString(),
        'Mediana': median(numbers).toString(),
        'Desviación Estándar': std(numbers).toString(),
        'Varianza': variance(numbers).toString(),
        'Mínimo': Math.min(...numbers).toFixed(4),
        'Máximo': Math.max(...numbers).toFixed(4),
        'Rango': (Math.max(...numbers) - Math.min(...numbers)).toFixed(4),
        'Suma': numbers.reduce((a, b) => a + b, 0).toFixed(4),
        'Cantidad': numbers.length.toString(),
      };
      
      // Cuartiles
      if (numbers.length >= 4) {
        // Asegurarnos de que quantileSeq devuelve un número
        const q1Value = Number(quantileSeq(numbers, 0.25));
        const q3Value = Number(quantileSeq(numbers, 0.75));
        
        stats['Q1 (25%)'] = q1Value.toFixed(4);
        stats['Q3 (75%)'] = q3Value.toFixed(4);
        stats['IQR'] = (q3Value - q1Value).toFixed(4);
      }
      
      setResults(stats);
    } catch (error) {
      console.error('Error al calcular estadísticas:', error);
      setError('No se pudieron calcular las estadísticas.');
    }
  };

  return (
    <div className="py-12" style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold text-accent sm:text-4xl">
            Estadística
          </h1>
          <p className="mt-4 text-lg text-secondary opacity-80">
            Analiza datos, calcula probabilidades y más.
          </p>
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="card p-6 mb-8">
            <h2 className="text-xl font-bold text-accent mb-4">Análisis Estadístico</h2>
            
            <div className="mb-6">
              <p className="mb-2 text-sm opacity-70">
                Ingresa tus datos separados por comas (ejemplo: 1,2,3,4,5)
              </p>
              <MathInput 
                placeholder="Ingresa datos numéricos separados por comas..." 
                onSubmit={handleDataInput}
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
            
            {data.length > 0 && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-secondary mb-4">Datos:</h3>
                <div className="p-3 rounded-md mb-6" 
                  style={{ 
                    backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    border: '1px solid rgba(0, 191, 255, 0.2)'
                  }}>
                  <MathDisplay formula={`[${data.join(', ')}]`} />
                </div>
                
                <h3 className="text-lg font-semibold text-secondary mb-4">Resultados:</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(results).map(([key, value]) => (
                    <div 
                      key={key} 
                      className="p-3 rounded-md flex justify-between"
                      style={{ 
                        backgroundColor: 'rgba(0, 191, 255, 0.05)',
                        border: '1px solid rgba(0, 191, 255, 0.2)'
                      }}
                    >
                      <span className="font-medium">{key}:</span>
                      <span>{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <h3 className="text-sm font-medium mb-2 opacity-70">Ejemplos:</h3>
              <ul className="text-sm space-y-1 opacity-60">
                <li>• Notas de examen: <span className="text-accent">85, 90, 78, 92, 88</span></li>
                <li>• Temperaturas diarias: <span className="text-accent">22.5, 23.1, 21.8, 24.0, 22.2</span></li>
                <li>• Conjunto de datos: <span className="text-accent">-5, 0, 5, 10, 15, 20</span></li>
              </ul>
            </div>
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-bold text-accent mb-4">Distribuciones de Probabilidad</h2>
            <p className="opacity-80 mb-4">
              Próximamente: Cálculos de distribuciones normales, binomiales, Poisson y más.
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
                Pronto podrás calcular probabilidades usando diferentes distribuciones.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 