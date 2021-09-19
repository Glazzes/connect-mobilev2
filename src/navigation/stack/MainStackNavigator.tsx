import React from 'react';
import {ChatRoom} from '../../chat-views';
import {TransitionPresets} from '@react-navigation/stack';
import StackNavigatorAppbar from './StackNavigatorAppBar';
import {StackScreenParams} from './StackScreenParams';
import {createSharedElementStackNavigator} from 'react-navigation-shared-element';
import {
  BrowserNotFound,
  QrScanner,
  QrWarning,
  SuccessfulQrScan,
} from '../../authentication/domain/qr';
import FullScreenImageMessage from '../../chat-messages/image-message/FullScreenImageMessage';
import Trigo from '../../devices/Trigonometry';
import Device from '../../devices/Device';
import SucessfulLogin from '../../authentication/domain/qr/SucessfulLogin';
import FriendRow from '../../chat/FriendRow';

const Stack = createSharedElementStackNavigator<StackScreenParams>();

const MainStackNavigator: React.FC = _ => {
  return (
    <Stack.Navigator
      mode={'modal'}
      initialRouteName={'Home'}
      headerMode={'screen'}
      screenOptions={{
        gestureEnabled: false,
        cardStyle: {
          backgroundColor: '#202329',
        },
        cardOverlayEnabled: true,
        header: ({navigation, scene}: {navigation: any; scene: any}) => (
          <StackNavigatorAppbar navigation={navigation} scene={scene} />
        ),
      }}>
      <Stack.Screen
        name={'Home'}
        component={FriendRow}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'Chatroom'}
        component={ChatRoom}
        options={{
          ...TransitionPresets.SlideFromRightIOS,
          cardOverlayEnabled: true,
          headerShown: false,
        }}
      />

      <Stack.Screen
        name={'FullScreenImageMessage'}
        component={FullScreenImageMessage}
        options={{
          headerShown: false,
          cardStyle: {backgroundColor: 'transparent'},
          cardOverlayEnabled: true,
        }}
        sharedElementsConfig={route => {
          return [`f-image-${route.params?.id}`];
        }}
      />

      <Stack.Screen
        name={'FriendProfile'}
        component={Trigo}
        options={{
          headerShown: false,
          cardStyle: {
            backgroundColor: 'rgb(11, 15, 17)',
          },
        }}
        sharedElementsConfig={route => {
          return [`pfp-${route.params?.friend?.id}`];
        }}
      />

      <Stack.Screen name={'Devices'} component={Device} />

      {/* Scanner screens */}
      <Stack.Screen
        name={'QrWarning'}
        component={QrWarning}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'QrScanner'}
        component={QrScanner}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'SuccessfulQrScan'}
        component={SuccessfulQrScan}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'SuccessfulLogin'}
        component={SucessfulLogin}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name={'BrowserNotFound'}
        component={BrowserNotFound}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
