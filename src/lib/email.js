import { SHOP_CONFIG } from './constants'

// Email notification service
// This uses Supabase Edge Functions or can be connected to services like Resend, SendGrid

export const sendBookingConfirmation = async (booking) => {
  // For MVP, we'll use Supabase Edge Functions
  // You can also integrate with email services directly

  const emailData = {
    to: booking.email,
    subject: `Booking Confirmed - ${SHOP_CONFIG.name}`,
    html: generateCustomerEmailTemplate(booking),
  }

  try {
    // Option 1: Call Supabase Edge Function
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    return true
  } catch (error) {
    console.error('Email sending failed:', error)
    // Don't throw - email failure shouldn't break the booking
    return false
  }
}

export const sendOwnerNotification = async (booking) => {
  const emailData = {
    to: SHOP_CONFIG.email,
    subject: `New Booking - ${booking.customer_name}`,
    html: generateOwnerEmailTemplate(booking),
  }

  try {
    const response = await fetch(`${import.meta.env.VITE_SUPABASE_URL}/functions/v1/send-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify(emailData),
    })

    if (!response.ok) {
      throw new Error('Failed to send email')
    }

    return true
  } catch (error) {
    console.error('Owner notification failed:', error)
    return false
  }
}

function generateCustomerEmailTemplate(booking) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #ee7712, #df5c08); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .label { color: #666; }
        .value { font-weight: bold; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        .paw { font-size: 24px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="paw">🐾</div>
          <h1>${SHOP_CONFIG.name}</h1>
          <p>Booking Confirmed!</p>
        </div>
        <div class="content">
          <p>Hi <strong>${booking.customer_name}</strong>,</p>
          <p>Thank you for booking with us! Your appointment has been confirmed.</p>

          <div class="booking-details">
            <h3>Booking Details</h3>
            <div class="detail-row">
              <span class="label">Service:</span>
              <span class="value">${booking.service_name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Pet:</span>
              <span class="value">${booking.pet_name} (${booking.pet_type})</span>
            </div>
            <div class="detail-row">
              <span class="label">Date:</span>
              <span class="value">${booking.booking_date}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time:</span>
              <span class="value">${booking.time_slot}</span>
            </div>
            <div class="detail-row">
              <span class="label">Total:</span>
              <span class="value">₹${booking.total_price}</span>
            </div>
          </div>

          <p><strong>Location:</strong><br>${SHOP_CONFIG.address}</p>
          <p><strong>Contact:</strong><br>${SHOP_CONFIG.phone}</p>

          <p>We look forward to seeing you and ${booking.pet_name}!</p>
        </div>
        <div class="footer">
          <p>${SHOP_CONFIG.name}<br>${SHOP_CONFIG.address}</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function generateOwnerEmailTemplate(booking) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #22c55e; color: white; padding: 20px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
        .detail-row:last-child { border-bottom: none; }
        .label { color: #666; }
        .value { font-weight: bold; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>🔔 New Booking Received!</h2>
        </div>
        <div class="content">
          <div class="booking-details">
            <h3>Customer Details</h3>
            <div class="detail-row">
              <span class="label">Name:</span>
              <span class="value">${booking.customer_name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Phone:</span>
              <span class="value">${booking.phone}</span>
            </div>
            <div class="detail-row">
              <span class="label">Email:</span>
              <span class="value">${booking.email}</span>
            </div>
          </div>

          <div class="booking-details">
            <h3>Pet Details</h3>
            <div class="detail-row">
              <span class="label">Pet Name:</span>
              <span class="value">${booking.pet_name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Type:</span>
              <span class="value">${booking.pet_type}</span>
            </div>
            <div class="detail-row">
              <span class="label">Size:</span>
              <span class="value">${booking.pet_size}</span>
            </div>
          </div>

          <div class="booking-details">
            <h3>Appointment</h3>
            <div class="detail-row">
              <span class="label">Service:</span>
              <span class="value">${booking.service_name}</span>
            </div>
            <div class="detail-row">
              <span class="label">Date:</span>
              <span class="value">${booking.booking_date}</span>
            </div>
            <div class="detail-row">
              <span class="label">Time:</span>
              <span class="value">${booking.time_slot}</span>
            </div>
            <div class="detail-row">
              <span class="label">Price:</span>
              <span class="value">₹${booking.total_price}</span>
            </div>
            ${booking.notes ? `
            <div class="detail-row">
              <span class="label">Notes:</span>
              <span class="value">${booking.notes}</span>
            </div>
            ` : ''}
          </div>

          <p style="text-align: center;">
            <a href="${window?.location?.origin}/admin/dashboard" style="background: #22c55e; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">
              View in Dashboard
            </a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}
