import { ThemeType, useThemeContext } from "@/components/ThemeContext";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useColorScheme } from "@/hooks/useColorScheme";
import { Pressable, StyleSheet, View } from "react-native";

const themeOptions: { label: string; value: ThemeType }[] = [
  { label: "System", value: "system" },
  { label: "Light", value: "light" },
  { label: "Dark", value: "dark" },
];

export default function SettingsScreen() {
  const { theme, setTheme } = useThemeContext();
  const colorScheme = useColorScheme();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Settings</ThemedText>
      <ThemedText type="subtitle" style={{ marginTop: 32, marginBottom: 16 }}>
        Theme
      </ThemedText>
      <View style={styles.radioGroup}>
        {themeOptions.map((option) => (
          <Pressable
            key={option.value}
            style={styles.radioRow}
            onPress={() => setTheme(option.value)}
            accessibilityRole="radio"
            accessibilityState={{ selected: theme === option.value }}
          >
            <View
              style={[
                styles.radioOuter,
                theme === option.value && styles.radioOuterSelected,
              ]}
            >
              {theme === option.value && <View style={styles.radioInner} />}
            </View>
            <ThemedText style={styles.radioLabel}>{option.label}</ThemedText>
            {option.value === "system" && (
              <ThemedText style={styles.systemHint}>
                ({colorScheme.charAt(0).toUpperCase() + colorScheme.slice(1)})
              </ThemedText>
            )}
          </Pressable>
        ))}
      </View>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  radioGroup: {
    width: "100%",
    maxWidth: 320,
    marginTop: 8,
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  radioOuter: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "#888",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  radioOuterSelected: {
    borderColor: "#0a7ea4",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#0a7ea4",
  },
  radioLabel: {
    fontSize: 16,
  },
  systemHint: {
    marginLeft: 8,
    fontSize: 14,
    color: "#888",
  },
});
