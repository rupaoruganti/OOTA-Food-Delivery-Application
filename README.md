
# 🍽️ OOTA Food Delivery Application

A full-stack MERN-based food delivery app offering a seamless way to explore and order your favorite meals.

---

## 📁 Project Structure

```
oota_app/
├── Backend/      ← Node.js + Express backend API
├── frontend/     ← React frontend application
└── .gitignore
```

---

## 🚀 Features

- Browse a variety of restaurants with their menus and detailed item descriptions.
- Add multiple food items from different restaurants to your cart for easy ordering.
- User authentication system with secure login and signup functionality.
- Manage your cart by updating quantities or removing items before checkout.
- Responsive and user-friendly interface for seamless browsing and ordering.

---

## ⚙️ Prerequisites

* Node.js installed ([https://nodejs.org/](https://nodejs.org/))
* MongoDB running locally or via a cloud service like MongoDB Atlas

---

## 🛠️ Local Setup Instructions (Without Docker)

### 1. Clone the Repository

```bash
git clone https://github.com/rupaoruganti/OOTA-Food-Delivery-Application.git
cd OOTA-Food-Delivery-Application
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create a `.env` file inside the `/Backend` folder for environment variables (e.g., DB connection string).

Start the backend server:

```bash
node server.js
# or if you have nodemon
npx nodemon server.js
```

### 3. Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

The React app will open at `http://localhost:3000`.

---

## 📚 Technologies Used

* **Frontend:** React.js, CSS
* **Backend:** Node.js, Express.js
* **Database:** MongoDB

---
