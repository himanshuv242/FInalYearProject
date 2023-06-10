/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import PushNotification from 'react-native-push-notification';

// Create a notification channel
PushNotification.createChannel(
  {
    channelId: 'my-channel-id', // Replace with your desired channel ID
    channelName: 'My Channel',
    channelDescription: 'A channel for my notifications',
    importance: 4,
    vibrate: true,
  },
  (created) => console.log(`Notification channel created: ${created}`)
);


AppRegistry.registerComponent(appName, () => App);
