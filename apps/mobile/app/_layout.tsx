import { Stack } from 'expo-router';

export default function RootLayout() {
  return <Stack screenOptions={{ headerStyle: { backgroundColor: '#07111f' }, headerTintColor: '#eef4ff', contentStyle: { backgroundColor: '#07111f' } }} />;
}
