export default function ServicesPage() {
  const services = [
    { title: 'Brainstorming', copy: 'Find the moments that matter and shape a compelling narrative arc.' },
    { title: 'Coaching', copy: 'Guided drafting with milestone check-ins and clear next steps.' },
    { title: 'Editing', copy: 'Clarity, concision, and tone—line-level improvements without losing voice.' },
    { title: 'Supplementals', copy: 'Distinct, school-aligned responses that complement the main essay.' },
    { title: 'Résumé', copy: 'Format achievements for quick, high-impact scanning.' },
    { title: 'Interview Prep', copy: 'Practice responses and polish delivery.' },
  ]
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Services</h1>
        <p className="lead mt-4 max-w-3xl">Pricing is <strong>contact for quote</strong>. Rush and revision options available.</p>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {services.map(s => (
            <div key={s.title} className="card">
              <div className="text-lg font-semibold">{s.title}</div>
              <div className="mt-2 text-slate-600">{s.copy}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
