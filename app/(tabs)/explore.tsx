import { ExternalLink } from "@/components/ExternalLink";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function AboutScreen() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["top", "left", "right"]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <ThemedView style={styles.container}>
          <ThemedText type="title" style={styles.title}>
            About Dog Breed Explorer
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            <ThemedText type="defaultSemiBold">Dog Breed Explorer</ThemedText>{" "}
            is a mobile app that lets you browse, search, and view images of dog
            breeds from around the world. The app is built with Expo, React
            Native, and TypeScript, and uses the open-source{" "}
            <ExternalLink href="https://dog.ceo/dog-api/">
              Dog CEO API
            </ExternalLink>
            .
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Features
          </ThemedText>
          <View style={styles.list}>
            <ThemedText>• Browse a list of all dog breeds</ThemedText>
            <ThemedText>• View a gallery of images for each breed</ThemedText>
            <ThemedText>• Pull-to-refresh for new images</ThemedText>
            <ThemedText>• Light, dark, and system theme support</ThemedText>
            <ThemedText>• Manual theme switcher in Settings</ThemedText>
            <ThemedText>• Error and loading states</ThemedText>
          </View>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Navigation
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            Use the bottom tabs to switch between:
            {"\n"}- <ThemedText type="defaultSemiBold">Breeds</ThemedText>: List
            of all breeds and galleries
            {"\n"}- <ThemedText type="defaultSemiBold">Settings</ThemedText>:
            Theme switcher
            {"\n"}- <ThemedText type="defaultSemiBold">About</ThemedText>: This
            info screen
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Theming
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            The app supports light, dark, and system themes. Go to Settings to
            change the theme at any time.
          </ThemedText>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            AI Usage
          </ThemedText>
          <ThemedText style={styles.paragraph}>
            This app was designed, architected, and partially coded with the
            help of AI. See the AI Hands-On Report in the repo for details.
          </ThemedText>
          <ThemedText style={styles.footer}>
            Made by Bykau Vadzim, 2024
          </ThemedText>
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  scrollContent: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 24,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  title: {
    marginBottom: 16,
    fontSize: 28,
  },
  sectionTitle: {
    marginTop: 24,
    marginBottom: 8,
    fontSize: 18,
  },
  paragraph: {
    marginBottom: 8,
    fontSize: 16,
  },
  list: {
    marginLeft: 12,
    marginBottom: 8,
    gap: 2,
  },
  footer: {
    marginTop: 32,
    fontSize: 14,
    color: "#888",
    alignSelf: "center",
    width: "100%",
    textAlign: "center",
  },
});
