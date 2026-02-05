# 📊 Reya Portfolio UI - Project Summary

## ✅ Implementation Overview

The Reya Portfolio UI project is a high-performance interface for monitoring trading positions in real-time.

## 🎯 Key Features and Logic

### 1. Value Calculation (Position Value)
The calculation logic is located in `src/utils/calculations.ts` and used by the `usePositionCalculations.ts` hook.
*   **Formula**: `Value = Quantity * Mark Price`.
*   **Dynamic Price Selection**: The system automatically selects the most relevant price. Priority: `oraclePrice` -> `poolPrice`. This ensures correct display even if oracle data is temporarily unavailable.

### 2. Performance Optimization (Smart Throttling)
To ensure interface smoothness, update filtering is implemented in `pricesStore.ts`:
*   Price changes less than **0.01%** are ignored.
*   This is critical for WebSocket connections with high message frequency, as it prevents thousands of unnecessary re-renders per second.

### 3. Data Aggregation
The system merges positions from different accounts of the same wallet:
*   Long positions are added.
*   Short positions are subtracted.
*   Total result is displayed for each market.

### 4. WebSocket and Connection Resilience
Implemented in `src/services/websocket/reyaWebSocket.ts`:
*   Automatic reconnection (up to 5 attempts).
*   Heartbeat mechanism (Ping/Pong) to maintain session activity.
*   Automatic resubscription to channels after connection recovery.

## 🚀 Technical Details
*   **Styling**: Vanilla Extract allows for zero-runtime CSS and full style typing.
*   **State**: Zustand is used for lightweight and fast global data management without Redux complexity.
*   **Typing**: Full interface coverage for all API responses and internal structures.

## 🧪 Testing and Verification
The project is configured to work with the Reya production environment by default.
*   **API**: `https://api.reya.xyz/v2`
*   **WS**: `wss://ws.reya.xyz`
*   **Wallet**: `0xB4B77d6180cc14472A9a7BDFF01cc2459368D413` (Test wallet with active positions).
