# 📊 Reya Portfolio UI - Detailed Project Documentation

## 🛠️ Technology Stack

### Core Technologies

#### **Frontend Framework**
- **React 18.2.0** - Library for building user interfaces
  - Used with `react-dom` for rendering
  - Strict Mode for detecting potential issues
  - Functional Components with Hooks

#### **Build Tool**
- **Vite 5.1.0** - Fast build tool
  - Instant Hot Module Replacement (HMR)
  - Optimized production builds
  - Native TypeScript support
  - Configured on port 3000

#### **Programming Language**
- **TypeScript 5.5.3** - Strict typing
  - Strict mode enabled
  - ES2020 target
  - Full type safety throughout the project

#### **Styling**
- **Vanilla Extract 1.14.1** - Type-safe CSS-in-TypeScript
  - Zero runtime overhead
  - Automatic unique class generation
  - Theme support via CSS variables
  - Vite plugin for integration

#### **State Management**
- **Zustand 4.5.0** - Lightweight state management library
  - Minimal boilerplate
  - Middleware support (persist)
  - Selectors for optimized re-renders

#### **HTTP Client**
- **Axios 1.6.7** - Promise-based HTTP client
  - Timeout configuration (10 seconds)
  - Automatic JSON handling
  - Error interceptors

#### **Data Visualization**
- **Recharts 3.7.0** - Charting library
  - Responsive charts
  - Interactive pie charts
  - Custom display components

#### **SVG Management**
- **vite-plugin-svgr 4.2.0** - Import SVG as React components
  - SVG optimization
  - TypeScript support

#### **Linting & Code Quality**
- **ESLint 8.57.1** - Static code analysis
  - TypeScript ESLint parser
  - React hooks rules
  - React refresh plugin

---

## 📁 Project Structure

```
Reya-is-cool/
│
├── public/                          # Static files
│   └── FAV-ICO.svg                 # Favicon
│
├── src/                            # Source code
│   ├── components/                 # React components
│   │   ├── Footer/                # Footer with time and links
│   │   │   ├── Footer.tsx
│   │   │   └── Footer.css.ts
│   │   │
│   │   ├── Header/                # Header with logo and wallet input
│   │   │   ├── Header.tsx
│   │   │   └── Header.css.ts
│   │   │
│   │   ├── MobileBlocking/        # Mobile device blocking
│   │   │   ├── MobileBlocking.tsx
│   │   │   └── MobileBlocking.css.ts
│   │   │
│   │   ├── Portfolio/             # Portfolio components
│   │   │   ├── ChartDataView/    # Pie chart visualization
│   │   │   │   ├── ChartDataView.tsx
│   │   │   │   └── ChartDataView.css.ts
│   │   │   │
│   │   │   ├── PortfolioPage/    # Main portfolio page
│   │   │   │   ├── PortfolioPage.tsx
│   │   │   │   └── PortfolioPage.css.ts
│   │   │   │
│   │   │   ├── PositionRow/      # Position table row
│   │   │   │   ├── PositionRow.tsx
│   │   │   │   ├── PositionRow.css.ts
│   │   │   │   └── types.ts
│   │   │   │
│   │   │   └── PositionsTable/   # Positions table
│   │   │       ├── PositionsTable.tsx
│   │   │       ├── PositionsTable.css.ts
│   │   │       ├── PositionsTableContent.tsx
│   │   │       ├── TableHeader.tsx
│   │   │       ├── TableStateMessage.tsx
│   │   │       ├── types.ts
│   │   │       └── utils.ts
│   │   │
│   │   └── Sidebar/               # Navigation sidebar
│   │       ├── Sidebar.tsx
│   │       └── Sidebar.css.ts
│   │
│   ├── hooks/                     # Custom React Hooks
│   │   ├── types.ts              # Hook types
│   │   ├── useIsMobile.ts        # Mobile device detection
│   │   ├── useMarkets.ts         # Markets loading
│   │   ├── usePositionCalculations.ts  # Position calculations
│   │   ├── usePositionsSort.ts   # Position sorting
│   │   ├── usePriceUpdates.ts    # WebSocket price updates
│   │   └── useWalletPositions.ts # Hybrid position loading
│   │
│   ├── icons/                     # SVG icons as React components
│   │   ├── ExternalLink.tsx
│   │   ├── Logo.tsx
│   │   ├── OverviewIcon.tsx
│   │   ├── SortIcon.tsx
│   │   └── WarnIcon.tsx
│   │
│   ├── services/                  # External services
│   │   ├── api/                  # REST API client
│   │   │   ├── constants.ts      # API constants (URLs, timeouts)
│   │   │   ├── reyaApi.ts        # Axios client
│   │   │   └── types.ts          # API data types
│   │   │
│   │   └── websocket/            # WebSocket client
│   │       ├── connection.ts     # Connection management
│   │       ├── heartbeat.ts      # Connection monitoring
│   │       ├── messageHandler.ts # Message handling
│   │       ├── reyaWebSocket.ts  # Public API
│   │       ├── state.ts          # Internal state
│   │       ├── subscriptions.ts  # Subscription management
│   │       ├── types.ts          # WebSocket types
│   │       └── utils.ts          # Helper functions
│   │
│   ├── store/                     # Zustand stores
│   │   ├── types.ts              # Store types
│   │   ├── marketsStore.ts       # Markets state
│   │   ├── positionsStore.ts     # Positions state
│   │   ├── pricesStore.ts        # Prices state (with throttling)
│   │   └── walletStore.ts        # Wallet state (with persist)
│   │
│   ├── styles/                    # Global styles
│   │   ├── global.css.ts         # Global CSS rules
│   │   └── theme.css.ts          # Design system (colors, fonts)
│   │
│   ├── utils/                     # Utilities
│   │   ├── calculations.ts       # Financial calculations
│   │   └── formatters.ts         # Data formatting
│   │
│   ├── App.tsx                    # Main component
│   ├── App.css.ts                # App styles
│   ├── main.tsx                  # Entry point
│   └── vite-env.d.ts             # Vite type definitions
│
├── index.html                     # HTML template
├── vite.config.ts                # Vite configuration
├── tsconfig.json                 # TypeScript configuration
├── tsconfig.node.json            # TypeScript for Node.js
├── eslint.config.js              # ESLint configuration
├── package.json                  # Dependencies and scripts
└── README.md                     # Documentation
```

