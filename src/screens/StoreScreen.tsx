import {Text, View} from 'react-native';
import React from 'react';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {MainStackParamList} from '../navigation/MainNavigation';

type StoreScreenProps = NativeStackScreenProps<MainStackParamList, 'Store'>;

const StoreScreen: React.FC<StoreScreenProps> = () => {
  return (
    <View>
      <Text>StoreScreen</Text>
    </View>
  );
};

export default StoreScreen;
