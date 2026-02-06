import { Position, Price, MarketDefinition } from '../services/api/types';

export type WalletState = {
  walletAddress: string | null;
  setWalletAddress: (address: string | null) => void;
  isWalletAddressValid: boolean;
  setIsWalletAddressValid: (isValid: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
};

export type MarketsState = {
  markets: MarketDefinition[];
  setMarkets: (markets: MarketDefinition[]) => void;
};

export type PositionsState = {
  positions: Position[];
  setPositions: (positions: Position[]) => void;
  updatePositions: (positions: Position[]) => void;
  isLoadingPositions: boolean;
  setLoadingPositions: (loading: boolean) => void;
  positionsError: string | null;
  setPositionsError: (error: string | null) => void;
};

export type PricesState = {
  prices: Record<string, Price>;
  updatePrices: (prices: Price[]) => void;
};
