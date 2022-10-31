import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {greyColor, primaryColor} from '../../constants/colors';
import {font_ExtraBold, font_Regular} from '../../constants/fonts';
import InputBox from '../../component/InputBox';
import Button from '../../component/Button';
import {appURL} from '../../constants/AppConstants';

const EmailResetPassword = ({
  setShowSnack,
  setContent,
  setDanger,
  setTokensent,
}) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleReset = async () => {
    if (email.length > 0) {
      setIsLoading(true);
      try {
        const url = `${appURL}api-reset-password/`;
        const data = {
          email,
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
          setContent('Special Token sent to your email id');
          setShowSnack(true);
          setTokensent(true);
        } else {
          setContent('Please enter correct email id');
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
          label={'Email'}
          value={email}
          onChangeText={setEmail}
          icon="mail"
          keyboardType="email-address"
        />
        <Text style={styles.info}>
          Authorized token will be mailed to your address
        </Text>
        <Button text={'Submit'} isLoading={isLoading} onPress={handleReset} />
      </View>
    </View>
  );
};

export default EmailResetPassword;

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
  info: {
    color: greyColor,
    fontSize: 15,
    fontFamily: font_Regular,
  },
});
