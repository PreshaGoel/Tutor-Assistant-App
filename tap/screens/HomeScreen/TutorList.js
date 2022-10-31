import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ProgressiveImage from '../../component/ProgressiveImage';
import {greyColor, primaryColor, textColor} from '../../constants/colors';
import {font, font_Bold} from '../../constants/fonts';
import {globalStyles} from '../../styles/Styles';
import {appURL} from '../../constants/AppConstants';

const TutorList = ({navigation, isLoading, tutors}) => {
  const onPress = email => {
    navigation.navigate('Tutor', {email});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.tutorName}>Tutors List</Text>
      {isLoading ? (
        <View style={styles.container}>
          <ActivityIndicator size={'large'} color={primaryColor} />
        </View>
      ) : (
        <ScrollView
          style={globalStyles.styleScroll}
          contentContainerStyle={styles.scrollContaier}
          showsVerticalScrollIndicator={false}>
          {tutors.length > 0 &&
            tutors.map(item => {
              var data = item.subjects;
              data = data.split(',')[0];
              data = data.slice(3);
              const timeSlot = `${item.startTime} - ${item.endTime}`;
              
              return (
                <View style={styles.tutorContainer} key={item.id}>
                  <View style={styles.imageContainer}>
                    <ProgressiveImage
                      url={
                        item.avatar.length > 1
                          ? `${appURL}media/${item.avatar}`
                          : 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
                      }
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.speciality}>{data}</Text>
                    <Text style={styles.tutorName}>{item.first_name}</Text>
                    <Text style={styles.timeslot}>{timeSlot}</Text>
                  </View>
                  <View style={styles.bookingContainer}>
                    <TouchableOpacity
                      style={styles.btn}
                      onPress={() => {
                        onPress(item.email);
                      }}>
                      <Text style={styles.btnText}>See Profile</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              );
            })}
        </ScrollView>
      )}
    </View>
  );
};

export default TutorList;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '90%',
    padding: 5,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scrollContaier: {
    flexGrow: 1,
    alignItems: 'center',
    // maxHeight: '50%',
  },
  styleScroll: {
    maxHeight: '50%',
  },
  tutorContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  imageContainer: {
    width: '25%',
    height: 100,
    alignContent: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '50%',
    marginLeft: 10,
    alignContent: 'center',
    justifyContent: 'center',
  },
  speciality: {
    color: greyColor,
    fontFamily: font,
    fontSize: 15,
  },
  tutorName: {
    color: textColor,
    fontFamily: font_Bold,
    fontSize: 20,
  },
  timeslot: {
    color: textColor,
    fontFamily: font_Bold,
    fontSize: 18,
  },
  bookingContainer: {
    width: '25%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  btn: {
    width: '100%',
  },
  btnText: {
    color: primaryColor,
    fontFamily: font_Bold,
  },
});
