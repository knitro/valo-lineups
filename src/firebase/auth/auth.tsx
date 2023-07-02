import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { authorisedUsers } from "@/data/authorised-users";

/**
 * Signs out the current user from Firebase Authentication.
 * @returns
 */
export async function doSignOut(): Promise<void> {
  signOut(auth)
    .then(() => {
      return;
    })
    .catch((error) => {
      console.log(error);
      return;
    });
}

/**
 * Gets the Current Auth User's Display Name if possible, otherwise Email
 * @returns the current user's display name if exists, otherwise email address or null if the user is not logged in
 */
export function getNameOrEmail(): string | null {
  if (auth.currentUser) {
    if (auth.currentUser.displayName) {
      return auth.currentUser.displayName;
    }
    return auth.currentUser.email;
  }
  return null;
}

/**
 * Gets the Current Auth User's Email
 * @returns the email address or null if the user is not logged in
 */
export function getUserEmail(): string | null {
  if (auth.currentUser) {
    return auth.currentUser.email;
  }
  return null;
}

let loggedIn = false;

export function isLoggedIn(): boolean {
  return loggedIn;
}

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    loggedIn = true;
  } else {
    // User is signed out
    loggedIn = false;
  }
});

export function getUserId(): string | null {
  return auth.currentUser ? auth.currentUser.uid : null;
}

export function checkCanAddLineup(): boolean {
  if (auth.currentUser) {
    const userId = auth.currentUser.uid;
    if (authorisedUsers.includes(userId)) {
      return true;
    }
  }
  return false;
}
