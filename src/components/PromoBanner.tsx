import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const PromoBanner = () => {
  return (
    <View style={styles.container}>
      <View style={styles.badge}>
        <Text style={styles.badgeText}>✨ NEW SUBSCRIBER OFFER</Text>
      </View>
      <Text style={styles.title}>Get 25% Off</Text>
      <Text style={styles.subtitle}>On your first subscription order</Text>
      <View style={styles.giftContainer}>
        <Text style={styles.gift}>🎁</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Subscribe Now ›</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#D97741',
    borderRadius: 16,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 24,
    position: 'relative',
    overflow: 'hidden',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginBottom: 12,
  },
  badgeText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: '#fff',
    marginBottom: 16,
    opacity: 0.95,
  },
  giftContainer: {
    position: 'absolute',
    top: 24,
    right: 24,
  },
  gift: {
    fontSize: 64,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
    alignSelf: 'flex-start',
  },
  buttonText: {
    color: '#D97741',
    fontSize: 15,
    fontWeight: '700',
  },
});

export default PromoBanner;
