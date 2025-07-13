import { paintings, cartItems, contactMessages, type Painting, type InsertPainting, type CartItem, type InsertCartItem, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { db } from "./db";
import { eq, like, and, gte, lte } from "drizzle-orm";

export interface IStorage {
  // Paintings
  getAllPaintings(): Promise<Painting[]>;
  getPaintingById(id: number): Promise<Painting | undefined>;
  getFeaturedPaintings(): Promise<Painting[]>;
  searchPaintings(query: string): Promise<Painting[]>;
  filterPaintings(category?: string, priceRange?: string): Promise<Painting[]>;
  
  // Cart
  addToCart(item: InsertCartItem): Promise<CartItem>;
  getCartItems(sessionId: string): Promise<(CartItem & { painting: Painting })[]>;
  removeFromCart(id: number): Promise<void>;
  clearCart(sessionId: string): Promise<void>;
  
  // Contact
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
}

export class DatabaseStorage implements IStorage {
  async getAllPaintings(): Promise<Painting[]> {
    const result = await db.select().from(paintings).where(eq(paintings.isAvailable, true));
    return result;
  }

  async getPaintingById(id: number): Promise<Painting | undefined> {
    const result = await db.select().from(paintings).where(eq(paintings.id, id)).limit(1);
    return result[0] || undefined;
  }

  async getFeaturedPaintings(): Promise<Painting[]> {
    const result = await db.select().from(paintings)
      .where(and(eq(paintings.isFeatured, true), eq(paintings.isAvailable, true)));
    return result;
  }

  async searchPaintings(query: string): Promise<Painting[]> {
    const lowercaseQuery = `%${query.toLowerCase()}%`;
    const result = await db.select().from(paintings)
      .where(and(
        eq(paintings.isAvailable, true),
        like(paintings.title, lowercaseQuery)
      ));
    return result;
  }

  async filterPaintings(category?: string, priceRange?: string): Promise<Painting[]> {
    const conditions = [eq(paintings.isAvailable, true)];
    
    if (category && category !== "All Categories") {
      conditions.push(eq(paintings.category, category));
    }
    
    if (priceRange && priceRange !== "All Prices") {
      const priceConditions = this.getPriceConditions(priceRange);
      if (priceConditions) {
        conditions.push(priceConditions);
      }
    }
    
    const result = await db.select().from(paintings).where(and(...conditions));
    return result;
  }

  private getPriceConditions(priceRange: string) {
    switch (priceRange) {
      case "Under $500":
        return lte(paintings.price, "500");
      case "$500 - $1000":
        return and(gte(paintings.price, "500"), lte(paintings.price, "1000"));
      case "$1000 - $2000":
        return and(gte(paintings.price, "1000"), lte(paintings.price, "2000"));
      case "Over $2000":
        return gte(paintings.price, "2000");
      default:
        return null;
    }
  }

  async addToCart(item: InsertCartItem): Promise<CartItem> {
    // Check if item already exists for this session
    const existing = await db.select().from(cartItems)
      .where(and(
        eq(cartItems.paintingId, item.paintingId),
        eq(cartItems.sessionId, item.sessionId)
      ))
      .limit(1);
    
    if (existing.length > 0) {
      const updatedItem = {
        ...existing[0],
        quantity: (existing[0].quantity || 1) + (item.quantity || 1)
      };
      
      await db.update(cartItems)
        .set({ quantity: updatedItem.quantity })
        .where(eq(cartItems.id, existing[0].id));
      
      return updatedItem;
    }
    
    const result = await db.insert(cartItems)
      .values({
        ...item,
        quantity: item.quantity || 1
      })
      .returning();
    
    return result[0];
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { painting: Painting })[]> {
    const result = await db.select({
      id: cartItems.id,
      paintingId: cartItems.paintingId,
      sessionId: cartItems.sessionId,
      quantity: cartItems.quantity,
      painting: {
        id: paintings.id,
        title: paintings.title,
        price: paintings.price,
        imageUrl: paintings.imageUrl,
        dimensions: paintings.dimensions,
        description: paintings.description,
        originalPrice: paintings.originalPrice,
        medium: paintings.medium,
        category: paintings.category,
        isOnSale: paintings.isOnSale,
        isFeatured: paintings.isFeatured,
        isAvailable: paintings.isAvailable
      }
    })
    .from(cartItems)
    .innerJoin(paintings, eq(cartItems.paintingId, paintings.id))
    .where(eq(cartItems.sessionId, sessionId));

    return result;
  }

  async removeFromCart(id: number): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.id, id));
  }

  async clearCart(sessionId: string): Promise<void> {
    await db.delete(cartItems).where(eq(cartItems.sessionId, sessionId));
  }

  async createContactMessage(message: InsertContactMessage): Promise<ContactMessage> {
    const result = await db.insert(contactMessages)
      .values({
        ...message,
        createdAt: new Date().toISOString()
      })
      .returning();
    
    return result[0];
  }
}

