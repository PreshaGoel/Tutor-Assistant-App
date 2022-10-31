import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {font_Bold} from '../../constants/fonts';
import {greyColor, primaryColor, textColor} from '../../constants/colors';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DetailsDiv = ({price, timeslot, rating = 0}) => {
  return (
    <View style={styles.container}>
      <View style={styles.column}>
        <View style={styles.icon}>
          <FontAwesome name="money" color={primaryColor} size={30} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.tag}>Price</Text>
          <Text style={styles.text}>Rs. {price} / Hr.</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.column}>
        <View style={styles.icon}>
          <Entypo name="back-in-time" color={primaryColor} size={30} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.tag}>Time Slot</Text>
          <Text style={styles.text}>{timeslot}</Text>
        </View>
      </View>
      <View style={styles.line} />
      <View style={styles.column}>
        <View style={styles.icon}>
          <AntDesign name="star" color={primaryColor} size={30} />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.tag}>Rating</Text>
          <Text style={styles.text}>{rating}</Text>
        </View>
      </View>
    </View>
  );
};

export default DetailsDiv;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '12%',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    zIndex: -1,
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  column: {
    width: '33%',
    alignItems: 'center',
  },
  line: {
    width: 2,
    height: '80%',
    backgroundColor: 'black',
  },
  textContainer: {
    width: '100%',
    alignItems: 'center',
  },
  text: {
    fontFamily: font_Bold,
    fontSize: 14,
    color: textColor,
  },
  tag: {
    fontFamily: font_Bold,
    fontSize: 12,
    color: greyColor,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
});
