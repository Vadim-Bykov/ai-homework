import { Stack } from "expo-router";

export default function BreedStack() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="breed/[name]" />
    </Stack>
  );
}
