import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Block} from '../components/Dashboard/Index';
import * as theme from '../constants/Dashboard/theme';
import SoundPlayer from 'react-native-sound-player';
import {translation} from '../utils';

const WaterLevel = () => {
  const [waterLevel, setWaterLevel] = useState('');
  const [isMotorOn, setIsMotorOn] = useState('');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isSetButtonDisabled, setIsSetButtonDisabled] = useState(true);
  const [inputStatus, setInputStatus] = useState('');
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(()=>{
    getLang();
  },[])

  const getLang=async()=>{
    setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')));
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const savedIPAddress = await AsyncStorage.getItem('ipAddress');
        await axios.get(`http://${savedIPAddress}/watersensor`).then(response => {
          // console.log(response.data);
          const stringifiedData = JSON.stringify(response.data);
          if (selectedLevel === 'High' && stringifiedData >= 300) {
            console.log("Inside High");
            motor();
            setSelectedLevel(null);
          } else if (selectedLevel === 'Medium' && stringifiedData >= 200) {
            console.log("Inside Medium");
            motor();
            setSelectedLevel(null);
          } else if (selectedLevel === 'Low' && stringifiedData>=100) {
            console.log("Inside Low");
            motor();
            setSelectedLevel(null);
          }
          setWaterLevel(stringifiedData);
        })
        .catch(error => {
          console.log(error);
          // Alert.alert('Unable to connect!', 'Please check your connection to the module.');
        });
        // await axios.get('http://192.168.170.177/led');
        // console.log('API request sent successfully');
        // Handle any necessary UI updates or actions
      } catch (error) {
        console.error('Failed to send API request', error);
        // Handle any errors that occurred during the request
      }
    };

    const interval = setInterval(fetchData, 500); // Fetch data every .5 seconds
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [isMotorOn, selectedLevel]);

  const motor = async () => {
    try {
      const savedIPAddress = await AsyncStorage.getItem('ipAddress');
      // console.log(`IP address is ${savedIPAddress}`);
      
      await axios.get(`http://${savedIPAddress}/led`).then(response => {
        // console.log(response.data);http://${savedIPAddress}/led
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


  const handleSetWaterLevel = (level) => {
    setSelectedLevel(level);
    setIsSetButtonDisabled(false);
    setInputStatus(`Selected level: ${level}`);
  };

  const handleSetButtonClick = () => {
    
    if (selectedLevel && isMotorOn!=='') {
      motor();
      setIsSetButtonDisabled(true);
    }
    else
    {
      Alert.alert(`${selectedLang == 0
        ? translation[48].English
        : selectedLang == 1
        ? translation[48].Telugu
        : selectedLang == 2
        ? translation[48].Hindi
        : selectedLang == 3
        ? translation[48].Punjabi
        : selectedLang == 4
        ? translation[48].Urdu
        : null}`, `${selectedLang == 0
          ? translation[49].English
          : selectedLang == 1
          ? translation[49].Telugu
          : selectedLang == 2
          ? translation[49].Hindi
          : selectedLang == 3
          ? translation[49].Punjabi
          : selectedLang == 4
          ? translation[49].Urdu
          : null}`);
    }
  };

  const handleMotorButtonClick = () => {
    setSelectedLevel('');
    setInputStatus('');
    motor();
  };


  const FanIcon = () => (
    <Image
      source={require('../assets/icons/fan.png')}
      style={{ width: 32, height: 32 }}
    />
  );

  const getMotorStyle = () => {
    // Conditionally return the style based on the LED status
    if (isMotorOn === 'LED ON') {
      return styles.motorButton;
    } else if (isMotorOn === 'LED OFF') {
      return styles.buttonOn;
    } else {
      return styles.motorButton;
    }
  };


  return (
    <View style={styles.container}>
      <Text style={styles.waterLevelText}>{selectedLang == 0
          ? translation[50].English
          : selectedLang == 1
          ? translation[50].Telugu
          : selectedLang == 2
          ? translation[50].Hindi
          : selectedLang == 3
          ? translation[50].Punjabi
          : selectedLang == 4
          ? translation[50].Urdu
          : null}: {waterLevel}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.levelButton,
            selectedLevel === 'High' && styles.selectedLevelButton,
          ]}
          onPress={() => handleSetWaterLevel('High')}
          disabled={ isMotorOn==='LED OFF'}
        >
          <Text style={styles.levelButtonText}>{selectedLang == 0
          ? translation[58].English
          : selectedLang == 1
          ? translation[58].Telugu
          : selectedLang == 2
          ? translation[58].Hindi
          : selectedLang == 3
          ? translation[58].Punjabi
          : selectedLang == 4
          ? translation[58].Urdu
          : null}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.levelButton,
            selectedLevel === 'Medium' && styles.selectedLevelButton,
          ]}
          onPress={() => handleSetWaterLevel('Medium')}
          disabled={ isMotorOn==='LED OFF'}
        >
          <Text style={styles.levelButtonText}>{selectedLang == 0
          ? translation[59].English
          : selectedLang == 1
          ? translation[59].Telugu
          : selectedLang == 2
          ? translation[59].Hindi
          : selectedLang == 3
          ? translation[59].Punjabi
          : selectedLang == 4
          ? translation[59].Urdu
          : null}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.levelButton,
            selectedLevel === 'Low' && styles.selectedLevelButton,
          ]}
          onPress={() => handleSetWaterLevel('Low')}
          disabled={ isMotorOn==='LED OFF'}
        >
          <Text style={styles.levelButtonText}>{selectedLang == 0
          ? translation[60].English
          : selectedLang == 1
          ? translation[60].Telugu
          : selectedLang == 2
          ? translation[60].Hindi
          : selectedLang == 3
          ? translation[60].Punjabi
          : selectedLang == 4
          ? translation[60].Urdu
          : null}</Text>
        </TouchableOpacity>
      </View>

