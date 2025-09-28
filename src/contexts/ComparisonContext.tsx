import React, { createContext, useContext, useState, useCallback } from 'react';
import { Vehicle } from '@/types';
import { toast } from 'sonner';

interface ComparisonContextType {
  comparisonVehicles: Vehicle[];
  addToComparison: (vehicle: Vehicle) => void;
  removeFromComparison: (vehicleId: string) => void;
  clearComparison: () => void;
  isInComparison: (vehicleId: string) => boolean;
  maxComparison: number;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

interface ComparisonProviderProps {
  children: React.ReactNode;
}

export const ComparisonProvider: React.FC<ComparisonProviderProps> = ({ children }) => {
  const [comparisonVehicles, setComparisonVehicles] = useState<Vehicle[]>([]);
  const maxComparison = 3;

  const addToComparison = useCallback((vehicle: Vehicle) => {
    setComparisonVehicles((prev) => {
      // Check if already in comparison
      if (prev.some(v => v.id === vehicle.id)) {
        toast.info(`${vehicle.name} is already in comparison`);
        return prev;
      }

      // Check if max limit reached
      if (prev.length >= maxComparison) {
        toast.error(`You can compare up to ${maxComparison} vehicles only`);
        return prev;
      }

      toast.success(`${vehicle.name} added to comparison`);
      return [...prev, vehicle];
    });
  }, [maxComparison]);

  const removeFromComparison = useCallback((vehicleId: string) => {
    setComparisonVehicles((prev) => {
      const vehicle = prev.find(v => v.id === vehicleId);
      if (vehicle) {
        toast.info(`${vehicle.name} removed from comparison`);
      }
      return prev.filter(v => v.id !== vehicleId);
    });
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonVehicles([]);
    toast.info('Comparison cleared');
  }, []);

  const isInComparison = useCallback((vehicleId: string) => {
    return comparisonVehicles.some(v => v.id === vehicleId);
  }, [comparisonVehicles]);

  const value: ComparisonContextType = {
    comparisonVehicles,
    addToComparison,
    removeFromComparison,
    clearComparison,
    isInComparison,
    maxComparison,
  };

  return (
    <ComparisonContext.Provider value={value}>
      {children}
    </ComparisonContext.Provider>
  );
};

export default ComparisonContext;