import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Linking } from 'react-native';

const Footer = () => {
  const openLink = (url: string) => {
    Linking.openURL(url).catch(() => {});
  };

  return (
    <View style={styles.container}>
      {/* Top Section */}
      <View style={styles.topSection}>
        {/* Brand */}
        <View style={styles.brandSection}>
          <Text style={styles.brandName}>moyoclub.one</Text>
          <Text style={styles.brandTagline}>
            Nutrition-packed meals delivered fresh from managed farms to your doorstep
          </Text>
          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialText}>f</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialText}>in</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.socialIcon}>
              <Text style={styles.socialText}>X</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Links Row */}
        <View style={styles.linksRow}>
          {/* Quick Links */}
          <View style={styles.linkColumn}>
            <Text style={styles.linkHeading}>Quick Links</Text>
            <TouchableOpacity><Text style={styles.linkText}>Home</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.linkText}>Track Order</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.linkText}>Our Farmers</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.linkText}>About Us</Text></TouchableOpacity>
          </View>

          {/* Support */}
          <View style={styles.linkColumn}>
            <Text style={styles.linkHeading}>Support</Text>
            <TouchableOpacity><Text style={styles.linkText}>FAQs</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.linkText}>Contact Us</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.linkText}>Delivery Info</Text></TouchableOpacity>
            <TouchableOpacity><Text style={styles.linkText}>Returns & Refunds</Text></TouchableOpacity>
          </View>
        </View>

        {/* Newsletter */}
        <View style={styles.newsletterSection}>
          <Text style={styles.linkHeading}>Newsletter</Text>
          <Text style={styles.newsletterText}>
            Get weekly updates on new meals, nutrition tips, and exclusive offers.
          </Text>
          <View style={styles.emailInputContainer}>
            <TextInput
              style={styles.emailInput}
              placeholder="Enter your email"
              placeholderTextColor="#888"
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          <TouchableOpacity style={styles.subscribeButton}>
            <Text style={styles.subscribeText}>Subscribe</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Bottom Section */}
      <View style={styles.bottomSection}>
        <Text style={styles.copyright}>© 2026 MoyoClub. All rights reserved.</Text>
        <View style={styles.legalLinks}>
          <TouchableOpacity><Text style={styles.legalText}>Privacy Policy</Text></TouchableOpacity>
          <Text style={styles.legalDot}>•</Text>
          <TouchableOpacity><Text style={styles.legalText}>Terms of Service</Text></TouchableOpacity>
        </View>
      </View>

      {/* Built By */}
      <Text style={styles.builtBy}>
        Built with ❤️ by <Text style={styles.builtByBold}>Lynsal Tech</Text>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#1a1a2e',
    paddingTop: 32,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  topSection: {
    marginBottom: 24,
  },
  brandSection: {
    marginBottom: 24,
  },
  brandName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF6B35',
    marginBottom: 8,
  },
  brandTagline: {
    fontSize: 13,
    color: '#aaa',
    lineHeight: 20,
    marginBottom: 16,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
  },
  socialIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#2a2a3e',
    justifyContent: 'center',
    alignItems: 'center',
  },
  socialText: {
    color: '#ccc',
    fontSize: 14,
    fontWeight: '600',
  },
  linksRow: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  linkColumn: {
    flex: 1,
  },
  linkHeading: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 12,
  },
  linkText: {
    fontSize: 13,
    color: '#aaa',
    marginBottom: 10,
    lineHeight: 18,
  },
  newsletterSection: {
    marginBottom: 8,
  },
  newsletterText: {
    fontSize: 13,
    color: '#aaa',
    lineHeight: 20,
    marginBottom: 12,
  },
  emailInputContainer: {
    backgroundColor: '#2a2a3e',
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#3a3a4e',
  },
  emailInput: {
    fontSize: 14,
    color: '#fff',
  },
  subscribeButton: {
    backgroundColor: '#FF6B35',
    borderRadius: 10,
    paddingVertical: 14,
    alignItems: 'center',
  },
  subscribeText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: '#2a2a3e',
    marginBottom: 16,
  },
  bottomSection: {
    alignItems: 'center',
    marginBottom: 16,
  },
  copyright: {
    fontSize: 12,
    color: '#888',
    marginBottom: 8,
  },
  legalLinks: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legalText: {
    fontSize: 12,
    color: '#aaa',
  },
  legalDot: {
    fontSize: 12,
    color: '#666',
    marginHorizontal: 8,
  },
  builtBy: {
    fontSize: 12,
    color: '#888',
    textAlign: 'center',
  },
  builtByBold: {
    fontWeight: '700',
    color: '#aaa',
  },
});

export default Footer;
