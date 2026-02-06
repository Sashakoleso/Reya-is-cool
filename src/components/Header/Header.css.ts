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
  fontWeight: vars.fontWeight.regular,
  color: vars.colors.textSecondary,
  letterSpacing: '-0.01em',
});

export const walletInfo = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.md,
});

export const walletButton = style({
  display: 'flex',
  alignItems: 'center',
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  backgroundColor: vars.colors.backgroundSecondary,
  borderRadius: vars.borderRadius.md,
  fontSize: vars.fontSize.lg,
  color: vars.colors.textSecondary,
  border: `1px solid ${vars.colors.border}`,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  whiteSpace: 'nowrap',

  ':hover': {
    backgroundColor: vars.colors.backgroundTertiary,
    borderColor: vars.colors.textSecondary,
  },
});

export const walletInput = style({
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  backgroundColor: vars.colors.backgroundSecondary,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.borderRadius.md,
  color: vars.colors.text,
  fontSize: vars.fontSize.md,
  width: '320px',
  transition: 'border-color 0.15s ease',
  marginRight: vars.spacing.lg,

  '::placeholder': {
    color: vars.colors.textMuted,
  },

  ':focus': {
    borderColor: vars.colors.textSecondary,
    backgroundColor: vars.colors.backgroundTertiary,
    outline: 'none',
  },
});

export const walletError = style({
  color: vars.colors.danger,
  fontSize: vars.fontSize.md,
  backgroundColor: vars.colors.background,
  padding: vars.spacing.xs,
  borderRadius: vars.borderRadius.sm,
  border: `1px solid ${vars.colors.danger}`,
  marginRight: vars.spacing.md,
  whiteSpace: 'nowrap',
});

export const walletWrapper = style({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
});