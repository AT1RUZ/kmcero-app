import { TextStyle } from 'react-native';
import { colors } from './colors';

export const fonts = {
  regular: 'Exo_400Regular',
  medium: 'Exo_500Medium',
  semibold: 'Exo_600SemiBold',
  bold: 'Exo_700Bold',
  brand: 'Molgan_400Regular',
} as const;

export const text = {
  brandTitle: {
    fontFamily: fonts.brand,
    fontSize: 36,
    fontWeight: '800',
    color: colors.white,
    letterSpacing: -0.5,
  } as TextStyle,
  h1: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.foreground,
  } as TextStyle,
  h2: {
    fontFamily: fonts.bold,
    fontSize: 20,
    color: colors.foreground,
  } as TextStyle,
  h3: {
    fontFamily: fonts.semibold,
    fontSize: 16,
    color: colors.foreground,
  } as TextStyle,
  body: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.foreground,
  } as TextStyle,
  muted: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.mutedForeground,
  } as TextStyle,
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.foreground,
  } as TextStyle,
  caption: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.mutedForeground,
  } as TextStyle,
  tiny: {
    fontFamily: fonts.regular,
    fontSize: 10,
    color: colors.mutedForeground,
  } as TextStyle,
  link: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.accent,
  } as TextStyle,
};
