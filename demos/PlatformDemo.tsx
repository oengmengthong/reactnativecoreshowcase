import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, Dimensions, ScrollView, Alert } from 'react-native';

const PlatformDemo: React.FC = () => {
  const [screenData, setScreenData] = useState(Dimensions.get('screen'));
  const [windowData, setWindowData] = useState(Dimensions.get('window'));
  
  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window, screen }) => {
      setWindowData(window);
      setScreenData(screen);
    });

    return () => subscription?.remove();
  }, []);

  const renderPlatformContent = () => {
    if (Platform.OS === 'ios') {
      return (
        <View style={styles.platformContent}>
          <Text style={styles.platformTitle}>🍎 iOS Specific Content</Text>
          <Text style={styles.platformText}>
            This content is only shown on iOS devices.
          </Text>
          <Text style={styles.platformText}>
            iOS Version: {Platform.Version}
          </Text>
        </View>
      );
    } else if (Platform.OS === 'android') {
      return (
        <View style={styles.platformContent}>
          <Text style={styles.platformTitle}>🤖 Android Specific Content</Text>
          <Text style={styles.platformText}>
            This content is only shown on Android devices.
          </Text>
          <Text style={styles.platformText}>
            Android API Level: {Platform.Version}
          </Text>
        </View>
      );
    } else {
      return (
        <View style={styles.platformContent}>
          <Text style={styles.platformTitle}>🌐 Other Platform</Text>
          <Text style={styles.platformText}>
            Running on an unknown platform.
          </Text>
        </View>
      );
    }
  };

  const showPlatformAlert = () => {
    if (Platform.OS === 'ios') {
      // iOS specific behavior
      Alert.alert('iOS Alert', 'This is an iOS-specific alert');
    } else if (Platform.OS === 'android') {
      // Android specific behavior
      Alert.alert('Android Alert', 'This is an Android-specific alert');
    } else {
      Alert.alert('Unknown Platform', 'Unknown Platform Alert');
    }
  };

  const platformStyles = StyleSheet.create({
    platformButton: {
      ...Platform.select({
        ios: {
          backgroundColor: '#007AFF',
          borderRadius: 8,
        },
        android: {
          backgroundColor: '#2196F3',
          borderRadius: 4,
          elevation: 2,
        },
        default: {
          backgroundColor: '#666',
          borderRadius: 4,
        },
      }),
      padding: 15,
      alignItems: 'center',
      marginBottom: 10,
    },
    platformButtonText: {
      color: '#fff',
      fontSize: 16,
      fontWeight: '600',
      ...Platform.select({
        ios: {
          fontFamily: 'System',
        },
        android: {
          fontFamily: 'Roboto',
        },
      }),
    },
  });

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Platform Demo</Text>
      <Text style={styles.description}>
        Platform module provides information about the current platform and
        allows you to create platform-specific code.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Information</Text>
        <View style={styles.infoGrid}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>OS:</Text>
            <Text style={styles.infoValue}>{Platform.OS}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Version:</Text>
            <Text style={styles.infoValue}>{Platform.Version}</Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>isPad:</Text>
            <Text style={styles.infoValue}>
              {Platform.OS === 'ios' ? 'iOS only' : 'N/A'}
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>isTesting:</Text>
            <Text style={styles.infoValue}>
              {Platform.isTesting !== undefined ? String(Platform.isTesting) : 'N/A'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform.select Example</Text>
        {renderPlatformContent()}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform-Specific Styling</Text>
        <Pressable style={platformStyles.platformButton} onPress={showPlatformAlert}>
          <Text style={platformStyles.platformButtonText}>
            Platform-Styled Button
          </Text>
        </Pressable>
        <Text style={styles.note}>
          This button has different styling on iOS vs Android using Platform.select()
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Constants (Android Only)</Text>
        <View style={styles.constantsContainer}>
          {Platform.constants && typeof Platform.constants === 'object' ? (
            Object.entries(Platform.constants).map(([key, value]) => (
              <View key={key} style={styles.constantItem}>
                <Text style={styles.constantKey}>{key}:</Text>
                <Text style={styles.constantValue}>{String(value)}</Text>
              </View>
            ))
          ) : (
            <Text style={styles.noConstants}>
              No platform constants available (iOS) or not an object
            </Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Screen Dimensions</Text>
        <View style={styles.dimensionsContainer}>
          <View style={styles.dimensionSection}>
            <Text style={styles.dimensionTitle}>Window</Text>
            <Text style={styles.dimensionText}>Width: {windowData.width}</Text>
            <Text style={styles.dimensionText}>Height: {windowData.height}</Text>
            <Text style={styles.dimensionText}>Scale: {windowData.scale}</Text>
            <Text style={styles.dimensionText}>Font Scale: {windowData.fontScale}</Text>
          </View>
          <View style={styles.dimensionSection}>
            <Text style={styles.dimensionTitle}>Screen</Text>
            <Text style={styles.dimensionText}>Width: {screenData.width}</Text>
            <Text style={styles.dimensionText}>Height: {screenData.height}</Text>
            <Text style={styles.dimensionText}>Scale: {screenData.scale}</Text>
            <Text style={styles.dimensionText}>Font Scale: {screenData.fontScale}</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Conditional Rendering</Text>
        {Platform.OS === 'ios' && (
          <View style={styles.conditionalContent}>
            <Text style={styles.conditionalTitle}>iOS Only Content</Text>
            <Text style={styles.conditionalText}>
              This content is only rendered on iOS using conditional rendering.
            </Text>
          </View>
        )}
        {Platform.OS === 'android' && (
          <View style={styles.conditionalContent}>
            <Text style={styles.conditionalTitle}>Android Only Content</Text>
            <Text style={styles.conditionalText}>
              This content is only rendered on Android using conditional rendering.
            </Text>
          </View>
        )}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Detection Methods</Text>
        <View style={styles.methodsContainer}>
          <View style={styles.methodItem}>
            <Text style={styles.methodTitle}>Platform.OS</Text>
            <Text style={styles.methodDescription}>
              Returns the current platform: 'ios', 'android', 'web', etc.
            </Text>
            <Text style={styles.methodExample}>
              Example: Platform.OS === 'ios'
            </Text>
          </View>
          <View style={styles.methodItem}>
            <Text style={styles.methodTitle}>Platform.select()</Text>
            <Text style={styles.methodDescription}>
              Returns platform-specific values from an object
            </Text>
            <Text style={styles.methodExample}>
              Example: Platform.select({`{ios: 'iOS', android: 'Android'}`})
            </Text>
          </View>
          <View style={styles.methodItem}>
            <Text style={styles.methodTitle}>Platform.Version</Text>
            <Text style={styles.methodDescription}>
              iOS: String version (e.g., '14.0'), Android: Number API level (e.g., 28)
            </Text>
            <Text style={styles.methodExample}>
              Current: {Platform.Version}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best Practices</Text>
        <Text style={styles.bestPractices}>
          • Use Platform.select() for styling differences
          {'\n'}• Use conditional rendering for component differences
          {'\n'}• Prefer platform-specific files (.ios.js, .android.js) for large differences
          {'\n'}• Test on both platforms thoroughly
          {'\n'}• Use Platform.Version for version-specific features
          {'\n'}• Consider using react-native-device-info for more device details
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
  infoGrid: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  platformContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  platformTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  platformText: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  note: {
    fontSize: 14,
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
  },
  constantsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  constantItem: {
    flexDirection: 'row',
    paddingVertical: 4,
  },
  constantKey: {
    fontSize: 14,
    color: '#666',
    fontWeight: '600',
    minWidth: 100,
  },
  constantValue: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  noConstants: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
  dimensionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dimensionSection: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  dimensionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  dimensionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  conditionalContent: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  conditionalTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#2E7D32',
  },
  conditionalText: {
    fontSize: 14,
    color: '#388E3C',
  },
  methodsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  methodItem: {
    marginBottom: 20,
  },
  methodTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  methodDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  methodExample: {
    fontSize: 13,
    color: '#007AFF',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  bestPractices: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    lineHeight: 20,
  },
});

export default PlatformDemo;
