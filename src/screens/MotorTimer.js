import React, { useState,useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import TimerComponent from './Timer';
import WaterLevelComponent from './WaterLevel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translation} from '../utils';

const ContainerComponent = () => {
  const [isTimerActive, setIsTimerActive] = useState(true);
  const [selectedLang, setSelectedLang] = useState(0);

  useEffect(()=>{
    getLang();
  },[])

  const getLang=async()=>{
    setSelectedLang(parseInt(await AsyncStorage.getItem('LANG')));
  }

  const toggleComponent = () => {
    setIsTimerActive(!isTimerActive);
  };

  return (
    <View style={styles.container}>
      <View style={styles.componentContainer}>
        {isTimerActive ? <TimerComponent /> : <WaterLevelComponent />}
      </View>

      <TouchableOpacity
        style={styles.slideButton}
        onPress={toggleComponent}
      >
        <Text style={styles.slideButtonText}>
          {isTimerActive ? `${selectedLang == 0
          ? translation[50].English
          : selectedLang == 1
          ? translation[50].Telugu
          : selectedLang == 2
          ? translation[50].Hindi
          : selectedLang == 3
          ? translation[50].Punjabi
          : selectedLang == 4
          ? translation[50].Urdu
          : null}` : `${selectedLang == 0
            ? translation[62].English
            : selectedLang == 1
            ? translation[62].Telugu
            : selectedLang == 2
            ? translation[62].Hindi
            : selectedLang == 3
            ? translation[62].Punjabi
            : selectedLang == 4
            ? translation[62].Urdu
            : null}`}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  componentContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  slideButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#2F80ED',
  },
  slideButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default ContainerComponent;
