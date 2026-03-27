import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import { FlatList, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

import { CategoryCard } from "@/components/CategoryCard";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useProductivity } from "@/context/ProductivityContext";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function HomeScreen() {
  const backgroundColor = useThemeColor({}, "background");
  const { data, loading, error } = useProductivity();

  useEffect(() => {
    if (!loading) {
      SplashScreen.hideAsync();
    }
  }, [loading]);

  if (loading) {
    return (
      <ThemedView style={[styles.container, { backgroundColor }]}></ThemedView>
    );
  }
  if (error) {
    return (
      <ThemedView
        style={[styles.container, styles.center, { backgroundColor }]}
      >
        <ThemedText style={styles.errorText}>Failed to load tips.</ThemedText>
        <ThemedText style={styles.errorSubtext}>{error?.message}</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <StatusBar style="auto" />
      <SafeAreaView style={styles.safeArea}>
        <Animated.View entering={FadeIn.duration(1000)} style={styles.header}>
          <ThemedText type="title" style={styles.headerTitle}>
            Productivity Tips
          </ThemedText>
          <ThemedText style={styles.headerSubtitle}>
            Choose a category to start your journey
          </ThemedText>
        </Animated.View>

        <FlatList
          data={data}
          keyExtractor={(item, index) => item.category + index}
          renderItem={({ item, index }) => (
            <CategoryCard title={item.category} index={index} />
          )}
          contentContainerStyle={[
            styles.listContent,
            data.length === 0 && styles.emptyListContent,
          ]}
          ListEmptyComponent={
            <ThemedView style={styles.emptyContainer}>
              <ThemedText style={styles.emptyText}>
                Data is coming soon
              </ThemedText>
              <ThemedText style={styles.emptySubtext}>
                We're working on bringing you new productivity tips. Stay tuned!
              </ThemedText>
            </ThemedView>
          }
        />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 24,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0,0,0,0.1)",
  },
  headerTitle: {
    fontSize: 34,
    fontWeight: "800",
    letterSpacing: -1,
    color: "#0a7ea4",
  },
  headerSubtitle: {
    fontSize: 16,
    opacity: 0.6,
    marginTop: 4,
  },
  listContent: {
    paddingBottom: 40,
  },
  emptyListContent: {
    flex: 1,
    justifyContent: "center",
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 40,
    marginTop: 100,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: "700",
    color: "#0a7ea4",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 14,
    opacity: 0.5,
    textAlign: "center",
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },

  errorText: {
    fontSize: 18,
    color: "#ff4444",
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    opacity: 0.5,
    textAlign: "center",
    paddingHorizontal: 40,
  },
});
