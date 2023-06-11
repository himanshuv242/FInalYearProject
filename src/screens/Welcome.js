import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  Animated,
  ScrollView,
} from 'react-native';
import * as theme from '../constants/Main/theme';
import { Button } from '../components/Main';
import LanguageModal from './LanguageModal';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {translation} from '../utils';

const { width, height } = Dimensions.get('window');

const Welcome = ({ navigation, illustrations }) => {
  const scrollX = new Animated.Value(0);
  const [langModalVisible, setLangModalVisible] = useState(false);
  const [selectedLang, setSelectedLang] = useState(0);

  const saveSelectedLang = async index => {
    await AsyncStorage.setItem('LANG', index + '');
  };



  const renderIllustrations = () => {
    return (
      <Animated.FlatList
        horizontal
        pagingEnabled
        scrollEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        snapToAlignment="center"
        data={illustrations}
        keyExtractor={(item) => `${item.id}`}
        renderItem={({ item }) => (
          <Image
            source={item.source}
            resizeMode="cover"
            style={{ width: width, height: height / 2, overflow: 'visible' }}
          />
        )}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
          useNativeDriver: true,
        })}
      />
    );
  };

  const renderDots = () => {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View style={[styles.dotContainer, styles.row, { justifyContent: 'center' }]}>
        {illustrations.map((item, index) => {
          const opacity = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [0.3, 1, 0.3],
            extrapolate: 'clamp',
          });
          return <Animated.View key={index} style={[styles.dots, { opacity }]} />;
        })}
      </View>
    );
  };

 

  return (
    <View style={[styles.container, styles.flex]}>
      <View style={styles.header}>
        <Text style={styles.headerText}>
        {selectedLang == 0
          ? translation[0].English
          : selectedLang == 1
          ? translation[0].Tamil
          : selectedLang == 2
          ? translation[0].Hindi
          : selectedLang == 3
          ? translation[0].Punjabi
          : selectedLang == 4
          ? translation[0].Urdu
          : null}
          <Text style={styles.headerTextBold}> {selectedLang == 0
          ? translation[1].English
          : selectedLang == 1
          ? translation[1].Tamil
          : selectedLang == 2
          ? translation[1].Hindi
          : selectedLang == 3
          ? translation[1].Punjabi
          : selectedLang == 4
          ? translation[1].Urdu
          : null}</Text>
        </Text>
        <Text style={styles.subHeaderText}>{selectedLang == 0
          ? translation[2].English
          : selectedLang == 1
          ? translation[2].Tamil
          : selectedLang == 2
          ? translation[2].Hindi
          : selectedLang == 3
          ? translation[2].Punjabi
          : selectedLang == 4
          ? translation[2].Urdu
          : null}</Text>
      </View>
      <ScrollView>
        <View style={styles.illustrations}>
          {renderIllustrations()}
          {renderDots()}
        </View>
        <View style={[styles.btnContainer, { marginHorizontal: theme.sizes.padding * 2 }]}>
          <Button gradient onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonText}>{selectedLang == 0
          ? translation[3].English
          : selectedLang == 1
          ? translation[3].Tamil
          : selectedLang == 2
          ? translation[3].Hindi
          : selectedLang == 3
          ? translation[3].Punjabi
          : selectedLang == 4
          ? translation[3].Urdu
          : null}</Text>
          </Button>
          <Button shadow onPress={() => navigation.navigate('Signup')}>
            <Text style={{
                  textAlign: 'center',
                  color: theme.colors.gray
                }}>{selectedLang == 0
                  ? translation[4].English
                  : selectedLang == 1
                  ? translation[4].Tamil
                  : selectedLang == 2
                  ? translation[4].Hindi
                  : selectedLang == 3
                  ? translation[4].Punjabi
                  : selectedLang == 4
                  ? translation[4].Urdu
                  : null}</Text>
          </Button>
          <Button onPress={() => {
          setLangModalVisible(!langModalVisible);
        }}>
            <Text style={{
                  textAlign: 'center',
                  color: theme.colors.gray
                }}>भाषा चुने</Text>
                <Text style={{
                  textAlign: 'center',
                  color: theme.colors.gray
                }}>زبان منتخب کریں۔</Text>
                <Text style={{
                      textAlign: 'center',
                      color: theme.colors.gray
                    }}>Select Language</Text>
          </Button>
        </View>
        {/* {LanguageModal()} */}
        <LanguageModal
        langModalVisible={langModalVisible}
        setLangModalVisible={setLangModalVisible}
        onSelectLang={x => {
          setSelectedLang(x);
          saveSelectedLang(x);
        }}
      />
      </ScrollView>
    </View>
  );
};

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
    flex: 2.5,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    color: theme.colors.black,
    fontSize: theme.fonts.h1,
  },
  headerTextBold: {
    color: theme.colors.primary,
    fontWeight: 'bold',
  },
  subHeaderText: {
    color: theme.colors.gray,
    fontSize: theme.fonts.h2,
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
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: theme.fonts.h1,
    color: theme.colors.gray,
    marginBottom: 80,
  },
  modalText: {
    color: theme.colors.gray,
    fontSize: theme.fonts.h2,
    marginVertical: 20,
    alignSelf:'center',
  },
  modalButton: {
    color: theme.colors.white,
    textAlign: 'center',
  },
  buttonText: {
    color: theme.colors.white,
    fontWeight: '500',
    textAlign: 'center',
  },
  icon:{
    width:24,
    height:24
  },
  languageItem:{
    flexDirection:'row'
  }
});

export default Welcome;
