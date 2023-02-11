export const signupErrors = {
  undefinedFirstName: 'First name is required',
  undefinedLastName: 'Last name is required',
  invalidFirstName: 'Input first name with only alphabets',
};

export const signupVerifyErrors = {
  notFound: 'No pending verification found',
};

export const authorizationErrors = {
  undefinedToken: 'Please make sure your request has an authorization header',
  invalidToken: 'Authorization denied.',
};

export const emailErrors = {
  emailTaken: 'Email taken',
  emailTakenAndVerified: 'Email taken, login instead',
};

export const userErrors = {
  invalidUserId: 'User ID is invalid',
  userIdNotFound: 'User ID not found',
};
