import { Text, View } from 'react-native'
import { useUniwind } from 'uniwind'

export default function Index() {
  const { theme } = useUniwind()

  return (
    <View className="flex-1 items-center justify-center gap-4 bg-surface p-8">
      <Text className="text-2xl text-surface-foreground">Uniwind.currentTheme: {theme}</Text>
      <Text className="text-center text-surface-foreground">
        Expected: white background, black text (light theme).
      </Text>
    </View>
  )
}
