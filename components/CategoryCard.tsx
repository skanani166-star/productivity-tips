import { useThemeColor } from "@/hooks/use-theme-color";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import Animated, {
  FadeInRight,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { ThemedText } from "./themed-text";
import { ThemedView } from "./themed-view";

interface CategoryCardProps {
  title: string;
  index: number;
}

export function CategoryCard({ title, index }: CategoryCardProps) {
  const router = useRouter();
  const scale = useSharedValue(1);
  const borderColor = useThemeColor({ light: "#eee", dark: "#333" }, "icon");

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const onPressIn = () => {
    scale.value = withSpring(0.95);
  };

  const onPressOut = () => {
    scale.value = withSpring(1);
  };

  const onPress = () => {
    router.push({ pathname: "/category/[id]", params: { id: index } });
  };

  return (
    <Pressable
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      onPress={onPress}
      style={{ marginVertical: 8 }}
    >
      <Animated.View
        entering={FadeInRight.delay(index * 100).duration(600)}
        style={[styles.container, { borderColor }, animatedStyle]}
      >
        <ThemedView style={styles.content}>
          <ThemedText type="subtitle" style={styles.title}>
            {title}
          </ThemedText>
          <ThemedText style={styles.viewText}>→</ThemedText>
        </ThemedView>
      </Animated.View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    overflow: "hidden",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    padding: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    color: "#0a7ea4",
  },
  viewText: {
    fontSize: 14,
    opacity: 0.6,
    fontWeight: "600",
  },
});
