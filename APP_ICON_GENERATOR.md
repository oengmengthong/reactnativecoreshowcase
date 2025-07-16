# App Icon Generator Documentation

This document explains how to generate app icons for React Native applications on both macOS and Windows.

## Overview

The app icon generator automatically creates all required icon sizes for both iOS and Android platforms from a single source image. This project uses the `app-icon` CLI tool which supports both macOS and Windows.

## Requirements

### Source Image Requirements
- **Format**: PNG (recommended) or JPG
- **Size**: Minimum 1024x1024 pixels (recommended for best quality)
- **Background**: Should be opaque (no transparency for Android)
- **Design**: Square format, keep important content centered

### System Requirements

#### macOS
- **ImageMagick**: Required for image processing
- **Node.js**: Version 18 or higher
- **Homebrew**: For installing ImageMagick

#### Windows
- **ImageMagick**: Required for image processing
- **Node.js**: Version 18 or higher
- **Package Manager**: npm (included with Node.js)

## Installation

### macOS Setup

1. **Install ImageMagick using Homebrew:**
   ```bash
   brew install imagemagick
   ```

2. **Install the app-icon CLI tool:**
   ```bash
   # Global installation (recommended)
   npm install -g app-icon
   
   # Or install as dev dependency in your project
   npm install --save-dev app-icon
   ```

### Windows Setup

1. **Install ImageMagick:**
   - Download from [ImageMagick official website](https://imagemagick.org/script/download.php#windows)
   - Choose the version that matches your system (32-bit or 64-bit)
   - During installation, make sure to check "Install development headers and libraries for C and C++"
   - Add ImageMagick to your PATH environment variable

   **Alternative using Chocolatey:**
   ```powershell
   choco install imagemagick
   ```

   **Alternative using Scoop:**
   ```powershell
   scoop install imagemagick
   ```

2. **Install the app-icon CLI tool:**
   ```bash
   # Global installation (recommended)
   npm install -g app-icon
   
   # Or install as dev dependency in your project
   npm install --save-dev app-icon
   ```

3. **Verify ImageMagick installation:**
   ```bash
   magick -version
   ```

## Usage

### Setup Verification

Before generating icons, verify your setup:

```bash
# Check if all requirements are met
npm run check-icon-setup

# On Windows, you can also use:
# scripts\check-icon-setup.bat
```

This script will check:
- Node.js and npm installation
- ImageMagick installation
- app-icon CLI tool availability
- Source image presence and dimensions

### Basic Usage

1. **Prepare your source image:**
   - Place your icon image in the root of your React Native project
   - Ensure it's named appropriately (e.g., `app-icon.png`)

2. **Generate icons:**
   ```bash
   # If installed globally
   app-icon generate --icon app-icon.png
   
   # If installed as dev dependency
   npx app-icon generate --icon app-icon.png
   
   # Using npm script (if configured in package.json)
   npm run generate-icons
   ```

### Advanced Options

```bash
# Generate icons for specific platform only
app-icon generate --icon app-icon.png --platform ios
app-icon generate --icon app-icon.png --platform android

# Specify custom output directories
app-icon generate --icon app-icon.png --output-dir custom-icons

# Generate with verbose output
app-icon generate --icon app-icon.png --verbose
```

## Generated Files

### iOS Icons
**Location**: `ios/[ProjectName]/Images.xcassets/AppIcon.appiconset/`

Generated sizes:
- **iPhone**: 20x20, 29x29, 40x40, 60x60 (in 1x, 2x, 3x variants)
- **iPad**: 20x20, 29x29, 40x40, 76x76, 83.5x83.5 (in 1x, 2x variants)
- **App Store**: 1024x1024
- **Legacy**: 57x57, 72x72 (for older iOS versions)

### Android Icons
**Location**: `android/app/src/main/res/mipmap-*/`

Generated densities:
- **ldpi**: 36x36 (0.75x)
- **mdpi**: 48x48 (1.0x - baseline)
- **hdpi**: 72x72 (1.5x)
- **xhdpi**: 96x96 (2.0x)
- **xxhdpi**: 144x144 (3.0x)
- **xxxhdpi**: 192x192 (4.0x)

Each density includes:
- `ic_launcher.png` - Standard square icon
- `ic_launcher_round.png` - Round icon (Android 7.1+)

## NPM Scripts

Add these scripts to your `package.json` for easier icon generation:

```json
{
  "scripts": {
    "generate-icons": "app-icon generate --icon app-icon.png",
    "generate-icons:ios": "app-icon generate --icon app-icon.png --platform ios",
    "generate-icons:android": "app-icon generate --icon app-icon.png --platform android"
  }
}
```

## Troubleshooting

### Common Issues

#### ImageMagick Not Found
**Error**: `ImageMagick must be installed`

**Solution**:
- **macOS**: `brew install imagemagick`
- **Windows**: Download and install from official website, ensure PATH is set

#### Permission Errors (Windows)
**Error**: `EACCES: permission denied`

**Solution**:
- Run command prompt as Administrator
- Or use `npx` instead of global installation

#### Old ImageMagick Warning
**Warning**: `The convert command is deprecated in IMv7`

**Solution**: This is just a warning, the tool still works. The warning appears because ImageMagick v7 changed command names.

#### Path Issues (Windows)
**Error**: `'magick' is not recognized as an internal or external command`

**Solution**:
1. Add ImageMagick installation directory to PATH
2. Restart command prompt/PowerShell
3. Verify with `magick -version`

### Verification

After generation, verify your icons:

1. **iOS**: Check `ios/[ProjectName]/Images.xcassets/AppIcon.appiconset/Contents.json`
2. **Android**: Check the `mipmap-*` directories contain both standard and round icons
3. **Build and test**: Run your app to see the icons in action

## Best Practices

### Icon Design Guidelines

1. **Keep it simple**: Icons should be recognizable even at small sizes
2. **Use solid backgrounds**: Avoid transparency for Android compatibility
3. **Center important elements**: Account for different platform icon shapes
4. **Test on devices**: Verify icons look good on both light and dark backgrounds
5. **Follow platform guidelines**:
   - **iOS**: Apple Human Interface Guidelines
   - **Android**: Material Design Icon Guidelines

### Automation

Consider adding icon generation to your CI/CD pipeline:

```yaml
# Example GitHub Actions step
- name: Generate App Icons
  run: |
    npm install -g app-icon
    app-icon generate --icon app-icon.png
```

## Alternative Tools

While `app-icon` is recommended, here are other options:

1. **@bam.tech/react-native-make**: More features but sometimes has compatibility issues
2. **react-native-icon-generator**: Good alternative but less maintained
3. **Manual generation**: Using online tools like [App Icon Generator](https://appicon.co/)

## Platform Support Summary

| Platform | Supported | Notes |
|----------|-----------|-------|
| macOS    | ✅ Yes    | Native support with Homebrew |
| Windows  | ✅ Yes    | Requires manual ImageMagick setup |
| Linux    | ✅ Yes    | Similar to macOS, use package manager |

## Conclusion

The `app-icon` tool provides cross-platform support for generating React Native app icons. While setup is slightly more complex on Windows due to ImageMagick installation, both macOS and Windows are fully supported.

For any issues or questions, refer to the [app-icon GitHub repository](https://github.com/dwmkerr/app-icon) or the troubleshooting section above.
