# Reya Portfolio UI

A real-world portfolio management interface for Reya DEX, built with React, TypeScript, and Vanilla Extract with real-time update support.

*Another resource with real-time data usage with TradingView charts: https://trading-view-example-test.vercel.app/

## 🚀 Features

- **Real-time Position Tracking**: View all wallet positions across different accounts with automatic updates.
- **Live Price Updates**: WebSocket integration for real-time mark prices (updated instantly).
- **Hybrid Data Fetching**: WebSocket for initial snapshot + polling for position updates (every 10 seconds).
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
│   ├── Portfolio/       # Portfolio-specific components (Table, Row, Input, Positions Pie chart)
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

## 🔌 Data Integration

### WebSocket Channels
- **`/v2/prices`**: Real-time price updates (Mark Price) - receives `channel_data` updates continuously
- **`/v2/wallet/{address}/positions`**: Initial position snapshot on subscription

### REST API
- **`/v2/wallet/{address}/positions`**: Polling every 30 seconds for position updates (Market and Size values)
- **`/marketDefinitions`**: Market metadata (loaded once on startup)

### Why Hybrid Approach?
The WebSocket positions channel only sends an initial snapshot on subscription but does not send real-time `channel_data` updates. Therefore, we use:
1. **WebSocket** - Fast initial loading
2. **Polling** - Regular updates for changing position sizes

## 🎨 Technology Stack

- **Frontend**: React 18, Vite
- **State**: Zustand
- **Styling**: Vanilla Extract (Type-safe CSS)
- **API**: Axios, native WebSocket

---
**Note**: Stable internet connection is required for WebSocket and API functionality. Default test wallet: `0xB4B77d6180cc14472A9a7BDFF01cc2459368D413`.
