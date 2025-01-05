import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, View } from 'react-native';
import { colors, fonts } from '../styles/theme';
import { ThemeContext, FontContext } from '../contexts/ThemeContext';
import Loading from '../components/Loading';
import Error from '../components/Error';

const Item = ({ styleFont, styleTheme, colors, item }) => (
  <View style={[{ backgroundColor: colors.item }, styles.item]}>
    <Text style={[styleFont, styleTheme, { color: colors.primary }]}>
      {item.name}
    </Text>
    <Image
      style={{ width: 50, height: 50 }}
      source={
        item.image ? { uri: item.image } : require('../assets/Sorting_Hat.jpg')
      }
    />
  </View>
);

const HouseScreen = ({ route, navigation }) => {
  const { theme } = useContext(ThemeContext);
  const { font } = useContext(FontContext);

  let activeColors = colors[theme.mode];
  let activeFonts = fonts[font.mode];

  const { house } = route.params;

  // Van ChatGPT, nog eens goed doorlezen.
  useEffect(() => {
    navigation.setOptions({ title: house });
  }, [house, navigation]);

  const BASE_URL = 'https://hp-api.onrender.com/api/characters/house/' + house;
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState();

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

  return (
    <View
      style={{
        backgroundColor: activeColors.background,
        flex: 1,
      }}
    >
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <Item
            styleFont={{ fontSize: activeFonts.font }}
            styleTheme={{ color: activeColors.primary }}
            colors={activeColors}
            item={item}
          />
        )}
        keyExtractor={(item) => item.id}
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

export default HouseScreen;
