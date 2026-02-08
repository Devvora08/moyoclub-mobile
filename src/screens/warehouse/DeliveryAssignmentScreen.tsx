import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatCard from '../../components/warehouse/StatCard';
import StatusBadge from '../../components/warehouse/StatusBadge';
import { DELIVERY_STATS, DELIVERY_PERSONNEL, WAREHOUSE_ORDERS } from '../../data/warehouseData';
import { WarehouseOrder, DeliveryPerson } from '../../types/warehouse';

type ViewFilter = 'all' | 'unassigned' | 'assigned';

const DeliveryAssignmentScreen: React.FC = () => {
  const [orders, setOrders] = useState<WarehouseOrder[]>(WAREHOUSE_ORDERS);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewFilter, setViewFilter] = useState<ViewFilter>('all');

  const deliverableOrders = useMemo(() => {
    return orders.filter((o) => o.status === 'packed' || o.status === 'dispatched');
  }, [orders]);

  const filteredOrders = useMemo(() => {
    let result = deliverableOrders;

    if (viewFilter === 'unassigned') {
      result = result.filter((o) => !o.assignedTo);
    } else if (viewFilter === 'assigned') {
      result = result.filter((o) => !!o.assignedTo);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.id.toLowerCase().includes(q) ||
          o.customer.name.toLowerCase().includes(q)
      );
    }

    return result;
  }, [deliverableOrders, viewFilter, searchQuery]);

  const unassignedCount = deliverableOrders.filter((o) => !o.assignedTo).length;

  const handleAssign = (order: WarehouseOrder) => {
    const availableStaff = DELIVERY_PERSONNEL.filter(
      (p) => p.available && p.currentOrders < p.capacity
    );

    if (availableStaff.length === 0) {
      Alert.alert('No Available Staff', 'All delivery personnel are currently at capacity.');
      return;
    }

    const options = availableStaff.map((p) => p.name);
    options.push('Cancel');

    Alert.alert(
      'Assign Delivery',
      `Select delivery personnel for ${order.id}`,
      availableStaff
        .map((person) => ({
          text: `${person.name} (${person.currentOrders}/${person.capacity})`,
          onPress: () => {
            setOrders((prev) =>
              prev.map((o) =>
                o.id === order.id
                  ? { ...o, assignedTo: person.id, status: 'dispatched' as const }
                  : o
              )
            );
            Alert.alert('Assigned', `${order.id} assigned to ${person.name}`);
          },
        }))
        .concat([{ text: 'Cancel', onPress: () => {} }])
    );
  };

  const getPersonnelName = (id: string) => {
    return DELIVERY_PERSONNEL.find((p) => p.id === id)?.name || 'Unknown';
  };

  const renderOrderCard = (order: WarehouseOrder) => (
    <View key={order.id} style={styles.orderCard}>
      <View style={styles.orderHeader}>
        <Text style={styles.orderId}>{order.id}</Text>
        <StatusBadge status={order.status} />
      </View>

      <View style={styles.orderInfo}>
        <View style={styles.infoRow}>
          <Ionicons name="person-outline" size={14} color="#666" />
          <Text style={styles.infoText}>{order.customer.name}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="location-outline" size={14} color="#666" />
          <Text style={styles.infoText} numberOfLines={1}>{order.customer.address}</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="cube-outline" size={14} color="#666" />
          <Text style={styles.infoText}>{order.items.length} item(s)</Text>
        </View>
        <View style={styles.infoRow}>
          <Ionicons name="cash-outline" size={14} color="#666" />
          <Text style={styles.infoText}>
            {'\u20B9'}{order.total + order.deliveryFee}
          </Text>
        </View>
      </View>

      {order.assignedTo ? (
        <View style={styles.assignedBanner}>
          <Ionicons name="checkmark-circle" size={16} color="#047857" />
          <Text style={styles.assignedText}>
            Assigned to {getPersonnelName(order.assignedTo)}
          </Text>
        </View>
      ) : (
        <TouchableOpacity
          style={styles.assignButton}
          onPress={() => handleAssign(order)}
        >
          <Ionicons name="person-add-outline" size={16} color="#fff" />
          <Text style={styles.assignButtonText}>Assign</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderPersonnelCard = (person: DeliveryPerson) => (
    <View key={person.id} style={styles.personnelCard}>
      <View style={styles.personnelHeader}>
        <View style={[styles.avatar, { backgroundColor: person.available ? '#FF6B35' : '#9CA3AF' }]}>
          <Text style={styles.avatarText}>{person.avatar}</Text>
        </View>
        <View style={styles.personnelInfo}>
          <Text style={styles.personnelName}>{person.name}</Text>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={12} color="#666" />
            <Text style={styles.personnelDetail}>{person.location}</Text>
          </View>
        </View>
        <View
          style={[
            styles.availabilityBadge,
            { backgroundColor: person.available ? '#D1FAE5' : '#FEE2E2' },
          ]}
        >
          <Text
            style={[
              styles.availabilityText,
              { color: person.available ? '#047857' : '#991B1B' },
            ]}
          >
            {person.available ? 'Available' : 'Busy'}
          </Text>
        </View>
      </View>

      <View style={styles.personnelMeta}>
        <View style={styles.metaItem}>
          <Ionicons name="car-outline" size={14} color="#666" />
          <Text style={styles.metaText}>{person.vehicle}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="call-outline" size={14} color="#666" />
          <Text style={styles.metaText}>{person.phone}</Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="cube-outline" size={14} color="#666" />
          <Text style={styles.metaText}>
            {person.currentOrders}/{person.capacity}
          </Text>
        </View>
        <View style={styles.metaItem}>
          <Ionicons name="star" size={14} color="#F59E0B" />
          <Text style={styles.metaText}>{person.rating}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Stats */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statsContainer}
      >
        {DELIVERY_STATS.map((stat) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </ScrollView>

      {/* Warning Banner */}
      {unassignedCount > 0 && (
        <View style={styles.warningBanner}>
          <Ionicons name="warning-outline" size={20} color="#92400E" />
          <View style={styles.warningContent}>
            <Text style={styles.warningTitle}>Assignment Required</Text>
            <Text style={styles.warningText}>
              {unassignedCount} order(s) packed but not assigned to delivery personnel
            </Text>
          </View>
        </View>
      )}

      {/* Order Assignment Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Order Assignment</Text>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search orders..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* View Filter */}
        <View style={styles.filterRow}>
          {(['all', 'unassigned', 'assigned'] as ViewFilter[]).map((filter) => (
            <TouchableOpacity
              key={filter}
              style={[styles.filterPill, viewFilter === filter && styles.filterPillActive]}
              onPress={() => setViewFilter(filter)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  viewFilter === filter && styles.filterPillTextActive,
                ]}
              >
                {filter.charAt(0).toUpperCase() + filter.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {filteredOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="cube-outline" size={40} color="#ccc" />
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        ) : (
          filteredOrders.map(renderOrderCard)
        )}
      </View>

      {/* Delivery Personnel Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Personnel</Text>
        {DELIVERY_PERSONNEL.map(renderPersonnelCard)}
      </View>

      <View style={{ height: 30 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  warningBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    marginHorizontal: 16,
    padding: 14,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: 8,
  },
  warningContent: {
    marginLeft: 10,
    flex: 1,
  },
  warningTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#92400E',
  },
  warningText: {
    fontSize: 12,
    color: '#92400E',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: '#333',
  },
  filterRow: {
    flexDirection: 'row',
    marginBottom: 12,
    gap: 8,
  },
  filterPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  filterPillActive: {
    backgroundColor: '#FF6B35',
    borderColor: '#FF6B35',
  },
  filterPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#666',
  },
  filterPillTextActive: {
    color: '#fff',
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
  orderInfo: {
    marginBottom: 12,
    gap: 6,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  infoText: {
    fontSize: 13,
    color: '#555',
    flex: 1,
  },
  assignedBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#D1FAE5',
    padding: 10,
    borderRadius: 8,
  },
  assignedText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#047857',
  },
  assignButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: '#FF6B35',
    paddingVertical: 10,
    borderRadius: 10,
  },
  assignButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
  personnelCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  personnelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
  personnelInfo: {
    flex: 1,
  },
  personnelName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 2,
  },
  personnelDetail: {
    fontSize: 12,
    color: '#666',
  },
  availabilityBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  availabilityText: {
    fontSize: 12,
    fontWeight: '600',
  },
  personnelMeta: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaText: {
    fontSize: 12,
    color: '#666',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 30,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
});

export default DeliveryAssignmentScreen;
