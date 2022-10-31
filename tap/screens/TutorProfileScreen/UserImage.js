import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

const UserImage = ({uri}) => {
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
            resizeMode={'contain'}
          />
        )}
      </View>
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
});
