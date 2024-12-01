// src/lib/cognito.ts
import { CognitoUserPool, CognitoUser, CognitoUserAttribute, AuthenticationDetails, ISignUpResult } from "amazon-cognito-identity-js";

export const userPool = new CognitoUserPool({
  UserPoolId: process.env.NEXT_PUBLIC_COGNITO_USER_POOL_ID as string,
  ClientId: process.env.NEXT_PUBLIC_COGNITO_CLIENT_ID as string,
});

// Function to register a new user
export async function registerUser(email: string, password: string, username: string): Promise<ISignUpResult> {
  return new Promise((resolve, reject) => {
    const attributes = [
      new CognitoUserAttribute({ Name: "email", Value: email })
    ];
    
    userPool.signUp(username, password, attributes, [], (err, result) => {
      if (err) {
        reject(err);
      } else if (result) {
        resolve(result);
      } else {
        reject(new Error("Unexpected error: result is undefined"));
      }
    });
  });
}

export const confirmSignUp = (email: string, code: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.confirmRegistration(code, false, (err, result) => {
      if (err) {
        reject(err.message || JSON.stringify(err));
      } else {
        resolve(result || "Sign-up confirmed successfully");
      }
    });
  });
};

export const resendVerificationCode = (email: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    cognitoUser.resendConfirmationCode((err, result) => {
      if (err) {
        reject(err.message || JSON.stringify(err));
      } else {
        resolve("A new verification code has been sent to your email.");
      }
    });
  });
};

export const forgotPassword = (email: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    user.forgotPassword({
      onSuccess: (data) => {
        resolve("Password reset link sent successfully!");
      },
      onFailure: (err) => {
        reject(err.message || JSON.stringify(err));
      },
    });
  });
};

export const confirmForgotPassword = (email: string, password: string, code: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userPool, // This ensures the pool information is provided
    });

    user.confirmPassword(code, password, {
      onSuccess: () => resolve(),
      onFailure: (err) => reject(err.message || JSON.stringify(err)),
    });
  });
};