---

## 🔄 Data Flow: From Startup to Display

**Key hooks:**
1. **`useWalletPositions()`** - Hybrid position loading
2. **`usePriceUpdates()`** - Real-time price updates

---

### **Position Loading: useWalletPositions Hook**

**Hybrid Approach: WebSocket + Polling**

**Why hybrid approach?**

| Method | Advantages | Disadvantages |
|--------|-----------|---------------|
| **WebSocket** | ✅ Fast initial load<br>✅ Snapshot on subscription | ❌ Does NOT send `channel_data` updates |
| **Polling** | ✅ Guaranteed updates<br>✅ Reliability | ❌ 30-second delay<br>❌ Additional requests |

**Result:** Fast start + regular updates

**Logic:**
1. **WebSocket connection** to `/v2/wallet/{address}/positions`
2. **Receive initial snapshot** on subscription
3. **Polling every 30 seconds** for updates via REST API
4. **Race condition protection** via `isMounted` flag

---

**Example:**
```
Old price: $95,234.50
New price: $95,235.00  → Change: 0.0005% → DO NOT update
New price: $95,244.50  → Change: 0.0105% → Update!
```

---

### 1️⃣2️⃣ **Sorting: usePositionsSort Hook**

**Sortable fields:**
- `symbol` - Market name (alphabetical)
- `size` - Position size (numerical) 

- NOTE (if 1.98e-16 we see 0 because of formatting 0.000000000000000198
  )


- `value` - Position value (numerical)
- `price` - Mark Price (numerical)

**Click behavior:**
```
Click 1: symbol ASC
Click 2: symbol DESC
Click 3: symbol ASC (toggle)
```

---

### 1️⃣3️⃣ **Position Row: PositionRow**

**Optimization:**
- `memo()` - Prevents re-render if props haven't changed
- Important for tables with many rows


---

## 🌐 WebSocket Architecture

### Modular Structure

```
websocket/
├── reyaWebSocket.ts      # Public API
├── connection.ts         # Connection management
├── subscriptions.ts      # Subscription management
├── messageHandler.ts     # Message handling
├── heartbeat.ts          # Connection monitoring
├── state.ts              # Internal state
├── utils.ts              # Helper functions
└── types.ts              # TypeScript types
```

### Connection Management

**Reconnection Logic:**

**Parameters:**
- `MAX_RECONNECT_ATTEMPTS`: 5
- `RECONNECT_DELAY`: 3000ms (3 seconds)
- `CONNECTION_TIMEOUT`: 60000ms (60 seconds)

### Heartbeat Monitoring

**How it works:**
1. Server sends `ping` messages
2. Client responds with `pong`
3. Updates `lastMessageTime`


### Subscription Management

**Channels:**

1. **`/v2/prices`** - Prices for all markets
   - Initial: Array of all prices
   - Updates: Individual prices on change

