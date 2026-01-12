import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

interface CategoryCardProps {
  title: string;
  subtitle: string;
  backgroundColor: string;
  accentColor: string;
  emoji: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  title,
  subtitle,
  backgroundColor,
  accentColor,
  emoji,
}) => {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor }]}>
      <View style={styles.content}>
        <Text style={styles.emoji}>{emoji}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.subtitle}>{subtitle}</Text>
      </View>
      <View style={[styles.accent, { backgroundColor: accentColor }]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    minHeight: 160,
    position: 'relative',
    overflow: 'hidden',
  },
  content: {
    flex: 1,
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: '#666',
    fontWeight: '400',
  },
  accent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
  },
});

export default CategoryCard;
