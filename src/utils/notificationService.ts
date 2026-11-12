import notifee, {
  AndroidImportance,
} from '@notifee/react-native';

export const setupNotifications = async (): Promise<void> => {
  await notifee.requestPermission();

  await notifee.createChannel({
    id: 'orders',
    name: 'Order Notifications',
    importance: AndroidImportance.HIGH,
  });
};

export const showOrderNotification = async (
  orderId: string,
): Promise<void> => {
  await notifee.displayNotification({
    title: 'Order Placed 🎉',
    body: `Your order ${orderId} has been placed successfully!`,
    android: {
      channelId: 'orders',
      smallIcon: 'ic_launcher',
      pressAction: {
        id: 'default',
      },
    },
  });
};