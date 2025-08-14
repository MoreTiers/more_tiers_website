import { NextResponse } from 'next/server'

const urls = ['/', '/services', '/approach', '/results', '/about', '/contact', '/blog', '/policies']

export function GET() {
  const origin = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls.map(u => `<url><loc>${origin}${u}</loc><changefreq>weekly</changefreq></url>`).join('')}
</urlset>`
  return new NextResponse(xml, { headers: { 'Content-Type': 'application/xml' } })
}
