import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const ViewBasics: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>View Basics Demo</Text>
      <Text style={styles.description}>
        This demo showcases the basic View component with Flexbox layout.
        View is the fundamental building block for UI components in React Native.
      </Text>
      
      <View style={styles.demoContainer}>
        <View style={[styles.box, styles.redBox]}>
          <Text style={styles.boxText}>Red Box</Text>
        </View>
        <View style={[styles.box, styles.blueBox]}>
          <Text style={styles.boxText}>Blue Box</Text>
        </View>
        <View style={[styles.box, styles.greenBox]}>
          <Text style={styles.boxText}>Green Box</Text>
        </View>
      </View>
      
      <View style={styles.flexDemo}>
        <View style={styles.flexItem}>
          <Text>Flex: 1</Text>
        </View>
        <View style={[styles.flexItem, styles.flex2]}>
          <Text>Flex: 2</Text>
        </View>
        <View style={styles.flexItem}>
          <Text>Flex: 1</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  demoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 30,
  },
  box: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  redBox: {
    backgroundColor: '#FF6B6B',
  },
  blueBox: {
    backgroundColor: '#4ECDC4',
  },
  greenBox: {
    backgroundColor: '#45B7D1',
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
  },
  flexDemo: {
    flexDirection: 'row',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
  },
  flexItem: {
    flex: 1,
    backgroundColor: '#E8E8E8',
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  flex2: {
    flex: 2,
    backgroundColor: '#D0D0D0',
  },
});

export default ViewBasics;
