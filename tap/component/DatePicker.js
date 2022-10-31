import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {DatePickerModal, registerTranslation} from 'react-native-paper-dates';
import InputBox from './InputBox';
import {en} from 'react-native-paper-dates';
registerTranslation('en', en);

const DatePicker = ({date, setDate}) => {
  const [show, setShow] = useState(false);

  const onDimiss = () => {
    setShow(false);
  };

  const onConfirm = params => {
    setShow(false);
    setDate(params.date);
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => setShow(true)}>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={show}
        onDismiss={onDimiss}
        date={date}
        onConfirm={onConfirm}
        animationType="slide"
      />
      <InputBox
        value={date.toDateString()}
        icon={'calendar-range'}
        disabled={true}
      />
    </TouchableOpacity>
  );
};

export default DatePicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
