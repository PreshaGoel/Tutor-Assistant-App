import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {font, font_Bold} from '../../constants/fonts';

const HistoryHeader = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>History</Text>
      <Text style={styles.subheading}>Tutors You Contacted</Text>
    </View>
  );
};

export default HistoryHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 15,
  },
  heading: {
    fontFamily: font_Bold,
    color: 'white',
    fontSize: 28,
  },
  subheading: {
    fontFamily: font,
    color: 'white',
    fontSize: 22,
  },
});
