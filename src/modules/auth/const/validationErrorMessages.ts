export const AUTH_VALIDATION_ERROR_MESSAGES = {
  password: {
    empty: "Password is required.",
    tooShort: "Password must be at least 8 characters long.",
    pattern:
      "Password must have at least one uppercase letter and one number or special character.",
  },
  usernameOrEmail: {
    empty: "Username or email is required.",
  },
  username: {
    empty: "Username is required.",
    tooLong: "Username cannot be longer than 30 characters.",
  },
  firstName: {
    empty: "First name is required.",
    tooLong: "First name cannot be longer than 100 characters.",
  },
  lastName: {
    empty: "Last name is required.",
    tooLong: "Last name cannot be longer than 100 characters.",
  },
};
