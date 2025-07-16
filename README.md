# React Native Core Showcase

A comprehensive demonstration of React Native's built-in capabilities without any third-party libraries.

## Overview

This app showcases everything that React Native offers out-of-the-box, including:
- UI/Layout primitives (21 demos)
- Animation & gesture handling (3 demos)
- Platform & device APIs (13 demos)
- Core utilities (2 demos)

**Goal**: Provide developers migrating from Flutter (or web) with a hands-on reference of React Native's native capabilities.

**Total Demos**: 39 interactive demonstrations covering all major React Native APIs

## Features Demonstrated

### UI / Layout Primitives (21 demos)

- ✅ `View` - Basic view component with Flexbox layout
- ✅ `Text` - Text styling and formatting
- ✅ `ScrollView` - Scrollable content with refresh control
- ✅ `FlatList` - Optimized list rendering with pull-to-refresh
- ✅ `SectionList` - Sectioned lists with headers
- ✅ `VirtualizedList` - Base virtualized list component
- ✅ `TextInput` - Input fields with various configurations
- ✅ `Pressable` - Touch handling with feedback
- ✅ `TouchableOpacity` - Touch with opacity feedback
- ✅ `TouchableHighlight` - Touch with highlight feedback
- ✅ `Button` - Basic button component
- ✅ `Switch` - Toggle switch component
- ✅ `Modal` - Modal dialogs with animations
- ✅ `Image` - Image display with various modes
- ✅ `ImageBackground` - Background image container
- ✅ `SafeAreaView` - Safe area handling
- ✅ `ActivityIndicator` - Loading indicators
- ✅ `StatusBar` - Status bar configuration
- ✅ `KeyboardAvoidingView` - Keyboard interaction
- ✅ `RefreshControl` - Pull-to-refresh functionality
- ✅ `Alert` - Native alert dialogs

### Animation & Gesture (3 demos)

- ✅ `Animated` - Comprehensive animation system (timing, spring, decay, interpolation)
- ✅ `PanResponder` - Gesture handling and draggable components
- ✅ `LayoutAnimation` - Automatic layout transitions

### Platform & Device APIs (13 demos)

- ✅ `Dimensions` - Screen dimensions and orientation
- ✅ `PixelRatio` - Device pixel density information
- ✅ `Platform` - OS detection and version info
- ✅ `Appearance` - Dark/light theme detection
- ✅ `AppState` - Application state management
- ✅ `BackHandler` - Hardware back button handling
- ✅ `Clipboard` - Copy/paste functionality
- ✅ `Share` - Native sharing capabilities
- ✅ `Linking` - URL and deep link handling
- ✅ `Vibration` - Device vibration control
- ✅ `PermissionsAndroid` - Android permissions
- ✅ `AccessibilityInfo` - Accessibility information
- ✅ `ToastAndroid` - Android toast notifications

### Utilities (2 demos)

- ✅ `StyleSheet` - Style optimization and creation
- ✅ `InteractionManager` - Interaction scheduling

## Project Structure

```
/
├── App.tsx                 # Main app with navigation
├── data.ts                 # Demo screen registry (39 demos)
├── build-ios.sh            # iOS build script
└── demos/
    ├── ViewBasics.tsx
    ├── TextStyling.tsx
    ├── ScrollViewDemo.tsx
    ├── FlatListDemo.tsx
    ├── SectionListDemo.tsx
    ├── VirtualizedListDemo.tsx
    ├── TextInputDemo.tsx
    ├── PressableDemo.tsx
    ├── TouchableOpacityDemo.tsx
    ├── TouchableHighlightDemo.tsx
    ├── ButtonDemo.tsx
    ├── SwitchDemo.tsx
    ├── ModalDemo.tsx
    ├── ImageDemo.tsx
    ├── ImageBackgroundDemo.tsx
    ├── SafeAreaViewDemo.tsx
    ├── ActivityIndicatorDemo.tsx
    ├── StatusBarDemo.tsx
    ├── KeyboardAvoidingViewDemo.tsx
    ├── AlertDemo.tsx
    ├── AnimatedOpacityLoop.tsx
    ├── DragBoxPanResponder.tsx
    ├── LayoutAnimationDemo.tsx
    ├── DeviceInfoDemo.tsx
    ├── DarkModeListener.tsx
    ├── AppStateDemo.tsx
    ├── BackHandlerDemo.tsx
    ├── ClipboardCopyPaste.tsx
    ├── ShareDemo.tsx
    ├── LinkingDemo.tsx
    ├── VibrationDemo.tsx
    ├── PermissionsAndroidDemo.tsx
    ├── AccessibilityInfoDemo.tsx
    ├── ToastAndroidDemo.tsx
    ├── StyleSheetDemo.tsx
    ├── InteractionManagerDemo.tsx
    └── LayoutFlexbox.tsx
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

## Development Status

- 🟢 **Core framework**: Complete
- � **UI demos**: Complete (21/21)
- 🟢 **Animation demos**: Complete (3/3)  
- 🟢 **Platform demos**: Complete (13/13)
- � **Utility demos**: Complete (2/2)

**Total Progress**: 39/39 demos implemented (100% complete)

## Deployment

### iOS Deployment

#### iOS Prerequisites

- macOS with Xcode 14+
- Apple Developer account
- iOS provisioning profiles and certificates

#### Build IPA
```bash
# Quick build using the provided script
chmod +x build-ios.sh
./build-ios.sh
```

The script will:
1. Generate React Native code
2. Build the iOS archive
3. Create IPA file at `ios/build/ipa/ReactNativeCoreShowcase.ipa`

#### Manual Build Process
```bash
# Generate React Native code
npx react-native codegen --platform ios

