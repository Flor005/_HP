import React from 'react';
import { ImageBackground, Linking, Pressable } from 'react-native';

const HomeScreen = () => {
  const imagePressHandler = () => {
    Linking.openURL('https://www.harrypotter.com/sorting-hat').catch((err) =>
      console.error('Error received while opening URL', err)
    );
  };

  return (
    <Pressable
      style={{ flex: 1 }}
      onPress={imagePressHandler}
      accessible={true}
      accessibilityLabel='Click to go to the website'
      accessibilityHint='This opens a link to see to which house you belong'
      accessibilityRole='button'
    >
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/Home.jpg')}
      />
    </Pressable>
  );
};

export default HomeScreen;
