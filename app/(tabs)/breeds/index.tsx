import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useThemeColor } from "@/hooks/useThemeColor";
import { getAllBreeds, getBreedThumbnail } from "@/services/DogApi";
import { Link } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  View,
} from "react-native";

interface BreedItem {
  name: string;
  imageUrl: string | null;
}

export default function BreedListScreen() {
  const [breeds, setBreeds] = useState<BreedItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const borderColor = useThemeColor({}, "border");

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const breedNames = await getAllBreeds();
        // Fetch thumbnails in parallel (limit concurrency if needed)
        const breedItems: BreedItem[] = await Promise.all(
          breedNames.map(async (name) => ({
            name,
            imageUrl: await getBreedThumbnail(name),
          }))
        );
        setBreeds(breedItems);
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
    <SafeAreaView style={styles.container}>
      <FlatList
        data={breeds}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <Link
            href={`/(tabs)/breeds/breed/${item.name}`}
            asChild
            key={item.name}
          >
            <Pressable>
              <ThemedView
                style={[
                  styles.itemContainer,
                  { borderBottomColor: borderColor },
                ]}
              >
                <View style={styles.row}>
                  {item.imageUrl ? (
                    <Image
                      source={{ uri: item.imageUrl }}
                      style={styles.thumbnail}
                      resizeMode="cover"
                    />
                  ) : (
                    <View
                      style={[styles.thumbnail, styles.thumbnailPlaceholder]}
                    />
                  )}
                  <ThemedText type="subtitle" style={styles.breedText}>
                    {item.name}
                  </ThemedText>
                </View>
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
    </SafeAreaView>
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
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    backgroundColor: "#fff",
    borderRadius: 12,
    marginVertical: 4,
    marginHorizontal: 8,
    shadowColor: "#000",
    shadowOpacity: 0.04,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  thumbnail: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginRight: 16,
    backgroundColor: "#eee",
  },
  thumbnailPlaceholder: {
    backgroundColor: "#ddd",
  },
  breedText: {
    textTransform: "capitalize",
    fontSize: 18,
  },
});
