import { useState } from 'react';
import { Link } from 'react-router-dom';
import MathInput from '../components/math/MathInput';
import MathDisplay from '../components/math/MathDisplay';

// Datos de ejemplo para la búsqueda
const searchData = [
  {
    title: 'Ecuaciones Lineales',
    description: 'Resolver ecuaciones de primer grado con una incógnita',
    category: 'Álgebra',
    path: '/algebra',
    formula: 'ax + b = c',
    tags: ['ecuación', 'lineal', 'primer grado', 'álgebra']
  },
  {
    title: 'Ecuaciones Cuadráticas',
    description: 'Resolver ecuaciones de segundo grado',
    category: 'Álgebra',
    path: '/algebra',
    formula: 'ax^2 + bx + c = 0',
    tags: ['ecuación', 'cuadrática', 'segundo grado', 'álgebra']
  },
  {
    title: 'Derivadas',
    description: 'Calcular la derivada de una función',
    category: 'Cálculo',
    path: '/calculus',
    formula: '\\frac{d}{dx}f(x)',
    tags: ['derivada', 'cálculo', 'función']
  },
  {
    title: 'Integrales',
    description: 'Calcular la integral de una función',
    category: 'Cálculo',
    path: '/calculus',
    formula: '\\int f(x) \\, dx',
    tags: ['integral', 'cálculo', 'función']
  },
  {
    title: 'Gráficas de Funciones',
    description: 'Visualizar funciones en un plano cartesiano',
    category: 'Geometría',
    path: '/geometry',
    formula: 'f(x) = x^2',
    tags: ['gráfica', 'función', 'geometría']
  },
  {
    title: 'Estadística Descriptiva',
    description: 'Calcular media, mediana, moda y más',
    category: 'Estadística',
    path: '/statistics',
    formula: '\\bar{x} = \\frac{1}{n}\\sum_{i=1}^{n} x_i',
    tags: ['estadística', 'media', 'mediana', 'descriptiva']
  },
  {
    title: 'Números Primos',
    description: 'Verificar si un número es primo',
    category: 'Teoría de Números',
    path: '/number-theory',
    formula: 'p > 1 \\text{ y solo divisible por } 1 \\text{ y } p',
    tags: ['primo', 'teoría de números', 'divisibilidad']
  },
  {
    title: 'Combinaciones',
    description: 'Calcular el número de combinaciones posibles',
    category: 'Matemáticas Discretas',
    path: '/discrete-math',
    formula: 'C(n,k) = \\binom{n}{k} = \\frac{n!}{k!(n-k)!}',
    tags: ['combinatoria', 'combinaciones', 'matemáticas discretas']
  }
];

interface SearchResult {
  title: string;
  description: string;
  category: string;
  path: string;
  formula: string;
  tags: string[];
  relevance?: number;
}

