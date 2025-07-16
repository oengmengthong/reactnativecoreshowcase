import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, Platform, Pressable } from 'react-native';

const AlertDemo: React.FC = () => {
  const [alertCount, setAlertCount] = useState(0);

  const showBasicAlert = () => {
    Alert.alert('Basic Alert', 'This is a basic alert message');
    setAlertCount(count => count + 1);
  };

  const showAlertWithButtons = () => {
    Alert.alert(
      'Alert with Buttons',
      'This alert has multiple buttons',
      [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => console.log('OK Pressed'),
        },
      ]
    );
    setAlertCount(count => count + 1);
  };

  const showDestructiveAlert = () => {
    Alert.alert(
      'Destructive Action',
      'This action cannot be undone. Are you sure?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => console.log('Delete Pressed'),
          style: 'destructive',
        },
      ]
    );
    setAlertCount(count => count + 1);
  };

  const showPromptAlert = () => {
    if (Platform.OS === 'ios') {
      Alert.prompt(
        'Enter Your Name',
        'Please enter your name below:',
        (text) => console.log('User entered:', text),
        'plain-text',
        'Default text'
      );
    } else {
      Alert.alert(
        'iOS Only Feature',
        'Alert.prompt() is only available on iOS. Android uses TextInput components for user input.'
      );
    }
    setAlertCount(count => count + 1);
  };

  const showSecurePrompt = () => {
    if (Platform.OS === 'ios') {
      Alert.prompt(
        'Enter Password',
        'Please enter your password:',
        (text) => console.log('Password entered (length):', text?.length),
        'secure-text'
      );
    } else {
      Alert.alert(
        'iOS Only Feature',
        'Secure text prompt is only available on iOS.'
      );
    }
    setAlertCount(count => count + 1);
  };

  const showCustomAlert = () => {
    Alert.alert(
      'Custom Alert',
      'This is a longer message to demonstrate how alerts handle multiple lines of text. The alert will automatically adjust its height to fit the content.',
      [
        { text: 'First Option', onPress: () => console.log('First') },
        { text: 'Second Option', onPress: () => console.log('Second') },
        { text: 'Third Option', onPress: () => console.log('Third') },
      ]
    );
    setAlertCount(count => count + 1);
  };

  const showAlertWithCallback = () => {
    Alert.alert(
      'Callback Example',
      'This alert demonstrates callback handling',
      [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel pressed');
            Alert.alert('Callback', 'Cancel button callback executed');
          },
          style: 'cancel',
        },
        {
          text: 'Confirm',
          onPress: () => {
            console.log('Confirm pressed');
            Alert.alert('Callback', 'Confirm button callback executed');
          },
        },
      ]
    );
    setAlertCount(count => count + 1);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Alert Demo</Text>
      <Text style={styles.description}>
        Alert provides a way to display native alert dialogs with customizable
        titles, messages, and buttons.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Alert Statistics</Text>
        <Text style={styles.statsText}>Alerts shown: {alertCount}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Alerts</Text>
        
        <Pressable style={styles.button} onPress={showBasicAlert}>
          <Text style={styles.buttonText}>Basic Alert</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={showAlertWithButtons}>
          <Text style={styles.buttonText}>Alert with Buttons</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.destructiveButton]} onPress={showDestructiveAlert}>
          <Text style={styles.buttonTextWhite}>Destructive Alert</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>iOS Prompt Alerts</Text>
        
        <Pressable style={styles.button} onPress={showPromptAlert}>
          <Text style={styles.buttonText}>Text Prompt (iOS)</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={showSecurePrompt}>
          <Text style={styles.buttonText}>Secure Prompt (iOS)</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Examples</Text>
        
        <Pressable style={styles.button} onPress={showCustomAlert}>
          <Text style={styles.buttonText}>Multiple Buttons</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={showAlertWithCallback}>
          <Text style={styles.buttonText}>Callback Example</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Differences</Text>
        <Text style={styles.platformInfo}>
          Platform: {Platform.OS} {Platform.Version}
        </Text>
        <Text style={styles.note}>
          <Text style={styles.noteTitle}>iOS:</Text>
          {'\n'}• Supports Alert.prompt() for text input
          {'\n'}• Buttons appear horizontally (up to 2)
          {'\n'}• More than 2 buttons stack vertically
          {'\n'}• Supports 'destructive' button style
          {'\n\n'}
          <Text style={styles.noteTitle}>Android:</Text>
          {'\n'}• No Alert.prompt() - use TextInput instead
          {'\n'}• Buttons appear horizontally
          {'\n'}• Material Design styling
          {'\n'}• 'destructive' style not visually different
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button Styles</Text>
        <Text style={styles.note}>
          • <Text style={styles.noteTitle}>default:</Text> Regular button appearance
          {'\n'}• <Text style={styles.noteTitle}>cancel:</Text> Styled as cancel button (iOS: bold)
          {'\n'}• <Text style={styles.noteTitle}>destructive:</Text> Styled for destructive actions (iOS: red)
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best Practices</Text>
        <Text style={styles.note}>
          • Use clear, concise titles and messages
          {'\n'}• Limit to 2-3 buttons maximum
          {'\n'}• Always provide a cancel option for destructive actions
          {'\n'}• Use appropriate button styles (cancel, destructive)
          {'\n'}• Handle button callbacks properly
          {'\n'}• Consider platform differences for prompts
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
  statsText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 8,
  },
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  destructiveButton: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  buttonTextWhite: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  platformInfo: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  note: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    lineHeight: 20,
  },
  noteTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AlertDemo;
