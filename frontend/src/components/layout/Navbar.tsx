import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path: string) => location.pathname === path;
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav style={{ 
      backgroundColor: 'var(--color-primary-light)',
      boxShadow: 'var(--shadow-md)'
    }}>
      <div className="container mx-auto px-6">
        <div style={{ 
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          height: '4rem'
        }}>
          <div className="flex items-center">
            <Link to="/" style={{ 
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--color-accent)',
              display: 'flex',
              alignItems: 'center'
            }}>
              <span style={{ marginRight: '0.5rem' }}>∑</span>
              Mathify
            </Link>
          </div>
          
          {/* Navegación para escritorio */}
          <div className="hidden md:flex space-x-4">
            <Link to="/" className={`nav-link ${isActive('/') ? 'active' : ''}`}>
              Inicio
            </Link>
            <Link to="/algebra" className={`nav-link ${isActive('/algebra') ? 'active' : ''}`}>
              Álgebra
            </Link>
            <Link to="/calculus" className={`nav-link ${isActive('/calculus') ? 'active' : ''}`}>
              Cálculo
            </Link>
            <Link to="/geometry" className={`nav-link ${isActive('/geometry') ? 'active' : ''}`}>
              Geometría
            </Link>
            <Link to="/statistics" className={`nav-link ${isActive('/statistics') ? 'active' : ''}`}>
              Estadística
            </Link>
            <Link to="/number-theory" className={`nav-link ${isActive('/number-theory') ? 'active' : ''}`}>
              Teoría de Números
            </Link>
            <Link to="/discrete-math" className={`nav-link ${isActive('/discrete-math') ? 'active' : ''}`}>
              Matemática Discreta
            </Link>
            <Link to="/search" className={`nav-link ${isActive('/search') ? 'active' : ''}`}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
              </svg>
            </Link>
          </div>
          
          {/* Botón de menú para móvil */}
          <button 
            onClick={toggleMenu}
            className="md:hidden"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem'
            }}
            aria-label="Menú"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              fill="currentColor" 
              viewBox="0 0 16 16"
              style={{ color: 'var(--color-secondary)' }}
            >
              {isMenuOpen ? (
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
              ) : (
                <path d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              )}
            </svg>
          </button>
        </div>
        
        {/* Menú móvil */}
        {isMenuOpen && (
          <div 
            className="md:hidden py-4"
            style={{
              borderTop: '1px solid rgba(255, 255, 255, 0.1)'
            }}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link 
                to="/" 
                className={`nav-link ${isActive('/') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
              <Link 
                to="/algebra" 
                className={`nav-link ${isActive('/algebra') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Álgebra
              </Link>
              <Link 
                to="/calculus" 
                className={`nav-link ${isActive('/calculus') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Cálculo
              </Link>
              <Link 
                to="/geometry" 
                className={`nav-link ${isActive('/geometry') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Geometría
              </Link>
              <Link 
                to="/statistics" 
                className={`nav-link ${isActive('/statistics') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Estadística
              </Link>
              <Link 
                to="/number-theory" 
                className={`nav-link ${isActive('/number-theory') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Teoría de Números
              </Link>
              <Link 
                to="/discrete-math" 
                className={`nav-link ${isActive('/discrete-math') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Matemática Discreta
              </Link>
              <Link 
                to="/search" 
                className={`nav-link ${isActive('/search') ? 'active' : ''}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Búsqueda
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
} 