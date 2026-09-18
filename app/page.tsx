import Link from 'next/link'
import { Calendar, MessageCircle, MapPin, Clock, Scissors } from 'lucide-react'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      
      {/* אזור ה-Hero (התמונה הגדולה למעלה) */}
      <section className="relative h-[80vh] flex items-center justify-center text-center px-4">
        {/* תמונת רקע עם שכבת הכהיה (כדי שהטקסט יבלוט) */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1503951914875-452162b0f3f1?q=80&w=2070&auto=format&fit=crop')" }}
        >
          <div className="absolute inset-0 bg-neutral-950/80"></div>
        </div>

        {/* התוכן שעל התמונה */}
        <div className="relative z-10 flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 tracking-tight">שמואל בן ישי</h1>
          <p className="text-xl md:text-2xl text-neutral-300 mb-8 max-w-2xl">
            מספרת גברים מקצועית בירושלים. חוויית תספורת מוקפדת באווירה יוקרתית.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            {/* כפתור קביעת תור מוביל כרגע לדף הזמנות שעוד נבנה */}
            <Link 
              href="/booking" 
              className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-md font-bold text-lg hover:bg-neutral-200 transition-colors"
            >
              <Calendar size={20} />
              קביעת תור
            </Link>
            
            {/* כפתור וואטסאפ שפותח שיחה ישירות */}
            <a 
              href="https://wa.me/972534862458" 
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-green-600 text-white px-8 py-4 rounded-md font-bold text-lg hover:bg-green-700 transition-colors"
            >
              <MessageCircle size={20} />
              וואטסאפ
            </a>
          </div>
        </div>
      </section>

      {/* אזור מידע מהיר (כרטיסיות) */}
      <section className="py-20 bg-neutral-950">
        <div className="container mx-auto px-4">
          {/* גריד שמסדר את הכרטיסיות אחת מתחת לשנייה במובייל, ובשורה אחת במסך רחב */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* כרטיסייה 1: שירותים נבחרים */}
            <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 flex flex-col items-center text-center hover:bg-neutral-900 transition-colors">
              <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-white">
                <Scissors size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">שירותים נבחרים</h3>
              <ul className="text-neutral-400 space-y-4 w-full">
                <li className="flex justify-between border-b border-neutral-800/50 pb-2">
                  <span>תספורת + זקן</span><span className="text-white font-medium">70 ₪</span>
                </li>
                <li className="flex justify-between border-b border-neutral-800/50 pb-2">
                  <span>תספורת ראש</span><span className="text-white font-medium">60 ₪</span>
                </li>
                <li className="flex justify-between border-b border-neutral-800/50 pb-2">
                  <span>שעווה (לחלק)</span><span className="text-white font-medium">10 ₪</span>
                </li>
              </ul>
              <Link href="/services" className="mt-8 text-sm text-neutral-400 hover:text-white underline underline-offset-4">
                למחירון המלא
              </Link>
            </div>

            {/* כרטיסייה 2: שעות פעילות */}
            <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 flex flex-col items-center text-center hover:bg-neutral-900 transition-colors">
              <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-white">
                <Clock size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">שעות פעילות</h3>
              <ul className="text-neutral-400 space-y-4 w-full">
                <li className="flex justify-between border-b border-neutral-800/50 pb-2">
                  <span>א׳ - ה׳</span><span className="text-white font-medium">12:30 - 21:00</span>
                </li>
                <li className="flex justify-between border-b border-neutral-800/50 pb-2">
                  <span>שישי - שבת</span><span className="text-red-400 font-medium">סגור</span>
                </li>
              </ul>
            </div>

            {/* כרטיסייה 3: מיקום וניווט */}
            <div className="bg-neutral-900/50 p-8 rounded-2xl border border-neutral-800 flex flex-col items-center text-center hover:bg-neutral-900 transition-colors">
              <div className="w-16 h-16 bg-neutral-800 rounded-full flex items-center justify-center mb-6 text-white">
                <MapPin size={32} />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">איך מגיעים?</h3>
              <p className="text-neutral-400 mb-6">
                שדרות הרצל 18, ירושלים
              </p>
              <a 
                href="https://waze.com/ul?q=שדרות הרצל 18 ירושלים" 
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-neutral-800 text-white py-3 rounded-md hover:bg-neutral-700 transition-colors mt-auto font-medium"
              >
                ניווט ב-Waze
              </a>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}