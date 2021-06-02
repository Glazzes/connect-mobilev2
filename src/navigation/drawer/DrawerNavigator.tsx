import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import ApplicationStackNavigator from '../stack/StackNavigator';
import QrStackNavigator, {
  QrStackRouteList,
} from '../../authentication/qr/QrStackNavigator';

export type DrawerRoutesList = {
  Home: {screen: string};
  QrAuth: NavigatorScreenParams<QrStackRouteList>;
};

const Drawer = createDrawerNavigator<DrawerRoutesList>();

const ApplicationDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerContent={({navigation}) => (
        <DrawerContent navigation={navigation} />
      )}>
      <Drawer.Screen name={'Home'} component={ApplicationStackNavigator} />
      <Drawer.Screen name={'QrAuth'} component={QrStackNavigator} />
    </Drawer.Navigator>
  );
};

export default ApplicationDrawerNavigator;
