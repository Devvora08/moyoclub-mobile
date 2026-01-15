import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const MoreScreen = () => {
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
    },
    {
      icon: '📄',
      title: 'Terms & Conditions',
      subtitle: 'Read our policies',
      bgColor: '#FFE8DC',
    },
    {
      icon: '📋',
      title: 'Privacy Policy',
      subtitle: 'How we protect your data',
      bgColor: '#FFE8DC',
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

  const renderMenuItem = (item: any) => (
    <TouchableOpacity key={item.title} style={styles.menuItem}>
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
    paddingHorizontal: 16,
    paddingVertical: 24,
    marginBottom: 8,
  },
  heroTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  heroSubtitle: {
    fontSize: 15,
    color: '#666',
  },
  section: {
    marginBottom: 8,
  },
  sectionHeader: {
    fontSize: 13,
    fontWeight: '600',
    color: '#999',
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 12,
    letterSpacing: 0.5,
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
    width: 48,
    height: 48,
    borderRadius: 24,
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
    paddingHorizontal: 16,
    paddingVertical: 48,
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
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  socialIconText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#666',
  },
});

export default MoreScreen;
