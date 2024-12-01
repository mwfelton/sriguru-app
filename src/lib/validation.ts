const isValidPassword = (password: string): boolean => {
  const passwordRegex = /^.{6,}$/; // Matches any string with 6 or more characters
  return passwordRegex.test(password);
};

const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
  return emailRegex.test(email);
};

export const validateForm = (formData: { email: string; password: string }) => {
  const validationErrors: { password?: string; email?: string } = {};

  // Validate password
  if (!isValidPassword(formData.password)) {
    validationErrors.password = "Password must be at least 6 characters";
  }

  // Validate email
  if (!isValidEmail(formData.email)) {
    validationErrors.email = "Please enter a valid email address.";
  }

  if (validationErrors.password || validationErrors.email) {
    return validationErrors;
  }

  return null;
};

// export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

// // Validate email format
// export function isValidEmail(email: string): boolean {
//   return emailRegex.test(email);
// }

// // Validate password strength
// export function isValidPassword(password: string): boolean {
//   return passwordRegex.test(password);
// }
