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

export function RecoverScreen({ onNavigate }: Props) {
  const [email, setEmail] = useState('');
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [done, setDone] = useState(false);

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
        <View style={styles.topBar}>
          <View style={{ flex: 1 }} />
          {/* TODO: ThemeToggle */}
          <View style={styles.themePlaceholder}>
            <Ionicons name="sunny-outline" size={18} color={colors.primaryForeground} />
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled">
          <Pressable
            onPress={() => onNavigate('login')}
            style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.85 }]}
          >
            <Ionicons name="arrow-back" size={16} color={colors.foreground} />
            <Text style={styles.backText}>Volver atrás</Text>
          </Pressable>

          <Card>
            <CardHeader style={{ alignItems: 'flex-start' }}>
              <Text style={styles.title}>Recuperar contraseña</Text>
              <Text style={styles.desc}>
                Introduce el correo de tu cuenta. Si existe y está activa, te enviaremos un
                enlace (revisa también la carpeta de spam).
              </Text>
            </CardHeader>

            <CardContent>
              {/* Captcha visual mock */}
              <View style={styles.captchaBox}>
                <Text style={styles.captchaLabel}>Verificación visual</Text>
                <View style={styles.captchaImage}>
                  <Text style={styles.captchaCode}>K M 7 X</Text>
                </View>
                <Input
                  value={captchaAnswer}
                  onChangeText={setCaptchaAnswer}
                  placeholder="Escribe los caracteres"
                  // TODO: SvgCaptchaField + API reload
                />
              </View>

              <View>
                <Label>Correo electrónico</Label>
                <Input
                  value={email}
                  onChangeText={setEmail}
                  placeholder="tu@email.com"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  editable={!done}
                />
              </View>
            </CardContent>

            <CardFooter>
              <Button
                onPress={() => {
                  // TODO: POST /api/auth/forgot-password
                  setDone(true);
                }}
                disabled={done}
              >
                Enviar enlace
              </Button>

              {done ? (
                <View style={styles.doneBox}>
                  <Text style={styles.doneText}>
                    Si el correo está registrado en una cuenta activa, recibirás un enlace
                    para restablecer la contraseña.
                  </Text>
                  <Button variant="outline" onPress={() => onNavigate('login')}>
                    Volver al inicio de sesión
                  </Button>
                  <Button variant="ghost" onPress={() => onNavigate('recuperarNueva')}>
                    Demo: nueva contraseña
                  </Button>
                </View>
              ) : null}
            </CardFooter>
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
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
  },
  themePlaceholder: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  content: {
    paddingHorizontal: spacing.lg,
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
  captchaBox: { gap: 8 },
  captchaLabel: {
    fontFamily: fonts.medium,
    fontSize: 13,
    color: colors.foreground,
  },
  captchaImage: {
    height: 56,
    borderRadius: radius.md,
    backgroundColor: colors.secondary,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  captchaCode: {
    fontFamily: fonts.bold,
    fontSize: 22,
    letterSpacing: 8,
    color: colors.primary,
  },
  doneBox: {
    gap: 10,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 16,
    marginTop: 8,
  },
  doneText: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.mutedForeground,
    textAlign: 'center',
    lineHeight: 20,
  },
});
