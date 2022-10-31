import {StyleSheet, Text} from 'react-native';
import React from 'react';

const Subheading = props => {
  const color = props.color;
  return <Text style={[styles.header, {color: color}]} {...props} />;
};

export default Subheading;

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    textAlign: 'center',
    fontFamily: 'OpenSans',
    marginBottom: 10,
  },
});
