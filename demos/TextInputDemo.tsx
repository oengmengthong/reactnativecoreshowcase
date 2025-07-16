import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';

const TextInputDemo: React.FC = () => {
  const [basicText, setBasicText] = useState('');
  const [multilineText, setMultilineText] = useState('');
  const [passwordText, setPasswordText] = useState('');
  const [numericText, setNumericText] = useState('');
  const [emailText, setEmailText] = useState('');

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Text style={styles.title}>TextInput Demo</Text>
      <Text style={styles.description}>
        This demo showcases various TextInput configurations and keyboard types.
        TextInput is the core component for text input in React Native.
      </Text>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Basic Text Input</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter basic text..."
            value={basicText}
            onChangeText={setBasicText}
            accessibilityLabel="Basic text input"
          />
          <Text style={styles.inputValue}>Value: {basicText}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Multiline Input</Text>
          <TextInput
            style={[styles.textInput, styles.multilineInput]}
            placeholder="Enter multiline text..."
            multiline={true}
            numberOfLines={4}
            value={multilineText}
            onChangeText={setMultilineText}
            accessibilityLabel="Multiline text input"
          />
          <Text style={styles.inputValue}>Lines: {multilineText.split('\n').length}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Password Input</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter password..."
            secureTextEntry={true}
            value={passwordText}
            onChangeText={setPasswordText}
            accessibilityLabel="Password input"
          />
          <Text style={styles.inputValue}>Length: {passwordText.length}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Numeric Input</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter numbers..."
            keyboardType="numeric"
            value={numericText}
            onChangeText={setNumericText}
            accessibilityLabel="Numeric input"
          />
          <Text style={styles.inputValue}>Value: {numericText}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Email Input</Text>
          <TextInput
            style={styles.textInput}
            placeholder="Enter email address..."
            keyboardType="email-address"
            autoCapitalize="none"
            autoCorrect={false}
            value={emailText}
            onChangeText={setEmailText}
            accessibilityLabel="Email input"
          />
          <Text style={styles.inputValue}>Value: {emailText}</Text>
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.inputLabel}>Disabled Input</Text>
          <TextInput
            style={[styles.textInput, styles.disabledInput]}
            placeholder="This input is disabled"
            editable={false}
            value="Cannot edit this"
            accessibilityLabel="Disabled input"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
  inputContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
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
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#333',
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  disabledInput: {
    backgroundColor: '#f0f0f0',
    color: '#999',
  },
  inputValue: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
    fontStyle: 'italic',
  },
});

export default TextInputDemo;
