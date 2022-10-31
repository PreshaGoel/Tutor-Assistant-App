import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {font_Bold} from '../../constants/fonts';

const BackHeader = ({backPress}) => {
  return (
    <View style={styles.container}>
      <View style={styles.backContainer}>
        <AntDesign
          onPress={backPress}
          name="arrowleft"
          size={24}
          color="white"
        />
      </View>
      <View style={styles.HeadingContainer}>
        <Text style={styles.heading}>Reset Password</Text>
      </View>
    </View>
  );
};

export default BackHeader;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  backContainer: {
    width: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  HeadingContainer: {
    width: '80%',
  },
  heading: {
    fontSize: 22,
    color: 'white',
    fontFamily: font_Bold,
  },
});
