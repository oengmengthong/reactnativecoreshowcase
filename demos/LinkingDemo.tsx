import React, { useState } from 'react';
import { View, Text, StyleSheet, Linking, Alert, Platform, Pressable } from 'react-native';

const LinkingDemo: React.FC = () => {
  const [canOpenURL, setCanOpenURL] = useState<boolean | null>(null);
  const [lastURL, setLastURL] = useState<string | null>(null);
  const [initialURL, setInitialURL] = useState<string | null>(null);

  const checkURLSupport = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      setCanOpenURL(supported);
      return supported;
    } catch {
      Alert.alert('Error', 'Failed to check URL support');
      return false;
    }
  };

  const openURL = async (url: string) => {
    try {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
        await Linking.openURL(url);
        setLastURL(url);
      } else {
        Alert.alert('Error', `Cannot open URL: ${url}`);
      }
    } catch {
      Alert.alert('Error', 'Failed to open URL');
    }
  };

  const getInitialURL = async () => {
    try {
      const url = await Linking.getInitialURL();
      setInitialURL(url);
      if (url) {
        Alert.alert('Initial URL', `App was opened with: ${url}`);
      } else {
        Alert.alert('Initial URL', 'No initial URL found');
      }
    } catch {
      Alert.alert('Error', 'Failed to get initial URL');
    }
  };

  const sendEmail = () => {
    const emailURL = 'mailto:support@example.com?subject=React Native App&body=Hello from React Native!';
    openURL(emailURL);
  };

  const makePhoneCall = () => {
    const phoneURL = 'tel:+1234567890';
    openURL(phoneURL);
  };

  const sendSMS = () => {
    const smsURL = 'sms:+1234567890?body=Hello from React Native!';
    openURL(smsURL);
  };

  const openMaps = () => {
    const mapsURL = Platform.select({
      ios: 'maps:0,0?q=Apple Park',
      android: 'geo:0,0?q=Googleplex',
    });
    if (mapsURL) {
      openURL(mapsURL);
    }
  };

  const openAppStore = () => {
    const storeURL = Platform.select({
      ios: 'https://apps.apple.com/app/id6503038111',
      android: 'market://details?id=com.facebook.react.devapp',
    });
    if (storeURL) {
      openURL(storeURL);
    }
  };

  const openSocialMedia = (platform: string) => {
    const urls = {
      twitter: 'twitter://user?screen_name=reactnative',
      facebook: 'fb://profile/reactnative',
      instagram: 'instagram://user?username=reactnative',
      youtube: 'youtube://channel/UCz5vTaEhvWKVxuZQ8pHUPQQ',
    };
    
    const url = urls[platform as keyof typeof urls];
    if (url) {
      openURL(url);
    }
  };

  const openCustomScheme = () => {
    const customURL = 'myapp://profile/123';
    openURL(customURL);
  };

  const openWebsite = () => {
    openURL('https://reactnative.dev');
  };

  const checkMultipleURLs = async () => {
    const urls = [
      'https://reactnative.dev',
      'mailto:test@example.com',
      'tel:+1234567890',
      'sms:+1234567890',
      'myapp://custom',
    ];

    const results = await Promise.all(
      urls.map(async (url) => {
        try {
          const supported = await Linking.canOpenURL(url);
          return { url, supported };
        } catch {
          return { url, supported: false };
        }
      })
    );

    const message = results
      .map(({ url, supported }) => `${url}: ${supported ? '✅' : '❌'}`)
      .join('\n');

    Alert.alert('URL Support Check', message);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Linking Demo</Text>
      <Text style={styles.description}>
        Linking provides a general interface to interact with incoming and outgoing
        app links, including deep links, phone calls, emails, and more.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>URL Information</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Can Open URL:</Text>
          <Text style={styles.infoValue}>
            {canOpenURL === null ? 'Not checked' : canOpenURL ? 'Yes' : 'No'}
          </Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Last Opened URL:</Text>
          <Text style={styles.infoValue}>{lastURL || 'None'}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Initial URL:</Text>
          <Text style={styles.infoValue}>{initialURL || 'Not fetched'}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Web Links</Text>
        
        <Pressable style={styles.button} onPress={openWebsite}>
          <Text style={styles.buttonText}>Open React Native Website</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => checkURLSupport('https://reactnative.dev')}>
          <Text style={styles.buttonText}>Check Website Support</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Communication</Text>
        
        <Pressable style={styles.button} onPress={sendEmail}>
          <Text style={styles.buttonText}>Send Email</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={makePhoneCall}>
          <Text style={styles.buttonText}>Make Phone Call</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={sendSMS}>
          <Text style={styles.buttonText}>Send SMS</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Apps</Text>
        
        <Pressable style={styles.button} onPress={openMaps}>
          <Text style={styles.buttonText}>Open Maps</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={openAppStore}>
          <Text style={styles.buttonText}>Open App Store</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Social Media</Text>
        
        <Pressable style={styles.button} onPress={() => openSocialMedia('twitter')}>
          <Text style={styles.buttonText}>Open Twitter</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => openSocialMedia('facebook')}>
          <Text style={styles.buttonText}>Open Facebook</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => openSocialMedia('instagram')}>
          <Text style={styles.buttonText}>Open Instagram</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={() => openSocialMedia('youtube')}>
          <Text style={styles.buttonText}>Open YouTube</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Custom Schemes</Text>
        
        <Pressable style={styles.button} onPress={openCustomScheme}>
          <Text style={styles.buttonText}>Open Custom App Scheme</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Utilities</Text>
        
        <Pressable style={styles.button} onPress={getInitialURL}>
          <Text style={styles.buttonText}>Get Initial URL</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={checkMultipleURLs}>
          <Text style={styles.buttonText}>Check Multiple URLs</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common URL Schemes</Text>
        <Text style={styles.note}>
          <Text style={styles.noteTitle}>Web:</Text> https://, http://
          {'\n'}
          <Text style={styles.noteTitle}>Email:</Text> mailto:
          {'\n'}
          <Text style={styles.noteTitle}>Phone:</Text> tel:
          {'\n'}
          <Text style={styles.noteTitle}>SMS:</Text> sms:
          {'\n'}
          <Text style={styles.noteTitle}>Maps (iOS):</Text> maps:
          {'\n'}
          <Text style={styles.noteTitle}>Maps (Android):</Text> geo:
          {'\n'}
          <Text style={styles.noteTitle}>App Store (iOS):</Text> https://apps.apple.com/
          {'\n'}
          <Text style={styles.noteTitle}>Play Store:</Text> market://
          {'\n'}
          <Text style={styles.noteTitle}>Social:</Text> twitter://, fb://, instagram://
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best Practices</Text>
        <Text style={styles.note}>
          • Always check canOpenURL() before opening URLs
          {'\n'}• Handle errors gracefully with try-catch
          {'\n'}• Use platform-specific URLs when needed
          {'\n'}• Test deep links on both platforms
          {'\n'}• Consider fallback URLs for unsupported schemes
          {'\n'}• Be cautious with custom schemes - they may not exist
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
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    flex: 2,
    textAlign: 'right',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
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
  buttonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
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

export default LinkingDemo;
