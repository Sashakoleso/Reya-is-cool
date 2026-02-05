import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css.ts';

export const header = style({
  height: '60px',
  width: '100%',
  backgroundColor: vars.colors.background,
  borderBottom: `1px solid ${vars.colors.border}`,
  padding: `0 ${vars.spacing.lg}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
});

export const logo = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.md,
  height: '100%',
});

export const logoIconWrap = style({
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  paddingRight: vars.spacing.md,
  borderRight: `1px solid ${vars.colors.border}`,
});

export const logoText = style({
  fontSize: vars.fontSize.lg,
  fontWeight: '400',
  color: vars.colors.textSecondary,
  letterSpacing: '-0.01em',
});

export const walletInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.md,
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  backgroundColor: vars.colors.backgroundSecondary,
  borderRadius: vars.borderRadius.md,
  fontSize: vars.fontSize.sm,
  fontFamily: vars.fontFamily.mono,
  color: vars.colors.textSecondary,
  border: `1px solid ${vars.colors.border}`,
});