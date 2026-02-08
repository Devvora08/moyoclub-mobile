import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const categories = [
  {
    icon: '🍽️',
    badge: '4 categories',
    count: '700+',
    countLabel: 'Items',
    name: 'Food',
    tagline: 'Farm to Fork Goodness',
    description: 'Authentic vegetarian Indian cuisine from managed farms',
    cta: 'Explore Food',
    cardBg: '#FFF8F5',
    accentColor: '#FF6B35',
    imageBg: '#FFE8DC',
    image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop',
  },
  {
    icon: '🧋',
    badge: '',
    count: '50+',
    countLabel: 'Drinks',
    name: 'Beverages',
    tagline: 'Refresh & Energize',
    description: 'Traditional chai, lassi, fresh juices & healthy drinks',
    cta: 'Explore Beverages',
    cardBg: '#F5FAF5',
    accentColor: '#4CAF50',
    imageBg: '#E8F5E9',
    image: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&h=300&fit=crop',
  },
  {
    icon: '♡',
    badge: 'New',
    count: '20+',
    countLabel: 'Products',
    name: 'Lifestyle',
    tagline: 'Wellness & Beyond',
    description: 'Holistic wellness products for modern healthy living',
    cta: 'Explore Lifestyle',
    cardBg: '#FFF8F0',
    accentColor: '#C9A66B',
    imageBg: '#F5EDD7',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=400&h=300&fit=crop',
  },
];

const ShopByCategory = () => {
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        snapToInterval={280}
        decelerationRate="fast"
      >
        {categories.map((cat, index) => (
          <TouchableOpacity key={index} style={[styles.card, { backgroundColor: cat.cardBg }]} activeOpacity={0.8}>
            {/* Image Area */}
            <View style={[styles.imageArea, { backgroundColor: cat.imageBg }]}>
              <Image
                source={{ uri: cat.image }}
                style={styles.categoryImage}
                resizeMode="cover"
              />
              {/* Overlay for readability */}
              <View style={styles.imageOverlay} />
              {/* Top Icons */}
              <View style={styles.imageTopRow}>
                <View style={[styles.iconCircle, { backgroundColor: '#fff' }]}>
                  <Text style={[styles.iconText, { color: cat.accentColor }]}>{cat.icon}</Text>
                </View>
                {cat.badge ? (
                  <View style={[styles.badgePill, { backgroundColor: cat.accentColor }]}>
                    <Text style={styles.badgeText}>{cat.badge}</Text>
                  </View>
                ) : null}
              </View>

              {/* Count Badge */}
              <View style={[styles.countBadge, { backgroundColor: cat.accentColor }]}>
                <Text style={styles.countNumber}>{cat.count}</Text>
                <Text style={styles.countLabel}>{cat.countLabel}</Text>
              </View>
            </View>

            {/* Info Area */}
            <View style={styles.infoArea}>
              <Text style={styles.categoryName}>{cat.name}</Text>
              <Text style={[styles.tagline, { color: cat.accentColor }]}>{cat.tagline}</Text>
              <Text style={styles.description} numberOfLines={2}>{cat.description}</Text>
              <View style={styles.ctaRow}>
                <Text style={styles.ctaText}>{cat.cta}</Text>
                <Text style={[styles.ctaArrow, { color: cat.accentColor }]}>→</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 24,
  },
  scrollContent: {
    paddingHorizontal: 16,
    gap: 12,
  },
  card: {
    width: 260,
    borderRadius: 16,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#f0ece8',
  },
  imageArea: {
    height: 170,
    justifyContent: 'space-between',
  },
  categoryImage: {
    ...StyleSheet.absoluteFillObject,
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.12)',
  },
  imageTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 14,
    zIndex: 1,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconText: {
    fontSize: 20,
  },
  badgePill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#fff',
  },
  countBadge: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'baseline',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    gap: 4,
    marginLeft: 14,
    marginBottom: 14,
    zIndex: 1,
  },
  countNumber: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
  },
  countLabel: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
    opacity: 0.9,
  },
  infoArea: {
    padding: 14,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  tagline: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: '#666',
    lineHeight: 18,
    marginBottom: 12,
  },
  ctaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  ctaText: {
    fontSize: 14,
    color: '#1a1a1a',
    fontWeight: '500',
  },
  ctaArrow: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ShopByCategory;
