const createWelcomeEmail = require("./welcomeEmail");
const createLoginNotificationEmail = require("./loginNotificationEmail");
const {
  createProductCreatedEmail,
  createProductUpdatedEmail,
  createProductDeletedEmail,
  createAbandonedCartEmail,
} = require("./productNotificationEmail");
const createOrderConfirmationEmail = require("./orderConfirmationEmail");
const createPaymentReceiptEmail = require("./paymentReceiptEmail");
const createNewsletterConfirmationEmail = require("./newsletterConfirmationEmail");
const createNewsletterProductAnnouncementEmail = require("./newsletterProductAnnouncementEmail");

module.exports = {
  createWelcomeEmail,
  createLoginNotificationEmail,
  createProductCreatedEmail,
  createProductUpdatedEmail,
  createProductDeletedEmail,
  createAbandonedCartEmail,
  createOrderConfirmationEmail,
  createPaymentReceiptEmail,
  createNewsletterConfirmationEmail,
  createNewsletterProductAnnouncementEmail,
};
