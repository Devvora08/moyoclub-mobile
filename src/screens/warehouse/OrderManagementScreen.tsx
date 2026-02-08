import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import StatusBadge from '../../components/warehouse/StatusBadge';
import {
  ApiOrder,
  STATUS_TRANSITIONS,
  STATUS_ACTION_LABELS,
  ORDER_STATUS_COLORS,
} from '../../types/warehouse';
import {
  fetchWarehouseOrders,
  updateOrderStatus,
} from '../../api/warehouseOrders';

type StatusFilter = 'all' | string;

const STATUS_FILTERS: { key: StatusFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'accepted', label: 'Accepted' },
  { key: 'processing', label: 'Processing' },
  { key: 'packed', label: 'Packed' },
  { key: 'dispatched', label: 'Dispatched' },
  { key: 'delivered', label: 'Delivered' },
  { key: 'rejected', label: 'Rejected' },
];

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

const OrderManagementScreen: React.FC = () => {
  const [orders, setOrders] = useState<ApiOrder[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedOrder, setSelectedOrder] = useState<ApiOrder | null>(null);
  const [updatingStatus, setUpdatingStatus] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);

  const loadOrders = useCallback(async (page = 1, refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else if (page === 1) setIsLoading(true);

    try {
      const response = await fetchWarehouseOrders(page);
      if (page === 1) {
        setOrders(response.data);
      } else {
        setOrders((prev) => [...prev, ...response.data]);
      }
      setCurrentPage(response.current_page);
      setLastPage(response.last_page);
      setTotalOrders(response.total);
    } catch (err: any) {
      Alert.alert('Error', err?.response?.data?.message || 'Failed to load orders.');
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadOrders();
  }, [loadOrders]);

  const filteredOrders = useMemo(() => {
    let result = orders;

    if (statusFilter !== 'all') {
      result = result.filter((o) => o.status.toLowerCase() === statusFilter);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (o) =>
          o.order_uid.toLowerCase().includes(q) ||
          o.user.name.toLowerCase().includes(q) ||
          o.user.email.toLowerCase().includes(q)
      );
    }

    return result;
  }, [orders, statusFilter, searchQuery]);

  // Compute stats from loaded orders
  const orderStats = useMemo(() => {
    const counts: Record<string, number> = {};
    orders.forEach((o) => {
      const s = o.status.toLowerCase();
      counts[s] = (counts[s] || 0) + 1;
    });
    return [
      { label: 'Total', value: totalOrders, icon: 'receipt-outline', color: '#FF6B35' },
      { label: 'Pending', value: counts['pending'] || 0, icon: 'time-outline', color: '#F59E0B' },
      { label: 'Accepted', value: counts['accepted'] || 0, icon: 'checkmark-outline', color: '#1E40AF' },
      { label: 'Processing', value: counts['processing'] || 0, icon: 'cog-outline', color: '#8B5CF6' },
      { label: 'Packed', value: counts['packed'] || 0, icon: 'cube-outline', color: '#3730A3' },
      { label: 'Dispatched', value: counts['dispatched'] || 0, icon: 'car-outline', color: '#3B82F6' },
      { label: 'Delivered', value: counts['delivered'] || 0, icon: 'checkmark-done-outline', color: '#10B981' },
    ];
  }, [orders, totalOrders]);

  const handleStatusUpdate = (order: ApiOrder, newStatus: string) => {
    const actionLabel = STATUS_ACTION_LABELS[newStatus];
    const confirmText = newStatus === 'rejected'
      ? `Are you sure you want to reject order ${order.order_uid}?`
      : `${actionLabel?.label} order ${order.order_uid}?`;

    Alert.alert('Update Status', confirmText, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: actionLabel?.label || 'Confirm',
        style: newStatus === 'rejected' ? 'destructive' : 'default',
        onPress: async () => {
          setUpdatingStatus(true);
          try {
            const updated = await updateOrderStatus(order.id, newStatus);
            setOrders((prev) =>
              prev.map((o) => (o.id === order.id ? { ...o, status: updated.status || newStatus } : o))
            );
            if (selectedOrder?.id === order.id) {
              setSelectedOrder((prev) => prev ? { ...prev, status: updated.status || newStatus } : prev);
            }
            Alert.alert('Success', `Order ${order.order_uid} updated to ${newStatus}.`);
          } catch (err: any) {
            Alert.alert('Error', err?.response?.data?.message || 'Failed to update status.');
          } finally {
            setUpdatingStatus(false);
          }
        },
      },
    ]);
  };

  const getAvailableTransitions = (status: string): string[] => {
    return STATUS_TRANSITIONS[status.toLowerCase()] || [];
  };

  // ---- Order Detail View ----
  if (selectedOrder) {
    const order = orders.find((o) => o.id === selectedOrder.id) || selectedOrder;
    const transitions = getAvailableTransitions(order.status);

    return (
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setSelectedOrder(null)}
        >
          <Ionicons name="arrow-back" size={22} color="#333" />
          <Text style={styles.backText}>Back to Orders</Text>
        </TouchableOpacity>

        {/* Order Header */}
        <View style={styles.detailHeader}>
          <View>
            <Text style={styles.detailOrderId}>{order.order_uid}</Text>
            <Text style={styles.detailDate}>{formatDate(order.created_at)}</Text>
          </View>
          <StatusBadge status={order.status} />
        </View>

        {/* Customer Information */}
        <View style={styles.detailCard}>
          <Text style={styles.detailCardTitle}>Customer Information</Text>
          <View style={styles.detailRow}>
            <Ionicons name="person-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Name</Text>
            <Text style={styles.detailValue}>{order.user.name}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="mail-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>{order.user.email}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="call-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Phone</Text>
            <Text style={styles.detailValue}>{order.user.mobile}</Text>
          </View>
        </View>

        {/* Transaction Info */}
        <View style={styles.detailCard}>
          <Text style={styles.detailCardTitle}>Transaction</Text>
          <View style={styles.detailRow}>
            <Ionicons name="card-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>TXN ID</Text>
            <Text style={[styles.detailValue, { flex: 1 }]} numberOfLines={1}>{order.transaction_id}</Text>
          </View>
          <View style={styles.detailRow}>
            <Ionicons name="calendar-outline" size={16} color="#666" />
            <Text style={styles.detailLabel}>Paid At</Text>
            <Text style={styles.detailValue}>{order.paid_at ? formatDate(order.paid_at) : 'Not paid'}</Text>
          </View>
        </View>

        {/* Order Items */}
        <View style={styles.detailCard}>
          <Text style={styles.detailCardTitle}>Order Items</Text>
          {order.items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemInfo}>
                <Text style={styles.itemName}>{item.product_name}</Text>
                <Text style={styles.itemMeta}>ID: {item.product_id}</Text>
              </View>
              <View style={styles.itemPricing}>
                <Text style={styles.itemQty}>x{item.quantity}</Text>
                <Text style={styles.itemPrice}>{'\u20B9'}{item.total}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Pricing Summary */}
        <View style={styles.detailCard}>
          <Text style={styles.detailCardTitle}>Pricing Summary</Text>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Subtotal</Text>
            <Text style={styles.pricingValue}>{'\u20B9'}{order.subtotal}</Text>
          </View>
          <View style={styles.pricingRow}>
            <Text style={styles.pricingLabel}>Tax</Text>
            <Text style={styles.pricingValue}>{'\u20B9'}{order.tax}</Text>
          </View>
          <View style={[styles.pricingRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{'\u20B9'}{order.total}</Text>
          </View>
        </View>

        {/* Status Actions */}
        {transitions.length > 0 && (
          <View style={styles.detailCard}>
            <Text style={styles.detailCardTitle}>Update Status</Text>
            <View style={styles.actionButtons}>
              {transitions.map((nextStatus) => {
                const action = STATUS_ACTION_LABELS[nextStatus];
                if (!action) return null;
                return (
                  <TouchableOpacity
                    key={nextStatus}
                    style={[styles.statusActionButton, { backgroundColor: action.color }]}
                    onPress={() => handleStatusUpdate(order, nextStatus)}
                    disabled={updatingStatus}
                  >
                    {updatingStatus ? (
                      <ActivityIndicator size="small" color="#fff" />
                    ) : (
                      <>
                        <Ionicons name={action.icon as any} size={18} color="#fff" />
                        <Text style={styles.actionButtonText}>{action.label}</Text>
                      </>
                    )}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        )}

        <View style={{ height: 30 }} />
      </ScrollView>
    );
  }

  // ---- Order List View ----
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#FF6B35" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={() => loadOrders(1, true)}
          colors={['#FF6B35']}
          tintColor="#FF6B35"
        />
      }
    >
      {/* Stats */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.statsContainer}
      >
        {orderStats.map((stat) => (
          <View key={stat.label} style={styles.statCard}>
            <Ionicons name={stat.icon as any} size={20} color={stat.color} />
            <Text style={styles.statValue}>{stat.value}</Text>
            <Text style={styles.statLabel}>{stat.label}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Search */}
      <View style={styles.searchSection}>
        <View style={styles.searchContainer}>
          <Ionicons name="search-outline" size={18} color="#999" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search by order ID, name, or email..."
            placeholderTextColor="#999"
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
        </View>

        {/* Status Filter */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filterRow}
        >
          {STATUS_FILTERS.map((filter) => (
            <TouchableOpacity
              key={filter.key}
              style={[
                styles.filterPill,
                statusFilter === filter.key && styles.filterPillActive,
              ]}
              onPress={() => setStatusFilter(filter.key)}
            >
              <Text
                style={[
                  styles.filterPillText,
                  statusFilter === filter.key && styles.filterPillTextActive,
                ]}
              >
                {filter.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Orders List */}
      <View style={styles.listSection}>
        {filteredOrders.length === 0 ? (
          <View style={styles.emptyState}>
            <Ionicons name="receipt-outline" size={40} color="#ccc" />
            <Text style={styles.emptyText}>No orders found</Text>
          </View>
        ) : (
          filteredOrders.map((order) => (
            <View key={order.id} style={styles.orderCard}>
              <View style={styles.orderHeader}>
                <Text style={styles.orderId}>{order.order_uid}</Text>
                <StatusBadge status={order.status} />
              </View>

              <View style={styles.orderMeta}>
                <View style={styles.metaRow}>
                  <Ionicons name="person-outline" size={14} color="#666" />
                  <Text style={styles.metaText}>{order.user.name}</Text>
                </View>
                <View style={styles.metaRow}>
                  <Ionicons name="call-outline" size={14} color="#666" />
                  <Text style={styles.metaText}>{order.user.mobile}</Text>
                </View>
                <View style={styles.orderFooter}>
                  <Text style={styles.itemsCount}>
                    {order.items.length} item(s)
                  </Text>
                  <Text style={styles.orderTotal}>{'\u20B9'}{order.total}</Text>
                </View>
                <Text style={styles.orderDate}>{formatDate(order.created_at)}</Text>
              </View>

              {/* Quick action buttons on the card */}
              {getAvailableTransitions(order.status).length > 0 && (
                <View style={styles.quickActions}>
                  {getAvailableTransitions(order.status).map((nextStatus) => {
                    const action = STATUS_ACTION_LABELS[nextStatus];
                    if (!action) return null;
                    return (
                      <TouchableOpacity
                        key={nextStatus}
                        style={[styles.quickActionBtn, { borderColor: action.color }]}
                        onPress={() => handleStatusUpdate(order, nextStatus)}
                      >
                        <Text style={[styles.quickActionText, { color: action.color }]}>
                          {action.label}
                        </Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              )}

              <TouchableOpacity
                style={styles.viewButton}
                onPress={() => setSelectedOrder(order)}
              >
                <Text style={styles.viewButtonText}>View Details</Text>
                <Ionicons name="chevron-forward" size={16} color="#FF6B35" />
              </TouchableOpacity>
            </View>
          ))
        )}

        {/* Load More */}
        {currentPage < lastPage && (
          <TouchableOpacity
            style={styles.loadMoreButton}
            onPress={() => loadOrders(currentPage + 1)}
          >
            <Text style={styles.loadMoreText}>Load More Orders</Text>
          </TouchableOpacity>
        )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  statsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 10,
  },
  statCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    minWidth: 100,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1a1a1a',
    marginTop: 6,
  },
  statLabel: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  searchSection: {
    paddingHorizontal: 16,
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
    gap: 8,
    paddingBottom: 8,
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
  listSection: {
    paddingHorizontal: 16,
    paddingTop: 8,
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
    marginBottom: 10,
  },
  orderId: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FF6B35',
  },
  orderMeta: {
    marginBottom: 12,
    gap: 4,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  metaText: {
    fontSize: 13,
    color: '#555',
  },
  orderFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
  },
  itemsCount: {
    fontSize: 13,
    color: '#666',
  },
  orderTotal: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
  },
  orderDate: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  quickActions: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  quickActionBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1.5,
    alignItems: 'center',
  },
  quickActionText: {
    fontSize: 13,
    fontWeight: '600',
  },
  viewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    gap: 4,
  },
  viewButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  loadMoreButton: {
    alignItems: 'center',
    paddingVertical: 14,
    marginBottom: 8,
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF6B35',
  },
  loadMoreText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FF6B35',
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 14,
    color: '#999',
    marginTop: 8,
  },
  // Detail Screen Styles
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 14,
  },
  backText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
  },
  detailHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  detailOrderId: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FF6B35',
  },
  detailDate: {
    fontSize: 13,
    color: '#666',
    marginTop: 2,
  },
  detailCard: {
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
    elevation: 2,
  },
  detailCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1a1a1a',
    marginBottom: 14,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 10,
  },
  detailLabel: {
    fontSize: 13,
    color: '#999',
    width: 60,
  },
  detailValue: {
    fontSize: 13,
    color: '#333',
    fontWeight: '500',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f5f5f5',
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
  itemMeta: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  itemPricing: {
    alignItems: 'flex-end',
  },
  itemQty: {
    fontSize: 12,
    color: '#666',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  pricingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  pricingLabel: {
    fontSize: 14,
    color: '#666',
  },
  pricingValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#e8e8e8',
    paddingTop: 10,
    marginTop: 4,
    marginBottom: 0,
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
  actionButtons: {
    gap: 10,
  },
  statusActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 10,
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

export default OrderManagementScreen;
