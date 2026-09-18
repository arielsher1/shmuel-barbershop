import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  // קישור ללקוח שהזמין את התור (לפי ה-ID שלו בטבלת המשתמשים)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  // מזהה השירות (למשל: '1' לתספורת+זקן)
  serviceId: {
    type: String,
    required: true,
  },
  // תאריך התור (שמור כטקסט בפורמט YYYY-MM-DD)
  date: {
    type: String,
    required: true,
  },
  // שעת התור
  time: {
    type: String,
    required: true,
  },
  // סטטוס התור (ברירת מחדל: מאושר)
  status: {
    type: String,
    enum: ['CONFIRMED', 'CANCELLED'],
    default: 'CONFIRMED',
  },
}, {
  timestamps: true // יוסיף אוטומטית תאריך יצירת התור למעקב
});

const Booking = mongoose.models.Booking || mongoose.model('Booking', BookingSchema);

export default Booking;