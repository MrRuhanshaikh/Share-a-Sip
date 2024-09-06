import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  profile_pic: { type: String, default: '' },
  cover_pic: { type: String, default: '' },
  razorpay_id:{type:String},
  razorpay_secret:{type:String},
  bio:{type:String},
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});
export default mongoose.models.User ||model('User', UserSchema);