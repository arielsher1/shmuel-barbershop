import Link from 'next/link'
import { Scissors, CheckCircle2, ShieldCheck, Calendar } from 'lucide-react'

export default function ServicesPage() {
  // מערך הנתונים של השירותים (בהמשך נשאב את זה ממסד הנתונים)
  const services = [
    {
      id: 1,
      name: 'תספורת + זקן',
      price: '70 ₪',
      description: 'תספורת מקצועית הכוללת חפיפה ועיצוב זקן מוקפד בהתאמה אישית.',
    },
    {
      id: 2,
      name: 'תספורת ראש',
      price: '60 ₪',
      description: 'תספורת ראש מדויקת, כולל פינישים וסידור קווי מתאר.',
    },
    {
      id: 3,
      name: 'שעווה',
      price: '10 ₪',
      description: 'המחיר הוא לחלק (אף / אוזניים / גבות) לניקוי מושלם.',
    },
  ]

  return (
    <div className="min-h-screen py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        
        {/* כותרת העמוד */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">שירותים ומחירים</h1>
          <p className="text-xl text-neutral-400">
            איכות ללא פשרות ומחירים הוגנים. בחר את הטיפול שלך.
          </p>
        </div>

        {/* באנר מבצע לחיילים */}
        <div className="bg-neutral-900/80 border border-green-900/50 rounded-xl p-6 mb-12 flex items-center gap-4">
          <div className="bg-green-900/30 p-3 rounded-full text-green-500">
            <ShieldCheck size={28} />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">הטבה מיוחדת לחיילים</h3>
            <p className="text-neutral-400 text-sm">10% הנחה על כל השירותים במספרה בהצגת חוגר.</p>
          </div>
        </div>

        {/* רשימת השירותים (Grid) */}
        <div className="grid gap-6 mb-16">
          {services.map((service) => (
            <div 
              key={service.id} 
              className="bg-neutral-900/40 hover:bg-neutral-900/80 transition-colors border border-neutral-800 rounded-2xl p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="mt-1 text-neutral-500">
                  <Scissors size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-2">{service.name}</h2>
                  <p className="text-neutral-400">{service.description}</p>
                </div>
              </div>
              
              <div className="flex flex-col items-start md:items-end w-full md:w-auto mt-4 md:mt-0 border-t md:border-t-0 border-neutral-800 pt-4 md:pt-0">
                <span className="text-3xl font-bold text-white">{service.price}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Call To Action - אזור הזמנה תחתון */}
        <div className="bg-neutral-900 rounded-2xl border border-neutral-800 p-8 text-center flex flex-col items-center">
          <h3 className="text-2xl font-bold text-white mb-2">מוכן להסתפר?</h3>
          <p className="text-neutral-400 mb-8">שריין לעצמך תור עכשיו, בקלות ובמהירות.</p>
          <Link 
            href="/booking" 
            className="flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-md font-bold text-lg hover:bg-neutral-200 transition-colors w-full sm:w-auto"
          >
            <Calendar size={20} />
            לקביעת תור
          </Link>
        </div>

      </div>
    </div>
  )
}