import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import ApplicationStackNavigator from '../stack/StackNavigator';
import QrStackNavigator from '../../authentication/qr/QrStackNavigator';

export type DrawerRoutesList = {
  Home: {screen: string};
  QrAuth: {screen: string};
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