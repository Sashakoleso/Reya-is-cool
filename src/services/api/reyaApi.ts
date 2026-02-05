import axios, {AxiosInstance} from 'axios';
import {MarketDefinition, Position} from './types';
import { BASE_URL } from './constants';

/**
 * REST API client for Reya DEX.
 * Provides methods for fetching markets and user positions.
 */
const client: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000, 
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Fetches all available market definitions from the API.
 * @returns Promise resolving to an array of MarketDefinition objects.
 */
const getMarketDefinitions = async (): Promise<MarketDefinition[]> => {
  try {
    const response = await client.get<MarketDefinition[]>('/marketDefinitions');
    return response.data;
  } catch (error) {
    console.error('Error fetching market definitions:', error);
    throw new Error('Failed to fetch market definitions');
  }
};

/**
 * Fetches all active trading positions for a specific wallet address.
 * @param address The Ethereum wallet address (0x...).
 * @returns Promise resolving to an array of Position objects.
 */
const getWalletPositions = async (address: string): Promise<Position[]> => {
  try {
    const response = await client.get<Position[]>(`/wallet/${address}/positions`);
    return response.data;
  } catch (error) {
    console.error('Error fetching wallet positions:', error);
    throw new Error('Failed to fetch wallet positions');
  }
};

/**
 * Exported API service object.
 */
export const reyaApi = {
  getMarketDefinitions, 
  getWalletPositions,
};
