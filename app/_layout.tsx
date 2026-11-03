import { Stack } from 'expo-router'
import { Uniwind } from 'uniwind'
import '../global.css'

Uniwind.setTheme('light')

export default function Layout() {
  return <Stack screenOptions={{ headerShown: false }} />
}
