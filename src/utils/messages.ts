export enum SIGNUP_ERRORS {
  required = 'Required',
  invalidEmail = 'Email not valid',
  invalidPassword = 'Password not strong enough',
  passwordRequired = 'Please enter your password',
  confirmPasswordRequired = 'Please confirm your password',
  passwordMatch = 'Passwords must match',
  genericError = 'Oops, something went wrong...',
}

export enum SIGNUP_SUCCESS {
  success = 'You succesfully signed up!',
}
