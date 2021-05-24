import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import QrScanner from './QrScanner';
import QrLoginAppbar from './QrLoginAppbar';

type QrStackRouteList = {
  Scanner: undefined;
  SuccessfulScan: undefined;
};

const StackNavigator = createStackNavigator<QrStackRouteList>();

const QrStackNavigator: React.FC = () => {
  return (
    <StackNavigator.Navigator
      headerMode={'screen'}
      screenOptions={{
        header: ({navigation}) => <QrLoginAppbar navigation={navigation} />,
      }}>
      <StackNavigator.Screen name={'Scanner'} component={QrScanner} />
    </StackNavigator.Navigator>
  );
};

export default QrStackNavigator;