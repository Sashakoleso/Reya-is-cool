# Performance Issue Summary

## Problem
All `PositionRow` components were re-rendering constantly on every prop change, even when their specific data (`markPrice` and `size`) remained unchanged. Additionally, the entire `tbody` (PositionsTableContent) was flickering on every update.

## Root Causes
1. **No custom comparison in `memo`** - The default shallow comparison was checking the entire `position` object reference, which changed on every render even with identical data.

2. **Store subscription in every row** - Each `PositionRow` was calling `useMarketsStore.useMarkets()`, subscribing to the entire markets array. Any market update triggered re-renders of all rows.

3. **Sorting creating new array references** - The `sortPositions` function always returned a new array, causing all position objects to have new references.

4. **handleSort recreated on every render** - The `handleSort` callback had `sortDirection` as a dependency, causing it to be recreated and triggering `PositionsTableContent` re-renders.

5. **PositionsTableContent re-rendering unnecessarily** - Even when only individual position data changed, the entire table component was re-rendering.

## Solution
1. **Added custom comparison function for PositionRow** - Implemented `arePropsEqual` that only triggers re-render when:
   - `totalQty` (size) changes
   - `markPrice` changes by more than 0.01%

2. **Moved market data to parent** - Added `maxLeverage` to `AggregatedPosition` type and calculated it once in `usePositionCalculations` hook, eliminating store subscriptions from individual rows.

3. **Stabilized handleSort callback** - Removed `sortDirection` dependency by using functional state updates (`setSortDirection((prev) => ...)`), making `handleSort` stable across renders.

4. **Added custom comparison for PositionsTableContent** - Implemented shallow comparison that checks:
   - `sortField` and `sortDirection` changes
   - Array length changes
   - Symbol order changes
   - This prevents unnecessary re-renders when only individual position values change

5. **Improved code readability** - Separated concerns with dedicated functions (`isPriceChangeSignificant`, `arePropsEqual`, `PositionRowComponent`) and extracted the threshold as a constant.

## Result
✅ Individual `PositionRow` components now only re-render when their specific `markPrice` or `size` values change significantly
✅ `PositionsTableContent` (tbody) only re-renders when sort parameters change or positions are added/removed/reordered
✅ Dramatically reduced unnecessary renders and improved overall performance
✅ React Profiler now shows minimal flickering only for components with actual data changes
