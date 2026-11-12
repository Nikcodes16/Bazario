
import {NavigatorScreenParams} from '@react-navigation/native';

export type MainTabParamList = {
  Home: undefined;
  Shop: undefined;
  Wishlist: undefined;
  Cart: undefined;
  Profile: undefined;
};

export type DrawerParamList = {
  MainTabs: NavigatorScreenParams<MainTabParamList>;
  Orders: undefined;
};

export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  Signup: undefined;
  MainTabs: undefined;
  Search: {allProducts: any[]};
  Settings: undefined;

  ProductDetails: {
    productId: number;
  };

  Category: {
    groupId: string;
  };

  ProductListing: {
    category: string;
    categoryName: string;
  };

  Checkout: undefined;
  Address: undefined;

  Payment: {
    addressData: {
      name: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    };
  };

  OrderSuccess: {
    addressData: {
      name: string;
      phone: string;
      address: string;
      city: string;
      state: string;
      pincode: string;
    };
    paymentMethod: string;
    total: number;
  };

  Orders: undefined;

  Info: {
    type: 'Privacy' | 'Terms' | 'Help' | 'About';
  };

  EditProfile: undefined;
  PaymentMethods: undefined;
  Notifications: undefined;
  ChangePassword: undefined;
};
