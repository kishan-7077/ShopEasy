
# 🌟 ShopEasy E-Commerce App

ShopEasy is a modern e-commerce mobile application built with **Expo** for the frontend and **Node.js** for the backend. It provides users with a seamless shopping experience, including adding items to the cart, managing their accounts, and making secure payments using Razorpay.

---

## ✨ Features

### 🏠 **Home Screen**
- Displays a list of available products.
- Allows users to browse through various categories and view product details.
- 🔍 Search functionality to find specific products.

### 🛒 **Cart Screen**
- Users can add items to their cart.
- Shows all selected items with quantity and price details.
- Options to ➕ increase, ➖ decrease, or ❌ remove items from the cart.
- 🛍️ Checkout button to proceed to payment.

### 👤 **Account Screen**
- 🔑 User login and signup functionality.
- Once logged in, the user remains logged in until they explicitly log out.
- Displays user profile details and 📜 order history.

### 💳 **Payment Gateway**
- Integrated with **Razorpay** for secure and reliable payment processing.
- Supports multiple payment methods, including credit/debit cards, UPI, and wallets.

---

## ⚙️ Tech Stack

### 🖥️ Frontend
- **Expo** (React Native) for cross-platform mobile app development.
- **Redux** for state management, particularly for storing cart details.

### 🛠️ Backend
- **Node.js** for handling API requests and business logic.
- **Express.js** for routing and middleware.
- **MongoDB** (or any preferred database) for storing user and product data.

---

## 🏗️ Core Functionality

### 🛒 Redux Store
- Manages the cart state across the app.
- Stores the list of items added by the user along with their quantities.
- Ensures data persistence during navigation within the app.

### 🔐 Authentication
- Secure login and signup with token-based authentication.
- Persisted login session using local storage or secure storage.
- Logout functionality to clear session data.

### 💳 Razorpay Integration
- Backend APIs handle payment requests and responses.
- Ensures secure transactions through tokenized payment methods.

---

## 🚀 Installation

### Prerequisites
- Node.js and npm installed on your system.
- Expo CLI installed globally.

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/kishan-7077/ShopEasy.git
   cd ShopEasy
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Expo app:
   ```bash
   expo start
   ```

4. Set up the Node.js backend:
   - Navigate to the `backend` folder.
   - Install dependencies:
     ```bash
     npm install
     ```
   - Start the server:
     ```bash
     npm start
     ```

5. Configure Razorpay keys:
   - Add your Razorpay API keys in the backend `.env` file:
     ```plaintext
     RAZORPAY_KEY_ID=your_key_id
     RAZORPAY_KEY_SECRET=your_key_secret
     ```

---

## 🌟 Future Enhancements
- ⭐ Add product ratings and reviews.
- 🔔 Implement push notifications for order updates.
- ❤️ Introduce wishlist functionality.

---


### 📜 License
This project is licensed under the [MIT License](LICENSE).

---
