import {StyleSheet, View} from 'react-native';
import React from 'react';
import {primaryColor} from '../constants/colors';

const Line = () => {
  return <View style={styles.line}></View>;
};

export default Line;

const styles = StyleSheet.create({
  line: {
    height: 2,
    width: '100%',
    backgroundColor: primaryColor,
    marginVertical: 10,
  },
});
