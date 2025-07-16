import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, AccessibilityInfo, Platform, Alert } from 'react-native';

interface AccessibilityStatusProps {
  label: string;
  value: boolean | null;
  available?: boolean;
}

const AccessibilityStatus: React.FC<AccessibilityStatusProps> = ({ label, value, available = true }) => (
  <View style={styles.statusItem}>
    <Text style={styles.statusLabel}>{label}:</Text>
    <Text style={[
      styles.statusValue,
      !available && styles.unavailableStatus,
      value === true && styles.enabledStatus,
      value === false && styles.disabledStatus,
    ]}>
      {!available ? 'Not Available' : value === null ? 'Loading...' : value ? 'Enabled' : 'Disabled'}
    </Text>
  </View>
);

const AccessibilityInfoDemo: React.FC = () => {
  const [screenReaderEnabled, setScreenReaderEnabled] = useState<boolean | null>(null);
  const [reduceMotionEnabled, setReduceMotionEnabled] = useState<boolean | null>(null);
  const [reduceTransparencyEnabled, setReduceTransparencyEnabled] = useState<boolean | null>(null);
  const [boldTextEnabled, setBoldTextEnabled] = useState<boolean | null>(null);
  const [grayscaleEnabled, setGrayscaleEnabled] = useState<boolean | null>(null);
  const [invertColorsEnabled, setInvertColorsEnabled] = useState<boolean | null>(null);
  const [announcements, setAnnouncements] = useState<string[]>([]);

  useEffect(() => {
    checkAllAccessibilitySettings();
    setupAccessibilityListeners();
  }, []);

  const checkAllAccessibilitySettings = async () => {
    try {
      // Check screen reader
      const screenReader = await AccessibilityInfo.isScreenReaderEnabled();
      setScreenReaderEnabled(screenReader);

      // Check reduce motion
      if (Platform.OS === 'ios') {
        const reduceMotion = await AccessibilityInfo.isReduceMotionEnabled();
        setReduceMotionEnabled(reduceMotion);
      }

      // Check reduce transparency (iOS only)
      if (Platform.OS === 'ios') {
        const reduceTransparency = await AccessibilityInfo.isReduceTransparencyEnabled();
        setReduceTransparencyEnabled(reduceTransparency);
      }

      // Check bold text (iOS only)
      if (Platform.OS === 'ios') {
        const boldText = await AccessibilityInfo.isBoldTextEnabled();
        setBoldTextEnabled(boldText);
      }

      // Check grayscale (iOS only)
      if (Platform.OS === 'ios') {
        const grayscale = await AccessibilityInfo.isGrayscaleEnabled();
        setGrayscaleEnabled(grayscale);
      }

      // Check invert colors (iOS only)
      if (Platform.OS === 'ios') {
        const invertColors = await AccessibilityInfo.isInvertColorsEnabled();
        setInvertColorsEnabled(invertColors);
      }
    } catch (error) {
      console.error('Error checking accessibility settings:', error);
    }
  };

  const setupAccessibilityListeners = () => {
    // Screen reader listener
    const screenReaderListener = AccessibilityInfo.addEventListener(
      'screenReaderChanged',
      (enabled) => {
        setScreenReaderEnabled(enabled);
        setAnnouncements(prev => [...prev, `Screen reader ${enabled ? 'enabled' : 'disabled'}`]);
      }
    );

    // Reduce motion listener (iOS only)
    let reduceMotionListener: any;
    if (Platform.OS === 'ios') {
      reduceMotionListener = AccessibilityInfo.addEventListener(
        'reduceMotionChanged',
        (enabled) => {
          setReduceMotionEnabled(enabled);
          setAnnouncements(prev => [...prev, `Reduce motion ${enabled ? 'enabled' : 'disabled'}`]);
        }
      );
    }

    // Reduce transparency listener (iOS only)
    let reduceTransparencyListener: any;
    if (Platform.OS === 'ios') {
      reduceTransparencyListener = AccessibilityInfo.addEventListener(
        'reduceTransparencyChanged',
        (enabled) => {
          setReduceTransparencyEnabled(enabled);
          setAnnouncements(prev => [...prev, `Reduce transparency ${enabled ? 'enabled' : 'disabled'}`]);
        }
      );
    }

    // Bold text listener (iOS only)
    let boldTextListener: any;
    if (Platform.OS === 'ios') {
      boldTextListener = AccessibilityInfo.addEventListener(
        'boldTextChanged',
        (enabled) => {
          setBoldTextEnabled(enabled);
          setAnnouncements(prev => [...prev, `Bold text ${enabled ? 'enabled' : 'disabled'}`]);
        }
      );
    }

    return () => {
      screenReaderListener?.remove();
      reduceMotionListener?.remove();
      reduceTransparencyListener?.remove();
      boldTextListener?.remove();
    };
  };

  const announceForAccessibility = (message: string) => {
    AccessibilityInfo.announceForAccessibility(message);
    setAnnouncements(prev => [...prev, `Announced: "${message}"`]);
  };

  const announceForAccessibilityWithOptions = (message: string) => {
    if (Platform.OS === 'ios') {
      AccessibilityInfo.announceForAccessibilityWithOptions(message, {
        queue: false, // Don't queue, interrupt current announcement
      });
    } else {
      AccessibilityInfo.announceForAccessibility(message);
    }
    setAnnouncements(prev => [...prev, `Announced with options: "${message}"`]);
  };

  const setAccessibilityFocus = () => {
    // This would typically be used with a ref to a specific element
    Alert.alert(
      'setAccessibilityFocus',
      'This function is used to programmatically set focus to a specific element. It requires a reference to the element you want to focus on.'
    );
  };

  const clearAnnouncements = () => {
    setAnnouncements([]);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>AccessibilityInfo Demo</Text>
      <Text style={styles.description}>
        AccessibilityInfo provides information about the current accessibility
        settings and allows you to make announcements to screen readers.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility Settings</Text>
        <View style={styles.statusContainer}>
          <AccessibilityStatus label="Screen Reader" value={screenReaderEnabled} />
          <AccessibilityStatus 
            label="Reduce Motion" 
            value={reduceMotionEnabled} 
            available={Platform.OS === 'ios'} 
          />
          <AccessibilityStatus 
            label="Reduce Transparency" 
            value={reduceTransparencyEnabled} 
            available={Platform.OS === 'ios'} 
          />
          <AccessibilityStatus 
            label="Bold Text" 
            value={boldTextEnabled} 
            available={Platform.OS === 'ios'} 
          />
          <AccessibilityStatus 
            label="Grayscale" 
            value={grayscaleEnabled} 
            available={Platform.OS === 'ios'} 
          />
          <AccessibilityStatus 
            label="Invert Colors" 
            value={invertColorsEnabled} 
            available={Platform.OS === 'ios'} 
          />
        </View>
        
        <Pressable style={styles.button} onPress={checkAllAccessibilitySettings}>
          <Text style={styles.buttonText}>Refresh Settings</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Announcements</Text>
        <Text style={styles.sectionDescription}>
          These announcements will be read by screen readers like VoiceOver (iOS) or TalkBack (Android).
        </Text>
        
        <Pressable 
          style={styles.button} 
          onPress={() => announceForAccessibility('This is a basic accessibility announcement')}
        >
          <Text style={styles.buttonText}>Basic Announcement</Text>
        </Pressable>

        <Pressable 
          style={styles.button} 
          onPress={() => announceForAccessibilityWithOptions('This is an urgent announcement that interrupts current speech')}
        >
          <Text style={styles.buttonText}>Urgent Announcement (iOS)</Text>
        </Pressable>

        <Pressable 
          style={styles.button} 
          onPress={() => announceForAccessibility('The current time is ' + new Date().toLocaleTimeString())}
        >
          <Text style={styles.buttonText}>Announce Current Time</Text>
        </Pressable>

        <Pressable 
          style={styles.button} 
          onPress={() => announceForAccessibility('Screen reader is ' + (screenReaderEnabled ? 'enabled' : 'disabled'))}
        >
          <Text style={styles.buttonText}>Announce Screen Reader Status</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={setAccessibilityFocus}>
          <Text style={styles.buttonText}>Set Accessibility Focus (Demo)</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Announcement History</Text>
        <View style={styles.historyContainer}>
          {announcements.length === 0 ? (
            <Text style={styles.noHistory}>No announcements yet</Text>
          ) : (
            announcements.slice(-10).map((announcement, index) => (
              <View key={index} style={styles.historyItem}>
                <Text style={styles.historyText}>{announcement}</Text>
              </View>
            ))
          )}
        </View>
        
        <Pressable style={[styles.button, styles.clearButton]} onPress={clearAnnouncements}>
          <Text style={styles.buttonText}>Clear History</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Differences</Text>
        <Text style={styles.platformInfo}>
          <Text style={styles.platformTitle}>iOS (VoiceOver):</Text>
          {'\n'}• All accessibility settings available
          {'\n'}• announceForAccessibilityWithOptions() supported
          {'\n'}• More granular accessibility controls
          {'\n'}• Settings can be changed in Settings {">"} Accessibility
          {'\n\n'}
          <Text style={styles.platformTitle}>Android (TalkBack):</Text>
          {'\n'}• Limited accessibility settings available
          {'\n'}• Basic announceForAccessibility() only
          {'\n'}• Settings in Settings {">"} Accessibility {">"} TalkBack
          {'\n'}• Different gesture patterns than iOS
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Accessibility Best Practices</Text>
        <Text style={styles.bestPractices}>
          • Always provide meaningful accessibilityLabel props
          {'\n'}• Use accessibilityRole to describe element purpose
          {'\n'}• Provide accessibilityHint for complex interactions
          {'\n'}• Test with screen readers enabled
          {'\n'}• Use announcements sparingly to avoid overwhelming users
          {'\n'}• Respect user's motion preferences
          {'\n'}• Ensure sufficient color contrast
          {'\n'}• Make touch targets at least 44x44 points
          {'\n'}• Group related elements with accessibilityRole="group"
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Testing Instructions</Text>
        <Text style={styles.testingInfo}>
          <Text style={styles.testingTitle}>iOS Testing:</Text>
          {'\n'}1. Enable VoiceOver in Settings {">"} Accessibility {">"} VoiceOver
          {'\n'}2. Use triple-click home button to toggle quickly
          {'\n'}3. Navigate with left/right swipes
          {'\n'}4. Double-tap to activate elements
          {'\n\n'}
          <Text style={styles.testingTitle}>Android Testing:</Text>
          {'\n'}1. Enable TalkBack in Settings {">"} Accessibility {">"} TalkBack
          {'\n'}2. Use volume up + down buttons to toggle
          {'\n'}3. Navigate with left/right swipes
          {'\n'}4. Double-tap to activate elements
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
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
  sectionDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  statusContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statusLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  enabledStatus: {
    color: '#4CAF50',
  },
  disabledStatus: {
    color: '#F44336',
  },
  unavailableStatus: {
    color: '#666',
    fontStyle: 'italic',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    marginTop: 10,
  },
  historyContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    maxHeight: 200,
  },
  noHistory: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 20,
  },
  historyItem: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  historyText: {
    fontSize: 14,
    color: '#333',
  },
  platformInfo: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    lineHeight: 20,
  },
  platformTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  bestPractices: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    lineHeight: 20,
  },
  testingInfo: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    lineHeight: 20,
  },
  testingTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default AccessibilityInfoDemo;
