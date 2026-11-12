
import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {RootStackParamList} from './navigationTypes';
import DrawerNavigator from './DrawerNavigator';

import Splash from '../screens/Splash/Splash';
import Login from '../screens/authScreen/Login';
import Signup from '../screens/authScreen/Signup';

import SearchScreen from '../components/SearchScreen';
import Settings from '../screens/Settings/Settings';

import ProductDetails from '../screens/ProductDetails/ProductDetails';
import CategoryScreen from '../screens/Category/CategoryScreen';
import ProductListingScreen from '../screens/Products/ProductListingScreen';

import Checkout from '../screens/Checkout/Checkout';
import Address from '../screens/Profile/Address';
import Payment from '../screens/Payment/Payment';

import OrderSuccess from '../screens/Orders/OrderSuccess';
import InfoScreen from '../screens/Info/InfoScreen';

import EditProfile from '../screens/Profile/EditProfile';
import PaymentMethods from '../screens/Profile/PaymentMethods';
import Notifications from '../screens/Profile/Notifications';
import ChangePassword from '../screens/Profile/ChangePassword';

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Splash"
      screenOptions={{
        headerShown: false,

        contentStyle: {
          backgroundColor: 'transparent',
        },
      }}>

      <Stack.Screen
        name="Splash"
        component={Splash}
      />

      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          animation: 'none',
        }}
      />

      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          animation: 'none',
        }}
      />

      <Stack.Screen
        name="MainTabs"
        component={DrawerNavigator}
      />

      <Stack.Screen
        name="Search"
        component={SearchScreen}
      />

      <Stack.Screen
        name="Category"
        component={CategoryScreen}
      />

      <Stack.Screen
        name="ProductListing"
        component={ProductListingScreen}
      />

      <Stack.Screen
        name="ProductDetails"
        component={ProductDetails}
      />

      <Stack.Screen
        name="Checkout"
        component={Checkout}
      />

      <Stack.Screen
        name="Address"
        component={Address}
      />

      <Stack.Screen
        name="Payment"
        component={Payment}
      />

      <Stack.Screen
        name="OrderSuccess"
        component={OrderSuccess}
      />

      <Stack.Screen
        name="Info"
        component={InfoScreen}
      />

      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
      />

      <Stack.Screen
        name="PaymentMethods"
        component={PaymentMethods}
      />

      <Stack.Screen
        name="Notifications"
        component={Notifications}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword}
      />

      <Stack.Screen
        name="Settings"
        component={Settings}
      />

    </Stack.Navigator>
  );
};

export default AppNavigator;
