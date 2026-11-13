import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthPageShell } from '../components/auth/AuthPageShell';
import { GoogleSignInButton } from '../components/auth/GoogleSignInButton';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardFooter, CardHeader } from '../components/ui/Card';
import { Input } from '../components/ui/Input';
import { Label } from '../components/ui/Label';
import { NavigateFn } from '../navigation/types';
import { colors } from '../theme/colors';
import { fonts } from '../theme/typography';

type Props = { onNavigate: NavigateFn };

export function LoginScreen({ onNavigate }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <AuthPageShell
      brandingTagline="La evolución está aquí. Sin dejar de ser cubano. Sin dejar de ser seguro."
      footerText="© 2026 TM-NexGen. Todos los derechos reservados."
      onBack={() => onNavigate('shop')}
    >
      <Card>
        <CardHeader>
          <Text style={styles.title}>Bienvenido de nuevo</Text>
          <Text style={styles.desc}>Ingresa tus credenciales para acceder a tu cuenta</Text>
        </CardHeader>

        <CardContent>
          <View>
            <Label>Correo electrónico</Label>
            <Input
              value={email}
              onChangeText={setEmail}
              placeholder="tu@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              // TODO: validación zod / react-hook-form
            />
          </View>

          <View>
            <View style={styles.passwordRow}>
              <Label style={{ marginBottom: 0 }}>Contraseña</Label>
              <Pressable onPress={() => onNavigate('recuperar')}>
                <Text style={styles.forgot}>¿Olvidaste tu contraseña?</Text>
              </Pressable>
            </View>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
              // TODO: submit login mutation + captcha dialog
              rightElement={
                <Pressable onPress={() => setShowPassword((v) => !v)} hitSlop={8}>
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
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
              // TODO: login real + captcha + redirectAfterAuth
              onNavigate('shop');
            }}
          >
            Iniciar sesión
          </Button>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.or}>O</Text>
            <View style={styles.line} />
          </View>

          <GoogleSignInButton
            mode="login"
            onPress={() => {
              // TODO: Google OAuth login
              onNavigate('shop');
            }}
          />

          <Text style={styles.footerPrompt}>
            ¿No tienes cuenta?{' '}
            <Text style={styles.link} onPress={() => onNavigate('registro')}>
              Regístrate aquí
            </Text>
          </Text>
        </CardFooter>
      </Card>

      {/* Demo nav a pantallas de estado */}
      <View style={styles.demoLinks}>
        <Text style={styles.demoTitle}>Demo pantallas estado</Text>
        <Pressable onPress={() => onNavigate('verificarEmail')}>
          <Text style={styles.demoLink}>Verificar email</Text>
        </Pressable>
        <Pressable onPress={() => onNavigate('cuentaSuspendida')}>
          <Text style={styles.demoLink}>Cuenta suspendida</Text>
        </Pressable>
        <Pressable onPress={() => onNavigate('accesoRestringido')}>
          <Text style={styles.demoLink}>Acceso restringido</Text>
        </Pressable>
        <Pressable onPress={() => onNavigate('unauthorized')}>
          <Text style={styles.demoLink}>Unauthorized</Text>
        </Pressable>
      </View>
    </AuthPageShell>
  );
}

const styles = StyleSheet.create({
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
  },
  passwordRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  forgot: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.accent,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  line: { flex: 1, height: 1, backgroundColor: colors.border },
  or: { fontFamily: fonts.regular, fontSize: 12, color: colors.mutedForeground },
  footerPrompt: {
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.mutedForeground,
    textAlign: 'center',
  },
  link: { color: colors.accent, fontFamily: fonts.semibold },
  demoLinks: {
    marginTop: 16,
    gap: 6,
    alignItems: 'center',
  },
  demoTitle: {
    fontFamily: fonts.medium,
    fontSize: 11,
    color: 'rgba(255,255,255,0.7)',
    marginBottom: 2,
  },
  demoLink: {
    fontFamily: fonts.regular,
    fontSize: 12,
    color: colors.accent,
    textDecorationLine: 'underline',
  },
});
