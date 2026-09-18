import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import connectDB from '../../../lib/mongodb';
import Booking from '../../../models/Booking';
import User from '../../../models/User'; // ייבוא מודל המשתמש כדי שנוכל למשוך את שם הלקוח

// ==========================================
// פונקציה 1: יצירת תור חדש (POST) - מה שעשינו קודם
// ==========================================
export async function POST(request: Request) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'לא מורשה, חסר טוקן התחברות' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };

    const { serviceId, date, time } = await request.json();

    if (!serviceId || !date || !time) {
      return NextResponse.json({ message: 'חסרים נתונים לקביעת התור' }, { status: 400 });
    }

    await connectDB();

    const existingBooking = await Booking.findOne({ 
      date, 
      time, 
      status: 'CONFIRMED' 
    });

    if (existingBooking) {
      return NextResponse.json({ message: 'התור הזה כבר נתפס, אנא בחר שעה אחרת' }, { status: 400 });
    }

    const newBooking = await Booking.create({
      userId: decoded.userId,
      serviceId,
      date,
      time,
    });

    return NextResponse.json({ message: 'התור נקבע בהצלחה!', booking: newBooking }, { status: 201 });

  } catch (error) {
    console.error('Booking POST Error:', error);
    return NextResponse.json({ message: 'שגיאת שרת בעת קביעת התור' }, { status: 500 });
  }
}

// ==========================================
// פונקציה 2: משיכת תורים קיימים (GET) - חדש!
// ==========================================
export async function GET(request: Request) {
  try {
    // 1. בדיקה מי מבקש את המידע (לפי הטוקן)
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ message: 'לא מורשה' }, { status: 401 });
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, role: string };

    await connectDB();
    
    // נוודא שמודל המשתמש טעון בזיכרון כדי שנוכל לחבר את פרטי הלקוח לתור
    if (!User) console.log("User model loaded");

    let bookings;

    // 2. משיכת הנתונים בהתאם לתפקיד המשתמש
    if (decoded.role === 'ADMIN') {
      // אם זה מנהל: תביא את כל התורים, ותחבר להם את השם והטלפון של הלקוח
      bookings = await Booking.find()
        .populate('userId', 'name phone') 
        .sort({ date: 1, time: 1 }); // מיון לפי תאריך ושעה
    } else {
      // אם זה לקוח רגיל: תביא רק את התורים ששייכים ל-ID שלו
      bookings = await Booking.find({ userId: decoded.userId })
        .sort({ date: 1, time: 1 });
    }

    return NextResponse.json({ bookings }, { status: 200 });

  } catch (error) {
    console.error('Booking GET Error:', error);
    return NextResponse.json({ message: 'שגיאת שרת בעת משיכת התורים' }, { status: 500 });
  }
}