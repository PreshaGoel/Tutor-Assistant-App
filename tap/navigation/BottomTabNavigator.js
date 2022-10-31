/* eslint-disable react-native/no-inline-styles */
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import React, {useEffect, useState} from 'react';
import {primaryColor} from '../constants/colors';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeStack from './HomeStack';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import UserScreen from '../screens/UserScreen/UserScreen';
import ProfileStack from './ProfileStack';
import {
  getAsyncData,
  StoreUser,
} from '../AsyncStorageHelpers/AsyncStorageHelpers';
import {appURL} from '../constants/AppConstants';
import FullScreenLoading from '../component/FullScreenLoading';
import HistoryStack from './HistoryStack';

const Tab = createMaterialBottomTabNavigator();

const BottomTabNavigator = () => {
  const [types, setTypes] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  const getUserType = async () => {
    try {
      const data = await getAsyncData(StoreUser);
      const {email, token} = JSON.parse(data);

      const url = `${appURL}user/get-details?email=${email}`;

      const response = await (
        await fetch(url, {
          method: 'GET',
          headers: {
            Authorization: `TOKEN ${token}`,
          },
        })
      ).json();

      setTypes(response.types);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUserType();
  }, []);

  if (isLoading) {
    return <FullScreenLoading />;
  }

  return (
    <Tab.Navigator
      shifting={true}
      initialRouteName={types == 'Student' ? 'QuizHome' : 'History'}
      barStyle={{
        backgroundColor: 'white',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        elevation: 5,
      }}
      activeColor={primaryColor}>
      {types == 'Student' && (
        <Tab.Screen
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color}) => (
              <MaterialCommunityIcons name="home" color={color} size={24} />
            ),
          }}
          name="QuizHome"
          component={HomeStack}
        />
      )}
      <Tab.Screen
        options={{
          tabBarLabel: 'History',
          tabBarIcon: ({color}) => (
            <FontAwesome name="history" color={color} size={24} />
          ),
        }}
        name="History"
        component={HistoryStack}
      />
      <Tab.Screen
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({color}) => (
            <FontAwesome name="user" color={color} size={24} />
          ),
        }}
        name="User"
        component={ProfileStack}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
