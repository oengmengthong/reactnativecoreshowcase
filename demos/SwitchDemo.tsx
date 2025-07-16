import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';

const SwitchDemo: React.FC = () => {
  const [isEnabled, setIsEnabled] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [locationServices, setLocationServices] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);
  const toggleDarkMode = () => setDarkMode(previousState => !previousState);
  const toggleNotifications = () => setNotifications(previousState => !previousState);
  const toggleLocationServices = () => setLocationServices(previousState => !previousState);

  return (
    <View style={[styles.container, darkMode && styles.darkContainer]}>
      <Text style={[styles.title, darkMode && styles.darkText]}>Switch Demo</Text>
      <Text style={[styles.description, darkMode && styles.darkText]}>
        The Switch component renders a boolean input that provides a way to toggle
        between two states.
      </Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Basic Switch</Text>
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, darkMode && styles.darkText]}>
            Basic toggle
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#81b0ff' }}
            thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            accessibilityLabel="Basic toggle switch"
          />
        </View>
        <Text style={[styles.statusText, darkMode && styles.darkText]}>
          Status: {isEnabled ? 'ON' : 'OFF'}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Settings Example</Text>
        
        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, darkMode && styles.darkText]}>
            Dark Mode
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#4CAF50' }}
            thumbColor={darkMode ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleDarkMode}
            value={darkMode}
            accessibilityLabel="Dark mode toggle"
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, darkMode && styles.darkText]}>
            Push Notifications
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#FF9500' }}
            thumbColor={notifications ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleNotifications}
            value={notifications}
            accessibilityLabel="Notifications toggle"
          />
        </View>

        <View style={styles.switchRow}>
          <Text style={[styles.switchLabel, darkMode && styles.darkText]}>
            Location Services
          </Text>
          <Switch
            trackColor={{ false: '#767577', true: '#007AFF' }}
            thumbColor={locationServices ? '#f4f3f4' : '#f4f3f4'}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleLocationServices}
            value={locationServices}
            accessibilityLabel="Location services toggle"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Platform Differences</Text>
        <Text style={[styles.note, darkMode && styles.darkNote]}>
          Platform: {Platform.OS} {Platform.Version}
          {'\n\n'}• iOS: Material Design switch with customizable colors
          {'\n'}• Android: Native switch component following platform guidelines
          {'\n'}• trackColor: Sets the color of the track (background)
          {'\n'}• thumbColor: Sets the color of the thumb (slider)
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, darkMode && styles.darkText]}>Current Settings</Text>
        <View style={styles.statusContainer}>
          <Text style={[styles.statusItem, darkMode && styles.darkText]}>
            • Dark Mode: {darkMode ? 'Enabled' : 'Disabled'}
          </Text>
          <Text style={[styles.statusItem, darkMode && styles.darkText]}>
            • Notifications: {notifications ? 'Enabled' : 'Disabled'}
          </Text>
          <Text style={[styles.statusItem, darkMode && styles.darkText]}>
            • Location: {locationServices ? 'Enabled' : 'Disabled'}
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
  darkContainer: {
    backgroundColor: '#121212',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#000',
  },
  darkText: {
    color: '#fff',
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
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  statusText: {
    fontSize: 14,
    color: '#666',
    marginTop: 10,
    textAlign: 'center',
  },
  note: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    lineHeight: 20,
  },
  darkNote: {
    backgroundColor: '#1e1e1e',
    color: '#ccc',
  },
  statusContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
  },
  statusItem: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
});

export default SwitchDemo;
