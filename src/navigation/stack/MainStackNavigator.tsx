import React from 'react';
import {
  FriendProfileAppbar,
  FriendProfile,
  ChatRoomAppbar,
  ChatRoom,
} from '../../chat-views';
import FriendRow from '../../chat-views/FriendRow';
import {TransitionPresets} from '@react-navigation/stack';
import DefaultStackAppbar from './appbars/DefaultStackAppbar';
import {ChatStackParamList} from '../types/ChatStackParamList';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';

const Stack = createSharedElementStackNavigator<ChatStackParamList>();

const MainStackNavigator: React.FC = _ => {
  return (
    <Stack.Navigator
      headerMode={'screen'}
      screenOptions={{
        gestureEnabled: false,
        header: ({navigation, scene}: {navigation: any; scene: any}) => (
          <DefaultStackAppbar navigation={navigation} scene={scene} />
        ),
        cardStyle: {
          backgroundColor: 'white',
        },
      }}>
      <Stack.Screen name={'Home'} component={FriendRow} />
      <Stack.Screen
        name={'FriendChat'}
        component={ChatRoom}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          // @ts-ignore
          swipeEnabled: false,
          header: ({navigation, scene}: {navigation: any; scene: any}) => (
            <ChatRoomAppbar navigation={navigation} scene={scene} />
          ),
        }}
      />
      <Stack.Screen
        name={'FriendProfile'}
        component={FriendProfile}
        options={{
          headerShown: false,
          header: ({navigation}: {navigation: any}) => (
            <FriendProfileAppbar navigation={navigation} />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
