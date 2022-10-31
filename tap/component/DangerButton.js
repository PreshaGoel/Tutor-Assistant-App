import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {dangerText, primaryColor} from '../constants/colors';

const DangerButton = ({mode = 'primary', text, onPress, isLoading = false}) => {
  return (
    <TouchableOpacity
      delayPressIn={0}
      onPress={onPress}
      disabled={isLoading}
      style={[styles.container, styles[`container_${mode}`]]}>
      {!isLoading ? (
        <Text style={[styles.text, styles[`text_${mode}`]]}>{text}</Text>
      ) : (
        <ActivityIndicator
          size={'large'}
          color={mode === 'primary' ? 'white' : dangerText}
        />
      )}
    </TouchableOpacity>
  );
};

export default DangerButton;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 55,
    marginVertical: 12,
    borderRadius: 5,
    elevation: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  container_primary: {
    backgroundColor: dangerText,
  },
  container_outlined: {
    backgroundColor: 'white',
    borderColor: dangerText,
    borderWidth: 1.5,
  },
  text: {
    fontFamily: 'OpenSans-Bold',
    fontSize: 18,
    textTransform: 'uppercase',
  },
  text_primary: {
    color: 'white',
  },
  text_outlined: {
    color: dangerText,
  },
});
