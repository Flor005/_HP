import React, { useContext } from 'react';
import { Text, View } from 'react-native';
import { colors, fonts, languages } from '../styles/theme';
import {
  ThemeContext,
  FontContext,
  LanguageContext,
} from '../contexts/SettingsContext';

const Error = () => {
  const { theme } = useContext(ThemeContext);
  const { font } = useContext(FontContext);
  const { language } = useContext(LanguageContext);

  let activeColors = colors[theme.mode];
  let activeFonts = fonts[font.mode];
  let activeLanguages = languages[language.mode];

  return (
    <View
      style={{
        backgroundColor: activeColors.background,
        flex: 1,
      }}
    >
      <Text style={{ fontSize: activeFonts.font }}>
        {activeLanguages.errorNotification}
      </Text>
    </View>
  );
};

export default Error;
