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

interface PrivacyPolicyScreenProps {
  onGoBack: () => void;
}

const PrivacyPolicyScreen = ({ onGoBack }: PrivacyPolicyScreenProps) => {
  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information you provide directly to us, such as when you create an account, place an order, or contact us for support.

This includes:
• Personal information (name, email, phone number, delivery address)
• Payment information (processed securely through our payment partners)
• Order history and preferences
• Device information and usage data`,
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to:

• Process and deliver your orders
• Send order confirmations and delivery updates
• Provide customer support
• Personalize your shopping experience
• Send promotional communications (with your consent)
• Improve our products and services
• Comply with legal obligations`,
    },
    {
      title: 'Information Sharing',
      content: `We do not sell your personal information. We may share your information with:

• Delivery partners to fulfill your orders
• Payment processors to complete transactions
• Service providers who assist our operations
• Law enforcement when required by law

All third parties are contractually obligated to protect your information.`,
    },
    {
      title: 'Data Security',
      content: `We implement industry-standard security measures to protect your personal information, including:

• Encryption of sensitive data
• Secure server infrastructure
• Regular security audits
• Access controls and authentication

While we strive to protect your information, no method of transmission over the internet is 100% secure.`,
    },
    {
      title: 'Your Rights',
      content: `You have the right to:

• Access your personal information
• Correct inaccurate data
• Delete your account and associated data
• Opt-out of marketing communications
• Request a copy of your data

To exercise these rights, contact us at privacy@moyoclub.one`,
    },
    {
      title: 'Cookies and Tracking',
      content: `We use cookies and similar technologies to:

• Remember your preferences
• Analyze app usage
• Improve performance

You can manage cookie preferences through your device settings.`,
    },
    {
      title: "Children's Privacy",
      content: `MoyoClub is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.`,
    },
    {
      title: 'Changes to This Policy',
      content: `We may update this Privacy Policy from time to time. We will notify you of any significant changes through the app or via email. Your continued use of MoyoClub after changes constitutes acceptance of the updated policy.`,
    },
    {
      title: 'Contact Us',
      content: `If you have questions about this Privacy Policy or our data practices, please contact us:

Email: privacy@moyoclub.one
Phone: +91 1800-123-4567

Vaarn Foods Private Limited
Registered under the Companies Act, 2013`,
    },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={onGoBack} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Privacy Policy</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Ionicons name="shield-checkmark" size={48} color="#FF6B35" />
          <Text style={styles.title}>Privacy Policy</Text>
          <Text style={styles.lastUpdated}>Last updated: January 2026</Text>
          <Text style={styles.intro}>
            At MoyoClub, we are committed to protecting your privacy and ensuring
            the security of your personal information. This policy explains how
            we collect, use, and safeguard your data.
          </Text>
        </View>

        {/* Sections */}
        {sections.map((section, index) => (
          <View key={index} style={styles.section}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
            <Text style={styles.sectionContent}>{section.content}</Text>
          </View>
        ))}

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            © 2026 MoyoClub. All rights reserved.
          </Text>
          <Text style={styles.footerSubtext}>
            Operated by Vaarn Foods Private Limited
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
  content: {
    paddingBottom: 32,
  },
  titleSection: {
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 32,
    backgroundColor: '#FFF5F0',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 16,
    marginBottom: 8,
  },
  lastUpdated: {
    fontSize: 14,
    color: '#888',
    marginBottom: 16,
  },
  intro: {
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B35',
    marginBottom: 12,
  },
  sectionContent: {
    fontSize: 15,
    color: '#444',
    lineHeight: 24,
  },
  footer: {
    alignItems: 'center',
    paddingVertical: 32,
    paddingHorizontal: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#888',
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 13,
    color: '#aaa',
  },
});

export default PrivacyPolicyScreen;
