import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import VehicleComparison from '@/components/vehicle/VehicleComparison';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import VehicleCard from '@/components/common/VehicleCard';
import { useComparison } from '@/contexts/ComparisonContext';
import { useVehicles } from '@/hooks/useVehicles';
import { ArrowLeft, Trash2 } from 'lucide-react';

const ComparisonPage = () => {
  const { 
    comparisonVehicles, 
    removeFromComparison, 
    clearComparison, 
    addToComparison,
    maxComparison 
  } = useComparison();
  const { vehicles: allVehicles } = useVehicles();
  const [showAddModal, setShowAddModal] = useState(false);

  const availableVehicles = allVehicles.filter(
    vehicle => !comparisonVehicles.some(cv => cv.id === vehicle.id)
  );

  const handleAddVehicle = () => {
    setShowAddModal(true);
  };

  const handleSelectVehicle = (vehicle: any) => {
    addToComparison(vehicle);
    setShowAddModal(false);
  };

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Link to="/vehicles" className="flex items-center text-muted-foreground hover:text-foreground">
                <ArrowLeft className="w-4 h-4 mr-1" />
                <span className="font-open-sans text-sm">Back to Vehicles</span>
              </Link>
            </div>
            <h1 className="font-inter font-bold text-3xl text-foreground mb-2">
              Compare Vehicles
            </h1>
            <p className="font-open-sans text-muted-foreground">
              Compare up to {maxComparison} vehicles side-by-side
            </p>
          </div>

          {/* Action Buttons */}
          {comparisonVehicles.length > 0 && (
            <div className="flex gap-2">
              <Button 
                variant="outline" 
                onClick={clearComparison}
                className="font-inter"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear All
              </Button>
            </div>
          )}
        </div>

        {/* Comparison Content */}
        <VehicleComparison
          vehicles={comparisonVehicles}
          onRemoveVehicle={removeFromComparison}
          onAddVehicle={handleAddVehicle}
          maxVehicles={maxComparison}
        />

        {/* Add Vehicle Modal */}
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="font-inter">Add Vehicle to Comparison</DialogTitle>
            </DialogHeader>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {availableVehicles.map((vehicle) => (
                <div key={vehicle.id} className="cursor-pointer" onClick={() => handleSelectVehicle(vehicle)}>
                  <VehicleCard
                    vehicle={vehicle}
                    className="hover:ring-2 hover:ring-primary transition-all"
                  />
                </div>
              ))}
            </div>

            {availableVehicles.length === 0 && (
              <div className="text-center py-8">
                <p className="font-open-sans text-muted-foreground">
                  No more vehicles available to add to comparison.
                </p>
                <Link to="/vehicles" className="mt-4 inline-block">
                  <Button variant="outline" className="font-inter">
                    Browse All Vehicles
                  </Button>
                </Link>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default ComparisonPage;