import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

// CORS headers for Sanity Studio
const corsHeaders = {
  'Access-Control-Allow-Origin': 'https://edmond-portfolio.sanity.studio',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
};

// Handle preflight requests
export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(request: NextRequest) {
  console.log('🔔 Revalidation endpoint called');

  try {
    const body = await request.json();
    console.log('📦 Request body:', JSON.stringify(body, null, 2));

    // Verify the request is from Sanity
    const token = request.headers.get('authorization');
    const expectedToken = `Bearer ${process.env.SANITY_REVALIDATE_SECRET}`;

    console.log('🔐 Token check:', {
      hasToken: !!token,
      hasExpectedToken: !!expectedToken,
      match: token === expectedToken
    });

    if (token !== expectedToken) {
      console.error('❌ Invalid revalidation token');
      return NextResponse.json(
        {
          message: 'Invalid token',
          received: token ? 'Token provided' : 'No token',
          expected: expectedToken ? 'Token configured' : 'No token configured'
        },
        { status: 401, headers: corsHeaders }
      );
    }

    const { _type, slug } = body;
    console.log(`✅ Valid request for type: ${_type}`);

    // Simple approach: revalidate the homepage for ALL content changes
    // This ensures your site always updates
    revalidatePath('/', 'layout');
    console.log('🔄 Revalidated: / (layout)');

    // Also revalidate specific pages if they exist
    const pathsRevalidated = ['/'];

    if (slug?.current) {
      // For portfolio work and posts with slugs
      if (_type === 'portfolioWork') {
        revalidatePath(`/work/${slug.current}`);
        pathsRevalidated.push(`/work/${slug.current}`);
      } else if (_type === 'post') {
        revalidatePath('/blog');
        revalidatePath(`/blog/${slug.current}`);
        pathsRevalidated.push('/blog', `/blog/${slug.current}`);
      }
    }

    console.log('✅ Revalidation complete. Paths:', pathsRevalidated);

    return NextResponse.json({
      success: true,
      revalidated: true,
      now: Date.now(),
      type: _type,
      paths: pathsRevalidated,
      message: 'Cache cleared successfully'
    }, { headers: corsHeaders });
  } catch (error) {
    console.error('❌ Error revalidating:', error);
    return NextResponse.json(
      {
        success: false,
        message: 'Error revalidating',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500, headers: corsHeaders }
    );
  }
}
