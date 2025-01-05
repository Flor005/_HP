import React from 'react';
import { ImageBackground, Pressable, Linking } from 'react-native';

const HomeScreen = () => {
  const imagePressHandler = () => {
    Linking.openURL('https://www.harrypotter.com/sorting-hat').catch((err) =>
      console.error('Error received while opening URL', err)
    );
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={imagePressHandler}>
      <ImageBackground
        style={{ flex: 1 }}
        source={require('../assets/Home.jpg')}
      />
    </Pressable>
  );
};

export default HomeScreen;
