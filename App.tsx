import React, { useCallback, useState } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useFonts } from 'expo-font';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ScreenName } from './src/navigation/types';
import { LoginScreen } from './src/screens/LoginScreen';
import { RegisterScreen } from './src/screens/RegisterScreen';
import { RecoverScreen } from './src/screens/RecoverScreen';
import { NewPasswordScreen } from './src/screens/NewPasswordScreen';
import { ShopScreen } from './src/screens/ShopScreen';
import { VerifyEmailScreen } from './src/screens/VerifyEmailScreen';
import { BannedScreen } from './src/screens/BannedScreen';
import { AccessBlockedScreen } from './src/screens/AccessBlockedScreen';
import { UnauthorizedScreen } from './src/screens/UnauthorizedScreen';
import { colors } from './src/theme/colors';

export default function App() {
  const [screen, setScreen] = useState<ScreenName>('login');

  const [fontsLoaded] = useFonts({
    Exo_400Regular: require('./assets/fonts/Exo-Regular.ttf'),
    Exo_500Medium: require('./assets/fonts/Exo-Medium.ttf'),
    Exo_600SemiBold: require('./assets/fonts/Exo-SemiBold.ttf'),
    Exo_700Bold: require('./assets/fonts/Exo-Bold.ttf'),
    Molgan_400Regular: require('./assets/fonts/MolganRegular.otf'),
  });

  const onNavigate = useCallback((next: ScreenName) => {
    // TODO: sustituir por React Navigation / deep links reales
    setScreen(next);
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color={colors.accent} />
      </View>
    );
  }

  let content: React.ReactNode;
  switch (screen) {
    case 'registro':
      content = <RegisterScreen onNavigate={onNavigate} />;
      break;
    case 'recuperar':
      content = <RecoverScreen onNavigate={onNavigate} />;
      break;
    case 'recuperarNueva':
      content = <NewPasswordScreen onNavigate={onNavigate} />;
      break;
    case 'shop':
      content = <ShopScreen onNavigate={onNavigate} />;
      break;
    case 'verificarEmail':
      content = <VerifyEmailScreen onNavigate={onNavigate} />;
      break;
    case 'cuentaSuspendida':
      content = <BannedScreen onNavigate={onNavigate} />;
      break;
    case 'accesoRestringido':
      content = <AccessBlockedScreen onNavigate={onNavigate} />;
      break;
    case 'unauthorized':
      content = <UnauthorizedScreen onNavigate={onNavigate} />;
      break;
    case 'login':
    default:
      content = <LoginScreen onNavigate={onNavigate} />;
      break;
  }

  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      {content}
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  loader: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.primary,
  },
});
