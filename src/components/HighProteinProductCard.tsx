import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ImageSourcePropType, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
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

          {/* Add/Remove Controls */}
          {quantityInCart === 0 ? (
            <TouchableOpacity
              style={styles.addButton}
              onPress={handleAddToCart}
              activeOpacity={0.8}
            >
              <Text style={styles.addButtonText}>ADD</Text>
              <Text style={styles.plusIcon}>+</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.quantityControl}>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleDecrement}
                activeOpacity={0.7}
              >
                <Ionicons name="remove" size={16} color="#FF6B35" />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantityInCart}</Text>
              <TouchableOpacity
                style={styles.quantityButton}
                onPress={handleIncrement}
                activeOpacity={0.7}
              >
                <Ionicons name="add" size={16} color="#FF6B35" />
              </TouchableOpacity>
            </View>
          )}
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
    minHeight: 36,
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
    flexDirection: 'column',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
  originalPrice: {
    fontSize: 11,
    color: '#999',
    textDecorationLine: 'line-through',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#FF6B35',
    minWidth: 70,
  },
  addButtonText: {
    color: '#FF6B35',
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  plusIcon: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '700',
    marginLeft: 2,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5F0',
    borderRadius: 8,
    borderWidth: 1.5,
    borderColor: '#FF6B35',
    overflow: 'hidden',
  },
  quantityButton: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  quantityText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#FF6B35',
    minWidth: 24,
    textAlign: 'center',
    paddingHorizontal: 4,
  },
});

export default HighProteinProductCard;
