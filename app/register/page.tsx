"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { User, Phone, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  
  // משתנים לשמירת מה שהמשתמש מקליד
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  
  // משתנים לשמירת מצב השגיאות וההצלחה
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  // הפונקציה שמופעלת כשהמשתמש לוחץ על "הרשמה"
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // עוצר את רענון הדף האוטומטי
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      // שליחת הנתונים ל-API שיצרנו
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, phone, password })
      })

      const data = await res.json()

      // אם השרת החזיר שגיאה (למשל טלפון כבר קיים)
      if (!res.ok) {
        setError(data.message || 'אירעה שגיאה בהרשמה')
        setLoading(false)
        return
      }

      // אם הכל תקין
      setSuccess('החשבון נוצר בהצלחה! מעביר להתחברות...')
      
      // מעבר לעמוד ההתחברות אחרי 2 שניות
      setTimeout(() => {
        router.push('/login')
      }, 2000)

    } catch (err) {
      setError('שגיאת תקשורת. אנא ודא שהשרת פועל.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">יצירת חשבון</h1>
          <p className="text-neutral-400">הרשם כדי להזמין ולנהל תורים בקלות</p>
        </div>

        {/* הצגת הודעת שגיאה אם יש */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-900/50 rounded-lg flex items-start gap-3 text-red-400">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* הצגת הודעת הצלחה אם יש */}
        {success && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-900/50 rounded-lg flex items-start gap-3 text-green-400">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
            <p className="text-sm">{success}</p>
          </div>
        )}

        {/* הטופס עכשיו מפעיל את פונקציית handleSubmit בעת שליחה */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">שם מלא</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500">
                <User size={18} />
              </div>
              <input
                type="text"
                required
                placeholder="הכנס שם מלא"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-neutral-600 block pr-10 p-3 outline-none transition-all"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">מספר טלפון</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500">
                <Phone size={18} />
              </div>
              <input
                type="tel"
                required
                dir="ltr"
                placeholder="05X-XXXXXXX"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-neutral-600 block pr-10 p-3 outline-none transition-all text-right"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-300 mb-2">סיסמה</label>
            <div className="relative">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-neutral-500">
                <Lock size={18} />
              </div>
              <input
                type="password"
                required
                minLength={6}
                placeholder="בחר סיסמה (לפחות 6 תווים)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-neutral-600 block pr-10 p-3 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold rounded-lg px-4 py-3 hover:bg-neutral-200 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'מבצע הרשמה...' : 'הרשמה'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-neutral-400 border-t border-neutral-800/50 pt-6">
          כבר יש לך חשבון?{' '}
          <Link href="/login" className="text-white hover:underline font-medium transition-all">
            התחבר כאן
          </Link>
        </div>
      </div>
    </div>
  )
}