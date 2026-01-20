import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useProductsContext } from '../context/ProductsContext';
import { ProductDisplayData, ProductType } from '../types/product';
import GridProductCard from '../components/GridProductCard';

type MealFilter = 'all' | 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'beverages';

type SortOption = 'recommended' | 'price-asc' | 'price-desc';

const BrowseScreen = () => {
  const { products, loading, error } = useProductsContext();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState<ProductType | 'all'>('all');
  const [selectedMeal, setSelectedMeal] = useState<MealFilter>('all');
  const [onlyDeals, setOnlyDeals] = useState(false);
  const [onlyHighProtein, setOnlyHighProtein] = useState(false);
  const [onlyOrganic, setOnlyOrganic] = useState(false);
  const [sortOption, setSortOption] = useState<SortOption>('recommended');

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach(p => {
      if (p.category) set.add(p.category);
    });
    return Array.from(set).sort();
  }, [products]);

  const [selectedCategory, setSelectedCategory] = useState<string | 'all'>('all');

  const filteredProducts = useMemo(() => {
    let list: ProductDisplayData[] = products;

    // Text search over name, description, badges, category
    const query = searchQuery.trim().toLowerCase();
    if (query.length > 0) {
      list = list.filter(p => {
        const haystack = [
          p.name,
          p.description || '',
          p.badges || '',
          p.category || '',
        ]
          .join(' ')
          .toLowerCase();
        return haystack.includes(query);
      });
    }

    // Veg / Non-veg
    if (selectedType !== 'all') {
      list = list.filter(p => p.type === selectedType);
    }

    // Category
    if (selectedCategory !== 'all') {
      list = list.filter(p => p.category === selectedCategory);
    }

    // Meal time
    if (selectedMeal !== 'all') {
      list = list.filter(p => p.mealTimes[selectedMeal]);
    }

    // Flags
    if (onlyDeals) {
      list = list.filter(p => p.discount !== undefined);
    }

    if (onlyHighProtein) {
      list = list.filter(p => p.protein !== null);
    }

    if (onlyOrganic) {
      list = list.filter(p => p.isOrganic);
    }

    // Sort
    if (sortOption === 'price-asc') {
      list = [...list].sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price-desc') {
      list = [...list].sort((a, b) => b.price - a.price);
    }

    return list;
  }, [
    products,
    searchQuery,
    selectedType,
    selectedMeal,
    selectedCategory,
    onlyDeals,
    onlyHighProtein,
    onlyOrganic,
    sortOption,
  ]);

  const renderProduct = ({ item }: { item: ProductDisplayData }) => (
    <GridProductCard
      id={item.id}
      name={item.name}
      price={item.price}
      originalPrice={item.originalPrice}
      rating={item.rating}
      reviewCount={item.reviewCount}
      discount={item.discount}
      isOrganic={item.isOrganic}
      imageUri={item.imageUri || undefined}
    />
  );

  const keyExtractor = (item: ProductDisplayData) => item.id.toString();

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header with search bar */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Browse Menu</Text>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search-outline" size={20} color="#999" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name, description, or category"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
          autoCorrect={false}
          autoCapitalize="none"
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearSearchButton}>
            <Ionicons name="close-circle" size={18} color="#bbb" />
          </TouchableOpacity>
        )}
      </View>

      {/* Quick filters row */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filtersScrollView}
        contentContainerStyle={styles.filtersRow}
      >
        {/* Veg / Non-veg */}
        <FilterChip
          label="All"
          active={selectedType === 'all'}
          onPress={() => setSelectedType('all')}
        />
        <FilterChip
          label="Veg"
          active={selectedType === 'veg'}
          onPress={() => setSelectedType('veg')}
        />
        <FilterChip
          label="Non-veg"
          active={selectedType === 'non-veg'}
          onPress={() => setSelectedType('non-veg')}
        />

        {/* Meal times */}
        <FilterChip
          label="All meals"
          active={selectedMeal === 'all'}
          onPress={() => setSelectedMeal('all')}
        />
        <FilterChip
          label="Breakfast"
          active={selectedMeal === 'breakfast'}
          onPress={() => setSelectedMeal('breakfast')}
        />
        <FilterChip
          label="Lunch"
          active={selectedMeal === 'lunch'}
          onPress={() => setSelectedMeal('lunch')}
        />
        <FilterChip
          label="Dinner"
          active={selectedMeal === 'dinner'}
          onPress={() => setSelectedMeal('dinner')}
        />
        <FilterChip
          label="Snacks"
          active={selectedMeal === 'snacks'}
          onPress={() => setSelectedMeal('snacks')}
        />
        <FilterChip
          label="Beverages"
          active={selectedMeal === 'beverages'}
          onPress={() => setSelectedMeal('beverages')}
        />

        {/* Flags */}
        <FilterChip
          label="Deals"
          active={onlyDeals}
          onPress={() => setOnlyDeals(prev => !prev)}
        />
        <FilterChip
          label="High protein"
          active={onlyHighProtein}
          onPress={() => setOnlyHighProtein(prev => !prev)}
        />
        <FilterChip
          label="Organic"
          active={onlyOrganic}
          onPress={() => setOnlyOrganic(prev => !prev)}
        />
      </ScrollView>

      {/* Categories & sort row */}
      <View style={styles.categoriesSortContainer}>
        {categories.length > 0 && (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.categoriesScrollView}
            contentContainerStyle={styles.categoriesRow}
          >
            <FilterChip
              label="All categories"
              active={selectedCategory === 'all'}
              onPress={() => setSelectedCategory('all')}
            />
            {categories.map(cat => (
              <FilterChip
                key={cat}
                label={cat}
                active={selectedCategory === cat}
                onPress={() => setSelectedCategory(cat)}
              />
            ))}
          </ScrollView>
        )}

        <View style={styles.sortRow}>
          <Text style={styles.sortLabel}>Sort</Text>
          <View style={styles.sortChipsRow}>
            <FilterChip
              label="Recommended"
              active={sortOption === 'recommended'}
              onPress={() => setSortOption('recommended')}
            />
            <FilterChip
              label="Price ↑"
              active={sortOption === 'price-asc'}
              onPress={() => setSortOption('price-asc')}
            />
            <FilterChip
              label="Price ↓"
              active={sortOption === 'price-desc'}
              onPress={() => setSortOption('price-desc')}
            />
          </View>
        </View>
      </View>

      {/* Content */}
      <View style={styles.listContainer}>
        {loading && (
          <View style={styles.centerContent}>
            <Ionicons name="refresh" size={28} color="#999" />
            <Text style={styles.subtitle}>Loading products…</Text>
          </View>
        )}

        {!loading && error && (
          <View style={styles.centerContent}>
            <Ionicons name="warning-outline" size={28} color="#f39c12" />
            <Text style={styles.subtitle}>Failed to load products</Text>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <View style={styles.centerContent}>
            <Ionicons name="search" size={40} color="#ddd" />
            <Text style={styles.title}>No matching items</Text>
            <Text style={styles.subtitle}>
              Try changing your search or filters to see more dishes.
            </Text>
          </View>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
          <FlatList
            data={filteredProducts}
            keyExtractor={keyExtractor}
            numColumns={2}
            columnWrapperStyle={styles.columnWrapper}
            contentContainerStyle={styles.flatListContent}
            renderItem={renderProduct}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

interface FilterChipProps {
  label: string;
  active: boolean;
  onPress: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, active, onPress }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
      activeOpacity={0.8}
    >
      <Text
        style={[styles.chipLabel, active && styles.chipLabelActive]}
        numberOfLines={1}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 4,
    marginBottom: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 999,
    backgroundColor: '#f5f5f5',
  },
  searchIcon: {
    marginRight: 6,
  },
  searchInput: {
    flex: 1,
    fontSize: 15,
    color: '#222',
  },
  clearSearchButton: {
    marginLeft: 4,
  },
  filtersScrollView: {
    maxHeight: 44,
  },
  filtersRow: {
    paddingHorizontal: 12,
    alignItems: 'center',
  },
  categoriesSortContainer: {
    paddingHorizontal: 12,
  },
  categoriesScrollView: {
    maxHeight: 44,
  },
  categoriesRow: {
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 12,
    height: 32,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
    marginRight: 8,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chipActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  chipLabel: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  chipLabelActive: {
    color: '#fff',
  },
  sortRow: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sortLabel: {
    fontSize: 13,
    color: '#777',
    marginRight: 8,
  },
  sortChipsRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  listContainer: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 4,
  },
  columnWrapper: {
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  flatListContent: {
    paddingBottom: 24,
  },
  centerContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 12,
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
  },
  errorText: {
    marginTop: 4,
    fontSize: 13,
    color: '#c0392b',
    textAlign: 'center',
  },
});

export default BrowseScreen;
