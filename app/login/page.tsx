"use client"

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Phone, Lock, AlertCircle, CheckCircle2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  
  // משתנים לשמירת הנתונים
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  
  // משתנים למצב שגיאה, הצלחה וטעינה
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess('')
    setLoading(true)

    try {
      // שליחת הנתונים ל-API של ההתחברות
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phone, password })
      })

      const data = await res.json()

      // אם יש שגיאה (סיסמה שגויה או משתמש לא קיים)
      if (!res.ok) {
        setError(data.message || 'אירעה שגיאה בהתחברות')
        setLoading(false)
        return
      }

      // אם הכל תקין, נשמור את הטוקן (הצמיד הדיגיטלי) בזיכרון המקומי של הדפדפן
      localStorage.setItem('token', data.token)
      // נשמור גם את פרטי המשתמש כדי שנוכל להציג את השם שלו בהמשך
      localStorage.setItem('user', JSON.stringify(data.user))

      setSuccess('התחברת בהצלחה! מעביר לעמוד הראשי...')
      
      // נעביר את המשתמש לעמוד הראשי אחרי שניה
      setTimeout(() => {
        router.push('/')
      }, 1000)

    } catch (err) {
      setError('שגיאת תקשורת. אנא נסה שוב מאוחר יותר.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-neutral-900/50 border border-neutral-800 rounded-2xl p-8 shadow-2xl backdrop-blur-sm">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">התחברות</h1>
          <p className="text-neutral-400">הזן את פרטיך כדי לנהל את התורים שלך</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-900/30 border border-red-900/50 rounded-lg flex items-start gap-3 text-red-400">
            <AlertCircle size={20} className="mt-0.5 shrink-0" />
            <p className="text-sm">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-6 p-4 bg-green-900/30 border border-green-900/50 rounded-lg flex items-start gap-3 text-green-400">
            <CheckCircle2 size={20} className="mt-0.5 shrink-0" />
            <p className="text-sm">{success}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          
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
                placeholder="הכנס סיסמה"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 text-white rounded-lg focus:ring-2 focus:ring-neutral-600 focus:border-neutral-600 block pr-10 p-3 outline-none transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-black font-bold rounded-lg px-4 py-3 hover:bg-neutral-200 transition-colors mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'מתחבר...' : 'התחבר לחשבון'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-neutral-400 border-t border-neutral-800/50 pt-6">
          אין לך חשבון?{' '}
          <Link href="/register" className="text-white hover:underline font-medium transition-all">
            הרשם עכשיו
          </Link>
        </div>
      </div>
    </div>
  )
}