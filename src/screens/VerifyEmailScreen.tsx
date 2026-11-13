import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader } from '../components/ui/Card';
import { NavigateFn } from '../navigation/types';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';
import { spacing } from '../theme/spacing';

type Props = { onNavigate: NavigateFn };

export function VerifyEmailScreen({ onNavigate }: Props) {
  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.wrap}>
        <Card>
          <CardHeader>
            <Ionicons name="mail-outline" size={40} color={colors.accent} />
            <Text style={styles.title}>Verificar correo</Text>
            <Text style={styles.desc}>
              {/* TODO: consumir token de deep link VERIFY_EMAIL_MUTATION */}
              Revisa tu bandeja e ingresa el enlace de verificación. Esta pantalla es
              solo visual.
            </Text>
          </CardHeader>
          <CardContent>
            <View style={styles.status}>
              <Ionicons name="checkmark-circle" size={28} color={colors.success} />
              <Text style={styles.statusText}>Estado demo: éxito</Text>
            </View>
            <Button onPress={() => onNavigate('shop')}>Ir a la tienda</Button>
            <Button variant="outline" onPress={() => onNavigate('login')}>
              Volver al login
            </Button>
          </CardContent>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  wrap: {
    flex: 1,
    justifyContent: 'center',
    padding: spacing.lg,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 22,
    color: colors.foreground,
    textAlign: 'center',
  },
  desc: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.mutedForeground,
    textAlign: 'center',
    lineHeight: 20,
  },
  status: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 8,
  },
  statusText: {
    fontFamily: fonts.medium,
    fontSize: 14,
    color: colors.success,
  },
});
