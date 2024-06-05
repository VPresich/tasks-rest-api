import Help from '../../models/help.js';
import ctrlWrapper from '../../helpers/ctrlWrapper.js';
import sendGridEmail from '../../helpers/sendGridEmail.js';

const sendSupportEmail = ctrlWrapper(async (req, res, next) => {
  const { email, text } = req.body;
  const { SUPPORT_EMAIL, BASE_FROM_EMAIL } = process.env;
  if (!SUPPORT_EMAIL || !BASE_FROM_EMAIL) {
    throw new Error(
      'SUPPORT_EMAIL and BASE_FROM_EMAIL must be defined in your .env file'
    );
  }

  const supportEmail = {
    to: SUPPORT_EMAIL,
    from: BASE_FROM_EMAIL,
    subject: 'Test app',
    html: `
      <p>You have received a new support request.</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${text}</p>
    `,
    text: `You have received a new support request.\n\nEmail: ${email}\nMessage:\n${text}`,
  };

  try {
    const newHelpRequest = new Help({ email, text });
    await newHelpRequest.save();

    await sendGridEmail(supportEmail);

    res.status(200).send({ message: 'Help request received' });
  } catch (error) {
    console.error('Error sending support email:', error);
    throw new Error('Failed to send support email');
  }
});

export default sendSupportEmail;
