import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = `*[_type == "navigationSettings"][0]{
      mainNavigation[]{ label, href, order } | order(order asc),
      logoText
    }`;

    const data = await client.fetch(query, {}, {
      next: { revalidate: 60 }
    });

    return NextResponse.json(data || { mainNavigation: [] });
  } catch (error) {
    console.error('Error fetching navigation settings:', error);
    return NextResponse.json({ mainNavigation: [] }, { status: 500 });
  }
}
