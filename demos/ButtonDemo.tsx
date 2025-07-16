import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';

const ButtonDemo: React.FC = () => {
  const [counter, setCounter] = useState(0);

  const showAlert = () => {
    Alert.alert(
      'Button Pressed',
      `You have pressed the button ${counter + 1} times`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => setCounter(counter + 1),
        },
      ]
    );
  };

  const showDestructiveAlert = () => {
    Alert.alert(
      'Destructive Action',
      'This is a destructive action example',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => console.log('Destructive action performed'),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Button Demo</Text>
      <Text style={styles.description}>
        React Native's Button component provides a platform-appropriate button
        with customizable titles and colors.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Buttons</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Primary Button"
            onPress={showAlert}
            accessibilityLabel="Primary action button"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Secondary Action"
            onPress={() => console.log('Secondary action')}
            color="#6B73FF"
            accessibilityLabel="Secondary action button"
          />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            title="Destructive Action"
            onPress={showDestructiveAlert}
            color="#FF3B30"
            accessibilityLabel="Destructive action button"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled Button</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Disabled Button"
            onPress={() => {}}
            disabled={true}
            accessibilityLabel="Disabled button"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Counter</Text>
        <Text style={styles.counterText}>Button pressed: {counter} times</Text>
        <View style={styles.buttonContainer}>
          <Button
            title="Reset Counter"
            onPress={() => setCounter(0)}
            color="#FF9500"
            accessibilityLabel="Reset counter button"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Differences</Text>
        <Text style={styles.note}>
          • iOS: Buttons appear as text with system blue color by default
          {'\n'}• Android: Buttons appear as raised material design buttons
          {'\n'}• Custom colors override platform defaults
        </Text>
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
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  buttonContainer: {
    marginVertical: 8,
  },
  counterText: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 15,
    color: '#333',
  },
  note: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    lineHeight: 20,
  },
});

export default ButtonDemo;
