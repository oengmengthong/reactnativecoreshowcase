#!/bin/bash
# iOS Build Script for React Native Core Showcase

set -e

echo "🚀 Building iOS App..."

# Navigate to project root
cd "$(dirname "$0")"

# Generate React Native code
echo "📦 Generating React Native code..."
npx react-native codegen --platform ios

# Copy generated files to iOS build directory
echo "📁 Copying generated files..."
mkdir -p ios/build/generated/ios
cp -r build/generated/ios/* ios/build/generated/ios/

# Build archive
echo "🏗️ Building archive..."
cd ios
xcodebuild -workspace ReactNativeCoreShowcase.xcworkspace \
           -scheme ReactNativeCoreShowcase \
           -configuration Release \
           -destination generic/platform=iOS \
           -archivePath ./build/ReactNativeCoreShowcase.xcarchive \
           archive

# Create IPA
echo "📱 Creating IPA..."
mkdir -p build/ipa
mkdir -p build/ipa/Payload
cp -r build/ReactNativeCoreShowcase.xcarchive/Products/Applications/ReactNativeCoreShowcase.app build/ipa/Payload/
cd build/ipa
zip -r ReactNativeCoreShowcase.ipa Payload/

echo "✅ Build complete! IPA created at: ios/build/ipa/ReactNativeCoreShowcase.ipa"
echo "📤 Ready for App Store upload!"
