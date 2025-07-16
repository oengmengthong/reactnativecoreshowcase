import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Pressable } from 'react-native';

const ActivityIndicatorDemo: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLoading) {
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsLoading(false);
            return 0;
          }
          return prev + 10;
        });
      }, 500);
    }
    return () => clearInterval(interval);
  }, [isLoading]);

  const startLoading = () => {
    setIsLoading(true);
    setProgress(0);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ActivityIndicator Demo</Text>
      <Text style={styles.description}>
        This demo showcases the ActivityIndicator component for showing loading states.
        ActivityIndicator displays a circular loading spinner with customizable styling.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Indicators</Text>
        <View style={styles.indicatorRow}>
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="small" color="#4ECDC4" />
            <Text style={styles.indicatorLabel}>Small</Text>
          </View>
          <View style={styles.indicatorContainer}>
            <ActivityIndicator size="large" color="#FF6B6B" />
            <Text style={styles.indicatorLabel}>Large</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Color Variations</Text>
        <View style={styles.colorRow}>
          <ActivityIndicator size="large" color="#4ECDC4" />
          <ActivityIndicator size="large" color="#FF6B6B" />
          <ActivityIndicator size="large" color="#45B7D1" />
          <ActivityIndicator size="large" color="#96CEB4" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Loading Simulation</Text>
        <View style={styles.loadingContainer}>
          {isLoading ? (
            <View style={styles.loadingContent}>
              <ActivityIndicator size="large" color="#4ECDC4" />
              <Text style={styles.loadingText}>Loading... {progress}%</Text>
            </View>
          ) : (
            <View style={styles.loadingContent}>
              <Text style={styles.completedText}>✓ Loading Complete!</Text>
            </View>
          )}
        </View>
        <Pressable
          style={[styles.button, isLoading && styles.buttonDisabled]}
          onPress={startLoading}
          disabled={isLoading}
        >
          <Text style={styles.buttonText}>
            {isLoading ? 'Loading...' : 'Start Loading'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Overlay Loading</Text>
        <View style={styles.overlayDemo}>
          <Text style={styles.overlayText}>Content behind loader</Text>
          <View style={styles.overlay}>
            <ActivityIndicator size="large" color="#fff" />
            <Text style={styles.overlayLoadingText}>Processing...</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Inline Loading</Text>
        <View style={styles.inlineContainer}>
          <Text style={styles.inlineText}>Saving</Text>
          <ActivityIndicator size="small" color="#4ECDC4" />
        </View>
        <View style={styles.inlineContainer}>
          <ActivityIndicator size="small" color="#FF6B6B" />
          <Text style={styles.inlineText}>Uploading file...</Text>
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
  indicatorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  indicatorContainer: {
    alignItems: 'center',
  },
  indicatorLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  loadingContainer: {
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    marginBottom: 15,
  },
  loadingContent: {
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
    marginTop: 10,
  },
  completedText: {
    fontSize: 18,
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: '#4ECDC4',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  overlayDemo: {
    height: 120,
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  overlayText: {
    fontSize: 16,
    color: '#666',
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  overlayLoadingText: {
    color: 'white',
    fontSize: 16,
    marginTop: 10,
  },
  inlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    gap: 10,
  },
  inlineText: {
    fontSize: 16,
    color: '#666',
  },
});

export default ActivityIndicatorDemo;
