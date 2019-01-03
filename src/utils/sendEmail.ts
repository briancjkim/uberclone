import Mailgun from 'mailgun-js';

const mailGunClient = new Mailgun({
  apiKey: process.env.MAILGUN_API_KEY || "",
  domain: "sandbox12402d687b3c4692b744200e029c7d66.mailgun.org"
});

const sendEmail = (subject: string, html: string) => {
  const emailData = {
    from: "briancjkim92@gmail.com",
    to: "briancjkim92@gmail.com",
    subject,
    html
  };
  return mailGunClient.messages().send(emailData);
};

export const sendVerificationEmail = (fullName: string, key: string) => {
  const emailSubject = `Hello! ${fullName}, please verify your email`;
  const emailBody = `Verify your email by clicking this link<a href="http://nuber/verification/${key}">click</a>`;
  return sendEmail(emailSubject, emailBody);
}
