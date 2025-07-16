# React Native Core Showcase

A comprehensive demonstration of React Native's built-in capabilities without any third-party libraries.

## Overview

This app showcases everything that React Native offers out-of-the-box, including:
- UI/Layout primitives
- Animation & gesture handling
- Platform & device APIs
- Core utilities

**Goal**: Provide developers migrating from Flutter (or web) with a hands-on reference of React Native's native capabilities.

## Features Demonstrated

### UI / Layout Primitives
- ✅ `View` - Basic view component with Flexbox layout
- ✅ `Text` - Text styling and formatting
- ✅ `FlatList` - Optimized list rendering with pull-to-refresh
- 🚧 `ScrollView` - Scrollable content with refresh control
- 🚧 `TextInput` - Input fields with various configurations
- 🚧 `Pressable` - Touch handling with feedback
- 🚧 `Modal` - Modal dialogs with animations
- 🚧 Additional components: `Image`, `ImageBackground`, `SafeAreaView`, `SectionList`, `VirtualizedList`, `TouchableOpacity`, `TouchableHighlight`, `ActivityIndicator`, `RefreshControl`, `StatusBar`

### Animation & Gesture
- ✅ `Animated` - Opacity animation with timing functions
- ✅ `PanResponder` - Draggable components
- 🚧 `LayoutAnimation` - Layout transitions
- 🚧 Additional: Spring animations, decay, interpolation

### Platform & Device APIs
- ✅ `Dimensions` - Screen dimensions and orientation
- ✅ `PixelRatio` - Device pixel density
- ✅ `Platform` - OS detection and version info
- ✅ `Appearance` - Dark/light theme detection
- ✅ `Clipboard` - Copy/paste functionality
- 🚧 Additional: `AppState`, `BackHandler`, `Share`, `Linking`, `Vibration`, `PermissionsAndroid`, `AccessibilityInfo`

### Utilities
- 🚧 `StyleSheet` - Style optimization
- 🚧 Additional: `InteractionManager`, `LogBox`

## Project Structure

```
/
├── App.tsx                 # Main app with navigation
├── data.ts                 # Demo screen registry
└── demos/
    ├── ViewBasics.tsx
    ├── AnimatedOpacityLoop.tsx
    ├── DragBoxPanResponder.tsx
    ├── ClipboardCopyPaste.tsx
    ├── DarkModeListener.tsx
    └── ...more demos
```

## Technical Stack

- **React Native**: 0.80.1
- **TypeScript**: Strict mode enabled
- **Hermes**: Enabled for better performance
- **Target**: iOS 13+ / Android 7+

## Getting Started

### Prerequisites
- Node.js 18+
- React Native development environment set up
- For iOS: Xcode 14+
- For Android: Android Studio with SDK

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. For iOS:
   ```bash
   cd ios && pod install && cd ..
   npm run ios
   ```

4. For Android:
   ```bash
   npm run android
   ```

## Key Constraints

- **Zero third-party dependencies** (except React, React Native, and dev tools)
- **No navigation libraries** - Custom state-based navigation
- **No UI libraries** - Pure React Native components only
- **No Expo modules** - React Native CLI only
- **TypeScript strict mode** - Better type safety

## Development Status

- 🟢 **Core framework**: Complete
- 🟡 **UI demos**: Partially complete (5/15)
- 🟡 **Animation demos**: Partially complete (2/3)
- 🟡 **Platform demos**: Partially complete (3/8)
- 🔴 **Utility demos**: Not started (0/2)

## Contributing

This project demonstrates React Native's built-in capabilities. When adding new demos:

1. Follow the existing demo structure
2. Use only React Native built-in APIs
3. Include TypeScript with strict mode
4. Add comprehensive inline documentation
5. Test on both iOS and Android

## License

MIT License - Feel free to use this as a reference for your React Native projects.
