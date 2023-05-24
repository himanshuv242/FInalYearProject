import React, { useState } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity,Image } from 'react-native';
import {Block, Text} from '../components/Dashboard/Index';
import * as theme from '../constants/Dashboard/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
 

const Dashboard = ({ navigation }) => {
  const LightIcon = () => (
    <Image
      source={require('../assets/icons/bulb.png')}
      style={{ width: 32, height: 32 }}
    />
  );
  const ACIcon = () => (
    <Image
      source={require('../assets/icons/crop.png')}
      style={{ width: 32, height: 32 }}
    />
  );
  const TempIcon = () => (
    <Image
      source={require('../assets/icons/weather.png')}
      style={{ width: 32, height: 32 }}
    />
  );
  const FanIcon = () => (
    <Image
      source={require('../assets/icons/fan.png')}
      style={{ width: 32, height: 32 }}
    />
  );
  const WiFiIcon = () => (
    <Image
      source={require('../assets/icons/wifi.png')}
      style={{ width: 32, height: 32 }}
    />
  );
  const ElectricityIcon = () => (
    <Image
      source={require('../assets/icons/supply.png')}
      style={{ width: 32, height: 32 }}
    />
  );

  const [isMotorOn, setIsMotorOn] = useState('');

  const fetchData = async () => {
    try {
      const savedIPAddress = await AsyncStorage.getItem('ipAddress');
      // console.log(`IP address is ${savedIPAddress}`);
      
      await axios.get(`http://${savedIPAddress}/led`).then(response => {
        // console.log(response.data);
        const stringifiedData = JSON.stringify(response.data);
        if (stringifiedData === '"LED ON"') {
          setIsMotorOn('LED OFF');
        } else if (stringifiedData === '"LED OFF"') {
          setIsMotorOn('LED ON');
        }
        // console.log(`setIsMotorOn is ${isMotorOn}`)
      })
      .catch(error => {
        console.log(error);
      });
      // await axios.get('http://192.168.170.177/led');
      console.log('API request sent successfully');
      // Handle any necessary UI updates or actions
    } catch (error) {
      console.error('Failed to send API request', error);
      // Handle any errors that occurred during the request
    }
  };

  const getButtonStyle = () => {
    // Conditionally return the style based on the LED status
    if (isMotorOn === 'LED ON') {
      return styles.button;
    } else if (isMotorOn === 'LED OFF') {
      return styles.buttonOn;
    } else {
      return styles.button;
    }
  };

  return (
      <Block style={styles.dashboard}>
         <Block column style={{ marginVertical: theme.sizes.base }}>
          <Text welcome>Hi,</Text>
          <Text name>Himanshu</Text>
        </Block>
        
        <Block row style={{ paddingVertical: 10 }}>
          <Block flex={1.5} row style={{ alignItems: 'flex-end', }}>
            <Text h1>34</Text>
            <Text h1 size={34} height={80} weight='600' spacing={0.1}>°C</Text>
          </Block>
          <Block flex={1} column>
            <Text caption>Humidity</Text>
            <Text size={40} height={80} color={'#0AC4BA'}>91%</Text>

            {/* <MyLineChart/> */}

          </Block>
        </Block> 

        <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
          <Block column space="between">
            <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('DSettings')}
              >
                <Block center middle style={styles.button}>
                  <LightIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    Light
                  </Text>
                </Block>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('DSettings', { name: 'ac' })}
              >
                <Block center middle style={styles.button}>
                  <ACIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    Crop Manual
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
            
            <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('DSettings', { name: 'temperature' })}
              >
                <Block center middle style={styles.button}>
                  <TempIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                   Weather
                  </Text>
                </Block>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={fetchData}
                // onPress={() => navigation.navigate('DSettings', { name: 'fan' })}
              >
                <Block center middle style={[styles.button, getButtonStyle()]}>
                  <FanIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    Motor
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>

            <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('DSettings', { name: 'wi-fi' })}
              >
                <Block center middle style={styles.button}>
                  <WiFiIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    Wi-Fi
                  </Text>
                </Block>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('DSettings', { name: 'electricity' })}
              >
                <Block center middle style={styles.button}>
                  <ElectricityIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    Power Supply
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
          </Block>
        </ScrollView>
      </Block>
   );
  };
  
  export default Dashboard;

const styles = StyleSheet.create({
  dashboard: {
    flex: 1,
    padding: theme.sizes.base * 1,
    marginBottom: -theme.sizes.base * 6,
    backgroundColor: 'white',
  },
  buttons: {
    flex: 1,
    marginBottom: -theme.sizes.base * 6,
    minHeight:600,
  },
  button: {
    backgroundColor: theme.colors.button,
    width: 151,
    height: 151,
    borderRadius: 151 / 2,
  },
  buttonOn: {
    backgroundColor: '#0AC4BA',
  },
})