2. **`/v2/wallet/{address}/positions`** - Wallet positions
   - Initial: Array of all positions
   - Updates: ❌ NOT sent (hence polling)

---

## 🎨 Design System (Vanilla Extract)

### Theme Configuration



**Vanilla Extract Advantages:**

1. ✅ **Type Safety** - Autocomplete for CSS properties
2. ✅ **Zero Runtime** - CSS generated at build time
3. ✅ **Scoped Styles** - Unique classes, no conflicts
4. ✅ **Theme Support** - Centralized variables
5. ✅ **Tree Shaking** - Unused styles are removed
6. ✅ **Co-location** - Styles next to components

---

## 📦 State Management (Zustand)

### Why Zustand?

| Zustand | Redux | Context API |
|---------|-------|-------------|
| ✅ Minimal boilerplate | ❌ Lots of code | ✅ Built into React |
| ✅ No Provider needed | ❌ Requires Provider | ❌ Requires Provider |
| ✅ Selectors out of the box | ⚠️ Requires reselect | ❌ No selectors |
| ✅ Middleware support | ✅ Middleware | ❌ No middleware |
| ✅ DevTools | ✅ DevTools | ❌ No DevTools |

---

## 🚀 Performance Optimizations

### 1. **React.memo for PositionRow**

```typescript
export const PositionRow: FC<PositionRowProps> = memo(({position}) => {
  // ...
});
```

**Result:** Rows don't re-render if their data hasn't changed

### 2. **useMemo for Calculations**

```typescript
const sortedPositions = useMemo(() => {
  return sortPositions(positions, sortField, sortDirection);
}, [positions, sortField, sortDirection]);
```

**Result:** Sorting only executes when dependencies change

### 3. **Smart Throttling for Prices**

```typescript
if (!oldPrice || isPriceChangeSignificant(oldMarkPrice, newMarkPrice)) {
  updatedPrices[price.symbol] = price;
  hasChanges = true;
}
```

**Result:** Updates only when change > 0.01%

### 4. **Zustand Selectors**

```typescript
// ❌ Bad - subscribes to entire store
const store = useWalletStore();

// ✅ Good - subscribes only to walletAddress
const walletAddress = useWalletStore.useWalletAddress();
```

**Result:** Component re-renders only when the needed field changes

### 5. **WebSocket Connection Pooling**

```typescript
if (isConnecting && connectionPromise) {
  return connectionPromise;
}
```

**Result:** Multiple `connect()` calls use the same connection

### 6. **Race Condition Protection**

```typescript
useEffect(() => {
  let isMounted = true;

  fetchData().then(data => {
    if (isMounted) {
      setData(data);
    }
  });

  return () => {
    isMounted = false;
  };
}, []);
```

**Result:** Prevents state updates after unmount

---


---

## 🎯 Key Decisions and Rationale

### 1. **Why Hybrid Approach (WebSocket + Polling)?**

**Problem:** WebSocket channel `/v2/wallet/{address}/positions` only sends initial snapshot, but does NOT send `channel_data` updates.

**Solution:**
- WebSocket for fast initial load
- Polling every 30 seconds for updates

**Alternatives:**
- ❌ WebSocket only - Data becomes stale
- ❌ Polling only - Slow initial load
- ✅ Hybrid - Best of both worlds

### 2. **Why Smart Throttling for Prices?**

**Problem:** Prices update very frequently (every 100-500ms), causing:
- Constant re-renders
- UI "flickers"
- High CPU load

**Solution:** Update only if change > 0.01%

**Result:**
- Smooth UI
- Optimal performance
- Still accurate enough for users

### 3. **Why Vanilla Extract instead of Styled Components?**

| Vanilla Extract | Styled Components |
|----------------|-------------------|
| ✅ Zero runtime | ❌ Runtime overhead |
| ✅ Type-safe | ⚠️ Partial typing |
| ✅ Static generation | ❌ Dynamic generation |
| ✅ Better performance | ❌ Slower |
| ✅ Tree shaking | ⚠️ Limited tree shaking |

### 4. **Why Zustand instead of Redux?**

**Redux:**
```typescript
// Action types
const SET_WALLET = 'SET_WALLET';

// Action creators
const setWallet = (address) => ({
  type: SET_WALLET,
  payload: address
});

// Reducer
const walletReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_WALLET:
      return { ...state, address: action.payload };
    default:
      return state;
  }
};

// Store
const store = createStore(walletReducer);

// Provider
<Provider store={store}>
  <App />
</Provider>

// Usage
const dispatch = useDispatch();
const address = useSelector(state => state.address);
dispatch(setWallet('0x...'));
```

