import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, ScrollView , } from 'react-native';
import cropData from '../cropData';
const YourComponent = () => {
  const [activeAccordion, setActiveAccordion] = useState(null);

  const toggleAccordion = (index) => {
    setActiveAccordion(index === activeAccordion ? null : index);
  };
  
  const [crops, setCrops] = useState([]);

  useEffect(() => {
    // Fetch and set the crop data
    setCrops(cropData);
  }, []);

  return (
    <View style={styles.container}>
        <Text style={styles.heading}>Know more about your crop :)</Text>
        <ScrollView >
      {crops.map((crop, index) => (
        <View key={index} style={[styles.accordionContainer]}>
          <TouchableOpacity onPress={() => toggleAccordion(index)}>
            <View style={styles.accordionHeader}>
              <Image style={styles.cropImage} />
              <View style={styles.cropInfo}>
                <Text style={styles.cropName}>{crop['cropName']} :</Text>
                <Text style={styles.cropDescription}>{crop['region']}</Text>
                <Text style={styles.cropType}>{crop['cropType']}</Text>
              </View>
              <Text style={styles.arrowIcon}>{activeAccordion === index ? '-' : '+'}</Text>
            </View>
          </TouchableOpacity>
          {activeAccordion === index && (
            <View style={styles.accordionContent}>
              {/* <Text style={styles.contentText}>{item.content}</Text> */}
            </View>
          )}
        </View>
      ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  heading: {
    color: 'black',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    fontFamily: 'Roboto',
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    backgroundColor: '#f2f2f2',
    paddingVertical: 5,
    paddingHorizontal: 20,
    textTransform: 'uppercase',
    letterSpacing: 1,
    textAlign: 'center',
    borderRadius: 10
  },
  accordionContainer: {
    marginBottom: 10,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },
  accordionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#FDD692',
  },
  cropImage: {
    width: 40,
    height: 40,
    marginRight: 10,
    borderRadius: 20,
  },
  cropInfo: {
    flex: 1,
    marginLeft: 10,
  },
  cropName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  cropType: {
    fontSize: 10,
    fontWeight: 'light',
    color: '#333',
    alignSelf:'flex-end',
    color:"green",
    borderColor:"black",
    textShadowColor: 'rgba(0, 0, 0, 0.2)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  cropDescription: {
    fontSize: 14,
    color: '#666',
  },
  arrowIcon: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  accordionContent: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  contentText: {
    fontSize: 14,
    color: '#555',
    lineHeight: 20,
  },
});

export default YourComponent;
