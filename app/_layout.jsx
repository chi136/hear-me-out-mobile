import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="terms" />
      <Stack.Screen name="assessment" />
      <Stack.Screen name="mood" />
      <Stack.Screen name="mood-history" />
    </Stack>
  );
}