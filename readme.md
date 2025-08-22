# Overview

This is a React-based client management application with advanced table sorting functionality. The application displays client information in a sortable table format with drag-and-drop multi-sort capabilities. Built with modern web technologies, it features a sophisticated sort panel that allows users to define multiple sorting criteria with custom priority ordering.

The application centers around a client table that displays client information including ID, name, type (Individual/Company), email, status, and metadata. The standout feature is the multi-sort system where users can apply multiple sorting criteria simultaneously and adjust their priority through an intuitive drag-and-drop interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The application uses a modern React architecture with TypeScript and follows a component-based design pattern. The frontend is structured around several key architectural decisions:

**Component Organization**: Components are organized into UI components (using shadcn/ui), feature-specific components (client table, sort panel), and page-level components. This separation provides clear boundaries between reusable UI elements and business logic.

**State Management**: The application uses React's built-in state management with custom hooks for complex state logic. The `useSortConfig` hook manages sort configuration persistence and provides a clean interface for sort operations.

**Styling System**: Tailwind CSS provides utility-first styling with shadcn/ui components for consistent design. CSS variables enable theme customization and the design system uses a neutral color palette as the base.

**Routing**: Wouter provides lightweight client-side routing, chosen for its minimal footprint compared to React Router while maintaining essential routing functionality.

## Data Management

**Mock Data**: Currently uses static mock data for clients, allowing for development and testing without backend dependencies. The mock data structure mirrors the expected database schema.

**Multi-Sort Logic**: Custom sorting algorithm handles multiple sort criteria with proper precedence. The sort function iterates through criteria in order, applying each sort rule sequentially to maintain stable sorting behavior.

**Local Storage Persistence**: Sort configurations are persisted to localStorage, allowing users to maintain their preferred sorting settings across browser sessions.

## Drag and Drop System

**DND Kit Integration**: Uses @dnd-kit for drag-and-drop functionality, providing accessibility features and smooth animations. The library was chosen for its React-first design and comprehensive accessibility support.

**Sort Priority Management**: Drag-and-drop interface allows users to reorder sort criteria, with visual feedback during drag operations. The system maintains sort criterion state during reordering operations.

## Backend Architecture

**Express Server**: Node.js Express server provides API endpoints and serves the React application. The server is configured for development with Vite integration and production builds.

**Database Layer**: Drizzle ORM with PostgreSQL provides type-safe database operations. The schema defines users and clients tables with proper relationships and constraints.

**Storage Interface**: Abstracted storage interface allows for different storage implementations (currently in-memory for development, with database support configured).

## Build and Development

**Vite Build System**: Vite provides fast development builds and optimized production bundling. The configuration includes React support, path aliases, and development tools integration.

**TypeScript Configuration**: Strict TypeScript settings ensure type safety across the application. Path mapping provides clean imports and the configuration supports both client and server code.


# External Dependencies

## UI and Styling

- **@radix-ui/react-***: Comprehensive suite of unstyled, accessible UI primitives including dialogs, dropdowns, tooltips, and form controls
- **shadcn/ui**: Pre-built components using Radix UI primitives with Tailwind CSS styling
- **Tailwind CSS**: Utility-first CSS framework for styling with PostCSS processing
- **class-variance-authority**: Type-safe variant API for component styling
- **clsx**: Utility for constructing className strings conditionally

## State Management and Data Fetching

- **@tanstack/react-query**: Powerful data synchronization for React applications (configured but not actively used with current mock data)
- **react-hook-form**: Performant forms library with easy validation
- **@hookform/resolvers**: Validation resolvers for react-hook-form
- **zod**: TypeScript-first schema validation (via Drizzle integration)

## Drag and Drop

- **@dnd-kit/core**: Modern drag and drop toolkit for React
- **@dnd-kit/sortable**: Sortable preset for @dnd-kit
- **@dnd-kit/utilities**: Utility functions for @dnd-kit

## Backend Infrastructure

- **express**: Fast, unopinionated web framework for Node.js
- **drizzle-orm**: Type-safe and performant TypeScript ORM
- **drizzle-kit**: CLI tools for Drizzle ORM migration and schema management
- **@neondatabase/serverless**: Neon database serverless driver for PostgreSQL

## Development and Build Tools

- **vite**: Next generation frontend build tool
- **@vitejs/plugin-react**: Official React plugin for Vite
- **typescript**: Static type checker for JavaScript
- **tsx**: TypeScript execution environment for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

## Routing and Navigation

- **router**: Minimalist routing library for React applications, chosen for its small bundle size and simplicity

## Utilities

- **date-fns**: Modern JavaScript date utility library
- **nanoid**: Tiny, secure, URL-friendly unique string ID generator
- **cmdk**: Fast, composable, unstyled command menu for React