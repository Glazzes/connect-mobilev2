import React from 'react';
import QrScanner from './QrScanner';
import BrowserNotFound from './BrowserNotFound';
import SuccessfulQrScan from './SuccessfulQrScan';
import {createStackNavigator} from '@react-navigation/stack';
import {QrStackParamList} from '../../navigation/types/QrStackParamList';

const Stack = createStackNavigator<QrStackParamList>();

const QrStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName={'Scanner'} headerMode={'screen'}>
      <Stack.Screen
        name={'Scanner'}
        component={QrScanner}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name={'SuccessfulScan'}
        component={SuccessfulQrScan}
      />
      <Stack.Screen
        name={'BrowserNotFound'}
        component={BrowserNotFound}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default QrStackNavigator;
