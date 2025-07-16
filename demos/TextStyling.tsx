import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const TextStyling: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Text Styling Demo</Text>
      <Text style={styles.description}>
        This demo showcases various Text component styling options.
      </Text>
      
      <View style={styles.demoContainer}>
        <Text style={styles.heading}>Heading Text</Text>
        <Text style={styles.subheading}>Subheading Text</Text>
        <Text style={styles.body}>Body text with normal styling</Text>
        <Text style={styles.bold}>Bold text</Text>
        <Text style={styles.italic}>Italic text</Text>
        <Text style={styles.underline}>Underlined text</Text>
        <Text style={styles.colored}>Colored text</Text>
        <Text style={styles.large}>Large text</Text>
        <Text style={styles.small}>Small text</Text>
        <Text style={styles.centered}>Centered text</Text>
        <Text style={styles.justified}>
          This is a longer text that demonstrates text justification and line height adjustments. 
          It shows how text wraps and flows within its container.
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
    marginBottom: 20,
    textAlign: 'center',
    color: '#666',
  },
  demoContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  heading: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  subheading: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 10,
    color: '#555',
  },
  body: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  bold: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  italic: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
    color: '#333',
  },
  underline: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 10,
    color: '#333',
  },
  colored: {
    fontSize: 16,
    color: '#4ECDC4',
    marginBottom: 10,
  },
  large: {
    fontSize: 20,
    marginBottom: 10,
    color: '#333',
  },
  small: {
    fontSize: 12,
    marginBottom: 10,
    color: '#666',
  },
  centered: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
    color: '#333',
  },
  justified: {
    fontSize: 16,
    textAlign: 'justify',
    lineHeight: 24,
    marginBottom: 10,
    color: '#333',
  },
});

export default TextStyling;
