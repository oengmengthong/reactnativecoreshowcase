import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';

const TouchableOpacityDemo: React.FC = () => {
  const [counter, setCounter] = useState(0);
  const [pressCount, setPressCount] = useState(0);

  const handlePress = () => {
    setPressCount(prev => prev + 1);
    Alert.alert('Pressed!', `Button has been pressed ${pressCount + 1} times`);
  };

  const handleLongPress = () => {
    Alert.alert('Long Press!', 'You held the button down');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>TouchableOpacity Demo</Text>
      <Text style={styles.description}>
        This demo shows TouchableOpacity for creating touchable elements.
        TouchableOpacity provides visual feedback by reducing opacity when pressed.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic TouchableOpacity</Text>
        <TouchableOpacity
          style={styles.basicButton}
          onPress={handlePress}
          activeOpacity={0.7}
        >
          <Text style={styles.buttonText}>Press Me</Text>
        </TouchableOpacity>
        <Text style={styles.info}>Press count: {pressCount}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Active Opacity Values</Text>
        <View style={styles.opacityRow}>
          <TouchableOpacity
            style={[styles.opacityButton, styles.button1]}
            onPress={() => Alert.alert('Opacity', 'activeOpacity: 0.2')}
            activeOpacity={0.2}
          >
            <Text style={styles.buttonText}>0.2</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.opacityButton, styles.button2]}
            onPress={() => Alert.alert('Opacity', 'activeOpacity: 0.5')}
            activeOpacity={0.5}
          >
            <Text style={styles.buttonText}>0.5</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.opacityButton, styles.button3]}
            onPress={() => Alert.alert('Opacity', 'activeOpacity: 0.8')}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>0.8</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Long Press Support</Text>
        <TouchableOpacity
          style={styles.longPressButton}
          onPress={() => Alert.alert('Quick Press', 'Short press detected')}
          onLongPress={handleLongPress}
          delayLongPress={1000}
        >
          <Text style={styles.buttonText}>Press & Hold (1s)</Text>
        </TouchableOpacity>
        <Text style={styles.info}>Try both quick press and long press</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Counter Example</Text>
        <View style={styles.counterContainer}>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setCounter(prev => prev - 1)}
          >
            <Text style={styles.counterButtonText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.counterText}>{counter}</Text>
          <TouchableOpacity
            style={styles.counterButton}
            onPress={() => setCounter(prev => prev + 1)}
          >
            <Text style={styles.counterButtonText}>+</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.resetButton}
          onPress={() => setCounter(0)}
        >
          <Text style={styles.buttonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Disabled State</Text>
        <TouchableOpacity
          style={styles.enabledButton}
          onPress={() => Alert.alert('Enabled', 'This button is enabled')}
        >
          <Text style={styles.buttonText}>Enabled Button</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.disabledButton}
          onPress={() => Alert.alert('Should not see this')}
          disabled={true}
        >
          <Text style={styles.disabledButtonText}>Disabled Button</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Shapes & Styles</Text>
        <View style={styles.shapeRow}>
          <TouchableOpacity
            style={styles.circleButton}
            onPress={() => Alert.alert('Circle', 'Round button pressed')}
          >
            <Text style={styles.buttonText}>●</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.squareButton}
            onPress={() => Alert.alert('Square', 'Square button pressed')}
          >
            <Text style={styles.buttonText}>■</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.pillButton}
            onPress={() => Alert.alert('Pill', 'Pill button pressed')}
          >
            <Text style={styles.buttonText}>Pill</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hit Slop Example</Text>
        <Text style={styles.info}>
          The small button below has extended touch area (hitSlop)
        </Text>
        <TouchableOpacity
          style={styles.smallButton}
          onPress={() => Alert.alert('Hit Slop', 'Small button with extended touch area')}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
        >
          <Text style={styles.smallButtonText}>Small</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility Features</Text>
        <TouchableOpacity
          style={styles.accessibilityButton}
          onPress={() => Alert.alert('Accessible', 'This button has accessibility features')}
          accessible={true}
          accessibilityLabel="Accessible button"
          accessibilityHint="Double tap to show accessibility features"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Accessible Button</Text>
        </TouchableOpacity>
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
  section: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  basicButton: {
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  info: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  opacityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  opacityButton: {
    flex: 1,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  button1: {
    backgroundColor: '#FF6B6B',
  },
  button2: {
    backgroundColor: '#4ECDC4',
  },
  button3: {
    backgroundColor: '#45B7D1',
  },
  longPressButton: {
    backgroundColor: '#96CEB4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  counterContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  counterButton: {
    backgroundColor: '#4ECDC4',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
  },
  counterButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 60,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  enabledButton: {
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  disabledButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  disabledButtonText: {
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
  },
  shapeRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  circleButton: {
    backgroundColor: '#FF6B6B',
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  squareButton: {
    backgroundColor: '#4ECDC4',
    width: 80,
    height: 80,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  pillButton: {
    backgroundColor: '#45B7D1',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallButton: {
    backgroundColor: '#96CEB4',
    padding: 5,
    borderRadius: 4,
    alignItems: 'center',
    alignSelf: 'center',
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  accessibilityButton: {
    backgroundColor: '#9b59b6',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
});

export default TouchableOpacityDemo;
