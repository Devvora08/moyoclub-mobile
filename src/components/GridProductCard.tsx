import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../hooks/useCart';
import { useNavigation } from '@react-navigation/native';

interface GridProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  discount?: string;
  isOrganic?: boolean;
  image?: ImageSourcePropType;
  imageUri?: string | null;
}

const GridProductCard: React.FC<GridProductCardProps> = ({
  id,
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
  const { addToCart, getItemQuantity, incrementQuantity, decrementQuantity } = useCart();
  const navigation = useNavigation();

  const imageSource = imageUri ? { uri: imageUri } : image;
  const quantityInCart = getItemQuantity(id);

  const handleAddToCart = async () => {
    const result = await addToCart({
      productId: id,
      name,
      price,
      originalPrice,
      imageUri: imageUri || null,
      quantity: 1,
    });

    if (result.requiresAuth) {
      Alert.alert(
        'Login Required',
        'Please login to add items to your cart.',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Login',
            onPress: () => {
              (navigation as any).navigate('Account');
            },
          },
        ]
      );
    } else if (!result.success) {
      Alert.alert('Error', result.message);
    }
  };

  const handleIncrement = () => {
    incrementQuantity(id);
  };

  const handleDecrement = () => {
    decrementQuantity(id);
  };

  return (
    <TouchableOpacity style={styles.card} activeOpacity={0.9}>
      <View style={styles.imageContainer}>
        {imageSource ? (
          <Image source={imageSource} style={styles.productImage} resizeMode="cover" />
        ) : null}
        {discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{discount}</Text>
          </View>
        ) : null}
        {isOrganic && !discount ? (
          <View style={styles.organicBadge}>
            <Text style={styles.organicIcon}>✓</Text>
            <Text style={styles.organicText}>Organic</Text>
          </View>
        ) : null}
        <TouchableOpacity style={styles.favoriteButton} activeOpacity={0.8}>
          <Text style={styles.heartIcon}>♡</Text>
        </TouchableOpacity>

        {/* Floating Add/Quantity Control */}
        {quantityInCart === 0 ? (
          <TouchableOpacity
            style={styles.addButtonFloat}
            onPress={handleAddToCart}
            activeOpacity={0.8}
          >
            <Ionicons name="add" size={22} color="#fff" />
          </TouchableOpacity>
        ) : (
          <View style={styles.quantityControlFloat}>
            <TouchableOpacity
              style={styles.quantityButtonFloat}
              onPress={handleDecrement}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={16} color="#fff" />
            </TouchableOpacity>
            <Text style={styles.quantityTextFloat}>{quantityInCart}</Text>
            <TouchableOpacity
              style={styles.quantityButtonFloat}
              onPress={handleIncrement}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={16} color="#fff" />
            </TouchableOpacity>
          </View>
        )}
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
    height: 180,
    position: 'relative',
    backgroundColor: '#f5f5f5',
    overflow: 'hidden',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
    top: 10,
    right: 10,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    fontSize: 18,
    color: '#999',
  },
  addButtonFloat: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FF6B35',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 3,
  },
  quantityControlFloat: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FF6B35',
    borderRadius: 20,
    paddingHorizontal: 4,
    height: 40,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    elevation: 3,
  },
  quantityButtonFloat: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityTextFloat: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    minWidth: 20,
    textAlign: 'center',
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
