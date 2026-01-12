import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const DeliveryBanner = () => {
  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.content}>
        <View style={styles.iconContainer}>
          <Text style={styles.icon}>📦</Text>
        </View>
        <View style={styles.textContainer}>
          <View style={styles.headerRow}>
            <Text style={styles.title}>Out for Delivery</Text>
            <Text style={styles.locationIcon}>📍</Text>
          </View>
          <Text style={styles.driverText}>Rajesh Kumar is on the way</Text>
          <View style={styles.timeRow}>
            <Text style={styles.timeIcon}>🕐</Text>
            <Text style={styles.timeText}>15-20 min</Text>
          </View>
        </View>
        <Text style={styles.arrow}>›</Text>
      </View>
      <View style={styles.progressBar}>
        <View style={styles.progressFill} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  textContainer: {
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 4,
  },
  locationIcon: {
    fontSize: 12,
  },
  driverText: {
    fontSize: 13,
    color: '#666',
    marginBottom: 4,
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timeIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  timeText: {
    fontSize: 13,
    color: '#FF6B35',
    fontWeight: '600',
  },
  arrow: {
    fontSize: 24,
    color: '#999',
  },
  progressBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    width: '70%',
    backgroundColor: '#FF6B35',
    borderRadius: 3,
  },
});

export default DeliveryBanner;
