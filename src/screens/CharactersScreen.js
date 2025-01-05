import React, { useContext, useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { colors, languages, fonts } from '../styles/theme';
import {
  ThemeContext,
  LanguageContext,
  FontContext,
} from '../contexts/SettingsContext';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Item = ({ navigation, styleFont, styleTheme, colors, item }) => (
  <Pressable
    accessible={true}
    accessibilityLabel='Tap to see the details'
    accessibilityHint='This will give you more info about the selected character'
    accessibilityRole='button'
    onPress={() =>
      navigation.navigate('Detail', {
        item: item,
      })
    }
  >
    <View style={[{ backgroundColor: colors.item }, styles.itemContainer]}>
      <Text style={[styleFont, styleTheme, { color: colors.primary }]}>
        {item.name}
      </Text>
      <Image
        style={{ width: 50, height: 50 }}
        source={
          item.image
            ? { uri: item.image }
            : require('../assets/Sorting_Hat.jpg')
        }
      />
    </View>
  </Pressable>
);

const CharactersScreen = ({ navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { font } = useContext(FontContext);
  const { language } = useContext(LanguageContext);

  let activeColors = colors[theme.mode];
  let activeFonts = fonts[font.mode];
  let activeLanguages = languages[language.mode];

  const BASE_URL = 'https://hp-api.onrender.com/api/characters';
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [searchValue, modifySearchValue] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      setIsLoading(true);

      try {
        const response = await fetch(`${BASE_URL}`);
        const characters = await response.json();
        setData(characters);
      } catch (e) {
        setError(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }

  const DATA = data?.filter((character) =>
    character.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <View
      style={{
        backgroundColor: activeColors.background,
        flex: 1,
      }}
    >
      <TextInput
        placeholder={activeLanguages.charactersSearch}
        onChangeText={modifySearchValue}
        style={{ fontSize: activeFonts.font }}
        accessible={true}
        accessibilityLabel='Search your favorite spell'
        accessibilityHint='You can type which spell you want to search for'
        accessibilityRole='search'
      />
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <Item
            navigation={navigation}
            styleFont={{ fontSize: activeFonts.font }}
            styleTheme={{ color: activeColors.primary }}
            colors={activeColors}
            item={item}
          />
        )}
        keyExtractor={(item) => item.id} // enkel als er geen 'key' aanwezig is dan kan je de id 'omzetten'
      />
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
});

export default CharactersScreen;
