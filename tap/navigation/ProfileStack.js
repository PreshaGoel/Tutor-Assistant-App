import {createNativeStackNavigator} from '@react-navigation/native-stack';
import UserEditScreen from '../screens/UserEditScreen/UserEditScreen';
import UserScreen from '../screens/UserScreen/UserScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

const ProfileStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        name="Profile"
        component={UserScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        name="UserEdit"
        component={UserEditScreen}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;
