import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatMessageScreen from '../screens/ChatMessageScreen/ChatMessageScreen';
import HistoryScreen from '../screens/HistoryScreen/HistoryScreen';
import React from 'react';

const Stack = createNativeStackNavigator();

const HistoryStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        name="HistoryScreen"
        component={HistoryScreen}
      />
      <Stack.Screen
        options={{
          headerShown: false,
          animation: 'slide_from_right',
        }}
        name="ChatMessage"
        component={ChatMessageScreen}
      />
    </Stack.Navigator>
  );
};

export default HistoryStack;
