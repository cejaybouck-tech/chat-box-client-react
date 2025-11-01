# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

Project overview
- React + TypeScript + Vite app styled with Tailwind CSS v4 and shadcn-style UI primitives (Radix + lucide-react).
- Module alias: "@" → "src" (see vite.config.ts); prefer aliased imports within the app.

Common commands
- Install deps: npm install
- Start dev server (HMR): npm run dev
- Build (typecheck + bundle): npm run build
- Preview production build: npm run preview
- Lint (ESLint flat config): npm run lint
- Tests: no test runner/scripts are defined in package.json

Environment configuration
- WebSocket server URL is read from Vite env: import.meta.env.VITE_ServerURL
  - If unset, the client defaults to ws://localhost:8080/chat
  - To customize, define VITE_ServerURL in a Vite-supported env file (e.g. .env.local) or export it in your shell before running the app.

High-level architecture
- Entry: src/main.tsx renders <App /> into #root; global styles in src/index.css (imports Tailwind).
- App shell: src/App.tsx lays out a Card wrapper and mounts ChatContextProvider around ChatBoxContainer.
- State management: src/components/chat-box/ChatContextProvider.tsx
  - Centralized chat state via React Context + useReducer
  - State shape: isConnected, isLoading, error, webSocket, credentials, chatLog, chattersOnline
  - Actions include connection toggles, socket init/reset, credentials updates, chat log mutations, and error handling
- Chat UI composition: src/components/chat-box/ChatBoxContainer.tsx
  - Stacks two major areas: MessagesContainer and ConnectionsContainer
- Connection flow: src/components/chat-box/connections
  - SignIn collects username/password in a Radix Dialog and dispatches credential updates
  - ConnectionsContainer gates between SignIn and ConnectionHandler based on isConnected
  - ConnectionHandler establishes a WebSocket to VITE_ServerURL (or default), sends an authenticate message on open, and reacts to server messages by appending to chatLog; it updates isLoading/isConnected and error state on close/error
- Messaging flow: src/components/chat-box/messages/MessagesContainer.tsx
  - Renders chatLog and a textarea send box
  - When connected and not loading, sends outbound messages via state.webSocket.send(message)
- UI primitives: src/components/ui/*
  - Card, Dialog, Tabs, Spinner built on shadcn/tailwind patterns and Radix primitives
- Utilities: src/lib/utils.ts provides cn() for className composition (clsx + tailwind-merge)

Tooling
- Vite config (vite.config.ts):
  - Plugins: @vitejs/plugin-react, @tailwindcss/vite
  - Path alias: '@' to './src'
- TypeScript configs: project references (tsconfig.json → tsconfig.app.json, tsconfig.node.json); strict settings for app code
- ESLint flat config (eslint.config.js): @eslint/js, typescript-eslint recommended, react-hooks, react-refresh (Vite)

Notes
- Type checking runs as part of the build (tsc -b). If you need on-demand type checks, you can run: npx tsc -b
- Ensure any environment variables used by the client are prefixed with VITE_ so Vite exposes them at runtime.
