import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {font_Bold} from '../../constants/fonts';
import {greyColor, textColor} from '../../constants/colors';
import {globalStyles} from '../../styles/Styles';
import Button from '../../component/Button';
import Line from '../../component/Line';

const InfoDiv = ({data, navigation, types}) => {
  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Details</Text>
      </View>
      <ScrollView
        style={globalStyles.styleScroll}
        contentContainerStyle={styles.scrollContaier}
        showsVerticalScrollIndicator={false}>
        {data.map(item => {
          return (
            <View style={{width: '100%'}} key={item.id}>
              <View style={styles.details}>
                <View style={styles.keyContainer}>
                  <Text style={styles.key}>{item.key} : </Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.value}>{item.value}</Text>
                </View>
              </View>
              <Line />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          text={'Edit'}
          onPress={() => navigation.navigate('UserEdit', {types})}
        />
      </View>
    </View>
  );
};

export default InfoDiv;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
  },
  scrollContaier: {
    flexGrow: 1,
    alignItems: 'center',
  },
  headingContainer: {
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  heading: {
    fontFamily: font_Bold,
    fontSize: 18,
    color: textColor,
    textTransform: 'uppercase',
  },
  details: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  keyContainer: {
    width: '35%',
  },
  key: {
    fontFamily: font_Bold,
    color: greyColor,
    fontSize: 18,
  },
  valueContainer: {
    width: '65%',
  },
  value: {
    fontFamily: font_Bold,
    color: textColor,
    fontSize: 18,
  },
  btnContainer: {
    width: '100%',
  },
});
