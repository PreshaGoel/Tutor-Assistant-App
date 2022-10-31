import {ScrollView, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../../component/Background';
import Header from '../../component/Header';
import Subheading from '../../component/Subheading';
import {textColor} from '../../constants/colors';
import Paragraph from '../../component/Paragraph';
import InputBox from '../../component/InputBox';
import Button from '../../component/Button';
import Line from '../../component/Line';
import {globalStyles} from '../../styles/Styles';
import SnakbarComponent from '../../component/SnackbarComponent';
import {appURL} from '../../constants/AppConstants';
import {
  storeAsycnData,
  StoreUser,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';

const LoginScreen = ({navigation}) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    if (username.length > 0 && password.length > 0) {
      setIsLoading(true);

      try {
        const data = {
          username: username,
          password: password,
        };

        const url = `${appURL}api-token-auth`;

        const resp = await fetch(url, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });

        if (resp.status == 200) {
          const response = await resp.json();
          const storageData = {
            token: response.token,
            email: username,
          };
          storeAsycnData(StoreUser, JSON.stringify(storageData));
          navigation.navigate('Home');
        } else if (resp.status == 400) {
          const response = await resp.json();
          if ('non_field_errors' in response) {
            setContent('Invalid Credentials! Please Try again.');
            setShowSnack(true);
          }
        } else {
          console.log(resp.status);
          setContent('Error while fetching details!');
          setShowSnack(true);
        }
      } catch (e) {
        setContent('Network Error! Please Try again later.');
        setShowSnack(true);
        console.log(e);
      }
      setIsLoading(false);
    } else {
      setContent('Please fill all fields');
      setShowSnack(true);
    }
  };

  return (
    <Background>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={globalStyles.styleScroll}
        contentContainerStyle={globalStyles.scrollContainer}>
        <Header color={'#fff'}>TAP</Header>
        <Subheading color={'#fff'}>Tutor Assitant App</Subheading>
        <View style={styles.bottomContainer}>
          <Subheading color={textColor}>Welcome Back!</Subheading>
          <Paragraph>Let's dive into the world of genius</Paragraph>
          <InputBox
            label={'Username'}
            icon={'account'}
            value={username}
            onChangeText={setUsername}
          />
          <InputBox
            label={'Password'}
            icon={'lock'}
            value={password}
            onChangeText={setPassword}
            isPassword={showPassword}
            setShowPassword={setShowPassword}
            secureTextEntry={true}
          />
          <View style={styles.forgotPassword}>
            <TouchableOpacity onPress={() => navigation.replace('ResetPassword')} >
              <Paragraph>Forgot Password?</Paragraph>
            </TouchableOpacity>
          </View>
          <Button text={'Login'} onPress={handleLogin} isLoading={isLoading} />
          <Line />
          <Button
            text={'Sign Up'}
            mode={'outlined'}
            onPress={() => {
              navigation.navigate('Register');
            }}
          />
        </View>
      </ScrollView>
      <SnakbarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
      />
    </Background>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  bottomContainer: {
    width: '90%',
    padding: 20,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 25,
    alignItems: 'center',
    alignSelf: 'center',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
  },
});
