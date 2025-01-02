import {
  ThemeContext,
  FontContext,
  LanguageContext,
} from '../contexts/ThemeContext';
import { React, useContext, useState } from 'react';
import { ImageBackground } from 'react-native';
import { colors, fonts, languages } from '../styles/theme';
import SwitchWithLabel from '../components/SwitchWithLabel';

const SettingsScreen = () => {
  const { theme, updateTheme } = useContext(ThemeContext);
  const { font, updateFont } = useContext(FontContext);
  const { language, updateLanguage } = useContext(LanguageContext);

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

  let activeColors = colors[theme.mode];
  let activeFonts = fonts[font.mode];
  let activeLanguages = languages[language.mode];

  const styles = { fontSize: activeFonts.font, color: activeColors.tertiary };

  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={
        isEnabledTheme
          ? require('../assets/Gryffindorlogo.jpg')
          : require('../assets/Slytherinlogo.jpg')
      }
    >
      <SwitchWithLabel
        label={activeLanguages.settingsTheme}
        style={styles}
        value={isEnabledTheme}
        onValueChange={toggleSwitchTheme}
        onChange={() => console.log(isEnabledTheme)}
      />
      <SwitchWithLabel
        label={activeLanguages.settingsFont}
        style={styles}
        value={isEnabledFont}
        onValueChange={toggleSwitchFont}
        onChange={() => console.log(isEnabledFont)}
      />
      <SwitchWithLabel
        label={activeLanguages.settingsLanguage}
        style={styles}
        value={isEnabledLanguage}
        onValueChange={toggleSwitchLanguage}
        onChange={() => console.log(isEnabledLanguage)}
      />
    </ImageBackground>
  );
};

export default SettingsScreen;
