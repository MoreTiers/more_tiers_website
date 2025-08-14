'use client'
import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const json = await res.json()
      if (json.ok) {
        setStatus('success')
        setMessage('Thanks! We’ll reply within one business day.')
        form.reset()
      } else {
        setStatus('error')
        setMessage('Please check the form and try again.')
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again later.')
    }
  }
  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4" aria-live="polite">
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />
      <input className="w-full rounded-xl2 border border-slate-300 p-3" placeholder="Parent name" name="parentName" required />
      <input className="w-full rounded-xl2 border border-slate-300 p-3" placeholder="Email" type="email" name="email" required />
      <input className="w-full rounded-xl2 border border-slate-300 p-3" placeholder="Student name" name="studentName" required />
      <input className="w-full rounded-xl2 border border-slate-300 p-3" placeholder="Student year (e.g., 12th)" name="studentYear" required />
      <textarea className="w-full rounded-xl2 border border-slate-300 p-3" rows={5} placeholder="Deadlines, goals, and anything we should know" name="details" required />
      <button className="btn btn-primary" type="submit" disabled={status==='loading'}>
        {status==='loading' ? 'Sending…' : 'Submit'}
      </button>
      {status !== 'idle' && <div className={`text-sm ${status==='success' ? 'text-green-700' : 'text-red-700'}`}>{message}</div>}
      <p className="text-xs text-slate-500">We do not ghostwrite. We coach and critique to develop authentic student voice.</p>
    </form>
  )
}
