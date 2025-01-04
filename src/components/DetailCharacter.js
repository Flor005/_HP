import { React, useContext } from 'react';
import { Text, View, Image, Pressable } from 'react-native';
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

  return (
    <View>
      <Text
        style={{
          fontSize: activeFonts.font,
          color: activeThemes.primary,
          lineHeight: activeFonts.lineHeight,
        }}
      >
        {activeLanguages.detailName}: {name ? name : 'Unknown'}
        {'\n'}
        {activeLanguages.detailWandCore}: {wand.core ? wand.core : 'Unknown'}
        {'\n'}
        {activeLanguages.detailWandWood}: {wand.wood ? wand.wood : 'Unknown'}
        {'\n'}
      </Text>

      <Pressable onPress={() => navigation.navigate('House', { house: house })}>
        <Text>
          {activeLanguages.detailHouse}: {house ? house : 'Unknown'}
          {'\n'}
        </Text>
      </Pressable>

      <Text>
        {activeLanguages.detailAncestry}: {ancestry ? ancestry : 'Unknown'}
        {'\n'}
        {activeLanguages.detailPatronus}: {patronus ? patronus : 'Unknown'}
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
