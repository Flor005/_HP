import { React, useState, useEffect, useContext } from 'react';
import { Text, View, FlatList, TextInput, StyleSheet } from 'react-native';
import { colors, languages, fonts } from '../styles/theme';
import {
  ThemeContext,
  LanguageContext,
  FontContext,
} from '../contexts/ThemeContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Item = ({ item, colors, fonts }) => (
  <View style={[styles.item, { backgroundColor: colors.item }]}>
    <Text
      style={{
        fontWeight: 'bold',
        color: colors.primary,
        fontSize: fonts.font,
      }}
    >
      {item.name}
    </Text>
    <Text style={{ color: colors.secondary, fontSize: fonts.font }}>
      {item.description}
    </Text>
  </View>
);

const SpellScreen = () => {
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { font } = useContext(FontContext);

  let activeLanguages = languages[language.mode];
  let activeColors = colors[theme.mode];
  let activeFonts = fonts[font.mode];

  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [searchValue, modifySearchValue] = useState('');

  useEffect(() => {
    const fetchSpells = async () => {
      setIsLoading(true);
      console.log(activeColors.accent);
      try {
        const response = await fetch('https://hp-api.onrender.com/api/spells');
        const spells = await response.json();
        setData(spells);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchSpells();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <Error />;
  }

  const DATA = data?.filter((spell) =>
    spell.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <View
      style={{
        backgroundColor: activeColors.background,
        paddingBottom: useBottomTabBarHeight(),
        flex: 1,
      }}
    >
      <TextInput
        placeholder={activeLanguages.spellsSearch}
        onChangeText={modifySearchValue}
      />
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item item={item} colors={activeColors} fonts={activeFonts} />
        )}
      />
    </View>
  );
};

export default SpellScreen;

const styles = StyleSheet.create({
  item: {
    display: 'flex',
    flexDirection: 'column',
    padding: 10,
    margin: 3,
  },
});
