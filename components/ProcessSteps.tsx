const steps = [
  { title: 'Inquiry', desc: 'Tell us your goals, deadlines, and challenges.' },
  { title: 'Diagnostic Call', desc: 'We assess needs and recommend a plan.' },
  { title: 'Coaching Plan', desc: 'A tailored roadmap for essays and supplements.' },
  { title: 'Iterations & Results', desc: 'Honest feedback each round—growth you can see.' },
]

export default function ProcessSteps() {
  return (
    <section className="section">
      <div className="container">
        <h2 className="h2">Our Process</h2>
        <div className="mt-8 grid gap-6 md:grid-cols-4">
          {steps.map((s) => (
            <div key={s.title} className="card">
              <div className="text-brand-700 font-semibold">{s.title}</div>
              <div className="mt-2 text-slate-600">{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
