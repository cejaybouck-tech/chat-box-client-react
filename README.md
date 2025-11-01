# Chat Box React Client

A minimal, real‑time chat client built with React + Vite + TypeScript and Tailwind CSS. It connects to the companion Go WebSocket server:

- Chat Box Go Server: https://github.com/cejaybouck-tech/chat-box-go-server

This client handles sign‑in, live messaging, and presence (who's online) over a WebSocket connection.

## Features

- Real‑time chat via WebSockets
- Sign‑in with username/password (account auto‑created on first sign‑in)
- Online users list with join/leave events
- Smooth UX: loading states, keyboard submit (Enter), and autoscroll

## Tech Stack

- React 19, TypeScript, Vite 7
- Tailwind CSS 4, Radix UI (Dialog, Tabs)

## Prerequisites

- Node.js 18+ and npm (or pnpm/yarn)
- Go 1.21+ for the server (run separately)

## Getting Started

1) Start the Go server

- Clone and run the server (see its README for details):
  - Repo: https://github.com/cejaybouck-tech/chat-box-go-server
  - From the server repo root:
    ```bash
    go run .
    ```
- Optional server env (set in the server repo):
  - `APP_ORIGIN` should match your client origin (e.g., `http://localhost:5173` for Vite dev)
  - `PORT` defaults to `8080`

2) Configure this client

Create a `.env` file in this project root to point at the server WebSocket endpoint:

```
VITE_ServerURL=ws://localhost:8080/chat
```

Notes:
- If you deploy behind HTTPS, use `wss://` and ensure the path matches the server (default `/chat`).
- The client falls back to `ws://localhost:8080/chat` if `VITE_ServerURL` is not set.

3) Run the client (Vite)

```bash
npm install
npm run dev
```

- Vite serves at `http://localhost:5173` by default.
- Ensure the server’s `APP_ORIGIN` allows this origin.

## Build and Preview

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to any static host. Set `VITE_ServerURL` at build time to your production WebSocket URL, e.g. `wss://your-domain/chat`.

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — type‑check and build for production
- `npm run preview` — preview the production build
- `npm run lint` — run ESLint

## Project Structure (high level)

- `src/components/chat-box/`
  - `ChatContextProvider.tsx` — app state: connection, auth, chat log, users
  - `connections/ConnectionHandler.tsx` — opens WebSocket to `VITE_ServerURL`
  - `connections/SignIn.tsx` — username/password dialog
  - `messages/MessagesContainer.tsx` — message list and input
- `vite.config.ts` — aliases (`@` -> `src`), plugins

## Troubleshooting

- Cannot connect / "Failed to connect to server":
  - Verify the server is running and reachable at `VITE_ServerURL`
  - Check firewall/port and that the path `/chat` matches the server
- CORS / origin errors:
  - Ensure server `APP_ORIGIN` matches the client origin (e.g., `http://localhost:5173`)
- Mixed content in production:
  - Use `wss://` when the site is served over HTTPS

## License

This project is provided as‑is for learning and integration with the Chat Box Go Server.
