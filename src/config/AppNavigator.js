import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// importing different screens
import HomeScreen from '../screens/HomeScreen';
import CharactersScreen from '../screens/CharactersScreen';
import DetailScreen from '../screens/DetailScreen';
import SpellScreen from '../screens/SpellScreen';
import SettingsScreen from '../screens/SettingsScreen';
// importing icons
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// import context
import { ThemeContext } from '../contexts/ThemeContext';
import { colors } from '../styles/theme';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];

  const backgroundColor = { backgroundColor: activeColors.background };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: 'Home',
            headerStyle: backgroundColor,
            tabBarStyle: backgroundColor,
            tabBarLabel: 'Home',
            tabBarIcon: () => <AntDesign name='home' size={24} color='black' />,
          }}
        />
        <Tab.Screen
          name='Characters'
          component={CharacterNavigator}
          options={{
            title: 'Characters',
            headerStyle: backgroundColor,
            tabBarStyle: backgroundColor,
            tabBarLabel: 'Characters',
            tabBarIcon: () => (
              <AntDesign name='addusergroup' size={24} color='black' />
            ),
          }}
        />
        <Tab.Screen
          name='Spells'
          component={SpellScreen}
          options={{
            title: 'Spells',
            headerStyle: backgroundColor,
            tabBarStyle: backgroundColor,
            tabBarLabel: 'Spells',
            tabBarIcon: () => (
              <FontAwesome6 name='wand-sparkles' size={24} color='black' />
            ),
          }}
        />
        <Tab.Screen
          name='Settings'
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerStyle: backgroundColor,
            tabBarStyle: backgroundColor,
            tabBarLabel: 'Settings',
            tabBarIcon: () => (
              <AntDesign name='setting' size={24} color='black' />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const DetailStack = createNativeStackNavigator();

export const CharacterNavigator = () => {
  const { theme } = useContext(ThemeContext);
  let activeColors = colors[theme.mode];
  return (
    <DetailStack.Navigator>
      <DetailStack.Screen
        name='Characters'
        component={CharactersScreen}
        options={{ headerShown: false, title: 'Find your character' }}
      />
      <DetailStack.Screen
        name='Detail'
        component={DetailScreen}
        options={{
          title: 'Details',
          headerStyle: { backgroundColor: activeColors.background },
        }}
      />
    </DetailStack.Navigator>
  );
};
