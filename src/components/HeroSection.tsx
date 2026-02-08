import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const HeroSection = () => {
  return (
    <View style={styles.container}>
      {/* Badge Pill */}
      <View style={styles.badgeContainer}>
        <Text style={styles.badgeIcon}>✓</Text>
        <Text style={styles.badgeText}>No Wet Kitchen Needed • Farm to Table in 24 Hours</Text>
      </View>

      {/* Main Heading */}
      <Text style={styles.heading}>
        Nutritious Meals from Local Farms • 20min to Cook
      </Text>

      {/* Subtitle */}
      <Text style={styles.subtitle}>
        Quick, nutritious meals that are easy to prepare. Consistency is key to experiencing the health benefits of nutrient-rich meals sourced directly from farmers we trust.
      </Text>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statPill}>
          <View style={[styles.statDot, { backgroundColor: '#FF6B35' }]} />
          <Text style={styles.statNumber}>500+</Text>
          <Text style={styles.statLabel}>Happy Customers</Text>
        </View>
        <View style={styles.statPill}>
          <View style={[styles.statDot, { backgroundColor: '#4CAF50' }]} />
          <Text style={styles.statNumber}>50+</Text>
          <Text style={styles.statLabel}>Partner Farms</Text>
        </View>
        <View style={styles.statPill}>
          <View style={[styles.statDot, { backgroundColor: '#C9A66B' }]} />
          <Text style={styles.statNumber}>100%</Text>
          <Text style={styles.statLabel}>Organic</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 20,
    paddingTop: 28,
    paddingBottom: 24,
    alignItems: 'center',
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FF6B35',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 20,
  },
  badgeIcon: {
    fontSize: 14,
    color: '#4CAF50',
    marginRight: 6,
    fontWeight: '700',
  },
  badgeText: {
    fontSize: 12,
    color: '#FF6B35',
    fontWeight: '600',
  },
  heading: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1a1a1a',
    textAlign: 'center',
    lineHeight: 34,
    marginBottom: 16,
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: 24,
    paddingHorizontal: 8,
  },
  statsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#f0ece8',
  },
  statDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    marginRight: 6,
  },
  statNumber: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 3,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
  },
});

export default HeroSection;
