import React, {useState} from 'react';

import {
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
  Text,
  Modal,
} from 'react-native';

import {
  createDrawerNavigator,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {DrawerParamList, RootStackParamList} from './navigationTypes';
import {
  Settings as SettingsIcon,
  ShieldCheck,
  FileText,
  HelpCircle,
  Info,
  Package,
  LogOut,
} from 'lucide-react-native';

import {colors} from '../theme/colors';
import {logoutUser} from '../services/firebaseAuth';

import BottomTabNavigator from './BottomTabNavigator';


import Orders from '../screens/Orders/Orders';

const {width} = Dimensions.get('window');

const Drawer = createDrawerNavigator<DrawerParamList>();

type DrawerItemProps = {
  icon: React.ReactNode;
  title: string;
  onPress: () => void;
};

const DrawerItem = ({
  icon,
  title,
  onPress,
}: DrawerItemProps) => (
  <TouchableOpacity
    activeOpacity={0.7}
    style={styles.drawerItem}
    onPress={onPress}>
    <View style={styles.drawerItemLeft}>
      {icon}

      <Text style={styles.drawerItemText}>
        {title}
      </Text>
    </View>
  </TouchableOpacity>
);

const CustomDrawerContent = ({
  navigation,
}: DrawerContentComponentProps) => {
  const [logoutModalVisible, setLogoutModalVisible] =
    useState(false);

  const [logoutLoading, setLogoutLoading] =
    useState(false);

  const [logoutSuccess, setLogoutSuccess] =
    useState(false);

  const [logoutError, setLogoutError] =
    useState('');

  const handleLogout = () => {
    setLogoutError('');
    setLogoutSuccess(false);
    setLogoutModalVisible(true);
  };

  const confirmLogout = async () => {
    try {
      setLogoutLoading(true);

      await logoutUser();

      setLogoutLoading(false);
      setLogoutSuccess(true);
    } catch (error: any) {
      console.log('LOGOUT ERROR:', error);

      setLogoutLoading(false);
      setLogoutError(
        error?.message || 'Unable to logout.',
      );
    }
  };

  const closeLogoutModal = () => {
    if (!logoutLoading) {
      setLogoutModalVisible(false);
      setLogoutSuccess(false);
      setLogoutError('');
    }
  };

  const handleModalButton = () => {
    if (logoutSuccess) {
      setLogoutModalVisible(false);

      navigation.getParent()?.reset({
        index: 0,
        routes: [{name: 'Login'}],
      });

      return;
    }

    if (logoutError) {
      setLogoutError('');
      return;
    }

    closeLogoutModal();
  };

const rootNavigation =
  navigation.getParent<
    NativeStackNavigationProp<RootStackParamList>
  >();

const navigateToSettings = () => {
  rootNavigation?.navigate('Settings');
};

const navigateToInfo = (
  type: RootStackParamList['Info']['type'],
) => {
  rootNavigation?.navigate('Info', {type});
};
  return (
    <>
      <View style={styles.drawerContainer}>
        <View style={styles.drawerContent}>
          <View style={styles.drawerMenu}>
            <Text style={styles.drawerSectionTitle}>
              Menu
            </Text>

            <DrawerItem
              icon={
                <SettingsIcon
                  size={21}
                  color="#111827"
                  strokeWidth={2}
                />
              }
              title="Settings"
              onPress={navigateToSettings}
            />

            <DrawerItem
              icon={
                <ShieldCheck
                  size={21}
                  color="#111827"
                  strokeWidth={2}
                />
              }
              title="Privacy Policy"
              onPress={() => navigateToInfo('Privacy')}
            />

            <DrawerItem
              icon={
                <FileText
                  size={21}
                  color="#111827"
                  strokeWidth={2}
                />
              }
              title="Terms & Conditions"
             onPress={() => navigateToInfo('Terms')}
            />

            <DrawerItem
              icon={
                <HelpCircle
                  size={21}
                  color="#111827"
                  strokeWidth={2}
                />
              }
              title="Help & Support"
             onPress={() => navigateToInfo('Help')}
            />

            <DrawerItem
              icon={
                <Info
                  size={21}
                  color="#111827"
                  strokeWidth={2}
                />
              }
              title="About Us"
             onPress={() => navigateToInfo('About')}
            />

            <Text style={styles.drawerSectionTitle}>
              Orders
            </Text>

            <DrawerItem
              icon={
                <Package
                  size={21}
                  color="#111827"
                  strokeWidth={2}
                />
              }
              title="My Orders"
              onPress={() => navigation.navigate('Orders')}
            />
          </View>

          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.logoutButton}
            onPress={handleLogout}>
            <LogOut
              size={20}
              color="#FFFFFF"
              strokeWidth={2.3}
            />

            <Text style={styles.logoutText}>
              Logout
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={logoutModalVisible}
        transparent
        animationType="fade"
        onRequestClose={closeLogoutModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <View
              style={[
                styles.modalIcon,
                logoutSuccess
                  ? styles.successIcon
                  : logoutError
                  ? styles.errorIcon
                  : styles.logoutIcon,
              ]}>
              <Text style={styles.modalIconText}>
                {logoutSuccess
                  ? '✓'
                  : logoutError
                  ? '!'
                  : '?'}
              </Text>
            </View>

            <Text style={styles.modalTitle}>
              {logoutSuccess
                ? 'Logged Out'
                : logoutError
                ? 'Logout Failed'
                : 'Logout'}
            </Text>

            <Text style={styles.modalMessage}>
              {logoutSuccess
                ? 'You have been logged out successfully.'
                : logoutError
                ? logoutError
                : 'Are you sure you want to logout?'}
            </Text>

            {!logoutSuccess && !logoutError ? (
              <View style={styles.modalButtonRow}>
                <TouchableOpacity
                  style={styles.cancelModalButton}
                  activeOpacity={0.8}
                  disabled={logoutLoading}
                  onPress={closeLogoutModal}>
                  <Text style={styles.cancelModalButtonText}>
                    Cancel
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.confirmModalButton}
                  activeOpacity={0.8}
                  disabled={logoutLoading}
                  onPress={confirmLogout}>
                  <Text style={styles.modalButtonText}>
                    {logoutLoading
                      ? 'Logging out...'
                      : 'Logout'}
                  </Text>
                </TouchableOpacity>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.modalButton}
                activeOpacity={0.8}
                onPress={handleModalButton}>
                <Text style={styles.modalButtonText}>
                  OK
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
};

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => (
        <CustomDrawerContent {...props} />
      )}
      screenOptions={{
        headerShown: false,
        drawerType: 'front',
        overlayColor: 'rgba(0,0,0,0.10)',

        sceneStyle: {
          backgroundColor: 'transparent',
        },

        swipeEnabled: true,

        drawerStyle: {
          width: width * 0.86,
          backgroundColor: '#FFFFFF',
        },
      }}>
      <Drawer.Screen
        name="MainTabs"
        component={BottomTabNavigator}
      />

      <Drawer.Screen
        name="Orders"
        component={Orders}
      />
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  drawerContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  drawerContent: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 35,
    paddingBottom: 30,
  },

  drawerMenu: {
    width: '100%',
  },

  drawerSectionTitle: {
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Poppins-Medium',
    marginTop: 8,
    marginBottom: 8,
  },

  drawerItem: {
    height: 48,
    width: '100%',
    justifyContent: 'center',
  },

  drawerItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  drawerItemText: {
    marginLeft: 14,
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Poppins-Medium',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },

  modalContainer: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: 28,
    alignItems: 'center',
  },

  modalIcon: {
    width: 64,
    height: 64,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  logoutIcon: {
    backgroundColor: '#FEF3C7',
  },

  successIcon: {
    backgroundColor: '#DCFCE7',
  },

  errorIcon: {
    backgroundColor: '#FEE2E2',
  },

  modalIconText: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
  },

  modalTitle: {
    fontSize: 22,
    color: '#1F2937',
    fontFamily: 'Poppins-SemiBold',
    marginBottom: 8,
    textAlign: 'center',
  },

  modalMessage: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
    lineHeight: 21,
    marginBottom: 24,
  },

  modalButtonRow: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },

  cancelModalButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
  },

  cancelModalButtonText: {
    color: '#374151',
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
  },

  confirmModalButton: {
    flex: 1,
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalButton: {
    width: '100%',
    height: 50,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },

  logoutButton: {
    width: '85%',
    height: 52,
    alignSelf: 'center',
    borderRadius: 14,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },

  logoutText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontFamily: 'Poppins-Medium',
  },
});

export default DrawerNavigator;
 