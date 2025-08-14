import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <section className="section">
      <div className="container max-w-2xl">
        <h1 className="h1">Book a Consult</h1>
        <p className="lead mt-4">Fill out the form below and we’ll get back within 1 business day.</p>
        <ContactForm />
        <div className="mt-6 text-sm text-slate-600">Prefer to schedule directly? Embed Calendly here.</div>
      </div>
    </section>
  )
}
