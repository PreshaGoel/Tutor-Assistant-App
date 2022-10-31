import {Image, StyleSheet, View} from 'react-native';
import React, {useEffect} from 'react';
import Background from '../../component/Background';
import Header from '../../component/Header';
import Subheading from '../../component/Subheading';
import {textColor} from '../../constants/colors';
import Paragraph from '../../component/Paragraph';
import Button from '../../component/Button';
import {
  getAsyncData,
  StoreUser,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';

const SplashScreen = ({navigation}) => {
  

  useEffect(() => {
    getAsyncData(StoreUser).then(response => {
      if(response != null){
        response = JSON.parse(response);
        navigation.replace('Home')
      }
    })
  }, []);

  return (
    <Background>
      <Header color={'#fff'}>TAP</Header>
      <Subheading color={'#fff'}>Tutor Assistant App</Subheading>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.bottomContainer}>
        <Subheading color={textColor}>Login or Sign Up</Subheading>
        <Paragraph>
          Login or create your account to connect with best teacher from the
          world
        </Paragraph>
        <Button
          text={'LOGIN'}
          onPress={() => {
            navigation.replace('Login');
          }}
        />
        <Button
          text={'Sign Up'}
          mode={'outlined'}
          onPress={() => {
            navigation.replace('Register');
          }}
        />
      </View>
    </Background>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
  },
  bottomContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 25,
    alignItems: 'center',
  },
});
