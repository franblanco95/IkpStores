import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {ShippingMethod} from '../services/stores/storesService';
import {colors} from '../stylesheet/colors';
import Entypo from 'react-native-vector-icons/Entypo';

interface StoreShippingMethodsProps {
  shippingMethods: ShippingMethod[];
}

const StoreShippingMethods: React.FC<StoreShippingMethodsProps> = ({
  shippingMethods,
}) => {
  return (
    <>
      <Text style={styles.storeSubtitle}>Shipping Methods</Text>
      {shippingMethods.map(method => (
        <View key={method.id} style={styles.taskContainer}>
          <Text style={styles.shippingTitle}>{method.name}:</Text>
          <View style={styles.shippingSubContainer}>
            <Entypo name="level-down" size={22} color={colors.primaryColor} />
            <Text style={styles.shippingDescription}>
              ({method.description})
            </Text>
          </View>
        </View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  storeSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.primaryColor,
    marginVertical: 10,
  },
  taskContainer: {
    margin: 10,
    padding: 10,
    backgroundColor: colors.secondaryColor,
    borderRadius: 10,
  },
  shippingTitle: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  shippingSubContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  shippingDescription: {
    color: 'white',
    fontWeight: '400',
    marginLeft: 3,
  },
});

export default StoreShippingMethods;
