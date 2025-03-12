declare module 'react-katex' {
  import { ReactNode } from 'react';

  interface KatexProps {
    children?: ReactNode;
    math?: string;
    block?: boolean;
    errorColor?: string;
    renderError?: (error: Error) => ReactNode;
    settings?: Record<string, unknown>;
  }

  export const InlineMath: React.FC<KatexProps>;
  export const BlockMath: React.FC<KatexProps>;
} 