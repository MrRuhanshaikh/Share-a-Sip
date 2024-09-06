"use server";
import Razorpay from "razorpay";
import Payment from "../models/Payment";
import User from "../models/User";
import connectDB from "../db/connectDb";

export const initiate = async (amount, to_user, paymentform) => {
  await connectDB();
  // fetch the secret of user who is gettingt the payment 
  let user = await User.findOne({name:to_user})

  var instance = new Razorpay({
    key_id:user.razorpay_id || process.env.NEXT_PUBLIC_Key_ID,
    key_secret:user.razorpay_secret || process.env.Key_Secret,
  });

  let options = {
        amount:Number.parseInt(amount),
        currency:"INR",
  }

  let x= await instance.orders.create(options);

  // payment obj to show pending payments in db
  await Payment.create({oid:x.id, amount:amount/100, to_user:to_user, name:paymentform.name, message:paymentform.message})

  return x;
};
export const fetchuser = async (Username) => {
  await connectDB();

  // Replace hyphens with spaces
  const formattedUsername = Username.replace(/-/g, " ");

  const user = await User.findOne({ name: formattedUsername });

  if (!user) {
    // Handle the case where the user is not found
    throw new Error("User not found");
  }

  // Convert to plain JavaScript object
  return user.toObject({ flattenObjectIds: true });
};

export const fetchpayments = async (Username) => {
  await connectDB();

  // Replace hyphens with spaces
  const formattedUsername = Username.replace(/-/g, " ");

  const payments = await Payment.find({ to_user: formattedUsername, done:true }).sort({ amount: -1 }).lean();

  // Return payments or an empty array if none are found
  return payments || [];
};

export const updateProfile = async (data, oldUsername) => {
  await connectDB();
  // Ensure that data is properly formatted
  let ndata = { ...data };

  // Update the user profile
  const result = await User.updateOne(
    { name: oldUsername },
    {
      $set: {
        profile_pic: ndata.profile_pic,
        cover_pic: ndata.cover_pic,
        razorpay_id: ndata.razorpay_id,
        razorpay_secret: ndata.razorpay_secret,
        bio:ndata.bio,
      },
    }
  );
};