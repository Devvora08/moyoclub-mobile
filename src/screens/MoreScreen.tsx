import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import AboutUsScreen from './AboutUsScreen';
import PrivacyPolicyScreen from './PrivacyPolicyScreen';
import TermsConditionsScreen from './TermsConditionsScreen';
import WarehouseScreen from './warehouse/WarehouseScreen';
import { useAuth } from '../context/AuthContext';

type ScreenType = 'menu' | 'aboutUs' | 'privacyPolicy' | 'termsConditions' | 'warehouse';

const MoreScreen = () => {
  const [currentScreen, setCurrentScreen] = useState<ScreenType>('menu');
  const { user } = useAuth();
  const isWarehouseManager = user?.role?.slug === 'warehouse-manager';

  const adminItems = [
    {
      icon: '🛡️',
      title: 'Super Admin',
      subtitle: 'Manage platform & content',
      bgColor: '#FFE8DC',
    },
    {
      icon: '💼',
      title: 'Corporate Admin',
      subtitle: 'Manage corporate orders',
      bgColor: '#FFE8DC',
    },
    {
      icon: '🚚',
      title: 'Warehouse',
      subtitle: 'Logistics & inventory',
      bgColor: '#E0F7FA',
      onPress: () => {
        if (isWarehouseManager) {
          setCurrentScreen('warehouse');
        } else {
          Alert.alert('Access Denied', 'You do not have permission to access the warehouse dashboard.');
        }
      },
    },
    {
      icon: '📣',
      title: 'Campaign Admin',
      subtitle: 'Marketing campaigns',
      bgColor: '#FFE8DC',
    },
  ];

  const informationItems = [
    {
      icon: 'ℹ️',
      title: 'About Us',
      subtitle: 'Learn about MoyoClub',
      bgColor: '#FFE8DC',
      screen: 'aboutUs' as ScreenType,
    },
    {
      icon: '📄',
      title: 'Terms & Conditions',
      subtitle: 'Read our policies',
      bgColor: '#FFE8DC',
      screen: 'termsConditions' as ScreenType,
    },
    {
      icon: '📋',
      title: 'Privacy Policy',
      subtitle: 'How we protect your data',
      bgColor: '#FFE8DC',
      screen: 'privacyPolicy' as ScreenType,
    },
  ];

  const contactItems = [
    {
      icon: '📞',
      title: 'Call Us',
      subtitle: '+91 1800-123-4567',
      bgColor: '#FFE8DC',
    },
    {
      icon: '✉️',
      title: 'Email Support',
      subtitle: 'support@moyoclub.com',
      bgColor: '#FFE8DC',
    },
  ];

  const goBack = () => setCurrentScreen('menu');
  const navigateTo = (screen: ScreenType) => setCurrentScreen(screen);

  const renderMenuItem = (item: any) => (
    <TouchableOpacity
      key={item.title}
      style={styles.menuItem}
      onPress={() => {
        if (item.onPress) {
          item.onPress();
        } else if (item.screen) {
          setCurrentScreen(item.screen);
        }
      }}
    >
      <View style={[styles.iconContainer, { backgroundColor: item.bgColor }]}>
        <Text style={styles.itemIcon}>{item.icon}</Text>
      </View>
      <View style={styles.itemContent}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#999" />
    </TouchableOpacity>
  );

  // Render sub-screens
  if (currentScreen === 'warehouse') {
    return <WarehouseScreen onGoBack={goBack} />;
  }
  if (currentScreen === 'aboutUs') {
    return <AboutUsScreen onGoBack={goBack} onNavigate={navigateTo} />;
  }
  if (currentScreen === 'privacyPolicy') {
    return <PrivacyPolicyScreen onGoBack={goBack} />;
  }
  if (currentScreen === 'termsConditions') {
    return <TermsConditionsScreen onGoBack={goBack} />;
  }

  // Render menu
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>More</Text>
        <TouchableOpacity style={styles.cartIconContainer}>
          <Ionicons name="cart-outline" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <Text style={styles.heroTitle}>More Options</Text>
          <Text style={styles.heroSubtitle}>Settings, admin access & support</Text>
        </View>

        {/* Admin Access Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>ADMIN ACCESS</Text>
          {adminItems.map(renderMenuItem)}
        </View>

        {/* Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>INFORMATION</Text>
          {informationItems.map(renderMenuItem)}
        </View>

        {/* Contact Us Section */}
        <View style={styles.section}>
          <Text style={styles.sectionHeader}>CONTACT US</Text>
          {contactItems.map(renderMenuItem)}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerBrand}>MoyoClub</Text>
          <Text style={styles.footerTagline}>Farm-fresh nutrition delivered to your door</Text>
          <Text style={styles.footerVersion}>Version 1.0.0 • © 2026 MoyoClub</Text>

          <View style={styles.socialIcons}>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialIconText}>F</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialIconText}>T</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialIconText}>I</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  cartIconContainer: {
    padding: 4,
  },
  heroSection: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 20,
    paddingVertical: 28,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#FFE8DC',
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 6,
    letterSpacing: -0.5,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#666',
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 12,
    fontWeight: '700',
    color: '#999',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 12,
    letterSpacing: 1,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  iconContainer: {
    width: 50,
    height: 50,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  itemIcon: {
    fontSize: 22,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  itemSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  footer: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 48,
    backgroundColor: '#FAFAFA',
    marginTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  footerBrand: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 8,
  },
  footerTagline: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 8,
  },
  footerVersion: {
    fontSize: 12,
    color: '#999',
    marginBottom: 24,
  },
  socialIcons: {
    flexDirection: 'row',
    gap: 16,
  },
  socialIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  socialIconText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
});

export default MoreScreen;
