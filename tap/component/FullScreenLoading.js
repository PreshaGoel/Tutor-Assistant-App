import {ActivityIndicator, StyleSheet, View} from 'react-native';
import React from 'react';
import {primaryColor} from '../constants/colors';

const FullScreenLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={primaryColor} />
    </View>
  );
};

export default FullScreenLoading;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
