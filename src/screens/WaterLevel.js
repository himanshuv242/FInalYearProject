import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WaterLevel = () => {
  const [waterLevel, setWaterLevel] = useState('');
  const [motorStatus, setMotorStatus] = useState('OFF');
  const [selectedLevel, setSelectedLevel] = useState('');
  const [isSetButtonDisabled, setIsSetButtonDisabled] = useState(true);
  const [inputStatus, setInputStatus] = useState('');

  useEffect(() => {

    
    const fetchData = async () => {
      try {
        const savedIPAddress = await AsyncStorage.getItem('ipAddress');
        if (selectedLevel === 'High' && waterLevel >= 500) {
          console.log("Inside High");
          handleMotorOn();
          setSelectedLevel(null);
        } else if (selectedLevel === 'Medium' && waterLevel >= 300) {
          console.log("Inside Medium");
          handleMotorOn();
          setSelectedLevel(null);
        } else if (selectedLevel === 'Low' && waterLevel>=150) {
          console.log("Inside Low");
          handleMotorOn();
          setSelectedLevel(null);
        }
        await axios.get('http://192.168.172.176/watersensor').then(response => {
          // console.log(response.data);
          const stringifiedData = JSON.stringify(response.data);
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
  }, [motorStatus, selectedLevel]);

  const handleMotorOn = async () => {
    try {
      const savedIPAddress = await AsyncStorage.getItem('ipAddress');
      // console.log(`IP address is ${savedIPAddress}`);
      
      await axios.get(`http://192.168.172.176/led`).then(response => {
        // console.log(response.data);
        const stringifiedData = JSON.stringify(response.data);
        if (stringifiedData === '"LED ON"') {
          setMotorStatus('ON');
        } else if (stringifiedData === '"LED OFF"') {
          setMotorStatus('OFF');
        }
        console.log(motorStatus);
      })
      .catch(error => {
        console.log(error);
        Alert.alert('Unable to connect!', 'Please check your connection to the module.');
      });
      // await axios.get('http://192.168.170.177/led');
      // console.log('Motor switch request sent successfully');
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
    if (selectedLevel) {
      handleMotorOn();
      setIsSetButtonDisabled(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.waterLevelText}>Water Level: {waterLevel}</Text>
      <Text style={styles.motorStatusText}>Motor Status: {motorStatus}</Text>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.levelButton,
            selectedLevel === 'High' && styles.selectedLevelButton,
          ]}
          onPress={() => handleSetWaterLevel('High')}
        >
          <Text style={styles.levelButtonText}>High</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.levelButton,
            selectedLevel === 'Medium' && styles.selectedLevelButton,
          ]}
          onPress={() => handleSetWaterLevel('Medium')}
        >
          <Text style={styles.levelButtonText}>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.levelButton,
            selectedLevel === 'Low' && styles.selectedLevelButton,
          ]}
          onPress={() => handleSetWaterLevel('Low')}
        >
          <Text style={styles.levelButtonText}>Low</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.actionButton,
          motorStatus === 'Off' && styles.turnOnButton,
          isSetButtonDisabled && styles.disabledButton,
        ]}
        onPress={handleSetButtonClick}
        disabled={isSetButtonDisabled}
      >
        <Text style={styles.actionButtonText}>Set</Text>
      </TouchableOpacity>

      {inputStatus !== '' && (
        <Text style={styles.inputStatus}>{inputStatus}</Text>
      )}

      {motorStatus === 'Off' && (
        <Text style={styles.message}>Motor is currently off</Text>
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#07121B',
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
});

export default WaterLevel;
