const Razorpay = require("razorpay");

exports.instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY,
  key_secret: process.env.RAZORPAY_SECRET,
});

// const Razorpay = require("razorpay");

// exports.instance = new Razorpay({
//   key_id: "rzp_test_38yznsl2gAKzBu",
//   key_secret: "JXYAe8Pt1BFOL4z2WWIxrJGJ",
// });
