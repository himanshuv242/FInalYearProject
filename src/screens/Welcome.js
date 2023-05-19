import React, {Component} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  ScrollView,
  Modal,
} from 'react-native';
import * as theme from '../constants/Main/theme';
import {Button} from '../components/Main';

const {width, height} = Dimensions.get('window');

export default class Welcome extends Component {
  scrollX = new Animated.Value(0);

  state = {
    isShowTerm: false,
  };

  renderIllustrations = () => {
    const {illustrations} = this.props;
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        keyExtractor={(item, index) => `${item.id}`}
        renderItem={({item}) => (
          <Image
            source={item.source}
            resizeMode="cover"
            style={{width: width, height: height / 2, overflow: 'visible'}}
          />
        )}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: this.scrollX}}}],
          {useNativeDriver: true},
        )}
      />
    );
  };

  renderDots = () => {
    const {illustrations} = this.props;
    const dotPosition = Animated.divide(this.scrollX, width);
    return (
      <View
        style={[styles.dotContainer, styles.row, {justifyContent: 'center'}]}>
        {illustrations.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View key={index} style={[styles.dots, {opacity}]} />;
        })}
      </View>
    );
  };

  renderTermServiceModal = () => {
    return (
      <Modal visible={this.state.isShowTerm} animationType="slide">
        <View style={[styles.flex, styles.modal]}>
          <Text
            style={{
              fontSize: theme.fonts.h1,
              color: theme.colors.gray,
              marginBottom: 80,

            }}>
            Choose your Language
          </Text>
          <ScrollView>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.h2,
                marginVertical: 20,
              }}>
              1. English
            </Text>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.h2,
                marginVertical: 20,
              }}>
              2. Hindi
            </Text>
            <Text
              style={{
                color: theme.colors.gray,
                fontSize: theme.fonts.h2,
                marginVertical: 20,
              }}>
              3. Urdu
            </Text>
            
          </ScrollView>
          <View>
            <Button gradient onPress={() => this.setState({isShowTerm: false})}>
              <Text style={{color: theme.colors.white, textAlign: 'center'}}>
                I Understand
              </Text>
            </Button>
          </View>
        </View>
      </Modal>
    );
  };
  
  render() {
    const {navigation} = this.props;

    return (
      <View style={[styles.container, styles.flex]}>
        <View style={styles.header}>
          <Text style={{color: theme.colors.black, fontSize: theme.fonts.h1}}>
            Your Farm.
            <Text style={{color: theme.colors.primary, fontWeight: 'bold'}}>
              {'  '}Greener.
            </Text>
          </Text>
          <Text
            style={{
              color: theme.colors.gray,
              fontSize: theme.fonts.h2,
            }}>
            Enjoy the experience.
          </Text>
        </View>
        <ScrollView>
          <View style={styles.illustrations}>
            {this.renderIllustrations()}
            {this.renderDots()}
          </View>
          <View
            style={[
              styles.btnContainer,
              {marginHorizontal: theme.sizes.padding * 2},
            ]}>
            <Button gradient onPress={() => navigation.navigate('Login')}>
              <Text
                style={{
                  color: theme.colors.white,
                  fontWeight: '500',
                  textAlign: 'center',
                }}>
                Login
              </Text>
            </Button>
            <Button shadow onPress={() => navigation.navigate('Signup')}>
              <Text
                style={{
                  textAlign: 'center',
                  color: theme.colors.gray
                }}>
                Signup
              </Text>
            </Button>
            <Button onPress={() => this.setState({isShowTerm: true})}>
              <Text
                style={{
                  textAlign: 'center',
                  color: theme.colors.gray,
                }}>
                Select Language
              </Text>
            </Button>
          </View>
          {this.renderTermServiceModal()}
        </ScrollView>
      </View>
    );
  }
}

Welcome.defaultProps = {
  illustrations: [
    {
      id: 1,
      source: require('../assets/images/illustration_1.png'),
    },
    {
      id: 2,
      source: require('../assets/images/illustration_2.png'),
    },
    {
      id: 3,
      source: require('../assets/images/illustration_3.png'),
    },
  ],
};

const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
  },
  container: {
    backgroundColor: theme.colors.white,
  },
  header: {
    flex: 2,
    paddingVertical:15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  illustrations: {
    flex: 6,

  },
  btnContainer: {
    flex: 2,
 
  },
  dotContainer: {
    position: 'absolute',
    bottom: theme.sizes.base * 3,
    left: 0,
    right: 0,
  },
  dots: {
    width: 5,
    height: 5,
    borderRadius: 5,
    marginHorizontal: 2.5,
    backgroundColor: theme.colors.gray,
  },
  modal: {
    height: height * 0.8,
    paddingVertical: theme.sizes.padding * 2,
    paddingHorizontal: theme.sizes.padding,
    alignItems:'center'
  },
});

// BUG: Cannot use package React-native-text-gradient
// --> Error: Text string must be render in Text Component
