import EquationSolver from '../components/math/EquationSolver';

export default function AlgebraPage() {
  return (
    <div className="py-12" style={{ backgroundColor: 'var(--color-primary)' }}>
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-2xl text-center mb-12">
          <h1 className="text-3xl font-bold text-accent sm:text-4xl">
            Álgebra
          </h1>
          <p className="mt-4 text-lg text-secondary" style={{ opacity: 0.8 }}>
            Resuelve ecuaciones, sistemas de ecuaciones, matrices y más.
          </p>
        </div>
        
        <div className="mx-auto max-w-3xl">
          <EquationSolver />
        </div>
      </div>
    </div>
  );
} 