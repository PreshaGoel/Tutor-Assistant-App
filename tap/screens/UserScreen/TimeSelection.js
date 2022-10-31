import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import TimePicker from '../../component/TimePicker';
import {font_Bold} from '../../constants/fonts';
import {textColor} from '../../constants/colors';

const TimeSelection = ({startTime, setStartTime, endTime, setEndTime}) => {
  

  return (
    <View style={styles.container}>
      <View style={styles.timeContainer}>
        <View style={styles.innerTime}>
          <Text style={styles.text}>Start Time</Text>
          <TimePicker time={startTime} setTime={setStartTime} />
        </View>
        <View style={styles.innerTime}>
          <Text style={styles.text}>End Time</Text>
          <TimePicker time={endTime} setTime={setEndTime} />
        </View>
      </View>
    </View>
  );
};

export default TimeSelection;

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
