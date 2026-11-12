import React, {useState} from 'react';

import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  useWindowDimensions,
} from 'react-native';

import {colors} from '../../theme/colors';
import {loginUser} from '../../services/firebaseAuth';

const Login = ({navigation}: any) => {
   const {width, height} = useWindowDimensions();

  const isSmallScreen = width < 360;
  const isShortScreen = height < 700;
  const isLargeScreen = width >= 430;

  const logoSize = isSmallScreen ? 170 : isLargeScreen ? 230 : 200;

  const horizontalPadding = isSmallScreen ? 18 : 24;
  const titleSize = isSmallScreen ? 23 : 26;


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

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

  const validatePassword = (value: string) => {
    if (!value) {
      return 'Password is required';
    }

    if (value.length < 6) {
      return 'Password must be at least 6 characters';
    }

    return '';
  };

  const validateAllFields = () => {
    const newErrors = {
      email: validateEmail(email),
      password: validatePassword(password),
    };

    setErrors(newErrors);

    return !Object.values(newErrors).some(
      error => error !== '',
    );
  };

  const handleLogin = async () => {
    console.log('========== LOGIN START ==========');

    const isValid = validateAllFields();

    if (!isValid) {
      return;
    }

    try {
      setLoading(true);

      console.log('LOGIN: calling Firebase Auth');

      await loginUser(
        email.trim(),
        password,
      );

      console.log('LOGIN: Firebase Auth SUCCESS');

      navigation.replace('MainTabs');
    } catch (error: any) {
      console.log('========== LOGIN ERROR ==========');
      console.log('CODE:', error?.code);
      console.log('MESSAGE:', error?.message);
      console.log('FULL ERROR:', error);

      if (
        error?.code ===
          'auth/invalid-credential' ||
        error?.code ===
          'auth/wrong-password'
      ) {
        setErrors(prev => ({
          ...prev,
          password: 'Invalid email or password',
        }));
      } else if (
        error?.code === 'auth/user-not-found'
      ) {
        setErrors(prev => ({
          ...prev,
          email: 'No account found with this email',
        }));
      } else if (
        error?.code === 'auth/invalid-email'
      ) {
        setErrors(prev => ({
          ...prev,
          email: 'Please enter a valid email address',
        }));
      } else if (
        error?.code === 'auth/user-disabled'
      ) {
        setErrors(prev => ({
          ...prev,
          email: 'This account has been disabled',
        }));
      } else {
        Alert.alert(
          'Login Failed',
          error?.message ||
            'Something went wrong.',
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoidingView}
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
        keyboardDismissMode={
          Platform.OS === 'ios'
            ? 'interactive'
            : 'on-drag'
        }
      >
       <View
  style={[
    styles.container,
    {
      paddingHorizontal: horizontalPadding,
      justifyContent: isShortScreen ? 'flex-start' : 'center',
      paddingTop: isShortScreen ? 20 : 24,
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
    Welcome back!
  </Text>

  <Text style={styles.subtitle}>
    Login to continue shopping
  </Text>
</View>

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

          {/* PASSWORD */}
          <View
            style={[
              styles.passwordContainer,
              errors.password &&
                styles.passwordContainerError,
            ]}
          >
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              placeholderTextColor="#9CA3AF"
              value={password}
              onChangeText={value => {
                setPassword(value);

                setErrors(prev => ({
                  ...prev,
                  password: '',
                }));
              }}
              onBlur={() => {
                setErrors(prev => ({
                  ...prev,
                  password:
                    validatePassword(password),
                }));
              }}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              returnKeyType="done"
              onSubmitEditing={handleLogin}
            />

            <TouchableOpacity
              style={styles.showButton}
              onPress={() =>
                setShowPassword(
                  prev => !prev,
                )
              }
              activeOpacity={0.7}
            >
              <Text style={styles.showText}>
                {showPassword ? 'Hide' : 'Show'}
              </Text>
            </TouchableOpacity>
          </View>

          {errors.password ? (
            <Text style={styles.errorText}>
              {errors.password}
            </Text>
          ) : null}

          {/* LOGIN BUTTON */}
          <TouchableOpacity
            style={[
              styles.button,
              loading &&
                styles.buttonDisabled,
            ]}
            onPress={handleLogin}
            disabled={loading}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>
              {loading
                ? 'Logging in...'
                : 'Login'}
            </Text>
          </TouchableOpacity>

          {/* SIGN UP */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Signup')
            }
            activeOpacity={0.7}
          >
            <Text style={styles.signupText}>
              Don't have an account? Sign Up
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
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
  justifyContent: 'center',
  paddingVertical: 24,
  paddingHorizontal: 24,
  width: '100%',
  maxWidth: 520,
  alignSelf: 'center',
},

header: {
  alignItems: 'center',
  marginBottom: 24,
},

logo: {
  width: 200,
  height: 200,
  marginBottom: 8,
},

title: {
  fontSize: 26,
  color: '#1F2937',
  fontFamily: 'Poppins-Bold',
  marginTop: 0,
},

subtitle: {
  fontSize: 14,
  color: '#6B7280',
  marginTop: 4,
  fontFamily: 'Poppins-Regular',
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

  passwordContainer: {
    height: 54,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#fff',
  },

  passwordContainerError: {
    borderColor: '#EF4444',
  },

  passwordInput: {
    flex: 1,
    height: 54,
    paddingHorizontal: 16,
    color: '#1F2937',
    fontFamily: 'Poppins-Regular',
  },

  showButton: {
    height: 54,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  showText: {
    color: colors.primary,
    fontSize: 14,
    fontFamily: 'Poppins-SemiBold',
  },

  button: {
    height: 54,
    borderRadius: 14,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonDisabled: {
    opacity: 0.6,
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },

  signupText: {
    textAlign: 'center',
    marginTop: 22,
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },
});

export default Login;