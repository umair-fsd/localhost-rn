import Amplfiy, { Auth, API, graphqlOperation } from "aws-amplify";
import AuthError from "../AuthError/AuthError";
import AuthSession from "../AuthSession/AuthSession";
import RemoteAuthProvider from "../RemoteAuthProvider/RemoteAuthProvider"

class AWSAmplifyRemoteAuthProvider implements RemoteAuthProvider {
  signIn(email: string, password: string): Promise<AuthSession> {
    let promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
      try {
        const signInResult = await Auth.signIn({
          username: email,
          password: password,
        });

        const userId = signInResult.attributes.sub;

        resolve(new AuthSession(userId, "fakeToken"));
      } catch (e) {
        switch (e.message) {
          case "Username should be either an email or a phone number.":
            reject(`${AuthError.usernameInvalid}:  ${e.message}`);
          case "Password did not conform with policy: Password not long enough":
            reject(`${AuthError.passwordTooShort}:  ${e.message}`);
          case "User is not confirmed.":
            reject(`${AuthError.userIsNotConfirmed}:  ${e.message}`);
          case "Incorrect username or password.":
            reject(`${AuthError.incorrectUsernameOrPassword}:  ${e.message}`);
          case "User does not exist.":
            reject(`${AuthError.userDoesNotExist}:  ${e.message}`);
          default:
            reject(`${AuthError.unknownError}:  ${e.message}`);
        }
      }
    })
    return promise
  }

  signOut(): Promise<boolean> {
    let promise: Promise<boolean> = new Promise(async (resolve, reject) => {
      try {
        await Auth.signOut();
        resolve(true);
      } catch (error) {
        reject(`Error signing out: ${error}`);
      }
    })
    return promise
  }

  async signUp(email: string, password: string): Promise<AuthSession> {
    let promise: Promise<AuthSession> = new Promise(async (resolve, reject) => {
      try {
        const signUpResult = await Auth.signUp({
          username: email,
          password: password,
        });

        const userId = signUpResult.userSub;

        resolve(new AuthSession(userId, "fakeToken"));
      } catch (e) {
        switch (e.message) {
          case "1 validation error detected: Value at 'password' failed to satisfy constraint: Member must have length greater than or equal to 6":
            reject(`${AuthError.passwordTooShort}:  ${e.message}`);
          case "User does not exist.":
            reject(`${AuthError.userNotFound}:  ${e.message}`);
          case "Username should be either an email or a phone number.":
            reject(`${AuthError.usernameInvalid}:  ${e.message}`);
          case "Password did not conform with policy: Password not long enough":
            reject(`${AuthError.passwordTooShort}:  ${e.message}`);
          case "An account with the given email already exists.":
            reject(`${AuthError.emailAlreadyExists}:  ${e.message}`);
          default:
            reject(`${AuthError.unknownError}:  ${e.message}`);
        }
      }
    })
    return promise
  }
}

export default AWSAmplifyRemoteAuthProvider;
