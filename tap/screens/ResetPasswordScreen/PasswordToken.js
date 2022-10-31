import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {greyColor, primaryColor} from '../../constants/colors';
import {font_ExtraBold, font_Regular} from '../../constants/fonts';
import InputBox from '../../component/InputBox';
import Button from '../../component/Button';
import {appURL} from '../../constants/AppConstants';

const PasswordToken = ({setDanger, setContent, setShowSnack, donePress}) => {
  const [token, setToken] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(true);

  const handleReset = async () => {
    setDanger(true);
    if (token.length > 0 && password.length > 0) {
      setIsLoading(true);
      try {
        const url = `${appURL}api-reset-password/confirm/`;
        const data = {
          token,
          password,
        };

        const resp = await fetch(url, {
          method: 'POST',
          body: JSON.stringify(data),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        });

        if (resp.status == 200) {
          setDanger(false);
          setContent('Password Updated Success');
          setShowSnack(true);
          setTimeout(() => {
            donePress();
          }, 2000);
        } else {
          setContent('Please enter correct token and password');
          setShowSnack(true);
        }
      } catch (e) {
        setContent('Please fill all fields');
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
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.heading}>Reset Password</Text>
        <InputBox
          label={'Token'}
          value={token}
          onChangeText={setToken}
          icon="mail"
          keyboardType="numeric"
        />
        <InputBox
          label={'Password'}
          value={password}
          onChangeText={setPassword}
          icon="lock"
          isPassword={showPassword}
          secureTextEntry={true}
          setShowPassword={setShowPassword}
        />
        <Button text={'Submit'} isLoading={isLoading} onPress={handleReset} />
      </View>
    </View>
  );
};

export default PasswordToken;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '90%',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    backgroundColor: 'white',
    elevation: 5,
    width: '90%',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  heading: {
    color: primaryColor,
    fontSize: 22,
    fontFamily: font_ExtraBold,
    marginBottom: 10,
  },
});
