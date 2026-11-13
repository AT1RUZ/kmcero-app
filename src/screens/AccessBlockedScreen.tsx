import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/ui/Button';
import { NavigateFn } from '../navigation/types';
import { colors, radius } from '../theme/colors';
import { fonts } from '../theme/typography';
import { spacing } from '../theme/spacing';

type Props = { onNavigate: NavigateFn };

export function AccessBlockedScreen({ onNavigate }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Ionicons name="speedometer-outline" size={36} color="#D97706" />
        </View>
        <Text style={styles.title}>Demasiadas peticiones</Text>
        <Text style={styles.subtitle}>
          {/* TODO: leer AccessBlockNotice de sesión / IP guard */}
          Has llegado al límite de uso permitido por ahora. No es un bloqueo de cuenta.
        </Text>
        <Text style={styles.countdown}>Reintento demo en: 2m 15s</Text>
        <Button variant="outline" onPress={() => onNavigate('shop')}>
          Volver a la tienda
        </Button>
        <Button onPress={() => onNavigate('login')}>Ir al login</Button>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing['2xl'],
    gap: 12,
    alignItems: 'center',
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  iconWrap: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.foreground,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.regular,
    fontSize: 14,
    color: colors.mutedForeground,
    textAlign: 'center',
    lineHeight: 20,
  },
  countdown: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: '#92400E',
    marginVertical: 4,
  },
});
