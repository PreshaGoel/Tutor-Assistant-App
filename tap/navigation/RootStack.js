import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen/ResetPasswordScreen';
import SplashScreen from '../screens/SplashScreen/SplashScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Stack = createNativeStackNavigator();

export const navigationRef = React.createRef();

const RootStack = () => {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen
          options={{
            headerShown: false,
          }}
          name="Splash"
          component={SplashScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'slide_from_bottom',
          }}
          name="Login"
          component={LoginScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
          name="Register"
          component={RegisterScreen}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
          name="Home"
          component={BottomTabNavigator}
        />
        <Stack.Screen
          options={{
            headerShown: false,
            animation: 'slide_from_right',
          }}
          name="ResetPassword"
          component={ResetPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
