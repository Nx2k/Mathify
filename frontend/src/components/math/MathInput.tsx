import { useState } from 'react';
import 'katex/dist/katex.min.css';
import { InlineMath } from 'react-katex';

interface MathInputProps {
  placeholder?: string;
  onSubmit: (input: string) => void;
  className?: string;
}

export default function MathInput({ placeholder = 'Ingresa una expresión matemática...', onSubmit, className = '' }: MathInputProps) {
  const [input, setInput] = useState('');
  const [preview, setPreview] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
    
    // Solo actualizar la vista previa si hay contenido
    if (value.trim()) {
      try {
        setPreview(value);
      } catch (error) {
        console.error('Error al renderizar la expresión matemática:', error);
        setPreview('');
      }
    } else {
      setPreview('');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSubmit(input);
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="relative">
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder={placeholder}
            className="input w-full"
            style={{ paddingRight: '5rem' }}
          />
          <button
            type="submit"
            className="absolute right-2 top-1/2 transform rounded-md bg-accent px-2 py-1 text-xs font-semibold text-secondary"
            style={{ transform: 'translateY(-50%)' }}
          >
            Calcular
          </button>
        </div>
        
        {preview && (
          <div className="mt-2 rounded-md p-3 border border-accent" style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
            <p className="text-sm text-secondary mb-1">Vista previa:</p>
            <div className="text-lg text-secondary">
              <InlineMath math={preview} />
            </div>
          </div>
        )}
      </form>
    </div>
  );
} 