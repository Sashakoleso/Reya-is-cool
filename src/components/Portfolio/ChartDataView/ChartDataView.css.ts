import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

export const container = style({
  backgroundColor: vars.colors.background,
  borderRadius: vars.borderRadius.lg,
});

export const header = style({
  padding: `${vars.spacing.sm} ${vars.spacing.sm}`,
  backgroundColor: vars.colors.background,
});

export const title = style({
  fontSize: vars.fontSize.lg,
  fontWeight: vars.fontWeight.regular,
  color: vars.colors.text,
  letterSpacing: '-0.01em',
});

export const placeholder = style({
  padding: vars.spacing.xxl,
  textAlign: 'center',
  color: vars.colors.textSecondary,
  fontSize: vars.fontSize.md,
});

export const chartContainer = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: vars.spacing.xl,
  minHeight: '1000px',
  '@media': {
    'screen and (max-width: 1380px)': {
      minHeight: '800px',
    },
    'screen and (max-width: 1200px)': {
      minHeight: '650px',
    },
  },
});

export const totalValueWrapper = style({
  textAlign: 'center',
  marginBottom: vars.spacing.xxl,
});

export const totalValueLabel = style({
  fontSize: vars.fontSize.lg,
  color: vars.colors.textSecondary,
  marginBottom: vars.spacing.sm,
});

export const totalValueAmount = style({
  fontSize: '48px',
  fontWeight: vars.fontWeight.bold,
  color: vars.colors.text,
  '@media': {
    'screen and (max-width: 1380px)': {
      fontSize: '36px',
    },
    'screen and (max-width: 1200px)': {
      fontSize: '28px',
    },
  },
});
