import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, Platform, Pressable, Alert, ScrollView } from 'react-native';

const PermissionsAndroidDemo: React.FC = () => {
  const [permissions, setPermissions] = useState<{[key: string]: string}>({});
  const [supportedPermissions, setSupportedPermissions] = useState<string[]>([]);

  // Get PermissionsAndroid safely
  const getPermissionsAndroid = () => {
    if (Platform.OS !== 'android') return null;
    try {
      return require('react-native').PermissionsAndroid;
    } catch {
      return null;
    }
  };

  const checkMultiplePermissions = useCallback(async (permissionList: string[]) => {
    const PermissionsAndroid = getPermissionsAndroid();
    if (!PermissionsAndroid) return;
    
    try {
      const results: {[key: string]: string} = {};
      for (const permission of permissionList) {
        const result = await PermissionsAndroid.check(permission as any);
        results[permission] = result ? PermissionsAndroid.RESULTS.GRANTED : PermissionsAndroid.RESULTS.DENIED;
      }
      setPermissions(results);
    } catch {
      console.error('Error checking permissions');
    }
  }, []);

  useEffect(() => {
    const PermissionsAndroid = getPermissionsAndroid();
    
    if (PermissionsAndroid) {
      // Get commonly used permissions
      const commonPermissions = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
        PermissionsAndroid.PERMISSIONS.CALL_PHONE,
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
      ];
      setSupportedPermissions(commonPermissions);
      
      // Check initial permission states
      checkMultiplePermissions(commonPermissions);
    }
  }, [checkMultiplePermissions]);

  const checkSinglePermission = async (permission: string) => {
    const PermissionsAndroid = getPermissionsAndroid();
    if (Platform.OS !== 'android' || !PermissionsAndroid) return;
    
    try {
      const result = await PermissionsAndroid.check(permission as any);
      const status = result ? PermissionsAndroid.RESULTS.GRANTED : PermissionsAndroid.RESULTS.DENIED;
      setPermissions(prev => ({ ...prev, [permission]: status }));
      Alert.alert(
        'Permission Check',
        `${getPermissionDisplayName(permission)}: ${status}`
      );
    } catch {
      Alert.alert('Error', 'Failed to check permission');
    }
  };

  const requestSinglePermission = async (permission: string) => {
    const PermissionsAndroid = getPermissionsAndroid();
    if (Platform.OS !== 'android' || !PermissionsAndroid) return;
    
    try {
      const result = await PermissionsAndroid.request(
        permission as any,
        {
          title: 'Permission Request',
          message: `This app needs ${getPermissionDisplayName(permission)} permission`,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        }
      );
      
      setPermissions(prev => ({ ...prev, [permission]: result }));
      
      Alert.alert(
        'Permission Result',
        `${getPermissionDisplayName(permission)}: ${result}`
      );
    } catch {
      Alert.alert('Error', 'Failed to request permission');
    }
  };

  const requestMultiplePermissions = async () => {
    const PermissionsAndroid = getPermissionsAndroid();
    if (Platform.OS !== 'android' || !PermissionsAndroid) return;
    
    try {
      const permissionsToRequest = [
        PermissionsAndroid.PERMISSIONS.CAMERA,
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ];
      
      const results: {[key: string]: string} = {};
      for (const permission of permissionsToRequest) {
        const result = await PermissionsAndroid.request(permission as any, {
          title: 'Permission Request',
          message: `This app needs ${getPermissionDisplayName(permission)} permission`,
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        });
        results[permission] = result;
      }
      
      setPermissions(prev => ({ ...prev, ...results }));
      
      const resultText = Object.entries(results)
        .map(([perm, res]) => `${getPermissionDisplayName(perm)}: ${res}`)
        .join('\n');
      
      Alert.alert('Multiple Permissions Result', resultText);
    } catch {
      Alert.alert('Error', 'Failed to request multiple permissions');
    }
  };

  const getPermissionDisplayName = (permission: string): string => {
    const names: {[key: string]: string} = {
      'android.permission.CAMERA': 'Camera',
      'android.permission.RECORD_AUDIO': 'Microphone',
      'android.permission.ACCESS_FINE_LOCATION': 'Fine Location',
      'android.permission.ACCESS_COARSE_LOCATION': 'Coarse Location',
      'android.permission.READ_EXTERNAL_STORAGE': 'Read Storage',
      'android.permission.WRITE_EXTERNAL_STORAGE': 'Write Storage',
      'android.permission.READ_CONTACTS': 'Read Contacts',
      'android.permission.CALL_PHONE': 'Phone Calls',
      'android.permission.SEND_SMS': 'Send SMS',
    };
    return names[permission] || permission.split('.').pop() || permission;
  };

  const getPermissionStatus = (permission: string): string => {
    const PermissionsAndroid = getPermissionsAndroid();
    if (!PermissionsAndroid) return 'Not Available';
    const status = permissions[permission];
    if (status === undefined) return 'Unknown';
    return status === PermissionsAndroid.RESULTS.GRANTED ? 'Granted' : 'Denied';
  };

  const getStatusColor = (permission: string): string => {
    const PermissionsAndroid = getPermissionsAndroid();
    if (!PermissionsAndroid) return '#666';
    const status = permissions[permission];
    if (status === undefined) return '#666';
    return status === PermissionsAndroid.RESULTS.GRANTED ? '#4CAF50' : '#F44336';
  };

  if (Platform.OS !== 'android') {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>PermissionsAndroid Demo</Text>
        <View style={styles.notSupportedContainer}>
          <Text style={styles.notSupportedTitle}>🚫 Not Available</Text>
          <Text style={styles.notSupportedText}>
            PermissionsAndroid is only available on Android platform.
          </Text>
          <Text style={styles.notSupportedText}>
            Current platform: {Platform.OS}
          </Text>
          <Text style={styles.note}>
            On iOS, permissions are handled through Info.plist entries and
            system-level permission requests when accessing specific APIs.
          </Text>
        </View>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>PermissionsAndroid Demo</Text>
      <Text style={styles.description}>
        PermissionsAndroid provides access to the Android M (API 23) and higher
        permission model. It allows you to check and request permissions at runtime.
      </Text>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Permission Status</Text>
        <View style={styles.permissionsList}>
          {supportedPermissions.map((permission) => (
            <View key={permission} style={styles.permissionItem}>
              <View style={styles.permissionInfo}>
                <Text style={styles.permissionName}>
                  {getPermissionDisplayName(permission)}
                </Text>
                <Text style={[styles.permissionStatus, { color: getStatusColor(permission) }]}>
                  {getPermissionStatus(permission)}
                </Text>
              </View>
              <View style={styles.permissionButtons}>
                <Pressable
                  style={[styles.smallButton, styles.checkButton]}
                  onPress={() => checkSinglePermission(permission)}
                >
                  <Text style={styles.smallButtonText}>Check</Text>
                </Pressable>
                <Pressable
                  style={[styles.smallButton, styles.requestButton]}
                  onPress={() => requestSinglePermission(permission)}
                >
                  <Text style={styles.smallButtonText}>Request</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Batch Operations</Text>
        
        <Pressable
          style={styles.button}
          onPress={() => checkMultiplePermissions(supportedPermissions)}
        >
          <Text style={styles.buttonText}>Check All Permissions</Text>
        </Pressable>

        <Pressable
          style={styles.button}
          onPress={requestMultiplePermissions}
        >
          <Text style={styles.buttonText}>Request Multiple Permissions</Text>
        </Pressable>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Permission Results</Text>
        <View style={styles.resultsContainer}>
          <Text style={styles.resultTitle}>GRANTED</Text>
          <Text style={styles.resultDescription}>
            Permission has been granted by the user
          </Text>
          
          <Text style={styles.resultTitle}>DENIED</Text>
          <Text style={styles.resultDescription}>
            Permission has been denied by the user
          </Text>
          
          <Text style={styles.resultTitle}>NEVER_ASK_AGAIN</Text>
          <Text style={styles.resultDescription}>
            Permission denied with "Don't ask again" checked
          </Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Available Permissions</Text>
        <Text style={styles.note}>
          Common Android permissions that can be requested:
          {'\n'}• CAMERA - Access device camera
          {'\n'}• RECORD_AUDIO - Record audio
          {'\n'}• ACCESS_FINE_LOCATION - Precise location
          {'\n'}• ACCESS_COARSE_LOCATION - Approximate location
          {'\n'}• READ_EXTERNAL_STORAGE - Read files
          {'\n'}• WRITE_EXTERNAL_STORAGE - Write files
          {'\n'}• READ_CONTACTS - Read contacts
          {'\n'}• CALL_PHONE - Make phone calls
          {'\n'}• SEND_SMS - Send SMS messages
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Best Practices</Text>
        <Text style={styles.note}>
          • Always check permissions before using protected features
          {'\n'}• Request permissions only when needed
          {'\n'}• Provide clear explanations for why permissions are needed
          {'\n'}• Handle NEVER_ASK_AGAIN gracefully
          {'\n'}• Use requestMultiple() for related permissions
          {'\n'}• Add permission declarations to AndroidManifest.xml
          {'\n'}• Test on different Android versions
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
  notSupportedContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  notSupportedTitle: {
    fontSize: 48,
    marginBottom: 20,
  },
  notSupportedText: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 10,
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
  permissionsList: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  permissionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  permissionInfo: {
    flex: 1,
  },
  permissionName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  permissionStatus: {
    fontSize: 14,
    fontWeight: '500',
  },
  permissionButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  smallButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 4,
    minWidth: 60,
    alignItems: 'center',
  },
  checkButton: {
    backgroundColor: '#2196F3',
  },
  requestButton: {
    backgroundColor: '#FF9800',
  },
  smallButtonText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
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
  resultsContainer: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  resultTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 10,
    marginBottom: 5,
  },
  resultDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
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

export default PermissionsAndroidDemo;
