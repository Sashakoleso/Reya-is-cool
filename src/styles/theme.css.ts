import { createGlobalTheme } from '@vanilla-extract/css';

export const vars = createGlobalTheme(':root', {
  colors: {
    background: '#0D0D0D',
    backgroundSecondary: '#1A1A1A',
    backgroundTertiary: '#252525',
    border: '#2D2D2D',
    text: '#FFFFFF',
    textSecondary: '#8D8D8D',
    textMuted: '#666666',
    primary: '#FFFFFF',
    success: '#22C55E',
    danger: '#EF4444',
    warning: '#F59E0B',
  },
  fontWeight: {
    regular: '400',
    medium: '500',
    bold: '700',
  },
  spacing: {
    xs: '4px',
    sm: '8px',
    md: '12px',
    lg: '16px',
    xl: '24px',
    xxl: '32px',
  },
  fontSize: {
    xs: '11px',
    sm: '12px',
    md: '14px',
    lg: '16px',
    xl: '18px',
    xxl: '20px',
  },
  borderRadius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
  },
  fontFamily: {
    sans: 'Satoshi, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"',
    mono: '"SF Mono", Monaco, "Cascadia Code", "Roboto Mono", Consolas, monospace',
  },
});
