import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Switch,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  ArrowLeft,
  Languages,
  Monitor,
  Bell,
  Vibrate,
  RefreshCw,
  Smartphone,
  Check,
} from 'lucide-react-native';

import {colors} from '../../theme/colors';

const Settings = ({navigation}: any) => {
  const [notifications, setNotifications] = useState(true);
  const [vibration, setVibration] = useState(true);

  const [modalVisible, setModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const openModal = (
    title: string,
    message: string,
  ) => {
    setModalTitle(title);
    setModalMessage(message);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}>

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <ArrowLeft
            size={21}
            color="#111827"
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Settings
        </Text>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        <Text style={styles.sectionTitle}>
          App Preferences
        </Text>

        <View style={styles.card}>

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Languages
                size={20}
                color={colors.primary}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>
                Language
              </Text>
              <Text style={styles.rowSubtitle}>
                English
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Monitor
                size={20}
                color={colors.primary}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>
                Appearance
              </Text>
              <Text style={styles.rowSubtitle}>
                System Default
              </Text>
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Bell
                size={20}
                color={colors.primary}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>
                Notifications
              </Text>
              <Text style={styles.rowSubtitle}>
                {notifications
                  ? 'Enabled'
                  : 'Disabled'}
              </Text>
            </View>

            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{
                false: '#D1D5DB',
                true: colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Vibrate
                size={20}
                color={colors.primary}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>
                Vibration
              </Text>
              <Text style={styles.rowSubtitle}>
                {vibration
                  ? 'Enabled'
                  : 'Disabled'}
              </Text>
            </View>

            <Switch
              value={vibration}
              onValueChange={setVibration}
              trackColor={{
                false: '#D1D5DB',
                true: colors.primary,
              }}
              thumbColor="#FFFFFF"
            />
          </View>

        </View>

        <Text style={styles.sectionTitle}>
          App
        </Text>

        <View style={styles.card}>

          <TouchableOpacity
            style={styles.row}
            activeOpacity={0.7}
            onPress={() =>
              openModal(
                'Check for Updates',
                'You are using the latest version of Bazario.',
              )
            }>

            <View style={styles.iconBox}>
              <RefreshCw
                size={20}
                color={colors.primary}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>
                Check for Updates
              </Text>
              <Text style={styles.rowSubtitle}>
                Check for the latest version
              </Text>
            </View>

          </TouchableOpacity>

          <View style={styles.row}>
            <View style={styles.iconBox}>
              <Smartphone
                size={20}
                color={colors.primary}
              />
            </View>

            <View style={styles.rowContent}>
              <Text style={styles.rowTitle}>
                App Version
              </Text>
              <Text style={styles.rowSubtitle}>
                Current version
              </Text>
            </View>

            <Text style={styles.versionText}>
              1.0.0
            </Text>
          </View>

        </View>
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}>

        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>

            <View style={styles.modalIcon}>
              <Check
                size={24}
                color={colors.primary}
              />
            </View>

            <Text style={styles.modalTitle}>
              {modalTitle}
            </Text>

            <Text style={styles.modalMessage}>
              {modalMessage}
            </Text>

            <TouchableOpacity
              style={styles.modalButton}
              onPress={closeModal}
              activeOpacity={0.8}>

              <Text style={styles.modalButtonText}>
                OK
              </Text>

            </TouchableOpacity>

          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9FAFB',
  },

  header: {
    height: 62,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3F4F6',
  },

  headerTitle: {
    marginLeft: 12,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  content: {
    padding: 16,
    paddingBottom: 40,
  },

  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#374151',
    marginBottom: 8,
    marginTop: 6,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    marginBottom: 20,
  },

  row: {
    minHeight: 70,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 11,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  rowContent: {
    flex: 1,
    marginLeft: 12,
  },

  rowTitle: {
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: '#111827',
  },

  rowSubtitle: {
    fontSize: 11,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    marginTop: 2,
  },

  versionText: {
    fontSize: 12,
    fontFamily: 'Poppins-Medium',
    color: '#6B7280',
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },

  modalContainer: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
  },

  modalIcon: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 14,
  },

  modalTitle: {
    fontSize: 19,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    textAlign: 'center',
  },

  modalMessage: {
    marginTop: 7,
    marginBottom: 20,
    fontSize: 13,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
    textAlign: 'center',
  },

  modalButton: {
    width: '100%',
    height: 48,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  modalButtonText: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#FFFFFF',
  },
});

export default Settings;