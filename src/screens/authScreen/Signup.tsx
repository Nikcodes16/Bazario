import React, {useState} from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
    useWindowDimensions,
} from 'react-native';

import {colors} from '../../theme/colors';
import {signupUser} from '../../services/firebaseAuth';
import {createUserProfile} from '../../services/firebaseDatabase';

const Signup = ({navigation}: any) => {

    const {width, height} = useWindowDimensions();

  const isSmallScreen = width < 360;
  const isShortScreen = height < 700;
  const isLargeScreen = width >= 430;

  const logoSize = isSmallScreen ? 150 : isLargeScreen ? 210 : 180;
  const horizontalPadding = isSmallScreen ? 18 : 24;
  const titleSize = isSmallScreen ? 23 : 26;


  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [modalVisible, setModalVisible] = useState(false);
const [modalTitle, setModalTitle] = useState('');
const [modalMessage, setModalMessage] = useState('');
const [modalType, setModalType] = useState<'success' | 'error'>('error');
const showModal = (
  title: string,
  message: string,
  type: 'success' | 'error',
) => {
  setModalTitle(title);
  setModalMessage(message);
  setModalType(type);
  setModalVisible(true);
};

  const validateName = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return 'Name is required';
    }

    if (trimmedValue.length < 2) {
      return 'Name must be at least 2 characters';
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedValue)) {
      return 'Name can contain only letters';
    }

    return '';
  };

  const validateEmail = (value: string) => {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return 'Email is required';
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(trimmedValue)) {
      return 'Please enter a valid email address';
    }

    return '';
  };

  const validatePhone = (value: string) => {
    const cleanedPhone = value.replace(/\D/g, '');

    if (!cleanedPhone) {
      return 'Phone number is required';
    }

    if (cleanedPhone.length !== 10) {
      return 'Phone number must be 10 digits';
    }

    if (!/^[6-9]\d{9}$/.test(cleanedPhone)) {
      return 'Please enter a valid Indian phone number';
    }

    return '';
  };

  const validatePassword = (value: string) => {
    if (!value) {
      return 'Password is required';
    }

    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }

    return '';
  };

  const validateConfirmPassword = (
    value: string,
  ) => {
    if (!value) {
      return 'Please confirm your password';
    }

    if (value !== password) {
      return 'Passwords do not match';
    }

    return '';
  };

  const validateAllFields = () => {
    const newErrors = {
      name: validateName(name),
      email: validateEmail(email),
      phone: validatePhone(phone),
      password: validatePassword(password),
      confirmPassword:
        validateConfirmPassword(confirmPassword),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(
      error => error !== '',
    );
  };

  const handleSignup = async () => {
    console.log('========== SIGNUP START ==========');

    const isValid = validateAllFields();

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      console.log(
        'STEP 1: Calling Firebase Auth...',
      );

      const user = await signupUser(
        email.trim(),
        password,
      );

      console.log(
        'STEP 2: Firebase Auth SUCCESS',
      );
      console.log('UID:', user.uid);
      console.log('EMAIL:', user.email);

      console.log(
        'STEP 3: Calling Realtime Database...',
      );

      await createUserProfile(user.uid, {
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        createdAt: Date.now(),
      });

      console.log(
        'STEP 4: Realtime Database SUCCESS',
      );

      setLoading(false);

     showModal(
  'Success',
  'Account created successfully!',
  'success',
);
    } catch (error: any) {
      setLoading(false);

      console.log(
        '========== SIGNUP ERROR ==========',
      );
      console.log('CODE:', error?.code);
      console.log('MESSAGE:', error?.message);
      console.log('FULL ERROR:', error);

      if (
        error?.code ===
        'auth/email-already-in-use'
      ) {
        setErrors(prev => ({
          ...prev,
          email: 'This email is already registered',
        }));

        return;
      }

      if (
        error?.code === 'auth/invalid-email'
      ) {
        setErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email address',
        }));

        return;
      }

      if (
        error?.code === 'auth/weak-password'
      ) {
        setErrors(prev => ({
          ...prev,
          password:
            'Password is too weak. Use at least 6 characters',
        }));

        return;
      }

      showModal(
  'Signup Error',
  error?.message || 'Something went wrong',
  'error',
);
    }
  };

  return (
    <>
    <Modal
  visible={modalVisible}
  transparent={true}
  animationType="fade"
  onRequestClose={() => {
    setModalVisible(false);
  }}
>
  <View style={styles.modalOverlay}>
    <View style={styles.modalContainer}>

      <View
        style={[
          styles.modalIcon,
          modalType === 'success'
            ? styles.successIcon
            : styles.errorIcon,
        ]}
      >
        <Text style={styles.modalIconText}>
          {modalType === 'success' ? '✓' : '!'}
        </Text>
      </View>

      <Text style={styles.modalTitle}>
        {modalTitle}
      </Text>

      <Text style={styles.modalMessage}>
        {modalMessage}
      </Text>

      <TouchableOpacity
        style={styles.modalButton}
        activeOpacity={0.8}
        onPress={() => {
          setModalVisible(false);

          if (modalType === 'success') {
            navigation.replace('MainTabs');
          }
        }}
      >
        <Text style={styles.modalButtonText}>
          OK
        </Text>
      </TouchableOpacity>

    </View>
  </View>
</Modal>
    <KeyboardAvoidingView
      style={styles.keyboardView}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
       <View
  style={[
    styles.container,
    {
      paddingHorizontal: horizontalPadding,
      paddingTop: isShortScreen ? 10 : 20,
    },
  ]}>

          {/* HEADER */}
          <View style={styles.header}>
            <Image
  source={require('../../assets/images/logo.png')}
  style={[
    styles.logo,
    {
      width: logoSize,
      height: logoSize,
    },
  ]}
  resizeMode="contain"
/>

<Text style={[styles.title, {fontSize: titleSize}]}>
  Create Account
</Text>

<Text style={styles.subtitle}>
  Create your account to continue
</Text>
          </View>

          {/* NAME */}
          <TextInput
            style={[
              styles.input,
              errors.name && styles.inputError,
            ]}
            placeholder="Name"
            placeholderTextColor="#9CA3AF"
            value={name}
            onChangeText={value => {
              setName(value);

              setErrors(prev => ({
                ...prev,
                name: '',
              }));
            }}
            onBlur={() => {
              setErrors(prev => ({
                ...prev,
                name: validateName(name),
              }));
            }}
            autoCapitalize="words"
            autoCorrect={false}
            returnKeyType="next"
          />

          {errors.name ? (
            <Text style={styles.errorText}>
              {errors.name}
            </Text>
          ) : null}

          {/* EMAIL */}
          <TextInput
            style={[
              styles.input,
              errors.email && styles.inputError,
            ]}
            placeholder="Email"
            placeholderTextColor="#9CA3AF"
            value={email}
            onChangeText={value => {
              setEmail(value);

              setErrors(prev => ({
                ...prev,
                email: '',
              }));
            }}
            onBlur={() => {
              setErrors(prev => ({
                ...prev,
                email: validateEmail(email),
              }));
            }}
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />

          {errors.email ? (
            <Text style={styles.errorText}>
              {errors.email}
            </Text>
          ) : null}

          {/* PHONE */}
          <TextInput
            style={[
              styles.input,
              errors.phone && styles.inputError,
            ]}
            placeholder="Phone"
            placeholderTextColor="#9CA3AF"
            value={phone}
            onChangeText={value => {
              const cleanedValue =
                value.replace(/\D/g, '');

              setPhone(cleanedValue);

              setErrors(prev => ({
                ...prev,
                phone: '',
              }));
            }}
            onBlur={() => {
              setErrors(prev => ({
                ...prev,
                phone: validatePhone(phone),
              }));
            }}
            keyboardType="phone-pad"
            maxLength={10}
            returnKeyType="next"
          />

          {errors.phone ? (
            <Text style={styles.errorText}>
              {errors.phone}
            </Text>
          ) : null}

          {/* PASSWORD */}
          <TextInput
            style={[
              styles.input,
              errors.password && styles.inputError,
            ]}
            placeholder="Password"
            placeholderTextColor="#9CA3AF"
            value={password}
            onChangeText={value => {
              setPassword(value);

              setErrors(prev => ({
                ...prev,
                password: '',
                confirmPassword:
                  confirmPassword &&
                  value !== confirmPassword
                    ? 'Passwords do not match'
                    : '',
              }));
            }}
            onBlur={() => {
              setErrors(prev => ({
                ...prev,
                password:
                  validatePassword(password),
              }));
            }}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="next"
          />

          {errors.password ? (
            <Text style={styles.errorText}>
              {errors.password}
            </Text>
          ) : null}

          {/* CONFIRM PASSWORD */}
          <TextInput
            style={[
              styles.input,
              errors.confirmPassword &&
                styles.inputError,
            ]}
            placeholder="Confirm Password"
            placeholderTextColor="#9CA3AF"
            value={confirmPassword}
            onChangeText={value => {
              setConfirmPassword(value);

              setErrors(prev => ({
                ...prev,
                confirmPassword: '',
              }));
            }}
            onBlur={() => {
              setErrors(prev => ({
                ...prev,
                confirmPassword:
                  validateConfirmPassword(
                    confirmPassword,
                  ),
              }));
            }}
            secureTextEntry={true}
            autoCapitalize="none"
            autoCorrect={false}
            returnKeyType="done"
            onSubmitEditing={handleSignup}
          />

          {errors.confirmPassword ? (
            <Text style={styles.errorText}>
              {errors.confirmPassword}
            </Text>
          ) : null}

          {/* SIGN UP BUTTON */}
          <TouchableOpacity
            style={[
              styles.button,
              loading &&
                styles.buttonDisabled,
            ]}
            onPress={handleSignup}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {loading
                ? 'Creating Account...'
                : 'Sign Up'}
            </Text>
          </TouchableOpacity>

          {/* LOGIN */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Login')
            }
            activeOpacity={0.7}
          >
            <Text style={styles.loginText}>
              Already have an account? Login
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
   </>
  );
};

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },

