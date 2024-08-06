import { instance } from "../index.js";
import crypto from "crypto";
import { Payment } from "../models/payment.model.js";
export const checkout = async (req, res) => {
  const options = {
    amount: Number(req.body.amount * 100), // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11",
  };
  const order = await instance.orders.create(options);
  return res.status(200).json({
    success: true,
    order,
  });
};

export const paymentverification = async (req, res) => {
  const { razorpay_payment_id, razorpay_order_id, razorpay_signature } =
    req.body;
  console.log(req.body);
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_API_SECERT)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  // Compare the signatures
  if (expectedSignature === razorpay_signature) {
    await Payment.create({
      razorpay_payment_id,
      razorpay_order_id,
      razorpay_signature,
    });
    return res.redirect(
      `http://localhost:5173/paymentsuccess?reference=${razorpay_payment_id}`
    );
    // res
    //   .status(200)
    //   .json({ success: true, message: "Payment verified successfully" });
  } else {
    return res
      .status(400)
      .json({ success: false, message: "Payment verification failed" });
  }
};
