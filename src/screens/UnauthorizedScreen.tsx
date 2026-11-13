import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/ui/Button';
import { NavigateFn } from '../navigation/types';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { spacing } from '../theme/spacing';

type Props = { onNavigate: NavigateFn };

export function UnauthorizedScreen({ onNavigate }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.wrap}>
        <Ionicons name="shield-outline" size={48} color="#D97706" />
        <Text style={styles.title}>Acceso no permitido</Text>
        <Text style={styles.desc}>
          No tienes permiso para ver esta sección. Si crees que es un error, cierra
          sesión e ingresa con la cuenta correcta.
        </Text>
        <View style={styles.actions}>
          <Button variant="outline" onPress={() => onNavigate('shop')}>
            Ir al inicio
          </Button>
          <Button onPress={() => onNavigate('login')}>Iniciar sesión</Button>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['2xl'],
    gap: 12,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.foreground,
    textAlign: 'center',
  },
  desc: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.mutedForeground,
    textAlign: 'center',
    maxWidth: 360,
    lineHeight: 20,
  },
  actions: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
});
