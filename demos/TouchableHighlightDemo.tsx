import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Alert } from 'react-native';

const TouchableHighlightDemo: React.FC = () => {
  const [pressCount, setPressCount] = useState(0);
  const [longPressCount, setLongPressCount] = useState(0);

  const handlePress = () => {
    setPressCount(count => count + 1);
    Alert.alert('Pressed!', `TouchableHighlight pressed ${pressCount + 1} times`);
  };

  const handleLongPress = () => {
    setLongPressCount(count => count + 1);
    Alert.alert('Long Pressed!', `Long press detected ${longPressCount + 1} times`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TouchableHighlight Demo</Text>
      <Text style={styles.description}>
        TouchableHighlight is a wrapper that makes views respond properly to touches
        by changing the background color when pressed.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic TouchableHighlight</Text>
        <TouchableHighlight
          style={styles.button}
          onPress={handlePress}
          underlayColor="#DDDDDD"
          accessibilityLabel="Basic touchable highlight button"
        >
          <Text style={styles.buttonText}>Tap Me</Text>
        </TouchableHighlight>
        <Text style={styles.counterText}>Press count: {pressCount}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Underlay Colors</Text>
        <TouchableHighlight
          style={[styles.button, styles.primaryButton]}
          onPress={() => Alert.alert('Info', 'Primary button pressed')}
          underlayColor="#0051D5"
          accessibilityLabel="Primary button with blue underlay"
        >
          <Text style={styles.buttonTextWhite}>Primary Action</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.button, styles.successButton]}
          onPress={() => Alert.alert('Success', 'Success button pressed')}
          underlayColor="#28A745"
          accessibilityLabel="Success button with green underlay"
        >
          <Text style={styles.buttonTextWhite}>Success Action</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.button, styles.warningButton]}
          onPress={() => Alert.alert('Warning', 'Warning button pressed')}
          underlayColor="#E0A800"
          accessibilityLabel="Warning button with orange underlay"
        >
          <Text style={styles.buttonTextWhite}>Warning Action</Text>
        </TouchableHighlight>

        <TouchableHighlight
          style={[styles.button, styles.dangerButton]}
          onPress={() => Alert.alert('Danger', 'Danger button pressed')}
          underlayColor="#C82333"
          accessibilityLabel="Danger button with red underlay"
        >
          <Text style={styles.buttonTextWhite}>Danger Action</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Long Press Support</Text>
        <TouchableHighlight
          style={[styles.button, styles.longPressButton]}
          onPress={() => Alert.alert('Quick Press', 'Quick press detected')}
          onLongPress={handleLongPress}
          underlayColor="#6C757D"
          delayLongPress={1000}
          accessibilityLabel="Button with long press support"
        >
          <Text style={styles.buttonTextWhite}>Press or Hold (1s)</Text>
        </TouchableHighlight>
        <Text style={styles.counterText}>Long press count: {longPressCount}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Card-like Touchable</Text>
        <TouchableHighlight
          style={styles.card}
          onPress={() => Alert.alert('Card Pressed', 'Card touchable pressed')}
          underlayColor="#F8F9FA"
          accessibilityLabel="Card with touchable highlight"
        >
          <View>
            <Text style={styles.cardTitle}>Interactive Card</Text>
            <Text style={styles.cardContent}>
              This demonstrates how TouchableHighlight can be used with
              complex layouts like cards.
            </Text>
            <Text style={styles.cardFooter}>Tap to interact</Text>
          </View>
        </TouchableHighlight>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled State</Text>
        <TouchableHighlight
          style={[styles.button, styles.disabledButton]}
          onPress={() => {}}
          disabled={true}
          accessibilityLabel="Disabled button"
        >
          <Text style={styles.disabledButtonText}>Disabled Button</Text>
        </TouchableHighlight>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        <Text style={styles.note}>
          • Provides immediate visual feedback when pressed
          {'\n'}• underlayColor: Background color shown when pressed
          {'\n'}• Supports both onPress and onLongPress events
          {'\n'}• Can wrap complex layouts and components
          {'\n'}• Automatically handles disabled state styling
          {'\n'}• Accessible by default with proper labels
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
  button: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  primaryButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  successButton: {
    backgroundColor: '#34C759',
    borderColor: '#34C759',
  },
  warningButton: {
    backgroundColor: '#FF9500',
    borderColor: '#FF9500',
  },
  dangerButton: {
    backgroundColor: '#FF3B30',
    borderColor: '#FF3B30',
  },
  longPressButton: {
    backgroundColor: '#6C757D',
    borderColor: '#6C757D',
  },
  disabledButton: {
    backgroundColor: '#f8f9fa',
    borderColor: '#dee2e6',
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
  disabledButtonText: {
    fontSize: 16,
    color: '#6c757d',
    fontWeight: '600',
  },
  counterText: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginTop: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardContent: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 10,
  },
  cardFooter: {
    fontSize: 12,
    color: '#007AFF',
    fontStyle: 'italic',
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

export default TouchableHighlightDemo;
