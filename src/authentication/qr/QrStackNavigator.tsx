import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import QrScanner from './QrScanner';
import SuccessfulQrScan from './SuccessfulQrScan';
import {QrStackParamList} from '../../navigation/types/QrStackParamList';

const StackNavigator = createStackNavigator<QrStackParamList>();

const QrStackNavigator: React.FC = () => {
  return (
    <StackNavigator.Navigator
      initialRouteName={'Scanner'}
      headerMode={'screen'}>
      <StackNavigator.Screen
        name={'Scanner'}
        component={QrScanner}
        options={{
          headerShown: false,
        }}
      />
      <StackNavigator.Screen
        options={{
          headerShown: false,
        }}
        name={'SuccessfulScan'}
        component={SuccessfulQrScan}
      />
    </StackNavigator.Navigator>
  );
};

export default QrStackNavigator;
