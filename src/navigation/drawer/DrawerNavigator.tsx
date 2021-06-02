import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import DrawerContent from './DrawerContent';
import ApplicationStackNavigator from '../stack/StackNavigator';
import QrStackNavigator from '../../authentication/qr/QrStackNavigator';
import {DrawerParamList} from '../types/DrawerParamList';

const Drawer = createDrawerNavigator<DrawerParamList>();

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
