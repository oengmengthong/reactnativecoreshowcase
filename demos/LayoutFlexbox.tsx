import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';

const LayoutFlexbox: React.FC = () => {
  const [flexDirection, setFlexDirection] = useState<'row' | 'column'>('row');
  const [justifyContent, setJustifyContent] = useState<'flex-start' | 'center' | 'flex-end' | 'space-between' | 'space-around'>('flex-start');
  const [alignItems, setAlignItems] = useState<'flex-start' | 'center' | 'flex-end' | 'stretch'>('flex-start');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Layout & Flexbox Demo</Text>
      <Text style={styles.description}>
        This demo showcases React Native's Flexbox layout system.
        Flexbox is the primary layout method in React Native, providing powerful control over arrangement and spacing.
      </Text>

      <View style={styles.controlsContainer}>
        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Flex Direction:</Text>
          <View style={styles.buttonRow}>
            <Pressable 
              style={[styles.controlButton, flexDirection === 'row' && styles.activeButton]}
              onPress={() => setFlexDirection('row')}
            >
              <Text style={styles.buttonText}>Row</Text>
            </Pressable>
            <Pressable 
              style={[styles.controlButton, flexDirection === 'column' && styles.activeButton]}
              onPress={() => setFlexDirection('column')}
            >
              <Text style={styles.buttonText}>Column</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Justify Content:</Text>
          <View style={styles.buttonRow}>
            <Pressable 
              style={[styles.controlButton, justifyContent === 'flex-start' && styles.activeButton]}
              onPress={() => setJustifyContent('flex-start')}
            >
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
            <Pressable 
              style={[styles.controlButton, justifyContent === 'center' && styles.activeButton]}
              onPress={() => setJustifyContent('center')}
            >
              <Text style={styles.buttonText}>Center</Text>
            </Pressable>
            <Pressable 
              style={[styles.controlButton, justifyContent === 'space-between' && styles.activeButton]}
              onPress={() => setJustifyContent('space-between')}
            >
              <Text style={styles.buttonText}>Between</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.controlGroup}>
          <Text style={styles.controlLabel}>Align Items:</Text>
          <View style={styles.buttonRow}>
            <Pressable 
              style={[styles.controlButton, alignItems === 'flex-start' && styles.activeButton]}
              onPress={() => setAlignItems('flex-start')}
            >
              <Text style={styles.buttonText}>Start</Text>
            </Pressable>
            <Pressable 
              style={[styles.controlButton, alignItems === 'center' && styles.activeButton]}
              onPress={() => setAlignItems('center')}
            >
              <Text style={styles.buttonText}>Center</Text>
            </Pressable>
            <Pressable 
              style={[styles.controlButton, alignItems === 'stretch' && styles.activeButton]}
              onPress={() => setAlignItems('stretch')}
            >
              <Text style={styles.buttonText}>Stretch</Text>
            </Pressable>
          </View>
        </View>
      </View>

      <View style={styles.demoContainer}>
        <Text style={styles.demoTitle}>Layout Preview:</Text>
        <View style={[styles.flexContainer, { flexDirection, justifyContent, alignItems }]}>
          <View style={[styles.flexItem, styles.item1]}>
            <Text style={styles.itemText}>1</Text>
          </View>
          <View style={[styles.flexItem, styles.item2]}>
            <Text style={styles.itemText}>2</Text>
          </View>
          <View style={[styles.flexItem, styles.item3]}>
            <Text style={styles.itemText}>3</Text>
          </View>
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
  controlsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  controlGroup: {
    marginBottom: 15,
  },
  controlLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  controlButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 5,
    marginRight: 8,
    marginBottom: 8,
  },
  activeButton: {
    backgroundColor: '#4ECDC4',
  },
  buttonText: {
    fontSize: 12,
    color: '#333',
  },
  demoContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  flexContainer: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  flexItem: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    margin: 5,
  },
  item1: {
    backgroundColor: '#FF6B6B',
  },
  item2: {
    backgroundColor: '#4ECDC4',
  },
  item3: {
    backgroundColor: '#45B7D1',
  },
  itemText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LayoutFlexbox;
