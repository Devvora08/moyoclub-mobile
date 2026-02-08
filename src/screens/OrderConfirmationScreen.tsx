import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { useCart } from '../hooks/useCart';

type OrderConfirmationRouteProp = RouteProp<RootStackParamList, 'OrderConfirmation'>;
type NavigationProp = NativeStackNavigationProp<RootStackParamList, 'OrderConfirmation'>;

const OrderConfirmationScreen = () => {
  const route = useRoute<OrderConfirmationRouteProp>();
  const navigation = useNavigation<NavigationProp>();
  const { clearCart } = useCart();
  const { order } = route.params;

  const handleBackToHome = () => {
    clearCart();
    navigation.reset({
      index: 0,
      routes: [{ name: 'MainTabs' }],
    });
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.successIcon}>
          <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
        </View>

        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.subtitle}>Your order has been successfully placed.</Text>

        <View style={styles.orderCard}>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Order ID</Text>
            <Text style={styles.orderValue}>{order.order_uid}</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Status</Text>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>{order.status}</Text>
            </View>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Transaction</Text>
            <Text style={styles.orderValueSmall}>{order.transaction_id}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Subtotal</Text>
            <Text style={styles.orderValue}>₹{order.subtotal}</Text>
          </View>
          <View style={styles.orderRow}>
            <Text style={styles.orderLabel}>Tax</Text>
            <Text style={styles.orderValue}>₹{order.tax}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.orderRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>₹{order.total}</Text>
          </View>
        </View>

        <View style={styles.itemsCard}>
          <Text style={styles.itemsTitle}>Items ({order.items.length})</Text>
          {order.items.map((item, index) => (
            <View key={item.id || index} style={styles.itemRow}>
              <Text style={styles.itemName} numberOfLines={1}>
                {item.name}
              </Text>
              <Text style={styles.itemQty}>x{item.qty}</Text>
              <Text style={styles.itemPrice}>₹{item.price * item.qty}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
          <Text style={styles.homeButtonText}>Back to Home</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 24,
    alignItems: 'center',
  },
  successIcon: {
    marginTop: 24,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
  },
  orderCard: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 16,
  },
  orderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderLabel: {
    fontSize: 14,
    color: '#666',
  },
  orderValue: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
  },
  orderValueSmall: {
    fontSize: 12,
    fontWeight: '600',
    color: '#1a1a1a',
    maxWidth: '60%',
    textAlign: 'right',
  },
  statusBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4CAF50',
    textTransform: 'capitalize',
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FF6B35',
  },
  itemsCard: {
    width: '100%',
    backgroundColor: '#f9f9f9',
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: '#f0f0f0',
    marginBottom: 32,
  },
  itemsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  itemName: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
  itemQty: {
    fontSize: 14,
    color: '#666',
    marginHorizontal: 12,
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1a1a1a',
    minWidth: 60,
    textAlign: 'right',
  },
  homeButton: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 36,
    paddingVertical: 16,
    borderRadius: 28,
    shadowColor: '#FF6B35',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});

export default OrderConfirmationScreen;
