import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const StyleSheetDemo: React.FC = () => {
  const [selectedExample, setSelectedExample] = useState<string>('basic');

  const examples = [
    { id: 'basic', title: 'Basic Styling', description: 'Fundamental styling properties' },
    { id: 'layout', title: 'Layout & Flexbox', description: 'Positioning and layout' },
    { id: 'colors', title: 'Colors & Theming', description: 'Color handling and themes' },
    { id: 'typography', title: 'Typography', description: 'Text styling and fonts' },
    { id: 'responsive', title: 'Responsive Design', description: 'Adaptive layouts' },
    { id: 'performance', title: 'Performance', description: 'Optimization techniques' },
  ];

  const renderBasicExample = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Basic Styling</Text>
      <Text style={styles.exampleDescription}>
        StyleSheet.create() provides optimized styling with validation and performance benefits.
      </Text>
      
      <View style={styles.basicExampleContainer}>
        <View style={styles.box}>
          <Text style={styles.boxText}>Box 1</Text>
        </View>
        <View style={[styles.box, styles.redBox]}>
          <Text style={[styles.boxText, styles.whiteText]}>Box 2</Text>
        </View>
        <View style={[styles.box, styles.roundBox]}>
          <Text style={styles.boxText}>Box 3</Text>
        </View>
      </View>

      <View style={styles.codeContainer}>
        <Text style={styles.codeTitle}>Code Example:</Text>
        <Text style={styles.codeText}>
{`const styles = StyleSheet.create({
  box: {
    width: 80,
    height: 80,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  redBox: {
    backgroundColor: '#FF6B6B',
  },
  roundBox: {
    borderRadius: 40,
  },
});`}
        </Text>
      </View>
    </View>
  );

  const renderLayoutExample = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Layout & Flexbox</Text>
      <Text style={styles.exampleDescription}>
        React Native uses Flexbox for layout with some differences from web CSS.
      </Text>
      
      <View style={styles.flexExampleContainer}>
        <Text style={styles.subtitle}>Flex Direction Row:</Text>
        <View style={styles.flexRow}>
          <View style={[styles.flexItem, styles.blueBox]}>
            <Text style={styles.whiteText}>1</Text>
          </View>
          <View style={[styles.flexItem, styles.greenBox]}>
            <Text style={styles.whiteText}>2</Text>
          </View>
          <View style={[styles.flexItem, styles.orangeBox]}>
            <Text style={styles.whiteText}>3</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Flex Direction Column:</Text>
        <View style={styles.flexColumn}>
          <View style={[styles.flexItem, styles.blueBox]}>
            <Text style={styles.whiteText}>A</Text>
          </View>
          <View style={[styles.flexItem, styles.greenBox]}>
            <Text style={styles.whiteText}>B</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Justify Content:</Text>
        <View style={styles.justifyExample}>
          <View style={[styles.smallBox, styles.redBox]} />
          <View style={[styles.smallBox, styles.blueBox]} />
          <View style={[styles.smallBox, styles.greenBox]} />
        </View>
      </View>
    </View>
  );

  const renderColorsExample = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Colors & Theming</Text>
      <Text style={styles.exampleDescription}>
        Various ways to define colors and implement theming in React Native.
      </Text>
      
      <View style={styles.colorExampleContainer}>
        <Text style={styles.subtitle}>Color Formats:</Text>
        <View style={styles.colorRow}>
          <View style={[styles.colorBox, { backgroundColor: '#FF6B6B' }]}>
            <Text style={styles.colorLabel}>Hex</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: 'rgb(255, 107, 107)' }]}>
            <Text style={styles.colorLabel}>RGB</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: 'rgba(255, 107, 107, 0.7)' }]}>
            <Text style={styles.colorLabel}>RGBA</Text>
          </View>
          <View style={[styles.colorBox, { backgroundColor: 'hsl(0, 100%, 71%)' }]}>
            <Text style={styles.colorLabel}>HSL</Text>
          </View>
        </View>

        <Text style={styles.subtitle}>Theme Colors:</Text>
        <View style={styles.themeContainer}>
          <View style={[styles.themeBox, styles.primaryTheme]}>
            <Text style={styles.whiteText}>Primary</Text>
          </View>
          <View style={[styles.themeBox, styles.secondaryTheme]}>
            <Text style={styles.whiteText}>Secondary</Text>
          </View>
          <View style={[styles.themeBox, styles.accentTheme]}>
            <Text style={styles.whiteText}>Accent</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderTypographyExample = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Typography</Text>
      <Text style={styles.exampleDescription}>
        Text styling, font weights, sizes, and text decoration options.
      </Text>
      
      <View style={styles.typographyContainer}>
        <Text style={styles.heading1}>Heading 1</Text>
        <Text style={styles.heading2}>Heading 2</Text>
        <Text style={styles.heading3}>Heading 3</Text>
        <Text style={styles.bodyText}>Body text with normal weight</Text>
        <Text style={styles.boldText}>Bold text example</Text>
        <Text style={styles.italicText}>Italic text example</Text>
        <Text style={styles.underlineText}>Underlined text</Text>
        <Text style={styles.strikeText}>Strikethrough text</Text>
        <Text style={styles.coloredText}>Colored text</Text>
      </View>
    </View>
  );

  const renderResponsiveExample = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Responsive Design</Text>
      <Text style={styles.exampleDescription}>
        Adaptive layouts using Dimensions and percentage-based sizing.
      </Text>
      
      <View style={styles.responsiveContainer}>
        <Text style={styles.subtitle}>Screen Width: {width.toFixed(0)}px</Text>
        
        <View style={styles.responsiveBox}>
          <Text style={styles.responsiveText}>50% Width</Text>
        </View>
        
        <View style={styles.responsiveRow}>
          <View style={styles.responsiveItem}>
            <Text style={styles.responsiveItemText}>33%</Text>
          </View>
          <View style={styles.responsiveItem}>
            <Text style={styles.responsiveItemText}>33%</Text>
          </View>
          <View style={styles.responsiveItem}>
            <Text style={styles.responsiveItemText}>33%</Text>
          </View>
        </View>

        <View style={styles.adaptiveContainer}>
          <Text style={styles.adaptiveText}>
            {width > 400 ? 'Large Screen Layout' : 'Small Screen Layout'}
          </Text>
        </View>
      </View>
    </View>
  );

  const renderPerformanceExample = () => (
    <View style={styles.exampleContainer}>
      <Text style={styles.exampleTitle}>Performance Optimization</Text>
      <Text style={styles.exampleDescription}>
        Best practices for StyleSheet performance and optimization.
      </Text>
      
      <View style={styles.performanceContainer}>
        <Text style={styles.subtitle}>✅ Good Practices:</Text>
        <Text style={styles.practiceText}>• Use StyleSheet.create() for validation</Text>
        <Text style={styles.practiceText}>• Avoid inline styles for better performance</Text>
        <Text style={styles.practiceText}>• Use StyleSheet.flatten() for style composition</Text>
        <Text style={styles.practiceText}>• Prefer specific styles over generic ones</Text>
        
        <Text style={styles.subtitle}>❌ Avoid:</Text>
        <Text style={styles.practiceText}>• Creating styles inside render methods</Text>
        <Text style={styles.practiceText}>• Complex nested style objects</Text>
        <Text style={styles.practiceText}>• Excessive use of dynamic styles</Text>
        
        <View style={styles.performanceExample}>
          <Text style={styles.performanceTitle}>Optimized Style</Text>
          <Text style={styles.performanceDescription}>
            This box uses pre-created styles for better performance
          </Text>
        </View>
      </View>
    </View>
  );

  const renderCurrentExample = () => {
    switch (selectedExample) {
      case 'basic':
        return renderBasicExample();
      case 'layout':
        return renderLayoutExample();
      case 'colors':
        return renderColorsExample();
      case 'typography':
        return renderTypographyExample();
      case 'responsive':
        return renderResponsiveExample();
      case 'performance':
        return renderPerformanceExample();
      default:
        return renderBasicExample();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>StyleSheet Demo</Text>
      <Text style={styles.description}>
        Explore React Native's StyleSheet API with various styling examples and best practices.
      </Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabsContainer}>
        {examples.map((example) => (
          <Pressable
            key={example.id}
            style={[
              styles.tab,
              selectedExample === example.id && styles.activeTab,
            ]}
            onPress={() => setSelectedExample(example.id)}
          >
            <Text style={[
              styles.tabText,
              selectedExample === example.id && styles.activeTabText,
            ]}>
              {example.title}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        {renderCurrentExample()}
      </ScrollView>
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
  
  // Tab Navigation
  tabsContainer: {
    marginBottom: 20,
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginRight: 10,
    backgroundColor: '#e0e0e0',
    borderRadius: 20,
    marginLeft: 10,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#fff',
  },
  
  // Content Container
  contentContainer: {
    flex: 1,
  },
  
  // Example Containers
  exampleContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    margin: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  exampleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  exampleDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    marginTop: 15,
    color: '#333',
  },
  
  // Basic Example Styles
  basicExampleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  box: {
    width: 80,
    height: 80,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  boxText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  redBox: {
    backgroundColor: '#FF6B6B',
  },
  roundBox: {
    borderRadius: 40,
  },
  whiteText: {
    color: '#fff',
  },
  
  // Code Example Styles
  codeContainer: {
    backgroundColor: '#f8f8f8',
    padding: 15,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#007AFF',
  },
  codeTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  codeText: {
    fontSize: 12,
    fontFamily: 'Courier',
    color: '#333',
    lineHeight: 16,
  },
  
  // Layout Example Styles
  flexExampleContainer: {
    marginBottom: 20,
  },
  flexRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  flexColumn: {
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: 20,
  },
  flexItem: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  blueBox: {
    backgroundColor: '#007AFF',
  },
  greenBox: {
    backgroundColor: '#34C759',
  },
  orangeBox: {
    backgroundColor: '#FF9500',
  },
  justifyExample: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 40,
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  smallBox: {
    width: 30,
    height: 30,
  },
  
  // Colors Example Styles
  colorExampleContainer: {
    marginBottom: 20,
  },
  colorRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  colorBox: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  colorLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  themeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  themeBox: {
    width: 80,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  primaryTheme: {
    backgroundColor: '#007AFF',
  },
  secondaryTheme: {
    backgroundColor: '#5856D6',
  },
  accentTheme: {
    backgroundColor: '#FF9500',
  },
  
  // Typography Example Styles
  typographyContainer: {
    marginBottom: 20,
  },
  heading1: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  heading2: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  heading3: {
    fontSize: 20,
    fontWeight: '500',
    marginBottom: 10,
    color: '#333',
  },
  bodyText: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
  },
  boldText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  italicText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 8,
    color: '#333',
  },
  underlineText: {
    fontSize: 16,
    textDecorationLine: 'underline',
    marginBottom: 8,
    color: '#333',
  },
  strikeText: {
    fontSize: 16,
    textDecorationLine: 'line-through',
    marginBottom: 8,
    color: '#333',
  },
  coloredText: {
    fontSize: 16,
    color: '#FF6B6B',
    fontWeight: '500',
  },
  
  // Responsive Example Styles
  responsiveContainer: {
    marginBottom: 20,
  },
  responsiveBox: {
    width: '50%',
    height: 60,
    backgroundColor: '#4ECDC4',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  responsiveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  responsiveRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  responsiveItem: {
    width: '30%',
    height: 50,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  responsiveItemText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
  },
  adaptiveContainer: {
    padding: 20,
    backgroundColor: width > 400 ? '#34C759' : '#FF9500',
    borderRadius: 8,
    alignItems: 'center',
  },
  adaptiveText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  
  // Performance Example Styles
  performanceContainer: {
    marginBottom: 20,
  },
  practiceText: {
    fontSize: 14,
    marginBottom: 5,
    color: '#333',
  },
  performanceExample: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#e8f5e8',
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#34C759',
  },
  performanceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  performanceDescription: {
    fontSize: 14,
    color: '#666',
  },
});

export default StyleSheetDemo;
