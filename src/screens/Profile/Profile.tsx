import React, {useCallback, useState} from 'react';
import {useFocusEffect} from '@react-navigation/native';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Image,
} from 'react-native';

import {
  ChevronRight,
  ChevronLeft,
  MapPin,
  Package,
  Heart,
  CreditCard,
  Bell,
  Lock,
  Pencil,
} from 'lucide-react-native';

import {SafeAreaView} from 'react-native-safe-area-context';
import {colors} from '../../theme/colors';
import BackgroundGradient from '../../components/BackgroundGradient';
import {getAuth} from '@react-native-firebase/auth';
import {getUserProfile} from '../../services/firebaseDatabase';

type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
};

const MenuItem = ({
  icon,
  title,
  subtitle,
  onPress,
}: MenuItemProps) => {
  return (
    <TouchableOpacity
      activeOpacity={0.75}
      style={styles.menuItem}
      onPress={onPress}>
      <View style={styles.menuInner}>
        <View style={styles.iconBox}>
          {icon}
        </View>

        <View style={styles.menuContent}>
          <Text style={styles.menuTitle}>
            {title}
          </Text>

          <Text style={styles.menuSubtitle}>
            {subtitle}
          </Text>
        </View>

        <ChevronRight
          size={20}
          color="#FFFFFF"
          strokeWidth={2.3}
        />
      </View>
    </TouchableOpacity>
  );
};

const Profile = ({navigation}: any) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useFocusEffect(
    useCallback(() => {
      let isMounted = true;

      const loadProfile = async () => {
        try {
          const auth = getAuth();
          const user = auth.currentUser;

          if (!user) {
            return;
          }

          if (isMounted) {
            setUserEmail(user.email || '');
          }

          const profile = await getUserProfile(user.uid);

          if (isMounted && profile) {
            setUserName(profile.name || '');
          }
        } catch (error) {
          console.log(
            'PROFILE LOAD ERROR:',
            error,
          );
        }
      };

      loadProfile();

      return () => {
        isMounted = false;
      };
    }, []),
  );

  return (
    <SafeAreaView
      style={styles.container}
      edges={['top', 'left', 'right']}>

      <BackgroundGradient />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}>

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

          <View style={styles.headerText}>
            <Text style={styles.title}>
              Profile
            </Text>
          </View>
        </View>

        {/* User Profile */}
        <View style={styles.userProfile}>
          <View style={styles.avatarWrapper}>
            <Image
              source={require('../../assets/images/men.webp')}
              style={styles.avatarImage}
              resizeMode="cover"
            />
          </View>

          <Text style={styles.userName}>
            {userName || 'User'}
          </Text>

          <Text style={styles.userEmail}>
            {userEmail || 'No email'}
          </Text>
        </View>

        {/* Account */}
        <Text style={styles.sectionTitle}>
          Account
        </Text>

        <View style={styles.menu}>
          <MenuItem
            icon={
              <Pencil
                size={21}
                color="#FFFFFF"
                strokeWidth={2}
              />
            }
            title="Edit Profile"
            subtitle="Update your personal information"
            onPress={() =>
              navigation.navigate('EditProfile')
            }
          />

          <MenuItem
            icon={
              <MapPin
                size={21}
                color="#FFFFFF"
                strokeWidth={2}
              />
            }
            title="Addresses"
            subtitle="Manage your delivery addresses"
            onPress={() =>
              navigation.navigate('Address')
            }
          />

          <MenuItem
            icon={
              <CreditCard
                size={21}
                color="#FFFFFF"
                strokeWidth={2}
              />
            }
            title="Payment Methods"
            subtitle="Manage your payment options"
            onPress={() =>
              navigation.navigate('PaymentMethods')
            }
          />

          <MenuItem
            icon={
              <Package
                size={21}
                color="#FFFFFF"
                strokeWidth={2}
              />
            }
            title="My Orders"
            subtitle="View and track your orders"
            onPress={() =>
              navigation.navigate('Orders')
            }
          />

          <MenuItem
            icon={
              <Bell
                size={21}
                color="#FFFFFF"
                strokeWidth={2}
              />
            }
            title="Notifications"
            subtitle="Manage your notification preferences"
            onPress={() =>
              navigation.navigate('Notifications')
            }
          />

          <MenuItem
            icon={
              <Lock
                size={21}
                color="#FFFFFF"
                strokeWidth={2}
              />
            }
            title="Change Password"
            subtitle="Update your account password"
            onPress={() =>
              navigation.navigate('ChangePassword')
            }
          />
        </View>

        {/* Saved */}
        <Text style={styles.sectionTitle}>
          Saved
        </Text>

        <View style={styles.menu}>
          <MenuItem
            icon={
              <Heart
                size={21}
                color="#FFFFFF"
                strokeWidth={2}
              />
            }
            title="Wishlist"
            subtitle="Your saved products"
            onPress={() =>
              navigation.navigate('MainTabs', {
                screen: 'Wishlist',
              })
            }
          />
        </View>

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },

  content: {
    paddingBottom: 30,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 12,
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

  headerText: {
    flex: 1,
  },

  title: {
    fontSize: 20,
    color: colors.primary,
    fontFamily: 'Poppins-SemiBold',
  },

  userProfile: {
    alignItems: 'center',
    paddingTop: 4,
    paddingBottom: 18,
  },

  avatarWrapper: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,0.9)',
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.12,
    shadowRadius: 5,
  },

  avatarImage: {
    width: '100%',
    height: '100%',
  },

  userName: {
    marginTop: 8,
    fontSize: 18,
    color: '#111827',
    fontFamily: 'Poppins-Bold',
  },

  userEmail: {
    marginTop: -2,
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Regular',
  },

  sectionTitle: {
    marginHorizontal: 16,
    marginTop: 2,
    marginBottom: 8,
    fontSize: 14,
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },

  menu: {
    marginHorizontal: 16,
    marginTop: 0,
  },

  menuItem: {
    width: '100%',
    minHeight: 50,
    overflow: 'hidden',
    marginBottom: 10,
    borderRadius: 14,
    position: 'relative',
    backgroundColor: colors.primary,
  },

  menuInner: {
    width: '100%',
    minHeight: 76,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 2,
  },

  iconBox: {
    width: 35,
    height: 35,
    borderRadius: 8,
    backgroundColor: 'rgba(255,255,255,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },

  menuContent: {
    flex: 1,
    marginLeft: 12,
    zIndex: 2,
  },

  menuTitle: {
    fontSize: 14,
    color: '#FFFFFF',
    fontFamily: 'Poppins-Medium',
  },

  menuSubtitle: {
    marginTop: -3,
    fontSize: 11,
    color: 'rgba(255,255,255,0.70)',
    fontFamily: 'Poppins-Regular',
  },

  bottomSpace: {
    height: 50,
  },
});

export default Profile;