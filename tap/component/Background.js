import {
  StyleSheet,
  StatusBar,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React from 'react';
import {primaryColor} from '../constants/colors';

const Background = ({
  children,
  barStyle = 'light-content',
  bgColor = primaryColor,
}) => {
  return (
    <ImageBackground
      source={require('../assets/images/background.png')}
      resizeMode="cover"
      style={styles.background}>
      <StatusBar barStyle={barStyle} backgroundColor={bgColor} />
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : null}
        keyboardVerticalOffset={Platform.select({
          ios: () => 0,
          android: () => 2,
        })()}>
        <StatusBar barStyle={barStyle} backgroundColor={bgColor} />
        {children}
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

export default Background;

const styles = StyleSheet.create({
  container: {
    padding: 5,
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  background: {
    height: '100%',
    width: '100%',
  },
});
