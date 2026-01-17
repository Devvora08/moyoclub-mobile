import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../hooks/useCart';
import { useNavigation } from '@react-navigation/native';
import { RecommendedAddon } from '../hooks/useAddOnRecommendations';

interface AddOnRecommendationsProps {
  recommendations: RecommendedAddon[];
  title?: string;
  subtitle?: string;
  onDismiss?: () => void;
  showDismiss?: boolean;
  compact?: boolean; // For in-section display
}

/**
 * AddOnRecommendations Component
 * Shows recommended add-on products based on items in cart
 * Similar to Swiggy/Zomato's "Goes well with your order" section
 */
const AddOnRecommendations: React.FC<AddOnRecommendationsProps> = ({
  recommendations,
  title = 'Goes well with your order',
  subtitle,
  onDismiss,
  showDismiss = false,
  compact = false,
}) => {
  const { addToCart, getItemQuantity } = useCart();
  const navigation = useNavigation();

  const handleAddToCart = async (addon: RecommendedAddon) => {
    const result = await addToCart({
      productId: addon.id,
      name: addon.name,
      price: addon.price,
      originalPrice: addon.originalPrice,
      imageUri: addon.imageUri,
      quantity: 1,
    });

    if (result.requiresAuth) {
      Alert.alert('Login Required', 'Please login to add items to your cart.', [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Login',
          onPress: () => (navigation as any).navigate('Account'),
        },
      ]);
    } else if (!result.success) {
      Alert.alert('Error', result.message);
    }
  };

  if (recommendations.length === 0) {
    return null;
  }

  return (
    <View style={[styles.container, compact && styles.containerCompact]}>
      {/* Header */}
      <View style={[styles.header, compact && styles.headerCompact]}>
        <View style={styles.headerLeft}>
          <View style={[styles.iconContainer, compact && styles.iconContainerCompact]}>
            <Text style={styles.sparkleIcon}>✨</Text>
          </View>
          <View>
            <Text style={[styles.title, compact && styles.titleCompact]}>{title}</Text>
            {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
          </View>
        </View>
        {showDismiss && onDismiss && (
          <TouchableOpacity style={styles.dismissButton} onPress={onDismiss}>
            <Ionicons name="close" size={18} color="#999" />
          </TouchableOpacity>
        )}
      </View>

      {/* Recommendations List */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {recommendations.map((addon, index) => {
          const quantityInCart = getItemQuantity(addon.id);

          return (
            <View key={`addon-${addon.id || index}`} style={[styles.card, compact && styles.cardCompact]}>
              {/* Image */}
              <View style={[styles.imageContainer, compact && styles.imageContainerCompact]}>
                {addon.imageUri ? (
                  <Image
                    source={{ uri: addon.imageUri }}
                    style={styles.image}
                    resizeMode="cover"
                  />
                ) : (
                  <View style={styles.imagePlaceholder}>
                    <Ionicons name="fast-food-outline" size={20} color="#ccc" />
                  </View>
                )}
                {/* Nutritional Badge */}
                {addon.protein && (
                  <View style={styles.nutritionBadge}>
                    <Text style={styles.nutritionText}>{addon.protein}</Text>
                  </View>
                )}
              </View>

              {/* Info */}
              <View style={[styles.cardInfo, compact && styles.cardInfoCompact]}>
                <Text style={[styles.addonName, compact && styles.addonNameCompact]} numberOfLines={2}>
                  {addon.name}
                </Text>
                {!compact && (
                  <Text style={styles.parentProduct} numberOfLines={1}>
                    with {addon.parentProductName}
                  </Text>
                )}
                <View style={styles.priceRow}>
                  <Text style={[styles.price, compact && styles.priceCompact]}>₹{addon.price}</Text>
                  <TouchableOpacity
                    style={[
                      styles.addButton,
                      compact && styles.addButtonCompact,
                      quantityInCart > 0 && styles.addButtonActive,
                    ]}
                    onPress={() => handleAddToCart(addon)}
                  >
                    <Text
                      style={[
                        styles.addButtonText,
                        quantityInCart > 0 && styles.addButtonTextActive,
                      ]}
                    >
                      {quantityInCart > 0 ? quantityInCart : 'ADD'}
                    </Text>
                    {quantityInCart === 0 && (
                      <Text style={[styles.plusIcon, quantityInCart > 0 && styles.addButtonTextActive]}>+</Text>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFBF5',
    marginVertical: 8,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#FFE8DC',
  },
  containerCompact: {
    backgroundColor: 'transparent',
    marginVertical: 0,
    paddingVertical: 12,
    borderTopWidth: 0,
    borderBottomWidth: 0,
    marginTop: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  headerCompact: {
    marginBottom: 8,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFF0E6',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  iconContainerCompact: {
    width: 28,
    height: 28,
    borderRadius: 14,
    marginRight: 8,
  },
  sparkleIcon: {
    fontSize: 14,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#1a1a1a',
    letterSpacing: -0.2,
  },
  titleCompact: {
    fontSize: 14,
  },
  subtitle: {
    fontSize: 12,
    color: '#888',
    marginTop: 1,
  },
  dismissButton: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  card: {
    width: 130,
    marginRight: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  cardCompact: {
    width: 115,
    marginRight: 8,
    borderRadius: 8,
  },
  imageContainer: {
    height: 85,
    backgroundColor: '#f5f5f5',
    position: 'relative',
  },
  imageContainerCompact: {
    height: 70,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imagePlaceholder: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  nutritionBadge: {
    position: 'absolute',
    top: 4,
    left: 4,
    backgroundColor: 'rgba(76, 175, 80, 0.9)',
    paddingHorizontal: 5,
    paddingVertical: 2,
    borderRadius: 3,
  },
  nutritionText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#fff',
  },
  cardInfo: {
    padding: 8,
  },
  cardInfoCompact: {
    padding: 6,
  },
  addonName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
    minHeight: 28,
  },
  addonNameCompact: {
    fontSize: 11,
    minHeight: 24,
  },
  parentProduct: {
    fontSize: 10,
    color: '#999',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FF6B35',
  },
  priceCompact: {
    fontSize: 12,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  addButtonCompact: {
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  addButtonActive: {
    backgroundColor: '#4CAF50',
    borderColor: '#4CAF50',
  },
  addButtonText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FF6B35',
  },
  addButtonTextActive: {
    color: '#fff',
  },
  plusIcon: {
    fontSize: 10,
    fontWeight: '700',
    color: '#FF6B35',
    marginLeft: 1,
  },
});

export default AddOnRecommendations;
