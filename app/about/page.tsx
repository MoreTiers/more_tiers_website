export default function AboutPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">About More Tiers</h1>
        <p className="lead mt-4 max-w-3xl">
          The name says it all: we help students climb tiers—and our frank feedback may spark a few more tears along the way. It’s how real growth happens.
        </p>
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="card">
            <div className="font-semibold">Team Bios</div>
            <p className="mt-2 text-slate-600">Add headshots, credentials, specialties, and a human detail.</p>
          </div>
          <div className="card">
            <div className="font-semibold">Our Story</div>
            <p className="mt-2 text-slate-600">Why we started, why the name, and what we value.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
