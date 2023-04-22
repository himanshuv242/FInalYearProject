import React, { Component } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { LineChart, Path } from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import {Block, Text} from '../components/Dashboard/Index';
import * as theme from '../constants/Dashboard/theme';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MyLineChart from './MyLineChart';
 

class Dashboard extends Component {
  static navigationOptions = {
    header: null
  }
  render() {
 
    const LightIcon = ()=>(
        <MaterialCommunityIcons
          size={30}
          color={ theme.colors.accent}
          name="lightbulb-on-outline"
        />);
    const ACIcon =() => (
      <MaterialCommunityIcons
        size={30}
        color={ theme.colors.accent}
        name="air-conditioner"
      />
    );
    const TempIcon = ()=> (
      <MaterialCommunityIcons
        size={30}
        color={ theme.colors.accent}
        name="temperature-celsius"
      />
    );
    const FanIcon = ()=> (
      <MaterialCommunityIcons
        size={30}
        color={theme.colors.accent}
        name="fan"
   
      />
    );
    const WiFiIcon = ()=> (
      <FontAwesome
        size={30}
        color={theme.colors.accent}
        name="wifi"
      />
    );
    const ElectricityIcon = ()=> (
      <MaterialIcons
        size={30}
        color={theme.colors.accent}
        name="power"
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
            <Text caption>Humidity 20%</Text>
            <MyLineChart/>

          </Block>
        </Block> 

        <ScrollView contentContainerStyle={styles.buttons} showsVerticalScrollIndicator={false}>
          <Block column space="between">
            <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Settings', { name: 'light' })}
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
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Settings', { name: 'ac' })}
              >
                <Block center middle style={styles.button}>
                  <ACIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    AC
                  </Text>
                </Block>
              </TouchableOpacity>
            </Block>
            
            <Block row space="around" style={{ marginVertical: theme.sizes.base }}>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Settings', { name: 'temperature' })}
              >
                <Block center middle style={styles.button}>
                  <TempIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                   Temperature
                  </Text>
                </Block>
              </TouchableOpacity>
              
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Settings', { name: 'fan' })}
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
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Settings', { name: 'wi-fi' })}
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
                activeOpacity={0.8}
                onPress={() => navigation.navigate('Settings', { name: 'electricity' })}
              >
                <Block center middle style={styles.button}>
                  <ElectricityIcon size={38} />
                  <Text
                    button
                    style={{ marginTop: theme.sizes.base * 0.5 }}
                  >
                    Electricity
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