container: {
  flexGrow: 1,
  paddingVertical: 20,
  paddingHorizontal: 24,
  width: '100%',
  maxWidth: 520,
  alignSelf: 'center',
},

header: {
  alignItems: 'center',
  marginBottom: 20,
},

logo: {
  width: 180,
  height: 180,
  marginBottom: 8,
},

title: {
  fontSize: 26,
  marginBottom: 8,
  fontFamily: 'Poppins-SemiBold',
  marginTop: 0,
  color: '#1F2937',
},

subtitle: {
  fontSize: 14,
  color: '#666',
  marginBottom: 20,
  fontFamily: 'Poppins-Regular',
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
  backgroundColor: '#fff',
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

modalButton: {
  width: '100%',
  height: 50,
  borderRadius: 14,
  backgroundColor: colors.primary,
  alignItems: 'center',
  justifyContent: 'center',
},

modalButtonText: {
  color: '#fff',
  fontSize: 16,
  fontFamily: 'Poppins-SemiBold',
},


  input: {
    height: 54,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 16,
    backgroundColor: '#fff',
    color: '#1F2937',
    fontFamily: 'Poppins-Regular',
  },

  inputError: {
    borderColor: '#EF4444',
  },

  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: -10,
    marginBottom: 10,
    marginLeft: 4,
    fontFamily: 'Poppins-Regular',
  },

  button: {
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 8,
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },

  loginText: {
    textAlign: 'center',
    marginTop: 22,
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Signup;