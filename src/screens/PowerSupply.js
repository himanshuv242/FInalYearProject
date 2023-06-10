import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet,  Alert } from 'react-native';
import LottieView from "lottie-react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const PowerSupplyScreen = () => {
  const [isSolarSupply, setIsSolarSupply] = useState(false);


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
        Alert.alert('Unable to connect!', 'Please check your connection to the module.');
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
      <Text style={styles.title}>Power Supply</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.label}>Direct Supply</Text>
        <Switch
          value={isSolarSupply}
          onValueChange={supply}
          trackColor={{ false: '#D9D9D9', true: '#2DAF7D' }}
          thumbColor={isSolarSupply ? '#FFFFFF' : '#FFFFFF'}
        />
        <Text style={styles.label}>Solar Supply</Text>
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
          {isSolarSupply ? 'Solar Power Supply Details' : 'Direct Supply Details'}
        </Text>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Supplied Voltage:</Text>
          <Text style={styles.detailValue}>12V</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Supplied Current:</Text>
          <Text style={styles.detailValue}>5A</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Battery Status:</Text>
          <Text style={styles.detailValue}>80%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Charging Status:</Text>
          <Text style={styles.detailValue}>Connected</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Efficiency:</Text>
          <Text style={styles.detailValue}>90%</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Availability:</Text>
          <Text style={styles.detailValue}>
            {isSolarSupply ? 'Sunlight Dependent' : 'Continuous'}
          </Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.detailLabel}>Environmental Impact:</Text>
          <Text style={styles.detailValue}>
            {isSolarSupply ? 'Renewable, Reduced Carbon Footprint' : 'Dependent on Power Grid'}
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
  },
});

export default PowerSupplyScreen;
