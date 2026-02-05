import { style } from '@vanilla-extract/css';

export const app = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
  backgroundColor: '#0D0D0D',
});

export const main = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  backgroundColor: '#0D0D0D',
});
export const content = style({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  overflow: 'hidden',
});