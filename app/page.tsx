import Hero from '@/components/Hero'
import ProcessSteps from '@/components/ProcessSteps'
import CTA from '@/components/CTA'

export default function HomePage() {
  return (
    <>
      <Hero />
      <section className="section">
        <div className="container">
          <h2 className="h2">How we help</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {[
              ['Brainstorming', 'Unlock authentic stories and angles.'],
              ['Coaching', 'Structure, voice, and momentum across drafts.'],
              ['Editing', 'Line-by-line clarity and polish.'],
              ['Supplementals', 'Targeted responses that add dimension.'],
              ['Résumé', 'Concise, achievement‑focused formatting.'],
              ['Interview Prep', 'Confident, conversational delivery.'],
            ].map(([title, desc]) => (
              <div key={title} className="card">
                <div className="text-lg font-semibold">{title}</div>
                <div className="mt-2 text-slate-600">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <ProcessSteps />
      <section className="section">
        <div className="container">
          <h2 className="h2">Integrity</h2>
          <p className="mt-4 text-slate-700 max-w-3xl">
            We do <strong>not</strong> ghostwrite. Instead, we coach, critique, and develop each student’s authentic voice. 
            Expect frank feedback—and real growth.
          </p>
        </div>
      </section>
      <CTA />
    </>
  )
}
