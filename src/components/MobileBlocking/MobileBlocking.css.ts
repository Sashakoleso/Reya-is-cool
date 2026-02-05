import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css';

export const container = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  position: 'fixed',
  top: 0,
  left: 0,
  backgroundColor: vars.colors.background,
  zIndex: 9999,
  padding: vars.spacing.xl,
  textAlign: 'center',
});

export const content = style({
  maxWidth: '400px',
  marginTop: vars.spacing.xl,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.lg,
});

export const title = style({
  fontSize: vars.fontSize.xxl,
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.text,
});

export const description = style({
  fontSize: vars.fontSize.md,
  color: vars.colors.textSecondary,
  lineHeight: 1.5,
});

export const footer = style({
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.borderRadius.md,
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  backgroundColor: vars.colors.backgroundSecondary,
  fontSize: vars.fontSize.sm,
  marginTop: vars.spacing.xl,
});
