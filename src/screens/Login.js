import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Keyboard,
  Alert,
} from 'react-native';
import * as theme from '../constants/Main/theme';
import {Button, Input} from '../components/Main';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translation} from '../utils';

const {width, height} = Dimensions.get('window');
// const VALID_EMAIL = 'contact@react-ui-kit.com';
const VALID_PASSWORD = '2019bele024';

const Login = () => {
  const [ipAddress, setIpAddress] = useState('');
  const [password, setPassword] = useState(VALID_PASSWORD);
  const [error, setError] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(()=>{
    getLang();
  },[])

  const getLang=async()=>{
    setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')));
  }


  const handleLogin = () => {
    Keyboard.dismiss();
    setLoading(true);

    // Fake validation
    const error = [];

    // No validation needed for IP address
    //But needed for password
    if (password !== VALID_PASSWORD) {
      error.push('password');
    }

    setTimeout(() => {
      setError(error);
      setLoading(false);
    }, 1500);


    if(!ipAddress.length)
    {
Alert.alert(`${selectedLang == 0
  ? translation[15].English
  : selectedLang == 1
  ? translation[15].Telugu
  : selectedLang == 2
  ? translation[15].Hindi
  : selectedLang == 3
  ? translation[15].Punjabi
  : selectedLang == 4
  ? translation[15].Urdu
  : null}`, `${selectedLang == 0
    ? translation[16].English
    : selectedLang == 1
    ? translation[16].Telugu
    : selectedLang == 2
    ? translation[16].Hindi
    : selectedLang == 3
    ? translation[16].Punjabi
    : selectedLang == 4
    ? translation[16].Urdu
    : null}`);
      setLoading(false);
      return;
    }
    else if (!error.length) {
      // Save the IP address using AsyncStorage
      AsyncStorage.setItem('ipAddress', ipAddress)
        .then(() => {
          Alert.alert(`${selectedLang == 0
            ? translation[17].English
            : selectedLang == 1
            ? translation[17].Telugu
            : selectedLang == 2
            ? translation[17].Hindi
            : selectedLang == 3
            ? translation[17].Punjabi
            : selectedLang == 4
            ? translation[17].Urdu
            : null}`, `${selectedLang == 0
              ? translation[18].English
              : selectedLang == 1
              ? translation[18].Telugu
              : selectedLang == 2
              ? translation[18].Hindi
              : selectedLang == 3
              ? translation[18].Punjabi
              : selectedLang == 4
              ? translation[18].Urdu
              : null}`, [
            {
              text: 'OK',
              onPress: () => {
                navigation.navigate('Dashboard');
              },
            },
          ]);
        })
        .catch((error) => {
          console.log(error);
          // Handle the error
        });
    }
  };

  const hasError = (key) => (error.includes(key) ? styles.hasError : null);

  return (
    <View style={[styles.flex, styles.container]}>
      <Text style={{ fontSize: theme.fonts.h1, color: theme.colors.black, alignSelf: 'flex-start' }}>
      {selectedLang == 0
    ? translation[11].English
    : selectedLang == 1
    ? translation[11].Telugu
    : selectedLang == 2
    ? translation[11].Hindi
    : selectedLang == 3
    ? translation[11].Punjabi
    : selectedLang == 4
    ? translation[11].Urdu
    : null}
      </Text>
      <View style={{ marginTop: theme.sizes.margin }}>
        <Input
          label={selectedLang == 0
            ? translation[12].English
            : selectedLang == 1
            ? translation[12].Telugu
            : selectedLang == 2
            ? translation[12].Hindi
            : selectedLang == 3
            ? translation[12].Punjabi
            : selectedLang == 4
            ? translation[12].Urdu
            : null}

          style={[styles.input, hasError('ipAddress')]}
          error={hasError('ipAddress')}
          value={ipAddress}
          onChangeText={(text) => setIpAddress(text)}
        />
        <Input
          secure
          label={selectedLang == 0
            ? translation[13].English
            : selectedLang == 1
            ? translation[13].Telugu
            : selectedLang == 2
            ? translation[13].Hindi
            : selectedLang == 3
            ? translation[13].Punjabi
            : selectedLang == 4
            ? translation[13].Urdu
            : null}

          error={hasError('password')}
          style={[styles.input, hasError('password')]}
          defaultValue={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button gradient style={{ marginTop: theme.sizes.margin }} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <Text style={{ color: theme.colors.white, textAlign: 'center' }}>
              {selectedLang == 0
            ? translation[11].English
            : selectedLang == 1
            ? translation[11].Telugu
            : selectedLang == 2
            ? translation[11].Hindi
            : selectedLang == 3
            ? translation[11].Punjabi
            : selectedLang == 4
            ? translation[11].Urdu
            : null}
            </Text>
          )}
        </Button>
        <Button onPress={() => navigation.navigate('Forgot Password')}>
          <Text
            style={{
              color: theme.colors.gray,
              fontSize: theme.fonts.caption,
              textAlign: 'center',
              textDecorationLine: 'underline',
            }}>
            {selectedLang == 0
            ? translation[14].English
            : selectedLang == 1
            ? translation[14].Telugu
            : selectedLang == 2
            ? translation[14].Hindi
            : selectedLang == 3
            ? translation[14].Punjabi
            : selectedLang == 4
            ? translation[14].Urdu
            : null}
          </Text>
        </Button>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: theme.colors.white,
    paddingHorizontal: theme.sizes.padding,
    paddingVertical: theme.sizes.padding,
    height: height,
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth,
    fontSize: theme.fonts.body,
  },
  hasError: {
    borderBottomColor: 'red',
  },
});
