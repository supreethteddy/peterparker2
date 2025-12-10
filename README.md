# quickParker - Premium Valet Parking App

A modern, production-ready mobile app frontend for valet parking services, built with React + TypeScript + Tailwind CSS.

## 🎨 Design System

The app uses a cohesive design system matching the quickParker logo:

- **Primary Dark**: `#0F1415` - Main backgrounds, headers, text
- **Primary Accent (Cyan)**: `#34C0CA` - Primary buttons, CTAs, active states
- **Secondary Accent (Green)**: `#66BD59` - Success states, insurance, positive actions
- **Surface**: `#FFFFFF` - Cards, content areas
- **Gradient**: `#34C0CA` → `#66BD59` - Premium accents

Typography: **Poppins** font family throughout

## 📱 Features

### Core Flows
- ✅ Splash Screen with logo
- ✅ Onboarding Carousel (3 slides)
- ✅ Phone Login & OTP Verification
- ✅ Profile Setup
- ✅ Vehicle Management (multiple vehicles)
- ✅ Payment Setup
- ✅ Insurance Toggle

### Main App
- ✅ Home Screen with full map view
- ✅ Valet Search & Assignment
- ✅ Secure Handover Flow
- ✅ In-Service/Parking with timer
- ✅ Return Request & Live Tracking
- ✅ Trip Completion & Payment
- ✅ Rating System

### Additional Pages (Uber/Ola style)
- ✅ Trip Details & History
- ✅ Wallet & Transactions
- ✅ Promotions & Offers
- ✅ Saved Addresses/Favorites
- ✅ Notifications Center
- ✅ Settings (Notifications, Privacy, Preferences)
- ✅ Emergency Contacts
- ✅ Support & Help

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## 📁 Project Structure

```
src/
├── assets/          # Logo SVGs
├── components/
│   ├── base/        # Reusable UI components
│   └── feature/     # Feature-specific components
├── pages/           # All app screens
├── router/          # Routing configuration
├── theme.ts         # Design system constants
└── config.ts        # App configuration
```

## 🎯 Key Pages

- `/` - Splash Screen
- `/onboarding` - Onboarding flow
- `/login` - Phone login & OTP
- `/home` - Main map view
- `/request` - Valet search
- `/handover` - Secure handover
- `/parking` - In-service timer
- `/return` - Return request
- `/payment` - Trip completion
- `/history` - Trip history
- `/wallet` - Wallet & transactions
- `/promotions` - Offers & discounts
- `/saved-addresses` - Favorite locations
- `/notifications` - Notification center
- `/settings` - App settings
- `/emergency` - Emergency contacts
- `/profile` - User profile

## 🎨 Design Principles

1. **Mobile-First**: Optimized for iOS & Android
2. **Consistent**: Uses design system throughout
3. **Premium**: Modern, clean, professional UI
4. **Accessible**: Proper contrast, touch targets (44x44px)
5. **Smooth**: Animations and transitions for better UX

## 📦 Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Router** - Navigation
- **Lucide React** - Icons
- **Vite** - Build tool

## 🔧 Customization

All colors and design tokens are defined in:
- `tailwind.config.ts` - Tailwind theme
- `src/theme.ts` - Design system constants

Update these files to customize the app's appearance.

## 📝 Notes

- All screens are mobile-optimized
- Uses safe area insets for iOS notch support
- Responsive design works on all screen sizes
- Production-ready code structure

---

Built with ❤️ for quickParker

