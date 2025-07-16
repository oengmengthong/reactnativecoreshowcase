Below is a concise **Context & Requirements Specification** you can drop into a README or planning doc.
It captures **everything React Native offers out‑of‑the‑box** (no Expo‑only APIs, no community libraries) and the guard‑rails for your “core‑showcase” app.

---

## 1  Project overview

| Item               | Description                                                                                                                                                    |
| ------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Product name**   | **React Native Core Showcase**                                                                                                                                 |
| **Goal**           | Demonstrate every capability bundled in the `react‑native` package—UI primitives, animation system, device & platform bridges—using **zero third‑party code**. |
| **Audience**       | Developers migrating from Flutter (or web) who want a hands‑on reference of what React Native itself can do.                                                   |
| **Success metric** | Opening the app lets a dev explore 20‑30 demo screens and confirm a feature works on both iOS & Android without installing any extra library.                  |

---

## 2  In‑scope feature catalog

### 2.1 UI / layout primitives

`View`, `SafeAreaView`, `Text`, `Image`, `ImageBackground`,
`ScrollView`, `FlatList`, `SectionList`, `VirtualizedList`,
`TextInput`, `Pressable`, `TouchableOpacity`, `TouchableHighlight`,
`Modal`, `ActivityIndicator`, `RefreshControl`, `StatusBar`.

### 2.2 Animation & gesture

`Animated` (timing, spring, decay, interpolation),
`LayoutAnimation`, `PanResponder`.

### 2.3 Platform & device APIs

| Area               | APIs                                                               |
| ------------------ | ------------------------------------------------------------------ |
| **Device**         | `Dimensions`, `PixelRatio`, `Appearance`, `Platform`               |
| **Lifecycle**      | `AppState`, `BackHandler`                                          |
| **System UX**      | `Clipboard`, `Share`, `Linking`, `Vibration`, `PermissionsAndroid` |
| **Accessibility**  | `AccessibilityInfo` + per‑prop accessibility attributes            |
| **Native bridge†** | `NativeModules`, `TurboModuleRegistry`, constants round‑trip       |

† A single “Hello‑native” constant will be exposed from each platform to prove the bridge is working—no extra native UI code.

### 2.4 Utilities

`StyleSheet`, `InteractionManager`, `LogBox`.

---

## 3  Out‑of‑scope (must NOT appear)

* Navigation libraries (`react‑navigation`, `react‑native‑navigation`, etc.)
  *→ Replace with a hand‑rolled FlatList + local state stack.*
* UI kits / icons / design‑systems (Paper, NativeBase, Tamagui, SVGs).
* Expo modules, CocoaPods, Gradle dependencies.
* Any community gesture, animation, camera, file‑system, notification, or analytics library.

---

## 4  Technical constraints

| Constraint                                                                                          | Rationale                                           |
| --------------------------------------------------------------------------------------------------- | --------------------------------------------------- |
| **No external JS packages** in `package.json` beyond `react`, `react-native`, and TypeScript types. | Guarantees reproducibility and zero native linking. |
| **TypeScript** (`strict` true)                                                                      | Better auto‑complete for core APIs.                 |
| **Hermes** engine enabled on both platforms.                                                        | Smaller bundle size, modern JS features.            |
| **iOS 13+ / Android 7+** runtime baseline                                                           | Matches current React Native release support.       |
| **Single‑bundle architecture**                                                                      | No code‑splitting or dynamic imports.               |

---

## 5  Architecture outline

```
/core-showcase
│  App.tsx                 ← holds mini‑router & back‑stack
│  data.ts                 ← typed registry of demo screens
└─ demos/
   ├─ LayoutFlexbox.tsx
   ├─ AnimatedOpacityLoop.tsx
   ├─ DragBoxPanResponder.tsx
   ├─ ClipboardCopyPaste.tsx
   ├─ DarkModeListener.tsx
   └─ …one file per feature
```

* **Navigation**: state‑driven (`activeDemo`), custom back button.
* **Styling**: `StyleSheet.create`, Flexbox only.
* **Demo template**: every demo exports a functional component, self‑contained UI, 1‑2 paragraphs of inline explanation (just `Text`).

---

## 6  Quality & UX requirements

| Area               | Requirement                                                                                            |
| ------------------ | ------------------------------------------------------------------------------------------------------ |
| Performance        | Maintain ≥ 55 FPS on mid‑range Android while running the heaviest animation demo.                      |
| Responsiveness     | All screens adapt to orientation changes via Flexbox.                                                  |
| Accessibility      | Each demo verifies `accessibilityLabel` / `accessibilityRole`; VoiceOver/TalkBack announces correctly. |
| Visual consistency | Light & dark theme tested using `Appearance` listener; StatusBar styled to match.                      |
| Error handling     | Any unimplemented feature logs an explanatory warning through `LogBox.ignoreAllLogs(false)`.           |
| Documentation      | Root README lists the mapping: **core API → demo filename → screenshot**.                              |

---

## 7  Delivery & testing checklist

* [ ] `npm run ios` launches without Xcode/Pod install steps.
* [ ] `npm run android` builds on a clean clone with only Android SDK.
* [ ] CI job (GitHub Actions) runs `npm run test:e2e` using Jest + React‑Native‑testing‑library **without** adding extra deps aside from dev‑tools.
* [ ] Manual smoke test on real devices (iPhone 12, Pixel 5) verifying every demo opens and closes.
* [ ] Markdown doc “How this maps to Flutter widgets” for parity reference.

---

### Bottom line

This spec makes crystal‑clear **what must be showcased** and **what is forbidden**, giving you (or any collaborator) an unambiguous frame to build the React Native Core Showcase. Once this baseline is complete you can layer optional branches (e.g., “with React Navigation”, “with Reanimated”)—but the **main branch stays 100 % vanilla React Native**.
