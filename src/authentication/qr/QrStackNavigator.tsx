import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import QrScanner from './QrScanner';
import QrLoginAppbar from './QrLoginAppbar';
import SuccessfulQrScan from './SuccessfulQrScan';
import {QrStackParamList} from '../../navigation/types/QrStackParamList';

const StackNavigator = createStackNavigator<QrStackParamList>();

const QrStackNavigator: React.FC = () => {
  return (
    <StackNavigator.Navigator
      initialRouteName={'Scanner'}
      headerMode={'screen'}
      screenOptions={{
        header: ({navigation}: {navigation: any}) => <QrLoginAppbar navigation={navigation} />,
      }}>
      <StackNavigator.Screen name={'Scanner'} component={QrScanner} />
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
