import Link from 'next/link'

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-200">
      <div className="container py-10 text-sm text-slate-600">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">
          <div>
            <div className="font-semibold text-slate-900">More Tiers</div>
            <div className="mt-1">College essay coaching — US‑wide, remote-friendly.</div>
          </div>
          <nav className="flex gap-6">
            <Link href="/policies">Policies</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </div>
        <div className="mt-6 text-xs text-slate-500">© {new Date().getFullYear()} More Tiers. All rights reserved.</div>
      </div>
    </footer>
  )
}
