import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Payment from "@/app/models/Payment";
import Razorpay from "razorpay";
import connectDB from "@/app/db/connectDb";
import User from "@/app/models/User";

export const POST = async (req) => {
  try {
    await connectDB();
    let body = await req.formData();
    body = Object.fromEntries(body);

    // Find the payment record by order ID
    let p = await Payment.findOne({ oid: body.razorpay_order_id });
    if (!p) {
      return NextResponse.json({
        success: false,
        message: "Order ID Not Found",
      });
    }
    // fetch the secret of user who is gettingt the payment 
    let user = await User.findOne({name:p.to_user})
    const secret = user.razorpay_secret
    // Validate the payment using Razorpay
    let isValid = validatePaymentVerification(
      {
        order_id: body.razorpay_order_id,
        payment_id: body.razorpay_payment_id,
      },
      body.razorpay_signature,
      secret || process.env.Key_Secret
    );

    if (isValid) {
      // Update payment status in the database
      const updatedPayment = await Payment.findOneAndUpdate(
        { oid: body.razorpay_order_id },
        { done: "true" },
        { new: true }
      );

      // Redirect to the user's page after successful payment
      const formattedSlug = `${
        process.env.NEXT_PUBLIC_URL
      }/${updatedPayment.to_user.trim().replace(/\s+/g, "-")}?paymentdone=true`;

      return NextResponse.redirect(formattedSlug);
    } else {
      return NextResponse.json({
        success: false,
        message: "Payment Verification Failed",
      });
    }
  } catch (error) {
    return NextResponse.json({
      success: false, 
      message: `Error: ${error.message}`,
    });
  }
};
