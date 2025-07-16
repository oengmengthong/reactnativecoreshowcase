import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, AppState, Platform } from 'react-native';

interface AppStateChange {
  state: string;
  timestamp: Date;
}

const AppStateDemo: React.FC = () => {
  const [appState, setAppState] = useState<string>(AppState.currentState);
  const [stateHistory, setStateHistory] = useState<AppStateChange[]>([]);

  useEffect(() => {
    const subscription = AppState.addEventListener('change', handleAppStateChange);

    // Add initial state to history
    setStateHistory([{
      state: AppState.currentState,
      timestamp: new Date()
    }]);

    return () => {
      subscription?.remove();
    };
  }, []);

  const handleAppStateChange = (nextAppState: string) => {
    setAppState(nextAppState);
    setStateHistory(prev => [...prev, {
      state: nextAppState,
      timestamp: new Date()
    }].slice(-10)); // Keep only last 10 entries
  };

  const getStateDescription = (state: string) => {
    switch (state) {
      case 'active':
        return 'App is running in the foreground';
      case 'background':
        return 'App is running in the background';
      case 'inactive':
        return 'App is transitioning between foreground and background';
      case 'unknown':
        return 'App state is unknown';
      default:
        return 'Unknown state';
    }
  };

  const getStateColor = (state: string) => {
    switch (state) {
      case 'active':
        return '#4CAF50';
      case 'background':
        return '#FF9800';
      case 'inactive':
        return '#2196F3';
      default:
        return '#9E9E9E';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>AppState Demo</Text>
      <Text style={styles.description}>
        AppState allows you to monitor the current state of your app and respond
        to app state changes.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current App State</Text>
        <View style={[styles.currentStateContainer, { backgroundColor: getStateColor(appState) }]}>
          <Text style={styles.currentStateText}>{appState.toUpperCase()}</Text>
        </View>
        <Text style={styles.stateDescription}>
          {getStateDescription(appState)}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test App State Changes</Text>
        <Text style={styles.instructionText}>
          Try these actions to see app state changes:
        </Text>
        <View style={styles.instructionContainer}>
          <Text style={styles.instructionItem}>
            📱 Press the home button → background
          </Text>
          <Text style={styles.instructionItem}>
            🔄 Return to the app → active
          </Text>
          <Text style={styles.instructionItem}>
            📋 Open app switcher → inactive
          </Text>
          {Platform.OS === 'ios' && (
            <Text style={styles.instructionItem}>
              📞 Receive a call → inactive
            </Text>
          )}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>State History</Text>
        <Text style={styles.historyDescription}>
          Last {stateHistory.length} state changes:
        </Text>
        <View style={styles.historyContainer}>
          {stateHistory.slice().reverse().map((entry, index) => (
            <View key={index} style={styles.historyItem}>
              <View style={[styles.historyDot, { backgroundColor: getStateColor(entry.state) }]} />
              <Text style={styles.historyState}>{entry.state}</Text>
              <Text style={styles.historyTime}>{formatTime(entry.timestamp)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App States Explained</Text>
        <View style={styles.stateExplanation}>
          <View style={styles.stateItem}>
            <View style={[styles.stateDot, styles.activeStateDot]} />
            <View style={styles.stateInfo}>
              <Text style={styles.stateName}>Active</Text>
              <Text style={styles.stateDesc}>App is running in the foreground</Text>
            </View>
          </View>
          <View style={styles.stateItem}>
            <View style={[styles.stateDot, styles.backgroundStateDot]} />
            <View style={styles.stateInfo}>
              <Text style={styles.stateName}>Background</Text>
              <Text style={styles.stateDesc}>App is running in the background</Text>
            </View>
          </View>
          <View style={styles.stateItem}>
            <View style={[styles.stateDot, styles.inactiveStateDot]} />
            <View style={styles.stateInfo}>
              <Text style={styles.stateName}>Inactive</Text>
              <Text style={styles.stateDesc}>App is transitioning between states</Text>
            </View>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Common Use Cases</Text>
        <Text style={styles.note}>
          • Pause/resume animations when app goes to background
          {'\n'}• Save user data when app becomes inactive
          {'\n'}• Stop/start location tracking based on app state
          {'\n'}• Pause video playback when app goes to background
          {'\n'}• Refresh data when app becomes active again
          {'\n'}• Implement "time away" features
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Information</Text>
        <Text style={styles.platformInfo}>
          Platform: {Platform.OS} {Platform.Version}
          {'\n'}Current State: {appState}
          {'\n'}Total Changes: {stateHistory.length}
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
  currentStateContainer: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  currentStateText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  stateDescription: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  instructionText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  instructionContainer: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
  },
  instructionItem: {
    fontSize: 14,
    color: '#1976D2',
    marginBottom: 8,
  },
  historyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  historyContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
  },
  historyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  historyDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  historyState: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    flex: 1,
  },
  historyTime: {
    fontSize: 12,
    color: '#666',
  },
  stateExplanation: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
  },
  stateItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  stateDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 15,
  },
  stateInfo: {
    flex: 1,
  },
  stateName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  stateDesc: {
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
  platformInfo: {
    fontSize: 14,
    color: '#333',
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 8,
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
  },
  activeStateDot: {
    backgroundColor: '#4CAF50',
  },
  backgroundStateDot: {
    backgroundColor: '#FF9800',
  },
  inactiveStateDot: {
    backgroundColor: '#2196F3',
  },
});

export default AppStateDemo;