**Zustand:**
```typescript
// Store
const useWalletStore = create((set) => ({
  address: null,
  setAddress: (address) => set({ address })
}));

// Usage
const address = useWalletStore(state => state.address);
const setAddress = useWalletStore(state => state.setAddress);
setAddress('0x...');
```

**Result:** 10x less code, same functionality

### 5. **Why Vite instead of Create React App?**

| Vite | CRA |
|------|-----|
| ✅ Instant HMR | ❌ Slow HMR |
| ✅ Fast builds | ❌ Slow builds |
| ✅ Native ESM | ❌ Webpack bundling |
| ✅ Active support | ⚠️ Deprecated |
| ✅ Plugins | ⚠️ Limited configuration |

---

## 🧪 Testing and Code Quality

### ESLint Configuration

**Rules:**
- `react-hooks/rules-of-hooks` - Checks hooks rules
- `react-hooks/exhaustive-deps` - Checks useEffect dependencies
- `react-refresh/only-export-components` - HMR optimization

### TypeScript Configuration

**Strict Mode:** All checks enabled for maximum type safety

---

## 📝 NPM Scripts

```json
{
  "dev": "vite",                          // Start dev server
  "build": "vite build",                  // Production build
  "build:check": "tsc && vite build",     // Type check + build
  "check": "tsc --noEmit && npm run lint", // Type check + lint
  "preview": "vite preview",              // Preview production build
  "lint": "eslint . --report-unused-disable-directives --max-warnings 0"
}
```

**Workflow:**
1. Development: `npm run dev`
2. Before commit: `npm run check`
3. Production: `npm run build:check`
4. Preview: `npm run preview`

---

## 🌟 Project Features

### 1. **Mobile Blocking**

**Why:** Complex UI with tables and charts works better on desktop

### 2. **Footer with UTC Time**

**Why:** Traders work with UTC time for global synchronization

### 3. **Responsive Chart**

**Why:** Adapts to different screen sizes for better UX

### 4. **Error Boundaries**

**Why:** Clear messages for each state (loading, error, empty)

---

## 🔐 Security and Reliability

### 1. **Wallet Address Validation**
```typescript
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}
```

### 2. **Race Condition Protection**
```typescript
let isMounted = true;

// ... async operations

if (isMounted) {
  setState(data);
}

return () => {
  isMounted = false;
};
```

### 3. **Error Handling**
```typescript
try {
  const data = await api.fetch();
  setData(data);
} catch (error) {
  setError(error instanceof Error ? error.message : 'Unknown error');
  console.error('Failed to fetch:', error);
}
```

### 4. **WebSocket Reconnection**

Automatic reconnection with max 5 attempts and 3-second delay

### 5. **API Timeout**

10-second timeout for all HTTP requests

---

## 📈 Improvement Opportunities

### 1. **Testing**
- Unit tests for utilities (Jest)
- Integration tests for hooks (React Testing Library)
- E2E tests (Playwright/Cypress)

### 2. **Monitoring**
- Error tracking (Sentry)
- Analytics (Google Analytics)
- Performance monitoring (Web Vitals)

### 3. **Features**
- Transaction history
- Notification settings
- Data export (CSV/PDF)
- Dark/light theme
- Internationalization

### 4. **Optimization**
- Service Worker for offline support
- Code splitting to reduce bundle size
- Image optimization
- Lazy loading for components

### 5. **Security**
- Content Security Policy
- HTTPS only
- API rate limiting
- Input sanitization

---

## 🎓 Conclusion

This project demonstrates:

✅ **Modern Frontend Stack** - React 18, TypeScript, Vite, Vanilla Extract
✅ **Real-time Architecture** - WebSocket + REST API hybrid
✅ **Performance Optimization** - Smart throttling, memoization, selectors
✅ **Type Safety** - Full typing throughout the project
✅ **Clean Code** - Modular structure, separation of concerns
✅ **UX/UI** - Responsive design, error states, loading states
✅ **Reliability** - Error handling, reconnection logic, race condition protection

**Technologies chosen for:**
- **Vite** - Development speed
- **TypeScript** - Type safety
- **Zustand** - State management simplicity
- **Vanilla Extract** - Performance + type safety
- **Recharts** - Ready-made visualization components

**Architectural decisions:**
- Hybrid approach for data
- Smart throttling for optimization
- Modular WebSocket architecture
- Selectors for re-render optimization

The project is production-ready and easily scalable for adding new features.

---

**Date:** 2024
**Version:** 1.0.0
**License:** Private
