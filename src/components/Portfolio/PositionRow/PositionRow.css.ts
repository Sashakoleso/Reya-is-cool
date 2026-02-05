import { style } from '@vanilla-extract/css';
import { vars } from '../../../styles/theme.css';

export const row = style({
  ':hover': {
    backgroundColor: vars.colors.backgroundSecondary,
  },
});

export const cell = style({
  padding: `${vars.spacing.sm} ${vars.spacing.lg}`,
  fontSize: vars.fontSize.md,
  fontWeight: vars.fontWeight.medium,
});

export const marketCell = style([cell, {
  fontWeight: vars.fontWeight.medium,
}]);

export const symbolLong = style({
  color: vars.colors.success,
  fontWeight: vars.fontWeight.medium,
});

export const symbolShort = style({
  color: vars.colors.danger,
  fontWeight: vars.fontWeight.medium,
});

export const symbolSuffix = style({
  fontWeight: vars.fontWeight.medium,
  marginLeft: vars.spacing.sm,
  fontSize: vars.fontSize.xs,
});

export const sizeCell = style([cell, {
  color: vars.colors.text,
}]);

export const valueCell = style([cell, {
  fontWeight: vars.fontWeight.medium,
  color: vars.colors.text,
}]);

export const priceCell = style([cell, {
  color: vars.colors.text,
  fontWeight: vars.fontWeight.medium,
}]);
