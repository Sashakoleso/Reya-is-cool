import { style } from '@vanilla-extract/css';
import { vars } from '../../styles/theme.css.ts';

export const sidebar = style({
  width: '232px',
  backgroundColor: vars.colors.background,
  borderRight: `1px solid ${vars.colors.border}`,
  padding: `${vars.spacing.lg}`,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xl,
});

export const navItem = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.md,
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  borderRadius: vars.borderRadius.md,
  color: vars.colors.textSecondary,
  textDecoration: 'none',
  transition: 'all 0.15s ease',
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.regular,
  cursor: 'pointer',
  border: `1px solid ${vars.colors.border}`,
});
export const navSubItem = style({
  borderLeft: `1px solid transparent`,
  display: 'flex',
  alignItems: 'center',
  marginLeft: vars.spacing.md,
  padding: `${vars.spacing.md} ${vars.spacing.lg}`,
  color: vars.colors.textSecondary,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.regular,
  cursor: 'pointer',
  transition: 'all 0.15s ease',
  ':hover': {
    color: vars.colors.text,
  }
});
export const navSubItemActive = style({
  borderLeft: `1px solid white`,
  color: vars.colors.text,
});
export const navItemActive = style({
  backgroundColor: vars.colors.backgroundSecondary,
  color: vars.colors.text,
});
