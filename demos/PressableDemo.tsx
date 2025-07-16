import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Alert } from 'react-native';

const PressableDemo: React.FC = () => {
  const [pressCount, setPressCount] = useState(0);
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setPressCount(prev => prev + 1);
    Alert.alert('Pressed!', `Button pressed ${pressCount + 1} times`);
  };

  const handleLongPress = () => {
    Alert.alert('Long Press!', 'You held the button down');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pressable Demo</Text>
      <Text style={styles.description}>
        This demo showcases the Pressable component for handling touch interactions.
        Pressable provides precise control over touch states and feedback.
      </Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Press count: {pressCount}</Text>
        <Text style={styles.statsText}>
          State: {isPressed ? 'Pressed' : 'Not pressed'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable
          style={({ pressed }) => [
            styles.basicButton,
            pressed && styles.pressedButton,
          ]}
          onPress={handlePress}
          onPressIn={() => setIsPressed(true)}
          onPressOut={() => setIsPressed(false)}
          accessibilityLabel="Basic pressable button"
          accessibilityRole="button"
        >
          {({ pressed }) => (
            <Text style={[styles.buttonText, pressed && styles.pressedText]}>
              {pressed ? 'Pressed!' : 'Press Me'}
            </Text>
          )}
        </Pressable>

        <Pressable
          style={styles.longPressButton}
          onLongPress={handleLongPress}
          delayLongPress={1000}
          accessibilityLabel="Long press button"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Long Press Me (1s)</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.rippleButton,
            pressed && styles.ripplePressed,
          ]}
          android_ripple={{
            color: 'rgba(255, 255, 255, 0.3)',
            borderless: false,
          }}
          onPress={() => Alert.alert('Ripple', 'Android ripple effect!')}
          accessibilityLabel="Ripple effect button"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Android Ripple</Text>
        </Pressable>

        <Pressable
          style={styles.disabledButton}
          disabled={true}
          onPress={() => Alert.alert('Should not work')}
          accessibilityLabel="Disabled button"
          accessibilityRole="button"
        >
          <Text style={styles.disabledButtonText}>Disabled Button</Text>
        </Pressable>

        <Pressable
          style={({ pressed }) => [
            styles.hitSlopButton,
            pressed && styles.pressedButton,
          ]}
          hitSlop={{ top: 20, bottom: 20, left: 20, right: 20 }}
          onPress={() => Alert.alert('Hit Slop', 'Extended touch area!')}
          accessibilityLabel="Extended touch area button"
          accessibilityRole="button"
        >
          <Text style={styles.buttonText}>Extended Touch Area</Text>
        </Pressable>
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
  statsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  statsText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 15,
  },
  basicButton: {
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  pressedButton: {
    backgroundColor: '#45B7D1',
    transform: [{ scale: 0.95 }],
  },
  longPressButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  rippleButton: {
    backgroundColor: '#96CEB4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  ripplePressed: {
    backgroundColor: '#7FB069',
  },
  disabledButton: {
    backgroundColor: '#ccc',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  disabledButtonText: {
    color: '#999',
    fontSize: 16,
    fontWeight: 'bold',
  },
  hitSlopButton: {
    backgroundColor: '#DDA0DD',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  pressedText: {
    color: '#fff',
  },
});

export default PressableDemo;
