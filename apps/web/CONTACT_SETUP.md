# Contact Form Setup Guide

The contact form is now fully functional and will send emails using Resend. Follow these steps to get it working:

## Step 1: Sign Up for Resend (Free)

1. Go to [https://resend.com](https://resend.com)
2. Click "Sign Up" and create a free account
3. Free tier includes **100 emails/day** and **3,000 emails/month** - more than enough for a portfolio

## Step 2: Get Your API Key

1. Once logged in, go to **API Keys** section
2. Click **Create API Key**
3. Give it a name (e.g., "Portfolio Contact Form")
4. Copy the API key (it starts with `re_`)
5. **Important:** Save this key somewhere safe - you won't be able to see it again!

## Step 3: Update Your .env.local File

1. Open your `.env.local` file (create it if it doesn't exist by copying `.env.local.example`)
2. Add these two lines:

```bash
RESEND_API_KEY=re_your_actual_api_key_here
CONTACT_EMAIL=youremail@example.com
```

Replace:
- `re_your_actual_api_key_here` with the API key from Step 2
- `youremail@example.com` with your actual email where you want to receive messages

## Step 4: Restart Your Dev Server

```bash
npm run dev
```

## Step 5: Test the Contact Form

1. Go to your website's contact section
2. Fill out the form with test data
3. Click "Send Message"
4. Check your email - you should receive the message!

---

## Troubleshooting

### Email not arriving?

1. **Check spam folder** - first emails might go to spam
2. **Verify API key** - make sure it's correctly copied in `.env.local`
3. **Check console** - look for errors in browser console or terminal
4. **Restart server** - environment variables require server restart

### Using a custom domain?

For production, you should verify your own domain in Resend:

1. Go to Resend Dashboard → **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `yourdomain.com`)
4. Add the DNS records shown
5. Once verified, update the `from` field in `src/app/api/contact/route.ts`:

```typescript
from: 'Portfolio <contact@yourdomain.com>',
```

---

## How It Works

1. User fills out contact form
2. Form data is sent to `/api/contact` endpoint
3. API route validates the data
4. Email is sent via Resend to your `CONTACT_EMAIL`
5. User sees success/error message

---

## Security Notes

- Never commit `.env.local` to git (it's already in `.gitignore`)
- API key is kept secret on the server
- Form validation prevents spam/malicious input
- Visitor's email is set as `replyTo` for easy responses

---

## Need Help?

- [Resend Documentation](https://resend.com/docs)
- [Resend API Reference](https://resend.com/docs/api-reference/emails/send-email)
