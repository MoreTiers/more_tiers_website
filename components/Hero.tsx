import Link from 'next/link'
import Image from 'next/image';

export default function Hero() {
  return (
    <section className="relative h-[70vh] min-h-[500px] overflow-hidden" aria-labelledby="hero-heading">
      {/* Background image */}
      <Image
        src="/images/hero-writing.jpg"
        alt="Close-up of a person writing an essay"
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay gradient for contrast */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-600/70 to-black/70" aria-hidden="true"></div>

      {/* Content container */}
      <div className="relative z-10 flex h-full items-center">
        <div className="container max-w-3xl text-white">
          <h1 id="hero-heading" className="text-4xl md:text-5xl font-bold tracking-tight">
            College essay coaching that challenges—so students rise.
          </h1>
          <p className="mt-4 text-lg text-slate-100 max-w-prose">
            At <strong>More Tiers</strong>, we we help students rise through the tiers — yes, sometimes with a few more tears.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/contact" className="btn btn-primary bg-accent text-slate-900 hover:opacity-90">
              Book a consult
            </Link>
            <Link href="/approach" className="btn btn-primary bg-accent text-slate-900 hover:opacity-90">
              See our approach
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
