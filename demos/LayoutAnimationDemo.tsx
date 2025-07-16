import React, { useState, useCallback, useMemo } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Pressable, 
  LayoutAnimation, 
  Platform,
  UIManager,
  ScrollView,
  Alert
} from 'react-native';

// Enable LayoutAnimation on Android
if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface AnimationItem {
  id: string;
  title: string;
  color: string;
  expanded?: boolean;
}

const LayoutAnimationDemo: React.FC = () => {
  const [items, setItems] = useState<AnimationItem[]>([
    { id: '1', title: 'Item 1', color: '#FF6B6B' },
    { id: '2', title: 'Item 2', color: '#4ECDC4' },
    { id: '3', title: 'Item 3', color: '#45B7D1' },
  ]);

  const [expandedItems, setExpandedItems] = useState<Set<string>>(new Set());
  const [currentAnimation, setCurrentAnimation] = useState<string>('easeInEaseOut');
  const [showDetails, setShowDetails] = useState(false);
  const [gridLayout, setGridLayout] = useState(false);

  // Animation presets
  const animationPresets = useMemo(() => ({
    easeInEaseOut: {
      duration: 300,
      create: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types.easeInEaseOut,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    },
    spring: {
      duration: 500,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.7,
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.7,
      },
      delete: {
        type: LayoutAnimation.Types.easeInEaseOut,
        property: LayoutAnimation.Properties.opacity,
      },
    },
    linear: {
      duration: 200,
      create: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types.linear,
      },
      delete: {
        type: LayoutAnimation.Types.linear,
        property: LayoutAnimation.Properties.opacity,
      },
    },
    easeOut: {
      duration: 400,
      create: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.scaleXY,
      },
      update: {
        type: LayoutAnimation.Types.easeOut,
      },
      delete: {
        type: LayoutAnimation.Types.easeOut,
        property: LayoutAnimation.Properties.opacity,
      },
    },
  }), []);

  const configureAnimation = useCallback((animationType: string) => {
    const config = animationPresets[animationType as keyof typeof animationPresets];
    if (config) {
      LayoutAnimation.configureNext(config);
    }
  }, [animationPresets]);

  const addItem = useCallback(() => {
    configureAnimation(currentAnimation);
    const newItem: AnimationItem = {
      id: Date.now().toString(),
      title: `Item ${items.length + 1}`,
      color: `hsl(${Math.random() * 360}, 70%, 60%)`,
    };
    setItems(prev => [...prev, newItem]);
  }, [items.length, currentAnimation, configureAnimation]);

  const removeItem = useCallback((id: string) => {
    configureAnimation(currentAnimation);
    setItems(prev => prev.filter(item => item.id !== id));
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      newSet.delete(id);
      return newSet;
    });
  }, [currentAnimation, configureAnimation]);

  const toggleExpanded = useCallback((id: string) => {
    configureAnimation(currentAnimation);
    setExpandedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  }, [currentAnimation, configureAnimation]);

  const shuffleItems = useCallback(() => {
    configureAnimation(currentAnimation);
    setItems(prev => [...prev].sort(() => Math.random() - 0.5));
  }, [currentAnimation, configureAnimation]);

  const toggleLayout = useCallback(() => {
    configureAnimation(currentAnimation);
    setGridLayout(prev => !prev);
  }, [currentAnimation, configureAnimation]);

  const toggleDetails = useCallback(() => {
    configureAnimation(currentAnimation);
    setShowDetails(prev => !prev);
  }, [currentAnimation, configureAnimation]);

  const resetDemo = useCallback(() => {
    configureAnimation(currentAnimation);
    setItems([
      { id: '1', title: 'Item 1', color: '#FF6B6B' },
      { id: '2', title: 'Item 2', color: '#4ECDC4' },
      { id: '3', title: 'Item 3', color: '#45B7D1' },
    ]);
    setExpandedItems(new Set());
    setGridLayout(false);
    setShowDetails(false);
  }, [currentAnimation, configureAnimation]);

  const showAnimationInfo = useCallback(() => {
    const info = `
Current Animation: ${currentAnimation}
Duration: ${animationPresets[currentAnimation as keyof typeof animationPresets].duration}ms
Type: ${animationPresets[currentAnimation as keyof typeof animationPresets].create.type}
Platform: ${Platform.OS}
Items Count: ${items.length}
    `;
    Alert.alert('Animation Info', info);
  }, [currentAnimation, items.length, animationPresets]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Layout Animation Demo</Text>
      <Text style={styles.description}>
        Explore React Native's LayoutAnimation API with interactive examples
      </Text>

      {/* Animation Type Selector */}
      <View style={styles.selectorContainer}>
        <Text style={styles.selectorTitle}>Animation Type:</Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {Object.keys(animationPresets).map((type) => (
            <Pressable
              key={type}
              style={[
                styles.animationButton,
                currentAnimation === type && styles.activeAnimationButton,
              ]}
              onPress={() => setCurrentAnimation(type)}
            >
              <Text style={[
                styles.animationButtonText,
                currentAnimation === type && styles.activeAnimationButtonText,
              ]}>
                {type}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>

      {/* Control Buttons */}
      <View style={styles.controlsContainer}>
        <Pressable style={styles.controlButton} onPress={addItem}>
          <Text style={styles.controlButtonText}>Add Item</Text>
        </Pressable>
        <Pressable style={styles.controlButton} onPress={shuffleItems}>
          <Text style={styles.controlButtonText}>Shuffle</Text>
        </Pressable>
        <Pressable style={styles.controlButton} onPress={toggleLayout}>
          <Text style={styles.controlButtonText}>
            {gridLayout ? 'List' : 'Grid'}
          </Text>
        </Pressable>
        <Pressable style={styles.controlButton} onPress={toggleDetails}>
          <Text style={styles.controlButtonText}>Details</Text>
        </Pressable>
      </View>

      {/* Info Panel */}
      {showDetails && (
        <View style={styles.infoPanel}>
          <Text style={styles.infoPanelTitle}>Animation Details</Text>
          <Text style={styles.infoPanelText}>Type: {currentAnimation}</Text>
          <Text style={styles.infoPanelText}>
            Duration: {animationPresets[currentAnimation as keyof typeof animationPresets].duration}ms
          </Text>
          <Text style={styles.infoPanelText}>Items: {items.length}</Text>
          <Text style={styles.infoPanelText}>Layout: {gridLayout ? 'Grid' : 'List'}</Text>
          <Pressable style={styles.infoButton} onPress={showAnimationInfo}>
            <Text style={styles.infoButtonText}>More Info</Text>
          </Pressable>
        </View>
      )}

      {/* Items Container */}
      <ScrollView 
        style={styles.itemsContainer}
        contentContainerStyle={gridLayout ? styles.gridContainer : styles.listContainer}
        showsVerticalScrollIndicator={false}
      >
        {items.map((item) => (
          <Pressable
            key={item.id}
            style={[
              styles.item,
              gridLayout ? styles.gridItem : styles.listItem,
              { backgroundColor: item.color },
              expandedItems.has(item.id) && styles.expandedItem,
            ]}
            onPress={() => toggleExpanded(item.id)}
            onLongPress={() => removeItem(item.id)}
          >
            <Text style={styles.itemTitle}>{item.title}</Text>
            {expandedItems.has(item.id) && (
              <View style={styles.expandedContent}>
                <Text style={styles.expandedText}>
                  This is expanded content for {item.title}
                </Text>
                <Text style={styles.expandedText}>
                  Color: {item.color}
                </Text>
                <Text style={styles.expandedText}>
                  Animation: {currentAnimation}
                </Text>
                <Pressable 
                  style={styles.removeButton} 
                  onPress={() => removeItem(item.id)}
                >
                  <Text style={styles.removeButtonText}>Remove</Text>
                </Pressable>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>

      {/* Bottom Controls */}
      <View style={styles.bottomControls}>
        <Pressable style={styles.resetButton} onPress={resetDemo}>
          <Text style={styles.resetButtonText}>Reset Demo</Text>
        </Pressable>
        <Text style={styles.instructionText}>
          Tap to expand • Long press to remove
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#333',
    marginTop: 20,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  
  // Animation Selector
  selectorContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
  },
  selectorTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  animationButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginRight: 10,
  },
  activeAnimationButton: {
    backgroundColor: '#007AFF',
  },
  animationButtonText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activeAnimationButtonText: {
    color: '#fff',
  },
  
  // Controls
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  controlButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#007AFF',
    borderRadius: 8,
    minWidth: 70,
    alignItems: 'center',
  },
  controlButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
  },
  
  // Info Panel
  infoPanel: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  infoPanelTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  infoPanelText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  infoButton: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#34C759',
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  infoButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Items Container
  itemsContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  listContainer: {
    paddingBottom: 20,
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingBottom: 20,
  },
  
  // Items
  item: {
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  listItem: {
    padding: 20,
    minHeight: 60,
  },
  gridItem: {
    width: '48%',
    padding: 15,
    minHeight: 80,
  },
  expandedItem: {
    minHeight: 120,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  
  // Expanded Content
  expandedContent: {
    marginTop: 15,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.3)',
  },
  expandedText: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
    textAlign: 'center',
  },
  removeButton: {
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    alignSelf: 'center',
  },
  removeButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  
  // Bottom Controls
  bottomControls: {
    padding: 20,
    alignItems: 'center',
  },
  resetButton: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    marginBottom: 10,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  instructionText: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
});

export default LayoutAnimationDemo;
