'use client'
import { useState } from 'react'

type Status = 'idle' | 'loading' | 'success' | 'error'
type FieldErrors = { [key: string]: string }

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})

  function validate(payload: Record<string, any>): FieldErrors {
    const errors: FieldErrors = {}
    if (!payload.parentName || payload.parentName.trim().length < 2) {
      errors.parentName = 'Parent name must be at least 2 characters.'
    }
    if (!payload.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
      errors.email = 'Please enter a valid email address.'
    }
    if (!payload.studentName || payload.studentName.trim().length < 1) {
      errors.studentName = 'Student name is required.'
    }
    if (!payload.studentYear || payload.studentYear.trim().length < 1) {
      errors.studentYear = 'Student year is required.'
    }
    if (!payload.details || payload.details.trim().length < 10) {
      errors.details = 'Details must be at least 10 characters.'
    }
    return errors
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setFieldErrors({})
    const form = e.currentTarget
    const formData = new FormData(form)
    const payload = Object.fromEntries(formData.entries())

    // Client-side validation
    const errors = validate(payload)
    if (Object.keys(errors).length > 0) {
      setStatus('error')
      setMessage('Please fix the errors below and try again.')
      setFieldErrors(errors)
      return
    }

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
        setFieldErrors(json.extra?.fieldErrors || {})
      }
    } catch {
      setStatus('error')
      setMessage('Network error. Please try again later.')
    }
  }

  return (
    <form onSubmit={onSubmit} className="mt-8 grid gap-4" aria-live="polite">
      <input type="text" name="hp" tabIndex={-1} autoComplete="off" className="hidden" />
      <input
        className="w-full rounded-xl2 border border-slate-300 p-3"
        placeholder="Parent name"
        name="parentName"
        required
      />
      {fieldErrors.parentName && <div className="text-red-700 text-sm">{fieldErrors.parentName}</div>}
      <input
        className="w-full rounded-xl2 border border-slate-300 p-3"
        placeholder="Email"
        type="email"
        name="email"
        required
      />
      {fieldErrors.email && <div className="text-red-700 text-sm">{fieldErrors.email}</div>}
      <input
        className="w-full rounded-xl2 border border-slate-300 p-3"
        placeholder="Student name"
        name="studentName"
        required
      />
      {fieldErrors.studentName && <div className="text-red-700 text-sm">{fieldErrors.studentName}</div>}
      <input
        className="w-full rounded-xl2 border border-slate-300 p-3"
        placeholder="Student year (e.g., 12th)"
        name="studentYear"
        required
      />
      {fieldErrors.studentYear && <div className="text-red-700 text-sm">{fieldErrors.studentYear}</div>}
      <textarea
        className="w-full rounded-xl2 border border-slate-300 p-3"
        rows={5}
        placeholder="Deadlines, goals, and anything we should know (min 10 characters)"
        name="details"
        required
      />
      {fieldErrors.details && <div className="text-red-700 text-sm">{fieldErrors.details}</div>}
      <button className="btn btn-primary" type="submit" disabled={status==='loading'}>
        {status==='loading' ? 'Sending…' : 'Submit'}
      </button>
      {status !== 'idle' && <div className={`text-sm ${status==='success' ? 'text-green-700' : 'text-red-700'}`}>{message}</div>}
      <p className="text-xs text-slate-500">We do not ghostwrite. We coach and critique to develop authentic student voice.</p>
    </form>
  )
}