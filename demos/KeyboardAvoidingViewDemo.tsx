import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, ScrollView, TextInput, KeyboardAvoidingView, Keyboard } from 'react-native';

interface BehaviorButtonProps {
  behavior: 'height' | 'position' | 'padding';
  title: string;
  currentBehavior: 'height' | 'position' | 'padding';
  onPress: (behavior: 'height' | 'position' | 'padding') => void;
}

const BehaviorButton: React.FC<BehaviorButtonProps> = ({ behavior, title, currentBehavior, onPress }) => (
  <Pressable
    style={[
      styles.behaviorButton,
      currentBehavior === behavior && styles.activeBehaviorButton,
    ]}
    onPress={() => onPress(behavior)}
  >
    <Text style={[
      styles.behaviorButtonText,
      currentBehavior === behavior && styles.activeBehaviorButtonText,
    ]}>
      {title}
    </Text>
  </Pressable>
);

const KeyboardAvoidingViewDemo: React.FC = () => {
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [currentBehavior, setCurrentBehavior] = useState<'height' | 'position' | 'padding'>('padding');
  const [text1, setText1] = useState('');
  const [text2, setText2] = useState('');
  const [text3, setText3] = useState('');

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (e) => {
      setKeyboardHeight(e.endCoordinates.height);
      setKeyboardVisible(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
      setKeyboardVisible(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={currentBehavior}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="handled">
        <Text style={styles.title}>KeyboardAvoidingView Demo</Text>
        <Text style={styles.description}>
          KeyboardAvoidingView automatically adjusts its height, position, or bottom
          padding based on the keyboard height to remain visible while the virtual
          keyboard is displayed.
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Keyboard Status</Text>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>
              Keyboard: {keyboardVisible ? 'Visible' : 'Hidden'}
            </Text>
            <Text style={styles.statusText}>
              Height: {keyboardHeight}px
            </Text>
            <Text style={styles.statusText}>
              Platform: {Platform.OS}
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Behavior Mode</Text>
          <Text style={styles.behaviorDescription}>
            Current behavior: <Text style={styles.highlight}>{currentBehavior}</Text>
          </Text>
          <View style={styles.behaviorButtons}>
            <BehaviorButton behavior="height" title="Height" currentBehavior={currentBehavior} onPress={setCurrentBehavior} />
            <BehaviorButton behavior="position" title="Position" currentBehavior={currentBehavior} onPress={setCurrentBehavior} />
            <BehaviorButton behavior="padding" title="Padding" currentBehavior={currentBehavior} onPress={setCurrentBehavior} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Behavior Explanations</Text>
          <View style={styles.explanationContainer}>
            <Text style={styles.behaviorTitle}>height</Text>
            <Text style={styles.behaviorExplanation}>
              Adjusts the height of the view to avoid the keyboard
            </Text>
          </View>
          <View style={styles.explanationContainer}>
            <Text style={styles.behaviorTitle}>position</Text>
            <Text style={styles.behaviorExplanation}>
              Adjusts the position of the view to avoid the keyboard
            </Text>
          </View>
          <View style={styles.explanationContainer}>
            <Text style={styles.behaviorTitle}>padding</Text>
            <Text style={styles.behaviorExplanation}>
              Adjusts the bottom padding to avoid the keyboard
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Test Input Fields</Text>
          <Text style={styles.inputDescription}>
            Try typing in these fields to see how the keyboard avoidance works:
          </Text>
          
          <TextInput
            style={styles.textInput}
            placeholder="First text input"
            value={text1}
            onChangeText={setText1}
            multiline
          />
          
          <TextInput
            style={styles.textInput}
            placeholder="Second text input"
            value={text2}
            onChangeText={setText2}
            multiline
          />
          
          <TextInput
            style={styles.textInput}
            placeholder="Third text input (bottom)"
            value={text3}
            onChangeText={setText3}
            multiline
          />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Controls</Text>
          <Pressable style={styles.button} onPress={dismissKeyboard}>
            <Text style={styles.buttonText}>Dismiss Keyboard</Text>
          </Pressable>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Platform Differences</Text>
          <Text style={styles.note}>
            <Text style={styles.noteTitle}>iOS:</Text>
            {'\n'}• All three behaviors work differently
            {'\n'}• Height: Resizes the view
            {'\n'}• Position: Moves the view up
            {'\n'}• Padding: Adds bottom padding
            {'\n'}• keyboardVerticalOffset often needed
            {'\n\n'}
            <Text style={styles.noteTitle}>Android:</Text>
            {'\n'}• Height and padding work similarly
            {'\n'}• Position behavior may not work as expected
            {'\n'}• android:windowSoftInputMode affects behavior
            {'\n'}• May need adjustPan or adjustResize in AndroidManifest.xml
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Best Practices</Text>
          <Text style={styles.note}>
            • Use 'padding' behavior for most cases
            {'\n'}• Set keyboardVerticalOffset on iOS (header height)
            {'\n'}• Use keyboardShouldPersistTaps="handled" on ScrollView
            {'\n'}• Test on both platforms thoroughly
            {'\n'}• Consider using react-native-keyboard-aware-scroll-view
            {'\n'}• Handle keyboard events manually for complex layouts
          </Text>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
    padding: 20,
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
  statusContainer: {
    backgroundColor: '#E8F5E8',
    padding: 15,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  behaviorDescription: {
    fontSize: 16,
    marginBottom: 15,
    color: '#666',
  },
  highlight: {
    fontWeight: 'bold',
    color: '#007AFF',
  },
  behaviorButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  behaviorButton: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginHorizontal: 5,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeBehaviorButton: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  behaviorButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  activeBehaviorButtonText: {
    color: '#fff',
  },
  explanationContainer: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  behaviorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  behaviorExplanation: {
    fontSize: 14,
    color: '#666',
  },
  inputDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  textInput: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    minHeight: 80,
    textAlignVertical: 'top',
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  note: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    lineHeight: 20,
  },
  noteTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
  spacer: {
    height: 50,
  },
});

export default KeyboardAvoidingViewDemo;
