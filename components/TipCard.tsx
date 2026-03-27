import React from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { ThemedText } from './themed-text';
import { ThemedView } from './themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export interface Tip {
  title: string;
  overview: string;
  benefits: string[];
  expertTip: string;
}

interface TipCardProps {
  tip: Tip;
  index: number;
}

export function TipCard({ tip, index }: TipCardProps) {
  const shadowColor = useThemeColor({ light: '#000', dark: '#fff' }, 'text');
  const borderColor = useThemeColor({ light: '#eee', dark: '#333' }, 'icon');

  return (
    <Animated.View 
      entering={FadeInDown.delay(index * 100).duration(600).springify()}
      style={[
        styles.container, 
        { 
          shadowColor,
          borderColor,
        }
      ]}
    >
      <ThemedView style={styles.content}>
        <ThemedText type="subtitle" style={styles.title}>{tip.title}</ThemedText>
        <ThemedText style={styles.overview}>{tip.overview}</ThemedText>
        
        <View style={styles.benefitsContainer}>
          {tip.benefits.map((benefit, i) => (
            <View key={i} style={styles.benefitTag}>
              <ThemedText style={styles.benefitText}>• {benefit}</ThemedText>
            </View>
          ))}
        </View>

        <View style={styles.expertTipContainer}>
          <ThemedText type="defaultSemiBold" style={styles.expertTipHeader}>💡 Expert Tip</ThemedText>
          <ThemedText style={styles.expertTipText}>{tip.expertTip}</ThemedText>
        </View>
      </ThemedView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: 'transparent',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 3,
    overflow: 'hidden',
  },
  content: {
    padding: 20,
    borderRadius: 20,
  },
  title: {
    marginBottom: 8,
    color: '#0a7ea4',
  },
  overview: {
    fontSize: 15,
    opacity: 0.8,
    lineHeight: 22,
    marginBottom: 16,
  },
  benefitsContainer: {
    marginBottom: 16,
  },
  benefitTag: {
    marginBottom: 4,
  },
  benefitText: {
    fontSize: 14,
    opacity: 0.9,
  },
  expertTipContainer: {
    padding: 12,
    borderRadius: 12,
    backgroundColor: 'rgba(10, 126, 164, 0.1)',
    borderLeftWidth: 4,
    borderLeftColor: '#0a7ea4',
  },
  expertTipHeader: {
    fontSize: 14,
    marginBottom: 4,
    color: '#0a7ea4',
  },
  expertTipText: {
    fontSize: 14,
    fontStyle: 'italic',
    lineHeight: 20,
  },
});
