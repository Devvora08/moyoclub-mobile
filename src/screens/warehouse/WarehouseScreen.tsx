import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import { WarehouseSection } from '../../types/warehouse';
import DeliveryAssignmentScreen from './DeliveryAssignmentScreen';
import OrderManagementScreen from './OrderManagementScreen';

interface WarehouseScreenProps {
  onGoBack?: () => void;
}

const WarehouseScreen: React.FC<WarehouseScreenProps> = ({ onGoBack }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<WarehouseSection>('delivery');

  const handleLogout = () => {
    logout();
  };

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          {onGoBack && (
            <TouchableOpacity onPress={onGoBack} style={styles.backBtn}>
              <Ionicons name="arrow-back" size={22} color="#333" />
            </TouchableOpacity>
          )}
          <View>
            <Text style={styles.headerTitle}>Warehouse</Text>
            <Text style={styles.headerGreeting}>
              Hello, {user?.first_name || 'Manager'}
            </Text>
          </View>
        </View>
        <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
          <Ionicons name="log-out-outline" size={20} color="#EF4444" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Segment Control */}
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'delivery' && styles.activeTab]}
          onPress={() => setActiveTab('delivery')}
        >
          <Text
            style={[styles.tabText, activeTab === 'delivery' && styles.activeTabText]}
          >
            Delivery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'orders' && styles.activeTab]}
          onPress={() => setActiveTab('orders')}
        >
          <Text
            style={[styles.tabText, activeTab === 'orders' && styles.activeTabText]}
          >
            Orders
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View style={styles.content}>
        {activeTab === 'delivery' ? (
          <DeliveryAssignmentScreen />
        ) : (
          <OrderManagementScreen />
        )}
      </View>
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
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  backBtn: {
    padding: 4,
    marginRight: 4,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  headerGreeting: {
    fontSize: 13,
    color: '#666',
    marginTop: 1,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: '#FEE2E2',
  },
  logoutText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#EF4444',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    padding: 4,
    marginHorizontal: 16,
    marginVertical: 12,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#999',
  },
  activeTabText: {
    color: '#FF6B35',
  },
  content: {
    flex: 1,
  },
});

export default WarehouseScreen;
