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
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {LogoutBtn} from '../../AsyncStorageHelpers/AsyncStorageHelpers';
import {primaryColor} from '../../constants/colors';

const UserImage = ({uri, email}) => {
  const [loading, setLoading] = useState(true);
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
            uri: uri,
          }}
          resizeMode={'contain'}
        />
        {loading ? (
          <ActivityIndicator color={'white'} size={'small'} />
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: uri,
            }}
            resizeMode={'cover'}
          />
        )}
      </View>
      <TouchableOpacity onPress={LogoutBtn} style={styles.logoutBtn}>
        <MaterialIcons name="logout" size={24} color={primaryColor} />
      </TouchableOpacity>
      <Text style={styles.textHeading}>{email}</Text>
    </View>
  );
};

export default UserImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '25%',
    alignItems: 'center',
    justifyContent: 'center',
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
    position: 'absolute',
    top: 0,
    right: 5,
    padding: 10,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
