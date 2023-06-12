import React, { useState,useEffect } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity,Image,Alert, Switch } from 'react-native';
import {Block, Text} from '../components/Dashboard/Index';
import * as theme from '../constants/Dashboard/theme';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SoundPlayer from 'react-native-sound-player';
import { fetchWeatherForecast } from '../../api/weather';
import { getData} from '../../utils/asyncStorage';
import PushNotification from 'react-native-push-notification';
import {translation} from '../utils';
 

const Dashboard = ({ navigation }) => {

  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(()=>{
    getLang();
  },[])

  const getLang=async()=>{
    setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')));
  }

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
  const [moistureLevel, setMoistureLevel] = useState('73');
  const {current } = weather;
  const [isSwitchOn, setIsSwitchOn] = useState(false);
const [isPlaying, setIsPlaying] = useState(false);


  //fetch current city weather data
  const fetchMyWeatherData = async () => {
    let myCity = await getData('city');
    let cityName = 'Srinagar';
    if (myCity) {
      cityName = myCity;
    }
    fetchWeatherForecast({
      cityName,
      days: '7',
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

  //Check for upcoming rainy day
  const checkRainyWeather = (forecast) => {
    const rainyDays = forecast.forecastday.filter((day) => {
      // Adjust the condition according to your weather data
      return day.day.condition.text.includes('rain');
    });
  
    if (rainyDays.length > 0) {
      // Send local notification
      PushNotification.localNotification({
        channelId: 'my-channel-id', // Replace with your desired channel ID
        title: `${selectedLang == 0
          ? translation[19].English
          : selectedLang == 1
          ? translation[19].Telugu
          : selectedLang == 2
          ? translation[19].Hindi
          : selectedLang == 3
          ? translation[19].Punjabi
          : selectedLang == 4
          ? translation[19].Urdu
          : null}`,
        message: `${selectedLang == 0
          ? translation[20].English
          : selectedLang == 1
          ? translation[20].Telugu
          : selectedLang == 2
          ? translation[20].Hindi
          : selectedLang == 3
          ? translation[20].Punjabi
          : selectedLang == 4
          ? translation[20].Urdu
          : null}`,
      });
    }
    else {
      PushNotification.localNotification({
        channelId: 'my-channel-id', // Replace with your desired channel ID
        title: `${selectedLang == 0
          ? translation[21].English
          : selectedLang == 1
          ? translation[21].Telugu
          : selectedLang == 2
          ? translation[21].Hindi
          : selectedLang == 3
          ? translation[21].Punjabi
          : selectedLang == 4
          ? translation[21].Urdu
          : null}`,
        message: `${selectedLang == 0
          ? translation[22].English
          : selectedLang == 1
          ? translation[22].Telugu
          : selectedLang == 2
          ? translation[22].Hindi
          : selectedLang == 3
          ? translation[22].Punjabi
          : selectedLang == 4
          ? translation[22].Urdu
          : null}`,
      });
    }
  };
   // Check for rainy weather
  useEffect(() => {
    if (weather.forecast && weather.forecast.forecastday) {
      checkRainyWeather(weather.forecast);
    }
  }, [weather]);

  const playSound = () => {
    setIsSwitchOn(true);
    setIsPlaying(true);
    if(!isSwitchOn)
    {
      SoundPlayer.playSoundFile('tour', 'mp3');
    }
    setTimeout(() => {
      setIsPlaying(false);
      setIsSwitchOn(false);
    }, 73000);

};



  return (
      <Block style={styles.dashboard}>
         <Block row style={{ marginTop: theme.sizes.base }}>
         <Block column flex={1} >
          <Text welcome style={{alignSelf: 'flex-start', paddingVertical:3}}>{selectedLang == 0
          ? translation[25].English
          : selectedLang == 1
          ? translation[25].Telugu
          : selectedLang == 2
          ? translation[25].Hindi
          : selectedLang == 3
          ? translation[25].Punjabi
          : selectedLang == 4
          ? translation[25].Urdu
          : null},</Text>
          <Text name style={{alignSelf: 'flex-start' , paddingVertical:3}}>Himanshu</Text>
        </Block>

         <Block  style={{alignItems: 'flex-end' }}>
           <Text welcome style={{fontSize:15, alignSelf:'center',paddingVertical:3}}>{selectedLang == 0
          ? translation[27].English
          : selectedLang == 1
          ? translation[27].Telugu
          : selectedLang == 2
          ? translation[27].Hindi
          : selectedLang == 3
          ? translation[27].Punjabi
          : selectedLang == 4
          ? translation[27].Urdu
          : null}</Text>
        <Switch
          value={isSwitchOn}
          onValueChange={playSound}
          trackColor={{ false: '#D9D9D9', true: '#2DAF7D' }}
          thumbColor={true ? '#FFFFFF' : '#FFFFFF'}
          disabled={isPlaying}
          style={{ opacity: (isPlaying)? 0.5 : 1 }}
          />
          </Block>
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
            <Text caption style={{paddingVertical:3}} >{selectedLang == 0
          ? translation[28].English
          : selectedLang == 1
          ? translation[28].Telugu
          : selectedLang == 2
          ? translation[28].Hindi
          : selectedLang == 3
          ? translation[28].Punjabi
          : selectedLang == 4
          ? translation[28].Urdu
          : null}</Text>
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
                    style={{ marginTop: theme.sizes.base * 0.5,paddingVertical:3 }}
                  >
                   {selectedLang == 0
          ? translation[29].English
          : selectedLang == 1
          ? translation[29].Telugu
          : selectedLang == 2
          ? translation[29].Hindi
          : selectedLang == 3
          ? translation[29].Punjabi
          : selectedLang == 4
          ? translation[29].Urdu
          : null}
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
                    style={{ marginTop: theme.sizes.base * 0.5,paddingVertical:3 }}
                  >
                    {selectedLang == 0
          ? translation[30].English
          : selectedLang == 1
          ? translation[30].Telugu
          : selectedLang == 2
          ? translation[30].Hindi
          : selectedLang == 3
          ? translation[30].Punjabi
          : selectedLang == 4
          ? translation[30].Urdu
          : null}
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
                    style={{ marginTop: theme.sizes.base * 0.5,paddingVertical:3 }}
                  >
                   {selectedLang == 0
          ? translation[31].English
          : selectedLang == 1
          ? translation[31].Telugu
          : selectedLang == 2
          ? translation[31].Hindi
          : selectedLang == 3
          ? translation[31].Punjabi
          : selectedLang == 4
          ? translation[31].Urdu
          : null}
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
                    style={{ marginTop: theme.sizes.base * 0.5,paddingVertical:3 }}
                  >
                    {selectedLang == 0
          ? translation[32].English
          : selectedLang == 1
          ? translation[32].Telugu
          : selectedLang == 2
          ? translation[32].Hindi
          : selectedLang == 3
          ? translation[32].Punjabi
          : selectedLang == 4
          ? translation[32].Urdu
          : null}
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>

            <Block row space="around" style={{ marginVertical: theme.sizes.base}}>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Motor Timer')}
              >
                <Block center middle style={styles.button}>
                  <Timer size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5,paddingVertical:3 }}
                  >
                    {selectedLang == 0
          ? translation[33].English
          : selectedLang == 1
          ? translation[33].Telugu
          : selectedLang == 2
          ? translation[33].Hindi
          : selectedLang == 3
          ? translation[33].Punjabi
          : selectedLang == 4
          ? translation[33].Urdu
          : null}
                  </Text>
                </Block>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => navigation.navigate('Electricity')}
              >
                <Block center middle style={styles.button}>
                  <ElectricityIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5,paddingVertical:3 }}
                  >
                    {selectedLang == 0
          ? translation[34].English
          : selectedLang == 1
          ? translation[34].Telugu
          : selectedLang == 2
          ? translation[34].Hindi
          : selectedLang == 3
          ? translation[34].Punjabi
          : selectedLang == 4
          ? translation[34].Urdu
          : null}
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
