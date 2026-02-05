export type AggregatedPosition = {
  symbol: string;
  totalQty: string;
  side: 'B' | 'S';
  positionValue: string;
  markPrice: string;
};