export default function SearchPage() {
  const [query, setQuery] = useState<string>('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  const handleSearch = (searchQuery: string) => {
    setQuery(searchQuery);
    
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }
    
    // Guardar búsqueda reciente
    if (!recentSearches.includes(searchQuery)) {
      setRecentSearches(prev => {
        const updated = [searchQuery, ...prev];
        return updated.slice(0, 5); // Mantener solo las 5 más recientes
      });
    }
    
    // Búsqueda simple por coincidencia de texto
    const searchTerms = searchQuery.toLowerCase().split(/\s+/);
    
    const searchResults = searchData
      .map(item => {
        // Calcular relevancia basada en coincidencias
        let relevance = 0;
        
        // Buscar en título (mayor peso)
        searchTerms.forEach(term => {
          if (item.title.toLowerCase().includes(term)) relevance += 3;
        });
        
        // Buscar en descripción
        searchTerms.forEach(term => {
          if (item.description.toLowerCase().includes(term)) relevance += 2;
        });
        
        // Buscar en categoría
        searchTerms.forEach(term => {
          if (item.category.toLowerCase().includes(term)) relevance += 2;
        });
        
        // Buscar en tags
        item.tags.forEach(tag => {
          searchTerms.forEach(term => {
            if (tag.toLowerCase().includes(term)) relevance += 1;
          });
        });
        
        return { ...item, relevance };
      })
      .filter(item => item.relevance > 0)
      .sort((a, b) => (b.relevance || 0) - (a.relevance || 0));
    
    setResults(searchResults);
  };

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text;
    
    const searchTerms = query.toLowerCase().split(/\s+/);
    let highlightedText = text;
    
    searchTerms.forEach(term => {
      if (term.length < 3) return; // Ignorar términos muy cortos
      
      const regex = new RegExp(`(${term})`, 'gi');
      highlightedText = highlightedText.replace(regex, '<span class="result-highlight">$1</span>');
    });
    
    return <span dangerouslySetInnerHTML={{ __html: highlightedText }} />;
  };

  return (
    <div className="py-12" style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold text-accent sm:text-4xl">
            Búsqueda
          </h1>
          <p className="mt-4 text-lg text-secondary opacity-80">
            Encuentra fórmulas, conceptos y herramientas matemáticas
          </p>
        </div>
        
        <div className="mx-auto max-w-4xl">
          <div className="card p-6 mb-8">
            <div className="mb-6">
              <MathInput 
                placeholder="Buscar conceptos, fórmulas, herramientas..." 
                onSubmit={handleSearch}
              />
            </div>
            
            {query && (
              <div className="mt-4 mb-6">
                <p className="text-sm opacity-70">
                  {results.length} resultados para "{query}"
                </p>
              </div>
            )}
            
            {results.length > 0 ? (
              <div className="space-y-6">
                {results.map((result, index) => (
                  <Link 
                    key={index} 
                    to={result.path}
                    className="block p-4 rounded-md search-result"
                  >
                    <div className="flex items-start">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-accent mb-1">
                          {highlightText(result.title, query)}
                        </h3>
                        <p className="text-sm opacity-80 mb-2">
                          {highlightText(result.description, query)}
                        </p>
                        <div className="mb-2">
                          <MathDisplay formula={result.formula} />
                        </div>
                        <div className="flex items-center">
                          <span className="text-xs px-2 py-1 rounded-full mr-2" 
                            style={{ 
                              backgroundColor: 'rgba(0, 191, 255, 0.1)', 
                              border: '1px solid rgba(0, 191, 255, 0.2)' 
                            }}>
                            {result.category}
                          </span>
                          <div className="text-xs opacity-60">
                            {result.tags.slice(0, 3).join(' • ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            ) : query ? (
              <div className="text-center py-12 opacity-70">
                <p>No se encontraron resultados para "{query}"</p>
                <p className="mt-2 text-sm opacity-60">
                  Intenta con otros términos o explora las categorías
                </p>
              </div>
            ) : recentSearches.length > 0 ? (
              <div>
                <h3 className="text-lg font-semibold text-secondary mb-4">Búsquedas recientes</h3>
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((search, index) => (
                    <button
                      key={index}
                      className="px-3 py-1 rounded-full text-sm"
                      style={{ 
                        backgroundColor: 'rgba(0, 191, 255, 0.1)', 
                        border: '1px solid rgba(0, 191, 255, 0.2)' 
                      }}
                      onClick={() => handleSearch(search)}
                    >
                      {search}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12 opacity-70">
                <p>Ingresa un término para buscar</p>
                <p className="mt-2 text-sm opacity-60">
                  Puedes buscar por conceptos, fórmulas o categorías
                </p>
              </div>
            )}
          </div>
          
          <div className="card p-6">
            <h2 className="text-xl font-bold text-accent mb-4">Categorías Populares</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {['Álgebra', 'Cálculo', 'Geometría', 'Estadística', 'Teoría de Números', 'Matemáticas Discretas'].map((category) => (
                <Link
                  key={category}
                  to={`/${category.toLowerCase().replace(/\s+/g, '-').replace(/[áéíóú]/g, match => {
                    return {á: 'a', é: 'e', í: 'i', ó: 'o', ú: 'u'}[match] || match;
                  })}`}
                  className="p-4 rounded-md text-center category-card"
                  style={{ 
                    backgroundColor: 'var(--color-primary-light)',
                    border: '1px solid rgba(0, 191, 255, 0.2)'
                  }}
                >
                  <h3 className="text-lg font-semibold text-secondary category-title">
                    {category}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 