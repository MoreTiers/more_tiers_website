'use client'
import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { useSession } from '@/lib/auth/auth-client'
import SignOutButton from './auth/sign-out-button'


export function Header() {
  const [open, setOpen] = useState(false)
  const { data, isPending } = useSession()  

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/moretiers.png" alt="More Tiers" width={32} height={32} />
          <span className="font-semibold text-lg">More Tiers</span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="/services" className="text-sm text-slate-700 hover:text-slate-900">Services</Link>
          <Link href="/approach" className="text-sm text-slate-700 hover:text-slate-900">Approach</Link>
          <Link href="/results" className="text-sm text-slate-700 hover:text-slate-900">Results</Link>
          <Link href="/about" className="text-sm text-slate-700 hover:text-slate-900">About</Link>
          <Link href="/blog" className="text-sm text-slate-700 hover:text-slate-900">Blog</Link>
          <Link href="/contact" className="btn btn-primary text-sm">Book a consult</Link>
          {!isPending && (
            data?.user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-slate-700">
                  {data.user.name || data.user.email}
                </span>
                <SignOutButton />
              </div>
            ) : (
              <Link href="/login" className="text-sm text-slate-700 hover:text-slate-900">Sign In</Link>
            )
          )}
        </nav>
        <button className="md:hidden" onClick={() => setOpen(!open)} aria-label="Toggle menu">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <div className="container flex flex-col gap-4 py-4">
            <Link href="/services">Services</Link>  
            <Link href="/approach">Approach</Link>
            <Link href="/results">Results</Link>
            <Link href="/about">About</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/contact" className="btn btn-primary w-full">Book a consult</Link>
            {data?.user ? (
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-700">
                  {data.user.name || data.user.email}
                </span>
                <SignOutButton />
              </div>
            ) : (
              <Link href="/login">Sign In</Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
