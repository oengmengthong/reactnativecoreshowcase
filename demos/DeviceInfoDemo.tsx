import React from 'react';
import { View, Text, StyleSheet, Dimensions, PixelRatio, Platform } from 'react-native';

const DeviceInfoDemo: React.FC = () => {
  const { width, height } = Dimensions.get('window');
  const screenData = Dimensions.get('screen');
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Device Info Demo</Text>
      <Text style={styles.description}>
        This demo shows device information using Dimensions, PixelRatio, and Platform APIs.
      </Text>

      <View style={styles.infoContainer}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Screen Dimensions</Text>
          <Text style={styles.infoText}>Window Width: {width.toFixed(2)}px</Text>
          <Text style={styles.infoText}>Window Height: {height.toFixed(2)}px</Text>
          <Text style={styles.infoText}>Screen Width: {screenData.width.toFixed(2)}px</Text>
          <Text style={styles.infoText}>Screen Height: {screenData.height.toFixed(2)}px</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pixel Ratio</Text>
          <Text style={styles.infoText}>
            Pixel Ratio: {PixelRatio.get()}
          </Text>
          <Text style={styles.infoText}>
            Font Scale: {PixelRatio.getFontScale()}
          </Text>
          <Text style={styles.infoText}>
            Pixel Size: {PixelRatio.getPixelSizeForLayoutSize(1)}px
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Info</Text>
          <Text style={styles.infoText}>OS: {Platform.OS}</Text>
          <Text style={styles.infoText}>Version: {Platform.Version}</Text>
          {Platform.OS === 'ios' && (
            <Text style={styles.infoText}>
              Is iPad: {Platform.isPad ? 'Yes' : 'No'}
            </Text>
          )}
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
  infoContainer: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#666',
  },
});

export default DeviceInfoDemo;
