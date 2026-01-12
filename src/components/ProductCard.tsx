import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType } from 'react-native';

interface ProductCardProps {
  name: string;
  price: number;
  rating: number;
  daysAgo: number;
  imageColor?: string;
  image?: ImageSourcePropType;
}

const ProductCard: React.FC<ProductCardProps> = ({
  name,
  price,
  rating,
  daysAgo,
  imageColor,
  image,
}) => {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={[styles.imageContainer, !image && { backgroundColor: imageColor }]}>
        {image && (
          <Image source={image} style={styles.productImage} resizeMode="cover" />
        )}
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
    height: 160,
    position: 'relative',
    overflow: 'hidden',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  productImage: {
    width: '100%',
    height: '100%',
  },
  ratingBadge: {
    position: 'absolute',
    top: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
    bottom: 8,
    left: 8,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
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
