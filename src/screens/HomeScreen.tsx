import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CategoryCard from '../components/CategoryCard';
import ProductCard from '../components/ProductCard';
import DeliveryBanner from '../components/DeliveryBanner';
import PromoBanner from '../components/PromoBanner';
import HighProteinProductCard from '../components/HighProteinProductCard';
import GridProductCard from '../components/GridProductCard';

const HomeScreen = () => {
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

  const orderAgainProducts = [
    {
      name: 'Kaju Katli Premium',
      price: 450,
      rating: 4.8,
      daysAgo: 3,
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Mysore Pak',
      price: 380,
      rating: 4.6,
      daysAgo: 3,
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Gulab Jamun Pack',
      price: 252,
      rating: 4.9,
      daysAgo: 3,
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Samosa Pack',
      price: 220,
      rating: 4.7,
      daysAgo: 3,
      image: require('../../paneer.jpg'),
    },
  ];

  const highProteinProducts = [
    {
      name: 'Kaju Katli Premium',
      price: 450,
      originalPrice: 500,
      rating: 4.8,
      protein: '8g',
      calories: '320',
      discount: '10% OFF',
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Chakli Mix',
      price: 180,
      rating: 4.5,
      protein: '10g',
      calories: '450',
      isOrganic: true,
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Paneer Tikka',
      price: 225,
      originalPrice: 250,
      rating: 4.7,
      protein: '18g',
      calories: '380',
      discount: '10% OFF',
      image: require('../../paneer.jpg'),
    },
  ];

  const trendingProducts = [
    {
      name: 'Kaju Katli Premium',
      price: 450,
      originalPrice: 500,
      rating: 4.8,
      protein: '8g',
      calories: '320',
      discount: '10% OFF',
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Gulab Jamun Pack',
      price: 252,
      originalPrice: 280,
      rating: 4.9,
      protein: '4g',
      calories: '180',
      discount: '10% OFF',
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Samosa Party Pack',
      price: 220,
      rating: 4.7,
      protein: '3g',
      calories: '150',
      image: require('../../paneer.jpg'),
    },
  ];

  const bestDealsProducts = [
    {
      name: 'Kaju Katli Premium',
      price: 450,
      originalPrice: 500,
      rating: 4.8,
      protein: '8g',
      calories: '320',
      discount: '10% OFF',
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Gulab Jamun Pack',
      price: 252,
      originalPrice: 280,
      rating: 4.9,
      protein: '4g',
      calories: '180',
      discount: '10% OFF',
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Paneer Tikka',
      price: 225,
      originalPrice: 250,
      rating: 4.7,
      protein: '18g',
      calories: '380',
      discount: '10% OFF',
      image: require('../../paneer.jpg'),
    },
  ];

  const exploreMenuProducts = [
    {
      name: 'Kaju Katli Premium',
      price: 450,
      originalPrice: 500,
      rating: 4.8,
      reviewCount: 234,
      discount: '10% OFF',
      isOrganic: true,
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Mysore Pak',
      price: 380,
      rating: 4.6,
      reviewCount: 189,
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Gulab Jamun Pack',
      price: 252,
      originalPrice: 280,
      rating: 4.9,
      reviewCount: 456,
      discount: '10% OFF',
      isOrganic: true,
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Samosa Party Pack',
      price: 220,
      rating: 4.7,
      reviewCount: 342,
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Chakli Mix',
      price: 180,
      rating: 4.5,
      reviewCount: 156,
      isOrganic: true,
      image: require('../../paneer.jpg'),
    },
    {
      name: 'Paneer Tikka',
      price: 225,
      originalPrice: 250,
      rating: 4.7,
      reviewCount: 278,
      discount: '10% OFF',
      image: require('../../paneer.jpg'),
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.logo}>MoyoClub</Text>
            <TouchableOpacity style={styles.locationContainer}>
              <Text style={styles.locationIcon}>📍</Text>
              <Text style={styles.locationText}>Delivering to Home</Text>
              <Text style={styles.chevron}>▼</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity style={styles.premiumButton}>
            <Text style={styles.star}>⭐</Text>
            <Text style={styles.premiumText}>Premium</Text>
          </TouchableOpacity>
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

        {/* Order Again */}
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
            {orderAgainProducts.map((product, index) => (
              <ProductCard key={index} {...product} />
            ))}
          </ScrollView>
        </View>

        {/* High Protein Picks */}
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
              {highProteinProducts.map((product, index) => (
                <HighProteinProductCard key={index} {...product} />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Trending This Week */}
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
              {trendingProducts.map((product, index) => (
                <HighProteinProductCard key={index} {...product} />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Best Deals */}
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
              {bestDealsProducts.map((product, index) => (
                <HighProteinProductCard key={index} {...product} />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Organic & Healthy */}
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
              {highProteinProducts.map((product, index) => (
                <HighProteinProductCard key={index} {...product} />
              ))}
            </ScrollView>
          </View>
        </View>

        {/* Explore the Menu */}
        <View style={styles.section}>
          <View style={styles.exploreHeader}>
            <View style={styles.exploreHeaderLeft}>
              <Text style={styles.menuIcon}>🍽️</Text>
              <View>
                <Text style={styles.sectionTitle}>Explore the Menu</Text>
                <Text style={styles.sectionSubtitle}>{exploreMenuProducts.length} items available</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Text style={styles.filterIcon}>☰</Text>
              <Text style={styles.filterText}>Filter</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.gridContainer}>
            {exploreMenuProducts.map((product, index) => (
              <GridProductCard key={index} {...product} />
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    marginHorizontal: 16,
    marginBottom: 24,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
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
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
    marginTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
    minHeight: 80,
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
    borderRadius: 12,
    padding: 16,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
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
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
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
