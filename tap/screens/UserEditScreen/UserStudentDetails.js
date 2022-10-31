import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {appURL} from '../../constants/AppConstants';
import Button from '../../component/Button';
import InputBox from '../../component/InputBox';
import SnakbarComponent from '../../component/SnackbarComponent';

const UserStudentDetails = ({email, token, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [student, setStudent] = useState('');
  const [danger, setDanger] = useState(true);
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');

  const handleRegister = async () => {
    if (student.length > 0) {
      setIsLoading(true);
      try {
        const data = {
          user: email,
          classes: student,
        };

        const url = `${appURL}user/register/student`;

        const resp = await fetch(url, {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `TOKEN ${token}`,
          },
          body: JSON.stringify(data),
        });

        if (resp.status == 200) {
          setDanger(false);
          setContent('Your profile updated');
          setShowSnack(true);
          setTimeout(() => {
            navigation.goBack();
          }, 1500);
        } else {
          const response = await resp.json();
          console.log(response);
        }
      } catch (e) {
        console.log(e);
      }
      setIsLoading(false);
    } else {
      setContent('Please select all fields');
      setShowSnack(true);
    }
  };

  return (
    <View style={styles.container}>
      <InputBox
        label={'Your Class'}
        value={student}
        onChangeText={setStudent}
        icon="account"
      />
      <Button
        text={'Register'}
        onPress={handleRegister}
        isLoading={isLoading}
      />
      <SnakbarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
        danger={danger}
      />
    </View>
  );
};

export default UserStudentDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
