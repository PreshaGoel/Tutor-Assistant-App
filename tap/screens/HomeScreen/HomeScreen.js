import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  getAsyncData,
  LogoutBtn,
  StoreUser,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import Background from '../../component/Background';
import DialogComponent from '../../component/DialogComponent';
import FullScreenLoading from '../../component/FullScreenLoading';
import {appURL} from '../../constants/AppConstants';
import SearchBar from './SearchBar';

import TutorList from './TutorList';
import UserHeader from './UserHeader';

const HomeScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');
  const [tutorListLoading, setTutorListLoading] = useState(true);
  const [tutors, setTutors] = useState([]);
  const [image, setImage] = useState('');
  const [userToken, setUserToken] = useState('');

  const getUserData = async () => {
    const data = await getAsyncData(StoreUser);
    const {email, token} = JSON.parse(data);
    setUserToken(token);

    const url = `${appURL}user/get-details?email=${email}`;

    const headers = {
      Authorization: `TOKEN ${token}`,
    };

    const resp = await fetch(url, {
      method: 'GET',
      headers: headers,
    });

    if (resp.status == 200) {
      const response = await resp.json();

      const {first_name, is_linked, avatar} = response;
      if (avatar != '') {
        setImage(`${appURL.slice(0, -1)}${avatar}`);
      } else {
        setImage(avatar);
      }

      setUsername(first_name);

      if (!is_linked) {
        setContent('Please Complete your profile');
        setShowSnack(true);
      }
    } else {
      const response = await resp.json();
      if ('detail' in response) {
        alert(
          'Your account has been dismissed! Please try contacting administrator',
        );
        LogoutBtn();
      }
    }
    setIsLoading(false);
  };

  const getTutors = async () => {
    const url = `${appURL}user/register/tutor?filter=10`;

    const data = await getAsyncData(StoreUser);
    const {email, token} = JSON.parse(data);

    const headers = {
      Authorization: `TOKEN ${token}`,
    };

    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: headers,
      });

      if (resp.status == 200) {
        const response = await resp.json();

        setTutors(response);
      } else {
        const response = await resp.json();
        console.log(response);
        setContent('Server Error! Please try again later');
        setShowSnack(true);
      }
      setTutorListLoading(false);
    } catch (e) {
      console.log(e);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserData();
      getTutors();

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
      <UserHeader
        name={username}
        uri={
          image == ''
            ? 'https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_960_720.jpg'
            : image
        }
      />
      <SearchBar
        token={userToken}
        isLoading={tutorListLoading}
        setIsLoading={setTutorListLoading}
        tutor={tutors}
        setTutor={setTutors}
      />
      <TutorList
        navigation={navigation}
        isLoading={tutorListLoading}
        tutors={tutors}
      />
      <DialogComponent
        visible={showSnack}
        setVisible={setShowSnack}
        Content={content}
      />
    </Background>
  );
};

export default HomeScreen;
