-- =====================================================
-- Supabase Database Schema for Pet Grooming Booking
-- =====================================================

-- Create bookings table
CREATE TABLE IF NOT EXISTS bookings (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),

    -- Customer Information
    customer_name VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,

    -- Pet Information
    pet_name VARCHAR(100) NOT NULL,
    pet_type VARCHAR(20) NOT NULL CHECK (pet_type IN ('dog', 'cat')),
    pet_size VARCHAR(20) NOT NULL CHECK (pet_size IN ('small', 'medium', 'large')),

    -- Service Information
    service_id VARCHAR(50) NOT NULL,
    service_name VARCHAR(100) NOT NULL,
    total_price INTEGER NOT NULL,

    -- Booking Details
    booking_date DATE NOT NULL,
    time_slot VARCHAR(20) NOT NULL,
    notes TEXT,

    -- Status
    status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled'))
);

-- Create index for faster queries
CREATE INDEX idx_bookings_date ON bookings(booking_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_email ON bookings(email);

-- Enable Row Level Security
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to INSERT (for customers booking)
CREATE POLICY "Allow public to create bookings" ON bookings
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Policy: Allow anyone to SELECT booked slots (for availability check)
CREATE POLICY "Allow public to view booked slots" ON bookings
    FOR SELECT
    TO anon
    USING (true);

-- Policy: Allow authenticated users (admin) full access
CREATE POLICY "Allow authenticated full access" ON bookings
    FOR ALL
    TO authenticated
    USING (true)
    WITH CHECK (true);

-- Function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to auto-update updated_at
CREATE TRIGGER update_bookings_updated_at
    BEFORE UPDATE ON bookings
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- =====================================================
-- EMAIL NOTIFICATIONS SETUP (Edge Function)
-- =====================================================
-- Note: For email notifications, you'll need to:
-- 1. Set up a Supabase Edge Function
-- 2. Use a service like Resend, SendGrid, or Mailgun
-- 3. Trigger it via database webhook or in your application

-- =====================================================
-- ADMIN USER SETUP
-- =====================================================
-- To create an admin user, go to Supabase Dashboard:
-- 1. Go to Authentication > Users
-- 2. Click "Add User"
-- 3. Enter email and password for the admin
-- 4. The admin can now login at /admin
