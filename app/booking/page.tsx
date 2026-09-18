"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Calendar, Clock, Scissors, CheckCircle2, AlertCircle } from 'lucide-react'

export default function BookingPage() {
  const router = useRouter()
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  
  // משתנים חדשים לניהול מצב השליחה והודעות
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      if (token) {
        setIsLoggedIn(true)
      }
      setIsLoading(false)
    }
    
    checkAuth()
  }, [])

  const services = [
    { id: '1', name: 'תספורת + זקן', price: '70 ₪', duration: '45 דק\'' },
    { id: '2', name: 'תספורת ראש', price: '60 ₪', duration: '30 דק\'' },
    { id: '3', name: 'שעווה', price: '10 ₪', duration: '15 דק\'' },
  ]

  const availableTimes = ['12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '16:00', '16:30', '17:00']

  // הפונקציה ששולחת את הנתונים לשרת
  const handleBooking = async () => {
    setIsSubmitting(true)
    setError('')
    setSuccess('')

    try {
      const token = localStorage.getItem('token')
      
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` // צירוף הטוקן לאישור זהות הלקוח
        },
        body: JSON.stringify({
          serviceId: selectedService,
          date: selectedDate,
          time: selectedTime
        })
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'אירעה שגיאה בקביעת התור')
        setIsSubmitting(false)
        return
      }

      setSuccess('התור נקבע בהצלחה! ניפגש במספרה.')
      
      // חזרה לדף הבית אחרי 2.5 שניות
      setTimeout(() => {
        router.push('/')
      }, 2500)

    } catch (err) {
      setError('שגיאת תקשורת. אנא נסה שוב.')
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-neutral-400 text-lg">טוען נתונים...</p>
      </div>
    )
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">רגע, חייבים להתחבר!</h2>
        <p className="text-xl text-neutral-400 mb-8 max-w-md">
          כדי לקבוע ולנהל את התורים שלך, עליך להיות מחובר למערכת.
        </p>
        <button 
          onClick={() => router.push('/login')}
          className="bg-white text-black font-bold rounded-lg px-8 py-4 hover:bg-neutral-200 transition-colors"
        >
          למעבר להתחברות והרשמה
        </button>
      </div>
    )
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 min-h-[80vh]">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">קביעת תור חדש</h1>
        <p className="text-neutral-400">בחר את השירות, התאריך והשעה הנוחים לך</p>
      </div>

      {/* הודעת שגיאה */}
      {error && (
        <div className="mb-6 p-4 bg-red-900/30 border border-red-900/50 rounded-lg flex items-start gap-3 text-red-400">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <p className="text-sm">{error}</p>
        </div>
      )}

      {/* הודעת הצלחה */}
      {success && (
        <div className="mb-6 p-4 bg-green-900/30 border border-green-900/50 rounded-lg flex items-start gap-3 text-green-400">
          <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
          <p className="text-sm">{success}</p>
        </div>
      )}

      <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-6 md:p-8 shadow-2xl">
        
        <div className="mb-10">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Scissors size={20} className="text-neutral-400" />
            1. בחר שירות
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {services.map(service => (
              <div 
                key={service.id}
                onClick={() => setSelectedService(service.id)}
                className={`cursor-pointer rounded-xl p-4 border transition-all ${
                  selectedService === service.id 
                    ? 'border-white bg-neutral-800' 
                    : 'border-neutral-800 hover:border-neutral-600 bg-neutral-950/50'
                }`}
              >
                <div className="font-bold text-white mb-1">{service.name}</div>
                <div className="text-sm text-neutral-400">{service.price} • {service.duration}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-10">
          <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
            <Calendar size={20} className="text-neutral-400" />
            2. בחר תאריך
          </h3>
          <input 
            type="date" 
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]} 
            className="w-full md:w-1/2 bg-neutral-950 border border-neutral-800 text-white rounded-lg p-3 outline-none focus:ring-2 focus:ring-neutral-600 transition-all text-right cursor-pointer"
          />
        </div>

        {selectedDate && (
          <div className="mb-10 animate-in fade-in slide-in-from-top-4 duration-500">
            <h3 className="text-lg font-medium text-white mb-4 flex items-center gap-2">
              <Clock size={20} className="text-neutral-400" />
              3. בחר שעה
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
              {availableTimes.map(time => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 rounded-lg text-sm font-bold transition-all border ${
                    selectedTime === time
                      ? 'bg-white text-black border-white'
                      : 'bg-neutral-950 border-neutral-800 text-neutral-300 hover:border-neutral-500 hover:bg-neutral-900'
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="border-t border-neutral-800 pt-8 mt-4">
          <button
            onClick={handleBooking} // חיבור הפונקציה לכפתור
            disabled={!selectedService || !selectedDate || !selectedTime || isSubmitting}
            className="w-full bg-green-600 text-white font-bold rounded-lg px-4 py-4 hover:bg-green-700 transition-colors disabled:opacity-30 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
          >
            {isSubmitting ? (
              'שומר נתונים...'
            ) : (
              <>
                <CheckCircle2 size={24} />
                אישור והזמנת תור
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  )
}