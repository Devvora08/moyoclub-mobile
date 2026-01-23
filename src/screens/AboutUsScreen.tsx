import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

type ScreenType = 'menu' | 'aboutUs' | 'privacyPolicy' | 'termsConditions';

interface AboutUsScreenProps {
  onGoBack: () => void;
  onNavigate: (screen: ScreenType) => void;
}

const AboutUsScreen = ({ onGoBack, onNavigate }: AboutUsScreenProps) => {
  const whatWeDoItems = [
    {
      icon: 'leaf-outline',
      title: 'Product Innovation',
      description:
        '700+ products across Convenience to Kitchen, Ready to Eat, and Ready to Cook segments—all made with chemical-free raw materials for healthier living.',
    },
    {
      icon: 'people-outline',
      title: 'Farmer Empowerment',
      description:
        'Supporting farmers with better agricultural practices, modern storage systems, and efficient logistics to ensure they receive fair value for their produce.',
    },
    {
      icon: 'nutrition-outline',
      title: 'Chemical-Free Farming',
      description:
        'Training farmers on sustainable, chemical-free farming methods that bring commercial viability while preserving soil health and ecosystem balance.',
    },
  ];

  const coreValues = [
    {
      icon: 'heart-outline',
      title: 'Health First',
      description:
        'Chemical-free products that prioritize the health and well-being of consumers and the environment.',
    },
    {
      icon: 'hand-left-outline',
      title: 'Farmer Partnership',
      description:
        'Building respectful, transparent relationships with farmers to ensure fair compensation and support.',
    },
    {
      icon: 'leaf-outline',
      title: 'Sustainability',
      description:
        'Promoting agricultural practices that preserve the environment for future generations.',
    },
    {
      icon: 'eye-outline',
      title: 'Transparency',
      description:
        'Operating with complete transparency in our sourcing, pricing, and business practices.',
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Hero Section - Legal Entity */}
        <View style={styles.heroSection}>
          <View style={styles.badge}>
            <Ionicons name="business-outline" size={16} color="#FF6B35" />
            <Text style={styles.badgeText}>Legal Entity</Text>
          </View>
          <Text style={styles.companyName}>Vaarn Foods Private Limited</Text>
          <Text style={styles.tagline}>bringing nutrition to the next generation</Text>
          <Text style={styles.heroDescription}>
            An Agri Innovation and Food Solutions Company with a strong product
            portfolio of 700+ products in Convenience to Kitchen, Ready to Eat,
            and Ready to Cook segments manufactured with chemical-free raw
            materials.
          </Text>
        </View>

        {/* Mission Section */}
        <View style={styles.missionSection}>
          <View style={styles.badge}>
            <Ionicons name="heart-outline" size={16} color="#FF6B35" />
            <Text style={styles.badgeText}>Our Mission</Text>
          </View>
          <Text style={styles.missionTitle}>farmers feed us forever!</Text>
          <Text style={styles.missionDescription}>
            Driving new initiatives in agricultural practices, storage systems,
            and logistics to the farming community so that they can earn better
            respect for their produce.
          </Text>
        </View>

        {/* What We Do Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What We Do</Text>
          <View style={styles.cardsContainer}>
            {whatWeDoItems.map((item, index) => (
              <View key={index} style={styles.card}>
                <View style={styles.cardIconContainer}>
                  <Ionicons name={item.icon as any} size={24} color="#FF6B35" />
                </View>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <Text style={styles.cardDescription}>{item.description}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Core Values Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Core Values</Text>
          <View style={styles.valuesGrid}>
            {coreValues.map((value, index) => (
              <View key={index} style={styles.valueItem}>
                <View style={styles.valueIconContainer}>
                  <Ionicons name={value.icon as any} size={20} color="#FF6B35" />
                </View>
                <View style={styles.valueContent}>
                  <Text style={styles.valueTitle}>{value.title}</Text>
                  <Text style={styles.valueDescription}>{value.description}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Company Info Footer */}
        <View style={styles.companyFooter}>
          <Ionicons name="business" size={32} color="#FF6B35" />
          <Text style={styles.footerCompanyName}>Vaarn Foods Private Limited</Text>
          <Text style={styles.footerRegistration}>
            Registered under the Companies Act, 2013
          </Text>
          <Text style={styles.footerNote}>
            All products sold through MoyoClub are manufactured and distributed
            by Vaarn Foods Private Limited
          </Text>
        </View>

        {/* Footer Links */}
        <View style={styles.footer}>
          <View style={styles.footerBranding}>
            <Text style={styles.footerBrand}>moyoclub.one</Text>
            <Text style={styles.footerTagline}>
              Nutrition-packed meals delivered fresh from managed farms to your
              doorstep
            </Text>
          </View>

          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => onNavigate('privacyPolicy')}>
              <Text style={styles.footerLinkText}>Privacy Policy</Text>
            </TouchableOpacity>
            <Text style={styles.footerDivider}>|</Text>
            <TouchableOpacity onPress={() => onNavigate('termsConditions')}>
              <Text style={styles.footerLinkText}>Terms of Service</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.copyright}>
            © 2026 MoyoClub. All rights reserved.
          </Text>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  placeholder: {
    width: 32,
  },
  heroSection: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
    gap: 6,
  },
  badgeText: {
    fontSize: 14,
    color: '#FF6B35',
    fontWeight: '500',
  },
  companyName: {
    fontSize: 28,
    fontWeight: '700',
    color: '#C4984A',
    textAlign: 'center',
    marginBottom: 12,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#5C4A2A',
    textAlign: 'center',
    marginBottom: 16,
  },
  heroDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  missionSection: {
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  missionTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#5C4A2A',
    textAlign: 'center',
    marginBottom: 16,
  },
  missionDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 32,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#5C4A2A',
    textAlign: 'center',
    marginBottom: 24,
  },
  cardsContainer: {
    gap: 16,
  },
  card: {
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
  },
  cardIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#FFF5F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#C4984A',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 22,
  },
  valuesGrid: {
    gap: 20,
  },
  valueItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 16,
  },
  valueIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFF5F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueContent: {
    flex: 1,
  },
  valueTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6B35',
    marginBottom: 4,
  },
  valueDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  companyFooter: {
    backgroundColor: '#FFF5F0',
    paddingHorizontal: 20,
    paddingVertical: 40,
    alignItems: 'center',
  },
  footerCompanyName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#C4984A',
    marginTop: 12,
    marginBottom: 8,
  },
  footerRegistration: {
    fontSize: 14,
    color: '#666',
    marginBottom: 12,
  },
  footerNote: {
    fontSize: 13,
    color: '#888',
    textAlign: 'center',
    lineHeight: 20,
  },
  footer: {
    backgroundColor: '#1a2634',
    paddingHorizontal: 20,
    paddingVertical: 32,
    alignItems: 'center',
  },
  footerBranding: {
    alignItems: 'center',
    marginBottom: 24,
  },
  footerBrand: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 8,
  },
  footerTagline: {
    fontSize: 13,
    color: '#aaa',
    textAlign: 'center',
    lineHeight: 20,
  },
  footerLinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 20,
  },
  footerLinkText: {
    fontSize: 14,
    color: '#ddd',
  },
  footerDivider: {
    color: '#666',
  },
  copyright: {
    fontSize: 12,
    color: '#888',
  },
});

export default AboutUsScreen;
