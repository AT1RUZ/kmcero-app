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

export function RegisterScreen({ onNavigate }: Props) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [terms, setTerms] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <AuthPageShell
      brandingTagline="Bienvenido. Has llegado al lugar indicado para comprar lo que desees."
      footerText="© 2026 TM-NextGen. Todos los derechos reservados."
      onBack={() => onNavigate('login')}
    >
      <Card>
        <CardHeader>
          <Text style={styles.title}>Crear una cuenta</Text>
          <Text style={styles.desc}>Únete y olvida las colas.</Text>
        </CardHeader>

        <CardContent>
          <View>
            <Label>Nombre completo</Label>
            <Input
              value={name}
              onChangeText={setName}
              placeholder="Tu nombre"
              // TODO: validación registerSchema
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
            />
          </View>
          <View>
            <Label>Contraseña</Label>
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="••••••••"
              secureTextEntry={!showPassword}
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
          <View>
            <Label>Confirmar contraseña</Label>
            <Input
              value={confirm}
              onChangeText={setConfirm}
              placeholder="••••••••"
              secureTextEntry={!showConfirm}
              rightElement={
                <Pressable onPress={() => setShowConfirm((v) => !v)} hitSlop={8}>
                  <Ionicons
                    name={showConfirm ? 'eye-off-outline' : 'eye-outline'}
                    size={18}
                    color={colors.mutedForeground}
                  />
                </Pressable>
              }
            />
          </View>

          <Pressable style={styles.termsRow} onPress={() => setTerms((v) => !v)}>
            <View style={[styles.checkbox, terms && styles.checkboxOn]}>
              {terms ? <Ionicons name="checkmark" size={12} color={colors.white} /> : null}
            </View>
            <Text style={styles.termsText}>
              Acepto los Términos y Condiciones Política de Privacidad
            </Text>
          </Pressable>
        </CardContent>

        <CardFooter>
          <Button
            onPress={() => {
              // TODO: register mutation + captcha dialog + login
              onNavigate('shop');
            }}
          >
            Crear cuenta
          </Button>

          <View style={styles.divider}>
            <View style={styles.line} />
            <Text style={styles.or}>O</Text>
            <View style={styles.line} />
          </View>

          <GoogleSignInButton
            mode="register"
            onPress={() => {
              // TODO: Google register
              onNavigate('shop');
            }}
          />

          <Text style={styles.footerPrompt}>
            ¿Ya tienes una cuenta?{' '}
            <Text style={styles.link} onPress={() => onNavigate('login')}>
              Inicia sesión
            </Text>
          </Text>
        </CardFooter>
      </Card>
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
  termsRow: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, paddingTop: 4 },
  checkbox: {
    width: 16,
    height: 16,
    marginTop: 2,
    borderWidth: 2,
    borderColor: '#94A3B8',
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxOn: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  termsText: {
    flex: 1,
    fontFamily: fonts.regular,
    fontSize: 13,
    color: colors.foreground,
    lineHeight: 18,
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
});
