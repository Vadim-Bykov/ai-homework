import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getAllBreeds } from "@/services/DogApi";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
} from "react-native";

export default function BreedListScreen() {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedBreeds = await getAllBreeds();
        setBreeds(fetchedBreeds);
      } catch (e) {
        setError("Failed to fetch breeds. Please try again.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  if (isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
        <ThemedText>Loading breeds...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText type="defaultSemiBold" style={{ color: "red" }}>
          {error}
        </ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <FlatList
        data={breeds}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <Link href={`/breed/${item}`} asChild>
            <Pressable>
              <ThemedView style={styles.itemContainer}>
                <ThemedText type="subtitle" style={styles.breedText}>
                  {item}
                </ThemedText>
              </ThemedView>
            </Pressable>
          </Link>
        )}
        ListHeaderComponent={() => (
          <ThemedView style={styles.header}>
            <ThemedText type="title">Dog Breeds</ThemedText>
          </ThemedView>
        )}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    padding: 20,
    alignItems: "center",
  },
  itemContainer: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  breedText: {
    textTransform: "capitalize",
  },
});
