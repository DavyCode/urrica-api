import Pubsub from '../../../common/events/events';
import MailerServices from '../../../common/services/mailer.services';
import debug from 'debug';

const log: debug.IDebugger = debug('app:event-background-process');

Pubsub.on('_', async ({ email, otp, firstName }) => {
  try {
    if (email) {
      await MailerServices.sendMailAws({
        email,
        otp,
        firstName,
        // templateName: 'user-signup-otp',
        link: 'https://app.urrica.com',
      });
    }
  } catch (err) {
    log('error', err);
  }
});

export default Pubsub;
