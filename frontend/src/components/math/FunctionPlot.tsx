import { useEffect, useRef } from 'react';
import functionPlot from 'function-plot';

interface FunctionPlotProps {
  functions: string[];
  width?: number;
  height?: number;
  xRange?: [number, number];
  yRange?: [number, number];
  grid?: boolean;
  className?: string;
}

export default function FunctionPlot({
  functions,
  width = 600,
  height = 400,
  xRange = [-10, 10],
  yRange = [-10, 10],
  grid = true,
  className = '',
}: FunctionPlotProps) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    try {
      const data = functions.map((fn) => ({
        fn,
        color: '#00BFFF',
      }));

      functionPlot({
        target: rootRef.current,
        width,
        height,
        xAxis: {
          domain: xRange,
          label: 'x',
        },
        yAxis: {
          domain: yRange,
          label: 'y',
        },
        grid,
        data,
      });
    } catch (error) {
      console.error('Error al graficar la función:', error);
    }
  }, [functions, width, height, xRange, yRange, grid]);

  return (
    <div 
      ref={rootRef} 
      className={`function-plot border rounded-lg ${className}`}
      style={{ 
        borderColor: 'rgba(0, 191, 255, 0.3)', 
        backgroundColor: 'rgba(0, 0, 0, 0.3)' 
      }}
    />
  );
} 