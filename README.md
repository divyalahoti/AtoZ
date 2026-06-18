# AtoZ Jewellery — Premium Artificial Jewellery E-Commerce

A fully redesigned modern luxury e-commerce website for AtoZ Jewellery, built with React + Vite (frontend) and Node.js + Express + MongoDB (backend).

## ✨ Features

### Customer-Facing
- **Hero Slider** — Auto-playing image carousel with luxury jewellery visuals
- **Product Catalogue** — Filter by category, price range, and search
- **Product Details** — Image gallery, zoom, reviews, WhatsApp order, add to cart
- **Shopping Cart** — Quantity controls, promo code, order summary
- **Checkout** — Multi-step with shipping, payment, review & confirm
- **Order Tracking** — Real-time order status timeline
- **Wishlist** — Save favourite items
- **Dark Mode** — Full dark/light toggle
- **Login / Register** — Auth page with social login UI
- **About Us** — Brand story, stats, team, values
- **Contact** — Form, Google Maps, WhatsApp link

### Admin Dashboard (`/admin`)
- **Dashboard Overview** — Stats cards, recent orders, category breakdown
- **Add Product** (`/add-product`) — Upload image, set name, category, price, description
- **Manage Products** (`/list`) — Table view with edit & delete

### UI/UX
- Sticky navbar with search overlay
- Floating WhatsApp button
- Back to top button
- Loading screen with brand animation
- Skeleton loaders
- Toast notifications
- Responsive for mobile, tablet, desktop

## 🎨 Design System

| Token | Value |
|---|---|
| Gold | `#C9A84C` |
| Black | `#0A0A0A` |
| White | `#FEFEFE` |
| Beige | `#F5EFE0` |
| Font Display | Cormorant Garamond |
| Font Body | Jost |

## 🚀 Getting Started

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend
npm install
node server.js
```

### Environment Variables

**frontend/.env**
```
VITE_BACKENDURL=http://localhost:5000
```

**backend/.env**
```
MONGODB_URI=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
PORT=5000
```

## 📁 Project Structure

```
AtoZ/
├── frontend/
│   └── src/
│       ├── components/
│       │   ├── Navbar/        # Sticky nav with search + dark mode
│       │   ├── Footer/        # Full footer with newsletter
│       │   ├── Home/          # Hero, categories, products, testimonials
│       │   ├── ProductList/   # Filter + sort product grid
│       │   ├── ProductCard/   # Product detail page
│       │   ├── Cart/          # Shopping cart
│       │   ├── Checkout/      # Multi-step checkout
│       │   ├── Auth/          # Login/Register
│       │   ├── About/         # About us page
│       │   ├── Contact/       # Contact form + map
│       │   └── OrderTracking/ # Order status tracker
│       ├── admin/
│       │   ├── AdminDashboard/ # Dashboard with analytics
│       │   ├── AddProduct/    # Add/edit product form
│       │   └── ListProduct/   # Product management table
│       └── context/
│           └── CartContext.jsx # Global cart + wishlist state
├── backend/
│   ├── models/productModel.js
│   ├── controllers/productController.js
│   ├── routes/productRoute.js
│   └── server.js
└── README.md
```

## 🛠 Tech Stack

- **Frontend:** React 19, Vite, React Router v7, Axios, React Icons, React Toastify
- **Backend:** Node.js, Express, Mongoose (MongoDB), Multer, Cloudinary
- **Styling:** Pure CSS with CSS Variables (no Tailwind/Bootstrap dependency)

## 📞 Contact

AtoZ Jewellery | Himatnagar, Gujarat, India
WhatsApp: +91 94283 80108
Email: info@atozjewellery.com
