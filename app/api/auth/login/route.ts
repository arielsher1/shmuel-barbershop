import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import connectDB from '../../../../lib/mongodb';
import User from '../../../../models/User';

export async function POST(request: Request) {
  try {
    const { phone, password } = await request.json();

    // 1. התחברות למסד הנתונים
    await connectDB();

    // 2. חיפוש המשתמש לפי מספר הטלפון
    const user = await User.findOne({ phone });
    if (!user) {
      // אם אין משתמש כזה, נחזיר שגיאה כללית כדי לא לחשוף מידע להאקרים
      return NextResponse.json({ message: 'מספר טלפון או סיסמה שגויים.' }, { status: 401 });
    }

    // 3. בדיקה האם הסיסמה שהוקלדה תואמת לסיסמה המוצפנת במסד הנתונים
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json({ message: 'מספר טלפון או סיסמה שגויים.' }, { status: 401 });
    }

    // 4. יצירת ה"צמיד הדיגיטלי" (Token) עם הפרטים הבסיסיים של המשתמש
    const token = jwt.sign(
      { userId: user._id, role: user.role, name: user.name },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' } // נשאיר את המשתמש מחובר למשך שבוע
    );

    // 5. החזרת תשובה חיובית עם הטוקן
    return NextResponse.json(
      { 
        message: 'התחברת בהצלחה!', 
        token, 
        user: { name: user.name, role: user.role } 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error('Login Error:', error);
    return NextResponse.json(
      { message: 'אירעה שגיאה בשרת בעת ההתחברות.' },
      { status: 500 }
    );
  }
}