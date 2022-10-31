import {StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import TimePicker from '../../component/TimePicker';
import Dropdown from '../../component/Dropdown';
import Button from '../../component/Button';
import {appURL} from '../../constants/AppConstants';

const SearchBar = ({isLoading, setIsLoading, tutor, setTutor, token}) => {
  const inputs = [
    {label: 'Science', value: 'Science'},
    {label: 'Maths', value: 'Maths'},
    {label: 'Social Science', value: 'Social Science'},
    {label: 'Hindi', value: 'Hindi'},
    {label: 'English', value: 'English'},
    {label: 'Coding', value: 'Coding'},
  ];
  const [startTime, setStartTime] = useState({hours: '12', minutes: '14'});
  const [endTime, setEndTime] = useState({hours: '12', minutes: '14'});
  const [subject, setSubject] = useState('Science');

  const handleFind = async () => {
    setIsLoading(true);
    try {
      const url = `${appURL}user/register/tutor?filter=filter&startTime=${startTime.hours}:${startTime.minutes}&endTime=${endTime.hours}:${endTime.minutes}&subject=${subject}`;

      const resp = await fetch(url, {
        method: 'GET',
        headers: {
          Authorization: `TOKEN ${token}`,
        },
      });

      console.log(resp.status);

      if (resp.status == 200) {
        const response = await resp.json();
        
        setTutor(response);
      } else {
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownContainer}>
        <Dropdown
          inputs={inputs}
          value={subject}
          setValue={setSubject}
          icon={'book'}
        />
      </View>
      <View style={styles.datetimeContainer}>
        <View style={styles.dateContainer}>
          <TimePicker time={startTime} setTime={setStartTime} />
        </View>
        <View style={styles.timeContainer}>
          <TimePicker time={endTime} setTime={setEndTime} />
        </View>
      </View>
      <Button
        text={'Find'}
        mode={'outlined'}
        isLoading={isLoading}
        onPress={handleFind}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 15,
    marginBottom: 15,
    alignItems: 'center',
  },
  dropdownContainer: {
    width: '90%',
  },
  datetimeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  dateContainer: {
    width: '45%',
  },
  timeContainer: {
    width: '45%',
  },
});
