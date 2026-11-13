/**
 * Tokens de color del handoff (app/globals.css — modo light).
 * oklch convertidos a hex aproximados; accent = #FE6E00 (usado en el handoff).
 */
export const colors = {
  background: '#F8F9FB',
  foreground: '#1A1B2E',
  card: '#FFFFFF',
  cardForeground: '#1A1B2E',
  primary: '#1A1B2E',
  primaryForeground: '#F8F9FB',
  secondary: '#F0F2F5',
  secondaryForeground: '#1A1B2E',
  muted: '#EBEDF0',
  mutedForeground: '#6B6D80',
  accent: '#FE6E00',
  accentForeground: '#FFFFFF',
  destructive: '#C43C2C',
  destructiveForeground: '#FAFAFA',
  border: '#E2E5EA',
  input: '#E2E5EA',
  ring: '#D97706',
  white: '#FFFFFF',
  black: '#000000',
  overlay: 'rgba(0,0,0,0.55)',
  overlayLight: 'rgba(26,27,46,0.15)',
  cardGlass: 'rgba(248,249,251,0.92)',
  success: '#16A34A',
  warning: '#D97706',
  star: '#FACC15',
  starEmpty: '#D1D5DB',
  emerald: '#047857',
} as const;

export const radius = {
  sm: 6,
  md: 8,
  lg: 10,
  xl: 14,
  full: 9999,
} as const;
