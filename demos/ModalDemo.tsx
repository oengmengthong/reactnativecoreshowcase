import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, Pressable, Alert } from 'react-native';

const ModalDemo: React.FC = () => {
  const [basicModalVisible, setBasicModalVisible] = useState(false);
  const [slideModalVisible, setSlideModalVisible] = useState(false);
  const [fadeModalVisible, setFadeModalVisible] = useState(false);
  const [transparentModalVisible, setTransparentModalVisible] = useState(false);

  const showAlert = () => {
    Alert.alert(
      'Modal Closed',
      'This is a native alert triggered from modal',
      [{ text: 'OK' }]
    );
  };

  const ModalContent = ({ title, onClose }: { title: string; onClose: () => void }) => (
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>{title}</Text>
      <Text style={styles.modalDescription}>
        This modal demonstrates React Native's built-in Modal component.
        Modals present content above the main interface.
      </Text>
      <Pressable style={styles.modalButton} onPress={onClose}>
        <Text style={styles.modalButtonText}>Close Modal</Text>
      </Pressable>
      <Pressable style={[styles.modalButton, styles.alertButton]} onPress={showAlert}>
        <Text style={styles.modalButtonText}>Show Alert</Text>
      </Pressable>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Modal Demo</Text>
      <Text style={styles.description}>
        This demo showcases the Modal component with different presentation styles.
        Modal provides a way to present content above the existing view hierarchy.
      </Text>

      <View style={styles.buttonContainer}>
        <Pressable 
          style={styles.demoButton}
          onPress={() => setBasicModalVisible(true)}
        >
          <Text style={styles.buttonText}>Basic Modal</Text>
        </Pressable>

        <Pressable 
          style={styles.demoButton}
          onPress={() => setSlideModalVisible(true)}
        >
          <Text style={styles.buttonText}>Slide Modal</Text>
        </Pressable>

        <Pressable 
          style={styles.demoButton}
          onPress={() => setFadeModalVisible(true)}
        >
          <Text style={styles.buttonText}>Fade Modal</Text>
        </Pressable>

        <Pressable 
          style={styles.demoButton}
          onPress={() => setTransparentModalVisible(true)}
        >
          <Text style={styles.buttonText}>Transparent Modal</Text>
        </Pressable>
      </View>

      {/* Basic Modal */}
      <Modal
        visible={basicModalVisible}
        animationType="none"
        onRequestClose={() => setBasicModalVisible(false)}
        accessibilityLabel="Basic modal"
      >
        <View style={styles.modalContainer}>
          <ModalContent 
            title="Basic Modal" 
            onClose={() => setBasicModalVisible(false)} 
          />
        </View>
      </Modal>

      {/* Slide Modal */}
      <Modal
        visible={slideModalVisible}
        animationType="slide"
        onRequestClose={() => setSlideModalVisible(false)}
        accessibilityLabel="Slide modal"
      >
        <View style={styles.modalContainer}>
          <ModalContent 
            title="Slide Modal" 
            onClose={() => setSlideModalVisible(false)} 
          />
        </View>
      </Modal>

      {/* Fade Modal */}
      <Modal
        visible={fadeModalVisible}
        animationType="fade"
        onRequestClose={() => setFadeModalVisible(false)}
        accessibilityLabel="Fade modal"
      >
        <View style={styles.modalContainer}>
          <ModalContent 
            title="Fade Modal" 
            onClose={() => setFadeModalVisible(false)} 
          />
        </View>
      </Modal>

      {/* Transparent Modal */}
      <Modal
        visible={transparentModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setTransparentModalVisible(false)}
        accessibilityLabel="Transparent modal"
      >
        <View style={styles.transparentModalContainer}>
          <View style={styles.transparentModalContent}>
            <Text style={styles.modalTitle}>Transparent Modal</Text>
            <Text style={styles.modalDescription}>
              This modal has a transparent background, showing the content underneath.
            </Text>
            <Pressable 
              style={styles.modalButton}
              onPress={() => setTransparentModalVisible(false)}
            >
              <Text style={styles.modalButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
  buttonContainer: {
    flex: 1,
    justifyContent: 'center',
    gap: 15,
  },
  demoButton: {
    backgroundColor: '#4ECDC4',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    minWidth: 280,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalDescription: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 25,
    color: '#666',
    lineHeight: 22,
  },
  modalButton: {
    backgroundColor: '#4ECDC4',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 10,
  },
  alertButton: {
    backgroundColor: '#FF6B6B',
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  transparentModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  transparentModalContent: {
    backgroundColor: 'white',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    margin: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default ModalDemo;
