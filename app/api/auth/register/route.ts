import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

// הפונקציה הזו מופעלת רק כשנשלחת בקשת POST (שליחת נתונים מהטופס)
export async function POST(request: Request) {
  try {
    // משיכת הנתונים שנשלחו מהטופס
    const { name, phone, password } = await request.json();

    // 1. התחברות למסד הנתונים
    await connectDB();

    // 2. בדיקה אם המשתמש כבר קיים לפי מספר טלפון
    const existingUser = await User.findOne({ phone });
    if (existingUser) {
      return NextResponse.json(
        { message: 'מספר הטלפון כבר רשום במערכת.' },
        { status: 400 }
      );
    }

    // 3. הצפנת הסיסמה (לעולם לא שומרים סיסמה גלויה במסד הנתונים)
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. יצירת המשתמש ושמירתו
    await User.create({
      name,
      phone,
      password: hashedPassword,
    });

    // החזרת תשובה חיובית שהכל עבר בהצלחה
    return NextResponse.json(
      { message: 'המשתמש נוצר בהצלחה!' },
      { status: 201 }
    );

  } catch (error) {
    console.error('Registration Error:', error);
    return NextResponse.json(
      { message: 'אירעה שגיאה בשרת בעת יצירת המשתמש.' },
      { status: 500 }
    );
  }
}