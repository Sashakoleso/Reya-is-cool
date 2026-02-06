export type Price = {
  symbol: string;
  oraclePrice: string;
  poolPrice: string;
  updatedAt: number;
};

export type MarketDefinition = {
  symbol: string;
  baseAsset: string;
  quoteAsset: string;
  maxLeverage?: string;
};

export type Position = {
  exchangeId: number;
  symbol: string;
  accountId: number;
  qty: string;
  side: 'B' | 'S'; // B = Buy/Long, S = Sell/Short
  avgEntryPrice: string;
  avgEntryFundingValue: string;
  lastTradeSequenceNumber: number;
};

