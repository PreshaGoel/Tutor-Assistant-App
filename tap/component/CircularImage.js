import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';
import {primaryColor} from '../constants/colors';

const CircularImage = ({url}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View>
      <Image
        onLoadEnd={() => {
          setLoading(false);
        }}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{width: 1, height: 1}}
        source={{
          uri: url,
        }}
        resizeMode={'contain'}
      />
      {loading ? (
        <ActivityIndicator color={primaryColor} size={'small'} />
      ) : (
        <Image
          style={styles.image}
          source={{
            uri: url,
          }}
          resizeMode={'cover'}
        />
      )}
    </View>
  );
};

export default CircularImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: primaryColor,
  },
  image: {
    width: '96%',
    height: '96%',
    borderRadius: 50,
  },
});
