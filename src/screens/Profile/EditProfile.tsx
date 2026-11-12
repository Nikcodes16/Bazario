import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {
  ChevronLeft,
  Pencil,
  User,
} from 'lucide-react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {getAuth} from '@react-native-firebase/auth';

import {colors} from '../../theme/colors';
import BackgroundGradient from '../../components/BackgroundGradient';
import {
  getUserProfile,
  updateUserProfile,
} from '../../services/firebaseDatabase';

const EditProfile = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
  });

  // Load existing profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          setLoading(false);
          return;
        }

        // Email Firebase Auth se
        setEmail(user.email || '');

        // Name + phone Database se
        const profile = await getUserProfile(user.uid);

        if (profile) {
          setName(profile.name || '');
          setPhone(profile.phone || '');
        }
      } catch (error) {
        console.log('EDIT PROFILE LOAD ERROR:', error);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const clearError = (
    field: keyof typeof errors,
  ) => {
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const validateFields = () => {
    const newErrors = {
      name: '',
      phone: '',
    };

    // Name validation
    if (!name.trim()) {
      newErrors.name =
        'Please enter your full name.';
    } else if (name.trim().length < 3) {
      newErrors.name =
        'Name must be at least 3 characters.';
    } else if (
      !/^[A-Za-z]+(?:\s+[A-Za-z]+)+$/.test(
        name.trim(),
      )
    ) {
      newErrors.name =
        'Please enter a valid full name.';
    }

    // Phone validation
    if (!phone.trim()) {
      newErrors.phone =
        'Please enter your mobile number.';
    } else if (
      !/^[6-9]\d{9}$/.test(phone.trim())
    ) {
      newErrors.phone =
        'Please enter a valid 10-digit mobile number.';
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some(
      error => error !== '',
    );
  };

  const handleSave = async () => {
    const isValid = validateFields();

    if (!isValid) {
      return;
    }

    try {
      setSaving(true);

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        return;
      }

      await updateUserProfile(user.uid, {
        name: name.trim(),
        phone: phone.trim(),
      });

      console.log('PROFILE UPDATED');

      navigation.goBack();
    } catch (error) {
      console.log(
        'EDIT PROFILE SAVE ERROR:',
        error,
      );
    } finally {
      setSaving(false);
    }
  };

  // Loading screen
  if (loading) {
    return (
      <SafeAreaView
        style={styles.container}
        edges={['top', 'left', 'right']}>

        <BackgroundGradient />

        <View style={styles.header}>
          <TouchableOpacity
            activeOpacity={0.75}
            style={styles.backButton}
            onPress={() => navigation.goBack()}>

            <ChevronLeft
              size={21}
              color="#FFFFFF"
              strokeWidth={2.5}
            />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>
            Edit Profile
          </Text>

          <View style={styles.headerSpace} />
        </View>

        <View style={styles.loadingContainer}>
          <ActivityIndicator
            size="large"
            color={colors.primary}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right']}>

      <BackgroundGradient />

      {/* Header */}
      <View style={styles.header}>

        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.backButton}
          onPress={() => navigation.goBack()}>

          <ChevronLeft
            size={21}
            color="#FFFFFF"
            strokeWidth={2.5}
          />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Edit Profile
        </Text>

        <View style={styles.headerSpace} />
      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }
        keyboardVerticalOffset={0}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled">

          {/* Title */}
          <View style={styles.titleRow}>

            <View style={styles.iconContainer}>
              <Pencil
                size={22}
                color="#111827"
                strokeWidth={2}
              />
            </View>

            <View>
              <Text style={styles.title}>
                Personal Information
              </Text>

              <Text style={styles.subtitle}>
                Update your profile details
              </Text>
            </View>

          </View>

          {/* Form */}
          <View style={styles.form}>

            {/* Name */}
            <View style={styles.inputGroup}>

              <Text style={styles.label}>
                Full Name
              </Text>

              <TextInput
                value={name}
                onChangeText={text => {
                  setName(text);
                  clearError('name');
                }}
                placeholder="Enter your full name"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                style={[
                  styles.input,
                  errors.name &&
                    styles.inputError,
                ]}
              />

              {errors.name ? (
                <Text style={styles.fieldError}>
                  {errors.name}
                </Text>
              ) : null}

            </View>

            {/* Phone */}
            <View style={styles.inputGroup}>

              <Text style={styles.label}>
                Mobile Number
              </Text>

              <TextInput
                value={phone}
                onChangeText={text => {
                  setPhone(
                    text.replace(
                      /[^0-9]/g,
                      '',
                    ),
                  );

                  clearError('phone');
                }}
                placeholder="Enter mobile number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                maxLength={10}
                style={[
                  styles.input,
                  errors.phone &&
                    styles.inputError,
                ]}
              />

              {errors.phone ? (
                <Text style={styles.fieldError}>
                  {errors.phone}
                </Text>
              ) : null}

            </View>

            {/* Email */}
            <View style={styles.inputGroup}>

              <Text style={styles.label}>
                Email Address
              </Text>

              <TextInput
                value={email}
                editable={false}
                placeholder="Your email address"
                placeholderTextColor="#9CA3AF"
                keyboardType="email-address"
                autoCapitalize="none"
                style={styles.disabledInput}
              />

              {/* <Text style={styles.infoText}>
                Email address is managed by
                Firebase Authentication.
              </Text> */}

            </View>

          </View>

          {/* Profile Info */}
          {/* <View style={styles.infoCard}>

            <View style={styles.infoIcon}>
              <User
                size={19}
                color={colors.primary}
              />
            </View>

            <Text style={styles.infoCardText}>
              Your personal information is securely
              linked to your Firebase account.
            </Text>

          </View> */}

        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomBar}>

          <TouchableOpacity
            activeOpacity={0.8}
            style={[
              styles.saveButton,
              saving &&
                styles.saveButtonDisabled,
            ]}
            onPress={handleSave}
            disabled={saving}>

            {saving ? (
              <ActivityIndicator
                size="small"
                color="#FFFFFF"
              />
            ) : (
              <Text style={styles.saveText}>
                Save Changes
              </Text>
            )}

          </TouchableOpacity>

        </View>

      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },

  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  header: {
    height: 60,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  backButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  headerTitle: {
    fontSize: 20,
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },

  headerSpace: {
    width: 40,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },

  iconContainer: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },

  title: {
    fontSize: 18,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },

  subtitle: {
    marginTop: -4,
    fontSize: 13,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },

  form: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  inputGroup: {
    marginBottom: 18,
  },

  label: {
    marginBottom: 7,
    fontSize: 14,
    fontFamily: 'Poppins-Medium',
    color: 'black',
  },

  input: {
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    backgroundColor: '#FFFFFF',
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Poppins-Regular',
  },

  disabledInput: {
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },

  inputError: {
    borderColor: '#EF4444',
    backgroundColor: '#FFF7F7',
  },

  fieldError: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 16,
    color: '#EF4444',
    fontFamily: 'Poppins-Regular',
  },

  infoText: {
    marginTop: 5,
    fontSize: 10.5,
    lineHeight: 15,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },

  infoCard: {
    marginTop: 16,
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'center',
  },

  infoIcon: {
    width: 35,
    height: 35,
    borderRadius: 18,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },

  infoCardText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },

  bottomBar: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  saveButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },

  saveButtonDisabled: {
    opacity: 0.7,
  },

  saveText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },

  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default EditProfile;