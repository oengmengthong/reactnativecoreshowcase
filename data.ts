export interface DemoScreen {
  id: string;
  title: string;
  description: string;
  component: React.ComponentType;
  category: 'UI' | 'Animation' | 'Platform' | 'Utility';
}

export const demoScreens: DemoScreen[] = [
  // UI / Layout primitives
  {
    id: 'layout-flexbox',
    title: 'Layout & Flexbox',
    description: 'Interactive Flexbox layout demonstration',
    component: require('./demos/LayoutFlexbox').default,
    category: 'UI'
  },
  {
    id: 'view-basics',
    title: 'View Basics',
    description: 'Basic View component with styling and layout',
    component: require('./demos/ViewBasics').default,
    category: 'UI'
  },
  {
    id: 'text-styling',
    title: 'Text Styling',
    description: 'Text component with various styling options',
    component: require('./demos/TextStyling').default,
    category: 'UI'
  },
  {
    id: 'scrollview-demo',
    title: 'ScrollView Demo',
    description: 'ScrollView with content and refresh control',
    component: require('./demos/ScrollViewDemo').default,
    category: 'UI'
  },
  {
    id: 'flatlist-demo',
    title: 'FlatList Demo',
    description: 'FlatList with optimized rendering',
    component: require('./demos/FlatListDemo').default,
    category: 'UI'
  },
  {
    id: 'textinput-demo',
    title: 'TextInput Demo',
    description: 'TextInput with various configurations',
    component: require('./demos/TextInputDemo').default,
    category: 'UI'
  },
  {
    id: 'pressable-demo',
    title: 'Pressable Demo',
    description: 'Pressable component with feedback',
    component: require('./demos/PressableDemo').default,
    category: 'UI'
  },
  {
    id: 'modal-demo',
    title: 'Modal Demo',
    description: 'Modal component with animations',
    component: require('./demos/ModalDemo').default,
    category: 'UI'
  },
  {
    id: 'button-demo',
    title: 'Button Demo',
    description: 'Basic button component with platform styling',
    component: require('./demos/ButtonDemo').default,
    category: 'UI'
  },
  {
    id: 'switch-demo',
    title: 'Switch Demo',
    description: 'Boolean toggle switch component',
    component: require('./demos/SwitchDemo').default,
    category: 'UI'
  },
  {
    id: 'touchablehighlight-demo',
    title: 'TouchableHighlight Demo',
    description: 'Touchable with highlight feedback',
    component: require('./demos/TouchableHighlightDemo').default,
    category: 'UI'
  },
  {
    id: 'imagebackground-demo',
    title: 'ImageBackground Demo',
    description: 'Image as background container',
    component: require('./demos/ImageBackgroundDemo').default,
    category: 'UI'
  },
  
  // Animation & Gesture
  {
    id: 'animated-opacity',
    title: 'Animated Opacity',
    description: 'Animated opacity with timing function',
    component: require('./demos/AnimatedOpacityLoop').default,
    category: 'Animation'
  },
  {
    id: 'drag-box',
    title: 'Drag Box',
    description: 'Draggable box using PanResponder',
    component: require('./demos/DragBoxPanResponder').default,
    category: 'Animation'
  },
  {
    id: 'layout-animation',
    title: 'Layout Animation',
    description: 'LayoutAnimation for view transitions',
    component: require('./demos/LayoutAnimationDemo').default,
    category: 'Animation'
  },
  
  // Platform & Device APIs
  {
    id: 'device-info',
    title: 'Device Info',
    description: 'Device dimensions, pixel ratio, and appearance',
    component: require('./demos/DeviceInfoDemo').default,
    category: 'Platform'
  },
  {
    id: 'clipboard-demo',
    title: 'Clipboard Demo',
    description: 'Copy and paste functionality',
    component: require('./demos/ClipboardCopyPaste').default,
    category: 'Platform'
  },
  {
    id: 'dark-mode',
    title: 'Dark Mode',
    description: 'Dark mode listener and theme switching',
    component: require('./demos/DarkModeListener').default,
    category: 'Platform'
  },
  {
    id: 'vibration-demo',
    title: 'Vibration Demo',
    description: 'Device vibration patterns',
    component: require('./demos/VibrationDemo').default,
    category: 'Platform'
  },
  {
    id: 'activityindicator-demo',
    title: 'ActivityIndicator Demo',
    description: 'Loading indicators with different styles',
    component: require('./demos/ActivityIndicatorDemo').default,
    category: 'UI'
  },
  {
    id: 'image-demo',
    title: 'Image Demo',
    description: 'Display images from various sources',
    component: require('./demos/ImageDemo').default,
    category: 'UI'
  },
  {
    id: 'safeareaview-demo',
    title: 'SafeAreaView Demo',
    description: 'Safe area handling for different devices',
    component: require('./demos/SafeAreaViewDemo').default,
    category: 'UI'
  },
  {
    id: 'statusbar-demo',
    title: 'StatusBar Demo',
    description: 'Status bar styling and configuration',
    component: require('./demos/StatusBarDemo').default,
    category: 'UI'
  },
  {
    id: 'sectionlist-demo',
    title: 'SectionList Demo',
    description: 'Grouped data display with sections',
    component: require('./demos/SectionListDemo').default,
    category: 'UI'
  },
  {
    id: 'touchableopacity-demo',
    title: 'TouchableOpacity Demo',
    description: 'Touchable elements with opacity feedback',
    component: require('./demos/TouchableOpacityDemo').default,
    category: 'UI'
  },
  {
    id: 'share-demo',
    title: 'Share Demo',
    description: 'Native sharing functionality',
    component: require('./demos/ShareDemo').default,
    category: 'Platform'
  },
  {
    id: 'backhandler-demo',
    title: 'BackHandler Demo',
    description: 'Android hardware back button handling',
    component: require('./demos/BackHandlerDemo').default,
    category: 'Platform'
  },
  {
    id: 'appstate-demo',
    title: 'AppState Demo',
    description: 'Application state lifecycle management',
    component: require('./demos/AppStateDemo').default,
    category: 'Platform'
  },
  {
    id: 'alert-demo',
    title: 'Alert Demo',
    description: 'Native alert dialogs with customizable options',
    component: require('./demos/AlertDemo').default,
    category: 'Platform'
  },
  {
    id: 'linking-demo',
    title: 'Linking Demo',
    description: 'Deep linking and URL handling',
    component: require('./demos/LinkingDemo').default,
    category: 'Platform'
  },
  {
    id: 'keyboard-avoiding-view-demo',
    title: 'KeyboardAvoidingView Demo',
    description: 'Keyboard-aware view with multiple behaviors',
    component: require('./demos/KeyboardAvoidingViewDemo').default,
    category: 'UI'
  },
  {
    id: 'platform-demo',
    title: 'Platform Demo',
    description: 'Platform detection and platform-specific code',
    component: require('./demos/PlatformDemo').default,
    category: 'Platform'
  },
  {
    id: 'permissions-android-demo',
    title: 'PermissionsAndroid Demo',
    description: 'Android runtime permissions management',
    component: require('./demos/PermissionsAndroidDemo').default,
    category: 'Platform'
  },
  {
    id: 'interaction-manager-demo',
    title: 'InteractionManager Demo',
    description: 'Schedule tasks after interactions complete',
    component: require('./demos/InteractionManagerDemo').default,
    category: 'Utility'
  },
  {
    id: 'accessibility-info-demo',
    title: 'AccessibilityInfo Demo',
    description: 'Accessibility settings and announcements',
    component: require('./demos/AccessibilityInfoDemo').default,
    category: 'Platform'
  },
  {
    id: 'toast-android-demo',
    title: 'ToastAndroid Demo',
    description: 'Android toast notifications and positioning',
    component: require('./demos/ToastAndroidDemo').default,
    category: 'Platform'
  },
  {
    id: 'virtualizedlist-demo',
    title: 'VirtualizedList Demo',
    description: 'Efficient rendering of large datasets',
    component: require('./demos/VirtualizedListDemo').default,
    category: 'UI'
  },
  
  // Utilities
  {
    id: 'stylesheet-demo',
    title: 'StyleSheet Demo',
    description: 'StyleSheet.create and optimization',
    component: require('./demos/StyleSheetDemo').default,
    category: 'Utility'
  }
];
