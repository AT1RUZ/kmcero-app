# KM CERO — UI visual (Expo)

App React Native + Expo (Expo Go) que replica el handoff visual de autenticación y tienda KM CERO. **Solo UI**: sin backend, auth real ni lógica de negocio.

## Pantallas

- Login
- Registro
- Recuperar contraseña
- Nueva contraseña
- Shop (catálogo, destacados, filtros, modal producto, carrito)
- Verificar email
- Cuenta suspendida
- Acceso restringido
- Unauthorized

La navegación es mock (estado en `App.tsx`) para poder recorrer todas las vistas.

## Cómo correr

```bash
pnpm install --prefer-offline
pnpm start
```

Escanea el QR con **Expo Go**, o pulsa `w` para web.

Typecheck:

```bash
pnpm typecheck
```

## Build Android (EAS)

Requiere cuenta de Expo y EAS CLI (`npx eas-cli` o `npm i -g eas-cli`).

```bash
npx eas-cli login
```

Perfiles definidos en `eas.json`:

```bash
# Development client (internal)
npx eas-cli build -p android --profile development

# Preview → APK instalable
npx eas-cli build -p android --profile preview

# Production → AAB (Play Store)
npx eas-cli build -p android --profile production
```

La primera vez EAS pedirá configurar el `android.package` si aún no está en `app.json`.

## Diseño

Paleta, tipografías (Exo + Molgan), copy y layout tomados de `handoff-visual-login-shop`.
