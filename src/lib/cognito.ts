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

// Function to authenticate an existing user
export async function authenticateUser(email: string, password: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const cognitoUser = new CognitoUser({
      Username: email,
      Pool: userPool,
    });

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (session) => resolve(session.getIdToken().getJwtToken()),
      onFailure: (err) => reject(err),
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
