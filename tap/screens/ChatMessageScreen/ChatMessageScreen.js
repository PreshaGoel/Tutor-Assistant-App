import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import Background from '../../component/Background';
import ChatMessage from './ChatMessage';
import SendMessage from './SendMessage';
import FullScreenLoading from '../../component/FullScreenLoading';
import {useFocusEffect} from '@react-navigation/native';
import {appURL} from '../../constants/AppConstants';
import {
  getAsyncData,
  StoreUser,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import SnakbarComponent from '../../component/SnackbarComponent';

const ChatMessageScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [userEmail, setUserEmail] = useState();
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');
  const [changeData, setChangeData] = useState(true);
  const [classCode, setClassCode] = useState('');

  const getMessages = async () => {
    try {
      const {code} = route.params;
      setClassCode(code);
      const {token, email} = JSON.parse(await getAsyncData(StoreUser));
      setUserEmail(email);

      const url = `${appURL}contact/getchatmessage?classCode=${code}`;
      const headers = {
        Authorization: `TOKEN ${token}`,
      };

      const resp = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (resp.status == 200) {
        const response = await resp.json();
        
        setMessages(response);
      } else {
        setContent('Server not available');
        setShowSnack(true);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getMessages();

      return () => {
        setIsLoading(true);
      };
    }, []),
  );

  useEffect(() => {
    getMessages();
  }, [changeData]);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <Background>
      <ChatMessage messages={messages} email={userEmail} />
      <SendMessage
        code={classCode}
        setChangeData={setChangeData}
        changeData={changeData}
      />
      <SnakbarComponent />
    </Background>
  );
};

export default ChatMessageScreen;

const styles = StyleSheet.create({});
