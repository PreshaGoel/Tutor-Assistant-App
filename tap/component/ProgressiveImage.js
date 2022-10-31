import {ActivityIndicator, Image, StyleSheet, View} from 'react-native';
import React, {useState} from 'react';

const ProgressiveImage = ({url}) => {
  const [loading, setLoading] = useState(true);

  return (
    <View style={styles.container}>
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
        <ActivityIndicator color={'white'} size={'small'} />
      ) : (
        <Image
          style={styles.image}
          source={{
            uri: url,
          }}
          resizeMode={'contain'}
        />
      )}
    </View>
  );
};

export default ProgressiveImage;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '98%',
    height: '98%',
  },
});
