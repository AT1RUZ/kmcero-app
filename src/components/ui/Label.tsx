import React from 'react';
import { StyleSheet, Text, TextStyle } from 'react-native';
import { fonts } from '../../theme/typography';
import { colors } from '../../theme/colors';

type Props = {
  children: React.ReactNode;
  style?: TextStyle;
  error?: boolean;
};

export function Label({ children, style, error }: Props) {
  return <Text style={[styles.label, error && styles.error, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.foreground,
    marginBottom: 6,
  },
  error: {
    color: colors.destructive,
  },
});
