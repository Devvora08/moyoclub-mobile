import React, { useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import Logo from '../components/Logo';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import DeliveryBanner from '../components/DeliveryBanner';
import PromoBanner from '../components/PromoBanner';
import HighProteinProductCard from '../components/HighProteinProductCard';
import GridProductCard from '../components/GridProductCard';
import AddOnRecommendations from '../components/AddOnRecommendations';
import { useProductsContext } from '../context/ProductsContext';
import { useAddOnRecommendations } from '../hooks/useAddOnRecommendations';
import { ProductDisplayData } from '../types/product';
import {
  getHighProteinProducts,
  getBreakfastProducts,
  getDealsProducts,
} from '../api/products';

const HomeScreen = () => {
  // Get products from global context (API initialization handled by ProductsContext)
  const { products, loading, error } = useProductsContext();

  // Memoized filtered product lists
  const highProteinProducts = useMemo(() => getHighProteinProducts(products), [products]);
  const breakfastProducts = useMemo(() => getBreakfastProducts(products), [products]);
  const dealsProducts = useMemo(() => getDealsProducts(products), [products]);

  // Get add-on recommendations based on cart items
  const { recommendations, hasRecommendations, getRecommendationsForSection } = useAddOnRecommendations(products);

  // Get section-specific recommendations
  const highProteinRecommendations = useMemo(() =>
    getRecommendationsForSection(highProteinProducts.map(p => p.id)),
    [getRecommendationsForSection, highProteinProducts]
  );
  const trendingRecommendations = useMemo(() =>
    getRecommendationsForSection(products.slice(0, 6).map(p => p.id)),
    [getRecommendationsForSection, products]
  );
  const dealsRecommendations = useMemo(() =>
    getRecommendationsForSection(dealsProducts.map(p => p.id)),
    [getRecommendationsForSection, dealsProducts]
  );
  const organicRecommendations = useMemo(() =>
    getRecommendationsForSection(products.filter(p => p.isOrganic).map(p => p.id)),
    [getRecommendationsForSection, products]
  );

  const categories = [
    {
      title: 'Ready to Eat',
      subtitle: 'Sweets & Snacks',
      backgroundColor: '#FFE8DC',
      accentColor: '#FF6B35',
      emoji: '🍬',
    },
    {
      title: 'Ready to Cook',
      subtitle: 'Mixes & Batters',
      backgroundColor: '#F5EDD7',
      accentColor: '#C9A66B',
      emoji: '👨‍🍳',
    },
    {
      title: 'Fresh & Custom',
      subtitle: '24hr Advance',
      backgroundColor: '#E8F5E9',
      accentColor: '#4CAF50',
      emoji: '🥗',
    },
    {
      title: 'Grocery Staples',
      subtitle: 'Rice, Dal & More',
      backgroundColor: '#F5EDD7',
      accentColor: '#8B6F47',
      emoji: '🌾',
    },
  ];

  const beverageCategory = {
    title: 'Beverages',
    subtitle: 'Traditional Drinks',
    emoji: '🥤',
  };

  // Helper function to render product card based on product data
  const renderProductCard = (product: ProductDisplayData) => (
    <ProductCard
      key={product.id}
      name={product.name}
      price={product.price}
      rating={product.rating}
      imageUri={product.imageUri}
    />
  );

  const renderHighProteinCard = (product: ProductDisplayData) => (
    <HighProteinProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      originalPrice={product.originalPrice}
      rating={product.rating}
      protein={product.protein}
      calories={product.calories}
      discount={product.discount}
      isOrganic={product.isOrganic}
      imageUri={product.imageUri}
    />
  );

  const renderGridCard = (product: ProductDisplayData) => (
    <GridProductCard
      key={product.id}
      id={product.id}
      name={product.name}
      price={product.price}
      originalPrice={product.originalPrice}
      rating={product.rating}
      reviewCount={product.reviewCount}
      discount={product.discount}
      isOrganic={product.isOrganic}
      imageUri={product.imageUri}
    />
  );

  // Loading state
  if (loading && products.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#FF6B35" />
          <Text style={styles.loadingText}>Loading products...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <SafeAreaView style={styles.container} edges={['top']}>
        <View style={styles.errorContainer}>
          <Text style={styles.errorIcon}>⚠️</Text>
          <Text style={styles.errorText}>Failed to load products</Text>
          <Text style={styles.errorSubtext}>{error}</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Logo width={140} height={32} />
            <TouchableOpacity style={styles.locationContainer}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>Delivering to Home</Text>
              <Text style={styles.chevron}>▼</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.headerRight}>
            <TouchableOpacity style={styles.premiumButton}>
              <Text style={styles.star}>⭐</Text>
              <Text style={styles.premiumText}>Premium</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cartIconButton}>
              <Ionicons name="cart-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for sweets, snacks, groceries..."
            placeholderTextColor="#999"
          />
        </View>

        {/* Shop by Category */}
        <View style={styles.section}>
          <View style={styles.sectionHeaderSimple}>
            <Text style={styles.sectionTitle}>Shop by Category</Text>
            <Text style={styles.sectionSubtitle}>What would you like today?</Text>
          </View>

          <View style={styles.categoryGrid}>
            {categories.map((category, index) => (
              <CategoryCard key={index} {...category} />
            ))}
          </View>

          {/* Beverages - Full Width */}
          <TouchableOpacity style={styles.beverageCard}>
            <Text style={styles.beverageEmoji}>{beverageCategory.emoji}</Text>
            <View style={styles.beverageInfo}>
              <Text style={styles.beverageTitle}>{beverageCategory.title}</Text>
              <Text style={styles.beverageSubtitle}>{beverageCategory.subtitle}</Text>
            </View>
            <View style={styles.beverageAccent} />
          </TouchableOpacity>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Happy Customers</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Partner Farms</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>100%</Text>
            <Text style={styles.statLabel}>Organic</Text>
          </View>
        </View>

        {/* Delivery Banner */}
        <DeliveryBanner />

        {/* Promo Banner */}
        <PromoBanner />

        {/* Order Again - Shows breakfast products */}
        {breakfastProducts.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.sectionHeader}>
              <View style={styles.sectionTitleContainer}>
                <Text style={styles.orderAgainIcon}>🔄</Text>
                <View>
                  <Text style={styles.sectionTitle}>Order Again</Text>
                  <Text style={styles.sectionSubtitle}>Your recent favorites</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.productsContainer}
            >
              {breakfastProducts.slice(0, 6).map(renderProductCard)}
            </ScrollView>
          </View>
        ) : null}

        {/* High Protein Picks */}
        {highProteinProducts.length > 0 ? (
          <View style={styles.sectionWithBackground}>
            <View>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.proteinIcon}>⚡</Text>
                  <View>
                    <Text style={styles.sectionTitle}>High Protein Picks</Text>
                    <Text style={styles.sectionSubtitle}>Fuel your fitness goals</Text>
                  </View>
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsContainer}
              >
                {highProteinProducts.slice(0, 6).map(renderHighProteinCard)}
              </ScrollView>

              {/* Contextual Add-On Recommendations */}
              <AddOnRecommendations
                recommendations={highProteinRecommendations}
                compact
              />
            </View>
          </View>
        ) : null}

        {/* Trending This Week - Shows all products */}
        {products.length > 0 ? (
          <View style={styles.sectionWithBackground}>
            <View>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.trendingIcon}>📈</Text>
                  <View>
                    <Text style={styles.sectionTitle}>Trending This Week</Text>
                    <Text style={styles.sectionSubtitle}>Most popular items</Text>
                  </View>
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsContainer}
              >
                {products.slice(0, 6).map(renderHighProteinCard)}
              </ScrollView>

              {/* Contextual Add-On Recommendations */}
              <AddOnRecommendations
                recommendations={trendingRecommendations}
                compact
              />
            </View>
          </View>
        ) : null}

        {/* Best Deals */}
        {dealsProducts.length > 0 ? (
          <View style={styles.sectionWithBackground}>
            <View>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.dealsIcon}>💰</Text>
                  <View>
                    <Text style={styles.sectionTitle}>Best Deals</Text>
                    <Text style={styles.sectionSubtitle}>Save more on these items</Text>
                  </View>
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsContainer}
              >
                {dealsProducts.slice(0, 6).map(renderHighProteinCard)}
              </ScrollView>

              {/* Contextual Add-On Recommendations */}
              <AddOnRecommendations
                recommendations={dealsRecommendations}
                compact
              />
            </View>
          </View>
        ) : null}

        {/* Organic & Healthy - Shows organic products */}
        {products.filter(p => p.isOrganic).length > 0 ? (
          <View style={styles.sectionWithBackground}>
            <View>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionTitleContainer}>
                  <Text style={styles.organicIcon}>🌿</Text>
                  <View>
                    <Text style={styles.sectionTitle}>Organic & Healthy</Text>
                    <Text style={styles.sectionSubtitle}>Farm fresh goodness</Text>
                  </View>
                </View>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.productsContainer}
              >
                {products.filter(p => p.isOrganic).slice(0, 6).map(renderHighProteinCard)}
              </ScrollView>

              {/* Contextual Add-On Recommendations */}
              <AddOnRecommendations
                recommendations={organicRecommendations}
                compact
              />
            </View>
          </View>
        ) : null}

        {/* Explore the Menu - Shows all products in grid */}
        {products.length > 0 ? (
          <View style={styles.section}>
            <View style={styles.exploreHeader}>
              <View style={styles.exploreHeaderLeft}>
                <Text style={styles.menuIcon}>🍽️</Text>
                <View>
                  <Text style={styles.sectionTitle}>Explore the Menu</Text>
                  <Text style={styles.sectionSubtitle}>{products.length} items available</Text>
                </View>
              </View>
              <TouchableOpacity style={styles.filterButton}>
                <Text style={styles.filterIcon}>☰</Text>
                <Text style={styles.filterText}>Filter</Text>
              </TouchableOpacity>
            </View>

            {/* Add-On Recommendations for all products */}
            {hasRecommendations && (
              <AddOnRecommendations
                recommendations={recommendations}
                title="Complete Your Order"
                subtitle="Goes well with items in your cart"
              />
            )}

            <View style={styles.gridContainer}>
              {products.map(renderGridCard)}
            </View>
          </View>
        ) : null}

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#666',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  errorSubtext: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
  },
  headerLeft: {
    flex: 1,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  logo: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationIcon: {
    fontSize: 14,
    marginRight: 4,
  },
  locationText: {
    fontSize: 14,
    color: '#666',
    marginRight: 4,
  },
  chevron: {
    fontSize: 10,
    color: '#666',
  },
  premiumButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    shadowColor: '#4CAF50',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  star: {
    fontSize: 14,
    marginRight: 4,
  },
  premiumText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '700',
  },
  cartIconButton: {
    padding: 4,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#333',
  },
  section: {
    marginBottom: 24,
  },
  sectionHeaderSimple: {
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionWithBackground: {
    backgroundColor: '#FFF5F0',
    paddingVertical: 24,
    marginBottom: 0,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  orderAgainIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
    letterSpacing: -0.3,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  seeAllText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '600',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  beverageCard: {
    backgroundColor: '#E3F2FD',
    borderRadius: 16,
    padding: 18,
    marginHorizontal: 16,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 80,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  beverageEmoji: {
    fontSize: 40,
    marginRight: 16,
  },
  beverageInfo: {
    flex: 1,
  },
  beverageTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  beverageSubtitle: {
    fontSize: 13,
    color: '#666',
  },
  beverageAccent: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#2196F3',
  },
  productsContainer: {
    paddingHorizontal: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  statCard: {
    backgroundColor: '#FFF5F0',
    borderRadius: 16,
    padding: 18,
    flex: 1,
    marginHorizontal: 6,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFE8DC',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  proteinIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  trendingIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  dealsIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  organicIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  exploreHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  exploreHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    fontSize: 24,
    marginRight: 12,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  filterIcon: {
    fontSize: 16,
    marginRight: 6,
    color: '#666',
  },
  filterText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
});

export default HomeScreen;
