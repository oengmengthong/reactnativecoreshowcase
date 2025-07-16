import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, Pressable } from 'react-native';

const ImageDemo: React.FC = () => {
  const [imageLoadError, setImageLoadError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const localImageUri = 'https://reactnative.dev/img/tiny_logo.png';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Image Demo</Text>
      <Text style={styles.description}>
        This demo showcases the Image component with various configurations.
        Image supports local resources, network images, and different resize modes.
      </Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Network Image</Text>
          <Image
            source={{ uri: localImageUri }}
            style={styles.networkImage}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoadError(true)}
            accessibilityLabel="React Native logo"
          />
          <Text style={styles.statusText}>
            Status: {imageLoadError ? 'Error' : imageLoaded ? 'Loaded' : 'Loading...'}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resize Modes</Text>
          
          <View style={styles.resizeModeContainer}>
            <Text style={styles.resizeLabel}>Cover</Text>
            <Image
              source={{ uri: localImageUri }}
              style={styles.resizeImage}
              resizeMode="cover"
            />
          </View>

          <View style={styles.resizeModeContainer}>
            <Text style={styles.resizeLabel}>Contain</Text>
            <Image
              source={{ uri: localImageUri }}
              style={styles.resizeImage}
              resizeMode="contain"
            />
          </View>

          <View style={styles.resizeModeContainer}>
            <Text style={styles.resizeLabel}>Stretch</Text>
            <Image
              source={{ uri: localImageUri }}
              style={styles.resizeImage}
              resizeMode="stretch"
            />
          </View>

          <View style={styles.resizeModeContainer}>
            <Text style={styles.resizeLabel}>Center</Text>
            <Image
              source={{ uri: localImageUri }}
              style={styles.resizeImage}
              resizeMode="center"
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Styled Images</Text>
          
          <Image
            source={{ uri: localImageUri }}
            style={styles.roundedImage}
            accessibilityLabel="Rounded image"
          />

          <Image
            source={{ uri: localImageUri }}
            style={styles.circularImage}
            accessibilityLabel="Circular image"
          />

          <Image
            source={{ uri: localImageUri }}
            style={styles.borderedImage}
            accessibilityLabel="Bordered image"
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Background Image Effect</Text>
          <View style={styles.backgroundImageContainer}>
            <Image
              source={{ uri: localImageUri }}
              style={styles.backgroundImage}
              resizeMode="cover"
            />
            <View style={styles.overlay}>
              <Text style={styles.overlayText}>Overlay Text</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Loading States</Text>
          <Pressable
            style={styles.refreshButton}
            onPress={() => {
              setImageLoaded(false);
              setImageLoadError(false);
            }}
          >
            <Text style={styles.refreshButtonText}>Refresh Image</Text>
          </Pressable>
        </View>
      </ScrollView>
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
  scrollView: {
    flex: 1,
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
  networkImage: {
    width: '100%',
    height: 150,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  resizeModeContainer: {
    marginBottom: 15,
  },
  resizeLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  resizeImage: {
    width: '100%',
    height: 100,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
  },
  roundedImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    alignSelf: 'center',
  },
  circularImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    marginBottom: 15,
    alignSelf: 'center',
  },
  borderedImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#4ECDC4',
    backgroundColor: '#f0f0f0',
    alignSelf: 'center',
  },
  backgroundImageContainer: {
    width: '100%',
    height: 120,
    borderRadius: 10,
    overflow: 'hidden',
    position: 'relative',
  },
  backgroundImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlayText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  refreshButton: {
    backgroundColor: '#4ECDC4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  refreshButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ImageDemo;
