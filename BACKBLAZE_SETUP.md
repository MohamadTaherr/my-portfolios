# Backblaze B2 Storage Setup

This project uses Backblaze B2 for persistent file storage to prevent file loss during deployments on Render.

## Bucket Configuration

- **Bucket Name**: `myportfolioedmond`
- **Bucket ID**: `b2469a1e1eeea86199ae0813`
- **Endpoint**: `s3.eu-central-003.backblazeb2.com`
- **Region**: EU Central (Frankfurt)
- **Type**: Private

## Required Environment Variables

Add these to your `.env` file (local development) and Render dashboard (production):

```env
# Backblaze B2 Configuration
BACKBLAZE_KEY_ID=your_key_id_here
BACKBLAZE_APPLICATION_KEY=your_application_key_here
BACKBLAZE_BUCKET_ID=b2469a1e1eeea86199ae0813
BACKBLAZE_BUCKET_NAME=myportfolioedmond
```

## Getting Your Backblaze Credentials

1. Log in to your [Backblaze account](https://secure.backblaze.com/user_signin.htm)
2. Go to **App Keys** in the left sidebar
3. Click **Add a New Application Key**
4. Select your bucket (`myportfolioedmond`)
5. Give it a name (e.g., "Portfolio Backend")
6. Select **Read and Write** capabilities
7. Copy the **keyID** and **applicationKey**

## Setting Up in Render

1. Go to your Render dashboard
2. Select your `portfolio-backend` service
3. Go to **Environment** tab
4. Add the following environment variables:
   - `BACKBLAZE_KEY_ID` - Your Backblaze Key ID
   - `BACKBLAZE_APPLICATION_KEY` - Your Backblaze Application Key
   - `BACKBLAZE_BUCKET_ID` - Already set in render.yaml
   - `BACKBLAZE_BUCKET_NAME` - Already set in render.yaml

## Making the Bucket Public (Optional)

If you want files to be publicly accessible without signed URLs:

1. Go to your Backblaze B2 dashboard
2. Select the bucket `myportfolioedmond`
3. Click **Bucket Settings**
4. Under **File Upload Security**, select **Public**
5. Save changes

**Note**: If the bucket remains private, you'll need to implement signed URL generation for file access, or make the bucket public for simpler access.

## Local Development

For local development, create a `.env` file in the `apps/backend` directory:

```env
BACKBLAZE_KEY_ID=your_key_id_here
BACKBLAZE_APPLICATION_KEY=your_application_key_here
BACKBLAZE_BUCKET_ID=b2469a1e1eeea86199ae0813
BACKBLAZE_BUCKET_NAME=myportfolioedmond
```

If Backblaze is not configured, the system will fall back to local file storage in the `uploads` directory.

## How It Works

- When Backblaze credentials are configured, all file uploads go to Backblaze B2
- Files are stored in the `portfolio-uploads/` folder within your bucket
- If Backblaze upload fails, the system automatically falls back to local storage
- File URLs point directly to Backblaze B2 storage

