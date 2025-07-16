import React from 'react';
import { View, Text, StyleSheet, ImageBackground, ScrollView } from 'react-native';

const ImageBackgroundDemo: React.FC = () => {
  const remoteImage = { uri: 'https://picsum.photos/400/300' };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ImageBackground Demo</Text>
      <Text style={styles.description}>
        ImageBackground is a component that allows you to use an image as the
        background for other components.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic ImageBackground</Text>
        <ImageBackground
          source={remoteImage}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <Text style={styles.overlayText}>Text Over Image</Text>
            <Text style={styles.overlaySubtext}>
              This text is displayed on top of the background image
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>With Gradient Overlay</Text>
        <ImageBackground
          source={{ uri: 'https://picsum.photos/400/250' }}
          style={styles.imageBackground}
          resizeMode="cover"
        >
          <View style={styles.gradientOverlay}>
            <Text style={styles.gradientText}>Gradient Overlay</Text>
            <Text style={styles.gradientSubtext}>
              A semi-transparent overlay improves text readability
            </Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Card with Background</Text>
        <ImageBackground
          source={{ uri: 'https://picsum.photos/400/200' }}
          style={styles.cardBackground}
          resizeMode="cover"
          imageStyle={styles.cardImageStyle}
        >
          <View style={styles.cardContent}>
            <Text style={styles.cardTitle}>Card Title</Text>
            <Text style={styles.cardDescription}>
              This is a card component with an image background.
              The imageStyle prop allows you to style the image separately.
            </Text>
            <View style={styles.cardFooter}>
              <Text style={styles.cardFooterText}>Card Footer</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Different Resize Modes</Text>
        
        <Text style={styles.subSectionTitle}>Cover (default)</Text>
        <ImageBackground
          source={{ uri: 'https://picsum.photos/300/200' }}
          style={styles.smallImageBackground}
          resizeMode="cover"
        >
          <View style={styles.modeOverlay}>
            <Text style={styles.modeText}>cover</Text>
          </View>
        </ImageBackground>

        <Text style={styles.subSectionTitle}>Contain</Text>
        <ImageBackground
          source={{ uri: 'https://picsum.photos/300/200' }}
          style={styles.smallImageBackground}
          resizeMode="contain"
        >
          <View style={styles.modeOverlay}>
            <Text style={styles.modeText}>contain</Text>
          </View>
        </ImageBackground>

        <Text style={styles.subSectionTitle}>Stretch</Text>
        <ImageBackground
          source={{ uri: 'https://picsum.photos/300/200' }}
          style={styles.smallImageBackground}
          resizeMode="stretch"
        >
          <View style={styles.modeOverlay}>
            <Text style={styles.modeText}>stretch</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Complex Layout</Text>
        <ImageBackground
          source={{ uri: 'https://picsum.photos/400/300' }}
          style={styles.complexBackground}
          resizeMode="cover"
        >
          <View style={styles.complexOverlay}>
            <View style={styles.header}>
              <Text style={styles.headerTitle}>Header Section</Text>
              <Text style={styles.headerSubtitle}>Subtitle goes here</Text>
            </View>
            <View style={styles.content}>
              <Text style={styles.contentText}>
                This demonstrates how ImageBackground can be used with
                complex layouts and multiple child components.
              </Text>
            </View>
            <View style={styles.footer}>
              <Text style={styles.footerText}>Footer Content</Text>
            </View>
          </View>
        </ImageBackground>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Features</Text>
        <Text style={styles.note}>
          • Renders an image as the background for child components
          {'\n'}• Supports all Image props (source, resizeMode, etc.)
          {'\n'}• imageStyle prop allows styling the image separately
          {'\n'}• Perfect for hero sections, cards, and overlays
          {'\n'}• Supports both local and remote images
          {'\n'}• Children are rendered on top of the background
          {'\n'}• Maintains aspect ratio based on resizeMode
        </Text>
      </View>
    </ScrollView>
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
    padding: 20,
  },
  description: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: 'center',
    color: '#666',
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  subSectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginTop: 15,
    marginBottom: 10,
    color: '#666',
  },
  imageBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smallImageBackground: {
    width: '100%',
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  cardBackground: {
    width: '100%',
    height: 200,
    justifyContent: 'flex-end',
  },
  cardImageStyle: {
    borderRadius: 12,
  },
  complexBackground: {
    width: '100%',
    height: 300,
  },
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  overlayText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  overlaySubtext: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  gradientOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  gradientText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  gradientSubtext: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    opacity: 0.9,
  },
  cardContent: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: 20,
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 15,
  },
  cardFooter: {
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  cardFooterText: {
    fontSize: 12,
    color: '#999',
  },
  modeOverlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 5,
  },
  modeText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  complexOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 16,
    opacity: 0.8,
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  contentText: {
    color: '#fff',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#fff',
    fontSize: 14,
    opacity: 0.8,
  },
  note: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    lineHeight: 20,
  },
});

export default ImageBackgroundDemo;
