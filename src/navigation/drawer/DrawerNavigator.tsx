import React from 'react';

import DrawerContent from './DrawerContent';
import {DrawerScreenParams} from './DrawerScreenParams';
import MainStackNavigator from '../stack/MainStackNavigator';
import {createDrawerNavigator} from '@react-navigation/drawer';
import useAuthenticationStore from '../../shared/store/AuthenticationStore';
import {User} from '../../shared/persistence';

const Drawer = createDrawerNavigator<DrawerScreenParams>();

const ApplicationDrawerNavigator = () => {
  const authenticatedUser: User = useAuthenticationStore(state => state.user);

  return (
    <Drawer.Navigator
      initialRouteName={'Home'}
      drawerContent={({navigation}: {navigation: any}) => (
        <DrawerContent
          navigation={navigation}
          authenticatedUser={authenticatedUser}
        />
      )}>
      <Drawer.Screen name={'Home'} component={MainStackNavigator} />
    </Drawer.Navigator>
  );
};

export default ApplicationDrawerNavigator;
