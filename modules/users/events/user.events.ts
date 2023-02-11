import Pubsub from '../../../common/events/events';
import MailerServices from '../../../common/services/mailer.services';
import debug from 'debug';

const log: debug.IDebugger = debug('app:event-background-process');

Pubsub.on('user_signup_otp', async ({ email, otp, firstName }) => {
  try {
    if (email) {
      await MailerServices.sendMailAws({
        email,
        otp,
        firstName,
        templateName: 'user-signup-otp',
        link: 'https://app.urrica.com',
      });
    }
  } catch (err) {
    log('error', err);
  }
});

Pubsub.on('welcome_to_urrica', async ({ email, otp, firstName }) => {
  try {
    if (email) {
      await MailerServices.sendMailAws({
        email,
        otp,
        firstName,
        templateName: 'welcome-to-urrica',
        link: 'https://app.urrica.com',
      });
    }
  } catch (err) {
    log('error', err);
  }
});

Pubsub.on('user_signup_otp_confirmed', async ({ email, firstName }) => {
  try {
    if (email) {
      await MailerServices.sendMailAws({
        email: email,
        templateName: 'signup-otp-confirmed', // enumType.emailTemplates.WELCOME, // 'welcome-to-fyba',
        firstName: firstName,
        link: 'https://app.urrica.com',
      });
    }
  } catch (err) {
    log('error', err);
  }
});

export default Pubsub;
