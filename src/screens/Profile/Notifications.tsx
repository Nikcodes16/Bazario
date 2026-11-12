import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import {ChevronLeft, Bell} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {getAuth} from '@react-native-firebase/auth';
import {
  getDatabase,
  get,
  ref,
  set,
} from '@react-native-firebase/database';

import {colors} from '../../theme/colors';

type NotificationSettings = {
  push: boolean;
  orders: boolean;
  offers: boolean;
  wishlist: boolean;
  newArrivals: boolean;
};

const defaultSettings: NotificationSettings = {
  push: true,
  orders: true,
  offers: true,
  wishlist: true,
  newArrivals: true,
};

const Notifications = ({navigation}: any) => {
  const [settings, setSettings] =
    useState<NotificationSettings>(defaultSettings);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        setLoading(false);
        return;
      }

      const database = getDatabase(
        undefined,
        'https://bazario-82da0-default-rtdb.asia-southeast1.firebasedatabase.app',
      );

      const settingsRef = ref(
        database,
        `users/${user.uid}/notificationSettings`,
      );

      const snapshot = await get(settingsRef);

      if (snapshot.exists()) {
        setSettings({
          ...defaultSettings,
          ...snapshot.val(),
        });
      }
    } catch (error) {
      console.log('NOTIFICATION LOAD ERROR:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSetting = (
    key: keyof NotificationSettings,
  ) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const saveSettings = async () => {
    try {
      setSaving(true);

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      const database = getDatabase(
        undefined,
        'https://bazario-82da0-default-rtdb.asia-southeast1.firebasedatabase.app',
      );

      const settingsRef = ref(
        database,
        `users/${user.uid}/notificationSettings`,
      );

      await set(settingsRef, settings);

      navigation.goBack();
    } catch (error) {
      console.log('NOTIFICATION SAVE ERROR:', error);
    } finally {
      setSaving(false);
    }
  };

  const notificationItems = [
    {
      key: 'push' as const,
      title: 'Push Notifications',
      description: 'Receive notifications from Bazario',
    },
    {
      key: 'orders' as const,
      title: 'Order Updates',
      description:
        'Get updates about your orders and delivery',
    },
    {
      key: 'offers' as const,
      title: 'Offers & Discounts',
      description:
        'Receive exclusive deals and special offers',
    },
    {
      key: 'wishlist' as const,
      title: 'Wishlist Updates',
      description:
        'Get notified about wishlist items and price changes',
    },
    {
      key: 'newArrivals' as const,
      title: 'New Arrivals',
      description:
        'Know when new products are added',
    },
  ];

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}>
      <View style={styles.container}>

        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <ChevronLeft
              size={24}
              color={colors.primary}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Notifications
          </Text>

          <View style={styles.headerSpacer} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>

          {/* Title */}
          <View style={styles.titleRow}>
            <View style={styles.iconCircle}>
              <Bell
                size={22}
                color={colors.primary}
              />
            </View>

            <View style={styles.titleContent}>
              <Text style={styles.title}>
                Notification Settings
              </Text>

              <Text style={styles.subtitle}>
                Choose what you want to be notified about
              </Text>
            </View>
          </View>

          {/* Notification Card */}
          <View style={styles.card}>
            {loading ? (
              <View style={styles.loaderContainer}>
                <ActivityIndicator
                  size="small"
                  color={colors.primary}
                />
              </View>
            ) : (
              notificationItems.map((item, index) => (
                <View
                  key={item.key}
                  style={[
                    styles.settingRow,
                    index !==
                      notificationItems.length - 1 &&
                      styles.borderBottom,
                  ]}>

                  <View style={styles.settingText}>
                    <Text style={styles.settingTitle}>
                      {item.title}
                    </Text>

                    <Text style={styles.settingDescription}>
                      {item.description}
                    </Text>
                  </View>

                  <Switch
                    value={settings[item.key]}
                    onValueChange={() =>
                      toggleSetting(item.key)
                    }
                    trackColor={{
                      false: '#D1D5DB',
                      true: colors.primary,
                    }}
                    thumbColor="#FFFFFF"
                  />
                </View>
              ))
            )}
          </View>

          {/* Info */}
          <View style={styles.infoBox}>
            <Bell
              size={18}
              color={colors.primary}
            />

            <Text style={styles.infoText}>
              You can change these notification preferences
              anytime from your profile settings.
            </Text>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={saveSettings}
            disabled={saving || loading}>

            {saving ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.saveButtonText}>
                Save Preferences
              </Text>
            )}
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 60,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  backButton: {
    width: 35,
    height: 35,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    flex: 1,
    textAlign: 'center',
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: colors.primary,
  },

  headerSpacer: {
    width: 35,
  },

  scrollContent: {
    padding: 16,
    paddingBottom: 120,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },

  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  titleContent: {
    flex: 1,
  },

  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#111827',
  },

  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#6B7280',
    marginTop: 2,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },

  settingRow: {
    minHeight: 82,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  settingText: {
    flex: 1,
    paddingRight: 12,
  },

  settingTitle: {
    fontFamily: 'Poppins-Medium',
    fontSize: 14,
    color: '#111827',
  },

  settingDescription: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#6B7280',
    marginTop: 3,
    lineHeight: 17,
  },

  loaderContainer: {
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  },

  infoBox: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: '#EAF6FF',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  infoText: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 17,
  },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  saveButton: {
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonText: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 14,
    color: '#FFFFFF',
  },
});