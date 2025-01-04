import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// importing different screens
import HomeScreen from '../screens/HomeScreen';
import CharactersScreen from '../screens/CharactersScreen';
import HouseScreen from '../screens/HouseScreen';
import DetailScreen from '../screens/DetailScreen';
import SpellScreen from '../screens/SpellScreen';
import SettingsScreen from '../screens/SettingsScreen';
// importing icons
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
// import context
import {
  ThemeContext,
  LanguageContext,
  FontContext,
} from '../contexts/ThemeContext';
import { colors, languages, fonts } from '../styles/theme';

const Tab = createBottomTabNavigator();

export const TabNavigator = () => {
  const { theme } = useContext(ThemeContext);
  const { language } = useContext(LanguageContext);
  let activeColors = colors[theme.mode];
  let activeLanguages = languages[language.mode];

  const backgroundColor = { backgroundColor: activeColors.background };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name='Home'
          component={HomeScreen}
          options={{
            title: activeLanguages.homeLabel,
            headerStyle: backgroundColor,
            tabBarStyle: backgroundColor,
            tabBarLabel: activeLanguages.homeLabel,
            tabBarIcon: () => (
              <FontAwesome6 name='house-chimney' size={24} color='black' />
            ),
          }}
        />
        <Tab.Screen
          name='Characters'
          component={CharacterNavigator}
          options={{
            title: activeLanguages.characterLabel,
            headerStyle: backgroundColor,
            tabBarStyle: backgroundColor,
            tabBarLabel: activeLanguages.characterLabel,
            tabBarIcon: () => (
              <FontAwesome6 name='users' size={24} color='black' />
            ),
          }}
        />
        <Tab.Screen
          name='Spells'
          component={SpellScreen}
          options={{
            title: activeLanguages.spellsLabel,
            headerStyle: backgroundColor,
            tabBarStyle: backgroundColor,
            tabBarLabel: activeLanguages.spellsLabel,
            tabBarIcon: () => (
              <FontAwesome6 name='wand-sparkles' size={24} color='black' />
            ),
          }}
        />
        <Tab.Screen
          name='Settings'
          component={SettingsScreen}
          options={{
            title: activeLanguages.settingsLabel,
            headerStyle: backgroundColor,
            tabBarStyle: backgroundColor,
            tabBarLabel: activeLanguages.settingsLabel,
            tabBarIcon: () => (
              <FontAwesome6 name='gear' size={24} color='black' />
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
  const { language } = useContext(LanguageContext);
  let activeLanguages = languages[language.mode];
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
          title: activeLanguages.detailsScreen,
          headerStyle: { backgroundColor: activeColors.background },
        }}
      />
      <DetailStack.Screen
        name='House'
        component={HouseScreen}
        options={{
          title: activeLanguages.houseScreen,
          headerStyle: { backgroundColor: activeColors.background },
        }}
      />
    </DetailStack.Navigator>
  );
};
