import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, Platform, StatusBar } from 'react-native';

const SafeAreaViewDemo: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>SafeAreaView Demo</Text>
      <Text style={styles.description}>
        This demo shows how SafeAreaView handles safe area insets.
        SafeAreaView automatically adds padding to avoid notches, status bars, and navigation bars.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Without SafeAreaView</Text>
        <View style={styles.unsafeContainer}>
          <Text style={styles.unsafeText}>
            This content might be hidden behind the status bar or notch!
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With SafeAreaView</Text>
        <SafeAreaView style={styles.safeContainer}>
          <Text style={styles.safeText}>
            This content is safely positioned within the safe area bounds!
          </Text>
        </SafeAreaView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Information</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>Platform: {Platform.OS}</Text>
          <Text style={styles.infoText}>Version: {Platform.Version}</Text>
          <Text style={styles.infoText}>
            Status Bar Height: {StatusBar.currentHeight || 'N/A (iOS)'}
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Safe Area Edges</Text>
        <SafeAreaView style={[styles.safeContainer, { backgroundColor: '#E8F5E8' }]}>
          <Text style={styles.safeText}>All edges (default)</Text>
        </SafeAreaView>
        <SafeAreaView style={[styles.safeContainer, { backgroundColor: '#F5E8E8' }]}>
          <Text style={styles.safeText}>Top edge only</Text>
        </SafeAreaView>
        <SafeAreaView style={[styles.safeContainer, { backgroundColor: '#E8E8F5' }]}>
          <Text style={styles.safeText}>Bottom edge only</Text>
        </SafeAreaView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Nested SafeAreaView</Text>
        <SafeAreaView style={styles.outerSafeArea}>
          <Text style={styles.outerText}>Outer SafeAreaView</Text>
          <SafeAreaView style={styles.innerSafeArea}>
            <Text style={styles.innerText}>Inner SafeAreaView</Text>
          </SafeAreaView>
        </SafeAreaView>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Usage Guidelines</Text>
        <View style={styles.guidelineContainer}>
          <Text style={styles.guidelineText}>
            • Use SafeAreaView at the root of your screen components
          </Text>
          <Text style={styles.guidelineText}>
            • Primarily beneficial on iOS (handles notches and safe areas)
          </Text>
          <Text style={styles.guidelineText}>
            • On Android, mainly handles status bar overlap
          </Text>
          <Text style={styles.guidelineText}>
            • Can be styled like a regular View component
          </Text>
          <Text style={styles.guidelineText}>
            • Automatically applies padding based on device safe area
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
  unsafeContainer: {
    backgroundColor: '#FFE5E5',
    padding: 15,
    borderRadius: 8,
    borderColor: '#FF6B6B',
    borderWidth: 1,
  },
  unsafeText: {
    fontSize: 14,
    color: '#D32F2F',
  },
  safeContainer: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 8,
    borderColor: '#4ECDC4',
    borderWidth: 1,
    minHeight: 50,
  },
  safeText: {
    fontSize: 14,
    color: '#2E7D32',
  },
  infoContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  outerSafeArea: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    borderColor: '#2196F3',
    borderWidth: 1,
  },
  outerText: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 10,
  },
  innerSafeArea: {
    backgroundColor: '#F3E5F5',
    padding: 10,
    borderRadius: 6,
    borderColor: '#9C27B0',
    borderWidth: 1,
  },
  innerText: {
    fontSize: 12,
    color: '#7B1FA2',
  },
  guidelineContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
  },
  guidelineText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
});

export default SafeAreaViewDemo;
