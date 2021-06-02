import React from 'react';
import {Appbar} from 'react-native-paper';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack/lib/typescript/src/types';
import {ChatStackParamList} from '../../types/ChatStackParamList';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../../types/DrawerParamList';

interface DefaultStackAppbarProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ChatStackParamList, 'Home'>,
    DrawerNavigationProp<DrawerParamList>
  >;
}

const DefaultStackAppbar: React.FC<DefaultStackAppbarProps> = ({
  navigation,
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
