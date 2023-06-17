import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert
} from 'react-native';
import { Button } from '../components/Main';
import * as theme from '../constants/Main/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translation} from '../utils';


const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(()=>{
    getLang();
  },[])

  const getLang=async()=>{
    setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')));
  }

  const handleSignUp = () => {
    setEmail('');
    setPassword('');
    setConfirmPassword('');
        Alert.alert(`${selectedLang == 0
          ? translation[64].English
          : selectedLang == 1
          ? translation[64].Telugu
          : selectedLang == 2
          ? translation[64].Hindi
          : selectedLang == 3
          ? translation[64].Punjabi
          : selectedLang == 4
          ? translation[64].Urdu
          : null}`, `${selectedLang == 0
            ? translation[65].English
            : selectedLang == 1
            ? translation[65].Telugu
            : selectedLang == 2
            ? translation[65].Hindi
            : selectedLang == 3
            ? translation[65].Punjabi
            : selectedLang == 4
            ? translation[65].Urdu
            : null}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{selectedLang == 0
          ? translation[6].English
          : selectedLang == 1
          ? translation[6].Telugu
          : selectedLang == 2
          ? translation[6].Hindi
          : selectedLang == 3
          ? translation[6].Punjabi
          : selectedLang == 4
          ? translation[6].Urdu
          : null}</Text>
      <TextInput
      
        style={styles.input}
        placeholder={selectedLang == 0
          ? translation[7].English
          : selectedLang == 1
          ? translation[7].Telugu
          : selectedLang == 2
          ? translation[7].Hindi
          : selectedLang == 3
          ? translation[7].Punjabi
          : selectedLang == 4
          ? translation[7].Urdu
          : null}

        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}

        placeholder={selectedLang == 0
          ? translation[8].English
          : selectedLang == 1
          ? translation[8].Telugu
          : selectedLang == 2
          ? translation[8].Hindi
          : selectedLang == 3
          ? translation[8].Punjabi
          : selectedLang == 4
          ? translation[8].Urdu
          : null}

        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#A9A9A9"
      />
      <TextInput
        style={styles.input}

        placeholder={selectedLang == 0
          ? translation[9].English
          : selectedLang == 1
          ? translation[9].Telugu
          : selectedLang == 2
          ? translation[9].Hindi
          : selectedLang == 3
          ? translation[9].Punjabi
          : selectedLang == 4
          ? translation[9].Urdu
          : null}

        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        placeholderTextColor="#A9A9A9"
      />
      <Button gradient onPress={handleSignUp}>
              <Text
                style={{
                  color: theme.colors.white,
                  fontWeight: '500',
                  textAlign: 'center',
                }}>
                {selectedLang == 0
          ? translation[10].English
          : selectedLang == 1
          ? translation[10].Telugu
          : selectedLang == 2
          ? translation[10].Hindi
          : selectedLang == 3
          ? translation[10].Punjabi
          : selectedLang == 4
          ? translation[10].Urdu
          : null}
              </Text>
            </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color:'black'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    color:'black'
  },
  button: {
    backgroundColor: 'blue',
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Signup;
