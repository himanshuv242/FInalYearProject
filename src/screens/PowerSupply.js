import React, { useState,useEffect } from 'react';
import { View, Text, Switch, StyleSheet,  Alert } from 'react-native';
import LottieView from "lottie-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {translation} from '../utils';

const PowerSupplyScreen = () => {
  const [isSolarSupply, setIsSolarSupply] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(()=>{
    getLang();
  },[])

  const getLang=async()=>{
    setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')));
  }


  const supply = async () => {
    try {
      const savedIPAddress = await AsyncStorage.getItem('ipAddress');
      // console.log(`IP address is ${savedIPAddress}`);
      
      await axios.get(`http://${savedIPAddress}/light`).then(response => {
        // console.log(response.data);
        const stringifiedData = JSON.stringify(response.data);
        if (stringifiedData === '"Light ON"') {
            setIsSolarSupply(true);
        } else if (stringifiedData === '"Light OFF"') {
            setIsSolarSupply(false);
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert(`${selectedLang == 0
          ? translation[23].English
          : selectedLang == 1
          ? translation[23].Telugu
          : selectedLang == 2
          ? translation[23].Hindi
          : selectedLang == 3
          ? translation[23].Punjabi
          : selectedLang == 4
          ? translation[23].Urdu
          : null}`, `${selectedLang == 0
            ? translation[24].English
            : selectedLang == 1
            ? translation[24].Telugu
            : selectedLang == 2
            ? translation[24].Hindi
            : selectedLang == 3
            ? translation[24].Punjabi
            : selectedLang == 4
            ? translation[24].Urdu
            : null}`);
      });
      // await axios.get('http://192.168.170.177/led');
      console.log('API request sent successfully');
      // Handle any necessary UI updates or actions
    } catch (error) {
      console.error('Failed to send API request', error);
      // Handle any errors that occurred during the request
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{selectedLang == 0
            ? translation[34].English
            : selectedLang == 1
            ? translation[34].Telugu
            : selectedLang == 2
            ? translation[34].Hindi
            : selectedLang == 3
            ? translation[34].Punjabi
            : selectedLang == 4
            ? translation[34].Urdu
            : null}</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>{selectedLang == 0
            ? translation[35].English
            : selectedLang == 1
            ? translation[35].Telugu
            : selectedLang == 2
            ? translation[35].Hindi
            : selectedLang == 3
            ? translation[35].Punjabi
            : selectedLang == 4
            ? translation[35].Urdu
            : null}</Text>
        <Switch
          value={isSolarSupply}
          onValueChange={supply}
          trackColor={{ false: '#D9D9D9', true: '#2DAF7D' }}
          thumbColor={isSolarSupply ? '#FFFFFF' : '#FFFFFF'}
        />
        <Text style={styles.label}>{selectedLang == 0
            ? translation[36].English
            : selectedLang == 1
            ? translation[36].Telugu
            : selectedLang == 2
            ? translation[36].Hindi
            : selectedLang == 3
            ? translation[36].Punjabi
            : selectedLang == 4
            ? translation[36].Urdu
            : null}</Text>
      </View>
    
      <View style={{flex:0.8, alignItems:'center', margin:0}}>
        {isSolarSupply?<LottieView
            source={require("../assets/solar.json")}
            autoPlay
            loop={true}
            resizeMode='contain'
            />:<LottieView
            source={require("../assets/direct.json")}
            autoPlay
            loop={true}
            resizeMode='contain'
            />}
            
            </View>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailsTitle}>
          {isSolarSupply ? `${selectedLang == 0
            ? translation[44].English
            : selectedLang == 1
            ? translation[44].Telugu
            : selectedLang == 2
            ? translation[44].Hindi
            : selectedLang == 3
            ? translation[44].Punjabi
            : selectedLang == 4
            ? translation[44].Urdu
            : null}` : `${selectedLang == 0
              ? translation[45].English
              : selectedLang == 1
              ? translation[45].Telugu
              : selectedLang == 2
              ? translation[45].Hindi
              : selectedLang == 3
              ? translation[45].Punjabi
              : selectedLang == 4
              ? translation[45].Urdu
              : null}`}
        </Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{selectedLang == 0
            ? translation[37].English
            : selectedLang == 1
            ? translation[37].Telugu
            : selectedLang == 2
            ? translation[37].Hindi
            : selectedLang == 3
            ? translation[37].Punjabi
            : selectedLang == 4
            ? translation[37].Urdu
            : null}</Text>
          <Text style={styles.detailValue}>: 220V</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{selectedLang == 0
            ? translation[38].English
            : selectedLang == 1
            ? translation[38].Telugu
            : selectedLang == 2
            ? translation[38].Hindi
            : selectedLang == 3
            ? translation[38].Punjabi
            : selectedLang == 4
            ? translation[38].Urdu
            : null}</Text>
          <Text style={styles.detailValue}>: 14mA</Text>
        </View>
        {isSolarSupply?<View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{selectedLang == 0
            ? translation[39].English
            : selectedLang == 1
            ? translation[39].Telugu
            : selectedLang == 2
            ? translation[39].Hindi
            : selectedLang == 3
            ? translation[39].Punjabi
            : selectedLang == 4
            ? translation[39].Urdu
            : null}</Text>
          <Text style={styles.detailValue}>: 80%</Text>
        </View>:''}
        {isSolarSupply?<View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{selectedLang == 0
            ? translation[40].English
            : selectedLang == 1
            ? translation[40].Telugu
            : selectedLang == 2
            ? translation[40].Hindi
            : selectedLang == 3
            ? translation[40].Punjabi
            : selectedLang == 4
            ? translation[40].Urdu
            : null}</Text>
          <Text style={styles.detailValue}>: Connected</Text>
        </View>:''}
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{selectedLang == 0
            ? translation[41].English
            : selectedLang == 1
            ? translation[41].Telugu
            : selectedLang == 2
            ? translation[41].Hindi
            : selectedLang == 3
            ? translation[41].Punjabi
            : selectedLang == 4
            ? translation[41].Urdu
            : null}</Text>
          <Text style={styles.detailValue}>: 90%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{selectedLang == 0
            ? translation[42].English
            : selectedLang == 1
            ? translation[42].Telugu
            : selectedLang == 2
            ? translation[42].Hindi
            : selectedLang == 3
            ? translation[42].Punjabi
            : selectedLang == 4
            ? translation[42].Urdu
            : null}</Text>
          <Text style={styles.detailValue}>
            {isSolarSupply ? `:${selectedLang == 0
            ? translation[47].English
            : selectedLang == 1
            ? translation[47].Telugu
            : selectedLang == 2
            ? translation[47].Hindi
            : selectedLang == 3
            ? translation[47].Punjabi
            : selectedLang == 4
            ? translation[47].Urdu
            : null}` : ': Continuous'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>{selectedLang == 0
            ? translation[43].English
            : selectedLang == 1
            ? translation[43].Telugu
            : selectedLang == 2
            ? translation[43].Hindi
            : selectedLang == 3
            ? translation[43].Punjabi
            : selectedLang == 4
            ? translation[43].Urdu
            : null}</Text>
          <Text style={styles.detailValue}>
            {isSolarSupply ? ': Renewable, Reduced Carbon Footprint' : ': Dependent on Power Grid'}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003763',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginRight: 10,
    color: 'white',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 15,
    shadowColor: '#000000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  detailsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333333',
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  detailLabel: {
    flex: 1,
    fontSize: 16,
    color: '#666666',
  },
  detailValue: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
    paddingLeft:5
  },
});

export default PowerSupplyScreen;
