export type AggregatedPosition = {
  symbol: string;
  totalQty: string;
  side: 'B' | 'S';
  positionValue: string;
  markPrice: string;
};

export type SortField = 'symbol' | 'size' | 'value' | 'price';
export type SortDirection = 'asc' | 'desc';
