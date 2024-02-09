import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';
import {colors} from '../stylesheet/colors';

const Loader: React.FC = () => {
  return (
    <View testID="loader-testId" style={styles.loaderContainer}>
      <ActivityIndicator size="large" color={colors.primaryColor} />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Loader;
