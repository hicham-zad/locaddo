// app/api/waitlist/route.js
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.NEXT_RESEND_API_KEY);

export async function POST(request) {
  console.log('API Route Hit - App Router POST');
  
  try {
    const { email, name } = await request.json();
    
    console.log('Request data:', { email, name });

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        { message: 'Please provide a valid email address' },
        { status: 400 }
      );
    }

    // Send welcome email to the subscriber
    const welcomeEmail = await resend.emails.send({
      from: 'Locaddo <team@locaddo.com>', // Replace with your verified domain
      to: email,
      subject: 'Welcome to the Locaddo Waitlist! 🚀',
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <title>Welcome to Locaddo</title>
          <style>
            body {
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
            }
            .header {
              text-align: center;
              padding: 40px 0;
              border-bottom: 1px solid #eee;
            }
            .logo {
              width: 50px;
              height: 50px;
              background: #000;
              border-radius: 12px;
              display: inline-flex;
              align-items: center;
              justify-content: center;
              margin-bottom: 20px;
            }
            .content {
              padding: 40px 0;
            }
            .footer {
              text-align: center;
              padding: 20px 0;
              border-top: 1px solid #eee;
              color: #666;
              font-size: 14px;
            }
          </style>
        </head>
        <body>
          <div class="header">
            <div class="logo">
              <svg width="30" height="30" fill="white" viewBox="0 0 20 20">
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"/>
              </svg>
            </div>
            <h1 style="margin: 0; font-size: 28px; font-weight: bold;">Welcome to Locaddo!</h1>
          </div>
          
          <div class="content">
            <h2>You're on the list! 🎉</h2>
            
            <p>Thanks for joining our exclusive waitlist. You're now among the first to know when we launch the world's first AI platform that transforms local news into SEO-optimized content.</p>
            
            <h3>What happens next?</h3>
            <ul>
              <li><strong>Early Access:</strong> You'll get priority access when we launch</li>
              <li><strong>Special Pricing:</strong> Exclusive launch discounts for waitlist members</li>
              <li><strong>Behind the Scenes:</strong> Updates on our development progress</li>
              <li><strong>Your Input Matters:</strong> We'll ask for your feedback to build exactly what you need</li>
            </ul>
            
            <p>We're building something revolutionary for law firms, medical practices, and real estate professionals who want to dominate local search without spending hours on content creation.</p>
            
            <p>Questions? Just reply to this email - we read every message!</p>
            
            <p>Best regards,<br>
            <strong>The Locaddo Team</strong></p>
          </div>
          
          <div class="footer">
            <p>You're receiving this because you joined our waitlist at locaddo.com</p>
            <p>Locaddo - The Future of Local Content Marketing</p>
          </div>
        </body>
        </html>
      `,
    });

    // Send notification to your team
    const notificationEmail = await resend.emails.send({
      from: 'Waitlist <noreply@yourdomain.com>', // Replace with your verified domain
      to: 'your-email@gmail.com', // Replace with your actual email
      subject: '🎯 New Waitlist Signup!',
      html: `
        <h2>New Waitlist Signup</h2>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Name:</strong> ${name || 'Not provided'}</p>
        <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>User Agent:</strong> ${request.headers.get('user-agent')}</p>
      `,
    });

    console.log('Emails sent successfully:', { 
      welcomeId: welcomeEmail.id, 
      notificationId: notificationEmail.id 
    });

    return NextResponse.json({ 
      message: 'Successfully joined the waitlist!',
      success: true 
    });

  } catch (error) {
    console.error('Error in waitlist API:', error);
    
    return NextResponse.json(
      { 
        message: 'Something went wrong. Please try again.',
        success: false,
        error: process.env.NODE_ENV === 'development' ? error.message : undefined
      },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  console.log('API Route Hit - App Router GET');
  
  return NextResponse.json({
    message: 'Waitlist API is running',
    timestamp: new Date().toISOString(),
    methods: ['POST']
  });
}

export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
}