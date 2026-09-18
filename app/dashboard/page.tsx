"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Calendar, Clock, Scissors, User as UserIcon, AlertCircle, PlusCircle } from 'lucide-react'

// הגדרת המבנה של "תור" כדי ש-TypeScript לא יצעק עלינו
interface Booking {
  _id: string
  serviceId: string
  date: string
  time: string
  status: string
  userId?: {
    name: string
    phone: string
  }
}

export default function DashboardPage() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  
  const [userName, setUserName] = useState('')
  const [userRole, setUserRole] = useState('')

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const token = localStorage.getItem('token')
        const userStr = localStorage.getItem('user')
        
        // אם אין טוקן, נזרוק את המשתמש להתחברות
        if (!token) {
          router.push('/login')
          return
        }

        if (userStr) {
          const user = JSON.parse(userStr)
          setUserName(user.name)
          setUserRole(user.role)
        }

        // בקשה למשיכת התורים מהשרת
        const res = await fetch('/api/bookings', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })

        if (!res.ok) {
          throw new Error('שגיאה במשיכת הנתונים')
        }

        const data = await res.json()
        setBookings(data.bookings)
        
      } catch (err) {
        setError('לא הצלחנו לטעון את התורים. נסה לרענן את העמוד.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchBookings()
  }, [router])

  // פונקציית עזר להמרת מזהה השירות לשם השירות
  const getServiceName = (id: string) => {
    const services: Record<string, string> = {
      '1': 'תספורת + זקן',
      '2': 'תספורת ראש',
      '3': 'שעווה'
    }
    return services[id] || 'שירות לא ידוע'
  }

  // תצוגת טעינה
  if (isLoading) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center">
        <p className="text-neutral-400 text-lg animate-pulse">טוען את התורים שלך...</p>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12 min-h-[80vh]">
      
      {/* כותרת אזור האישי */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">שלום, {userName}</h1>
          <p className="text-neutral-400">
            {userRole === 'ADMIN' ? 'ניהול תורים - כל המספרה' : 'כאן תוכל לראות את התורים הקרובים שלך'}
          </p>
        </div>
        
        <Link 
          href="/booking"
          className="bg-white text-black font-bold rounded-lg px-6 py-3 hover:bg-neutral-200 transition-colors flex items-center gap-2"
        >
          <PlusCircle size={20} />
          קביעת תור חדש
        </Link>
      </div>

      {error && (
        <div className="mb-8 p-4 bg-red-900/30 border border-red-900/50 rounded-lg flex items-start gap-3 text-red-400">
          <AlertCircle size={20} className="mt-0.5 shrink-0" />
          <p>{error}</p>
        </div>
      )}

      {/* תצוגה כאשר אין תורים */}
      {bookings.length === 0 && !error ? (
        <div className="bg-neutral-900/50 border border-neutral-800 rounded-2xl p-12 text-center">
          <Calendar size={48} className="mx-auto text-neutral-600 mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">אין לך תורים קרובים</h3>
          <p className="text-neutral-400 mb-6">זה הזמן להתחדש בתספורת רעננה!</p>
          <Link href="/booking" className="text-green-500 hover:text-green-400 font-medium transition-colors">
            לחץ כאן לקביעת תור &larr;
          </Link>
        </div>
      ) : (
        /* תצוגת התורים ברשת (Grid) */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <div 
              key={booking._id} 
              className="bg-neutral-900/50 border border-neutral-800 hover:border-neutral-700 transition-all rounded-2xl p-6 relative overflow-hidden"
            >
              {/* פס צבעוני למעלה לסימון סטטוס */}
              <div className={`absolute top-0 left-0 right-0 h-1 ${booking.status === 'CONFIRMED' ? 'bg-green-500' : 'bg-red-500'}`} />
              
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-xl font-bold text-white">
                  {getServiceName(booking.serviceId)}
                </h3>
                <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                  booking.status === 'CONFIRMED' ? 'bg-green-900/30 text-green-400' : 'bg-red-900/30 text-red-400'
                }`}>
                  {booking.status === 'CONFIRMED' ? 'מאושר' : 'מבוטל'}
                </span>
              </div>

              <div className="space-y-3 text-neutral-300">
                <div className="flex items-center gap-3">
                  <Calendar size={18} className="text-neutral-500" />
                  <span>{booking.date.split('-').reverse().join('/')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock size={18} className="text-neutral-500" />
                  <span>{booking.time}</span>
                </div>
                
                {/* הצגת שם הלקוח רק אם המנהל צופה בתור */}
                {userRole === 'ADMIN' && booking.userId && (
                  <div className="flex items-center gap-3 mt-4 pt-4 border-t border-neutral-800 text-green-400">
                    <UserIcon size={18} />
                    <span>{booking.userId.name} ({booking.userId.phone})</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}