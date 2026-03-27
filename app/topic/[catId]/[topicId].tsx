import { Stack, useLocalSearchParams } from "expo-router";
import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { TipCard } from "@/components/TipCard";
import { useProductivity } from "@/context/ProductivityContext";
import { useThemeColor } from "@/hooks/use-theme-color";

export default function TopicDetailScreen() {
  const { catId, topicId } = useLocalSearchParams<{
    catId: string;
    topicId: string;
  }>();
  const { data } = useProductivity();

  const categoryIndex = parseInt(catId || "0");
  const topicIndex = parseInt(topicId || "0");

  const category = data[categoryIndex];
  const topic = category?.topics[topicIndex];

  const backgroundColor = useThemeColor({}, "background");

  if (!topic) {
    return (
      <ThemedView
        style={[styles.container, { backgroundColor }, styles.center]}
      >
        <Stack.Screen options={{ title: "Coming Soon" }} />
        <ThemedView style={styles.emptyContainer}>
          <ThemedText style={styles.emptyText}>Data is coming soon</ThemedText>
          <ThemedText style={styles.emptySubtext}>
            This topic is currently being researched. We'll have it ready for
            you shortly!
          </ThemedText>
        </ThemedView>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <Stack.Screen options={{ title: topic.title }} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Animated.View entering={FadeIn.duration(800)}>
          <TipCard tip={topic} index={0} />
        </Animated.View>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  center: {
    justifyContent: "center",
    alignItems: "center",
  },
  scrollContent: {
    paddingVertical: 16,
  },
  emptyContainer: {
    paddingHorizontal: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 22,
    fontWeight: "700",
    color: "#0a7ea4",
    marginBottom: 8,
    textAlign: "center",
  },
  emptySubtext: {
    fontSize: 16,
    opacity: 0.5,
    textAlign: "center",
    lineHeight: 22,
  },
});
