

---

# **Crypto Tracker**

Crypto Tracker is a modern web application designed to help users track their cryptocurrency portfolios, view real-time prices, manage transactions, and calculate profit and loss. It features a clean UI, user authentication, and robust functionality.

---

## **Features**
- **User Authentication**: Secure login, registration, and password reset functionalities.
- **Real-Time Prices**: View the latest cryptocurrency prices.
- **Portfolio Management**: Track and manage your crypto investments.
- **Transaction History**: View past transactions for better financial insights.
- **Profit and Loss Analysis**: Analyze the performance of your investments.
- **Crypto Transfers**: Transfer cryptocurrencies between accounts securely.
- **Responsive Design**: Fully responsive and works seamlessly on all devices.
- **Splash Screen**: Dynamic animation for first-time visitors or unauthenticated users.
- **Protected Routes**: Pages accessible only to authenticated users.
- **Error Handling**: 404 error page for undefined routes.

---

## **Tech Stack**
- **Frontend**: React, TypeScript, Material UI, Framer Motion
- **State Management**: Redux Toolkit
- **Routing**: React Router
- **Backend**: [Provide details if applicable, e.g., Node.js/Express]
- **Database**: PostgreSQL (via TypeORM)

---

## **Getting Started**

### **Prerequisites**
Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- PostgreSQL database setup

---

### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/crypto-tracker.git
   cd crypto-tracker
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up the `.env` file with the following environment variables:
   ```env
   REACT_APP_API_BASE_URL=<Your API Base URL>
   REACT_APP_API_KEY=<Your API Key>
   ```

4. Run the development server:
   ```bash
   npm start
   ```

5. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

### **Usage**

#### **Public Pages**
- **Home** (`/`): Overview of the application.
- **Register** (`/register`): User registration page.
- **Login** (`/login`): User login page.
- **Prices** (`/get-prices`): View real-time cryptocurrency prices.
- **Reset Password** (`/reset-password`): Request password reset.

#### **Protected Pages**
- **Dashboard** (`/dashboard`): User dashboard for portfolio management.
- **Transaction** (`/buy`): Buy and sell cryptocurrencies.
- **Transfer** (`/transfer`): Transfer cryptocurrencies securely.
- **Profit and Loss** (`/profit-and-loss`): View profit and loss details.
- **Change Password** (`/change-password`): Update user password.

---



## **Key Components**

### **Splash Screen**
Located in `Home.tsx`. Displays a 3-second animation for unauthenticated users.

### **ProtectedRoute**
Ensures routes like `/dashboard`, `/buy`, and `/transfer` are accessible only by logged-in users. Found in `components/ProtectedRoute.tsx`.

### **Lazy Loading**
All pages are lazy-loaded using `React.lazy` for optimized performance.

---

## **Scripts**

### Run the development server:
```bash
npm start
```

### Build for production:
```bash
npm run build
```

### Run tests (if configured):
```bash
npm test
```

### Lint and format code:
```bash
npm run lint
npm run format
```

---

## **Dependencies**

### Major Libraries:
- **React Router**: Routing for the application.
- **Redux Toolkit**: State management.
- **Material UI**: UI components and theming.
- **Framer Motion**: Smooth animations and transitions.
- **Toastify**: Notifications and alerts.

