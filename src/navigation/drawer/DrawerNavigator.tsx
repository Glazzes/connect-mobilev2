import React from 'react';

import DrawerContent from './DrawerContent';
import {DrawerParamList} from '../types/DrawerParamList';
import MainStackNavigator from '../stack/MainStackNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import QrStackNavigator from '../../authentication/qr/QrStackNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

const ApplicationDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerContent={({navigation}: {navigation: any}) => (
        <DrawerContent navigation={navigation} />
      )}>
      <Drawer.Screen name={'Home'} component={MainStackNavigator} />
      <Drawer.Screen name={'QrAuth'} component={QrStackNavigator} />
    </Drawer.Navigator>
  );
};

export default ApplicationDrawerNavigator;
