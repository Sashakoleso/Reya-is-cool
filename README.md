# Reya Portfolio UI

A real-world portfolio management interface for Reya DEX, built with React, TypeScript, and Vanilla Extract with real-time update support.

## 🚀 Features

- **Real-time Position Tracking**: View all wallet positions across different accounts.
- **Live Price Updates**: WebSocket integration for fetching up-to-date mark prices.
- **Position Aggregation**: Automatic grouping of positions by market symbol.
- **Optimized Rendering**: Smart filtering of price updates to prevent excessive re-renders.
- **Sorting**: Ability to sort positions by market, size, value, and price.
- **Type Safety**: Full TypeScript implementation with strict typing.

## 🛠️ Installation

```bash
npm install
```

## 🏃 Running the Project

### Development Mode
```bash
npm run dev
```
The project will be available at `http://localhost:3000` (or another port specified by Vite).

### Production Build
```bash
npm run build
```

### Type Check and Build
```bash
npm run build:check
```

### Type Check and Lint
```bash
npm run check
```

### Linting
```bash
npm run lint
```

### Preview Production Build
```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Footer/          # Footer component
│   ├── Header/          # Header component
    ├── SideBar/         # Sidebar component
│   ├── Portfolio/       # Portfolio-specific components (Table, Row, Input)
├── hooks/               # Custom React hooks (logic separation)
├── services/            # API and WebSocket services
│   ├── api/             # REST API client
│   └── websocket/       # WebSocket client
├── store/               # State management with Zustand
├── styles/              # Global styles and themes (Vanilla Extract)
├── utils/               # Utility functions (calculations, formatters)
```

## 🧮 Implementation Details

### Position Value Calculation
Formula for calculating position value:
`Position Value = |Total Quantity| * Mark Price`

*   **Total Quantity**: Aggregated asset quantity (sum of Long and Short positions).
*   **Mark Price**: Determined dynamically:
    1.  Priority is given to `oraclePrice`.
    2.  If `oraclePrice` is 0 or missing, `poolPrice` is used.

### Smart Throttling (Optimization)
To avoid UI flickering and excessive CPU load, price updates in the store (`pricesStore.ts`) occur only if the price change is **significant** (> 0.01% from the previous value).

### Position Aggregation
Since a single wallet can have multiple positions on the same market across different accounts, the system automatically aggregates them into a single table row, calculating the Net Exposure.

## 🔌 Integration

- **REST API**: Used for initial loading of positions (`/v2/wallet/{address}/positions`) and market definitions.
- **WebSocket**: Used for the `/v2/prices` channel, ensuring prices are kept up to date without page refreshes.

## 🎨 Technology Stack

- **Frontend**: React 18, Vite
- **State**: Zustand
- **Styling**: Vanilla Extract (Type-safe CSS)
- **API**: Axios, native WebSocket

---
**Note**: Stable internet connection is required for WebSocket and API functionality. Default test wallet: `0xB4B77d6180cc14472A9a7BDFF01cc2459368D413`.
