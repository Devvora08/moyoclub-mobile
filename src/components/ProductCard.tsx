import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface ProductCardProps {
  name: string;
  price: number;
  rating: number;
  daysAgo?: number;
  imageColor?: string;
  image?: ImageSourcePropType;
  imageUri?: string | null; // Support for remote images
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  rating,
  daysAgo = 0,
  imageColor,
  image,
  imageUri,
}) => {
  // Determine the image source
  const imageSource = imageUri ? { uri: imageUri } : image;

  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.imageContainer, !imageSource ? { backgroundColor: imageColor || '#f5f5f5' } : null]}>
        {imageSource ? (
          <Image source={imageSource} style={styles.productImage} resizeMode="cover" />
        ) : null}
        <View style={styles.ratingBadge}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <View style={styles.timeBadge}>
          <Text style={styles.timeIcon}>🕐</Text>
          <Text style={styles.timeText}>{daysAgo} days ago</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        <Text style={styles.price}>₹{price}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 160,
    marginRight: 12,
    marginBottom: 8,
    borderRadius: 16,
    backgroundColor: '#fff',
    overflow: 'visible',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
  },
  imageContainer: {
    height: 160,
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: 10,
  },
  star: {
    fontSize: 12,
    marginRight: 2,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  timeBadge: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  timeIcon: {
    fontSize: 12,
    marginRight: 4,
  },
  timeText: {
    fontSize: 11,
    color: '#fff',
    fontWeight: '500',
  },
  info: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
});

export default ProductCard;
