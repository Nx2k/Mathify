import { Link } from 'react-router-dom';
import MathInput from '../components/math/MathInput';
import { useState } from 'react';
import { evaluate } from 'mathjs';
import MathDisplay from '../components/math/MathDisplay';

const categories = [
  {
    name: 'Álgebra',
    href: '/algebra',
    icon: '∑',
    description: 'Ecuaciones, sistemas, matrices y más',
    bgImage: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Cálculo',
    href: '/calculus',
    icon: '∫',
    description: 'Derivadas, integrales, límites y más',
    bgImage: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Geometría',
    href: '/geometry',
    icon: '△',
    description: 'Gráficas, áreas, volúmenes y más',
    bgImage: 'https://images.unsplash.com/photo-1544159344-3ad72b16806d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Estadística',
    href: '/statistics',
    icon: 'σ',
    description: 'Probabilidad, distribuciones y más',
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Teoría de Números',
    href: '/number-theory',
    icon: 'π',
    description: 'Primos, divisibilidad, congruencias y más',
    bgImage: 'https://images.unsplash.com/photo-1580894908361-967195033215?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
  {
    name: 'Matemáticas Discretas',
    href: '/discrete-math',
    icon: '⊕',
    description: 'Grafos, combinatoria, lógica y más',
    bgImage: 'https://images.unsplash.com/photo-1614850715649-1d0106293bd1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
  },
];

const features = [
  {
    title: 'Cálculos Precisos',
    description: 'Realiza operaciones matemáticas con precisión y rapidez',
    icon: '🧮'
  },
  {
    title: 'Visualización Gráfica',
    description: 'Visualiza funciones y datos con gráficos interactivos',
    icon: '📊'
  },
  {
    title: 'Paso a Paso',
    description: 'Obtén soluciones detalladas con explicaciones paso a paso',
    icon: '📝'
  },
  {
    title: 'Fórmulas Avanzadas',
    description: 'Accede a una amplia biblioteca de fórmulas matemáticas',
    icon: '📚'
  }
];

export default function HomePage() {
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recentCalculations, setRecentCalculations] = useState<string[]>([]);

  const handleCalculate = (input: string) => {
    setError(null);
    setResult(null);
    
    try {
      const result = evaluate(input);
      const calculation = `${input} = ${result}`;
      setResult(calculation);
      
      // Guardar cálculo reciente
      setRecentCalculations(prev => {
        const updated = [calculation, ...prev];
        return updated.slice(0, 5); // Mantener solo los 5 más recientes
      });
    } catch (error) {
      console.error('Error al evaluar la expresión:', error);
      setError('No se pudo evaluar la expresión. Verifica la sintaxis.');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        <div className="container mx-auto px-6 py-24 sm:py-32">
          <div className="hero-content mx-auto max-w-3xl text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-secondary sm:text-6xl">
              <span className="text-accent">Mathify</span> - Tu Asistente Matemático
            </h1>
            <p className="mt-6 text-lg text-secondary opacity-80">
              Resuelve problemas matemáticos, grafica funciones, calcula derivadas e integrales, y mucho más.
            </p>
            
            <div className="mt-10 animate-slide-up">
              <MathInput 
                placeholder="Ingresa una expresión matemática..." 
                onSubmit={handleCalculate}
                className="max-w-xl mx-auto"
              />
              
              {error && (
                <div className="mt-4 p-3 rounded-md text-error max-w-xl mx-auto" 
                  style={{ 
                    backgroundColor: 'rgba(220, 38, 38, 0.2)', 
                    borderColor: 'rgba(220, 38, 38, 0.5)',
                    border: '1px solid'
                  }}>
                  {error}
                </div>
              )}
              
              {result && (
                <div className="mt-6 p-4 rounded-md border max-w-xl mx-auto" 
                  style={{ 
                    backgroundColor: 'rgba(0, 191, 255, 0.1)', 
                    borderColor: 'rgba(0, 191, 255, 0.3)' 
                  }}>
                  <MathDisplay formula={result} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Categorías */}
      <div className="container mx-auto px-6 py-16">
        <h2 className="text-3xl font-bold text-accent text-center section-title">
          Explora Nuestras Categorías
        </h2>

        <div className="grid grid-cols-1 gap-y-8 gap-x-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <Link
              key={category.name}
              to={category.href}
              className="group relative block overflow-hidden rounded-lg border category-card"
              style={{ 
                backgroundColor: 'var(--color-primary-light)',
                borderColor: 'rgba(0, 191, 255, 0.2)',
                transition: 'all 0.3s'
              }}
            >
              <div className="absolute inset-0 opacity-10" 
                style={{
                  backgroundImage: `url(${category.bgImage})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transition: 'opacity 0.3s'
                }}
              />
              <div className="p-6 relative z-10">
                <div className="category-icon">{category.icon}</div>
                <h3 className="text-xl font-semibold text-secondary category-title">
                  {category.name}
                </h3>
                <p className="mt-2 text-sm opacity-70">
                  {category.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Características */}
      <div className="py-16" style={{ backgroundColor: 'var(--color-primary-dark)' }}>
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-accent text-center section-title">
            ¿Por qué elegir Mathify?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="p-6 rounded-lg text-center"
                style={{ 
                  backgroundColor: 'var(--color-primary-light)',
                  border: '1px solid rgba(0, 191, 255, 0.2)',
                  transition: 'transform 0.3s, box-shadow 0.3s'
                }}
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-accent mb-2">{feature.title}</h3>
                <p className="opacity-70">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cálculos Recientes */}
      {recentCalculations.length > 0 && (
        <div className="container mx-auto px-6 py-16">
          <h2 className="text-2xl font-bold text-accent mb-8">
            Cálculos Recientes
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentCalculations.map((calc, index) => (
              <div 
                key={index} 
                className="p-4 rounded-md"
                style={{ 
                  backgroundColor: 'var(--color-primary-light)',
                  border: '1px solid rgba(0, 191, 255, 0.2)'
                }}
              >
                <MathDisplay formula={calc} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div className="container mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold text-accent mb-6">
          ¿Listo para resolver tus problemas matemáticos?
        </h2>
        <p className="max-w-2xl mx-auto mb-8 opacity-80">
          Mathify te ofrece todas las herramientas que necesitas para resolver cualquier problema matemático.
          Explora nuestras categorías y descubre todo lo que puedes hacer.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Link to="/algebra" className="btn btn-primary">
            Comenzar con Álgebra
          </Link>
          <Link to="/calculus" className="btn btn-secondary">
            Explorar Cálculo
          </Link>
        </div>
      </div>
    </div>
  );
} 