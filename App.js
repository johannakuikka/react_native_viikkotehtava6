import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

const DictionaryApp = () => {
  const [word, setWord] = useState(''); // Hakusanan tila
  const [definitions, setDefinitions] = useState([]); // Määritelmien tila

  // Funktio, joka hakee sanan määritelmät API:sta
  const fetchWordDefinition = async () => {
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
      const data = await response.json();
      setDefinitions(data[0].meanings); // Asetetaan määritelmät tilaan
    } catch (error) {
      console.error('Virhe haettaessa määritelmiä:', error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Otsikko */}
      <Text style={styles.header}>English Dictionary</Text>

      {/* Syöttökenttä sanan hakemiseksi */}
      <TextInput
        style={styles.input}
        placeholder="Enter a word"
        value={word}
        onChangeText={setWord} // Asetetaan käyttäjän syöttämä teksti hakusanan tilaan
      />
      {/* Hakunappi */}
      <Button title="Search Definition" onPress={fetchWordDefinition} />

      {/* Määritelmien ja esimerkkien näyttäminen listassa */}
      <FlatList
        data={definitions}
        keyExtractor={(item, index) => index.toString()} // Jokaiselle listan itemille uniikki avain
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.partOfSpeech}>Part of Speech: {item.partOfSpeech}</Text>
            {/* Näytetään jokaisen määritelmän alla sen kuvaukset */}
            {item.definitions.map((definition, index) => (
              <View key={index}>
                <Text>Definition: {definition.definition}</Text>
                {/* Näytetään esimerkki lause, jos sellainen on saatavilla */}
                {definition.example && (
                  <Text>Example: {definition.example}</Text>
                )}
              </View>
            ))}
          </View>
        )}
      />
    </View>
  );
};

// Tyylit käyttöliittymälle
const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
  },
  item: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  partOfSpeech: {
    fontWeight: 'bold',
  },
});

export default DictionaryApp;