export class MemStorage implements IStorage {
  private paintings: Map<number, Painting>;
  private cartItems: Map<number, CartItem>;
  private contactMessages: Map<number, ContactMessage>;
  private currentPaintingId: number;
  private currentCartId: number;
  private currentMessageId: number;

  constructor() {
    this.paintings = new Map();
    this.cartItems = new Map();
    this.contactMessages = new Map();
    this.currentPaintingId = 1;
    this.currentCartId = 1;
    this.currentMessageId = 1;
    
    // Initialize with sample paintings
    this.initializePaintings();
  }

  private initializePaintings() {
    const samplePaintings: InsertPainting[] = [
      {
        title: "Geometric Dreams",
        description: "A vibrant abstract painting featuring bold geometric shapes and dynamic colors that evoke a sense of movement and energy.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        price: "850.00",
        originalPrice: "1200.00",
        medium: "Oil on Canvas",
        dimensions: "24\" x 32\"",
        category: "Abstract",
        isOnSale: true,
        isFeatured: true,
        isAvailable: true,
      },
      {
        title: "Morning Serenity",
        description: "A peaceful landscape painting capturing the tranquil beauty of dawn with soft brushstrokes and natural colors.",
        imageUrl: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        price: "650.00",
        originalPrice: null,
        medium: "Acrylic on Canvas",
        dimensions: "18\" x 24\"",
        category: "Landscape",
        isOnSale: false,
        isFeatured: true,
        isAvailable: true,
      },
      {
        title: "Urban Rhythm",
        description: "A dramatic modern art piece with bold brushstrokes and contrasting colors representing the energy of city life.",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=800",
        price: "1275.00",
        originalPrice: "1500.00",
        medium: "Mixed Media on Canvas",
        dimensions: "30\" x 40\"",
        category: "Abstract",
        isOnSale: true,
        isFeatured: true,
        isAvailable: true,
      },
      {
        title: "Ocean Flow",
        description: "Abstract painting with organic flowing shapes inspired by ocean currents and marine life.",
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        price: "480.00",
        originalPrice: "600.00",
        medium: "Oil on Canvas",
        dimensions: "16\" x 20\"",
        category: "Abstract",
        isOnSale: true,
        isFeatured: false,
        isAvailable: true,
      },
      {
        title: "Minimalist Study",
        description: "A clean, minimalist modern art piece with geometric lines and subtle color variations.",
        imageUrl: "https://images.unsplash.com/photo-1578321272176-b7bbc0679853?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        price: "350.00",
        originalPrice: null,
        medium: "Acrylic on Canvas",
        dimensions: "12\" x 16\"",
        category: "Modern",
        isOnSale: false,
        isFeatured: false,
        isAvailable: true,
      },
      {
        title: "Color Symphony",
        description: "A vibrant contemporary abstract artwork with dynamic brushwork and harmonious color composition.",
        imageUrl: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=600",
        price: "700.00",
        originalPrice: "1000.00",
        medium: "Mixed Media",
        dimensions: "20\" x 24\"",
        category: "Abstract",
        isOnSale: true,
        isFeatured: false,
        isAvailable: true,
      },
      {
        title: "Cosmic Eye",
        description: "A mesmerizing celestial artwork depicting the infinite beauty of cosmic formations with vibrant stellar colors and ethereal luminosity that captures the mystery of deep space.",
        imageUrl: "/assets/black-hole-7213501_1752405668297.jpg",
        price: "1850.00",
        originalPrice: "2200.00",
        medium: "Digital Art on Canvas",
        dimensions: "36\" x 48\"",
        category: "Space",
        isOnSale: true,
        isFeatured: true,
        isAvailable: true,
      },
      {
        title: "Galactic Spiral",
        description: "An awe-inspiring representation of a cosmic spiral with swirling nebulae in brilliant purples and magentas, showcasing the dynamic forces that shape our universe.",
        imageUrl: "/assets/black-hole-9038900_1752405668297.jpg",
        price: "2100.00",
        originalPrice: "2500.00",
        medium: "Digital Art on Canvas",
        dimensions: "40\" x 52\"",
        category: "Space",
        isOnSale: true,
        isFeatured: true,
        isAvailable: true,
      },
    ];

    samplePaintings.forEach(painting => {
      const id = this.currentPaintingId++;
      this.paintings.set(id, { 
        ...painting, 
        id,
        originalPrice: painting.originalPrice || null,
        isOnSale: painting.isOnSale || false,
        isFeatured: painting.isFeatured || false,
        isAvailable: painting.isAvailable !== false
      });
    });
  }

