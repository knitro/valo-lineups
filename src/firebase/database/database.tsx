import { onValue, ref, set, remove } from "firebase/database";
import { db } from "../firebase";
import { getUserId } from "../auth/auth";

////////////////////////////////////////////////////////
// Main Functions
////////////////////////////////////////////////////////

export async function addToFavourites(id: string): Promise<boolean> {
  const uid = getUserId();
  if (uid === null) {
    return false;
  }

  const dbRef = ref(db, `favourites/${uid}/${id}`);
  const item = {
    // time: Date.now(),
    a: true,
  };
  await set(dbRef, item);

  return true;
}

export async function removeFromFavourites(id: string) {
  const uid = getUserId();
  if (uid === null) {
    return false;
  }
  const dbRef = ref(db, `favourites/${uid}/${id}`);
  remove(dbRef);
  return true;
}

/**
 * Gets the current user's favourites through the use of a provided callback function
 * @param callback - callback function that will be called with the favourites IDs in an array
 * @returns true if onValue is successful (eg. uid exists), otherwise false
 */
export async function getFavourites(
  callback: (a: string[]) => void
): Promise<boolean> {
  const uid = getUserId();
  if (uid === null) {
    return false;
  }

  const dbRef = ref(db, `favourites/${uid}`);
  onValue(dbRef, (snapshot) => {
    const returnArray: string[] = [];
    snapshot.forEach((childSnapshot) => {
      const childKey = childSnapshot.key;
      if (childKey !== null) {
        returnArray.push(childKey);
        // const childData = childSnapshot.val();
      }
    });
    callback(returnArray);
  });

  return true;
}
