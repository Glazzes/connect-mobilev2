import React from 'react';

import DrawerContent from './DrawerContent';
import {DrawerScreenParams} from '../types/DrawerScreenParams';
import MainStackNavigator from '../stack/MainStackNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import QrStackNavigator from '../../authentication/qr/QrStackNavigator';

const Drawer = createDrawerNavigator<DrawerScreenParams>();

const ApplicationDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerContent={({navigation}: {navigation: any}) => (
        <DrawerContent navigation={navigation} />
      )}>
      <Drawer.Screen name={'Home'} component={MainStackNavigator}/>
    </Drawer.Navigator>
  );
};

export default ApplicationDrawerNavigator;
