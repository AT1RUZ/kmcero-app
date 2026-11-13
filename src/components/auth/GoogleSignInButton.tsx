import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';

type Props = {
  mode?: 'login' | 'register';
  onPress?: () => void;
};

/** Botón visual Google — sin OAuth real. */
export function GoogleSignInButton({ mode = 'login', onPress }: Props) {
  const label =
    mode === 'login' ? 'Iniciar sesión con Google' : 'Registrarse con Google';

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.btn, pressed && { opacity: 0.9 }]}
    >
      {/* TODO: conectar Google OAuth / token exchange */}
      <View style={styles.logo}>
        <Text style={styles.g}>G</Text>
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.card,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  logo: {
    width: 18,
    height: 18,
    borderRadius: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  g: {
    fontFamily: fonts.bold,
    fontSize: 14,
    color: '#4285F4',
  },
  label: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.foreground,
  },
});
