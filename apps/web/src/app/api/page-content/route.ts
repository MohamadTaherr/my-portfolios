import { client } from '@/sanity/lib/client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const query = \`*[_type == "pageContent"][0]{
      contactTitle,
      contactSubtitle,
      contactDescription
    }\`;

    const data = await client.fetch(query, {}, {
      next: { revalidate: 60 }
    });

    return NextResponse.json(data || {});
  } catch (error) {
    console.error('Error fetching page content:', error);
    return NextResponse.json({}, { status: 500 });
  }
}
