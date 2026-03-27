import React, { createContext, useContext, ReactNode } from 'react';
import { useProductivityData, CategoryData } from '@/hooks/useProductivityData';

interface ProductivityContextType {
  data: CategoryData[];
  loading: boolean;
  error: Error | null;
}

const ProductivityContext = createContext<ProductivityContextType | undefined>(undefined);

export function ProductivityProvider({ children }: { children: ReactNode }) {
  const productivity = useProductivityData();

  return (
    <ProductivityContext.Provider value={productivity}>
      {children}
    </ProductivityContext.Provider>
  );
}

export function useProductivity() {
  const context = useContext(ProductivityContext);
  if (context === undefined) {
    throw new Error('useProductivity must be used within a ProductivityProvider');
  }
  return context;
}
