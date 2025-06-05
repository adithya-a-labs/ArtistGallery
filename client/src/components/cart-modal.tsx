import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { X, Trash2 } from "lucide-react";
import { useCartStore } from "@/lib/cart-store";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface CartItemWithPainting {
  id: number;
  paintingId: number;
  sessionId: string;
  quantity: number;
  painting: {
    id: number;
    title: string;
    price: string;
    imageUrl: string;
    dimensions: string;
  };
}

export default function CartModal() {
  const { isCartOpen, toggleCart } = useCartStore();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: cartItems = [], isLoading } = useQuery<CartItemWithPainting[]>({
    queryKey: ["/api/cart"],
    enabled: isCartOpen,
  });

  const removeFromCartMutation = useMutation({
    mutationFn: async (itemId: number) => {
      await apiRequest("DELETE", `/api/cart/${itemId}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Item removed",
        description: "The item has been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: async () => {
      await apiRequest("DELETE", "/api/cart");
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Cart cleared",
        description: "All items have been removed from your cart.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to clear cart.",
        variant: "destructive",
      });
    },
  });

  const total = cartItems.reduce((sum, item) => {
    return sum + (parseFloat(item.painting.price) * (item.quantity || 1));
  }, 0);

  const handleRemoveItem = (itemId: number) => {
    removeFromCartMutation.mutate(itemId);
  };

  const handleClearCart = () => {
    clearCartMutation.mutate();
  };

  const handleCheckout = () => {
    toast({
      title: "Checkout",
      description: "Checkout functionality would be implemented here.",
    });
  };

  return (
    <Sheet open={isCartOpen} onOpenChange={toggleCart}>
      <SheetContent className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle className="font-serif text-xl">Shopping Cart</SheetTitle>
        </SheetHeader>

        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto py-6">
            {isLoading ? (
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i} className="flex gap-4 p-4 border border-border rounded-lg">
                    <div className="w-16 h-16 bg-muted animate-pulse rounded"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-muted animate-pulse rounded"></div>
                      <div className="h-3 bg-muted animate-pulse rounded w-2/3"></div>
                      <div className="h-4 bg-muted animate-pulse rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : cartItems.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🛒</div>
                <h3 className="font-serif text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground text-sm">
                  Add some beautiful paintings to get started
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border border-border rounded-lg">
                    <img
                      src={item.painting.imageUrl}
                      alt={item.painting.title}
                      className="w-16 h-16 rounded object-cover"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif font-semibold truncate">
                        {item.painting.title}
                      </h4>
                      <p className="text-sm text-muted-foreground">
                        {item.painting.dimensions}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="font-bold text-foreground">
                          ${parseFloat(item.painting.price).toLocaleString()}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveItem(item.id)}
                          disabled={removeFromCartMutation.isPending}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {cartItems.length > 0 && (
            <div className="border-t border-border pt-6 space-y-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>${total.toLocaleString()}</span>
              </div>
              
              <div className="space-y-2">
                <Button
                  onClick={handleCheckout}
                  className="w-full bg-charcoal hover:bg-golden text-white font-medium"
                  size="lg"
                >
                  Proceed to Checkout
                </Button>
                
                <Button
                  variant="outline"
                  onClick={handleClearCart}
                  disabled={clearCartMutation.isPending}
                  className="w-full"
                >
                  Clear Cart
                </Button>
              </div>
              
              <div className="text-sm text-muted-foreground text-center space-y-1">
                <p>🚚 Free shipping on all orders</p>
                <p>🔒 Secure payment processing</p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
