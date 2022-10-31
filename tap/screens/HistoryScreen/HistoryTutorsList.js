import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import CircularImage from '../../component/CircularImage';
import {font, font_Bold} from '../../constants/fonts';
import {greyColor, textColor} from '../../constants/colors';
import {appURL} from '../../constants/AppConstants';

const HistoryTutorsList = ({navigation, messages, types}) => {
  const handlePress = code => {
    navigation.navigate('ChatMessage', {code});
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={{width: '100%'}}
        contentContainerStyle={{paddingBottom: 10}}>
        {!messages.length > 0 ? (
          <Text>No Teachers Request Yet</Text>
        ) : (
          messages.map(item => {
            var tutor_avatar;
            if (item.tutor.avatar != null) {
              tutor_avatar = types == 'Student' ? `${appURL}media/${item.tutor.avatar}` : `${appURL}media/${item.student.avatar}` ;
            } else {
              tutor_avatar =
                'https://www.investnational.com.au/wp-content/uploads/2016/08/person-stock-2.png';
            }

            return (
              <TouchableOpacity
                onPress={() => {
                  handlePress(item.classCode);
                }}
                key={item.classCode}
                style={{width: '100%'}}>
                <View key={item.id} style={styles.chatDiv}>
                  <View style={styles.imageDiv}>
                    <CircularImage url={tutor_avatar} />
                  </View>
                  <View style={styles.messageDiv}>
                    <View style={styles.headingTime}>
                      <Text style={styles.name}>
                        {types == 'Tutor'
                          ? item.student.first_name
                          : item.tutor.first_name}
                      </Text>
                      <Text style={styles.time}>
                        {item.on_date.split('T')[0]}
                      </Text>
                    </View>
                    <View style={styles.messageLong}>
                      <Text
                        numberOfLines={1}
                        ellipsizeMode={'tail'}
                        style={styles.message}>
                        {item.classCode}
                      </Text>
                    </View>
                  </View>
                </View>
                <View style={styles.line} />
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
};

export default HistoryTutorsList;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: 'white',
    padding: 5,
    borderRadius: 15,
  },
  chatDiv: {
    width: '100%',
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageDiv: {
    width: 50,
    height: 45,
    justifyContent: 'center',
  },
  messageDiv: {
    width: '80%',
    alignItems: 'center',
  },
  headingTime: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 18,
    fontFamily: font_Bold,
    color: textColor,
  },
  time: {
    color: greyColor,
    fontSize: 15,
    fontFamily: font,
  },
  messageLong: {
    width: '100%',
  },
  message: {
    color: greyColor,
    fontFamily: font,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: greyColor,
  },
});
