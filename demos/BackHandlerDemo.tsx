import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, BackHandler, Platform } from 'react-native';

const BackHandlerDemo: React.FC = () => {
  const [backPressCount, setBackPressCount] = useState(0);
  const [isHandlerActive, setIsHandlerActive] = useState(false);

  const handleBackPress = useCallback((): boolean => {
    setBackPressCount(count => count + 1);
    
    Alert.alert(
      'Back Button Pressed',
      `Hardware back button pressed ${backPressCount + 1} times.\n\nThis demo intercepts the back button press.`,
      [
        {
          text: 'Continue',
          onPress: () => {},
          style: 'cancel',
        },
        {
          text: 'Exit App',
          onPress: () => BackHandler.exitApp(),
          style: 'destructive',
        },
      ]
    );

    // Return true to prevent default behavior (going back)
    return true;
  }, [backPressCount]);

  useEffect(() => {
    if (Platform.OS === 'android') {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      setIsHandlerActive(true);

      return () => {
        backHandler.remove();
        setIsHandlerActive(false);
      };
    }
  }, [backPressCount, handleBackPress]);

  const showExitAlert = () => {
    Alert.alert(
      'Exit App',
      'Are you sure you want to exit the app?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Exit',
          onPress: () => BackHandler.exitApp(),
          style: 'destructive',
        },
      ]
    );
  };

  if (Platform.OS !== 'android') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>BackHandler Demo</Text>
        <Text style={styles.description}>
          BackHandler is Android-specific and provides access to the hardware back button.
        </Text>
        <View style={styles.notSupportedContainer}>
          <Text style={styles.notSupportedText}>
            ⚠️ This demo is only available on Android devices.
          </Text>
          <Text style={styles.notSupportedDescription}>
            iOS uses gesture-based navigation and doesn't have a hardware back button.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BackHandler Demo</Text>
      <Text style={styles.description}>
        BackHandler allows you to customize the behavior of the hardware back button on Android.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Handler Status</Text>
        <Text style={styles.statusText}>
          Handler Active: {isHandlerActive ? '✅ Yes' : '❌ No'}
        </Text>
        <Text style={styles.statusText}>
          Back Press Count: {backPressCount}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Try the Back Button</Text>
        <Text style={styles.instructionText}>
          Press the hardware back button on your Android device to see the custom behavior.
        </Text>
        <View style={styles.actionBox}>
          <Text style={styles.actionText}>📱 Press Back Button</Text>
          <Text style={styles.actionDescription}>
            The app will show a confirmation dialog instead of going back immediately.
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Exit App Function</Text>
        <Text style={styles.instructionText}>
          You can also programmatically exit the app using BackHandler.exitApp().
        </Text>
        <View style={styles.exitContainer}>
          <Text style={styles.exitText} onPress={showExitAlert}>
            🚪 Exit App
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Implementation Details</Text>
        <Text style={styles.note}>
          • BackHandler.addEventListener() - Registers a handler for the back button
          {'\n'}• Return true to prevent default behavior (going back)
          {'\n'}• Return false to allow default behavior
          {'\n'}• BackHandler.exitApp() - Programmatically exits the app
          {'\n'}• Must remove listeners in cleanup to prevent memory leaks
          {'\n'}• Only works on Android - iOS uses gesture navigation
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Use Cases</Text>
        <Text style={styles.note}>
          • Confirm before closing the app
          {'\n'}• Save user data before exiting
          {'\n'}• Navigate to a specific screen instead of going back
          {'\n'}• Show exit confirmation in games or forms
          {'\n'}• Implement custom navigation behavior
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
  statusText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  actionBox: {
    backgroundColor: '#E3F2FD',
    padding: 20,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#2196F3',
    borderStyle: 'dashed',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 8,
  },
  actionDescription: {
    fontSize: 14,
    color: '#1976D2',
    textAlign: 'center',
  },
  exitContainer: {
    backgroundColor: '#FFEBEE',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F44336',
    alignItems: 'center',
  },
  exitText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
  },
  note: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    lineHeight: 20,
  },
  notSupportedContainer: {
    backgroundColor: '#FFF3E0',
    padding: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FF9800',
    alignItems: 'center',
  },
  notSupportedText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#F57C00',
    marginBottom: 10,
  },
  notSupportedDescription: {
    fontSize: 14,
    color: '#F57C00',
    textAlign: 'center',
  },
});

export default BackHandlerDemo;
