@echo off
REM App Icon Generator Setup Verification Script for Windows
REM This script checks if all requirements are met for generating app icons

echo 🔍 Checking App Icon Generator Requirements...
echo ==============================================

REM Check if Node.js is installed
node --version >nul 2>&1
if %errorlevel% == 0 (
    for /f "tokens=*" %%i in ('node --version') do echo ✅ Node.js: %%i
) else (
    echo ❌ Node.js: Not found
    echo    Please install Node.js from https://nodejs.org/
    exit /b 1
)

REM Check if npm is installed
npm --version >nul 2>&1
if %errorlevel% == 0 (
    for /f "tokens=*" %%i in ('npm --version') do echo ✅ npm: %%i
) else (
    echo ❌ npm: Not found
    exit /b 1
)

REM Check if ImageMagick is installed
magick --version >nul 2>&1
if %errorlevel% == 0 (
    for /f "tokens=1-3" %%i in ('magick --version') do (
        echo ✅ ImageMagick: %%i %%j %%k
        goto :imagemagick_found
    )
) else (
    convert --version >nul 2>&1
    if %errorlevel% == 0 (
        for /f "tokens=1-3" %%i in ('convert --version') do (
            echo ✅ ImageMagick (legacy): %%i %%j %%k
            goto :imagemagick_found
        )
    ) else (
        echo ❌ ImageMagick: Not found
        echo    Windows: Download from https://imagemagick.org/script/download.php#windows
        echo    Alternative: choco install imagemagick
        echo    Alternative: scoop install imagemagick
        exit /b 1
    )
)

:imagemagick_found

REM Check if app-icon is installed globally
app-icon --version >nul 2>&1
if %errorlevel% == 0 (
    for /f "tokens=*" %%i in ('app-icon --version') do echo ✅ app-icon (global): %%i
) else (
    if exist "node_modules\.bin\app-icon.cmd" (
        for /f "tokens=*" %%i in ('npx app-icon --version') do echo ✅ app-icon (local): %%i
    ) else (
        echo ⚠️  app-icon: Not found
        echo    Install globally: npm install -g app-icon
        echo    Or locally: npm install --save-dev app-icon
    )
)

REM Check if source image exists
if exist "app-icon.png" (
    echo ✅ Source image: app-icon.png found
    
    REM Check image dimensions if ImageMagick is available
    magick identify app-icon.png >nul 2>&1
    if %errorlevel% == 0 (
        for /f "tokens=3" %%i in ('magick identify app-icon.png') do (
            echo    Dimensions: %%i
            REM Extract width and height - basic check
            echo    ℹ️  Check if dimensions are ≥1024x1024 for best quality
        )
    )
) else (
    echo ⚠️  Source image: app-icon.png not found
    echo    Please add a 1024x1024 PNG file named 'app-icon.png'
)

echo.
echo 🎯 Quick Commands:
echo ==================
echo Generate icons: npm run generate-icons
echo iOS only: app-icon generate --icon app-icon.png --platform ios
echo Android only: app-icon generate --icon app-icon.png --platform android

echo.
echo 📁 Generated Files Locations:
echo =============================
echo iOS: ios\ReactNativeCoreShowcase\Images.xcassets\AppIcon.appiconset\
echo Android: android\app\src\main\res\mipmap-*\
