import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import QrScanner from './QrScanner';
import QrLoginAppbar from './QrLoginAppbar';
import SuccessfulQrScan from './SuccessfulQrScan';

type QrStackRouteList = {
  Scanner: undefined;
  SuccessfulScan: undefined;
  Success: undefined;
};

const StackNavigator = createStackNavigator<QrStackRouteList>();

const QrStackNavigator: React.FC = () => {
  return (
    <StackNavigator.Navigator
      initialRouteName={'Scanner'}
      headerMode={'screen'}
      screenOptions={{
        header: ({navigation}) => <QrLoginAppbar navigation={navigation} />,
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
