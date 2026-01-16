import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType, Alert } from 'react-native';
import { useCart } from '../hooks/useCart';
import { useNavigation } from '@react-navigation/native';

interface HighProteinProductCardProps {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  protein?: string | null;
  calories?: string | null;
  discount?: string;
  isOrganic?: boolean;
  image?: ImageSourcePropType;
  imageUri?: string | null;
}

const HighProteinProductCard: React.FC<HighProteinProductCardProps> = ({
  id,
  name,
  price,
  originalPrice,
  rating,
  protein,
  calories,
  discount,
  isOrganic,
  image,
  imageUri,
}) => {
  const { addToCart, getItemQuantity } = useCart();
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
              // Navigate to Account tab for login
              (navigation as any).navigate('Account');
            },
          },
        ]
      );
    } else if (result.success) {
      // Optional: Show a brief success feedback
      // Could use a toast notification here
    } else {
      Alert.alert('Error', result.message);
    }
  };

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
        <View style={styles.ratingBadge}>
          <Text style={styles.star}>⭐</Text>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
      </View>
      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={2}>
          {name}
        </Text>
        {(protein || calories) ? (
          <Text style={styles.nutritionInfo}>
            {protein ? `${protein} protein` : ''}{(protein && calories) ? ' • ' : ''}{calories ? `${calories} cal` : ''}
          </Text>
        ) : null}
        <View style={styles.priceRow}>
          <View style={styles.priceContainer}>
            <Text style={styles.price}>₹{price}</Text>
            {originalPrice ? (
              <Text style={styles.originalPrice}>₹{originalPrice}</Text>
            ) : null}
          </View>
          <TouchableOpacity
            style={[styles.addButton, quantityInCart > 0 && styles.addButtonActive]}
            onPress={handleAddToCart}
          >
            <Text style={[styles.addButtonText, quantityInCart > 0 && styles.addButtonTextActive]}>
              {quantityInCart > 0 ? `${quantityInCart}` : 'Add'}
            </Text>
          </TouchableOpacity>
        </View>
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
  ratingBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
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
  info: {
    padding: 12,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  nutritionInfo: {
    fontSize: 12,
    color: '#999',
    marginBottom: 8,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
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
  addButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 16,
    minWidth: 50,
    alignItems: 'center',
  },
  addButtonActive: {
    backgroundColor: '#4CAF50',
  },
  addButtonText: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '700',
  },
  addButtonTextActive: {
    color: '#fff',
  },
});

export default HighProteinProductCard;
