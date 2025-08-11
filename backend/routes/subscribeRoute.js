const express = require("express");
const router = express.Router();
const Subscriber = require("../models/Subscriber");
const transporter = require("../config/nodemailer");
const { createNewsletterConfirmationEmail } = require("../emails");

// @route POST /api/subscribers
// @desc Subscribe to newsletter
// @access Public

router.post("/subscribe", async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email is required" });
  }

  try {
    //Check if the email is already subscribed
    let subscriber = await Subscriber.findOne({ email });

    if (subscriber) {
      return res.status(400).json({ message: "Email already subscribed" });
    }

    // Create a new subscriber
    subscriber = new Subscriber({ email });
    await subscriber.save();

    // Send newsletter confirmation email
    const mailOptions = createNewsletterConfirmationEmail(email);
    try {
      await transporter.sendMail(mailOptions);
      console.log("Newsletter confirmation email sent to", email);
    } catch (emailErr) {
      console.log("Error sending newsletter confirmation email:", emailErr);
    }

    res
      .status(201)
      .json({ message: "Subscribed successfully to the newsletter" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;