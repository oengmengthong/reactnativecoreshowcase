import React from 'react';
import { View, Text, StyleSheet, Pressable, Vibration, Platform } from 'react-native';

const VibrationDemo: React.FC = () => {
  const vibrateShort = () => {
    Vibration.vibrate(100);
  };

  const vibrateLong = () => {
    Vibration.vibrate(1000);
  };

  const vibratePattern = () => {
    // Pattern: [wait, vibrate, wait, vibrate, ...]
    const pattern = [0, 200, 100, 200, 100, 400];
    Vibration.vibrate(pattern);
  };

  const vibrateRepeating = () => {
    const pattern = [0, 100, 200, 100, 200, 100];
    Vibration.vibrate(pattern, true); // true = repeat
  };

  const cancelVibration = () => {
    Vibration.cancel();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Vibration Demo</Text>
      <Text style={styles.description}>
        This demo showcases the Vibration API for haptic feedback.
        Vibration provides tactile feedback to enhance user experience.
      </Text>

      <View style={styles.infoContainer}>
        <Text style={styles.infoTitle}>Platform Support</Text>
        <Text style={styles.infoText}>
          Current Platform: {Platform.OS}
        </Text>
        <Text style={styles.infoText}>
          {Platform.OS === 'ios' 
            ? 'iOS supports basic vibration patterns' 
            : 'Android supports custom vibration patterns'}
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={styles.vibrationButton}
          onPress={vibrateShort}
        >
          <Text style={styles.buttonText}>Short Vibration (100ms)</Text>
        </Pressable>

        <Pressable 
          style={styles.vibrationButton}
          onPress={vibrateLong}
        >
          <Text style={styles.buttonText}>Long Vibration (1000ms)</Text>
        </Pressable>

        <Pressable 
          style={styles.vibrationButton}
          onPress={vibratePattern}
        >
          <Text style={styles.buttonText}>Pattern Vibration</Text>
        </Pressable>

        <Pressable 
          style={styles.vibrationButton}
          onPress={vibrateRepeating}
        >
          <Text style={styles.buttonText}>Repeating Pattern</Text>
        </Pressable>

        <Pressable 
          style={[styles.vibrationButton, styles.cancelButton]}
          onPress={cancelVibration}
        >
          <Text style={styles.buttonText}>Cancel Vibration</Text>
        </Pressable>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={styles.instructionsTitle}>Instructions:</Text>
        <Text style={styles.instructionsText}>
          • Make sure your device is not in silent mode
        </Text>
        <Text style={styles.instructionsText}>
          • Some devices may have vibration disabled in settings
        </Text>
        <Text style={styles.instructionsText}>
          • Pattern vibration works best on Android devices
        </Text>
        <Text style={styles.instructionsText}>
          • Use "Cancel" to stop repeating vibrations
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 15,
  },
  vibrationButton: {
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
  cancelButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instructionsContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  instructionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  instructionsText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default VibrationDemo;
