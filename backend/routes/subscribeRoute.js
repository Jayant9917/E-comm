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
      req.log.info("Newsletter confirmation email sent");
    } catch (emailErr) {
      req.log.warn({ err: emailErr }, "Error sending newsletter confirmation email");
    }

    res
      .status(201)
      .json({ message: "Subscribed successfully to the newsletter" });
  } catch (err) {
    req.log.error({ err: err }, "Request failed");
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
