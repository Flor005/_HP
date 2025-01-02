import { ImageBackground } from 'react-native';

const HomeScreen = () => {
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={require('../assets/WelcomeImage.jpg')}
    />
  );
};

export default HomeScreen;
