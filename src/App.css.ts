import { style } from '@vanilla-extract/css';
import {vars} from "./styles/theme.css.ts";

export const app = style({
  display: 'flex',
  flexDirection: 'column',
  height: '100vh',
  width: '100%',
  backgroundColor: vars.colors.background,
});

export const main = style({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'auto',
  backgroundColor: vars.colors.background,
});
export const content = style({
  display: 'flex',
  flexDirection: 'row',
  flex: 1,
  overflow: 'hidden',
});