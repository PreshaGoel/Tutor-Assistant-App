import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  getAsyncData,
  LogoutBtn,
  StoreUser,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import Background from '../../component/Background';
import FullScreenLoading from '../../component/FullScreenLoading';
import SnakbarComponent from '../../component/SnackbarComponent';
import {appURL} from '../../constants/AppConstants';
import HistoryHeader from './HistoryHeader';
import HistoryTutorsList from './HistoryTutorsList';

const HistoryScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');
  const [types, setTypes] = useState('');

  const getHistoryData = async () => {
    try {
      const data = JSON.parse(await getAsyncData(StoreUser));
      const {token, email} = data;
      const url = `${appURL}contact/getclassrequest?user_id=${email}`;

      const headers = {
        Authorization: `TOKEN ${token}`,
      };

      const resp = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (resp.status == 200) {
        const response = await resp.json();
        if (response.length > 0) {
          if (email == response[0].student.email) {
            setTypes('Student');
          }
          if (email == response[0].tutor.email) {
            setTypes('Tutor');
          }
        }

        setMessages(response);
      } else {
        const response = await resp.json();
        if ('details' in response) {
          alert('Account Temporary Blocked');
          LogoutBtn();
        }
        setContent('Server Error please try again later');
        setShowSnack(true);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getHistoryData();
      return () => {
        setIsLoading(true);
      };
    }, []),
  );

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <Background>
      <HistoryHeader />
      <HistoryTutorsList
        navigation={navigation}
        messages={messages}
        types={types}
      />
      <SnakbarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
      />
    </Background>
  );
};

export default HistoryScreen;
