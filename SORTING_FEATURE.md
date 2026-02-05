# Sortable Columns Feature

## ✅ Feature Implemented

All columns in the Positions Table are now **sortable**!

## 🎯 Features

### Sortable Columns
- ✅ **Market** - Alphabetical sorting by symbol name
- ✅ **Size** - Numerical sorting by position quantity
- ✅ **Position Value** - Numerical sorting by USD value
- ✅ **Mark Price** - Numerical sorting by current price

### Sorting Behavior
- **Click once** - Sort ascending (A-Z or lowest to highest)
- **Click twice** - Sort descending (Z-A or highest to lowest)
- **Click different column** - Switch to that column with ascending sort
- **Visual indicators** - Arrow icons show current sort direction

### UI/UX Enhancements
- ✅ Clickable column headers with hover effect
- ✅ Sort icons (up/down arrows) on each column
- ✅ Active column highlighted with white arrow
- ✅ Inactive columns show dimmed arrow
- ✅ Smooth transitions and hover states
- ✅ Cursor changes to pointer on hover

## 🎨 Visual Design

### Sort Icons
- **Inactive column**: Gray down arrow (opacity 0.3)
- **Hover**: Arrow becomes more visible (opacity 0.6)
- **Active ascending**: White up arrow ↑
- **Active descending**: White down arrow ↓

### Column Headers
- Hover effect: Darker background
- Cursor: Pointer (indicates clickable)
- Smooth transitions

## 🔧 Technical Implementation

### State Management
```typescript
const [sortField, setSortField] = useState<SortField>('symbol');
const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
```

### Sorting Logic
- Uses `useMemo` for performance optimization
- Only re-sorts when positions or sort settings change
- Handles both string and numeric comparisons
- Preserves original data (creates sorted copy)

### Sort Fields
```typescript
type SortField = 'symbol' | 'size' | 'value' | 'price';
type SortDirection = 'asc' | 'desc';
```

## 📊 Sorting Examples

### Market (Symbol)
- Ascending: BTC → ETH → SOL
- Descending: SOL → ETH → BTC

### Size (Quantity)
- Ascending: 1.30 → 123.30 → 1,283.30
- Descending: 1,283.30 → 123.30 → 1.30

### Position Value (USD)
- Ascending: $30.01 → $670.01 → $134,307,430.01
- Descending: $134,307,430.01 → $670.01 → $30.01

### Mark Price
- Ascending: 45.45 → 445.45 → 1,450.03
- Descending: 1,450.03 → 445.45 → 45.45

## 🚀 Usage

1. **Open the application** at `http://localhost:3000`
2. **Load a wallet** with positions
3. **Click any column header** to sort by that column
4. **Click again** to reverse the sort direction
5. **Watch the arrow icon** change to indicate sort direction

## 💡 Benefits

- ✅ **Better data analysis** - Quickly find largest/smallest positions
- ✅ **Improved UX** - Standard table sorting behavior
- ✅ **Performance optimized** - Uses memoization to prevent unnecessary re-renders
- ✅ **Accessible** - Clear visual feedback for current sort state
- ✅ **Responsive** - Works on all screen sizes

## 🎯 Default Behavior

- **Default sort**: Market (Symbol) in ascending order (A-Z)
- **Persists during session**: Sort settings maintained while browsing
- **Resets on wallet change**: New wallet loads with default sort

## ✨ Future Enhancements (Optional)

- [ ] Remember sort preference in localStorage
- [ ] Multi-column sorting (hold Shift to sort by multiple columns)
- [ ] Custom sort orders (e.g., sort by side: Long first, then Short)
- [ ] Sort by additional calculated fields (e.g., PnL, funding rate)

---

**All columns are now sortable! Click any column header to sort.** 🎉
