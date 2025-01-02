import { React, useEffect, useState, useContext } from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  Pressable,
} from 'react-native';
import { colors, languages, fonts } from '../styles/theme';
import {
  ThemeContext,
  LanguageContext,
  FontContext,
} from '../contexts/ThemeContext';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

const Item = ({ navigation, styleFont, styleTheme, colors, item }) => (
  <Pressable
    accessible={true}
    accessibilityLabel='Show the details'
    accessibilityHint='Tap to see the details'
    accessibilityRole='button'
    onPress={() =>
      navigation.navigate('Detail', {
        item: item,
      })
    }
  >
    <View style={[{ backgroundColor: colors.item }, styles.item]}>
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
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);
  const { font } = useContext(FontContext);

  let activeLanguages = languages[language.mode];
  let activeColors = colors[theme.mode];
  let activeFonts = fonts[font.mode];

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
    return (
      <SafeAreaView style={styles.container}>
        <Text>LOADING.........</Text>
      </SafeAreaView>
    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Smth went wrong, please try again!!</Text>
      </SafeAreaView>
    );
  }

  const DATA = data?.filter(
    (character) =>
      character.name.toLowerCase().includes(searchValue.toLowerCase())
    // FILTEREN OP HOUSE? OF EEN NIEUW SCREEN VOOR MAKEN?
  );

  return (
    <View
      style={{
        backgroundColor: activeColors.background,
        paddingBottom: useBottomTabBarHeight(),
      }}
    >
      <TextInput
        accessible={true}
        accessibilityLabel='Searchbar'
        accessibilityHint='Type to search'
        accessibilityRole='search'
        placeholder={activeLanguages.charactersSearch}
        onChangeText={modifySearchValue}
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
  item: {
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
