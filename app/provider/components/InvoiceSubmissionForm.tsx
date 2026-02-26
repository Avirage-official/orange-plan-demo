'use client'

import { useState } from 'react'
import { Plus, Upload, Check } from 'lucide-react'
import { providerParticipants } from '@/lib/mockData/providerParticipants'

const serviceTypes = [
  'Physiotherapy Session',
  'Initial Assessment',
  'Extended Session',
  'Home Visit',
] as const

const durations = ['30 min', '45 min', '60 min'] as const

function calculateAmount(serviceType: string, duration: string): number {
  const isHomeVisit = serviceType === 'Home Visit'
  const base = isHomeVisit ? 'Physiotherapy Session' : serviceType
  let amount = 0

  switch (base) {
    case 'Physiotherapy Session':
      if (duration === '45 min') amount = 175
      else if (duration === '60 min') amount = 220
      else amount = 0
      break
    case 'Initial Assessment':
      amount = 280
      break
    case 'Extended Session':
      amount = 240
      break
    default:
      amount = 0
  }

  if (isHomeVisit) amount += 25
  return amount
}

export default function InvoiceSubmissionForm() {
  const [activeSection, setActiveSection] = useState<'form' | 'bulk' | null>(null)
  const [formSuccess, setFormSuccess] = useState('')
  const [bulkSuccess, setBulkSuccess] = useState('')

  const [participant, setParticipant] = useState('')
  const [serviceDate, setServiceDate] = useState('')
  const [serviceType, setServiceType] = useState('')
  const [duration, setDuration] = useState('')
  const [notes, setNotes] = useState('')

  const amount = calculateAmount(serviceType, duration)

  function resetForm() {
    setParticipant('')
    setServiceDate('')
    setServiceType('')
    setDuration('')
    setNotes('')
    setFormSuccess('')
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const paymentDate = new Date()
    paymentDate.setDate(paymentDate.getDate() + Math.floor(Math.random() * 2) + 1)
    const formatted = paymentDate.toLocaleDateString('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
    setFormSuccess(`✓ Invoice submitted! Expected payment: ${formatted}`)
  }

  function handleBulkUpload() {
    setBulkSuccess('35 invoices submitted successfully')
  }

  const inputClass =
    'w-full rounded-md border border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 px-3 py-2 text-sm'
  const labelClass = 'block text-sm font-medium text-gray-700 mb-1'

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Submit Invoice</h2>

      <div className="flex gap-3 mb-4">
        <button
          onClick={() => {
            setActiveSection(activeSection === 'form' ? null : 'form')
            setBulkSuccess('')
          }}
          className="inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          Submit New Invoice
        </button>
        <button
          onClick={() => {
            setActiveSection(activeSection === 'bulk' ? null : 'bulk')
            setFormSuccess('')
          }}
          className="inline-flex items-center gap-2 rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Upload className="h-4 w-4" />
          Upload Multiple Invoices
        </button>
      </div>

      {activeSection === 'form' && (
        <div className="rounded-lg bg-white p-6 shadow">
          {formSuccess ? (
            <div className="flex items-center gap-2 rounded-md bg-green-50 border border-green-200 p-4 text-green-800 text-sm">
              <Check className="h-5 w-5 text-green-600" />
              {formSuccess}
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className={labelClass}>Participant name</label>
                <select
                  value={participant}
                  onChange={(e) => setParticipant(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Select participant</option>
                  {providerParticipants.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Service date</label>
                <input
                  type="date"
                  value={serviceDate}
                  onChange={(e) => setServiceDate(e.target.value)}
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <label className={labelClass}>Service type</label>
                <select
                  value={serviceType}
                  onChange={(e) => setServiceType(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Select service type</option>
                  {serviceTypes.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Duration</label>
                <select
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  className={inputClass}
                  required
                >
                  <option value="">Select duration</option>
                  {durations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Amount</label>
                <input
                  type="text"
                  readOnly
                  value={amount ? `$${amount}` : ''}
                  placeholder="Auto-calculated"
                  className={`${inputClass} bg-gray-50`}
                />
              </div>

              <div>
                <label className={labelClass}>Additional notes</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  className={inputClass}
                />
              </div>

              <div className="flex items-center gap-4 pt-2">
                <button
                  type="submit"
                  className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                  Submit Invoice
                </button>
                <button
                  type="button"
                  onClick={() => {
                    resetForm()
                    setActiveSection(null)
                  }}
                  className="text-sm text-gray-500 hover:text-gray-700"
                >
                  Cancel
                </button>
              </div>
            </form>
          )}
        </div>
      )}

      {activeSection === 'bulk' && (
        <div className="rounded-lg bg-white p-6 shadow">
          {bulkSuccess ? (
            <div className="flex items-center gap-2 rounded-md bg-green-50 border border-green-200 p-4 text-green-800 text-sm">
              <Check className="h-5 w-5 text-green-600" />
              {bulkSuccess}
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className={labelClass}>CSV file</label>
                <input type="file" accept=".csv" className={inputClass} />
              </div>
              <p className="text-sm text-gray-500">
                Upload a CSV file with columns: Participant Name, Service Date, Service Type,
                Duration, Notes
              </p>
              <button
                onClick={handleBulkUpload}
                className="rounded-md bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
              >
                Confirm &amp; Upload
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
