# MoyoClub - Local Setup Guide

## Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- A smartphone (iOS or Android) on the same WiFi network as your computer

## Installation Steps

1. **Clone or download the project**
   ```bash
   cd moyoclub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

## Running on Your Phone

1. **Download Expo Go app**
   - **iOS**: [App Store](https://apps.apple.com/app/expo-go/id982107779)
   - **Android**: [Google Play](https://play.google.com/store/apps/details?id=host.exp.exponent)

2. **Connect to the app**
   - Make sure your phone and computer are on the same WiFi network
   - Open Expo Go app on your phone
   - **iOS**: Scan the QR code from the terminal with your Camera app
   - **Android**: Scan the QR code from the terminal with the Expo Go app

## Troubleshooting

- If you get connection issues, try pressing `a` for Android or `i` for iOS in the terminal
- Make sure both devices are on the same network
- Try restarting the Metro bundler with `r` in the terminal

## Available Commands

- `npx expo start` - Start development server
- `npx expo start --clear` - Start with cache cleared
- Press `r` - Reload app
- Press `m` - Toggle menu

---

That's it! You should now see the MoyoClub app running on your phone.
