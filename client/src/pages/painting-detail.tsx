import { useParams, useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, ShoppingBag } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { useToast } from "@/hooks/use-toast";
import type { Painting } from "@shared/schema";

export default function PaintingDetail() {
  const params = useParams<{ id: string }>();
  const [, setLocation] = useLocation();
  const { addToCart } = useCartStore();
  const { toast } = useToast();

  const { data: painting, isLoading, error } = useQuery<Painting>({
    queryKey: [`/api/paintings/${params.id}`],
  });

  const handleAddToCart = async () => {
    if (!painting) return;
    
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-golden mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading painting details...</p>
        </div>
      </div>
    );
  }

  if (error || !painting) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🎨</div>
          <h1 className="text-2xl font-bold mb-2">Painting not found</h1>
          <p className="text-muted-foreground mb-6">
            The painting you're looking for doesn't exist or has been removed.
          </p>
          <Button onClick={() => setLocation("/gallery")} variant="outline">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Gallery
          </Button>
        </div>
      </div>
    );
  }

  const hasDiscount = painting.originalPrice && parseFloat(painting.originalPrice) > parseFloat(painting.price);
  const discountPercentage = hasDiscount 
    ? Math.round(((parseFloat(painting.originalPrice!) - parseFloat(painting.price)) / parseFloat(painting.originalPrice!)) * 100)
    : 0;

  return (
    <div className="pt-16 min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Button 
          onClick={() => setLocation("/gallery")} 
          variant="ghost" 
          className="mb-8 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Gallery
        </Button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative">
            <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={painting.imageUrl}
                alt={painting.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>
            {hasDiscount && (
              <div className="absolute top-6 left-6">
                <Badge className="bg-golden text-white px-3 py-1 text-sm font-medium discount-badge">
                  {discountPercentage}% OFF
                </Badge>
              </div>
            )}
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <Badge variant="outline" className="text-golden border-golden">
                  {painting.category}
                </Badge>
                {painting.isFeatured && (
                  <Badge variant="secondary">Featured</Badge>
                )}
              </div>
              <h1 className="font-serif text-4xl font-bold mb-4">{painting.title}</h1>
              <p className="text-muted-foreground text-lg leading-relaxed">
                {painting.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <span className="text-3xl font-bold text-foreground">
                  ${parseFloat(painting.price).toLocaleString()}
                </span>
                {hasDiscount && (
                  <span className="text-xl text-muted-foreground line-through">
                    ${parseFloat(painting.originalPrice!).toLocaleString()}
                  </span>
                )}
              </div>
              {hasDiscount && (
                <div className="text-green-600 font-medium">
                  Save ${(parseFloat(painting.originalPrice!) - parseFloat(painting.price)).toLocaleString()}
                </div>
              )}
            </div>

            {/* Specifications */}
            <div className="space-y-4 p-6 bg-muted rounded-xl">
              <h3 className="font-serif text-xl font-semibold">Specifications</h3>
              <div className="grid grid-cols-1 gap-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Medium:</span>
                  <span className="font-medium">{painting.medium}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Dimensions:</span>
                  <span className="font-medium">{painting.dimensions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Category:</span>
                  <span className="font-medium">{painting.category}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Availability:</span>
                  <span className={`font-medium ${painting.isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                    {painting.isAvailable ? 'Available' : 'Sold'}
                  </span>
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4">
              <Button
                onClick={handleAddToCart}
                disabled={!painting.isAvailable}
                size="lg"
                className="w-full bg-charcoal hover:bg-golden text-white font-medium py-4 text-lg"
              >
                <ShoppingBag className="h-5 w-5 mr-3" />
                {painting.isAvailable ? 'Add to Cart' : 'Sold Out'}
              </Button>
              
              <div className="text-sm text-muted-foreground text-center">
                <p>🚚 Free shipping on all original paintings</p>
                <p>🔒 Secure payment processing</p>
                <p>↩️ 30-day return policy</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
