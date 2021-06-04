import React from 'react';
import {Appbar} from 'react-native-paper';
import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {
  Scene,
  StackNavigationProp,
} from '@react-navigation/stack/lib/typescript/src/types';
import {ChatStackParamList} from '../../types/ChatStackParamList';
import {DrawerNavigationProp} from '@react-navigation/drawer';
import {DrawerParamList} from '../../types/DrawerParamList';
import {StyleSheet} from 'react-native';

type DefaultStackAppbarProps = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<ChatStackParamList, 'Home'>,
    DrawerNavigationProp<DrawerParamList>
  >;
  scene: Scene<RouteProp<ChatStackParamList, 'Home'>>;
};

const DefaultStackAppbar: React.FC<DefaultStackAppbarProps> = ({
  navigation,
  scene,
}) => {
  const screenName: string =
    scene.route.name === 'Home' ? 'Connect' : scene.route.name;

  return (
    <Appbar.Header style={styles.appbar} dark={true}>
      <Appbar.Action icon={'menu'} size={23} onPress={navigation.openDrawer} />
      <Appbar.Content title={screenName} />
    </Appbar.Header>
  );
};

export default DefaultStackAppbar;

const styles = StyleSheet.create({
  appbar: {backgroundColor: '#202329', elevation: 0},
});
