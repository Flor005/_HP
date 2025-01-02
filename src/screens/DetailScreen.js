import { React, useContext } from 'react';
import { ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import DetailCharacter from '../components/DetailCharacter';
import { colors } from '../styles/theme';
import { ThemeContext } from '../contexts/ThemeContext';

const DetailScreen = () => {
  const { theme } = useContext(ThemeContext);

  let activeColors = colors[theme.mode];

  const route = useRoute();
  const { item } = route.params;

  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: activeColors.item,
      }}
    >
      <DetailCharacter item={item} />
    </ScrollView>
  );
};

export default DetailScreen;
