import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import TutorProfileScreen from '../screens/TutorProfileScreen/TutorProfileScreen';

const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        name="Home"
        component={HomeScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        name="Tutor"
        component={TutorProfileScreen}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
