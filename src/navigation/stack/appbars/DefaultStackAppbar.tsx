import React from 'react';
import {Appbar} from 'react-native-paper';
import {
  Scene,
  StackNavigationProp,
} from '@react-navigation/stack/lib/typescript/src/types';
import {Route} from '@react-navigation/native';

interface DefaultStackAppbarProps {
  scene: Scene<Route<string, object | undefined>>;
  navigation: StackNavigationProp<Record<string, object | undefined>, string>;
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
      <Appbar.Action icon={'arrow-collapse-left'} size={20} />
    </Appbar.Header>
  );
};

export default DefaultStackAppbar;
