# Digital Shop 🛍️

A modern, responsive e-commerce platform built with Next.js, designed for selling digital products with a seamless shopping experience.

## 🚀 Live Demo

**[Visit Digital Shop](https://shop-digital-ten.vercel.app/)**

## ✨ Features

### 🏪 Shopping Experience

- **Modern Homepage** with animated hero section and featured product sections
- **Product Catalog** with grid/list view toggle options
- **Advanced Search & Filtering** by category, price range, and ratings
- **Product Sorting** by latest, price (low-high), and popularity
- **Product Details** with full-screen zoomable images and rich descriptions
- **Customer Reviews** with star ratings and comment system

### 🛒 Cart & Wishlist

- **Shopping Cart** that works for both guests and authenticated users
- **Wishlist Functionality** with persistent state across sessions
- **Real-time Updates** for seamless add/remove operations
- **Local Storage Integration** with backend synchronization

### 👤 User Management

- **Google OAuth Authentication** via NextAuth.js
- **User Profiles** with editable personal information
- **Address Management** with auto-fill using browser geolocation
- **Order History** to view and manage past purchases
- **Protected Routes** for secure user areas

### 📦 Product Management

- **Add Products** - Logged-in users can list new products
- **Edit/Delete Products** - Manage your published products
- **Easy Upload Form** for quick product submissions

### 🎨 Design & UX

- **Fully Responsive** design for all device sizes
- **Smooth Animations** and transitions
- **Intuitive Navigation** with comprehensive header and footer
- **Contact Page** with embedded map integration

## 🛠️ Tech Stack

| Purpose            | Technology                                                 |
| ------------------ | ---------------------------------------------------------- |
| **Framework**      | [Next.js](https://nextjs.org/)                             |
| **Styling**        | [Tailwind CSS](https://tailwindcss.com/)                   |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) with Google OAuth |
| **Database**       | [Supabase](https://supabase.com/)                          |
| **Deployment**     | [Vercel](https://vercel.com/)                              |
| **Language**       | TypeScript/JavaScript                                      |

## 📋 Prerequisites

Before running this project, make sure you have:

- Node.js (version 18 or higher)
- npm or yarn package manager
- A Supabase account and project
- Google OAuth credentials for authentication

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/alysalah83/E-Commerce.git
cd E-Commerce
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Environment Variables

Create a `.env.local` file in the root directory and add the following variables:

```env
# NextAuth Configuration
NEXTAUTH_SECRET=your-nextauth-secret-key
NEXTAUTH_URL=http://localhost:3000

# Google OAuth
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-supabase-service-role-key
```

### 4. Database Setup

1. Create a new Supabase project
2. Run the following SQL to create the necessary tables:

```sql
-- Users table (extends NextAuth users)
CREATE TABLE users (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email VARCHAR UNIQUE NOT NULL,
  name VARCHAR,
  image VARCHAR,
  address TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Products table
CREATE TABLE products (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL,
  image_url VARCHAR,
  category VARCHAR,
  rating DECIMAL(2,1) DEFAULT 0,
  user_id UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Cart items table
CREATE TABLE cart_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  quantity INTEGER DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Wishlist table
CREATE TABLE wishlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  product_id UUID REFERENCES products(id),
  created_at TIMESTAMP DEFAULT NOW()
);

-- Orders table
CREATE TABLE orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  total_amount DECIMAL(10,2) NOT NULL,
  status VARCHAR DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW()
);

-- Reviews table
CREATE TABLE reviews (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  user_id UUID REFERENCES users(id),
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### 5. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Create OAuth 2.0 credentials
5. Add your domain to authorized JavaScript origins
6. Add your callback URL: `http://localhost:3000/api/auth/callback/google`

### 6. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## 📁 Project Structure

```
├── components/          # Reusable React components
├── pages/              # Next.js pages and API routes
│   ├── api/           # API endpoints
│   └── auth/          # Authentication pages
├── styles/            # Global styles and Tailwind config
├── lib/               # Utility functions and configurations
├── public/            # Static assets (images, icons)
├── types/             # TypeScript type definitions
└── hooks/             # Custom React hooks
```

## 🚀 Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect your GitHub repository to Vercel
3. Add your environment variables in Vercel dashboard
4. Deploy automatically on every push to main branch

```bash
# Or deploy using Vercel CLI
npm i -g vercel
vercel --prod
```

## 🎯 Key Features Implementation

### Authentication Flow

- Users can sign in with Google OAuth
- Protected routes redirect to login if not authenticated
- User session persists across browser sessions

### Shopping Cart

- Add/remove items with real-time UI updates
- Cart state persists in localStorage for guests
- Authenticated users get cart synced with database

### Product Management

- CRUD operations for products
- Image upload and management
- User can only edit/delete their own products

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Aly Salah**

- GitHub: [@alysalah83](https://github.com/alysalah83)
- Project Link: [https://github.com/alysalah83/E-Commerce](https://github.com/alysalah83/E-Commerce)

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for seamless deployment
- Supabase for the backend infrastructure
- Tailwind CSS for the utility-first CSS framework

---

⭐ If you found this project helpful, please give it a star on GitHub!
