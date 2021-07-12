import React from 'react';
import {
  FriendProfileAppbar,
  FriendProfile,
  ChatRoomAppbar,
  ChatRoom,
} from '../../chat-views';
import FriendRow from '../../chat-views/FriendRow';
import {TransitionPresets} from '@react-navigation/stack';
import StackNavigatorAppbar from './StackNavigatorAppBar';
import {StackScreenParams} from '../types/StackScreenParams';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import { QrScanner } from '../../authentication/qr';
import FullScreenImageMessage from '../../chat-messages/image-message/FullScreenImageMessage';
import ImageMessage from '../../chat-messages/image-message/ImageMessage';

const Stack = createSharedElementStackNavigator<StackScreenParams>();

const MainStackNavigator: React.FC = _ => {
  return (
    <Stack.Navigator
      headerMode={'screen'}
      screenOptions={{
        gestureEnabled: false,
        header: ({navigation, scene}: {navigation: any; scene: any}) => (
          <StackNavigatorAppbar navigation={navigation} scene={scene} />
        ),
        cardStyle: {
          backgroundColor: 'white',
        },
        cardOverlayEnabled: true
      }}>
      <Stack.Screen name={'Home'} component={ImageMessage} />

      <Stack.Screen
        name={'Chatroom'}
        component={ChatRoom}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          cardOverlayEnabled: true,
          header: ({navigation, scene}: {navigation: any; scene: any}) => (
            <ChatRoomAppbar navigation={navigation} scene={scene} />
          ),
        }}
      />

      <Stack.Screen 
        name={'FullScreenImageMessage'}
        component={FullScreenImageMessage}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          cardOverlayEnabled: true
        }}
        sharedElementsConfig={(route) => {
          return [route.params?.id]
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

      <Stack.Screen 
        name={'Scanner'}
        component={QrScanner}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
