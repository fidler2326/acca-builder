import React from 'react';
import { Platform, Image } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Build Acca',
  tabBarOptions: {
    inactiveTintColor: '#fff',
    activeTintColor: '#029e70',
    style: {
      backgroundColor: '#1d1d1d',
    },
  },
  tabBarIcon: ({ focused, tintColor }) => (
    <Image style={{width: 24, height: 24}} source={ focused ? require('../assets/images/icon_home_active.png') : require('../assets/images/icon_home.png')} />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Fixtures',
  tabBarOptions: {
    inactiveTintColor: '#fff',
    activeTintColor: '#029e70',
    style: {
      backgroundColor: '#1d1d1d'
    },
  },
  tabBarIcon: ({ focused, tintColor }) => (
    <Image style={{width: 24, height: 24}} source={ focused ? require('../assets/images/icon_fixtures_active.png') : require('../assets/images/icon_fixtures.png')} />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: 'Settings',
  tabBarOptions: {
    inactiveTintColor: '#fff',
    activeTintColor: '#029e70',
    style: {
      backgroundColor: '#1d1d1d'
    },
  },
  tabBarIcon: ({ focused, tintColor }) => (
    <Image style={{width: 24, height: 24}} source={ focused ? require('../assets/images/icon_settings_active.png') : require('../assets/images/icon_settings.png')} />
  ),
};

export default createBottomTabNavigator({
  HomeStack,
  LinksStack,
  SettingsStack,
});
