declare module 'function-plot' {
  interface FunctionPlotOptions {
    target: HTMLElement;
    width?: number;
    height?: number;
    xAxis?: {
      domain?: [number, number];
      label?: string;
    };
    yAxis?: {
      domain?: [number, number];
      label?: string;
    };
    grid?: boolean;
    data: Array<{
      fn: string;
      color?: string;
      graphType?: 'polyline' | 'scatter';
      fnType?: 'implicit' | 'explicit' | 'parametric' | 'polar';
      derivative?: {
        fn: string;
        updateOnMouseMove?: boolean;
      };
      scope?: Record<string, number>;
      nSamples?: number;
      closed?: boolean;
      range?: [number, number];
    }>;
  }

  interface FunctionPlotInstance {
    meta: {
      xDomain: [number, number];
      yDomain: [number, number];
    };
    root: HTMLElement;
  }

  function functionPlot(options: FunctionPlotOptions): FunctionPlotInstance;
  export default functionPlot;
} 