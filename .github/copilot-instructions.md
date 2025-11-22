# GitHub Copilot Instructions for Human-Learning

## Project Overview

This is a Human Learning application built with modern web technologies. It's a React-based web application with Electron support for desktop functionality.

## Technology Stack

- **Frontend Framework**: React 18.3+ with TypeScript
- **Build Tool**: Vite 5.4+
- **UI Framework**: shadcn/ui components with Radix UI primitives
- **Styling**: Tailwind CSS 3.4+ with tailwindcss-animate
- **State Management**: TanStack Query (React Query) for server state
- **Form Handling**: React Hook Form with Zod validation
- **Routing**: React Router DOM
- **Desktop Support**: Electron 39+
- **AI Integration**: Google Generative AI
- **Package Manager**: npm (with bun.lockb also present)

## Project Structure

```
/src
  /components     - Reusable React components
  /hooks          - Custom React hooks
  /integrations   - Third-party integrations
  /lib            - Utility functions and libraries
  /pages          - Page components (Index.tsx, NotFound.tsx)
  App.tsx         - Main application component
  main.tsx        - Application entry point

/electron         - Electron desktop app configuration
/public           - Static assets
/supabase         - Supabase configuration (if applicable)
```

## Development Workflow

### Installing Dependencies
```bash
npm install
```

### Running the Development Server
```bash
npm run dev
```
This starts the Vite development server on `localhost:8080`.

### Building the Application
```bash
npm run build        # Production build
npm run build:dev    # Development build
```
The build output goes to the `dist` directory.

### Running Electron App
```bash
npm run electron:dev    # Runs both Vite dev server and Electron
npm run electron        # Runs Electron only (requires dev server running)
npm run electron:build  # Builds Electron application
```

### Linting
```bash
npm run lint
```
Uses ESLint with TypeScript support. Configuration in `eslint.config.js`.

### Preview Build
```bash
npm run preview
```

## Code Style and Conventions

### TypeScript Configuration
- **Path alias**: `@/` maps to `./src/`
- Relaxed TypeScript settings:
  - `noImplicitAny: false`
  - `strictNullChecks: false`
  - `noUnusedLocals: false`
  - `noUnusedParameters: false`

### ESLint Rules
- React Hooks rules enforced
- React Refresh only-export-components: warn
- `@typescript-eslint/no-unused-vars`: off (disabled)
- Ignores: `dist` directory

### File Organization
- React components use `.tsx` extension
- Configuration files use `.ts` or `.js` as appropriate
- Components should be organized in the `/src/components` directory
- Pages go in `/src/pages`
- Custom hooks in `/src/hooks`

### UI Components
- Use shadcn/ui components from `/src/components/ui` (configured via `components.json`)
- Tailwind CSS for styling with custom configuration in `tailwind.config.ts`
- Follow the existing component patterns using Radix UI primitives

### Styling
- Tailwind CSS utility classes
- PostCSS for processing (configured in `postcss.config.js`)
- Support for CSS animations via `tailwindcss-animate`
- Typography support via `@tailwindcss/typography`

## Testing

Currently, there is no test infrastructure set up in this project. When adding tests:
- Consider using Vitest (aligns with Vite)
- Follow React Testing Library patterns for component tests
- Add test scripts to package.json

## Important Notes

### Path Aliases
Always use the `@/` alias for imports from the `src` directory:
```typescript
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
```

### Environment Variables
- `.env.example` provides template for environment variables
- Actual configuration in `.env` (gitignored)

### Build Artifacts
The following are gitignored and should not be committed:
- `dist/` - Build output
- `node_modules/` - Dependencies
- `.env` - Environment variables

### Desktop Support
This project supports both web and desktop (Electron) deployment:
- Web builds via Vite
- Desktop builds via Electron Builder
- Ensure changes work in both contexts when applicable

## Common Tasks

### Adding a New Page
1. Create component in `/src/pages/YourPage.tsx`
2. Add route in the router configuration (check `App.tsx` or routing setup)
3. Follow existing page patterns (see `Index.tsx`, `NotFound.tsx`)

### Adding a New Component
1. Create component in `/src/components/YourComponent.tsx`
2. Use TypeScript for type safety
3. Follow existing component patterns
4. Use shadcn/ui components where applicable

### Adding a New UI Component from shadcn/ui
Use the configured components system (components.json is present).

### Working with Forms
- Use React Hook Form with Zod schema validation
- Follow existing form patterns in the codebase

### Integrating APIs
- Use TanStack Query for data fetching and caching
- Place integration code in `/src/integrations`

## Best Practices for Copilot Tasks

### Ideal Tasks
- Fixing bugs in existing components
- Adding new UI components following shadcn/ui patterns
- Implementing new pages with routing
- Improving TypeScript types
- Updating documentation
- Refactoring code for better maintainability
- Adding form validation with Zod
- Implementing responsive designs with Tailwind

### Tasks to Avoid
- Large architectural changes
- Database schema modifications
- Security-critical authentication logic
- Complex state management refactoring without clear requirements
- Changes that affect both web and Electron builds without testing both

## Validation Steps

Before submitting changes:
1. Run `npm run lint` to check for linting errors
2. Run `npm run build` to ensure the project builds successfully
3. Test the development server with `npm run dev`
4. Verify the UI works as expected in the browser
5. If changes affect Electron, test with `npm run electron:dev`
6. Check that TypeScript has no errors
7. Ensure no console errors in the browser

## Additional Context

- This project is managed via Lovable.dev
- The project uses React Router for navigation
- Dark mode support via next-themes
- Toast notifications via Sonner
- Icon library: Lucide React
