import AsyncStorage from '@react-native-async-storage/async-storage';
import {navigationRef} from '../navigation/RootStack';

export const StoreUser = 'StoreUser';

export const storeAsycnData = async (token, value) => {
  try {
    return await AsyncStorage.setItem(token, value);
  } catch (e) {
    console.log(e);
  }
};

export const getAsyncData = async token => {
  try {
    return await AsyncStorage.getItem(token);
  } catch (e) {
    console.log(e);
  }
};

export const LogoutBtn = async () => {
  try {
    await AsyncStorage.clear();
    navigationRef.current?.reset({
      index: 0,
      routes: [{name: 'Login'}],
    });
  } catch (e) {
    console.log(e);
  }
};
