import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, GitCompare, Fuel, Zap, Eye } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Vehicle } from '@/types';
import { formatPrice, formatMileage, slugify } from '@/utils';
import { useComparison } from '@/contexts/ComparisonContext';

interface VehicleCardProps {
  vehicle: Vehicle;
  onAddToWishlist?: (vehicleId: string) => void;
  onAddToCompare?: (vehicleId: string) => void;
  isWishlisted?: boolean;
  isInComparison?: boolean;
  className?: string;
}

const VehicleCard: React.FC<VehicleCardProps> = ({
  vehicle,
  onAddToWishlist,
  onAddToCompare,
  isWishlisted = false,
  isInComparison = false,
  className = '',
}) => {
  const { addToComparison, isInComparison: isVehicleInComparison } = useComparison();
  const vehicleSlug = `${slugify(vehicle.brand)}-${slugify(vehicle.name)}`;
  const vehicleUrl = `/vehicle/${vehicle.id}/${vehicleSlug}`;

  const handleCompareClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onAddToCompare) {
      onAddToCompare(vehicle.id);
    } else {
      addToComparison(vehicle);
    }
  };

  const isCurrentlyInComparison = isInComparison || isVehicleInComparison(vehicle.id);

  const getFuelIcon = (fuelType: string) => {
    switch (fuelType) {
      case 'Electric':
        return <Zap className="w-4 h-4" />;
      default:
        return <Fuel className="w-4 h-4" />;
    }
  };

  return (
    <Card className={`group hover:shadow-lg transition-all duration-300 ${className}`}>
      <div className="relative">
        {/* Vehicle Image */}
        <div className="aspect-[4/3] overflow-hidden rounded-t-lg">
          <img
            src={vehicle.images[0] || '/placeholder.svg'}
            alt={`${vehicle.brand} ${vehicle.name}`}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Action Buttons */}
        <div className="absolute top-2 right-2 flex space-x-2">
          {onAddToWishlist && (
            <Button
              size="icon"
              variant="secondary"
              className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={(e) => {
                e.preventDefault();
                onAddToWishlist(vehicle.id);
              }}
            >
              <Heart
                className={`w-4 h-4 ${
                  isWishlisted ? 'fill-accent text-accent' : 'text-muted-foreground'
                }`}
              />
            </Button>
          )}
          <Button
            size="icon"
            variant="secondary"
            className="w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={handleCompareClick}
          >
            <GitCompare
              className={`w-4 h-4 ${
                isCurrentlyInComparison ? 'text-primary' : 'text-muted-foreground'
              }`}
            />
          </Button>
        </div>

        {/* Category Badge */}
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 capitalize bg-background/80 backdrop-blur-sm"
        >
          {vehicle.category}
        </Badge>

        {/* Availability Status */}
        {!vehicle.availability && (
          <Badge
            variant="destructive"
            className="absolute bottom-2 left-2 bg-destructive/80 backdrop-blur-sm"
          >
            Out of Stock
          </Badge>
        )}
      </div>

      <CardContent className="p-4 space-y-3">
        {/* Brand and Model */}
        <div>
          <p className="text-sm font-open-sans text-muted-foreground">
            {vehicle.brand}
          </p>
          <h3 className="font-inter font-semibold text-lg text-foreground line-clamp-1">
            {vehicle.name}
          </h3>
        </div>

        {/* Price */}
        <div className="space-y-1">
          <p className="font-inter font-bold text-xl text-primary">
            {formatPrice(vehicle.price.exShowroom)}
          </p>
          <p className="text-xs font-open-sans text-muted-foreground">
            Ex-showroom price
          </p>
        </div>

        {/* Key Specifications */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center space-x-1 text-muted-foreground">
            {getFuelIcon(vehicle.specifications.fuelType)}
            <span className="font-open-sans">
              {vehicle.specifications.fuelType}
            </span>
          </div>
          <div className="font-open-sans text-muted-foreground">
            {formatMileage(vehicle.specifications.mileage)}
          </div>
          <div className="font-open-sans text-muted-foreground">
            {vehicle.specifications.engine}
          </div>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        <Link to={vehicleUrl} className="w-full">
          <Button className="w-full font-inter">
            <Eye className="w-4 h-4 mr-2" />
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default VehicleCard;