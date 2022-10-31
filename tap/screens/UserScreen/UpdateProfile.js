import {StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {font_Bold} from '../../constants/fonts';
import {textColor} from '../../constants/colors';
import StudentDetails from '../../component/StudentDetails';
import TutorDetails from '../../component/TutorDetails';
import DangerButton from '../../component/DangerButton';
import DialogComponent from '../../component/DialogComponent';
import {appURL} from '../../constants/AppConstants';
import {LogoutBtn} from '../../AsyncStorageHelpers/AsyncStorageHelpers';

const UpdateProfile = ({types, email, token, navigation}) => {
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState(
    'Are you sure you want delete your account? This is irreversible step.',
  );
  const [isLoading, setIsLoading] = useState(false);

  const deleteAccount = async () => {
    setShowSnack(false);
    setIsLoading(true);
    try {
      const url = `${appURL}user/get-details?email=${email}`;
      const header = {
        Authorization: `TOKEN ${token}`,
      };

      const resp = await fetch(url, {
        method: 'DELETE',
        headers: header,
      });

      if (resp.status == 200) {
        setContent('Account deletion success');
        setShowSnack(true);
        setTimeout(() => {
          LogoutBtn();
        }, 1500);
      } else {
        setContent('Server Error try again later');
        setShowSnack(true);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <View
      style={[
        styles.container,
        types == 'Tutor' && {height: '65%', paddingBottom: 30},
      ]}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Please Fill Details</Text>
      </View>
      {types == 'Student' ? (
        <StudentDetails email={email} token={token} navigation={navigation} />
      ) : (
        <TutorDetails email={email} token={token} navigation={navigation} />
      )}
      <DangerButton
        text={'Delete Account'}
        mode={'outlined'}
        onPress={() => {
          setShowSnack(true);
        }}
        isLoading={isLoading}
      />
      <DialogComponent
        onPress={deleteAccount}
        visible={showSnack}
        setVisible={setShowSnack}
        Content={content}
      />
    </View>
  );
};

export default UpdateProfile;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
  },
  headingContainer: {
    width: '100%',
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  heading: {
    fontFamily: font_Bold,
    fontSize: 18,
    color: textColor,
    textTransform: 'uppercase',
  },
});
