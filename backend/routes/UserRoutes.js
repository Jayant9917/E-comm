const express = require("express");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const { protect } = require("../middleware/authMiddleware");
const transporter = require("../config/nodemailer");
const {
  createWelcomeEmail,
  createLoginNotificationEmail,
} = require("../emails");

const router = express.Router();

// @route POST /api/users/register
// @desc Register a new user
// @access Public
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    //Registration logic
    let user = await User.findOne({ email });

    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }

    user = new User({ name, email, password });
    await user.save();

    // Sending welcome Email
    const mailOptions = createWelcomeEmail(name, email);

    // Do not make account creation wait for an external SMTP provider.
    // The user and token response must remain fast even if Brevo is slow/down.
    transporter.sendMail(mailOptions)
      .then(() => req.log.info("Welcome email sent successfully"))
      .catch((emailError) => req.log.warn({ err: emailError }, "Error sending welcome email"));

    // Create JWT Payload
    const payload = {
      user: { id: user._id, role: user.role },
    };

    //Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        //Send the user and token in response
        res.status(201).json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (err) {
    req.log.error({ err: err }, "Request failed");
    res.status(500).json({ message: "Server error during registration" });
  }
});

// @route POST /api/users/login
// @desc Authenticate  user
// @access Public
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    //Login logic
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect" });
    }

    // Sending login notification email
    const loginMailOptions = createLoginNotificationEmail(user.name, email);

    // Login should not wait for an external SMTP provider either.
    transporter.sendMail(loginMailOptions)
      .then(() => req.log.info("Login notification email sent successfully"))
      .catch((emailError) => req.log.warn({ err: emailError }, "Error sending login notification email"));

    // Create JWT Payload
    const payload = {
      user: { id: user._id, role: user.role },
    };

    //Sign and return the token along with user data
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "40h" },
      (err, token) => {
        if (err) throw err;

        //Send the user and token in response
        res.json({
          user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
          },
          token,
        });
      }
    );
  } catch (err) {
    req.log.error({ err: err }, "Request failed");
    res.status(500).json({ message: "Server error during login" });
  }
});

// @route GET /api/users/profile
// @desc Get Logged-in user's profile (Protected Route)
// @access Private
router.get("/profile", protect, async (req, res) => {
  try {
    res.json(req.user);
  } catch (err) {
    req.log.error({ err: err }, "Request failed");
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
