import {StyleSheet, View} from 'react-native';
import React from 'react';

const Divider: React.FC = () => {
  return <View style={styles.divider} />;
};

export default Divider;

const styles = StyleSheet.create({
  divider: {
    borderWidth: 0.5,
    borderColor: 'lightgrey',
    marginVertical: 10,
  },
});