  async getAllPaintings(): Promise<Painting[]> {
    return Array.from(this.paintings.values()).filter(p => p.isAvailable);
  }

  async getPaintingById(id: number): Promise<Painting | undefined> {
    return this.paintings.get(id);
  }

  async getFeaturedPaintings(): Promise<Painting[]> {
    return Array.from(this.paintings.values()).filter(p => p.isFeatured && p.isAvailable);
  }

  async searchPaintings(query: string): Promise<Painting[]> {
    const lowercaseQuery = query.toLowerCase();
    return Array.from(this.paintings.values()).filter(p => 
      p.isAvailable && (
        p.title.toLowerCase().includes(lowercaseQuery) ||
        p.description.toLowerCase().includes(lowercaseQuery) ||
        p.medium.toLowerCase().includes(lowercaseQuery) ||
        p.category.toLowerCase().includes(lowercaseQuery)
      )
    );
  }

  async filterPaintings(category?: string, priceRange?: string): Promise<Painting[]> {
    let filtered = Array.from(this.paintings.values()).filter(p => p.isAvailable);
    
    if (category && category !== "All Categories") {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (priceRange && priceRange !== "All Prices") {
      filtered = filtered.filter(p => {
        const price = parseFloat(p.price);
        switch (priceRange) {
          case "Under $500":
            return price < 500;
          case "$500 - $1000":
            return price >= 500 && price <= 1000;
          case "$1000 - $2000":
            return price >= 1000 && price <= 2000;
          case "Over $2000":
            return price > 2000;
          default:
            return true;
        }
      });
    }
    
    return filtered;
  }

  async addToCart(insertItem: InsertCartItem): Promise<CartItem> {
    // Check if item already exists for this session
    const existing = Array.from(this.cartItems.values()).find(
      item => item.paintingId === insertItem.paintingId && item.sessionId === insertItem.sessionId
    );
    
    if (existing) {
      existing.quantity = (existing.quantity || 1) + (insertItem.quantity || 1);
      this.cartItems.set(existing.id, existing);
      return existing;
    }
    
    const id = this.currentCartId++;
    const cartItem: CartItem = { 
      ...insertItem, 
      id,
      quantity: insertItem.quantity || 1
    };
    this.cartItems.set(id, cartItem);
    return cartItem;
  }

  async getCartItems(sessionId: string): Promise<(CartItem & { painting: Painting })[]> {
    const items = Array.from(this.cartItems.values()).filter(item => item.sessionId === sessionId);
    return items.map(item => ({
      ...item,
      painting: this.paintings.get(item.paintingId)!
    })).filter(item => item.painting);
  }

  async removeFromCart(id: number): Promise<void> {
    this.cartItems.delete(id);
  }

  async clearCart(sessionId: string): Promise<void> {
    Array.from(this.cartItems.entries()).forEach(([id, item]) => {
      if (item.sessionId === sessionId) {
        this.cartItems.delete(id);
      }
    });
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = this.currentMessageId++;
    const message: ContactMessage = {
      ...insertMessage,
      id,
      createdAt: new Date().toISOString(),
    };
    this.contactMessages.set(id, message);
    return message;
  }
}

export const storage = new MemStorage();
