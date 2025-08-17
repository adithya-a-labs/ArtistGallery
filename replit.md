# ArtSaathi - Homemade Artist Marketplace Platform

## Overview

ArtSaathi is a full-stack marketplace platform built with React, TypeScript, Express, and PostgreSQL that connects homemade artists with art consumers across India. The platform enables talented artists working from home studios to showcase and sell their authentic, handcrafted artworks while providing art lovers with access to unique, original pieces. It features an authentically Indian design inspired by Saatchi Art's structure, with beautiful fluidic animations and cultural aesthetics.

## User Preferences

Preferred communication style: Simple, everyday language.
Design Style: Authentically Indian marketplace with Saatchi Art-inspired structure
Animation Style: Beautiful, fluidic animations with intuitive user experience
Cultural Theme: Indian aesthetics and cultural elements
Platform Purpose: Marketplace to connect homemade artists with consumers across India
Branding: ArtSaathi - emphasizing support for homemade artists and authentic craftsmanship

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for development and production builds
- **Styling**: Tailwind CSS with custom art-focused design system
- **UI Components**: Radix UI primitives with shadcn/ui components
- **State Management**: Zustand for client-side state (cart management)
- **Data Fetching**: TanStack Query (React Query) for server state management
- **Routing**: Wouter for lightweight client-side routing

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon serverless PostgreSQL
- **Session Management**: Express sessions with PostgreSQL session store
- **API Design**: RESTful endpoints with JSON responses
- **File Serving**: Static asset serving for images

### Design System
- **Typography**: Multiple font families (Playfair Display, Inter, Crimson Text)
- **Color Palette**: Art-focused with golden accents, charcoal, and neutral tones
- **Component Library**: Fully customized shadcn/ui components
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints

## Key Components

### Database Schema
- **Paintings**: Core entity with title, description, price, images, and metadata
- **Cart Items**: Shopping cart with session-based persistence
- **Contact Messages**: Customer inquiry system
- **Features**: Support for featured paintings, sale prices, and availability tracking

### API Endpoints
- `GET /api/paintings` - List all available paintings
- `GET /api/paintings/featured` - Get featured paintings
- `GET /api/paintings/:id` - Get painting details
- `GET /api/paintings/search/:query` - Search paintings by title
- `GET /api/paintings/filter` - Filter by category and price range
- `POST /api/cart` - Add item to cart
- `GET /api/cart` - Get cart items
- `DELETE /api/cart/:id` - Remove cart item
- `POST /api/contact` - Submit contact form

### Frontend Pages
- **Home**: Hero section, featured collection, about section, contact form
- **Gallery**: Full painting catalog with search and filtering
- **Painting Detail**: Individual painting view with purchase options
- **Cart Modal**: Shopping cart overlay with item management

### Core Features
- **Shopping Cart**: Session-based cart with real-time updates
- **Search & Filter**: Text search and category/price filtering
- **Responsive Design**: Mobile-optimized interface
- **Image Gallery**: High-quality painting display
- **Contact System**: Customer inquiry form
- **Sale Pricing**: Support for discounted prices

## Data Flow

1. **Page Load**: React Query fetches initial data from Express API
2. **User Interaction**: Actions trigger API calls or local state updates
3. **Cart Management**: Zustand manages cart state with automatic persistence
4. **Database Operations**: Drizzle ORM handles PostgreSQL interactions
5. **Real-time Updates**: React Query automatically refetches and updates UI

## External Dependencies

### Frontend Libraries
- **UI Framework**: React, Wouter, TanStack Query
- **Styling**: Tailwind CSS, Radix UI, class-variance-authority
- **Forms**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Date Handling**: date-fns

### Backend Libraries
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Session**: express-session, connect-pg-simple
- **Development**: tsx for TypeScript execution
- **Build**: esbuild for server bundling

### Development Tools
- **Build System**: Vite with React plugin
- **TypeScript**: Full type safety across stack
- **Database Migrations**: Drizzle Kit for schema management
- **Replit Integration**: Development environment optimizations

## Deployment Strategy

### Build Process
1. **Frontend**: Vite builds React app to `dist/public`
2. **Backend**: esbuild bundles Express server to `dist/index.js`
3. **Assets**: Static files served from `attached_assets`

### Environment Setup
- **Development**: `npm run dev` - runs tsx with Express and Vite middleware
- **Production**: `npm run build && npm start` - builds and serves static files
- **Database**: Automatic migrations with `npm run db:push`

### Configuration
- **Database**: PostgreSQL connection via `DATABASE_URL` environment variable
- **Session**: Secure session management with PostgreSQL storage
- **Static Assets**: Express static middleware for image serving
- **CORS**: Configured for frontend-backend communication

The application follows modern web development practices with a focus on performance, user experience, and maintainability. The architecture supports easy scaling and feature additions while maintaining clean separation of concerns.