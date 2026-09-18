import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'נא להזין שם מלא'],
  },
  phone: {
    type: String,
    required: [true, 'נא להזין מספר טלפון'],
    unique: true, // כל מספר טלפון יכול להירשם רק פעם אחת
  },
  password: {
    type: String,
    required: [true, 'נא להזין סיסמה'],
  },
  role: {
    type: String,
    enum: ['CUSTOMER', 'ADMIN'], // התפקיד יכול להיות רק לקוח או מנהל
    default: 'CUSTOMER', // כברירת מחדל, כל מי שנרשם הוא לקוח רגיל
  },
}, {
  timestamps: true // יוסיף אוטומטית תאריך יצירה (createdAt) ותאריך עדכון (updatedAt)
});

// ב-Next.js צריך לבדוק אם המודל כבר קיים לפני שיוצרים אותו מחדש
const User = mongoose.models.User || mongoose.model('User', UserSchema);

export default User;