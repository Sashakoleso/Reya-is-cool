import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

export const page = style({
  padding: vars.spacing.xl,
  margin: '0 auto',
  width: '100%',
});

export const content = style({
  display: 'flex',
  flexDirection: 'column',
  borderBottom: `1px solid ${vars.colors.border}`,
});