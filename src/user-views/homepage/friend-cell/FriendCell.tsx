import React from 'react';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerRoutesList} from '../../../navigation/drawer/DrawerNavigator';
import {Button} from 'react-native-paper';

interface FriendCellProps {
  navigation: DrawerNavigationProp<DrawerRoutesList>;
}

const FriendCell: React.FC<FriendCellProps> = ({navigation}) => {
  return <Button>Hello world</Button>;
};

export default FriendCell;