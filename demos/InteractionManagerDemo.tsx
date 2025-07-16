import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView, InteractionManager } from 'react-native';

const InteractionManagerDemo: React.FC = () => {
  const [taskCount, setTaskCount] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [heavyTaskRunning, setHeavyTaskRunning] = useState(false);

  useEffect(() => {
    // Listen for interaction start/end
    const handle = InteractionManager.createInteractionHandle();
    setIsInteracting(true);
    
    const timer = setTimeout(() => {
      InteractionManager.clearInteractionHandle(handle);
      setIsInteracting(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      InteractionManager.clearInteractionHandle(handle);
    };
  }, []);

  const runAfterInteractions = () => {
    setTaskCount(prev => prev + 1);
    const taskId = `task-${Date.now()}`;
    
    InteractionManager.runAfterInteractions(() => {
      // This will run after all interactions have completed
      setCompletedTasks(prev => [...prev, `${taskId}: Simple task completed`]);
    });
  };

  const runHeavyTask = () => {
    setHeavyTaskRunning(true);
    setTaskCount(prev => prev + 1);
    const taskId = `heavy-task-${Date.now()}`;
    
    InteractionManager.runAfterInteractions(() => {
      // Simulate heavy computation
      const startTime = Date.now();
      let sum = 0;
      for (let i = 0; i < 10000000; i++) {
        sum += Math.random();
      }
      const endTime = Date.now();
      
      setCompletedTasks(prev => [
        ...prev,
        `${taskId}: Heavy task completed in ${endTime - startTime}ms (result: ${sum.toFixed(2)})`
      ]);
      setHeavyTaskRunning(false);
    });
  };

  const startInteraction = () => {
    const handle = InteractionManager.createInteractionHandle();
    setIsInteracting(true);
    
    setTimeout(() => {
      InteractionManager.clearInteractionHandle(handle);
      setIsInteracting(false);
    }, 3000);
  };

  const runMultipleTasks = () => {
    const taskIds = ['A', 'B', 'C', 'D', 'E'];
    
    taskIds.forEach((id, index) => {
      setTaskCount(prev => prev + 1);
      
      InteractionManager.runAfterInteractions(() => {
        setTimeout(() => {
          setCompletedTasks(prev => [
            ...prev,
            `Task ${id}: Completed after ${(index + 1) * 500}ms delay`
          ]);
        }, index * 500);
      });
    });
  };

  const runNestedTasks = () => {
    setTaskCount(prev => prev + 1);
    
    InteractionManager.runAfterInteractions(() => {
      setCompletedTasks(prev => [...prev, 'Level 1: First task completed']);
      
      InteractionManager.runAfterInteractions(() => {
        setCompletedTasks(prev => [...prev, 'Level 2: Nested task completed']);
        
        InteractionManager.runAfterInteractions(() => {
          setCompletedTasks(prev => [...prev, 'Level 3: Deeply nested task completed']);
        });
      });
    });
  };

  const clearTasks = () => {
    setCompletedTasks([]);
    setTaskCount(0);
  };

  const runPerformanceTest = () => {
    setTaskCount(prev => prev + 1);
    const startTime = Date.now();
    
    // Create interaction handle to simulate user interaction
    const handle = InteractionManager.createInteractionHandle();
    
    // Schedule task to run after interactions
    InteractionManager.runAfterInteractions(() => {
      const endTime = Date.now();
      setCompletedTasks(prev => [
        ...prev,
        `Performance test: Task executed ${endTime - startTime}ms after scheduling`
      ]);
    });
    
    // Clear interaction handle after 1 second
    setTimeout(() => {
      InteractionManager.clearInteractionHandle(handle);
    }, 1000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>InteractionManager Demo</Text>
      <Text style={styles.description}>
        InteractionManager allows you to schedule long-running work to occur after
        all interactions and animations have completed, ensuring smooth user experience.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Status</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Interactions Active:</Text>
            <Text style={[styles.statusValue, isInteracting ? styles.activeStatus : styles.inactiveStatus]}>
              {isInteracting ? 'Yes' : 'No'}
            </Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Tasks Scheduled:</Text>
            <Text style={styles.statusValue}>{taskCount}</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Tasks Completed:</Text>
            <Text style={styles.statusValue}>{completedTasks.length}</Text>
          </View>
          <View style={styles.statusItem}>
            <Text style={styles.statusLabel}>Heavy Task Running:</Text>
            <Text style={[styles.statusValue, heavyTaskRunning ? styles.activeStatus : styles.inactiveStatus]}>
              {heavyTaskRunning ? 'Yes' : 'No'}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Basic Usage</Text>
        
        <Pressable style={styles.button} onPress={runAfterInteractions}>
          <Text style={styles.buttonText}>Run After Interactions</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={runHeavyTask} disabled={heavyTaskRunning}>
          <Text style={[styles.buttonText, heavyTaskRunning && styles.disabledText]}>
            {heavyTaskRunning ? 'Running Heavy Task...' : 'Run Heavy Task'}
          </Text>
        </Pressable>

        <Pressable style={styles.button} onPress={startInteraction}>
          <Text style={styles.buttonText}>Start 3s Interaction</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Advanced Examples</Text>
        
        <Pressable style={styles.button} onPress={runMultipleTasks}>
          <Text style={styles.buttonText}>Run Multiple Tasks</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={runNestedTasks}>
          <Text style={styles.buttonText}>Run Nested Tasks</Text>
        </Pressable>

        <Pressable style={styles.button} onPress={runPerformanceTest}>
          <Text style={styles.buttonText}>Performance Test</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Task Results</Text>
        <View style={styles.resultsContainer}>
          {completedTasks.length === 0 ? (
            <Text style={styles.noResults}>No tasks completed yet</Text>
          ) : (
            completedTasks.map((task, index) => (
              <View key={index} style={styles.taskResult}>
                <Text style={styles.taskText}>{task}</Text>
              </View>
            ))
          )}
        </View>
        
        <Pressable style={[styles.button, styles.clearButton]} onPress={clearTasks}>
          <Text style={styles.buttonText}>Clear Results</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <Text style={styles.explanation}>
          <Text style={styles.explanationTitle}>runAfterInteractions():</Text>
          {'\n'}• Schedules callback to run after all interactions complete
          {'\n'}• Useful for heavy computations that shouldn't block UI
          {'\n'}• Ensures smooth animations and user interactions
          {'\n\n'}
          <Text style={styles.explanationTitle}>createInteractionHandle():</Text>
          {'\n'}• Creates a handle representing an ongoing interaction
          {'\n'}• Prevents scheduled tasks from running until cleared
          {'\n'}• Use during animations, gestures, or critical UI updates
          {'\n\n'}
          <Text style={styles.explanationTitle}>clearInteractionHandle():</Text>
          {'\n'}• Removes an interaction handle
          {'\n'}• Allows pending tasks to run when all handles are cleared
          {'\n'}• Should be called when interaction completes
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Use Cases</Text>
        <Text style={styles.explanation}>
          • <Text style={styles.explanationTitle}>Heavy computations:</Text> Mathematical calculations, data processing
          {'\n'}• <Text style={styles.explanationTitle}>Data fetching:</Text> API calls that aren't time-critical
          {'\n'}• <Text style={styles.explanationTitle}>Analytics:</Text> Logging events that shouldn't block UI
          {'\n'}• <Text style={styles.explanationTitle}>Background tasks:</Text> File I/O, database operations
          {'\n'}• <Text style={styles.explanationTitle}>Initial app setup:</Text> Configuration that can wait
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best Practices</Text>
        <Text style={styles.explanation}>
          • Use for non-critical tasks that can be delayed
          {'\n'}• Avoid for time-sensitive operations
          {'\n'}• Keep tasks reasonably short to maintain responsiveness
          {'\n'}• Always clear interaction handles when done
          {'\n'}• Consider using requestAnimationFrame for frame-based tasks
          {'\n'}• Test performance impact on different devices
          {'\n'}• Use sparingly - overuse can delay important tasks
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  statusItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  statusLabel: {
    fontSize: 16,
    color: '#666',
    fontWeight: '600',
  },
  statusValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  activeStatus: {
    color: '#FF9800',
  },
  inactiveStatus: {
    color: '#4CAF50',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '600',
  },
  disabledText: {
    opacity: 0.7,
  },
  clearButton: {
    backgroundColor: '#FF3B30',
    marginTop: 10,
  },
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    maxHeight: 200,
  },
  noResults: {
    textAlign: 'center',
    color: '#666',
    fontStyle: 'italic',
    padding: 20,
  },
  taskResult: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  taskText: {
    fontSize: 14,
    color: '#333',
  },
  explanation: {
    fontSize: 14,
    color: '#666',
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 8,
    lineHeight: 20,
  },
  explanationTitle: {
    fontWeight: 'bold',
    color: '#333',
  },
});

export default InteractionManagerDemo;
