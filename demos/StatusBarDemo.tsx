import React, { useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Pressable, Platform } from 'react-native';

const StatusBarDemo: React.FC = () => {
  const [statusBarStyle, setStatusBarStyle] = useState<'default' | 'light-content' | 'dark-content'>('default');
  const [backgroundColor, setBackgroundColor] = useState('#4ECDC4');
  const [hidden, setHidden] = useState(false);

  const statusBarStyles = [
    { key: 'default', label: 'Default' },
    { key: 'light-content', label: 'Light Content' },
    { key: 'dark-content', label: 'Dark Content' },
  ] as const;

  const backgroundColors = [
    { color: '#4ECDC4', label: 'Teal' },
    { color: '#FF6B6B', label: 'Red' },
    { color: '#45B7D1', label: 'Blue' },
    { color: '#96CEB4', label: 'Green' },
    { color: '#FFEAA7', label: 'Yellow' },
    { color: '#DDA0DD', label: 'Purple' },
  ];

  return (
    <View style={[styles.container, { backgroundColor }]}>
      <StatusBar
        barStyle={statusBarStyle}
        backgroundColor={backgroundColor}
        hidden={hidden}
        translucent={false}
        animated={true}
      />
      
      <Text style={styles.title}>StatusBar Demo</Text>
      <Text style={styles.description}>
        This demo shows how to control the StatusBar appearance.
        StatusBar affects the system status bar at the top of the screen.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Current Settings</Text>
        <View style={styles.currentSettings}>
          <Text style={styles.settingText}>Style: {statusBarStyle}</Text>
          <Text style={styles.settingText}>Background: {backgroundColor}</Text>
          <Text style={styles.settingText}>Hidden: {hidden ? 'Yes' : 'No'}</Text>
          <Text style={styles.settingText}>Platform: {Platform.OS}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status Bar Style</Text>
        <Text style={styles.note}>
          Changes the color of status bar text and icons
        </Text>
        <View style={styles.buttonRow}>
          {statusBarStyles.map((style) => (
            <Pressable
              key={style.key}
              style={[
                styles.button,
                statusBarStyle === style.key && styles.buttonActive,
              ]}
              onPress={() => setStatusBarStyle(style.key)}
            >
              <Text style={[
                styles.buttonText,
                statusBarStyle === style.key && styles.buttonTextActive,
              ]}>
                {style.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Background Color</Text>
        <Text style={styles.note}>
          Changes the background color of the status bar (Android only)
        </Text>
        <View style={styles.colorGrid}>
          {backgroundColors.map((bg) => (
            <Pressable
              key={bg.color}
              style={[
                styles.colorButton,
                { backgroundColor: bg.color },
                backgroundColor === bg.color && styles.colorButtonActive,
              ]}
              onPress={() => setBackgroundColor(bg.color)}
            >
              <Text style={styles.colorLabel}>{bg.label}</Text>
            </Pressable>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Visibility</Text>
        <Text style={styles.note}>
          Hide or show the status bar completely
        </Text>
        <Pressable
          style={[styles.button, styles.toggleButton]}
          onPress={() => setHidden(!hidden)}
        >
          <Text style={styles.buttonText}>
            {hidden ? 'Show Status Bar' : 'Hide Status Bar'}
          </Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Platform Differences</Text>
        <View style={styles.platformInfo}>
          <Text style={styles.platformText}>
            <Text style={styles.platformTitle}>iOS:</Text>
            {'\n'}• Only barStyle affects appearance
            {'\n'}• backgroundColor is ignored
            {'\n'}• Translucent property available
          </Text>
          <Text style={styles.platformText}>
            <Text style={styles.platformTitle}>Android:</Text>
            {'\n'}• Both barStyle and backgroundColor work
            {'\n'}• More granular control available
            {'\n'}• SystemUI integration
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
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight! + 20 : 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#fff',
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: 'center',
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
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
    marginBottom: 10,
    color: '#333',
  },
  note: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    fontStyle: 'italic',
  },
  currentSettings: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
  },
  settingText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  button: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  buttonActive: {
    backgroundColor: '#4ECDC4',
    borderColor: '#45B7D1',
  },
  buttonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  buttonTextActive: {
    color: '#fff',
    fontWeight: 'bold',
  },
  colorGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  colorButton: {
    width: 100,
    height: 60,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'transparent',
  },
  colorButtonActive: {
    borderColor: '#333',
  },
  colorLabel: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  toggleButton: {
    backgroundColor: '#FF6B6B',
    alignSelf: 'center',
    paddingHorizontal: 20,
  },
  platformInfo: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
  },
  platformText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
    lineHeight: 20,
  },
  platformTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default StatusBarDemo;
