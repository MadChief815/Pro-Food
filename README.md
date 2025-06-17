# Pro Food

**Pro Food** is a feature-rich, responsive **food delivery application** built with **React Native (Bare Workflow)**. It delivers a smooth user experience across Android devices. The app is modular, maintainable, and uses modern best practices for mobile development.

---

## 📱 Features

- ✅ **User Authentication**
  - Sign In / Sign Up
  - Forgot Password
  - Auth persistence with Redux

- 🛒 **Core Screens**
  - Home Screen _(Tab View)_
  - Cart Screen _(Tab View)_
  - Profile Screen _(Tab View)_
  - Item Details Screen
  - Profile Data Screen
  - Payment Screen
  - Onboarding Screens

- 🌍 **Location Support**
  - Integrated with **Expo Location API**

- 📦 **State Management**
  - `Redux` for authentication and persistent user data
  - `Zustand` for lightweight local state (cart, UI state, etc.)

- 📏 **Validation**
  - Uses `Zod` for schema-based form validation

- 💡 **Responsive Design**
  - Adaptive layout that works seamlessly across different screen sizes

---

## 🛠️ Tech Stack

| Purpose                  | Library / Tool            |
|--------------------------|---------------------------|
| Framework                | React Native (Bare Workflow) |
| Navigation               | React Navigation          |
| Authentication Storage   | Redux Toolkit + Redux Persist |
| Local State Management   | Zustand                   |
| Validation               | Zod                       |
| Location                 | Expo Location             |
| UI                       | React Native Core + Custom Styling |
| Payment (Planned)        | Stripe or Razorpay  |

---

## 📸 Screens Overview

- 🚀 Onboarding Screens
- 🔐 Authentication: Sign In / Sign Up / Forgot Password
- 🏠 Home _(Tab View)_
- 🧾 Cart _(Tab View)_
- 👤 Profile _(Tab View)_
- 🍔 Item Detail
- 📇 Profile Data
- 💳 Payment

---

## 🔮 Upcoming Features

- 🔍 Search Functionality
- 📜 Order List History
- 💳 Integrated Payment Gateway (Stripe / Razorpay)
- ⚙️ Settings Screen
- 🆘 Help Center & Support Screen

---

## 📦 Installation

```bash
git clone https://github.com/MadChief815/Pro-Food.git
cd pro-food
npm install
npm run android
