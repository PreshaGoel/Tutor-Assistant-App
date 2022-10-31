import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import InputBox from '../../component/InputBox';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {primaryColor} from '../../constants/colors';
import {
  getAsyncData,
  StoreUser,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import {appURL} from '../../constants/AppConstants';

const SendMessage = ({code, changeData, setChangeData}) => {
  const [message, setMessage] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (message.length > 0) {
      setIsLoading(true);
      try {
        const {token, email} = JSON.parse(await getAsyncData(StoreUser));
        const data = {
          classCode: code,
          user: email,
          message: message.trim(),
        };

        const url = `${appURL}contact/setchatmessage`;

        const headers = {
          Authorization: `TOKEN ${token}`,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        };

        const resp = await fetch(url, {
          method: 'POST',
          headers: headers,
          body: JSON.stringify(data),
        });

        if (resp.status == 201) {
          setChangeData(!changeData);
        }
        setMessage('');
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <InputBox
          label={'Message'}
          icon={'forum'}
          value={message}
          onChangeText={setMessage}
        />
      </View>
      <TouchableOpacity
        style={styles.sendButton}
        onPress={handleSend}
        disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color={primaryColor} size={'large'} />
        ) : (
          <Ionicons name="send" color={primaryColor} size={24} />
        )}
      </TouchableOpacity>
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '25%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    width: '80%',
  },
  sendButton: {
    backgroundColor: 'white',
    width: 50,
    height: 50,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
