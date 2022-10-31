import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../../component/Background';
import {useFocusEffect} from '@react-navigation/native';
import FullScreenLoading from '../../component/FullScreenLoading';
import {
  getAsyncData,
  StoreUser,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import UserImage from './UserImage';
import UserUpdateProfile from './UserUpdateProfile';

const UserEditScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userTypes, setUserTypes] = useState('');

  const getUserInfo = async () => {
    try {
      const {email, token} = JSON.parse(await getAsyncData(StoreUser));
      const {types} = route.params;

      setUserEmail(email);
      setUserToken(token);
      setUserTypes(types);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      getUserInfo();

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
      <View style={styles.container}>
        <UserImage
          email={userEmail}
          uri={
            'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg'
          }
          token={userToken}
          navigation={navigation}
        />
        <UserUpdateProfile
          navigation={navigation}
          email={userEmail}
          token={userToken}
          types={userTypes}
        />
      </View>
    </Background>
  );
};

export default UserEditScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
    marginVertical: 20,
  },
});
