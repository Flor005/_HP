import { React, useState } from 'react';
import {
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { ApiList } from './ApiList';

const Item = ({ name, image }) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
    {image ? (
      <Image style={styles.image} source={{ uri: image }} />
    ) : (
      <Image
        style={styles.image}
        source={require('../assets/Sorting_Hat.jpg')}
      />
    )}
  </View>
);

const Flatlist = () => {
  const [searchValue, modifySearchValue] = useState('');
  const DATA = ApiList.filter((character) =>
    character.name.includes(searchValue)
  );

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        placeholder='Search for your favorite character'
        onChangeText={modifySearchValue}
      />
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item name={item.name} image={item.image} />}
        keyExtractor={(item) => item.id} // enkel als er geen 'key' aanwezig is dan kan je de id 'omzetten'
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  image: {
    width: 150,
    height: 150,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'green',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 22,
  },
});

export default Flatlist;
