import React from 'react';
import {Appbar} from 'react-native-paper';
import {Scene} from '@react-navigation/stack/lib/typescript/src/types';
import {Route} from '@react-navigation/native';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerRoutesList} from '../../drawer/DrawerNavigator';

interface DefaultStackAppbarProps {
  scene: Scene<Route<string, object | undefined>>;
  navigation: DrawerNavigationProp<DrawerRoutesList, 'Home'>;
  previous: Scene<Route<string, object | undefined>> | undefined;
}

const DefaultStackAppbar: React.FC<DefaultStackAppbarProps> = ({
  previous,
  navigation,
  scene,
}) => {
  return (
    <Appbar.Header
      style={{backgroundColor: '#202329', elevation: 0}}
      dark={true}>
      <Appbar.Action icon={'menu'} size={25} onPress={navigation.openDrawer} />
    </Appbar.Header>
  );
};

export default DefaultStackAppbar;
