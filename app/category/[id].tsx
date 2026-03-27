import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { FlatList, Pressable, StyleSheet } from "react-native";
import Animated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { useProductivity } from "@/context/ProductivityContext";
import { useThemeColor } from "@/hooks/use-theme-color";

interface TopicItemProps {
  item: any;
  index: number;
  categoryIndex: number;
  borderColor: string;
}

function TopicItem({
  item,
  index,
  categoryIndex,
  borderColor,
}: TopicItemProps) {
  const router = useRouter();
  const scale = useSharedValue(1);
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPress = () => {
    router.push({
      pathname: "/topic/[catId]/[topicId]",
      params: { catId: categoryIndex, topicId: index },
    });
  };

  return (
    <Pressable
      onPressIn={() => (scale.value = withSpring(0.98))}
      onPressOut={() => (scale.value = withSpring(1))}
      onPress={onPress}
      style={{ marginBottom: 12 }}
    >
      <Animated.View
        entering={FadeInRight.delay(index * 100).duration(500)}
        style={[styles.topicItem, { borderColor }, animatedStyle]}
      >
        <ThemedView style={styles.topicContent}>
          <ThemedText type="defaultSemiBold" style={styles.topicTitle}>
            {item.title}
          </ThemedText>
          <ThemedText style={styles.topicOverview} numberOfLines={2}>
            {item.overview}
          </ThemedText>
        </ThemedView>
      </Animated.View>
    </Pressable>
  );
}

export default function CategoryScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data } = useProductivity();
  const categoryIndex = parseInt(id || "0");
  const category = data[categoryIndex];
  const backgroundColor = useThemeColor({}, "background");
  const borderColor = useThemeColor({ light: "#eee", dark: "#333" }, "icon");

  if (!category) {
    return (
      <ThemedView
        style={[
          styles.container,
          { backgroundColor, justifyContent: "center", alignItems: "center" },
        ]}
      >
        <ThemedText>Category not found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={[styles.container, { backgroundColor }]}>
      <Stack.Screen options={{ title: category.category }} />
      <FlatList
        data={category.topics}
        keyExtractor={(item, index) => item.title + index}
        renderItem={({ item, index }) => (
          <TopicItem
            item={item}
            index={index}
            categoryIndex={categoryIndex}
            borderColor={borderColor}
          />
        )}
        contentContainerStyle={[
          styles.listContent,
          category.topics.length === 0 && styles.emptyListContent,
        ]}
        ListEmptyComponent={
          <ThemedView style={styles.emptyContainer}>
            <ThemedText style={styles.emptyText}>
              Data is coming soon
            </ThemedText>
            <ThemedText style={styles.emptySubtext}>
              New topics for {category.category} are on their way!
            </ThemedText>
          </ThemedView>
        }
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    padding: 16,
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
  topicItem: {
    marginBottom: 12,
    borderRadius: 12,
    borderWidth: 1,
    overflow: "hidden",
  },
  topicContent: {
    padding: 16,
  },
  topicTitle: {
    fontSize: 18,
    color: "#0a7ea4",
    marginBottom: 4,
  },
  topicOverview: {
    fontSize: 14,
    opacity: 0.6,
  },
});
