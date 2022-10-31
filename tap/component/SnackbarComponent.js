import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Snackbar} from 'react-native-paper';
import {dangerText} from '../constants/colors';

const SnakbarComponent = ({
  visible,
  setVisible,
  onPress,
  text,
  danger = true,
}) => {
  return (
    <View style={styles.container}>
      <Snackbar
        visible={visible}
        onDismiss={() => setVisible(false)}
        action={{
          label: 'OKAY',
          onPress: onPress,
          color: 'white',
        }}
        duration={2000}
        style={[
          styles.snackBar,
          {backgroundColor: danger ? dangerText : 'green'},
        ]}>
        {text}
      </Snackbar>
    </View>
  );
};

export default SnakbarComponent;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  snackBar: {
    color: 'white',
  },
});
