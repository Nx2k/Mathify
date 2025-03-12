import { Link } from 'react-router-dom';

const navigation = {
  main: [
    { name: 'Inicio', href: '/' },
    { name: 'Acerca de', href: '/about' },
    { name: 'Contacto', href: '/contact' },
    { name: 'Términos', href: '/terms' },
    { name: 'Privacidad', href: '/privacy' },
  ],
  categories: [
    { name: 'Álgebra', href: '/algebra' },
    { name: 'Cálculo', href: '/calculus' },
    { name: 'Geometría', href: '/geometry' },
    { name: 'Estadística', href: '/statistics' },
    { name: 'Teoría de Números', href: '/number-theory' },
    { name: 'Matemáticas Discretas', href: '/discrete-math' },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-accent" style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="container mx-auto px-6 py-12 sm:py-16">
        <nav className="mb-8 columns-2 sm:flex sm:justify-center sm:space-x-12">
          {navigation.main.map((item) => (
            <div key={item.name} className="pb-6">
              <Link to={item.href} className="text-sm text-secondary nav-link">
                {item.name}
              </Link>
            </div>
          ))}
        </nav>
        <div className="mt-8 border-t border-accent pt-8 md:flex md:items-center md:justify-between">
          <div className="flex space-x-6 md:order-2">
            <p className="text-xs text-secondary">
              Categorías:
            </p>
            {navigation.categories.map((item) => (
              <Link key={item.name} to={item.href} className="text-xs text-secondary nav-link">
                {item.name}
              </Link>
            ))}
          </div>
          <p className="mt-8 text-xs text-secondary md:order-1 md:mt-0">
            &copy; {new Date().getFullYear()} Mathify. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
} 