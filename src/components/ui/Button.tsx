import React from 'react';
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';

type Variant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'accent';
type Size = 'default' | 'sm' | 'lg' | 'icon';

type Props = {
  children?: React.ReactNode;
  onPress?: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
};

export function Button({
  children,
  onPress,
  variant = 'default',
  size = 'default',
  disabled,
  loading,
  style,
  textStyle,
}: Props) {
  const isDisabled = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={({ pressed }) => [
        styles.base,
        sizeStyles[size],
        variantStyles[variant],
        pressed && !isDisabled && styles.pressed,
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator
          color={variant === 'outline' || variant === 'ghost' ? colors.foreground : colors.primaryForeground}
        />
      ) : typeof children === 'string' ? (
        <Text style={[styles.text, variantTextStyles[variant], textStyle]}>{children}</Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderRadius: radius.md,
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: fonts.medium,
    fontSize: 14,
  },
});

const sizeStyles: Record<Size, ViewStyle> = {
  default: { height: 36, paddingHorizontal: 16 },
  sm: { height: 32, paddingHorizontal: 12 },
  lg: { height: 40, paddingHorizontal: 24 },
  icon: { height: 36, width: 36, paddingHorizontal: 0 },
};

const variantStyles: Record<Variant, ViewStyle> = {
  default: {
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderColor: 'rgba(26,27,46,0.1)',
  },
  accent: {
    backgroundColor: colors.accent,
    borderWidth: 1,
    borderColor: 'rgba(254,110,0,0.2)',
  },
  destructive: {
    backgroundColor: colors.destructive,
  },
  outline: {
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  secondary: {
    backgroundColor: colors.secondary,
  },
  ghost: {
    backgroundColor: 'transparent',
  },
};

const variantTextStyles: Record<Variant, TextStyle> = {
  default: { color: colors.primaryForeground, fontFamily: fonts.medium },
  accent: { color: colors.accentForeground, fontFamily: fonts.semibold },
  destructive: { color: colors.destructiveForeground, fontFamily: fonts.medium },
  outline: { color: colors.foreground, fontFamily: fonts.medium },
  secondary: { color: colors.secondaryForeground, fontFamily: fonts.medium },
  ghost: { color: colors.foreground, fontFamily: fonts.medium },
};
