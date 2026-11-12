import React, {useEffect} from 'react';
import {
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import {
  NavigationContainer,
} from '@react-navigation/native';

import {
  SafeAreaProvider,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';

import AppNavigator from './src/navigation/AppNavigator';

import Toast from 'react-native-toast-message';
import CustomToast from './src/components/CustomToast';

import BackgroundGradient from './src/components/BackgroundGradient';
import {setupNotifications} from './src/utils/notificationService';

import {
  requestNotificationPermission,
  getFCMToken,
  setupForegroundNotification,
} from './src/utils/firebaseNotification';
const AppContent = () => {
  const insets = useSafeAreaInsets();
 
useEffect(() => {
  const setupNotifications = async () => {
    try {
      await requestNotificationPermission();

      const token = await getFCMToken();

      console.log('MY FCM TOKEN:', token);

      await setupForegroundNotification();

    } catch (error) {
      console.log('FCM ERROR:', error);
    }
  };

  setupNotifications();
}, []);
 
  const toastConfig = {
    success: (props: any) => (
      <CustomToast {...props} />
    ),
  };

  return (
    <View style={[styles.container, { paddingBottom: insets.bottom }]}>
      <BackgroundGradient />

      <StatusBar
        barStyle="dark-content"
        backgroundColor="transparent"
        translucent
      />

      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>

      <Toast
        config={toastConfig}
        position="bottom"
        bottomOffset={180}
      />
    </View>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <AppContent />
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
