import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { AuthProvider, useAuth } from './src/context/AuthContext';
import { CartProvider } from './src/context/CartContext';
import { ProductsProvider } from './src/context/ProductsContext';
import TabNavigator from './src/navigation/TabNavigator';
import OrderConfirmationScreen from './src/screens/OrderConfirmationScreen';
import MyOrdersScreen from './src/screens/MyOrdersScreen';
import WarehouseScreen from './src/screens/warehouse/WarehouseScreen';
import { RootStackParamList } from './src/types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContent() {
  const { isWarehouseUser } = useAuth();

  if (isWarehouseUser) {
    return <WarehouseScreen />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainTabs" component={TabNavigator} />
        <Stack.Screen name="OrderConfirmation" component={OrderConfirmationScreen} />
        <Stack.Screen name="MyOrders" component={MyOrdersScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ProductsProvider>
          <CartProvider>
            <StatusBar style="dark" />
            <AppContent />
          </CartProvider>
        </ProductsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
