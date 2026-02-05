import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

export const container = style({
  marginBottom: vars.spacing.xl,
});

export const form = style({
  display: 'flex',
  gap: vars.spacing.md,
  maxWidth: '700px',
});

export const input = style({
  flex: 1,
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  backgroundColor: vars.colors.backgroundSecondary,
  border: `1px solid ${vars.colors.border}`,
  borderRadius: vars.borderRadius.md,
  color: vars.colors.text,
  fontSize: vars.fontSize.md,
  transition: 'border-color 0.15s ease',

  '::placeholder': {
    color: vars.colors.textMuted,
  },

  ':focus': {
    borderColor: vars.colors.textSecondary,
    backgroundColor: vars.colors.backgroundTertiary,
  },
});

export const button = style({
  padding: `${vars.spacing.md} ${vars.spacing.xl}`,
  backgroundColor: vars.colors.primary,
  color: vars.colors.background,
  borderRadius: vars.borderRadius.md,
  fontSize: vars.fontSize.md,
  fontWeight: '400',
  transition: 'all 0.15s ease',
  whiteSpace: 'nowrap',

  ':hover': {
    opacity: 0.85,
  },

  ':disabled': {
    opacity: 0.5,
    cursor: 'not-allowed',
  },
});

export const error = style({
  marginTop: vars.spacing.xl,
  color: vars.colors.danger,
  fontSize: vars.fontSize.sm,
});
