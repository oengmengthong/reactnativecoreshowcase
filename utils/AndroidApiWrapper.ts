import { Platform } from 'react-native';

// Safe wrapper for Android-only APIs
export const AndroidApiWrapper = {
  // PermissionsAndroid wrapper
  PermissionsAndroid: Platform.OS === 'android' ? (() => {
    try {
      return require('react-native').PermissionsAndroid;
    } catch {
      console.warn('PermissionsAndroid not available');
      return null;
    }
  })() : null,

  // ToastAndroid wrapper
  ToastAndroid: Platform.OS === 'android' ? (() => {
    try {
      return require('react-native').ToastAndroid;
    } catch {
      console.warn('ToastAndroid not available');
      return null;
    }
  })() : null,

  // BackHandler wrapper
  BackHandler: Platform.OS === 'android' ? (() => {
    try {
      return require('react-native').BackHandler;
    } catch {
      console.warn('BackHandler not available');
      return null;
    }
  })() : null,
};

// Type-safe constants
export const AndroidConstants = {
  PERMISSIONS: AndroidApiWrapper.PermissionsAndroid?.PERMISSIONS || {},
  RESULTS: AndroidApiWrapper.PermissionsAndroid?.RESULTS || {},
  TOAST_DURATION: {
    SHORT: AndroidApiWrapper.ToastAndroid?.SHORT || 0,
    LONG: AndroidApiWrapper.ToastAndroid?.LONG || 1,
  },
  TOAST_GRAVITY: {
    TOP: AndroidApiWrapper.ToastAndroid?.TOP || 48,
    BOTTOM: AndroidApiWrapper.ToastAndroid?.BOTTOM || 80,
    CENTER: AndroidApiWrapper.ToastAndroid?.CENTER || 17,
  },
};
