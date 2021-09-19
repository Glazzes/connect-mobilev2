/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, Platform, PushNotificationIOS} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';
import {database} from './src/shared/persistence';
import * as encoding from 'text-encoding';

if (__DEV__) {
  const {
    connectDatabases,
    WatermelonDB,
  } = require('react-native-flipper-databases');

  connectDatabases([new WatermelonDB(database)]);
}

PushNotification.configure({
  // android
  invokeApp: true,
  actions: ['reply'],
  vibrate: true,
  vibration: 300,

  // rn-push-notifications
  onNotification: notification => {
    notification.finish(PushNotificationIOS.FetchResult.NewData);
  },
  requestPermissions: Platform.OS === 'ios',
});

AppRegistry.registerComponent(appName, () => App);
