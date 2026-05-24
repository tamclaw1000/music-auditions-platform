import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: '#07111f' },
        headerTintColor: '#eef4ff',
        contentStyle: { backgroundColor: '#07111f' },
      }}
    >
      <Stack.Screen name="index" options={{ title: 'Music Auditions' }} />
      <Stack.Screen name="musicians" options={{ title: 'Musicians' }} />
      <Stack.Screen name="organizations" options={{ title: 'Organizations' }} />
    </Stack>
  );
}
