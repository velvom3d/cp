import { SHOP_CONFIG } from './constants'

// Send email when admin confirms/cancels/completes a booking
export const sendStatusUpdateEmail = async (booking, newStatus) => {
  const templates = {
    confirmed: {
      subject: `Booking Confirmed! - ${SHOP_CONFIG.name}`,
      html: generateConfirmedEmailTemplate(booking),
    },
    cancelled: {
      subject: `Booking Cancelled - ${SHOP_CONFIG.name}`,
      html: generateCancelledEmailTemplate(booking),
    },
    completed: {
      subject: `Thank You for Visiting! - ${SHOP_CONFIG.name}`,
      html: generateCompletedEmailTemplate(booking),
    },
  }

  const template = templates[newStatus]
  if (!template) return false

  const emailData = {
    to: booking.email,
    subject: template.subject,
    html: template.html,
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
      throw new Error('Failed to send status update email')
    }

    return true
  } catch (error) {
    console.error('Status update email failed:', error)
    return false
  }
}

function generateConfirmedEmailTemplate(booking) {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #3b82f6, #1d4ed8); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    .highlight { background: #dbeafe; padding: 15px; border-radius: 8px; text-align: center; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Confirmed!</h1>
      <p>${SHOP_CONFIG.name}</p>
    </div>
    <div class="content">
      <p>Hi <strong>${booking.customer_name}</strong>,</p>
      <p>Great news! Your booking has been <strong>confirmed</strong> by our team.</p>
      <div class="highlight">
        <strong>Your appointment is confirmed for:</strong><br>
        ${booking.booking_date} at ${booking.time_slot}
      </div>
      <div class="booking-details">
        <h3>Booking Details</h3>
        <div class="detail-row"><strong>Service:</strong> ${booking.service_name}</div>
        <div class="detail-row"><strong>Pet:</strong> ${booking.pet_name} (${booking.pet_type})</div>
        <div class="detail-row"><strong>Date:</strong> ${booking.booking_date}</div>
        <div class="detail-row"><strong>Time:</strong> ${booking.time_slot}</div>
        <div class="detail-row"><strong>Total:</strong> Rs.${booking.total_price}</div>
      </div>
      <p><strong>Location:</strong><br>${SHOP_CONFIG.address}</p>
      <p><strong>Contact:</strong><br>${SHOP_CONFIG.phone}</p>
      <p>Please arrive 5-10 minutes before your scheduled time.</p>
      <p>We look forward to pampering ${booking.pet_name}!</p>
    </div>
    <div class="footer">
      <p>${SHOP_CONFIG.name}<br>${SHOP_CONFIG.address}</p>
    </div>
  </div>
</body>
</html>`
}

function generateCancelledEmailTemplate(booking) {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .detail-row { padding: 10px 0; border-bottom: 1px solid #eee; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Booking Cancelled</h1>
      <p>${SHOP_CONFIG.name}</p>
    </div>
    <div class="content">
      <p>Hi <strong>${booking.customer_name}</strong>,</p>
      <p>We regret to inform you that your booking has been <strong>cancelled</strong>.</p>
      <div class="booking-details">
        <h3>Cancelled Booking Details</h3>
        <div class="detail-row"><strong>Service:</strong> ${booking.service_name}</div>
        <div class="detail-row"><strong>Pet:</strong> ${booking.pet_name} (${booking.pet_type})</div>
        <div class="detail-row"><strong>Date:</strong> ${booking.booking_date}</div>
        <div class="detail-row"><strong>Time:</strong> ${booking.time_slot}</div>
      </div>
      <p>If you have any questions or would like to book a new appointment, please contact us:</p>
      <p><strong>Phone:</strong> ${SHOP_CONFIG.phone}<br><strong>Email:</strong> ${SHOP_CONFIG.email}</p>
      <p>We hope to see you and ${booking.pet_name} soon!</p>
    </div>
    <div class="footer">
      <p>${SHOP_CONFIG.name}<br>${SHOP_CONFIG.address}</p>
    </div>
  </div>
</body>
</html>`
}

function generateCompletedEmailTemplate(booking) {
  return `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
    .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
    .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
    .thank-you { background: #dcfce7; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Thank You!</h1>
      <p>${SHOP_CONFIG.name}</p>
    </div>
    <div class="content">
      <p>Hi <strong>${booking.customer_name}</strong>,</p>
      <div class="thank-you">
        <h2>Thank you for visiting us!</h2>
        <p>We hope ${booking.pet_name} enjoyed the grooming session!</p>
      </div>
      <p>We loved having ${booking.pet_name} at our studio. Your pet looked fabulous after the <strong>${booking.service_name}</strong>!</p>
      <p>We would love to see you again soon. Book your next appointment anytime!</p>
      <p><strong>Contact:</strong> ${SHOP_CONFIG.phone}<br><strong>Email:</strong> ${SHOP_CONFIG.email}</p>
      <p>Thank you for choosing ${SHOP_CONFIG.name}!</p>
    </div>
    <div class="footer">
      <p>${SHOP_CONFIG.name}<br>${SHOP_CONFIG.address}</p>
    </div>
  </div>
</body>
</html>`
}
