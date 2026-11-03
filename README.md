# Uniwind: runtime theme desyncs from config

Minimal reproduction for a Uniwind (1.13.1) bug: `Uniwind.setTheme('light')` is called and `Uniwind.currentTheme` reports `light`, but every className resolves against the **dark** theme.

## Run

1. Put the Android emulator (or device) in system **dark mode**.
2. `pnpm install`
3. `pnpm android`

Expected: white background, black text. Actual: black background, white text, while the screen says `Uniwind.currentTheme: light`.

## Why

Uniwind reads `Appearance.getColorScheme()` twice:

- `core/native/runtime.ts` when the runtime module is evaluated. Expo's startup modules import `react-native`, which Uniwind redirects to its components, so this happens before the app entry runs. On a dark device it captures `dark`.
- `UniwindConfigBuilder` when `Uniwind` is first accessed, here in `app/_layout.tsx`. By then `index.ts` has forced the scheme to `light`, so the config captures `light`.

`setTheme('light')` sees no change (`prevTheme === 'light'`), so `onThemeChange()` never runs and `runtime.currentThemeName` stays `dark`.

In production Android apps the same thing happens without the `Appearance.setColorScheme('light')` call. The bundle starts before the Activity exists, `AppearanceModule.getColorScheme()` falls back to the application context (system: `dark`), then the Activity resumes with `MODE_NIGHT_NO` and reports `light`.

## Fix

```diff
 // src/core/config/config.native.ts
 constructor() {
     super()
+    UniwindStore.runtime.currentThemeName = this.currentTheme
 }
```
