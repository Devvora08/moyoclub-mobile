import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface GridProductCardProps {
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  discount?: string;
  isOrganic?: boolean;
  image?: ImageSourcePropType;
  imageUri?: string | null; // Support for remote images
}

const GridProductCard: React.FC<GridProductCardProps> = ({
  name,
  price,
  originalPrice,
  rating,
  reviewCount,
  discount,
  isOrganic,
  image,
  imageUri,
}) => {
  // Determine the image source
  const imageSource = imageUri ? { uri: imageUri } : image;

  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.imageContainer}>
        {imageSource ? (
          <Image source={imageSource} style={styles.productImage} resizeMode="cover" />
        ) : null}
        {discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}</Text>
          </View>
        ) : null}
        {isOrganic ? (
          <View style={styles.organicBadge}>
            <Text style={styles.organicIcon}>✓</Text>
            <Text style={styles.organicText}>Organic</Text>
          </View>
        ) : null}
        <TouchableOpacity style={styles.favoriteButton}>
          <Text style={styles.heartIcon}>♡</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addButtonFloat}>
          <Text style={styles.addButtonFloatText}>+</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.info}>
        <View style={styles.ratingRow}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.ratingText}>{rating}</Text>
          <Text style={styles.reviewCount}>({reviewCount})</Text>
        </View>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <View style={styles.priceRow}>
          <Text style={styles.price}>₹{price}</Text>
          {originalPrice ? (
            <Text style={styles.originalPrice}>₹{originalPrice}</Text>
          ) : null}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: '48%',
    marginBottom: 16,
    borderRadius: 12,
    backgroundColor: '#fff',
    overflow: 'visible',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  imageContainer: {
    height: 180,
    position: 'relative',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  discountText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  organicBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  organicIcon: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
    marginRight: 2,
  },
  organicText: {
    color: '#fff',
    fontSize: 11,
    fontWeight: '700',
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 18,
    color: '#999',
  },
  addButtonFloat: {
    position: 'absolute',
    bottom: 8,
    right: 8,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonFloatText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '400',
    lineHeight: 28,
  },
  info: {
    padding: 12,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  star: {
    fontSize: 12,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a1a',
    marginRight: 2,
  },
  reviewCount: {
    fontSize: 11,
    color: '#999',
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 6,
    minHeight: 36,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
    marginRight: 6,
  },
  originalPrice: {
    fontSize: 12,
    color: '#999',
    textDecorationLine: 'line-through',
  },
});

export default GridProductCard;
