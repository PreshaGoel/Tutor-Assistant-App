import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {greyColor, textColor} from '../../constants/colors';
import {font, font_Bold} from '../../constants/fonts';

const ChatMessage = ({email, messages}) => {

  const renderItem = ({item}) => {
    return (
      <View
        style={[
          styles.myMessage,
          item.user.email == email
            ? {
                alignSelf: 'flex-end',
                backgroundColor: 'white',
                borderBottomLeftRadius: 20,
              }
            : {
                alignSelf: 'flex-start',
                backgroundColor: 'white',
                borderBottomRightRadius: 20,
              },
        ]}
        key={item.classCode}>
        <View style={styles.usernameContainer}>
          <Text style={styles.userName}>{item.user.first_name}</Text>
        </View>
        <View style={styles.messageLong}>
          <Text style={styles.message}>{item.message}</Text>
        </View>
        <View style={styles.timeContainer}>
          <Text style={styles.time}>
            {item.on_time.split(':')[0] + ':' + item.on_time.split(':')[1]}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {messages.length > 0 ? (
        <FlatList
          data={messages}
          renderItem={renderItem}
          key={item => item.classCode}
        />
      ) : (
        <Text style={styles.noMessage}>No messages yet</Text>
      )}
    </View>
  );
};

export default ChatMessage;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: '80%',
    paddingVertical: 10,
  },
  myMessage: {
    width: '80%',
    padding: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    marginBottom: 10,
  },
  usernameContainer: {
    width: '100%',
  },
  userName: {
    fontFamily: font_Bold,
    fontSize: 18,
    color: textColor,
  },
  messageLong: {
    width: '100%',
  },
  message: {
    color: textColor,
    fontFamily: font,
    fontSize: 15,
  },
  timeContainer: {
    width: '100%',
    alignItems: 'flex-end',
  },
  time: {
    fontSize: 15,
    color: greyColor,
    fontFamily: font,
  },
  noMessage: {
    fontFamily: font_Bold,
    color: 'white',
    fontSize: 18,
  },
});
