import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ORDER_STATUS_COLORS } from '../../types/warehouse';

interface StatusBadgeProps {
  status: string;
}

const DEFAULT_COLOR = { bg: '#F5F5F5', text: '#666', label: 'Unknown' };

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const colors = ORDER_STATUS_COLORS[status.toLowerCase()] || DEFAULT_COLOR;

  return (
    <View style={[styles.badge, { backgroundColor: colors.bg }]}>
      <Text style={[styles.text, { color: colors.text }]}>{colors.label}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  text: {
    fontSize: 12,
    fontWeight: '600',
  },
});

export default StatusBadge;
