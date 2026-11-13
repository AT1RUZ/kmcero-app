import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Pressable,
  ScrollView,
  useWindowDimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, radius } from '../../theme/colors';
import { fonts } from '../../theme/typography';
import { spacing } from '../../theme/spacing';

type Props = {
  children: React.ReactNode;
  brandingTagline: string;
  footerText: string;
  onBack?: () => void;
  showBrandingPanel?: boolean;
};

export function AuthPageShell({
  children,
  brandingTagline,
  footerText,
  onBack,
  showBrandingPanel = true,
}: Props) {
  const { width } = useWindowDimensions();
  const isWide = width >= 900;

  return (
    <View style={styles.root}>
      <ImageBackground
        source={require('../../../assets/background/kmcero.jpg')}
        style={StyleSheet.absoluteFill}
        resizeMode="cover"
      >
        <View style={styles.overlay} />
      </ImageBackground>

      <SafeAreaView style={styles.safe} edges={['top', 'bottom']}>
        <View style={[styles.row, isWide && styles.rowWide]}>
          {isWide && showBrandingPanel ? (
            <View style={styles.brandPanel}>
              <View style={styles.logoBox}>
                <ImageBackground
                  source={require('../../../assets/brand/km-cero-logo.png')}
                  style={styles.logo}
                  resizeMode="contain"
                />
              </View>
              <Text style={styles.brandTitle}>
                KM CER<Text style={styles.brandAccent}>O</Text>
              </Text>
              <Text style={styles.tagline}>{brandingTagline}</Text>
            </View>
          ) : null}

          <View style={styles.formCol}>
            <View style={styles.headerBar}>
              <Pressable
                onPress={onBack}
                style={({ pressed }) => [styles.backBtn, pressed && { opacity: 0.85 }]}
              >
                <Ionicons name="arrow-back" size={16} color={colors.foreground} />
                <Text style={styles.backText}>Volver atrás</Text>
              </Pressable>
              {/* TODO: ThemeToggle real (light/dark) */}
              <View style={styles.themePlaceholder}>
                <Ionicons name="sunny-outline" size={18} color={colors.primaryForeground} />
              </View>
            </View>

            <ScrollView
              contentContainerStyle={styles.scrollContent}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.formWrap}>{children}</View>
            </ScrollView>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>{footerText}</Text>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.primary },
  overlay: {
    ...(StyleSheet.absoluteFill as object),
    backgroundColor: colors.overlayLight,
  },
  safe: { flex: 1 },
  row: { flex: 1 },
  rowWide: { flexDirection: 'row' },
  brandPanel: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing['3xl'],
  },
  logoBox: {
    width: 120,
    height: 120,
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    padding: 16,
    marginBottom: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: { width: 90, height: 90 },
  brandTitle: {
    fontFamily: fonts.brand,
    fontSize: 36,
    color: colors.white,
    fontWeight: '800',
    marginBottom: 16,
  },
  brandAccent: { color: colors.accent, fontWeight: '800' },
  tagline: {
    fontFamily: fonts.regular,
    fontSize: 18,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 26,
    maxWidth: 360,
  },
  formCol: { flex: 1, minHeight: 0 },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  backBtn: {
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
  themePlaceholder: {
    width: 36,
    height: 36,
    borderRadius: radius.md,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    paddingHorizontal: spacing.lg,
    paddingBottom: spacing['4xl'],
    paddingTop: spacing.lg,
  },
  formWrap: {
    width: '100%',
    maxWidth: 420,
    alignSelf: 'center',
  },
  footer: {
    paddingVertical: 6,
    backgroundColor: 'rgba(240,242,245,0.1)',
  },
  footerText: {
    textAlign: 'center',
    fontFamily: fonts.regular,
    fontSize: 11,
    color: 'rgba(248,249,251,0.85)',
  },
});
