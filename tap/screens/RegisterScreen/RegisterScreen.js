import {ScrollView, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import Background from '../../component/Background';
import Header from '../../component/Header';
import Subheading from '../../component/Subheading';
import {textColor} from '../../constants/colors';
import Paragraph from '../../component/Paragraph';
import InputBox from '../../component/InputBox';
import Button from '../../component/Button';
import {globalStyles} from '../../styles/Styles';
import Line from '../../component/Line';
import Dropdown from '../../component/Dropdown';
import TextArea from '../../component/TextArea';
import SnakbarComponent from '../../component/SnackbarComponent';
import {appURL} from '../../constants/AppConstants';

const RegisterScreen = ({navigation}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');
  const [address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  // const [date, setDate] = useState(new Date());
  const inputs = [
    {label: 'Tutor', value: 'Tutor'},
    {label: 'Student', value: 'Student'},
  ];
  const [types, setTypes] = useState('Student');
  const [showPassword, setShowPassword] = useState(true);
  const [danger, setDanger] = useState(true);

  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (
      fullName.length > 0 &&
      email.length > 0 &&
      mobile.length > 0 &&
      address.length > 0 &&
      password.length > 0 &&
      password2.length > 0
    ) {
      if (password === password2) {
        if (mobile.length == 10) {
          if (fullName.split(' ').length > 1) {
            const first_name = fullName.split(' ')[0].trim();
            const last_name = fullName.split(' ')[1].trim();
            const data = {
              email: email.trim(),
              password: password.trim(),
              first_name: first_name.trim(),
              last_name: last_name.trim(),
              types: types.trim(),
              mobile: mobile.trim(),
              address: address.trim(),
            };

            setIsLoading(true);
            const url = `${appURL}user/register`;

            const resp = await fetch(url, {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(data),
            });

            if (resp.status == 201) {
              setContent('You are registered');
              setDanger(false);
              setShowSnack(true);
              setTimeout(function() {
                navigation.replace('Login')
              }, 2000)
            } else {
              const response = await resp.json();
              if ('email' in response) {
                setContent('Please enter a valid email address');
                setShowSnack(true);
              }
              if ('mobile' in response) {
                setContent('Please enter a valid mobile number');
                setShowSnack(true);
              }
              if ('password' in response) {
                setContent(response.password[0]);
                setShowSnack(true);
              }
            }
            setIsLoading(false);
          } else {
            setContent('Please provide your full name');
            setShowSnack(true);
          }
        } else {
          setContent('Mobile is not correct');
          setShowSnack(true);
        }
      } else {
        setContent('Passwords are not same');
        setShowSnack(true);
      }
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
        <Subheading color={'#fff'}>Tutor Assistant App</Subheading>
        <View style={styles.bottomContainer}>
          <Subheading color={textColor}>Register Yourself!</Subheading>
          <Paragraph>
            Register Yourself and explore the world of geniuses
          </Paragraph>
          <InputBox
            label={'Full Name'}
            icon={'account'}
            value={fullName}
            onChangeText={setFullName}
          />
          <InputBox
            label={'Email'}
            icon={'mail'}
            value={email}
            onChangeText={setEmail}
          />
          <InputBox
            label={'Mobile Number'}
            icon={'cellphone'}
            value={mobile}
            onChangeText={setMobile}
            keyboardType='numeric'
          />

          <TextArea
            label={'Address'}
            icon={'map-marker'}
            value={address}
            onChangeText={setAddress}
          />

          {/* <DatePicker date={date} setDate={setDate} /> */}

          <Dropdown inputs={inputs} value={types} setValue={setTypes} />

          {/* {type === 'Tutor' ? <TutorDetails /> : <StudentDetails />} */}

          <InputBox
            label={'Password'}
            icon={'lock'}
            value={password}
            onChangeText={setPassword}
            isPassword={showPassword}
            setShowPassword={setShowPassword}
            secureTextEntry={true}
          />

          <InputBox
            label={'Confirm Password'}
            icon={'lock'}
            value={password2}
            onChangeText={setPassword2}
            isPassword={showPassword}
            setShowPassword={setShowPassword}
            secureTextEntry={true}
          />

          <Button
            text={'Register'}
            isLoading={isLoading}
            onPress={handleRegister}
          />
          <Line />

          <Button
            text={'Login'}
            mode={'outlined'}
            onPress={() => {
              navigation.replace('Login');
            }}
          />
        </View>
      </ScrollView>
      <SnakbarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
        danger={danger}
      />
    </Background>
  );
};

export default RegisterScreen;

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
});
