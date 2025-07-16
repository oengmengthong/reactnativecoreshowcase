import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  StyleSheet,
  StatusBar,
  Pressable,
  useColorScheme,
} from 'react-native';
import { demoScreens, DemoScreen } from './data';

interface NavigationState {
  activeDemo: string | null;
  history: string[];
}

const App: React.FC = () => {
  const [navigation, setNavigation] = useState<NavigationState>({
    activeDemo: null,
    history: [],
  });
  
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const navigateToDemo = (demoId: string) => {
    setNavigation(prev => ({
      activeDemo: demoId,
      history: [...prev.history, demoId],
    }));
  };

  const goBack = () => {
    if (navigation.history.length > 0) {
      const newHistory = [...navigation.history];
      newHistory.pop();
      const previousDemo = newHistory[newHistory.length - 1] || null;
      
      setNavigation({
        activeDemo: previousDemo,
        history: newHistory,
      });
    }
  };

  const renderDemoItem = ({ item }: { item: DemoScreen }) => (
    <Pressable
      style={[styles.demoItem, isDark && styles.darkDemoItem]}
      onPress={() => navigateToDemo(item.id)}
    >
      <View style={styles.demoItemContent}>
        <Text style={[styles.demoTitle, isDark && styles.darkText]}>
          {item.title}
        </Text>
        <Text style={[styles.demoDescription, isDark && styles.darkSecondaryText]}>
          {item.description}
        </Text>
        <Text style={[styles.demoCategory, getCategoryColor(item.category)]}>
          {item.category}
        </Text>
      </View>
    </Pressable>
  );

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'UI':
        return { color: '#4ECDC4' };
      case 'Animation':
        return { color: '#FF6B6B' };
      case 'Platform':
        return { color: '#45B7D1' };
      case 'Utility':
        return { color: '#96CEB4' };
      default:
        return { color: '#666' };
    }
  };

  if (navigation.activeDemo) {
    const currentDemo = demoScreens.find(demo => demo.id === navigation.activeDemo);
    
    if (currentDemo) {
      const DemoComponent = currentDemo.component;
      
      return (
        <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
          <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
          <View style={[styles.header, isDark && styles.darkHeader]}>
            <Pressable style={styles.backButton} onPress={goBack}>
              <Text style={[styles.backButtonText, isDark && styles.darkText]}>
                ← Back
              </Text>
            </Pressable>
            <Text style={[styles.headerTitle, isDark && styles.darkText]}>
              {currentDemo.title}
            </Text>
          </View>
          <DemoComponent />
        </SafeAreaView>
      );
    }
  }

  return (
    <SafeAreaView style={[styles.container, isDark && styles.darkContainer]}>
      <StatusBar barStyle={isDark ? 'light-content' : 'dark-content'} />
      <View style={[styles.header, isDark && styles.darkHeader]}>
        <Text style={[styles.appTitle, isDark && styles.darkText]}>
          React Native Core Showcase
        </Text>
        <Text style={[styles.appSubtitle, isDark && styles.darkSecondaryText]}>
          Explore React Native's built-in capabilities
        </Text>
      </View>
      
      <FlatList
        data={demoScreens}
        renderItem={renderDemoItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  darkContainer: {
    backgroundColor: '#1a1a1a',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  darkHeader: {
    backgroundColor: '#333',
    borderBottomColor: '#555',
  },
  appTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
  },
  appSubtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
    marginTop: 5,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
    textAlign: 'center',
  },
  backButton: {
    padding: 10,
    position: 'absolute',
    left: 10,
    top: 15,
    zIndex: 1,
  },
  backButtonText: {
    fontSize: 16,
    color: '#4ECDC4',
    fontWeight: 'bold',
  },
  listContainer: {
    padding: 20,
  },
  demoItem: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  darkDemoItem: {
    backgroundColor: '#333',
  },
  demoItemContent: {
    flexDirection: 'column',
  },
  demoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  demoDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  demoCategory: {
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
    alignSelf: 'flex-start',
  },
  darkText: {
    color: '#fff',
  },
  darkSecondaryText: {
    color: '#ccc',
  },
});

export default App;
