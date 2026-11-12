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
} from 'react-native';

import {
  ChevronLeft,
  ChevronRight,
  CreditCard,
  Plus,
  Trash2,
  Smartphone,
} from 'lucide-react-native';

import {SafeAreaView} from 'react-native-safe-area-context';

import {colors} from '../../theme/colors';
import BackgroundGradient from '../../components/BackgroundGradient';

type PaymentMethod = {
  id: string;
  type: 'UPI' | 'Card';
  value: string;
  last4?: string;
  isDefault: boolean;
};

const PaymentMethods = ({navigation}: any) => {
  const [methods, setMethods] = useState<
    PaymentMethod[]
  >([]);

  const [showAddForm, setShowAddForm] =
    useState(false);

  const [paymentType, setPaymentType] = useState<
    'UPI' | 'Card'
  >('UPI');

  const [upiId, setUpiId] = useState('');

  const [cardNumber, setCardNumber] =
    useState('');

  const [cardName, setCardName] =
    useState('');

  const [expiry, setExpiry] =
    useState('');

  const [errors, setErrors] = useState({
    upi: '',
    cardNumber: '',
    cardName: '',
    expiry: '',
  });

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

  const resetForm = () => {
    setUpiId('');
    setCardNumber('');
    setCardName('');
    setExpiry('');

    setErrors({
      upi: '',
      cardNumber: '',
      cardName: '',
      expiry: '',
    });
  };

  const handleAddPayment = () => {
    const newErrors = {
      upi: '',
      cardNumber: '',
      cardName: '',
      expiry: '',
    };

    if (paymentType === 'UPI') {
      if (!upiId.trim()) {
        newErrors.upi =
          'Please enter your UPI ID.';
      } else if (
        !/^[\w.-]+@[\w.-]+$/.test(
          upiId.trim(),
        )
      ) {
        newErrors.upi =
          'Please enter a valid UPI ID.';
      }
    }

    if (paymentType === 'Card') {
      const cleanCardNumber =
        cardNumber.replace(/\s/g, '');

      if (!cleanCardNumber) {
        newErrors.cardNumber =
          'Please enter your card number.';
      } else if (
        !/^\d{16}$/.test(
          cleanCardNumber,
        )
      ) {
        newErrors.cardNumber =
          'Please enter a valid 16-digit card number.';
      }

      if (!cardName.trim()) {
        newErrors.cardName =
          'Please enter the card holder name.';
      }

      if (!expiry.trim()) {
        newErrors.expiry =
          'Please enter expiry date.';
      } else if (
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(
          expiry.trim(),
        )
      ) {
        newErrors.expiry =
          'Use MM/YY format.';
      }
    }

    setErrors(newErrors);

    const hasErrors = Object.values(
      newErrors,
    ).some(error => error !== '');

    if (hasErrors) {
      return;
    }

    const newMethod: PaymentMethod =
      paymentType === 'UPI'
        ? {
            id: Date.now().toString(),
            type: 'UPI',
            value: upiId.trim(),
            isDefault:
              methods.length === 0,
          }
        : {
            id: Date.now().toString(),
            type: 'Card',
            value: `•••• ${cardNumber
              .replace(/\s/g, '')
              .slice(-4)}`,
            last4: cardNumber
              .replace(/\s/g, '')
              .slice(-4),
            isDefault:
              methods.length === 0,
          };

    setMethods(prev => [
      ...prev,
      newMethod,
    ]);

    resetForm();
    setShowAddForm(false);
  };

  const handleDelete = (
    id: string,
  ) => {
    Alert.alert(
      'Remove Payment Method',
      'Are you sure you want to remove this payment method?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Remove',
          style: 'destructive',
          onPress: () => {
            setMethods(prev =>
              prev
                .filter(
                  method =>
                    method.id !== id,
                )
                .map(
                  (method, index) => ({
                    ...method,
                    isDefault:
                      index === 0,
                  }),
                ),
            );
          },
        },
      ],
    );
  };

  const setDefault = (
    id: string,
  ) => {
    setMethods(prev =>
      prev.map(method => ({
        ...method,
        isDefault:
          method.id === id,
      })),
    );
  };

  const formatCardNumber = (
    text: string,
  ) => {
    const numbers = text.replace(
      /[^0-9]/g,
      '',
    );

    const groups =
      numbers.match(/.{1,4}/g);

    return groups
      ? groups.join(' ')
      : '';
  };

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
          onPress={() =>
            navigation.goBack()
          }>

          <ChevronLeft
            size={21}
            color="#FFFFFF"
            strokeWidth={2.5}
          />

        </TouchableOpacity>

        <Text style={styles.headerTitle}>
          Payment Methods
        </Text>

        <View style={styles.headerSpace} />

      </View>

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={
          Platform.OS === 'ios'
            ? 'padding'
            : 'height'
        }>

        <ScrollView
          showsVerticalScrollIndicator={
            false
          }
          contentContainerStyle={
            styles.content
          }
          keyboardShouldPersistTaps="handled">

          {/* Title */}
          <View style={styles.titleRow}>

            <View
              style={styles.iconContainer}>
              <CreditCard
                size={22}
                color="#111827"
              />
            </View>

            <View>
              <Text style={styles.title}>
                Your Payment Methods
              </Text>

              <Text
                style={styles.subtitle}>
                Manage your saved payment options
              </Text>
            </View>

          </View>

          {/* Existing Methods */}
          {methods.length > 0 ? (
            <View style={styles.methodsCard}>

              {methods.map(method => (
                <View
                  key={method.id}
                  style={
                    styles.paymentItem
                  }>

                  <View
                    style={
                      styles.paymentIcon
                    }>

                    {method.type ===
                    'UPI' ? (
                      <Smartphone
                        size={21}
                        color={
                          colors.primary
                        }
                      />
                    ) : (
                      <CreditCard
                        size={21}
                        color={
                          colors.primary
                        }
                      />
                    )}

                  </View>

                  <View
                    style={
                      styles.paymentInfo
                    }>

                    <Text
                      style={
                        styles.paymentType
                      }>
                      {method.type}
                    </Text>

                    <Text
                      style={
                        styles.paymentValue
                      }>
                      {method.value}
                    </Text>

                    {method.isDefault ? (
                      <Text
                        style={
                          styles.defaultText
                        }>
                        Default
                      </Text>
                    ) : null}

                  </View>

                  <TouchableOpacity
                    style={
                      styles.moreButton
                    }
                    onPress={() => {
                      Alert.alert(
                        'Payment Method',
                        '',
                        [
                          {
                            text:
                              method.isDefault
                                ? 'Default'
                                : 'Set as Default',
                            onPress: () =>
                              !method.isDefault &&
                              setDefault(
                                method.id,
                              ),
                          },
                          {
                            text: 'Remove',
                            style:
                              'destructive',
                            onPress: () =>
                              handleDelete(
                                method.id,
                              ),
                          },
                          {
                            text: 'Cancel',
                            style:
                              'cancel',
                          },
                        ],
                      );
                    }}>

                    <ChevronRight
                      size={20}
                      color="#9CA3AF"
                    />

                  </TouchableOpacity>

                </View>
              ))}

            </View>
          ) : (
            <View
              style={styles.emptyCard}>

              <View
                style={styles.emptyIcon}>
                <CreditCard
                  size={28}
                  color={
                    colors.primary
                  }
                />
              </View>

              <Text
                style={
                  styles.emptyTitle
                }>
                No Payment Methods
              </Text>

              <Text
                style={
                  styles.emptySubtitle
                }>
                Add a UPI ID or card to make
                checkout faster.
              </Text>

            </View>
          )}

          {/* Add Payment Button */}
          {!showAddForm ? (
            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.addButton}
              onPress={() =>
                setShowAddForm(true)
              }>

              <Plus
                size={20}
                color="#FFFFFF"
                strokeWidth={2.5}
              />

              <Text
                style={
                  styles.addButtonText
                }>
                Add Payment Method
              </Text>

            </TouchableOpacity>
          ) : null}

          {/* Add Form */}
          {showAddForm ? (
            <View style={styles.form}>

              <Text
                style={styles.formTitle}>
                Add Payment Method
              </Text>

              {/* Type */}
              <Text
                style={styles.label}>
                Payment Type
              </Text>

              <View
                style={
                  styles.typeRow
                }>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.typeButton,
                    paymentType ===
                      'UPI' &&
                      styles.typeButtonActive,
                  ]}
                  onPress={() => {
                    setPaymentType(
                      'UPI',
                    );
                    setErrors({
                      upi: '',
                      cardNumber: '',
                      cardName: '',
                      expiry: '',
                    });
                  }}>

                  <Smartphone
                    size={18}
                    color={
                      paymentType ===
                      'UPI'
                        ? '#FFFFFF'
                        : '#374151'
                    }
                  />

                  <Text
                    style={[
                      styles.typeText,
                      paymentType ===
                        'UPI' &&
                        styles.typeTextActive,
                    ]}>
                    UPI
                  </Text>

                </TouchableOpacity>

                <TouchableOpacity
                  activeOpacity={0.8}
                  style={[
                    styles.typeButton,
                    paymentType ===
                      'Card' &&
                      styles.typeButtonActive,
                  ]}
                  onPress={() => {
                    setPaymentType(
                      'Card',
                    );
                    setErrors({
                      upi: '',
                      cardNumber: '',
                      cardName: '',
                      expiry: '',
                    });
                  }}>

                  <CreditCard
                    size={18}
                    color={
                      paymentType ===
                      'Card'
                        ? '#FFFFFF'
                        : '#374151'
                    }
                  />

                  <Text
                    style={[
                      styles.typeText,
                      paymentType ===
                        'Card' &&
                        styles.typeTextActive,
                    ]}>
                    Card
                  </Text>

                </TouchableOpacity>

              </View>

              {/* UPI */}
              {paymentType ===
              'UPI' ? (
                <View
                  style={
                    styles.inputGroup
                  }>

                  <Text
                    style={styles.label}>
                    UPI ID
                  </Text>

                  <TextInput
                    value={upiId}
                    onChangeText={text => {
                      setUpiId(text);
                      clearError(
                        'upi',
                      );
                    }}
                    placeholder="example@upi"
                    placeholderTextColor="#9CA3AF"
                    autoCapitalize="none"
                    keyboardType="email-address"
                    style={[
                      styles.input,
                      errors.upi &&
                        styles.inputError,
                    ]}
                  />

                  {errors.upi ? (
                    <Text
                      style={
                        styles.fieldError
                      }>
                      {errors.upi}
                    </Text>
                  ) : null}

                </View>
              ) : (
                <>
                  {/* Card Number */}
                  <View
                    style={
                      styles.inputGroup
                    }>

                    <Text
                      style={
                        styles.label
                      }>
                      Card Number
                    </Text>

                    <TextInput
                      value={
                        cardNumber
                      }
                      onChangeText={text => {
                        setCardNumber(
                          formatCardNumber(
                            text,
                          ),
                        );
                        clearError(
                          'cardNumber',
                        );
                      }}
                      placeholder="1234 5678 9012 3456"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="number-pad"
                      maxLength={19}
                      style={[
                        styles.input,
                        errors.cardNumber &&
                          styles.inputError,
                      ]}
                    />

                    {errors.cardNumber ? (
                      <Text
                        style={
                          styles.fieldError
                        }>
                        {
                          errors.cardNumber
                        }
                      </Text>
                    ) : null}

                  </View>

                  {/* Card Name */}
                  <View
                    style={
                      styles.inputGroup
                    }>

                    <Text
                      style={
                        styles.label
                      }>
                      Card Holder Name
                    </Text>

                    <TextInput
                      value={cardName}
                      onChangeText={text => {
                        setCardName(
                          text,
                        );
                        clearError(
                          'cardName',
                        );
                      }}
                      placeholder="Name on card"
                      placeholderTextColor="#9CA3AF"
                      autoCapitalize="words"
                      style={[
                        styles.input,
                        errors.cardName &&
                          styles.inputError,
                      ]}
                    />

                    {errors.cardName ? (
                      <Text
                        style={
                          styles.fieldError
                        }>
                        {
                          errors.cardName
                        }
                      </Text>
                    ) : null}

                  </View>

                  {/* Expiry */}
                  <View
                    style={
                      styles.inputGroup
                    }>

                    <Text
                      style={
                        styles.label
                      }>
                      Expiry Date
                    </Text>

                    <TextInput
                      value={expiry}
                      onChangeText={text => {
                        let value =
                          text.replace(
                            /[^0-9]/g,
                            '',
                          );

                        if (
                          value.length >
                          2
                        ) {
                          value =
                            value.slice(
                              0,
                              2,
                            ) +
                            '/' +
                            value.slice(
                              2,
                              4,
                            );
                        }

                        setExpiry(
                          value,
                        );
                        clearError(
                          'expiry',
                        );
                      }}
                      placeholder="MM/YY"
                      placeholderTextColor="#9CA3AF"
                      keyboardType="number-pad"
                      maxLength={5}
                      style={[
                        styles.input,
                        errors.expiry &&
                          styles.inputError,
                      ]}
                    />

                    {errors.expiry ? (
                      <Text
                        style={
                          styles.fieldError
                        }>
                        {errors.expiry}
                      </Text>
                    ) : null}

                  </View>
                </>
              )}

              {/* Save */}
              <TouchableOpacity
                activeOpacity={0.8}
                style={
                  styles.saveButton
                }
                onPress={
                  handleAddPayment
                }>

                <Text
                  style={
                    styles.saveButtonText
                  }>
                  Add Payment Method
                </Text>

              </TouchableOpacity>

              {/* Cancel */}
              <TouchableOpacity
                activeOpacity={0.7}
                style={
                  styles.cancelButton
                }
                onPress={() => {
                  resetForm();
                  setShowAddForm(
                    false,
                  );
                }}>

                <Text
                  style={
                    styles.cancelText
                  }>
                  Cancel
                </Text>

              </TouchableOpacity>

            </View>
          ) : null}

          {/* Security Info */}
          <View
            style={
              styles.securityCard
            }>

            <CreditCard
              size={18}
              color={colors.primary}
            />

            <Text
              style={
                styles.securityText
              }>
              Your sensitive payment details should
              be handled by a secure payment provider.
              We only display masked information here.
            </Text>

          </View>

        </ScrollView>
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
    paddingBottom: 40,
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

  methodsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
    marginBottom: 16,
  },

  paymentItem: {
    minHeight: 78,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F5',
  },

  paymentIcon: {
    width: 42,
    height: 42,
    borderRadius: 11,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  paymentInfo: {
    flex: 1,
    marginLeft: 13,
  },

  paymentType: {
    fontSize: 14,
    color: '#111827',
    fontFamily: 'Poppins-Medium',
  },

  paymentValue: {
    marginTop: 1,
    fontSize: 12,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },

  defaultText: {
    marginTop: 2,
    fontSize: 10,
    color: colors.primary,
    fontFamily: 'Poppins-Medium',
  },

  moreButton: {
    width: 35,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },

  emptyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    padding: 25,
    alignItems: 'center',
    marginBottom: 16,
  },

  emptyIcon: {
    width: 58,
    height: 58,
    borderRadius: 29,
    backgroundColor: '#EAF6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },

  emptyTitle: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Poppins-Medium',
  },

  emptySubtitle: {
    marginTop: 4,
    fontSize: 11,
    color: '#6B7280',
    textAlign: 'center',
    fontFamily: 'Poppins-Regular',
  },

  addButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },

  addButtonText: {
    marginLeft: 8,
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },

  form: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    marginBottom: 16,
  },

  formTitle: {
    fontSize: 17,
    color: '#111827',
    fontFamily: 'Poppins-Medium',
    marginBottom: 18,
  },

  typeRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 18,
  },

  typeButton: {
    flex: 1,
    height: 45,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 7,
  },

  typeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  typeText: {
    fontSize: 13,
    color: '#374151',
    fontFamily: 'Poppins-Medium',
  },

  typeTextActive: {
    color: '#FFFFFF',
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

  saveButton: {
    height: 50,
    borderRadius: 12,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 2,
  },

  saveButtonText: {
    fontSize: 15,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },

  cancelButton: {
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
  },

  cancelText: {
    fontSize: 14,
    color: '#6B7280',
    fontFamily: 'Poppins-Medium',
  },

  securityCard: {
    padding: 14,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  securityText: {
    flex: 1,
    marginLeft: 9,
    fontSize: 10.5,
    lineHeight: 16,
    color: '#6B7280',
    fontFamily: 'Poppins-Regular',
  },
});

export default PaymentMethods;