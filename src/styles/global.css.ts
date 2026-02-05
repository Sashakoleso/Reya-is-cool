import { globalStyle, globalFontFace } from '@vanilla-extract/css';
import { vars } from './theme.css';

globalFontFace('Satoshi', {
  src: 'url("/fonts/Satoshi-Regular.woff2") format("woff2")',
  fontWeight: '400',
  fontStyle: 'normal',
});


globalStyle('*, *::before, *::after', {
  boxSizing: 'border-box',
  margin: 0,
  padding: 0,
});

globalStyle('html, body', {
  height: '100%',
  fontFamily: vars.fontFamily.sans,
  backgroundColor: vars.colors.background,
  color: vars.colors.text,
  fontSize: vars.fontSize.md,
  lineHeight: 1.5,
  WebkitFontSmoothing: 'antialiased',
  MozOsxFontSmoothing: 'grayscale',
});

globalStyle('#root', {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
});

globalStyle('button', {
  fontFamily: 'inherit',
  cursor: 'pointer',
  border: 'none',
  outline: 'none',
});

globalStyle('input', {
  fontFamily: 'inherit',
  outline: 'none',
});