# Copy generated files
mkdir -p ios/build/generated/ios
cp -r build/generated/ios/* ios/build/generated/ios/

# Build archive
cd ios
xcodebuild -workspace ReactNativeCoreShowcase.xcworkspace \
           -scheme ReactNativeCoreShowcase \
           -configuration Release \
           -destination generic/platform=iOS \
           -archivePath ./build/ReactNativeCoreShowcase.xcarchive \
           archive

# Create IPA
mkdir -p build/ipa/Payload
cp -r build/ReactNativeCoreShowcase.xcarchive/Products/Applications/ReactNativeCoreShowcase.app build/ipa/Payload/
cd build/ipa
zip -r ReactNativeCoreShowcase.ipa Payload/
```

#### Upload to App Store

**Option 1: Using Xcode**
1. Open Xcode → Window → Organizer
2. Select your archive
3. Click "Distribute App" → "App Store Connect"
4. **Important**: Uncheck "Upload your app's symbols" to avoid Hermes dSYM issues
5. Follow the upload prompts

**Option 2: Using Transporter**
1. Install Transporter from Mac App Store
2. Drag your IPA file into Transporter
3. Click "Deliver" to upload

**Option 3: Using Command Line**
```bash
xcrun altool --upload-app --type ios \
             --file ReactNativeCoreShowcase.ipa \
             --username your@email.com \
             --password your-app-specific-password
```

### Android Deployment

#### Build APK/AAB
```bash
# For APK (development)
cd android
./gradlew assembleRelease

# For AAB (Play Store)
./gradlew bundleRelease
```

#### Upload to Play Store
1. Open Google Play Console
2. Select your app
3. Go to "Production" → "Create new release"
4. Upload the AAB file from `android/app/build/outputs/bundle/release/`
5. Fill in release notes and submit for review

### Distribution Notes

- **Symbol Upload Warning**: When uploading to App Store, disable symbol upload to avoid Hermes-related dSYM issues
- **Testing**: Use TestFlight for iOS beta testing and Play Console Internal Testing for Android
- **Signing**: Ensure proper code signing certificates are installed and valid

## App Icon Generation

This project includes automated app icon generation for both iOS and Android platforms.

### Quick Start

```bash
# Check if your system is ready for icon generation
npm run check-icon-setup

# Generate icons from app-icon.png
npm run generate-icons
```

### Requirements

- **macOS**: Install ImageMagick via `brew install imagemagick`
- **Windows**: Download ImageMagick from official website and add to PATH
- **Source Image**: 1024x1024 PNG file named `app-icon.png`

### Generated Files

- **iOS**: `ios/ReactNativeCoreShowcase/Images.xcassets/AppIcon.appiconset/` (25 icon sizes)
- **Android**: `android/app/src/main/res/mipmap-*/` (12 icons across 6 densities)

For detailed instructions including Windows setup, see [APP_ICON_GENERATOR.md](./APP_ICON_GENERATOR.md).

## Project Constraints & Guidelines

- **Zero third-party dependencies** (except React, React Native, and dev tools)
- **No navigation libraries** - Custom state-based navigation
- **No UI libraries** - Pure React Native components only
- **No Expo modules** - React Native CLI only
- **TypeScript strict mode** - Better type safety

## Contributing

This project demonstrates React Native's built-in capabilities. When adding new demos:

1. Follow the existing demo structure
2. Use only React Native built-in APIs
3. Include TypeScript with strict mode
4. Add comprehensive inline documentation
5. Test on both iOS and Android
6. Update the `data.ts` registry

## License

MIT License - Feel free to use this as a reference for your React Native projects.
