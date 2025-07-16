import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

const AnimatedOpacityLoop: React.FC = () => {
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    const startAnimation = () => {
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ]).start(() => startAnimation());
    };

    startAnimation();
  }, [fadeAnim]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Animated Opacity Loop</Text>
      <Text style={styles.description}>
        This demo shows the Animated API with timing functions.
        The box continuously fades in and out using opacity animation.
      </Text>
      
      <View style={styles.demoContainer}>
        <Animated.View
          style={[
            styles.animatedBox,
            {
              opacity: fadeAnim,
            },
          ]}
        >
          <Text style={styles.boxText}>Animated Box</Text>
        </Animated.View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedBox: {
    width: 150,
    height: 150,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
  },
  boxText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AnimatedOpacityLoop;
