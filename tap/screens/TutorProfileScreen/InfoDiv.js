import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useState} from 'react';
import {font_Bold} from '../../constants/fonts';
import {greyColor, textColor} from '../../constants/colors';
import {globalStyles} from '../../styles/Styles';
import Button from '../../component/Button';
import Line from '../../component/Line';
import {
  getAsyncData,
  StoreUser,
} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import {appURL} from '../../constants/AppConstants';
import SnakbarComponent from '../../component/SnackbarComponent';

const InfoDiv = ({data, tutorEmail, navigation}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showSnack, setShowSnack] = useState(false);
  const [content, setContent] = useState('');
  const [danger, setDanger] = useState(true);

  const handleContact = async () => {
    setIsLoading(true);

    try {
      const data = JSON.parse(await getAsyncData(StoreUser));
      const {email, token} = data;

      const url = `${appURL}contact/setclassrequest`;
      

      const headers = {
        Authorization: `TOKEN ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      };

      const postData = {
        tutor: tutorEmail,
        student: email,
      };

      const resp = await fetch(url, {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: headers,
      });

      

      if (resp.status == 201) {
        setContent('Request Initiated');
        setDanger(false);
        setShowSnack(true);
        setTimeout(() => {
          navigation.navigate('History');
        }, 1500);
      } else {
        setContent('Server Error');
        setShowSnack(true);
      }
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headingContainer}>
        <Text style={styles.heading}>Details</Text>
      </View>
      <ScrollView
        style={styles.styleScroll}
        contentContainerStyle={styles.scrollContaier}
        showsVerticalScrollIndicator={false}>
        {data.map(item => {
          return (
            <View key={item.id} style={{width: '100%'}}>
              <View key={item.id} style={styles.details}>
                <View style={styles.keyContainer}>
                  <Text style={styles.key}>{item.key} : </Text>
                </View>
                <View style={styles.valueContainer}>
                  <Text style={styles.value}>{item.value}</Text>
                </View>
              </View>
              <Line />
            </View>
          );
        })}
      </ScrollView>
      <View style={styles.btnContainer}>
        <Button
          text={'Contact'}
          isLoading={isLoading}
          onPress={handleContact}
        />
      </View>
      <SnakbarComponent
        visible={showSnack}
        setVisible={setShowSnack}
        text={content}
        danger={danger}
      />
    </View>
  );
};

export default InfoDiv;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    padding: 8,
    backgroundColor: 'white',
    borderRadius: 15,
    alignItems: 'center',
  },
  scrollContaier: {
    alignItems: 'center',
  },
  styleScroll: {
    maxHeight: '60%',
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
  details: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 15,
    marginBottom: 5,
  },
  keyContainer: {
    width: '35%',
  },
  key: {
    fontFamily: font_Bold,
    color: greyColor,
    fontSize: 18,
  },
  valueContainer: {
    width: '65%',
  },
  value: {
    fontFamily: font_Bold,
    color: textColor,
    fontSize: 18,
  },
  btnContainer: {
    width: '100%',
  },
});
