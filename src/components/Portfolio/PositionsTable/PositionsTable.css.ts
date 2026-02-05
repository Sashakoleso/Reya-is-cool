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

export const tableWrapper = style({
  overflowX: 'auto',
});

export const table = style({
  width: '100%',
  borderCollapse: 'collapse',
});

export const thead = style({
  backgroundColor: vars.colors.background,
  borderBottom: `1px solid ${vars.colors.border}`,
});

export const th = style({
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  textAlign: 'left',
  fontSize: vars.fontSize.sm,
  fontWeight: vars.fontWeight.regular,
  color: vars.colors.textSecondary,
  textTransform: 'none',
  letterSpacing: '0',
});

export const thSortable = style([th, {
  cursor: 'pointer',
  userSelect: 'none',
  transition: 'background-color 0.15s ease',

  ':hover': {
    backgroundColor: vars.colors.backgroundSecondary,
  },
}]);

export const thContent = style({
  display: 'flex',
  alignItems: 'center',
});

export const sortIcon = style({
  width: '16px',
  height: '16px',
  opacity: 0.3,
  transition: 'opacity 0.2s',

  selectors: {
    [`${thSortable}:hover &`]: {
      opacity: 0.6,
    },
  },
});

export const sortIconActive = style({
  width: '16px',
  height: '16px',
  opacity: 1,
  color: vars.colors.primary,
});

export const emptyState = style({
  padding: `${vars.spacing.xxl} ${vars.spacing.lg}`,
  textAlign: 'center',
  color: vars.colors.textMuted,
  fontSize: vars.fontSize.md,
  minHeight: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const loadingState = style({
  padding: `${vars.spacing.xxl} ${vars.spacing.lg}`,
  textAlign: 'center',
  color: vars.colors.textSecondary,
  fontSize: vars.fontSize.md,
  minHeight: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});

export const errorState = style({
  padding: `${vars.spacing.xxl} ${vars.spacing.lg}`,
  textAlign: 'center',
  color: vars.colors.danger,
  fontSize: vars.fontSize.md,
  minHeight: '200px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
});