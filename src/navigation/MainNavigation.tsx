import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import StoreScreen from '../screens/StoreScreen';
import {Store} from '../services/stores/storesTranslators';

export type MainStackParamList = {
  Home: undefined;
  Store: {store: Store};
};

const Stack = createNativeStackNavigator<MainStackParamList>();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Store" component={StoreScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
