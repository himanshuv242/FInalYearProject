import React, { useState,useEffect } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity,Image,Alert, } from 'react-native';
import {Block, Text} from '../components/Dashboard/Index';
import * as theme from '../constants/Dashboard/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SoundPlayer from 'react-native-sound-player';
import { fetchWeatherForecast } from '../../api/weather';
import { getData} from '../../utils/asyncStorage';
 

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
  const Timer = () => (
    <Image
      source={require('../assets/icons/stopwatch.png')}
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
  const [isLightOn, setIsLightOn] = useState('');
  const [weather, setWeather] = useState({});
  const [moistureLevel, setMoistureLevel] = useState('');
  const {current } = weather;

  //fetch current city weather data
  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Srinagar';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '1',
    }).then((data) => {
      console.log(data);
      setWeather(data);
    });
  };
  useEffect(() => {
    fetchMyWeatherData();
  }, []);

  // for fetching moisture level every .5 second
  useEffect(() => {

    const fetchData = async () => {
      try {
        const savedIPAddress = await AsyncStorage.getItem('ipAddress');
        await axios.get(`http://${savedIPAddress}/soilsensor`).then(response => {
          // console.log(response.data);
          const stringifiedData = JSON.stringify(response.data);
          const value= Math.round(((1024-stringifiedData)/1024)*100);

          setMoistureLevel(value);
        })
        .catch(error => {
          console.log(error);
        });

      } catch (error) {
        console.error('Failed to send API request', error);
      }
    };

    const interval = setInterval(fetchData, 500); // Fetch data every .5 seconds
    // console.log(waterLevel);
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);
  
//API call for switching motor
  const motor = async () => {
    try {
      const savedIPAddress = await AsyncStorage.getItem('ipAddress');
      // console.log(`IP address is ${savedIPAddress}`);
      
      await axios.get(`http://${savedIPAddress}/led`).then(response => {
        // console.log(response.data);
        const stringifiedData = JSON.stringify(response.data);
        if (stringifiedData === '"LED ON"') {
          SoundPlayer.playSoundFile('on', 'mp3');
          setIsMotorOn('LED OFF');
        } else if (stringifiedData === '"LED OFF"') {
          SoundPlayer.playSoundFile('off', 'mp3');
          setIsMotorOn('LED ON');
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Unable to connect!', 'Please check your connection to the module.');
      });
      // await axios.get('http://192.168.170.177/led');
      console.log('Motor switched successfully');
      // Handle any necessary UI updates or actions
    } catch (error) {
      console.error('Failed to send API request', error);
      // Handle any errors that occurred during the request
    }
  };

//API call for switching light
  const light = async () => {
    try {
      const savedIPAddress = await AsyncStorage.getItem('ipAddress');
      // console.log(`IP address is ${savedIPAddress}`);
      
      await axios.get(`http://${savedIPAddress}/light`).then(response => {
        // console.log(response.data);
        const stringifiedData = JSON.stringify(response.data);
        if (stringifiedData === '"Light ON"') {
          setIsLightOn('Light OFF');
        } else if (stringifiedData === '"Light OFF"') {
          setIsLightOn('Light ON');
        }
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Unable to connect!', 'Please check your connection to the module.');
      });
      // await axios.get('http://192.168.170.177/led');
      console.log('Light switched successfully');
      // Handle any necessary UI updates or actions
    } catch (error) {
      console.error('Failed to send API request', error);
      // Handle any errors that occurred during the request
    }
  };

//for setting motor button style as per switching status
  const getMotorStyle = () => {
    // Conditionally return the style based on the LED status
    if (isMotorOn === 'LED ON') {
      return styles.button;
    } else if (isMotorOn === 'LED OFF') {
      return styles.buttonOn;
    } else {
      return styles.button;
    }
  };

  //for setting light button style as per switching status
  const getLightStyle = () => {
    // Conditionally return the style based on the LED status
    if (isLightOn === 'Light ON') {
      return styles.button;
    } else if (isLightOn === 'Light OFF') {
      return styles.buttonOn;
    } else {
      return styles.button;
    }
  };





  return (
      <Block style={styles.dashboard}>
         <Block column style={{ marginTop: theme.sizes.base }}>
          <Text welcome>Hi,</Text>
          <Text name>Himanshu</Text>
        </Block>
        
        <Block row style={{ paddingVertical: 5 }}>
        <Block flex={1} column>
        {/* <Text caption >Srinagar</Text> */}
          <Block flex={1.5} row style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 70, fontWeight: 'bold', color: 'black',}}>
    {current?.temp_c}
  </Text>
            <Text h1 size={34} height={80} weight='600' spacing={0.1}>°C</Text>
          </Block>
          </Block>
          
          <Block flex={1} column style={{alignItems:'center'}}>
            <Text caption >Soil Moisture</Text>
            <Text size={40} height={80} color={'#0AC4BA'}>{moistureLevel}%</Text>
          </Block>
        </Block> 

        <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
          <Block column space="between">
            <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={light}
              >
                <Block center middle style={[styles.button, getLightStyle()]}>
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
                onPress={() => navigation.navigate('Crop Manual')}
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
                onPress={() => navigation.navigate('Weather Forecasting')}
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
                onPress={motor}
              >
                <Block center middle style={[styles.button, getMotorStyle()]}>
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
                onPress={() => navigation.navigate('Motor Timer')}
              >
                <Block center middle style={styles.button}>
                  <Timer size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    Motor Timer
                  </Text>
                </Block>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.5}
                // onPress={() => navigation.navigate('DSettings', { name: 'electricity' })}
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
