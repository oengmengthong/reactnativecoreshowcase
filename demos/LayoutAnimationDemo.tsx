import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LayoutAnimationDemo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Layout Animation Demo</Text>
      <Text style={styles.description}>Layout Animation demo - Coming soon!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
});

export default LayoutAnimationDemo;
