import React, { useState } from 'react';
import {
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  View,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { NavigateFn } from '../navigation/types';
import { colors, radius } from '../theme/colors';
import { fonts } from '../theme/typography';
import { spacing } from '../theme/spacing';

type Props = { onNavigate: NavigateFn };

export function NewPasswordScreen({ onNavigate }: Props) {
  const [show1, setShow1] = useState(false);
  const [show2, setShow2] = useState(false);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [success, setSuccess] = useState(false);

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('../../assets/background/kmcero.jpg')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>

      <SafeAreaView style={styles.safe}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Pressable
            onPress={() => onNavigate('login')}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.85 }]}
          >
            <Ionicons name="arrow-back" size={16} color={colors.foreground} />
            <Text style={styles.backText}>Volver atrás</Text>
          </Pressable>

          <Card>
            {success ? (
              <>
                <CardHeader style={{ alignItems: 'flex-start' }}>
                  <Text style={styles.title}>
                    Contraseña actualizada. Ya puedes iniciar sesión.
                  </Text>
                </CardHeader>
                <CardFooter>
                  <Button onPress={() => onNavigate('login')}>
                    Volver al inicio de sesión
                  </Button>
                </CardFooter>
              </>
            ) : (
              <>
                <CardHeader style={{ alignItems: 'flex-start' }}>
                  <Text style={styles.title}>Nueva contraseña</Text>
                  <Text style={styles.desc}>
                    Elige una contraseña segura. El enlace del correo caduca en una hora.
                  </Text>
                </CardHeader>
                <CardContent>
                  <View>
                    <Label>Nueva contraseña</Label>
                    <Input
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry={!show1}
                      placeholder="••••••••"
                      // TODO: password policy + reset token from deep link
                      rightElement={
                        <Pressable onPress={() => setShow1((v) => !v)} hitSlop={8}>
                          <Ionicons
                            name={show1 ? 'eye-off-outline' : 'eye-outline'}
                            size={18}
                            color={colors.mutedForeground}
                          />
                        </Pressable>
                      }
                    />
                  </View>
                  <View>
                    <Label>Confirmar contraseña</Label>
                    <Input
                      value={confirm}
                      onChangeText={setConfirm}
                      secureTextEntry={!show2}
                      placeholder="••••••••"
                      rightElement={
                        <Pressable onPress={() => setShow2((v) => !v)} hitSlop={8}>
                          <Ionicons
                            name={show2 ? 'eye-off-outline' : 'eye-outline'}
                            size={18}
                            color={colors.mutedForeground}
                          />
                        </Pressable>
                      }
                    />
                  </View>
                </CardContent>
                <CardFooter>
                  <Button
                    onPress={() => {
                      // TODO: POST /api/auth/reset-password
                      setSuccess(true);
                    }}
                  >
                    Guardar contraseña
                  </Button>
                </CardFooter>
              </>
            )}
          </Card>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primary },
  overlay: { ...(StyleSheet.absoluteFill as object), backgroundColor: colors.overlayLight },
  safe: { flex: 1 },
  content: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    paddingBottom: spacing['3xl'],
    gap: spacing.md,
    maxWidth: 420,
    width: '100%',
    alignSelf: 'center',
  },
  backBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(254,110,0,0.5)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radius.md,
  },
  backText: {
    fontFamily: fonts.semibold,
    fontSize: 13,
    color: colors.primaryForeground,
  },
  title: {
    fontFamily: fonts.bold,
    fontSize: 24,
    color: colors.foreground,
  },
  desc: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.mutedForeground,
    lineHeight: 20,
  },
});
