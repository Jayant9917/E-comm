const createWelcomeEmail = require('./welcomeEmail');
const createLoginNotificationEmail = require('./loginNotificationEmail');
const { createProductCreatedEmail, createProductUpdatedEmail, createProductDeletedEmail, createAbandonedCartEmail } = require('./productNotificationEmail');

module.exports = {
  createWelcomeEmail,
  createLoginNotificationEmail,
  createProductCreatedEmail,
  createProductUpdatedEmail,
  createProductDeletedEmail,
  createAbandonedCartEmail
};
