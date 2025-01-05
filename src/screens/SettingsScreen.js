import React, { useContext, useState } from 'react';
import { ImageBackground } from 'react-native';
import { colors, fonts, languages } from '../styles/theme';
import {
  ThemeContext,
  FontContext,
  LanguageContext,
} from '../contexts/ThemeContext';
import SwitchWithLabel from '../components/SwitchWithLabel';

const SettingsScreen = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  const { font, updateFont } = useContext(FontContext);
  const { language, updateLanguage } = useContext(LanguageContext);

  let activeColors = colors[theme.mode];
  let activeFonts = fonts[font.mode];
  let activeLanguages = languages[language.mode];

  const [isEnabledTheme, setIsEnabledTheme] = useState(false);
  const [isEnabledFont, setIsEnabledFont] = useState(false);
  const [isEnabledLanguage, setIsEnabledLanguage] = useState(false);

  const toggleSwitchTheme = () => {
    updateTheme();
    setIsEnabledTheme((previousState) => !previousState);
  };
  const toggleSwitchFont = () => {
    updateFont();
    setIsEnabledFont((previousState) => !previousState);
  };
  const toggleSwitchLanguage = () => {
    updateLanguage();
    setIsEnabledLanguage((previousState) => !previousState);
  };

  const styles = { fontSize: activeFonts.font, color: 'white' };

  return (
    <ImageBackground style={{ flex: 1 }} source={activeColors.image}>
      <SwitchWithLabel
        label={activeLanguages.settingsTheme}
        style={styles}
        value={isEnabledTheme}
        onValueChange={toggleSwitchTheme}
        onChange={() => console.log(isEnabledTheme)}
        accessible={true}
        accessibilityLabel='Change the theme'
        accessibilityHint='This changes the theme from Gryffindor to Slytherin or the opposite'
        accessibilityRole='togglebutton'
      />
      <SwitchWithLabel
        label={activeLanguages.settingsFont}
        style={styles}
        value={isEnabledFont}
        onValueChange={toggleSwitchFont}
        onChange={() => console.log(isEnabledFont)}
        accessible={true}
        accessibilityLabel='Change the font'
        accessibilityHint='This changes the font of the text displayed on the different screens'
        accessibilityRole='togglebutton'
      />
      <SwitchWithLabel
        label={activeLanguages.settingsLanguage}
        style={styles}
        value={isEnabledLanguage}
        onValueChange={toggleSwitchLanguage}
        onChange={() => console.log(isEnabledLanguage)}
        accessible={true}
        accessibilityLabel='Change the language'
        accessibilityHint='This changes the language from English to French or the opposite'
        accessibilityRole='togglebutton'
      />
    </ImageBackground>
  );
};

export default SettingsScreen;
