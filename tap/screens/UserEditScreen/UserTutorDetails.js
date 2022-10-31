import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {appURL} from '../../constants/AppConstants';
import SelectMultipleButton from 'react-native-selectmultiple-button/libraries/SelectMultipleButton';
import SnakbarComponent from '../../component/SnackbarComponent';
import Button from '../../component/Button';
import RateSelection from '../UserScreen/RateSelection';
import TimeSelection from '../UserScreen/TimeSelection';
import Dropdown from '../../component/Dropdown';
import {font, font_Bold} from '../../constants/fonts';
import {primaryColor, textColor} from '../../constants/colors';

const UserTutorDetails = ({email, token, navigation}) => {
  const multipleData = [
    '1',
    '2',
    '3',
    '4',
    '5',
    '6',
    '7',
    '8',
    '9',
    '10',
    '11',
    '12',
  ];
  const subjectData = [
    'English',
    'Hindi',
    'Maths',
    'Science',
    'Biology',
    'Physics',
    'Chemistry',
  ];

  const [startTime, setStartTime] = useState({hours: 12, minutes: 15});
  const [endTime, setEndTime] = useState({hours: 12, minutes: 15});
  const [startRate, setStartRate] = useState();
  const [endRate, setEndRate] = useState();

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');
  const [danger, setDanger] = useState(true);

  const inputs = [
    {label: 'Diploma', value: 'Diploma'},
    {label: 'Graduate', value: 'Graduate'},
    {label: 'Post Graduate', value: 'Post Graduate'},
  ];
  const [qualification, setQualification] = useState('Diploma');

  const singleTapMultipleSelectedButtons = interest => {
    if (classes.includes(interest)) {
      const arr = classes.filter(item => item !== interest);
      setClasses(arr);
    } else {
      setClasses([...classes, interest]);
    }
  };

  const subjectmultipleSelected = interest => {
    if (subjects.includes(interest)) {
      const arr = subjects.filter(item => item !== interest);
      setSubjects(arr);
    } else {
      setSubjects([...subjects, interest]);
    }
  };

  const handleRegister = async () => {
    if (
      classes.length > 0 &&
      subjects.length > 0 &&
      startRate.length > 0 &&
      endRate.length > 0
    ) {
      setIsLoading(true);
      try {
        var classesJson = '"{';
        var i = 0;
        classes.map(yourClass => {
          classesJson += `${i}:${yourClass},`;
          i += 1;
        });

        classesJson = classesJson.slice(0, -1);

        classesJson += '}"';
        classesJson = JSON.stringify(classesJson);
        classesJson = JSON.parse(classesJson);

        var subjectJson = '"{';
        var i = 0;
        subjects.map(yourClass => {
          subjectJson += `${i}:${yourClass},`;
          i += 1;
        });

        subjectJson = subjectJson.slice(0, -1);

        subjectJson += '}"';
        subjectJson = JSON.stringify(subjectJson);
        subjectJson = JSON.parse(subjectJson);

        const url = `${appURL}user/register/tutor`;

        var Stime = `${startTime.hours}:${startTime.minutes}`;
        var Etime = `${endTime.hours}:${endTime.minutes}`;

        const data = {
          user: email,
          startTime: Stime,
          endTime: Etime,
          classes: JSON.parse(classesJson),
          degree: qualification,
          subjects: JSON.parse(subjectJson),
          startRate: startRate,
          endRate: endRate,
        };

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
          if ('detail' in response) {
            setContent('Your account is temporary blocked!');
            setShowSnack(true);
            setTimeout(() => {
              LogoutBtn();
            }, 1500);
          }
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
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{width: '100%'}}
        contentContainerStyle={{flexGrow: 1, paddingVertical: 10}}>
        <Dropdown
          inputs={inputs}
          value={qualification}
          setValue={setQualification}
        />
        <Text style={styles.classes}>Select Classes</Text>
        <View style={styles.classContainer}>
          {multipleData.map(interest => {
            return (
              <SelectMultipleButton
                key={interest}
                buttonViewStyle={styles.buttonViewStyle}
                textStyle={styles.textSTyle}
                highLightStyle={styles.highLightStyle}
                multiple={true}
                value={interest}
                selected={classes.includes(interest)}
                singleTap={valueTap =>
                  singleTapMultipleSelectedButtons(interest)
                }
              />
            );
          })}
        </View>
        <Text style={styles.classes}>Select Subjects</Text>
        <View style={styles.classContainer}>
          {subjectData.map(interest => {
            return (
              <SelectMultipleButton
                key={interest}
                buttonViewStyle={styles.buttonViewStyle}
                textStyle={styles.textSTyle}
                highLightStyle={styles.highLightStyle}
                multiple={true}
                value={interest}
                selected={subjects.includes(interest)}
                singleTap={valueTap => subjectmultipleSelected(interest)}
              />
            );
          })}
        </View>

        <TimeSelection
          startTime={startTime}
          setStartTime={setStartTime}
          endTime={endTime}
          setEndTime={setEndTime}
        />

        <RateSelection
          startRate={startRate}
          setStartRate={setStartRate}
          endRate={endRate}
          setEndRate={setEndRate}
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
      </ScrollView>
    </View>
  );
};

export default UserTutorDetails;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  classContainer: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
  },
  classes: {
    fontSize: 18,
    fontFamily: font_Bold,
    color: textColor,
  },
  buttonViewStyle: {
    borderRadius: 10,
    height: 40,
  },
  textSTyle: {
    fontSize: 15,
    fontFamily: font,
  },
  highLightStyle: {
    borderColor: 'gray',
    backgroundColor: 'transparent',
    textColor: 'gray',
    borderTintColor: primaryColor,
    backgroundTintColor: primaryColor,
    textTintColor: 'white',
  },
});
