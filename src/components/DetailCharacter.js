import React, { useContext } from 'react';
import { Image, Text, View } from 'react-native';
import { colors, fonts, languages } from '../styles/theme';
import {
  ThemeContext,
  FontContext,
  LanguageContext,
} from '../contexts/ThemeContext';

const DetailCharacter = (props) => {
  const { item, navigation } = props;
  const { name, wand, house, ancestry, patronus, image } = item;

  const { theme } = useContext(ThemeContext);
  const { font } = useContext(FontContext);
  const { language } = useContext(LanguageContext);

  let activeThemes = colors[theme.mode];
  let activeFonts = fonts[font.mode];
  let activeLanguages = languages[language.mode];

  const {
    detailName,
    detailWandCore,
    detailWandWood,
    detailAncestry,
    detailPatronus,
    detailHouse,
  } = activeLanguages;

  const stylesDetail = {
    fontSize: activeFonts.font,
    color: activeThemes.primary,
    lineHeight: activeFonts.lineHeight,
    marginLeft: 10,
  };

  return (
    <View>
      <Text style={stylesDetail}>
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
        style={stylesDetail}
        onPress={() => navigation.navigate('House', { house: house })}
        accessible={true}
        accessibilityLabel='Tap to see other members of the house'
        accessibilityHint='If you tap on the house, you will see a list of all other characters from the same house'
        accessibilityRole='button'
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
