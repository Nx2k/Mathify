import { useState } from 'react';
import MathInput from '../components/math/MathInput';
import MathDisplay from '../components/math/MathDisplay';
import FunctionPlot from '../components/math/FunctionPlot';

export default function GeometryPage() {
  const [functions, setFunctions] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleAddFunction = (input: string) => {
    setError(null);
    
    try {
      // Validar que la función sea válida (esto es simplificado)
      if (input.trim()) {
        setFunctions([...functions, input]);
      }
    } catch (error) {
      console.error('Error al agregar la función:', error);
      setError('No se pudo agregar la función. Verifica la sintaxis.');
    }
  };

  const handleClearFunctions = () => {
    setFunctions([]);
  };

  return (
    <div className="py-12" style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold text-accent sm:text-4xl">
            Geometría
          </h1>
          <p className="mt-4 text-lg text-secondary" style={{ opacity: 0.8 }}>
            Grafica funciones, calcula áreas, volúmenes y más.
          </p>
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="card p-6">
            <h2 className="text-xl font-bold text-accent mb-4">Graficar Funciones</h2>
            
            <div className="mb-6">
              <MathInput 
                placeholder="Ingresa una función (ej: x^2, sin(x), etc.)" 
                onSubmit={handleAddFunction}
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
              
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleClearFunctions}
                  className="btn btn-secondary text-sm"
                >
                  Limpiar Gráfico
                </button>
              </div>
            </div>
            
            <div className="mt-6">
              {functions.length > 0 ? (
                <>
                  <h3 className="text-lg font-semibold text-secondary mb-4">Funciones:</h3>
                  <div className="mb-4 space-y-2">
                    {functions.map((fn, index) => (
                      <div key={index} className="flex items-center">
                        <span className="text-accent mr-2">{index + 1}.</span>
                        <MathDisplay formula={`f(x) = ${fn}`} inline />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 p-4 rounded-lg border" 
                    style={{ 
                      backgroundColor: 'rgba(0, 0, 0, 0.3)',
                      borderColor: 'rgba(0, 191, 255, 0.2)'
                    }}>
                    <FunctionPlot 
                      functions={functions}
                      width={800}
                      height={500}
                      className="mx-auto"
                    />
                  </div>
                </>
              ) : (
                <div className="text-center py-12" style={{ color: 'rgba(255, 255, 255, 0.6)' }}>
                  <p>Ingresa una función para comenzar a graficar</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 