import {getApp} from '@react-native-firebase/app';
import {
  getMessaging,
  getToken,
  requestPermission,
  onMessage,
} from '@react-native-firebase/messaging';

import notifee, {
  AndroidImportance,
} from '@notifee/react-native';

const app = getApp();
const messagingInstance = getMessaging(app);

// Permission
export const requestNotificationPermission =
  async (): Promise<void> => {
    await requestPermission(messagingInstance);
  };

// FCM Token
export const getFCMToken =
  async (): Promise<string> => {
    const token = await getToken(messagingInstance);

    console.log('FCM TOKEN:', token);

    return token;
  };

// Foreground notification
export const setupForegroundNotification =
  async (): Promise<() => void> => {

    // Android notification channel
    await notifee.createChannel({
      id: 'default',
      name: 'Default Notifications',
      importance: AndroidImportance.HIGH,
    });

    // App OPEN hone par message receive
    const unsubscribe = onMessage(
      messagingInstance,
      async remoteMessage => {

        console.log(
          'FOREGROUND MESSAGE:',
          remoteMessage,
        );

        await notifee.displayNotification({
          title:
            remoteMessage.notification?.title ||
            'New Notification',

          body:
            remoteMessage.notification?.body ||
            'You have a new notification',

          android: {
            channelId: 'default',
            smallIcon: 'ic_launcher',

            pressAction: {
              id: 'default',
            },
          },
        });
      },
    );

    return unsubscribe;
  };