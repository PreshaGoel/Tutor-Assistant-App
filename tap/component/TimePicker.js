import {StyleSheet, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {TimePickerModal, registerTranslation} from 'react-native-paper-dates';
import {en} from 'react-native-paper-dates';
import InputBox from './InputBox';
registerTranslation('en', en);

const TimePicker = ({time, setTime}) => {
  const [show, setShow] = useState(false);

  const onDimiss = () => {
    setShow(false);
  };

  const onConfirm = ({hours, minutes}) => {
    setShow(false);
    setTime({hours, minutes});
  };

  return (
    <TouchableOpacity style={styles.container} onPress={() => setShow(true)}>
      <TimePickerModal
        visible={show}
        onDismiss={onDimiss}
        onConfirm={onConfirm}
        label="Select time"
        uppercase={false}
        cancelLabel="Cancel"
        confirmLabel="Ok"
        animationType="fade"
      />
      <InputBox
        value={time.hours + ':' + time.minutes}
        icon={'calendar-range'}
        disabled={true}
      />
    </TouchableOpacity>
  );
};

export default TimePicker;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
