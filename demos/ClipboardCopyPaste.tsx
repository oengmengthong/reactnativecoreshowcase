import React, { useState } from 'react';
import { View, Text, StyleSheet, Clipboard, Alert, Pressable } from 'react-native';

const ClipboardCopyPaste: React.FC = () => {
  const [clipboardContent, setClipboardContent] = useState('');
  const [copiedText, setCopiedText] = useState('');

  const sampleText = 'Hello from React Native Core Showcase!';

  const copyToClipboard = async () => {
    try {
      await Clipboard.setString(sampleText);
      setCopiedText(sampleText);
      Alert.alert('Success', 'Text copied to clipboard!');
    } catch (error) {
      Alert.alert('Error', 'Failed to copy text');
    }
  };

  const pasteFromClipboard = async () => {
    try {
      const content = await Clipboard.getString();
      setClipboardContent(content);
    } catch (error) {
      Alert.alert('Error', 'Failed to read clipboard');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Clipboard Demo</Text>
      <Text style={styles.description}>
        This demo showcases the Clipboard API for copy and paste functionality.
        It demonstrates reading from and writing to the system clipboard.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Copy Text</Text>
        <Text style={styles.sampleText}>{sampleText}</Text>
        <Pressable style={styles.button} onPress={copyToClipboard}>
          <Text style={styles.buttonText}>Copy to Clipboard</Text>
        </Pressable>
        {copiedText ? (
          <Text style={styles.result}>Copied: {copiedText}</Text>
        ) : null}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Paste Text</Text>
        <Pressable style={styles.button} onPress={pasteFromClipboard}>
          <Text style={styles.buttonText}>Paste from Clipboard</Text>
        </Pressable>
        {clipboardContent ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultLabel}>Clipboard content:</Text>
            <Text style={styles.result}>{clipboardContent}</Text>
          </View>
        ) : null}
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
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  sampleText: {
    fontSize: 16,
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resultContainer: {
    marginTop: 10,
  },
  resultLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  result: {
    fontSize: 14,
    color: '#666',
    padding: 10,
    backgroundColor: '#e8f5e8',
    borderRadius: 5,
  },
});

export default ClipboardCopyPaste;
