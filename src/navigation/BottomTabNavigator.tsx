
import React from 'react';

import {
  View,
  Pressable,
  useWindowDimensions,
} from 'react-native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Svg, {
  Defs,
  LinearGradient as SvgLinearGradient,
  Stop,
  Rect,
} from 'react-native-svg';

import {
  Home as HomeIcon,
  ShoppingBag,
  Heart,
  ShoppingCart,
  User,
} from 'lucide-react-native';

import {useCartStore} from '../store/cartStore';

import Home from '../screens/Home/Home';
import Shop from '../screens/Shop/Shop';
import Wishlist from '../screens/Wishlist/Wishlist';
import Cart from '../screens/Cart/Cart';
import Profile from '../screens/Profile/Profile';

import {MainTabParamList} from './navigationTypes';

const Tab = createBottomTabNavigator<MainTabParamList>();

const BottomTabNavigator = () => {
  const {width, height} = useWindowDimensions();

  const isSmallScreen = width < 360;
  const isShortScreen = height < 700;
  const isLargeScreen = width >= 430;

  const iconSize = isSmallScreen ? 18 : isLargeScreen ? 23 : 20;

  const labelSize = isSmallScreen ? 9 : 11;

 const tabHeight = isShortScreen ? 68 : 75;

  const cartCount = useCartStore(state =>
    state.items.reduce(
      (total, item) => total + item.quantity,
      0,
    ),
  );

  const TabFadeBackground = React.useCallback(
    () => (
      <View style={styles.backgroundContainer}>
        <View style={styles.fadeContainer}>
          <Svg
            width={width + 20}
            height="100%"
            style={styles.svgElement}>
            <Defs>
              <SvgLinearGradient
                id="tabFade"
                x1="0"
                y1="0"
                x2="0"
                y2="1">
                <Stop
                  offset="0%"
                  stopColor="#172554"
                  stopOpacity="0"
                />

                <Stop
                  offset="40%"
                  stopColor="#172554"
                  stopOpacity="0.3"
                />

                <Stop
                  offset="100%"
                  stopColor="#172554"
                  stopOpacity="1"
                />
              </SvgLinearGradient>
            </Defs>

            <Rect
              x="0"
              y="0"
              width={width + 20}
              height="100%"
              fill="url(#tabFade)"
            />
          </Svg>
        </View>

        <View style={styles.solidBottom} />
      </View>
    ),
    [width],
  );

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,

        sceneStyle: {
          backgroundColor: 'transparent',
        },

        tabBarActiveTintColor: '#FFFFFF',
        tabBarInactiveTintColor: '#9CA3AF',

        tabBarBackground: TabFadeBackground,

        tabBarButton: props => (
          <Pressable
            {...props}
            android_ripple={{
              color: 'rgba(255,255,255,0.15)',
              borderless: true,
              radius: 24,
            }}
          />
        ),

        tabBarStyle: {
          height: tabHeight,
          paddingTop: 15,
          paddingBottom: 5,

          backgroundColor: 'transparent',
          borderTopWidth: 0,

          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,

          elevation: 0,
          shadowOpacity: 0,
          shadowOffset: {
            width: 0,
            height: 0,
          },
        },

        tabBarLabelStyle: {
          fontSize: labelSize,
          fontFamily: 'poppins-Regular',
          fontWeight: '600',
          marginTop: 2,
        },

        tabBarItemStyle: {
          paddingVertical: 0,
        },
      }}>

      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({color}) => (
            <HomeIcon color={color} size={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="Shop"
        component={Shop}
        options={{
          tabBarIcon: ({color}) => (
            <ShoppingBag color={color} size={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="Wishlist"
        component={Wishlist}
        options={{
          tabBarIcon: ({color}) => (
            <Heart color={color} size={iconSize} />
          ),
        }}
      />

      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{
          tabBarIcon: ({color}) => (
            <ShoppingCart color={color} size={iconSize} />
          ),

          tabBarBadge:
            cartCount > 0 ? cartCount : undefined,

          tabBarBadgeStyle: {
            backgroundColor: '#EF4444',
            color: '#FFFFFF',
            fontSize: 10,
            fontWeight: '700',
          },
        }}
      />

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({color}) => (
            <User color={color} size={iconSize} />
          ),

          tabBarStyle: {
            display: 'none',
          },

          tabBarBackground: () => null,
        }}
      />

    </Tab.Navigator>
  );
};

const styles = {
  backgroundContainer: {
    position: 'absolute' as const,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    overflow: 'visible' as const,
  },

  fadeContainer: {
    height: 18,
    left: -10,
    right: -10,
    overflow: 'visible' as const,
  },

  svgElement: {
    overflow: 'visible' as const,
  },

  solidBottom: {
    flex: 1,
    backgroundColor: '#111827',
    marginTop: -0.5,
  },
};

export default BottomTabNavigator;
