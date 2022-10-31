import {useFocusEffect} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  getAsyncData,
  StoreUser,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import Background from '../../component/Background';
import FullScreenLoading from '../../component/FullScreenLoading';
import {appURL} from '../../constants/AppConstants';
import DetailsDiv from './DetailsDiv';
import InfoDiv from './InfoDiv';
import UserImage from './UserImage';

const TutorProfileScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [details, setDetails] = useState({rating: 0, price: 0, timeslot: 0});
  const [data, setData] = useState([]);
  const [userEmail, setUserEmail] = useState();
  const [imageUri, setImageUri] = useState('');

  const getTutorData = async () => {
    const {email} = route.params;
    setUserEmail(email);
    const data = await getAsyncData(StoreUser);
    const token = JSON.parse(data).token;
    const header = {
      Authorization: `TOKEN ${token}`,
    };
    const url = `${appURL}user/register/tutor?email=${email}`;

    try {
      const resp = await fetch(url, {
        method: 'GET',
        headers: header,
      });

      if (resp.status) {
        const response = await resp.json();

        const {rating, startRate, startTime, endTime, avatar} = response;
        setImageUri(avatar);
        var timeslot = `${startTime} - ${endTime}`;
        const temp = {
          rating,
          price: startRate,
          timeslot,
        };
        setDetails(temp);

        var {classes, degree, subjects, endRate, address, mobile} = response;
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

        const test = [
          {id: 0, key: 'Email', value: email},
          {id: 1, key: 'Address', value: address},
          {id: 2, key: 'Mobile', value: mobile},
          {id: 3, key: 'Timing', value: timing},
          {id: 4, key: 'Classes', value: yourClass},
          {id: 5, key: 'Subjects', value: yourSubject},
          {id: 6, key: 'Degree', value: degree},
          {id: 7, key: 'Fees', value: rates},
        ];
        setData(test);
      } else {
        const response = await resp.json();
        console.log(response);
      }
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getTutorData();

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
          imageUri == null
            ? 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
            : `${appURL}media/${imageUri}`
        }
      />
      <DetailsDiv
        rating={details.rating}
        price={details.price}
        timeslot={details.timeslot}
      />
      <InfoDiv navigation={navigation} data={data} tutorEmail={userEmail} />
    </Background>
  );
};

export default TutorProfileScreen;
