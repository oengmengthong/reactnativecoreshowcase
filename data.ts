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
  
  // Utilities
  {
    id: 'stylesheet-demo',
    title: 'StyleSheet Demo',
    description: 'StyleSheet.create and optimization',
    component: require('./demos/StyleSheetDemo').default,
    category: 'Utility'
  }
];
