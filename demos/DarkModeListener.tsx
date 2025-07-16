import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Appearance, StatusBar } from 'react-native';

const DarkModeListener: React.FC = () => {
  const [colorScheme, setColorScheme] = useState(Appearance.getColorScheme());

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme: newColorScheme }) => {
      setColorScheme(newColorScheme);
    });

    return () => subscription?.remove();
  }, []);

  const isDark = colorScheme === 'dark';

  return (
    <View style={[styles.container, isDark && styles.darkContainer]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <Text style={[styles.title, isDark && styles.darkText]}>
        Dark Mode Listener
      </Text>
      <Text style={[styles.description, isDark && styles.darkText]}>
        This demo shows the Appearance API listening for system theme changes.
        The interface automatically adapts to light/dark mode changes.
      </Text>

      <View style={[styles.infoContainer, isDark && styles.darkInfoContainer]}>
        <Text style={[styles.infoTitle, isDark && styles.darkText]}>
          Current Theme
        </Text>
        <Text style={[styles.themeValue, isDark && styles.darkText]}>
          {colorScheme || 'Unknown'}
        </Text>
      </View>

      <View style={[styles.demoBox, isDark && styles.darkDemoBox]}>
        <Text style={[styles.demoText, isDark && styles.darkText]}>
          This box adapts to the current theme
        </Text>
      </View>

      <View style={styles.instructionsContainer}>
        <Text style={[styles.instructions, isDark && styles.darkText]}>
          Change your device's theme in Settings to see the automatic adaptation.
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
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
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
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  darkInfoContainer: {
    backgroundColor: '#333',
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  themeValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4ECDC4',
    textTransform: 'capitalize',
  },
  demoBox: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkDemoBox: {
    backgroundColor: '#444',
  },
  demoText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  instructionsContainer: {
    marginTop: 20,
  },
  instructions: {
    fontSize: 14,
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
  },
});

export default DarkModeListener;
