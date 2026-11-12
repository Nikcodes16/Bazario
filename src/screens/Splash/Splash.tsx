
import React, {useEffect} from 'react';

import {
  Image,
  StyleSheet,
  View,
} from 'react-native';

import {
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

import {getAuth} from '@react-native-firebase/auth';

import {RootStackParamList} from '../../navigation/navigationTypes';;

type Props = NativeStackScreenProps<
  RootStackParamList,
  'Splash'
>;

const Splash = ({navigation}: Props) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      const auth = getAuth();
      const user = auth.currentUser;

      if (user) {
        // User already logged in
        navigation.replace('MainTabs');
      } else {
        // User is not logged in
        navigation.replace('Login');
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },

  logo: {
    width: '100%',
    height: '100%',
  },
});

export default Splash;

