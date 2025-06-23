import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getBreedImages } from "@/services/DogApi";
import { Stack, useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
} from "react-native";

export default function BreedGalleryScreen() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cardColor = useThemeColor({}, "card");

  const fetchImages = useCallback(async () => {
    if (!name) return;
    try {
      setError(null);
      const fetchedImages = await getBreedImages(name);
      setImages(fetchedImages);
    } catch (e) {
      setError("Failed to fetch images.");
      console.error(e);
    }
  }, [name]);

  useEffect(() => {
    setIsLoading(true);
    fetchImages().finally(() => setIsLoading(false));
  }, [fetchImages]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchImages();
    setIsRefreshing(false);
  }, [fetchImages]);

  if (isLoading) {
    return (
      <ThemedView style={styles.center}>
        <ActivityIndicator size="large" />
        <ThemedText>Loading images for {name}...</ThemedText>
      </ThemedView>
    );
  }

  if (error && images.length === 0) {
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
          <Image
            source={{ uri: item }}
            style={[styles.image, { backgroundColor: cardColor }]}
          />
        )}
        contentContainerStyle={styles.listContent}
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
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
