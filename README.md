# 🛍️ Digital Shop – E‑Commerce for Digital Products

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**Digital Shop** is a modern, responsive e-commerce platform built with **Next.js**, tailored for selling digital products. It provides a sleek and smooth shopping experience with an intuitive UI, advanced filtering, wishlist functionality, and user account management.

---

## 🌐 Live Demo

🔗 [Visit the Live Site](https://shop-digital-ten.vercel.app/)

## 📂 Repository

📁 [GitHub – alysalah83/E-Commerce](https://github.com/alysalah83/E-Commerce)

---

## ✨ Features

### 🏠 Homepage

- Elegant hero section with animated slider
- Featured sections: Bestsellers, New Arrivals, etc.
- Global search bar for instant product discovery

### 🛍️ Shop Page

- Grid/List toggle view options
- Advanced filters: category, price range, rating
- Sorting: Latest, Price (Low–High), Popularity

### 📦 Product Details

- Full-screen and zoomable product images
- Rich product descriptions
- Customer reviews with star ratings and comments

### 🛒 Cart & Wishlist

- Works for both guest and signed-in users
- Persistent state (localStorage + backend sync)
- Seamless add/remove with real-time UI updates

### 🔐 Authentication

- Google sign-in via **NextAuth.js**
- Protected routes (e.g., account, product submission)

### 👤 User Account

- Edit personal information (name, avatar, address)
- Auto-fill address using browser geolocation
- View & manage past orders

### ➕ Product Management

- Logged-in users can add new products
- Edit or delete your published products
- Easy-to-use form for product uploads

### 📄 Extra Pages

- Popular Products
- Contact page with embedded map
- Fully navigable UI (header + footer)

---

## ⚙️ Tech Stack

| Purpose              | Technology                                                 |
| -------------------- | ---------------------------------------------------------- |
| **Framework**        | [Next.js](https://nextjs.org/)                             |
| **Styling**          | [Tailwind CSS](https://tailwindcss.com/)                   |
| **Authentication**   | [NextAuth.js](https://next-auth.js.org/) with Google OAuth |
| **State Management** | React Context API                                          |
| **Storage**          | localStorage + [Supabase](https://supabase.com/)           |
| **Deployment**       | [Vercel](https://vercel.com/)                              |

---

## 🚀 Getting Started

### 📦 Prerequisites

- Node.js and npm installed
- Supabase project with configured tables
- Google OAuth credentials for NextAuth

### 🛠️ Installation

```bash
git clone https://github.com/alysalah83/E-Commerce.git
cd E-Commerce
npm install
```
