import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ArrowLeft} from 'lucide-react-native';
import {colors} from '../../theme/colors';

const content: any = {
  Privacy: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: 'Your Privacy',
        text: 'We respect your privacy and are committed to protecting your personal information.',
      },
      {
        heading: 'Information We Collect',
        text: 'We may collect information such as your name, phone number, delivery address and order details to provide our services.',
      },
      {
        heading: 'How We Use Your Information',
        text: 'Your information is used to process orders, provide delivery services, improve your shopping experience and communicate important updates.',
      },
      {
        heading: 'Payment Security',
        text: 'Payment information is handled securely through trusted payment providers. We do not store sensitive payment information unnecessarily.',
      },
      {
        heading: 'Your Choices',
        text: 'You can contact us regarding your personal information or privacy-related questions at any time.',
      },
    ],
  },

  Terms: {
    title: 'Terms & Conditions',
    sections: [
      {
        heading: 'Acceptance of Terms',
        text: 'By using this application, you agree to follow these Terms & Conditions.',
      },
      {
        heading: 'Products & Prices',
        text: 'Product prices, descriptions, availability and offers may change without prior notice.',
      },
      {
        heading: 'Orders',
        text: 'Orders are subject to product availability and confirmation. We reserve the right to cancel or modify an order when necessary.',
      },
      {
        heading: 'Delivery Information',
        text: 'Users are responsible for providing accurate and complete delivery information.',
      },
      {
        heading: 'Account Usage',
        text: 'Users are responsible for maintaining appropriate use of the application. Any misuse may result in restricted access.',
      },
    ],
  },

  Help: {
    title: 'Help & Support',
    sections: [
      {
        heading: 'How Can We Help?',
        text: 'Our support team is here to help you with your shopping experience.',
      },
      {
        heading: 'Order & Delivery',
        text: 'Get help with order status, delivery updates and other order-related questions.',
      },
      {
        heading: 'Returns & Refunds',
        text: 'Contact support for assistance with returns, refunds and product-related issues.',
      },
      {
        heading: 'Payment Issues',
        text: 'If you experience any payment-related problem, please contact our support team with your order details.',
      },
      {
        heading: 'Support Hours',
        text: 'Monday - Saturday\n10:00 AM - 6:00 PM',
      },
      {
        heading: 'Contact',
        text: 'Email: support@example.com',
      },
    ],
  },

  About: {
    title: 'About Us',
    sections: [
      {
        heading: 'Welcome',
        text: 'Welcome to Bazario!',
      },
      {
        heading: 'Our Mission',
        text: 'Our goal is to provide a simple, modern and convenient shopping experience where you can discover products and shop with ease.',
      },
      {
        heading: 'What You Can Do',
        text: 'Browse products, manage your wishlist, add items to your cart, place orders and keep track of your purchases.',
      },
      {
        heading: 'Our Vision',
        text: 'We aim to make online shopping simple, fast and enjoyable for everyone.',
      },
      {
        heading: 'App Version',
        text: 'Version 1.0.0',
      },
    ],
  },
};

const InfoScreen = ({navigation, route}: any) => {
  const type = route?.params?.type || 'Privacy';
  const page = content[type];

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={() => navigation.goBack()}>
          <ArrowLeft size={21} color="#111827" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>{page.title}</Text>

        <View style={styles.headerSpacer} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>
        <View style={styles.card}>
          {page.sections.map((section: any, index: number) => (
            <View
              key={section.heading}
              style={[
                styles.section,
                index === page.sections.length - 1 &&
                  styles.lastSection,
              ]}>
              <Text style={styles.sectionHeading}>
                {section.heading}
              </Text>

              <Text style={styles.sectionText}>
                {section.text}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>
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
    flex: 1,
    marginLeft: 12,
    fontSize: 18,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
  },

  headerSpacer: {
    width: 40,
  },

  content: {
    padding: 16,
    paddingBottom: 30,
  },

  card: {
    padding: 18,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },

  section: {
    paddingBottom: 20,
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  lastSection: {
    marginBottom: 0,
    paddingBottom: 0,
    borderBottomWidth: 0,
  },

  sectionHeading: {
    fontSize: 15,
    fontFamily: 'Poppins-SemiBold',
    color: '#111827',
    marginBottom: 7,
  },

  sectionText: {
    fontSize: 13,
    lineHeight: 21,
    fontFamily: 'Poppins-Regular',
    color: '#6B7280',
  },
});

export default InfoScreen;