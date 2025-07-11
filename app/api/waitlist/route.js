import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend     = new Resend(process.env.NEXT_RESEND_API_KEY);
const FROM       = 'Locaddo <waitlist@locaddo.com>';
const NOTIFY_TO  = 'founders@locaddo.com';
const SUBJECT    = 'You’re on the Locaddo waitlist 🎉';

export async function POST(request) {
  try {
    const { email, name = '' } = await request.json();
    if (!email || !email.includes('@')) {
      return NextResponse.json({ message: 'Invalid email address' }, { status: 400 });
    }

    const text = `
Hi ${name || 'there'},

Thanks for joining the Locaddo waitlist! We'll email you first when early access opens.

Just reply to this message if you have any questions.

— The Locaddo team
`.trim();

    const html = `
<p style="font-family:system-ui;font-size:16px;line-height:1.5">
  Hi ${name || 'there'},<br><br>
  Thanks for joining the <strong>Locaddo</strong> waitlist! We’ll email you first when early access opens.<br><br>
  Just reply to this message if you have any questions.<br><br>
  — Hicham &amp; the Locaddo team
</p>
`.trim();

    const [welcomeRes, notifyRes] = await Promise.all([
      resend.emails.send({
        from: FROM,
        to:   email,
        subject: SUBJECT,
        text,
        html,
        reply_to: FROM
      }),
      resend.emails.send({
        from: FROM,
        to:   NOTIFY_TO,
        subject: 'New waitlist signup',
        text:    `Signup: ${email} (${name || 'N/A'})`,
        html:    `<p>Signup:<br>Email: ${email}<br>Name: ${name || 'N/A'}</p>`
      })
    ]);

    console.log('Resend IDs', { welcomeId: welcomeRes.id, notifyId: notifyRes.id });
    return NextResponse.json({ message: 'Added to waitlist!' });
  } catch (err) {
    console.error('Waitlist error:', err);
    return NextResponse.json({ message: 'Server error' }, { status: 500 });
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