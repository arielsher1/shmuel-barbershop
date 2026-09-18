"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Menu, User, LogOut } from 'lucide-react'

export default function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [userName, setUserName] = useState('')

  useEffect(() => {
    // פונקציה שקוראת את הזיכרון ובודקת אם הלקוח מחובר
    const checkAuth = () => {
      const token = localStorage.getItem('token')
      const userStr = localStorage.getItem('user')
      
      if (token && userStr) {
        setIsLoggedIn(true)
        const user = JSON.parse(userStr)
        // ניקח רק את השם הפרטי (המילה הראשונה בשם)
        setUserName(user.name.split(' ')[0])
      } else {
        setIsLoggedIn(false)
        setUserName('')
      }
    }

    checkAuth()
    
    // הפונקציה תרוץ שוב אם מתבצע שינוי בזיכרון המקומי
    window.addEventListener('storage', checkAuth)
    return () => window.removeEventListener('storage', checkAuth)
  }, [])

  // פונקציית התנתקות - מוחקת את הטוקן ומרעננת את האתר
  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setIsLoggedIn(false)
    window.location.href = '/' // רענון הדף וחזרה לעמוד הראשי
  }

  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/80 backdrop-blur-md border-b border-neutral-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        
        <Link href="/" className="text-xl font-bold text-white tracking-wide hover:text-neutral-300 transition-colors">
          שמואל בן ישי
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-neutral-300 text-sm font-medium">
          <Link href="/" className="hover:text-white transition-colors">ראשי</Link>
          <Link href="/services" className="hover:text-white transition-colors">שירותים ומחירים</Link>
          <Link href="/booking" className="hover:text-white transition-colors text-green-400 font-bold">קביעת תור</Link>
          
          {/* אזור דינמי - משתנה בהתאם למצב ההתחברות */}
          {isLoggedIn ? (
            <div className="flex items-center gap-4 mr-4 border-r border-neutral-800 pr-4">
              <Link href="/dashboard" className="flex items-center gap-1 hover:text-white transition-colors">
                <User size={16} />
                אזור אישי ({userName})
              </Link>
              <button 
                onClick={handleLogout} 
                className="flex items-center gap-1 text-red-400 hover:text-red-500 transition-colors"
              >
                <LogOut size={16} />
                התנתק
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4 mr-4 border-r border-neutral-800 pr-4">
              <Link href="/login" className="bg-white text-black px-4 py-1.5 rounded-md hover:bg-neutral-200 transition-colors font-bold">
                התחברות
              </Link>
            </div>
          )}
        </nav>

        {/* תפריט מובייל (כרגע מוסתר עיצובית) */}
        <button className="md:hidden text-neutral-300 hover:text-white">
          <Menu size={28} strokeWidth={1.5} />
        </button>

      </div>
    </header>
  )
}