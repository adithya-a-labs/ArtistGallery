import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertCartItemSchema, insertContactMessageSchema } from "@shared/schema";
import path from "path";
import express from "express";

export async function registerRoutes(app: Express): Promise<Server> {
  app.get("/health", (_req, res) => {
    res.status(200).json({ status: "ok" });
  });

  // Serve static assets
  app.use('/assets', express.static(path.join(process.cwd(), 'attached_assets')));

  // Get all paintings
  app.get("/api/paintings", async (req, res) => {
    try {
      const paintings = await storage.getAllPaintings();
      res.json(paintings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch paintings" });
    }
  });

  // Get featured paintings
  app.get("/api/paintings/featured", async (req, res) => {
    try {
      const paintings = await storage.getFeaturedPaintings();
      res.json(paintings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured paintings" });
    }
  });

  // Get painting by ID
  app.get("/api/paintings/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const painting = await storage.getPaintingById(id);
      if (!painting) {
        return res.status(404).json({ message: "Painting not found" });
      }
      res.json(painting);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch painting" });
    }
  });

  // Search paintings
  app.get("/api/paintings/search/:query", async (req, res) => {
    try {
      const query = req.params.query;
      const paintings = await storage.searchPaintings(query);
      res.json(paintings);
    } catch (error) {
      res.status(500).json({ message: "Failed to search paintings" });
    }
  });

  // Filter paintings
  app.get("/api/paintings/filter", async (req, res) => {
    try {
      const { category, priceRange } = req.query;
      const paintings = await storage.filterPaintings(
        category as string,
        priceRange as string
      );
      res.json(paintings);
    } catch (error) {
      res.status(500).json({ message: "Failed to filter paintings" });
    }
  });

  // Add to cart
  app.post("/api/cart", async (req, res) => {
    try {
      const sessionId = (req as any).sessionID || 'anonymous';
      const validated = insertCartItemSchema.parse({
        ...req.body,
        sessionId,
      });
      
      const cartItem = await storage.addToCart(validated);
      res.json(cartItem);
    } catch (error) {
      res.status(400).json({ message: "Invalid cart item data" });
    }
  });

  // Get cart items
  app.get("/api/cart", async (req, res) => {
    try {
      const sessionId = (req as any).sessionID || 'anonymous';
      const items = await storage.getCartItems(sessionId);
      res.json(items);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch cart items" });
    }
  });

  // Remove from cart
  app.delete("/api/cart/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      await storage.removeFromCart(id);
      res.json({ message: "Item removed from cart" });
    } catch (error) {
      res.status(500).json({ message: "Failed to remove item from cart" });
    }
  });

  // Clear cart
  app.delete("/api/cart", async (req, res) => {
    try {
      const sessionId = (req as any).sessionID || 'anonymous';
      await storage.clearCart(sessionId);
      res.json({ message: "Cart cleared" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear cart" });
    }
  });

  // Submit contact form
  app.post("/api/contact", async (req, res) => {
    try {
      const validated = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(validated);
      res.json({ message: "Message sent successfully", data: message });
    } catch (error) {
      res.status(400).json({ message: "Invalid contact form data" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
