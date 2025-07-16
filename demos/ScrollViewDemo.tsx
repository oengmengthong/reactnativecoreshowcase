import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, RefreshControl } from 'react-native';

const ScrollViewDemo: React.FC = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [refreshCount, setRefreshCount] = useState(0);

  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshCount(prev => prev + 1);
      setRefreshing(false);
    }, 1000);
  };

  const generateContent = () => {
    const items = [];
    for (let i = 1; i <= 30; i++) {
      items.push(
        <View key={i} style={styles.contentItem}>
          <Text style={styles.itemTitle}>Item {i}</Text>
          <Text style={styles.itemDescription}>
            This is a longer description for item {i}. ScrollView allows you to scroll through content that exceeds the screen size.
          </Text>
        </View>
      );
    }
    return items;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ScrollView Demo</Text>
      <Text style={styles.description}>
        This demo shows ScrollView with RefreshControl functionality.
        ScrollView is ideal for scrollable content with known size.
      </Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Refreshed: {refreshCount} times</Text>
        <Text style={styles.instructionText}>Pull down to refresh</Text>
      </View>

      <ScrollView
        style={styles.scrollView}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={['#4ECDC4']}
            tintColor="#4ECDC4"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
          {generateContent()}
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
    marginBottom: 15,
    textAlign: 'center',
    color: '#666',
  },
  statsContainer: {
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    alignItems: 'center',
  },
  statsText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  instructionText: {
    color: 'white',
    fontSize: 14,
    opacity: 0.9,
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    padding: 10,
  },
  contentItem: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 10,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  itemDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default ScrollViewDemo;
