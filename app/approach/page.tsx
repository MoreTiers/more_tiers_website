"use client";
import SatGoalDial from '@/components/satgoaldial';

export default function ApproachPage() {
  return (
    <section className="section">
      <div className="container">
        <h1 className="h1">Our Approach</h1>
        <p className="lead mt-4 max-w-3xl">
          Growth through honest critique. We balance compassion with direct, actionable guidance so students improve every round.
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-2 items-center">
          <div className="card">
            <div className="font-semibold text-slate-900">Set your goal</div>
            <p className="mt-2 mb-2 text-slate-600">
              Choose a target SAT score. We’ll outline a practical plan from where you are today to where you want to be.
            </p>
            <SatGoalDial
              value={1300}
              onChange={(v) => {
                // TODO: Hook into your lead form, analytics, or dynamic plan preview
                // e.g., window.plausible?.('SAT Goal Changed', { props: { value: v } })
                console.log('SAT goal:', v);
              }}
            />
          </div>

          <div className="card">
            <div className="font-semibold text-slate-900">What happens next</div>
            <ul className="mt-2 list-disc pl-5 text-slate-600 space-y-2">
              <li>Diagnostic review and timeline mapping</li>
              <li>Weekly coaching cadence with honest feedback</li>
              <li>Milestone check-ins and targeted practice</li>
              <li>Final polish and confidence prep</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
