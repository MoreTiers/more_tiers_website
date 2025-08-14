import Link from 'next/link'

export default function CTA() {
  return (
    <section className="section bg-brand-600 text-white">
      <div className="container flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h3 className="text-2xl font-semibold">US‑wide, remote-friendly coaching</h3>
          <p className="mt-1 text-white/90">Start with a no‑pressure consultation. We’ll map a plan to your student’s timeline.</p>
        </div>
        <Link href="/contact" className="btn bg-white text-brand-700 hover:opacity-90">Book a consult</Link>
      </div>
    </section>
  )
}
