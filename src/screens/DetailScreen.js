import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import { colors } from '../styles/theme';
import { ThemeContext } from '../contexts/SettingsContext';
import DetailCharacter from '../components/DetailCharacter';

const DetailScreen = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);

  let activeColors = colors[theme.mode];

  const { item } = route.params;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: activeColors.item,
      }}
    >
      <DetailCharacter item={item} navigation={navigation} />
    </ScrollView>
  );
};

export default DetailScreen;
