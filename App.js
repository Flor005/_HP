import React, { useState } from 'react';
import { TabNavigator } from './src/config/AppNavigator';
import {
  ThemeContext,
  FontContext,
  LanguageContext,
} from './src/contexts/ThemeContext';

const App = () => {
  const [theme, setTheme] = useState({ mode: 'light' });
  const [font, setFont] = useState({ mode: 'small' });
  const [language, setLanguage] = useState({ mode: 'en' });

  const updateTheme = (newTheme) => {
    let mode;
    if (!newTheme) {
      mode = theme.mode === 'dark' ? 'light' : 'dark';
      newTheme = { mode };
    }
    setTheme(newTheme);
  };

  const updateFont = (newFont) => {
    let mode;
    if (!newFont) {
      mode = font.mode === 'small' ? 'big' : 'small';
      newFont = { mode };
    }
    setFont(newFont);
  };

  const updateLanguage = (newLanguage) => {
    let mode;
    if (!newLanguage) {
      mode = language.mode === 'en' ? 'fr' : 'en';
      newLanguage = { mode };
    }
    setLanguage(newLanguage);
  };

  return (
    <FontContext.Provider value={{ font, updateFont }}>
      <ThemeContext.Provider value={{ theme, updateTheme }}>
        <LanguageContext.Provider value={{ language, updateLanguage }}>
          <TabNavigator />
        </LanguageContext.Provider>
      </ThemeContext.Provider>
    </FontContext.Provider>
  );
};

export default App;
