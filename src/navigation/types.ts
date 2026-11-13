export type ScreenName =
  | 'login'
  | 'registro'
  | 'recuperar'
  | 'recuperarNueva'
  | 'shop'
  | 'verificarEmail'
  | 'cuentaSuspendida'
  | 'accesoRestringido'
  | 'unauthorized';

export type NavigateFn = (screen: ScreenName) => void;
