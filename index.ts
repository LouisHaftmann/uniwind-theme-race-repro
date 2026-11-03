import { Appearance } from 'react-native'

// Before this line runs, Expo's startup modules already imported react-native, which loaded
// Uniwind's runtime. On a device in dark mode it captured "dark".
// Forcing light here changes the scheme before Uniwind's config is constructed (in app/_layout).
// On Android the same happens without this line, when the Activity reports light after the bundle
// started evaluating.
Appearance.setColorScheme('light')

require('expo-router/entry')
