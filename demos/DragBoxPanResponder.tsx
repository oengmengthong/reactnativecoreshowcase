import React, { useState } from 'react';
import { View, Text, StyleSheet, PanResponder, Animated } from 'react-native';

const DragBoxPanResponder: React.FC = () => {
  const [pan] = useState(new Animated.ValueXY());

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onPanResponderGrant: () => {
      pan.setOffset({
        x: (pan.x as any)._value,
        y: (pan.y as any)._value,
      });
    },
    onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
      useNativeDriver: false,
    }),
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drag Box with PanResponder</Text>
      <Text style={styles.description}>
        This demo shows PanResponder for handling touch gestures.
        Drag the box around the screen with your finger.
      </Text>
      
      <View style={styles.demoContainer}>
        <Animated.View
          style={[
            styles.draggableBox,
            {
              transform: [{ translateX: pan.x }, { translateY: pan.y }],
            },
          ]}
          {...panResponder.panHandlers}
        >
          <Text style={styles.boxText}>Drag Me!</Text>
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
  draggableBox: {
    width: 100,
    height: 100,
    backgroundColor: '#FF6B6B',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  boxText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DragBoxPanResponder;
