import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {font_Bold} from '../../constants/fonts';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {primaryColor} from '../../constants/colors';
import {launchImageLibrary} from 'react-native-image-picker';
import Button from '../../component/Button';
import {appURL} from '../../constants/AppConstants';

const UserImage = ({uri, email, token, navigation}) => {
  const [loading, setLoading] = useState(true);
  const [imageDetail, setImageDetail] = useState({
    name: '',
    uri: '',
    type: 'image/jpeg',
  });
  const [imageLoading, setImageLoading] = useState(false);

  const getImage = async () => {
    try {
      const result = await launchImageLibrary({
        mediaType: 'photo',
      });

      if (!result.didCancel) {
        const {uri, type} = result.assets[0];

        setImageDetail({
          name: `${email.split('@')[0]}.jpeg`,
          uri: uri,
          type: type,
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleUpload = async () => {
    setImageLoading(true);
    try {
      const url = `${appURL}user/register`;
      let fd = new FormData();

      fd.append('email', email);
      fd.append('avatar', imageDetail);

      const headers = {
        Authorization: `TOKEN ${token}`,
      };

      console.log(url);

      const resp = await fetch(url, {
        method: 'PUT',
        body: fd,
        headers: headers,
      });

      if (resp.status == 200) {
        navigation.goBack();
      }
    } catch (e) {
      console.log(e);
    }
    setImageLoading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageBanner}>
        <Image
          onLoadEnd={() => {
            setLoading(false);
          }}
          // eslint-disable-next-line react-native/no-inline-styles
          style={{width: 1, height: 1}}
          source={{
            uri: imageDetail.uri == '' ? uri : imageDetail.uri,
          }}
          resizeMode={'contain'}
        />
        {loading ? (
          <ActivityIndicator color={'white'} size={'large'} />
        ) : imageDetail.uri == '' ? (
          <AntDesign name="user" size={24} color={'white'} />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: imageDetail.uri == '' ? uri : imageDetail.uri,
            }}
            resizeMode={'contain'}
          />
        )}
      </View>
      {imageDetail.uri == '' ? (
        <TouchableOpacity style={styles.logoutBtn} onPress={getImage}>
          <AntDesign name="edit" size={24} color={primaryColor} />
        </TouchableOpacity>
      ) : (
        <Button
          text={'Upload'}
          mode="outlined"
          isLoading={imageLoading}
          onPress={handleUpload}
        />
      )}
      <Text style={styles.textHeading}>{email}</Text>
    </View>
  );
};

export default UserImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '35%',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    marginBottom: 20,
  },
  imageBanner: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 97,
    height: 97,
    borderRadius: 50,
  },
  textHeading: {
    color: 'white',
    fontFamily: font_Bold,
    marginTop: 10,
    fontSize: 18,
  },
  logoutBtn: {
    marginVertical: 10,
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modal: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    width: '90%',
    height: '40%',
    alignItems: 'center;',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 30,
  },
});
