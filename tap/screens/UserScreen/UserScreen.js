import React, {useEffect, useState} from 'react';
import {
  getAsyncData,
  StoreUser,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import Background from '../../component/Background';
import FullScreenLoading from '../../component/FullScreenLoading';
import InfoDiv from './InfoDiv';
import {appURL} from '../../constants/AppConstants';
import UserImage from './UserImage';
import UpdateProfile from './UpdateProfile';
import {useFocusEffect} from '@react-navigation/native';

const UserScreen = ({navigation}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [dataFilled, setDataFilled] = useState(false);
  const [types, setTypes] = useState('');
  const [authorization, setAuthorization] = useState('');
  const [data, setData] = useState([]);
  const [image, setImage] = useState();

  const getUserData = async () => {
    try {
      const data = await getAsyncData(StoreUser);
      const {email, token} = JSON.parse(data);
      setAuthorization(token);

      const url = `${appURL}user/get-details?email=${email}`;

      const headers = {
        Authorization: `TOKEN ${token}`,
      };

      const response = await (
        await fetch(url, {
          method: 'GET',
          headers: headers,
        })
      ).json();

      const {is_linked, types, mobile, address, avatar} = response;

      if (avatar != '') {
        console.log(`${appURL.slice(0, -1)}${avatar}`);
        setImage(`${appURL.slice(0, -1)}${avatar}`);
      } else {
        setImage(avatar);
      }

      setUsername(email);
      setTypes(types);
      setDataFilled(is_linked);

      if (is_linked) {
        var getURL =
          types == 'Tutor'
            ? `${appURL}user/register/tutor?email=${email}`
            : `${appURL}user/register/student?email=${email}`;

        if (types == 'Tutor') {
          const getResponse = await (
            await fetch(getURL, {
              method: 'GET',
              headers: headers,
            })
          ).json();

          var {
            classes,
            endTime,
            startTime,
            degree,
            subjects,
            startRate,
            endRate,
          } = getResponse;
          classes = classes.slice(0, -1);
          classes = classes.slice(1);
          classes = classes.split(',');
          var yourClass = '';
          classes.map(item => {
            yourClass += `${item.split(':')[1]}, `;
          });
          yourClass = yourClass.slice(0, -2);
          subjects = subjects.slice(0, -1);
          subjects = subjects.slice(1);
          subjects = subjects.split(',');
          var yourSubject = '';
          subjects.map(item => {
            yourSubject += `${item.split(':')[1]}, `;
          });
          yourSubject = yourSubject.slice(0, -2);

          var timing = `${startTime} - ${endTime}`;
          var rates = `Rs. ${startRate} - ${endRate}`;

          const temp = [
            {id: 0, key: 'Email', value: email},
            {id: 1, key: 'Address', value: address},
            {id: 2, key: 'Mobile', value: mobile},
            {id: 3, key: 'Timing', value: timing},
            {id: 4, key: 'Classes', value: yourClass},
            {id: 5, key: 'Subjects', value: yourSubject},
            {id: 6, key: 'Degree', value: degree},
            {id: 7, key: 'Fees', value: rates},
          ];
          setData(temp);
        } else {
          const getResponse = await (
            await fetch(getURL, {
              method: 'GET',
              headers: headers,
            })
          ).json();

          var {classes} = getResponse;
          const temp = [
            {id: 0, key: 'Email', value: email},
            {id: 1, key: 'Address', value: address},
            {id: 2, key: 'Mobile', value: mobile},
            {id: 4, key: 'Class', value: `Grade: ${classes}`},
          ];
          setData(temp);
        }
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserData();

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
      <UserImage
        uri={
          image == ''
            ? 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
            : image
        }
        email={username}
      />
      {dataFilled ? (
        <InfoDiv data={data} navigation={navigation} types={types} />
      ) : (
        <UpdateProfile
          navigation={navigation}
          types={types}
          email={username}
          token={authorization}
        />
      )}
    </Background>
  );
};

export default UserScreen;
