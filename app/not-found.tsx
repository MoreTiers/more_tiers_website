import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container text-center">
        <h1 className="h1">Page not found</h1>
        <p className="lead mt-4">Let’s get you back on track.</p>
        <Link href="/" className="btn btn-primary mt-6">Go home</Link>
      </div>
    </section>
  )
}
