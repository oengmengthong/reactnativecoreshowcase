#!/bin/bash

# App Icon Generator Setup Verification Script
# This script checks if all requirements are met for generating app icons

echo "🔍 Checking App Icon Generator Requirements..."
echo "=============================================="

# Check if Node.js is installed
if command -v node &> /dev/null; then
    NODE_VERSION=$(node --version)
    echo "✅ Node.js: $NODE_VERSION"
else
    echo "❌ Node.js: Not found"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if npm is installed
if command -v npm &> /dev/null; then
    NPM_VERSION=$(npm --version)
    echo "✅ npm: $NPM_VERSION"
else
    echo "❌ npm: Not found"
    exit 1
fi

# Check if ImageMagick is installed
if command -v magick &> /dev/null; then
    MAGICK_VERSION=$(magick --version | head -n1)
    echo "✅ ImageMagick: $MAGICK_VERSION"
elif command -v convert &> /dev/null; then
    CONVERT_VERSION=$(convert --version | head -n1)
    echo "✅ ImageMagick (legacy): $CONVERT_VERSION"
else
    echo "❌ ImageMagick: Not found"
    echo "   macOS: brew install imagemagick"
    echo "   Windows: Download from https://imagemagick.org/script/download.php#windows"
    exit 1
fi

# Check if app-icon is installed globally
if command -v app-icon &> /dev/null; then
    APP_ICON_VERSION=$(app-icon --version)
    echo "✅ app-icon (global): $APP_ICON_VERSION"
elif [ -f "node_modules/.bin/app-icon" ]; then
    APP_ICON_VERSION=$(npx app-icon --version)
    echo "✅ app-icon (local): $APP_ICON_VERSION"
else
    echo "⚠️  app-icon: Not found"
    echo "   Install globally: npm install -g app-icon"
    echo "   Or locally: npm install --save-dev app-icon"
fi

# Check if source image exists
if [ -f "app-icon.png" ]; then
    echo "✅ Source image: app-icon.png found"
    
    # Check image dimensions if ImageMagick is available
    if command -v magick &> /dev/null; then
        DIMENSIONS=$(magick identify app-icon.png | awk '{print $3}')
        echo "   Dimensions: $DIMENSIONS"
        
        WIDTH=$(echo $DIMENSIONS | cut -d'x' -f1)
        HEIGHT=$(echo $DIMENSIONS | cut -d'x' -f2)
        
        if [ "$WIDTH" -ge 1024 ] && [ "$HEIGHT" -ge 1024 ]; then
            echo "   ✅ Size is adequate (≥1024x1024)"
        else
            echo "   ⚠️  Size is small (<1024x1024) - consider using a larger image"
        fi
    fi
else
    echo "⚠️  Source image: app-icon.png not found"
    echo "   Please add a 1024x1024 PNG file named 'app-icon.png'"
fi

echo ""
echo "🎯 Quick Commands:"
echo "=================="
echo "Generate icons: npm run generate-icons"
echo "iOS only: app-icon generate --icon app-icon.png --platform ios"
echo "Android only: app-icon generate --icon app-icon.png --platform android"

echo ""
echo "📁 Generated Files Locations:"
echo "============================="
echo "iOS: ios/ReactNativeCoreShowcase/Images.xcassets/AppIcon.appiconset/"
echo "Android: android/app/src/main/res/mipmap-*/"
