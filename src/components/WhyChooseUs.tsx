import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const features = [
  {
    icon: '🌿',
    title: 'Farm Direct',
    description: 'Sourced directly from local farms we manage and trust for maximum freshness.',
    bgColor: '#FFF5F0',
  },
  {
    icon: '♥',
    title: 'Nutrition First',
    description: 'Every meal is designed by nutritionists to support your health journey.',
    bgColor: '#FFF5F0',
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'From farm to your table in 24 hours. Track your order in real-time.',
    bgColor: '#FFF5F0',
  },
  {
    icon: '🏅',
    title: '100% Organic',
    description: 'Certified organic ingredients with complete transparency on sourcing.',
    bgColor: '#FFF5F0',
  },
];

const WhyChooseUs = () => {
  return (
    <View style={styles.container}>
      {/* Section Badge */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>Why Choose Us</Text>
      </View>

      {/* Heading */}
      <Text style={styles.heading}>Why Choose MoyoClub</Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        We connect you directly with local farmers to deliver the freshest, most nutritious meals possible.
      </Text>

      {/* Feature Cards - Horizontal Scroll for mobile */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.cardsContainer}
        snapToInterval={200}
        decelerationRate="fast"
      >
        {features.map((feature, index) => (
          <View key={index} style={styles.featureCard}>
            <View style={[styles.iconContainer, { backgroundColor: feature.bgColor }]}>
              <Text style={styles.featureIcon}>{feature.icon}</Text>
            </View>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureDescription}>{feature.description}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFAF7',
    paddingTop: 32,
    paddingBottom: 28,
    alignItems: 'center',
  },
  badge: {
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 6,
    marginBottom: 16,
  },
  badgeText: {
    fontSize: 13,
    color: '#FF6B35',
    fontWeight: '600',
  },
  heading: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    marginBottom: 10,
    letterSpacing: -0.3,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  cardsContainer: {
    paddingHorizontal: 16,
    gap: 12,
  },
  featureCard: {
    width: 180,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f0ece8',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  featureIcon: {
    fontSize: 26,
  },
  featureTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
    textAlign: 'center',
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
});

export default WhyChooseUs;
