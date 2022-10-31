import {
  StyleSheet,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import {primaryColor} from '../constants/colors';

const Button = ({mode = 'primary', text, onPress, isLoading = false}) => {
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
          color={mode === 'primary' ? 'white' : primaryColor}
        />
      )}
    </TouchableOpacity>
  );
};

export default Button;

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
    backgroundColor: primaryColor,
  },
  container_outlined: {
    backgroundColor: 'white',
    borderColor: primaryColor,
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
    color: primaryColor,
  },
});
