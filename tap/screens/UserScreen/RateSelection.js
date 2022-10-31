import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {font_Bold} from '../../constants/fonts';
import {textColor} from '../../constants/colors';
import InputBox from '../../component/InputBox';

const RateSelection = ({startRate, endRate, setStartRate, setEndRate}) => {
  

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <View style={styles.innerTime}>
          <Text style={styles.text}>Start Rate</Text>
          <InputBox icon={'cash'} label={'Rs./hour'} value={startRate} onChangeText={setStartRate} />
        </View>
        <View style={styles.innerTime}>
          <Text style={styles.text}>End Rate</Text>
          <InputBox icon={'cash'} label={'Rs./hour'} value={endRate} onChangeText={setEndRate} />
        </View>
      </View>
    </View>
  );
};

export default RateSelection;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerTime: {
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontFamily: font_Bold,
    fontSize: 15,
    color: textColor,
  },
});
