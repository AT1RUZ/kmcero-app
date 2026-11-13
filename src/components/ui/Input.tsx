import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View, ViewStyle } from 'react-native';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';

type Props = TextInputProps & {
  error?: boolean;
  containerStyle?: ViewStyle;
  rightElement?: React.ReactNode;
};

export function Input({ error, containerStyle, rightElement, style, ...props }: Props) {
  return (
    <View style={[styles.wrap, error && styles.error, containerStyle]}>
      <TextInput
        placeholderTextColor={colors.mutedForeground}
        style={[styles.input, style, rightElement ? { paddingRight: 40 } : null]}
        {...props}
      />
      {rightElement ? <View style={styles.right}>{rightElement}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    borderWidth: 1,
    borderColor: colors.input,
    borderRadius: radius.md,
    backgroundColor: colors.primaryForeground,
    minHeight: 40,
    justifyContent: 'center',
  },
  error: {
    borderColor: colors.destructive,
  },
  input: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.foreground,
  },
  right: {
    position: 'absolute',
    right: 12,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
});
