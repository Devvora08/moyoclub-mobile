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

interface TermsConditionsScreenProps {
  onGoBack: () => void;
}

const TermsConditionsScreen = ({ onGoBack }: TermsConditionsScreenProps) => {
  const sections = [
    {
      title: '1. Acceptance of Terms',
      content: `By downloading, accessing, or using the MoyoClub application, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.

These terms constitute a legally binding agreement between you and Vaarn Foods Private Limited.`,
    },
    {
      title: '2. Eligibility',
      content: `To use MoyoClub, you must:

• Be at least 18 years of age
• Have the legal capacity to enter into contracts
• Provide accurate and complete registration information
• Be a resident of an area where we provide delivery services`,
    },
    {
      title: '3. Account Registration',
      content: `You are responsible for:

• Maintaining the confidentiality of your account credentials
• All activities that occur under your account
• Notifying us immediately of any unauthorized use
• Ensuring your account information is accurate and up-to-date

We reserve the right to suspend or terminate accounts that violate these terms.`,
    },
    {
      title: '4. Products and Pricing',
      content: `• All products are subject to availability
• Prices are displayed in Indian Rupees (INR) and include applicable taxes
• We reserve the right to modify prices without prior notice
• Product images are for illustration purposes and may vary slightly from actual products
• Weight and quantity mentioned are approximate`,
    },
    {
      title: '5. Orders and Payment',
      content: `• Orders are subject to acceptance and availability
• We reserve the right to cancel orders due to pricing errors, product unavailability, or suspected fraud
• Payment must be made at the time of order placement
• We accept various payment methods including UPI, credit/debit cards, and net banking
• All payments are processed through secure, third-party payment gateways`,
    },
    {
      title: '6. Delivery',
      content: `• Delivery times are estimates and not guaranteed
• We deliver to serviceable pin codes only
• You must be available to receive the delivery or designate an authorized recipient
• Risk of loss passes to you upon delivery
• Delivery charges may apply based on order value and location`,
    },
    {
      title: '7. Returns and Refunds',
      content: `• Fresh produce and perishable items cannot be returned unless defective
• Report any quality issues within 24 hours of delivery with photographic evidence
• Refunds will be processed to the original payment method within 5-7 business days
• We reserve the right to refuse returns that do not meet our policy criteria`,
    },
    {
      title: '8. Quality Assurance',
      content: `• All products are sourced from verified, chemical-free farms
• We maintain strict quality control throughout our supply chain
• Products are packed and handled following food safety standards
• Check products upon delivery and report any concerns immediately`,
    },
    {
      title: '9. Intellectual Property',
      content: `• All content on MoyoClub, including logos, images, and text, is owned by Vaarn Foods Private Limited
• You may not reproduce, distribute, or create derivative works without written permission
• MoyoClub and associated branding are registered trademarks`,
    },
    {
      title: '10. Limitation of Liability',
      content: `• MoyoClub is provided "as is" without warranties of any kind
• We are not liable for indirect, incidental, or consequential damages
• Our total liability shall not exceed the amount paid for the specific order in question
• We are not responsible for delays due to circumstances beyond our control`,
    },
    {
      title: '11. Modifications to Terms',
      content: `We may update these Terms and Conditions at any time. Continued use of the app after changes constitutes acceptance of the modified terms. We encourage you to review these terms periodically.`,
    },
    {
      title: '12. Governing Law',
      content: `These Terms and Conditions are governed by the laws of India. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of courts in India.`,
    },
    {
      title: '13. Contact Information',
      content: `For questions about these Terms and Conditions, please contact us:

Email: legal@moyoclub.one
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
        <Text style={styles.headerTitle}>Terms & Conditions</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Title Section */}
        <View style={styles.titleSection}>
          <Ionicons name="document-text" size={48} color="#FF6B35" />
          <Text style={styles.title}>Terms & Conditions</Text>
          <Text style={styles.lastUpdated}>Last updated: January 2026</Text>
          <Text style={styles.intro}>
            Please read these Terms and Conditions carefully before using the
            MoyoClub application. These terms govern your use of our services
            and the purchase of products through our platform.
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

export default TermsConditionsScreen;
