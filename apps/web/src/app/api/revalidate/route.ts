import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Verify the request is from Sanity (optional but recommended)
    const token = request.headers.get('authorization');
    if (token !== `Bearer ${process.env.SANITY_REVALIDATE_SECRET}`) {
      return NextResponse.json(
        { message: 'Invalid token' },
        { status: 401 }
      );
    }

    // Get the document type from the webhook payload
    const { _type } = body;

    // Revalidate relevant paths based on content type
    if (_type === 'siteSettings') {
      revalidatePath('/');
    } else if (_type === 'videoProject') {
      revalidatePath('/');
      // Revalidate individual project pages
      if (body._id) {
        revalidatePath(`/projects/${body._id}`);
      }
    } else if (_type === 'script') {
      revalidatePath('/');
    } else if (_type === 'client') {
      revalidatePath('/');
    } else {
      // Revalidate everything if we don't know the type
      revalidatePath('/');
    }

    return NextResponse.json({
      revalidated: true,
      now: Date.now(),
      type: _type,
    });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { message: 'Error revalidating' },
      { status: 500 }
    );
  }
}
