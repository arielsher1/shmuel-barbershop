import type { Metadata } from 'next'
import { Assistant } from 'next/font/google'
import './globals.css'

// ייבוא הרכיבים שיצרנו
import Header from '../components/Header'
import Footer from '../components/Footer'

const assistant = Assistant({ 
  subsets: ['hebrew', 'latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'שמואל בן ישי | מספרת גברים',
  description: 'מספרת גברים מקצועית בירושלים. קביעת תורים אונליין בצורה מהירה ונוחה.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="he" dir="rtl">
      {/* הוספנו flex ו-min-h-screen כדי שהפוטר תמיד יידחף לתחתית המסך */}
      <body className={`${assistant.className} flex flex-col min-h-screen`}>
        
        {/* התפריט העליון שלנו - יופיע בכל עמוד */}
        <Header />
        
        {/* אזור התוכן המשתנה (כמו דף הבית, שירותים, גלריה) */}
        <main className="flex-grow">
          {children}
        </main>

        {/* התחתית שלנו - תופיע בכל עמוד */}
        <Footer />
        
      </body>
    </html>
  )
}