/**
 * Formats a number or string value as a USD currency string.
 * @param value The value to format.
 * @returns Formatted USD string (e.g., "$1,234.56").
 */
export const formatUSD = (value: string | number): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return '$0.00';

  return new Intl.NumberFormat('en-US', {
    style: 'currency', currency: 'USD', minimumFractionDigits: 2, maximumFractionDigits: 2,
  }).format(numValue);
}

/**
 * Formats a number with commas as thousands separators and a fixed number of decimal places.
 * @param value The value to format.
 * @param decimals Number of decimal places (default is 2).
 * @returns Formatted number string.
 */
export const  formatNumber = (value: string | number, decimals: number = 2): string => {
  const numValue = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(numValue)) return '0.00';

  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals, maximumFractionDigits: decimals,
  }).format(numValue);
}

/**
 * Shortens a wallet address for display purposes.
 * @param address The full Ethereum address.
 * @returns Shortened address (e.g., "0x1234...abcd").
 */
export const formatAddress = (address: string): string => {
  if (!address || address.length < 10) return address;
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
}

/**
 * Validates if a string matches the Ethereum address format.
 * @param address The string to validate.
 * @returns True if the format is valid.
 */
export const isValidAddress = (address: string): boolean => {
  return /^0x[a-fA-F0-9]{40}$/.test(address);
}

/**
 * Strips common suffixes from market symbols to get a cleaner display name.
 * @param symbol The raw market symbol (e.g., "BTCRUSDPERP").
 * @returns Cleaned symbol name (e.g., "BTC").
 */
export const getSymbolDisplayName = (symbol: string): string =>
{
  return symbol.replace('RUSDPERP', '').replace('PERP', '');
}
