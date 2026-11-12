
import React, {useState} from 'react';
import {colors} from '../../theme/colors';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import {ChevronLeft, MapPin} from 'lucide-react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {useAddressStore} from '../../store/addressStore';

const Address = ({navigation}: any) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');

  const [errors, setErrors] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
  });

  const saveAddress = useAddressStore(
    state => state.saveAddress,
  );

  const clearError = (field: keyof typeof errors) => {
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: '',
      }));
    }
  };

  const handleContinue = () => {
    const newErrors = {
      name: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
    };

   
    // Name validation
if (!name.trim()) {
  newErrors.name = 'Please enter your full name.';
} else if (name.trim().length < 3) {
  newErrors.name = 'Name must be at least 3 characters.';
} else if (!/^[A-Za-z]+(?:\s+[A-Za-z]+)+$/.test(name.trim())) {
  newErrors.name =
    'Please enter a valid full name.';
}
    // Phone validation
    if (!phone.trim()) {
      newErrors.phone = 'Please enter your mobile number.';
    } else if (!/^[6-9]\d{9}$/.test(phone)) {
      newErrors.phone =
        'Please enter a valid 10-digit mobile number.';
    }

    // Address validation
    if (!address.trim()) {
      newErrors.address = 'Please enter your address.';
    } else if (address.trim().length < 10) {
      newErrors.address =
        'Please enter a complete address.';
    }

    // City validation
    if (!city.trim()) {
      newErrors.city = 'Please enter your city.';
    } else if (city.trim().length < 2) {
      newErrors.city = 'Please enter a valid city.';
    }

    // State validation
    if (!state.trim()) {
      newErrors.state = 'Please enter your state.';
    } else if (state.trim().length < 2) {
      newErrors.state = 'Please enter a valid state.';
    }

    // Pincode validation
    if (!pincode.trim()) {
      newErrors.pincode = 'Please enter your pincode.';
    } else if (!/^\d{6}$/.test(pincode)) {
      newErrors.pincode =
        'Please enter a valid 6-digit pincode.';
    }

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some(
      error => error !== '',
    );

    if (hasErrors) {
      return;
    }

    const savedAddress = {
      name: name.trim(),
      phone: phone.trim(),
      address: address.trim(),
      city: city.trim(),
      state: state.trim(),
      pincode: pincode.trim(),
    };

    saveAddress(savedAddress);

    navigation.navigate('Payment');
  };

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top']}>

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
          Delivery Address
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
              <MapPin
                size={22}
                color="#111827"
              />
            </View>

            <View>
              <Text style={styles.title}>
                Where should we deliver?
              </Text>

              <Text style={styles.subtitle}>
                Enter your delivery details
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
                  errors.name && styles.inputError,
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
                    text.replace(/[^0-9]/g, ''),
                  );
                  clearError('phone');
                }}
                placeholder="Enter mobile number"
                placeholderTextColor="#9CA3AF"
                keyboardType="phone-pad"
                maxLength={10}
                style={[
                  styles.input,
                  errors.phone && styles.inputError,
                ]}
              />

              {errors.phone ? (
                <Text style={styles.fieldError}>
                  {errors.phone}
                </Text>
              ) : null}
            </View>

            {/* Address */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Address
              </Text>

              <TextInput
                value={address}
                onChangeText={text => {
                  setAddress(text);
                  clearError('address');
                }}
                placeholder="House no, street, area"
                placeholderTextColor="#9CA3AF"
                multiline
                numberOfLines={3}
                textAlignVertical="top"
                style={[
                  styles.input,
                  styles.addressInput,
                  errors.address && styles.inputError,
                ]}
              />

              {errors.address ? (
                <Text style={styles.fieldError}>
                  {errors.address}
                </Text>
              ) : null}
            </View>

            {/* City */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                City
              </Text>

              <TextInput
                value={city}
                onChangeText={text => {
                  setCity(text);
                  clearError('city');
                }}
                placeholder="Enter city"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                style={[
                  styles.input,
                  errors.city && styles.inputError,
                ]}
              />

              {errors.city ? (
                <Text style={styles.fieldError}>
                  {errors.city}
                </Text>
              ) : null}
            </View>

            {/* State */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                State
              </Text>

              <TextInput
                value={state}
                onChangeText={text => {
                  setState(text);
                  clearError('state');
                }}
                placeholder="Enter state"
                placeholderTextColor="#9CA3AF"
                autoCapitalize="words"
                style={[
                  styles.input,
                  errors.state && styles.inputError,
                ]}
              />

              {errors.state ? (
                <Text style={styles.fieldError}>
                  {errors.state}
                </Text>
              ) : null}
            </View>

            {/* Pincode */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>
                Pincode
              </Text>

              <TextInput
                value={pincode}
                onChangeText={text => {
                  setPincode(
                    text.replace(/[^0-9]/g, ''),
                  );
                  clearError('pincode');
                }}
                placeholder="Enter 6-digit pincode"
                placeholderTextColor="#9CA3AF"
                keyboardType="number-pad"
                maxLength={6}
                style={[
                  styles.input,
                  errors.pincode &&
                    styles.inputError,
                ]}
              />

              {errors.pincode ? (
                <Text style={styles.fieldError}>
                  {errors.pincode}
                </Text>
              ) : null}
            </View>
          </View>
        </ScrollView>

        {/* Bottom Button */}
        <View style={styles.bottomBar}>
          <TouchableOpacity
            style={styles.continueButton}
            activeOpacity={0.8}
            onPress={handleContinue}>

            <Text style={styles.continueText}>
              Save & Continue
            </Text>

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
    backgroundColor: '#F9FAFB',
  },

  header: {
    height: 60,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    fontFamily: 'Poppins-Medium',
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

  addressInput: {
    height: 90,
    paddingTop: 14,
  },

  bottomBar: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },

  continueButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 5,
  },

  continueText: {
    fontSize: 16,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },
});

export default Address;