{/* SET */}
      <TouchableOpacity
        // style={[
        //   styles.actionButton,
        //   isMotorOn === 'Off' && styles.turnOnButton,
        //   isSetButtonDisabled && styles.disabledButton,
        // ]}
        style={[styles.actionButton, { opacity: (isSetButtonDisabled || isMotorOn==='LED OFF')? 0.5 : 1 }]}
        onPress={handleSetButtonClick}
        disabled={isSetButtonDisabled || isMotorOn==='LED OFF'}
      >
        <Text style={styles.actionButtonText}>{selectedLang == 0
          ? translation[61].English
          : selectedLang == 1
          ? translation[61].Telugu
          : selectedLang == 2
          ? translation[61].Hindi
          : selectedLang == 3
          ? translation[61].Punjabi
          : selectedLang == 4
          ? translation[61].Urdu
          : null}</Text>
      </TouchableOpacity>

{/* MOTOR */}
      <TouchableOpacity
                activeOpacity={0.5}
                onPress={handleMotorButtonClick}
              >
                <Block center middle style={[styles.motorButton, getMotorStyle()]}>
                  <FanIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5, color:'black', fontWeight:'bold' }}
                  >
                    {selectedLang == 0
          ? translation[56].English
          : selectedLang == 1
          ? translation[56].Telugu
          : selectedLang == 2
          ? translation[56].Hindi
          : selectedLang == 3
          ? translation[56].Punjabi
          : selectedLang == 4
          ? translation[56].Urdu
          : null}
                  </Text>
                </Block>
              </TouchableOpacity>

      {inputStatus !== '' && (
        <Text style={styles.inputStatus}>{inputStatus}</Text>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00192e',
    padding: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  levelButton: {
    flex: 1,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#007AFF',
    marginHorizontal: 5,
  },
  selectedLevelButton: {
    backgroundColor: '#FF851B',
  },
  levelButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionButton: {
    height: 50,
    width: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#007AFF',
    marginBottom:10
  },
  turnOnButton: {
    backgroundColor: '#FF0000',
  },
  disabledButton: {
    opacity: 0.5,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  message: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  inputStatus: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  waterLevelText: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: '#007AFF',
    marginBottom: 20,
  },
  motorStatusText: {
    fontSize: 24,
    fontWeight: 'bold',
    // color: '#FF0000',
    marginBottom: 20,
  },
  motorButton: {
    backgroundColor: theme.colors.button,
    width: 100,
    height: 100,
    borderRadius: 151 / 2,
    borderWidth: 5,
    borderColor: "#89AAFF",
    marginTop:10
  },
  buttonOn: {
    backgroundColor: '#FF851B',
  },
});

export default WaterLevel;
