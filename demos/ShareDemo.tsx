import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable, Share, Alert, Platform } from 'react-native';

const ShareDemo: React.FC = () => {
  const [shareResult, setShareResult] = useState<string>('');

  const shareText = async () => {
    try {
      const result = await Share.share({
        message: 'Check out this React Native Core Showcase app! It demonstrates all the built-in React Native capabilities.',
        title: 'React Native Core Showcase',
      });
      
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          setShareResult(`Shared via: ${result.activityType}`);
        } else {
          setShareResult('Content shared successfully!');
        }
      } else if (result.action === Share.dismissedAction) {
        setShareResult('Share dialog dismissed');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to share: ${error}`);
      setShareResult('Share failed');
    }
  };

  const shareUrl = async () => {
    try {
      const result = await Share.share({
        message: 'Check out React Native documentation:',
        url: 'https://reactnative.dev/',
        title: 'React Native Documentation',
      });
      
      if (result.action === Share.sharedAction) {
        setShareResult('URL shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        setShareResult('Share dialog dismissed');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to share URL: ${error}`);
      setShareResult('URL share failed');
    }
  };

  const shareWithSubject = async () => {
    try {
      const result = await Share.share(
        {
          message: 'This is a demo of the React Native Share API. It allows you to share content with other apps on the device.',
          title: 'Share API Demo',
        },
        {
          subject: 'React Native Share Demo',
          dialogTitle: 'Share this awesome demo!',
        }
      );
      
      if (result.action === Share.sharedAction) {
        setShareResult('Content with subject shared!');
      } else if (result.action === Share.dismissedAction) {
        setShareResult('Share dialog dismissed');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to share with subject: ${error}`);
      setShareResult('Share with subject failed');
    }
  };

  const shareAppInfo = async () => {
    const appInfo = `React Native Core Showcase

Platform: ${Platform.OS}
Version: ${Platform.Version}

This app demonstrates all the built-in React Native capabilities including:
- UI Components (View, Text, ScrollView, FlatList, etc.)
- Platform APIs (Share, Clipboard, Vibration, etc.)
- Animation APIs (Animated, LayoutAnimation, etc.)
- Device APIs (Dimensions, Appearance, etc.)

Built with React Native ${Platform.constants.reactNativeVersion?.major}.${Platform.constants.reactNativeVersion?.minor}`;

    try {
      const result = await Share.share({
        message: appInfo,
        title: 'React Native Core Showcase App Info',
      });
      
      if (result.action === Share.sharedAction) {
        setShareResult('App info shared successfully!');
      } else if (result.action === Share.dismissedAction) {
        setShareResult('Share dialog dismissed');
      }
    } catch (error) {
      Alert.alert('Error', `Failed to share app info: ${error}`);
      setShareResult('App info share failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Share Demo</Text>
      <Text style={styles.description}>
        This demo shows the Share API for sharing content with other apps.
        The Share API provides a native sharing interface on both iOS and Android.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Text Sharing</Text>
        <Pressable style={styles.button} onPress={shareText}>
          <Text style={styles.buttonText}>Share Text</Text>
        </Pressable>
        <Text style={styles.info}>
          Shares a simple text message using the native share dialog
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>URL Sharing</Text>
        <Pressable style={styles.button} onPress={shareUrl}>
          <Text style={styles.buttonText}>Share URL</Text>
        </Pressable>
        <Text style={styles.info}>
          Shares a URL along with a message (iOS combines them, Android may show separately)
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Share with Subject</Text>
        <Pressable style={styles.button} onPress={shareWithSubject}>
          <Text style={styles.buttonText}>Share with Subject</Text>
        </Pressable>
        <Text style={styles.info}>
          Includes a subject line and custom dialog title (mainly for email apps)
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Share App Information</Text>
        <Pressable style={styles.button} onPress={shareAppInfo}>
          <Text style={styles.buttonText}>Share App Info</Text>
        </Pressable>
        <Text style={styles.info}>
          Shares detailed information about this app and the platform
        </Text>
      </View>

      {shareResult ? (
        <View style={styles.resultSection}>
          <Text style={styles.resultTitle}>Last Share Result:</Text>
          <Text style={styles.resultText}>{shareResult}</Text>
          <Pressable
            style={styles.clearButton}
            onPress={() => setShareResult('')}
          >
            <Text style={styles.clearButtonText}>Clear</Text>
          </Pressable>
        </View>
      ) : null}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Information</Text>
        <View style={styles.platformInfo}>
          <Text style={styles.platformText}>Platform: {Platform.OS}</Text>
          <Text style={styles.platformText}>Version: {Platform.Version}</Text>
          <Text style={styles.platformText}>
            React Native: {Platform.constants.reactNativeVersion?.major}.{Platform.constants.reactNativeVersion?.minor}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Usage Notes</Text>
        <View style={styles.notesContainer}>
          <Text style={styles.noteText}>
            • Share API opens the native sharing interface
          </Text>
          <Text style={styles.noteText}>
            • Available apps depend on what's installed on the device
          </Text>
          <Text style={styles.noteText}>
            • iOS and Android handle sharing differently
          </Text>
          <Text style={styles.noteText}>
            • URL parameter is iOS-specific for URL sharing
          </Text>
          <Text style={styles.noteText}>
            • Subject and dialogTitle are optional parameters
          </Text>
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
  button: {
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
  resultSection: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    borderColor: '#4ECDC4',
    borderWidth: 1,
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#2E7D32',
    marginBottom: 10,
  },
  resultText: {
    fontSize: 14,
    color: '#2E7D32',
    marginBottom: 10,
  },
  clearButton: {
    backgroundColor: '#FF6B6B',
    padding: 8,
    borderRadius: 6,
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  clearButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  platformInfo: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
  },
  platformText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  notesContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
  },
  noteText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default ShareDemo;
