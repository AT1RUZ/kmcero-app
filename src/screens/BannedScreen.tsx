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

export function BannedScreen({ onNavigate }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.card}>
        <View style={styles.iconWrap}>
          <Ionicons name="ban" size={36} color={colors.destructive} />
        </View>
        <Text style={styles.title}>Cuenta suspendida</Text>
        <Text style={styles.subtitle}>
          {/* TODO: leer ban notice de sesión / API ban-status */}
          Tu cuenta está temporalmente suspendida. Contacta soporte si crees que es un
          error.
        </Text>
        <View style={styles.reasonBox}>
          <Text style={styles.reasonLabel}>Motivo (demo)</Text>
          <Text style={styles.reason}>Actividad inusual detectada</Text>
        </View>
        <Button variant="outline" onPress={() => onNavigate('login')}>
          Volver al login
        </Button>
        <Button onPress={() => onNavigate('shop')}>Ir al inicio</Button>
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
    backgroundColor: 'rgba(196,60,44,0.1)',
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
  reasonBox: {
    width: '100%',
    backgroundColor: colors.secondary,
    borderRadius: radius.md,
    padding: 12,
    marginVertical: 4,
  },
  reasonLabel: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: colors.mutedForeground,
    marginBottom: 4,
  },
  reason: {
    fontFamily: fonts.semibold,
    fontSize: 14,
    color: colors.foreground,
  },
});
