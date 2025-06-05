import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import type { Painting } from "@shared/schema";

interface PaintingCardProps {
  painting: Painting;
  featured?: boolean;
}

export default function PaintingCard({ painting, featured = false }: PaintingCardProps) {
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  const hasDiscount = painting.originalPrice && parseFloat(painting.originalPrice) > parseFloat(painting.price);
  const discountPercentage = hasDiscount 
    ? Math.round(((parseFloat(painting.originalPrice!) - parseFloat(painting.price)) / parseFloat(painting.originalPrice!)) * 100)
    : 0;

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await addToCart(painting.id);
      toast({
        title: "Added to cart",
        description: `${painting.title} has been added to your cart.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add item to cart. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <Link href={`/painting/${painting.id}`}>
      <div className="painting-card bg-white rounded-xl shadow-lg overflow-hidden group cursor-pointer">
        <div className="relative overflow-hidden">
          <img 
            src={painting.imageUrl} 
            alt={painting.title}
            className={`w-full object-cover group-hover:scale-110 transition-transform duration-500 ${
              featured ? 'h-64' : 'h-48'
            }`}
          />
          {hasDiscount && (
            <div className="absolute top-3 left-3">
              <Badge className="bg-golden text-white px-2 py-1 rounded-full text-xs font-medium discount-badge">
                {discountPercentage}% OFF
              </Badge>
            </div>
          )}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300"></div>
        </div>
        
        <div className={featured ? "p-6" : "p-4"}>
          <h4 className={`font-serif font-semibold mb-2 ${featured ? 'text-xl' : 'text-lg'}`}>
            {painting.title}
          </h4>
          <p className="text-muted-foreground mb-4 text-sm">
            {painting.medium}, {painting.dimensions}
          </p>
          
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              {hasDiscount ? (
                <div className="flex items-center space-x-2">
                  <span className={`font-bold text-foreground ${featured ? 'text-2xl' : 'text-lg'}`}>
                    ${parseFloat(painting.price).toLocaleString()}
                  </span>
                  <span className={`text-muted-foreground line-through ${featured ? 'text-lg' : 'text-sm'}`}>
                    ${parseFloat(painting.originalPrice!).toLocaleString()}
                  </span>
                </div>
              ) : (
                <span className={`font-bold text-foreground ${featured ? 'text-2xl' : 'text-lg'}`}>
                  ${parseFloat(painting.price).toLocaleString()}
                </span>
              )}
              {hasDiscount && (
                <div className="text-sm text-green-600 font-medium">
                  Save ${(parseFloat(painting.originalPrice!) - parseFloat(painting.price)).toLocaleString()}
                </div>
              )}
            </div>
            
            <Button
              onClick={handleAddToCart}
              disabled={!painting.isAvailable}
              className={`bg-charcoal text-white hover:bg-golden transition-colors duration-200 font-medium ${
                featured ? 'px-4 py-2' : 'px-3 py-1.5 text-xs'
              }`}
            >
              {painting.isAvailable ? 'Add to Cart' : 'Sold Out'}
            </Button>
          </div>
        </div>
      </div>
    </Link>
  );
}
