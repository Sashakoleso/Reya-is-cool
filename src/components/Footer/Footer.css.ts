import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css.ts';

export const footerContainer = style({
  height: '60px',
  width: '100%',
  backgroundColor: vars.colors.background,
  borderTop: `1px solid ${vars.colors.border}`,
  padding: `0 ${vars.spacing.lg}`,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexShrink: 0,
});

export const time = style({
  borderRight: `1px solid ${vars.colors.border}`,
  paddingRight: vars.spacing.xl,
});

export const links = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xxl,
  borderRight: `1px solid ${vars.colors.border}`,
});

export const linkItem = style({
  fontSize: vars.fontSize.lg,
  paddingRight: vars.spacing.xl,
  color: vars.colors.textSecondary,
  textDecoration: 'none',
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  cursor: 'pointer',
  borderRight: `1px solid ${vars.colors.border}`,
  selectors: {
    '&:hover': {
      color: vars.colors.text,
    },
  },
});

export const linkItemWithBorders = style([
  linkItem,
  {
    borderInline: `1px solid ${vars.colors.border}`,
  }
]);