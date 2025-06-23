import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { getBreedImages } from "@/services/DogApi";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet } from "react-native";

export default function BreedGalleryScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!name) return;

    const fetchImages = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const fetchedImages = await getBreedImages(name);
        setImages(fetchedImages);
      } catch (e) {
        setError("Failed to fetch images.");
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [name]);

  if (isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
        <ThemedText>Loading images for {name}...</ThemedText>
      </ThemedView>
    );
  }

  if (error) {
    return (
      <ThemedView style={styles.center}>
        <ThemedText style={{ color: "red" }}>{error}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <Stack.Screen
        options={{
          title: name
            ? `${name.charAt(0).toUpperCase() + name.slice(1)}`
            : "Gallery",
        }}
      />
      <FlatList
        data={images}
        keyExtractor={(item) => item}
        numColumns={2}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={styles.image} />
        )}
        contentContainerStyle={styles.listContent}
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
  listContent: {
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    margin: 5,
    borderRadius: 10,
  },
});
