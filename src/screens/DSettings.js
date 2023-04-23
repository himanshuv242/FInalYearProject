import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Slider has been extracted']);

import React, { Component } from 'react'
import { StyleSheet, TouchableWithoutFeedback, Slider } from 'react-native'
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import * as theme from '../constants/Dashboard/theme';
import { Block, Text, PanSlider } from '../components/Dashboard/Index';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class DSettings extends Component {
  static navigationOptions = {
    headerLeft: ({ onPress }) => (
      <TouchableWithoutFeedback onPress={() => onPress()}>
        <FontAwesome size={theme.sizes.font * 1.5} color={theme.colors.black} name="arrow-left" />
      </TouchableWithoutFeedback>
    ),
    headerLeftContainerStyle: {
      paddingLeft: theme.sizes.base * 2
    },
    headerStyle: {
      borderBottomColor: 'transparent',
    }
  };

  state = {
    direction: 45,
    speed: 12,
  }

  renderController() {
    return (
      <Block flex={1} right style={styles.controller}>
        <Block center style={styles.controllerValue}>
          <Text color="white">34</Text>
        </Block>
        <Block flex={0.8} style={[styles.controllerOverlay]} />
      </Block>
    )
  }

  render() {
    const { navigation } = this.props;
    // const name = App.getParam('name');
    const Icon = () => (
      <MaterialCommunityIcons
        size={30}
        color={ theme.colors.accent}
        name="air-conditioner"
      />
    );
    
    return (
      <Block flex={1} style={styles.settings}>
         <Block flex={0.5} row>
          <Block column>
             <Icon size={theme.sizes.font * 4} color={theme.colors.gray2} /> 
             <Block flex={1.2} row style={{ alignItems: 'flex-end', }}>
              <Text h1>27</Text>
              <Text h1 size={34} height={80} weight={'600'} spacing={0.1}>°C</Text>
            </Block> 
            <Text caption>Temperature</Text>
          </Block>
          <Block flex={1} center>
            <PanSlider />
          </Block>
        </Block>
        
        <Block flex={1} style={{ paddingTop: theme.sizes.base * 2 }}>
          <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
            <Block row space="between">
              <Text welcome color="black">Direction</Text>
              <Text welcome color="black">{this.state.direction}</Text>
            </Block>
            <Slider
              value={45}
              mininumValue={0}
              maximumValue={90}
              thumbTintColor={theme.colors.accent}
              minimumTrackTintColor={theme.colors.accent}
              maximumTrackTintColor={theme.colors.gray2}
              onValueChange={value => this.setState({ direction: parseInt(value, 10) })}
            />
          </Block>
          
          <Block column style={{ marginVertical: theme.sizes.base * 2 }}>
            <Block row space="between">
              <Text welcome color="black">Speed</Text>
              <Text welcome color="black">{this.state.speed}</Text>
            </Block>
            <Slider
              value={12}
              minimumValue={0}
              maximumValue={30}
              thumbTintColor={theme.colors.accent}
              minimumTrackTintColor={theme.colors.accent}
              maximumTrackTintColor={theme.colors.gray2}
              onValueChange={value => this.setState({ speed: parseInt(value, 10) })}
            />
          </Block>
        </Block>
      </Block>
    )
  }
}


export default DSettings;

const styles = StyleSheet.create({
  settings: {
    padding: theme.sizes.base * 2,
    backgroundColor:'white'
  },
  slider: {

  }
})