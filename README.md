# JoVan - Export & Import Commodities Website

A modern, fully responsive Next.js website for promoting export and import of local commodities. Built with Next.js 15, TypeScript, Tailwind CSS, and NextAuth for authentication.

## Features

### Customer-Facing Features
- **Home Page**: Attractive landing page with hero section, features, and featured products
- **Product Catalog**: Browse all available products with detailed information
- **Product Cards**: Each product card includes:
  - Product image, name, description, and category
  - WhatsApp contact button for direct inquiries
  - Responsive design
- **About Us**: Company information, vision, mission, and why choose us
- **Contact Page**: Multiple contact options including WhatsApp, email, phone, and address
- **Fully Responsive**: Works perfectly on mobile, tablet, and desktop devices

### Admin Features
- **Secure Login**: Protected admin area with email/password authentication
- **Dashboard**: Manage all products in one place
- **Product Management**:
  - Add new products
  - Edit existing products
  - Delete products
  - View all products in a table format

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Authentication**: NextAuth.js v5 (beta)
- **Icons**: React Icons
- **Password Hashing**: bcryptjs

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/SilvaneUX/JoVan.git
cd JoVan
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory:
```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-change-this-in-production
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

### Building for Production

```bash
npm run build
npm start
```

## Default Admin Credentials

- **Email**: admin@jovan.com
- **Password**: admin123

⚠️ **Important**: Change these credentials in production by updating the `data/users.json` file with a new bcrypt-hashed password.

## Project Structure

```
JoVan/
├── app/                      # Next.js App Router pages
│   ├── about/               # About Us page
│   ├── admin/               # Admin area
│   │   ├── dashboard/       # Admin dashboard
│   │   └── login/          # Admin login page
│   ├── api/                # API routes
│   │   ├── auth/           # NextAuth endpoints
│   │   └── products/       # Product CRUD APIs
│   ├── contact/            # Contact page
│   ├── products/           # Products listing page
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/              # React components
│   ├── AuthProvider.tsx    # NextAuth session provider
│   ├── Footer.tsx          # Footer component
│   ├── Navbar.tsx          # Navigation bar
│   └── ProductCard.tsx     # Product card component
├── data/                    # Data storage
│   ├── products.json       # Products database
│   └── users.json          # Users database
├── lib/                     # Utility functions
│   ├── auth.ts             # NextAuth configuration
│   ├── products.ts         # Product CRUD functions
│   └── users.ts            # User functions
├── types/                   # TypeScript types
│   ├── index.ts            # App types
│   └── next-auth.d.ts      # NextAuth type extensions
└── public/                  # Static assets
```

## Key Features Explained

### WhatsApp Integration
Each product card includes a "Contact via WhatsApp" button that:
- Opens WhatsApp with a pre-filled message
- Includes the product name in the message
- Works on both mobile and desktop

### Admin Dashboard
- Protected route requiring authentication
- Add, edit, and delete products
- Simple JSON-based data storage
- Real-time updates after changes

### Responsive Design
- Mobile-first approach using Tailwind CSS
- Hamburger menu on mobile devices
- Flexible grid layouts
- Optimized for all screen sizes

## Customization

### Adding Products
Products are stored in `data/products.json`. You can either:
1. Use the admin dashboard (recommended)
2. Manually edit the JSON file

### Changing Contact Information
Update the contact details in `app/contact/page.tsx`:
```typescript
const whatsappNumber = '+1234567890';
const email = 'info@jovan.com';
const phone = '+1 (234) 567-890';
const address = '123 Business Street, City, Country';
```

### Styling
The project uses Tailwind CSS. You can customize:
- Colors in component files
- Global styles in `app/globals.css`
- Tailwind configuration (if needed)

## Security Notes

1. **Change default admin credentials** before deploying to production
2. **Update NEXTAUTH_SECRET** to a strong random string
3. The current implementation uses JSON files for simplicity - consider using a database for production
4. Enable HTTPS in production

## Future Enhancements

Potential improvements for production:
- Database integration (PostgreSQL, MongoDB, etc.)
- Image upload functionality
- Email notifications
- Order management system
- Multiple admin users
- Product categories filtering
- Search functionality
- Analytics dashboard

## License

This project is open source and available under the MIT License.

## Support

For issues or questions, please create an issue in the GitHub repository.

---

Built with ❤️ for local commodity export and import businesses
