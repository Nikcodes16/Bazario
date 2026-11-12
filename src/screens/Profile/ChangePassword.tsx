import React, {useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {ChevronLeft, Eye, EyeOff, Lock} from 'lucide-react-native';
import {SafeAreaView} from 'react-native-safe-area-context';

import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  updatePassword,
} from '@react-native-firebase/auth';

import {colors} from '../../theme/colors';

const ChangePassword = ({navigation}: any) => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!currentPassword) {
      newErrors.currentPassword = 'Please enter your current password.';
    }

    if (!newPassword) {
      newErrors.newPassword = 'Please enter a new password.';
    } else if (newPassword.length < 6) {
      newErrors.newPassword =
        'Password must be at least 6 characters.';
    }

    if (!confirmPassword) {
      newErrors.confirmPassword =
        'Please confirm your new password.';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChangePassword = async () => {
    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user || !user.email) {
        setErrors({
          general: 'User session not found. Please login again.',
        });
        return;
      }

      const credential = EmailAuthProvider.credential(
        user.email,
        currentPassword,
      );

      await reauthenticateWithCredential(
        user,
        credential,
      );

      await updatePassword(
        user,
        newPassword,
      );

      navigation.goBack();
    } catch (error: any) {
      console.log('CHANGE PASSWORD ERROR:', error);

      if (
        error?.code === 'auth/invalid-credential' ||
        error?.code === 'auth/wrong-password'
      ) {
        setErrors({
          currentPassword: 'Current password is incorrect.',
        });
      } else if (
        error?.code === 'auth/requires-recent-login'
      ) {
        setErrors({
          general:
            'Please login again before changing your password.',
        });
      } else if (
        error?.code === 'auth/weak-password'
      ) {
        setErrors({
          newPassword:
            'Password is too weak. Use at least 6 characters.',
        });
      } else {
        setErrors({
          general:
            'Something went wrong. Please try again.',
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const renderPasswordField = (
    label: string,
    value: string,
    setter: (value: string) => void,
    visible: boolean,
    setVisible: (value: boolean) => void,
    error?: string,
  ) => {
    return (
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>{label}</Text>

        <View
          style={[
            styles.inputWrapper,
            error && styles.inputError,
          ]}>
          <TextInput
            value={value}
            onChangeText={setter}
            secureTextEntry={!visible}
            placeholder={`Enter ${label.toLowerCase()}`}
            placeholderTextColor="#9CA3AF"
            style={styles.input}
            autoCapitalize="none"
          />

          <TouchableOpacity
            onPress={() => setVisible(!visible)}
            style={styles.eyeButton}>
            {visible ? (
              <EyeOff
                size={20}
                color="#6B7280"
              />
            ) : (
              <Eye
                size={20}
                color="#6B7280"
              />
            )}
          </TouchableOpacity>
        </View>

        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : null}
      </View>
    );
  };

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['top']}>

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}>
          <ChevronLeft
            size={24}
            color={colors.primary}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Change Password
        </Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>

        {/* Title */}
        <View style={styles.titleRow}>
          <View style={styles.iconCircle}>
            <Lock
              size={22}
              color={colors.primary}
            />
          </View>

          <View>
            <Text style={styles.title}>
              Change Password
            </Text>

            <Text style={styles.subtitle}>
              Keep your account secure
            </Text>
          </View>
        </View>

        {/* Form Card */}
        <View style={styles.card}>
          {renderPasswordField(
            'Current Password',
            currentPassword,
            setCurrentPassword,
            showCurrent,
            setShowCurrent,
            errors.currentPassword,
          )}

          {renderPasswordField(
            'New Password',
            newPassword,
            setNewPassword,
            showNew,
            setShowNew,
            errors.newPassword,
          )}

          {renderPasswordField(
            'Confirm Password',
            confirmPassword,
            setConfirmPassword,
            showConfirm,
            setShowConfirm,
            errors.confirmPassword,
          )}

          {errors.general ? (
            <Text style={styles.generalError}>
              {errors.general}
            </Text>
          ) : null}
        </View>
      </ScrollView>

      {/* Bottom Button */}
      <View style={styles.bottomBar}>
        <TouchableOpacity
          style={styles.saveButton}
          onPress={handleChangePassword}
          disabled={loading}>

          {loading ? (
            <ActivityIndicator color="#FFFFFF" />
          ) : (
            <Text style={styles.saveButtonText}>
              Update Password
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default ChangePassword;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },

  backButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },

  headerTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#111827',
  },

  headerSpacer: {
    width: 40,
  },

  content: {
    padding: 16,
    paddingBottom: 120,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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

  title: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 20,
    color: '#111827',
  },

  subtitle: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 16,
  },

  fieldContainer: {
    marginBottom: 18,
  },

  label: {
    fontFamily: 'Poppins-Medium',
    fontSize: 13,
    color: '#374151',
    marginBottom: 7,
  },

  inputWrapper: {
    height: 50,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  inputError: {
    borderColor: '#EF4444',
  },

  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 14,
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#111827',
  },

  eyeButton: {
    paddingHorizontal: 14,
    height: '100%',
    justifyContent: 'center',
  },

  errorText: {
    fontFamily: 'Poppins-Regular',
    fontSize: 11,
    color: '#EF4444',
    marginTop: 5,
  },

  generalError: {
    fontFamily: 'Poppins-Regular',
    fontSize: 12,
    color: '#EF4444',
    marginTop: 2,
    textAlign: 'center',
  },

  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    padding: 16,
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
    fontSize: 15,
    color: '#FFFFFF',
  },
});