import { React, useContext } from 'react';
import { Text, View, Image, StyleSheet } from 'react-native';
import { fonts, languages, colors } from '../styles/theme';
import {
  FontContext,
  LanguageContext,
  ThemeContext,
} from '../contexts/ThemeContext';

const DetailCharacter = (props) => {
  const { item, navigation } = props;
  const { name, wand, house, ancestry, patronus, image } = item;

  const { font } = useContext(FontContext);
  const { language } = useContext(LanguageContext);
  const { theme } = useContext(ThemeContext);

  let activeFonts = fonts[font.mode];
  let activeLanguages = languages[language.mode];
  let activeThemes = colors[theme.mode];

  const {
    detailName,
    detailWandCore,
    detailWandWood,
    detailAncestry,
    detailPatronus,
    detailHouse,
  } = activeLanguages;

  const styles = StyleSheet.create({
    details: {
      fontSize: activeFonts.font,
      color: activeThemes.primary,
      lineHeight: activeFonts.lineHeight,
      marginLeft: 10,
    },
  });

  return (
    <View>
      <Text style={styles.details}>
        {detailName}: {name ? name : 'Unknown'}
        {'\n'}
        {detailWandCore}: {wand.core ? wand.core : 'Unknown'}
        {'\n'}
        {detailWandWood}: {wand.wood ? wand.wood : 'Unknown'}
        {'\n'}
        {detailAncestry}: {ancestry ? ancestry : 'Unknown'}
        {'\n'}
        {detailPatronus}: {patronus ? patronus : 'Unknown'}
      </Text>
      <Text
        style={styles.details}
        onPress={() => navigation.navigate('House', { house: house })}
      >
        {detailHouse}: {house ? house : 'Unknown'}
        {'\n'}
      </Text>

      {/* // Take Image of the character, if not available, take default image. */}
      <Image
        style={{ width: 413, height: 600 }}
        source={image ? { uri: image } : require('../assets/Sorting_Hat.jpg')}
      />
    </View>
  );
};

export default DetailCharacter;
