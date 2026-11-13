import React from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { spacing } from '../../theme/spacing';
import { NavigateFn } from '../../navigation/types';

type Props = {
  onNavigate: NavigateFn;
  cartCount?: number;
  onOpenCart?: () => void;
};

export function ShopHeader({ onNavigate, cartCount = 0, onOpenCart }: Props) {
  return (
    <View style={styles.header}>
      <Pressable style={styles.brand} onPress={() => onNavigate('shop')}>
        <Image
          source={require('../../../assets/brand/km-cero-logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <View>
          <Text style={styles.brandName}>
            KM CER<Text style={styles.accent}>O</Text>
          </Text>
          <Text style={styles.tagline}>Aseguramos Tu Viaje.</Text>
        </View>
      </Pressable>

      <View style={styles.actions}>
        <Pressable style={styles.ghostBtn} onPress={() => onNavigate('login')}>
          <Text style={styles.ghostText}>Iniciar sesión</Text>
        </Pressable>
        {/* TODO: ThemeToggle */}
        <Pressable style={styles.iconBtn} onPress={onOpenCart}>
          <Ionicons name="cart-outline" size={20} color={colors.foreground} />
          {cartCount > 0 ? (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          ) : null}
        </Pressable>
        <Pressable
          style={styles.registerBtn}
          onPress={() => onNavigate('registro')}
        >
          <Text style={styles.registerText}>Crear cuenta</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    height: 60,
    paddingHorizontal: spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colors.primaryForeground,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  brand: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  logo: { width: 40, height: 40 },
  brandName: {
    fontFamily: fonts.brand,
    fontSize: 14,
    fontWeight: '700',
    color: colors.foreground,
  },
  accent: { color: colors.accent, fontWeight: '800' },
  tagline: {
    fontFamily: fonts.brand,
    fontSize: 10,
    color: colors.foreground,
  },
  actions: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  ghostBtn: { paddingHorizontal: 8, paddingVertical: 6 },
  ghostText: {
    fontFamily: fonts.medium,
    fontSize: 12,
    color: colors.foreground,
  },
  iconBtn: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: 2,
    right: 2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: colors.accent,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 3,
  },
  badgeText: {
    fontFamily: fonts.bold,
    fontSize: 9,
    color: colors.white,
  },
  registerBtn: {
    backgroundColor: colors.primary,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderRadius: radius.md,
  },
  registerText: {
    fontFamily: fonts.semibold,
    fontSize: 12,
    color: colors.primaryForeground,
  },
});
