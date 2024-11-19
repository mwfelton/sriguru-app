// src/lib/cognito.ts
import { CognitoUserPool, CognitoUser, AuthenticationDetails, ISignUpResult } from "amazon-cognito-identity-js";

const userPool = new CognitoUserPool({
  UserPoolId: process.env.COGNITO_USER_POOL_ID as string,
  ClientId: process.env.COGNITO_CLIENT_ID as string,
});

// Function to register a new user
export async function registerUser(email: string, password: string): Promise<ISignUpResult> {
  return new Promise((resolve, reject) => {
    userPool.signUp(email, password, [], [], (err, result) => {
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
