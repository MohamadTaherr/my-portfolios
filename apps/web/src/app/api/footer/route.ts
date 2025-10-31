import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = `*[_type == "footerSettings"][0]{
      footerNavigation[]{ label, href, order } | order(order asc),
      copyrightText,
      tagline,
      showSocialLinks
    }`;

    const data = await client.fetch(query, {}, {
      next: { revalidate: 60 }
    });

    return NextResponse.json(data || {});
  } catch (error) {
    console.error('Error fetching footer settings:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
