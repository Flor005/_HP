import { Text, View } from 'react-native';
import { colors, fonts, languages } from '../styles/theme';
import {
  ThemeContext,
  FontContext,
  LanguageContext,
} from '../contexts/ThemeContext';
import { useContext } from 'react';

const Loading = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { font } = useContext(FontContext);

  let activeLanguages = languages[language.mode];
  let activeColors = colors[theme.mode];
  let activeFonts = fonts[font.mode];

  return (
    <View
      style={{
        backgroundColor: activeColors.background,
        flex: 1,
      }}
    >
      <Text style={{ fontSize: activeFonts.font }}>
        {activeLanguages.loadingNotification}
      </Text>
    </View>
  );
};

export default Loading;
