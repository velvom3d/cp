# Pawsome Grooming Studio - Pet Grooming Booking System

A modern, mobile-friendly web application for pet grooming appointment booking.

## Features

### Customer Side
- Browse available grooming services
- Book appointments with date/time selection
- Real-time slot availability
- Booking confirmation with details

### Admin Side
- Secure login for shop owner
- View all bookings in a dashboard
- Update booking status (Pending → Confirmed → Completed)
- Filter bookings by status
- Stats overview (total, pending, confirmed, completed, cancelled)

## Tech Stack

- **Frontend:** React + Vite
- **Styling:** Tailwind CSS
- **Backend:** Supabase (Database + Auth)
- **Icons:** Lucide React
- **Date Handling:** date-fns
- **Notifications:** react-hot-toast

## Quick Start

### 1. Install Dependencies

```bash
cd pet-grooming-booking
npm install
```

### 2. Set Up Supabase

1. Create a free account at [supabase.com](https://supabase.com)
2. Create a new project
3. Go to **SQL Editor** and run the contents of `supabase-schema.sql`
4. Go to **Settings → API** and copy your:
   - Project URL
   - anon/public key

### 3. Configure Environment

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your Supabase credentials
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### 4. Create Admin User

1. Go to Supabase Dashboard → **Authentication → Users**
2. Click **Add User**
3. Enter email and password for the admin
4. Use these credentials to login at `/admin`

### 5. Run the App

```bash
npm run dev
```

Visit:
- Customer site: `http://localhost:5173`
- Admin login: `http://localhost:5173/admin`

## Project Structure

```
pet-grooming-booking/
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ServiceCard.jsx
│   │   └── ProtectedRoute.jsx
│   ├── pages/           # Page components
│   │   ├── Home.jsx
│   │   ├── Book.jsx
│   │   ├── AdminLogin.jsx
│   │   └── AdminDashboard.jsx
│   ├── lib/             # Utilities & config
│   │   ├── supabase.js
│   │   ├── constants.js
│   │   └── email.js
│   ├── context/         # React context
│   │   └── AuthContext.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── supabase-schema.sql  # Database schema
├── .env.example         # Environment template
└── README.md
```

## Customization

### Shop Details
Edit `src/lib/constants.js` to update:
- Shop name and tagline
- Contact information
- Working hours
- Services and pricing
- Time slots

### Styling
- Colors are defined in `tailwind.config.js`
- Primary color (orange) and Secondary color (green) can be changed

## Email Notifications (Optional)

For email notifications, you can:

1. **Use Supabase Edge Functions** with Resend/SendGrid
2. **Use a webhook** trigger on database insert
3. **Integrate directly** with an email service API

The email templates are in `src/lib/email.js`.

## Deployment

### Vercel (Recommended)
```bash
npm run build
# Deploy the dist folder to Vercel
```

### Netlify
```bash
npm run build
# Deploy the dist folder to Netlify
```

Remember to add your environment variables in the deployment platform.

## License

MIT
