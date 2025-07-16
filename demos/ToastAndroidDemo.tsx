import React, { useState } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, ScrollView, ToastAndroid } from 'react-native';

const ToastAndroidDemo: React.FC = () => {
  const [toastCount, setToastCount] = useState(0);
  const [lastToastMessage, setLastToastMessage] = useState<string>('');

  const showToast = (message: string, duration: number = ToastAndroid.SHORT) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, duration);
      setToastCount(prev => prev + 1);
      setLastToastMessage(message);
    }
  };

  const showToastWithGravity = (message: string, duration: number, gravity: number) => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravity(message, duration, gravity);
      setToastCount(prev => prev + 1);
      setLastToastMessage(message);
    }
  };

  const showToastWithGravityAndOffset = (
    message: string,
    duration: number,
    gravity: number,
    xOffset: number,
    yOffset: number
  ) => {
    if (Platform.OS === 'android') {
      ToastAndroid.showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset);
      setToastCount(prev => prev + 1);
      setLastToastMessage(message);
    }
  };

  const showBasicToasts = () => {
    showToast('Basic SHORT toast', ToastAndroid.SHORT);
    setTimeout(() => {
      showToast('Basic LONG toast', ToastAndroid.LONG);
    }, 1000);
  };

  const showGravityToasts = () => {
    showToastWithGravity('TOP toast', ToastAndroid.SHORT, ToastAndroid.TOP);
    setTimeout(() => {
      showToastWithGravity('BOTTOM toast', ToastAndroid.SHORT, ToastAndroid.BOTTOM);
    }, 1000);
    setTimeout(() => {
      showToastWithGravity('CENTER toast', ToastAndroid.SHORT, ToastAndroid.CENTER);
    }, 2000);
  };

  const showOffsetToasts = () => {
    showToastWithGravityAndOffset('Left offset toast', ToastAndroid.SHORT, ToastAndroid.CENTER, -100, 0);
    setTimeout(() => {
      showToastWithGravityAndOffset('Right offset toast', ToastAndroid.SHORT, ToastAndroid.CENTER, 100, 0);
    }, 1000);
    setTimeout(() => {
      showToastWithGravityAndOffset('Up offset toast', ToastAndroid.SHORT, ToastAndroid.CENTER, 0, -100);
    }, 2000);
    setTimeout(() => {
      showToastWithGravityAndOffset('Down offset toast', ToastAndroid.SHORT, ToastAndroid.CENTER, 0, 100);
    }, 3000);
  };

  const showCustomMessages = () => {
    const messages = [
      'Hello Android!',
      'This is a toast message',
      'Short and sweet',
      'Success! ✅',
      'Error occurred ❌',
      'Warning! ⚠️',
      'Info message ℹ️',
      'Processing... ⏳',
      'Done! 🎉',
      'Long message that demonstrates how toast handles longer text content gracefully'
    ];

    messages.forEach((message, index) => {
      setTimeout(() => {
        showToast(message, index % 2 === 0 ? ToastAndroid.SHORT : ToastAndroid.LONG);
      }, index * 800);
    });
  };

  const showInteractiveDemo = () => {
    showToast('Tap this toast area to dismiss', ToastAndroid.LONG);
  };

  if (Platform.OS !== 'android') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>ToastAndroid Demo</Text>
        <View style={styles.notSupportedContainer}>
          <Text style={styles.notSupportedTitle}>🚫 Not Available</Text>
          <Text style={styles.notSupportedText}>
            ToastAndroid is only available on Android platform.
          </Text>
          <Text style={styles.notSupportedText}>
            Current platform: {Platform.OS}
          </Text>
          <Text style={styles.note}>
            On iOS, similar functionality can be achieved using:
            {'\n'}• Alert.alert() for simple messages
            {'\n'}• Third-party libraries like react-native-toast-message
            {'\n'}• Custom overlay components
            {'\n'}• StatusBar notifications
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ToastAndroid Demo</Text>
      <Text style={styles.description}>
        ToastAndroid provides a way to show brief messages to users on Android.
        Toasts appear as small popups that disappear automatically.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Toast Statistics</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Toasts Shown:</Text>
            <Text style={styles.statValue}>{toastCount}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Last Message:</Text>
            <Text style={styles.statValue}>{lastToastMessage || 'None'}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Toasts</Text>
        <Text style={styles.sectionDescription}>
          Simple toast messages with different durations
        </Text>
        
        <Pressable 
          style={styles.button}
          onPress={() => showToast('Short toast message', ToastAndroid.SHORT)}
        >
          <Text style={styles.buttonText}>Short Toast</Text>
        </Pressable>

        <Pressable 
          style={styles.button}
          onPress={() => showToast('Long toast message', ToastAndroid.LONG)}
        >
          <Text style={styles.buttonText}>Long Toast</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={showBasicToasts}>
          <Text style={styles.buttonText}>Show Both (Sequential)</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gravity Positioning</Text>
        <Text style={styles.sectionDescription}>
          Control where the toast appears on screen
        </Text>
        
        <Pressable 
          style={styles.button}
          onPress={() => showToastWithGravity('TOP positioned toast', ToastAndroid.SHORT, ToastAndroid.TOP)}
        >
          <Text style={styles.buttonText}>Top Toast</Text>
        </Pressable>

        <Pressable 
          style={styles.button}
          onPress={() => showToastWithGravity('CENTER positioned toast', ToastAndroid.SHORT, ToastAndroid.CENTER)}
        >
          <Text style={styles.buttonText}>Center Toast</Text>
        </Pressable>

        <Pressable 
          style={styles.button}
          onPress={() => showToastWithGravity('BOTTOM positioned toast', ToastAndroid.SHORT, ToastAndroid.BOTTOM)}
        >
          <Text style={styles.buttonText}>Bottom Toast</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={showGravityToasts}>
          <Text style={styles.buttonText}>Show All Positions</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Offset Positioning</Text>
        <Text style={styles.sectionDescription}>
          Fine-tune toast position with x/y offsets
        </Text>
        
        <Pressable 
          style={styles.button}
          onPress={() => showToastWithGravityAndOffset('Custom positioned toast', ToastAndroid.SHORT, ToastAndroid.CENTER, 0, -200)}
        >
          <Text style={styles.buttonText}>High Center Toast</Text>
        </Pressable>

        <Pressable 
          style={styles.button}
          onPress={() => showToastWithGravityAndOffset('Left aligned toast', ToastAndroid.SHORT, ToastAndroid.CENTER, -150, 0)}
        >
          <Text style={styles.buttonText}>Left Aligned Toast</Text>
        </Pressable>

        <Pressable 
          style={styles.button}
          onPress={() => showToastWithGravityAndOffset('Right aligned toast', ToastAndroid.SHORT, ToastAndroid.CENTER, 150, 0)}
        >
          <Text style={styles.buttonText}>Right Aligned Toast</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={showOffsetToasts}>
          <Text style={styles.buttonText}>Show All Offsets</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Demo Scenarios</Text>
        
        <Pressable style={styles.button} onPress={showCustomMessages}>
          <Text style={styles.buttonText}>Custom Messages Demo</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={showInteractiveDemo}>
          <Text style={styles.buttonText}>Interactive Demo</Text>
        </Pressable>

        <Pressable 
          style={styles.button}
          onPress={() => showToast('Toast with emoji! 🎉🚀✨', ToastAndroid.LONG)}
        >
          <Text style={styles.buttonText}>Emoji Toast</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Constants Reference</Text>
        <View style={styles.constantsContainer}>
          <View style={styles.constantSection}>
            <Text style={styles.constantTitle}>Duration Constants:</Text>
            <Text style={styles.constantItem}>SHORT: {ToastAndroid.SHORT}</Text>
            <Text style={styles.constantItem}>LONG: {ToastAndroid.LONG}</Text>
          </View>
          <View style={styles.constantSection}>
            <Text style={styles.constantTitle}>Gravity Constants:</Text>
            <Text style={styles.constantItem}>TOP: {ToastAndroid.TOP}</Text>
            <Text style={styles.constantItem}>BOTTOM: {ToastAndroid.BOTTOM}</Text>
            <Text style={styles.constantItem}>CENTER: {ToastAndroid.CENTER}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Methods</Text>
        <View style={styles.methodsContainer}>
          <View style={styles.methodItem}>
            <Text style={styles.methodName}>show(message, duration)</Text>
            <Text style={styles.methodDescription}>
              Shows a toast with default positioning
            </Text>
          </View>
          <View style={styles.methodItem}>
            <Text style={styles.methodName}>showWithGravity(message, duration, gravity)</Text>
            <Text style={styles.methodDescription}>
              Shows a toast with custom gravity positioning
            </Text>
          </View>
          <View style={styles.methodItem}>
            <Text style={styles.methodName}>showWithGravityAndOffset(message, duration, gravity, xOffset, yOffset)</Text>
            <Text style={styles.methodDescription}>
              Shows a toast with gravity and pixel offset positioning
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best Practices</Text>
        <Text style={styles.note}>
          • Use SHORT duration for simple confirmations
          {'\n'}• Use LONG duration for important messages
          {'\n'}• Keep messages brief and clear
          {'\n'}• Avoid showing too many toasts in sequence
          {'\n'}• Don't rely on toasts for critical information
          {'\n'}• Test on different screen sizes and orientations
          {'\n'}• Consider accessibility - toasts are not announced by TalkBack
          {'\n'}• Use for feedback, not for important user actions
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Toast Behavior</Text>
        <Text style={styles.note}>
          • Toasts appear above all other UI elements
          {'\n'}• They don't block user interaction
          {'\n'}• Multiple toasts queue up automatically
          {'\n'}• Toasts dismiss automatically after duration
          {'\n'}• No way to manually dismiss programmatically
          {'\n'}• Position depends on system UI (navigation bar, etc.)
          {'\n'}• Can be affected by system-wide toast settings
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
  notSupportedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notSupportedTitle: {
    fontSize: 48,
    marginBottom: 20,
  },
  notSupportedText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
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
  statsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  statValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4CAF50',
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
  constantsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  constantSection: {
    marginBottom: 15,
  },
  constantTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  constantItem: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  methodsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  methodItem: {
    marginBottom: 15,
  },
  methodName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  methodDescription: {
    fontSize: 14,
    color: '#666',
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

export default ToastAndroidDemo;
