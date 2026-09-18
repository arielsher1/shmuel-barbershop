export default function Footer() {
  // שמירת השנה הנוכחית כדי שהיא תתעדכן אוטומטית
  const currentYear = new Date().getFullYear()
  
  return (
    <footer className="bg-neutral-950 border-t border-neutral-800 py-8 mt-auto">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-neutral-400 text-sm gap-4">
        
        {/* פרטי העסק */}
        <div className="text-center md:text-right">
          <p className="font-bold text-white mb-1">שמואל בן ישי - מספרת גברים</p>
          <p>שדרות הרצל 18, ירושלים</p>
        </div>
        
        {/* טלפון (הגדרנו משמאל-לימין כדי שהמספר יופיע נכון) */}
        <div className="text-center" dir="ltr">
          <p className="hover:text-white transition-colors cursor-pointer">📞 053-4862458</p>
        </div>
        
        {/* זכויות יוצרים */}
        <div className="text-center md:text-left">
          <p>© {currentYear} כל הזכויות שמורות.</p>
        </div>
        
      </div>
    </footer>
  )
}