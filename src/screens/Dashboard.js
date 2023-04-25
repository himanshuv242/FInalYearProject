import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity,Image } from 'react-native';
import {Block, Text} from '../components/Dashboard/Index';
import * as theme from '../constants/Dashboard/theme';

 

class Dashboard extends Component {
  static navigationOptions = {
    header: null
  }
  render() {
    const {navigation} = this.props;
 
    const LightIcon = ()=>(
      <Image
      source={require('../assets/icons/bulb.png')}
      style={{ width: 32, height: 32 }}
    />);
    const ACIcon =() => (
      <Image
      source={require('../assets/icons/crop.png')}
      style={{ width: 32, height: 32 }}
    />
    );
    const TempIcon = ()=> (
      <Image
      source={require('../assets/icons/weather.png')}
      style={{ width: 32, height: 32 }}
    />)
    ;
    const FanIcon = ()=> (
      <Image
      source={require('../assets/icons/fan.png')}
      style={{ width: 32, height: 32 }}
    />
    );
    const WiFiIcon = ()=> (
      <Image
      source={require('../assets/icons/wifi.png')}
      style={{ width: 32, height: 32 }}
    />
    );
    const ElectricityIcon = ()=> (
      <Image
      source={require('../assets/icons/supply.png')}
      style={{ width: 32, height: 32 }}
    />
    );

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
                onPress={() => navigation.navigate('DSettings', { name: 'fan' })}
              >
                <Block center middle style={styles.button}>
                  <FanIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    Fan
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
    )
  }
}




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
  }
})
