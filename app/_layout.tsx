import "../global.css";

import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#e11d48",
        },
        headerTintColor: "#fecdd3",
        headerTitleStyle: {
          fontWeight: "bold",
          color: "white",
        },
      }}
    >
      <Stack.Screen name="index" options={{ title: "Remediário" }} />
      <Stack.Screen name="add" options={{ title: "Adicionar remédio" }} />
    </Stack>
  );
}
