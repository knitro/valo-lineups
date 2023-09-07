import { fs } from "../firebase";
import {
  LineupsData,
  ValorantAgent,
  ValorantMap,
} from "@/data/lineups/lineups_interfaces";
import {
  addDoc,
  collection,
  doc,
  documentId,
  getDocs,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

////////////////////////////////////////////////////////
// Main Functions
////////////////////////////////////////////////////////

/**
 * Gets all the lineups based upon the map and agent filter parameters
 * @param map - the map
 * @param agent - the agent
 * @returns the lineups for the map and agent specified
 */
export async function getLineups(
  map: ValorantMap,
  agent: ValorantAgent
): Promise<LineupsData[]> {
  // Must be uppercase to search
  const map_formatted = map.toUpperCase();
  const agent_formatted = agent.toUpperCase();

  const q = query(
    collection(fs, "lineups"),
    where("map", "==", map_formatted),
    where("agent", "==", agent_formatted)
  );

  const querySnapshot = await getDocs(q);
  const returnArray = [] as LineupsData[];
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    const data = doc.data() as LineupsData;
    data.id = doc.id; // Set Id to the id of the doc, rather than 0
    returnArray.push(data);
  });

  console.log(returnArray);

  return returnArray;
}

/**
 * Gets all the lineups based upon a list of ids
 * @param ids - the array of ids that want to be retrieved
 * @returns the lineups for the ids specified
 */
export async function getLineupsFavourites(
  ids: string[]
): Promise<LineupsData[]> {
  // Return Empty Array if no IDs to query
  // Firebase complains with empty ID array with "in"
  if (ids.length === 0) {
    return [] as LineupsData[];
  }

  const q = query(collection(fs, "lineups"), where(documentId(), "in", ids));
  const querySnapshot = await getDocs(q);
  const returnArray = [] as LineupsData[];
  querySnapshot.forEach((doc) => {
    // Firebase: doc.data() is never undefined for query doc snapshots
    const data = doc.data() as LineupsData;
    data.id = doc.id; // Set Id to the id of the doc, rather than 0
    returnArray.push(data);
  });

  return returnArray;
}

/**
 * Creates a Lineup Entry and adds it to Firestore
 * @param data - the lineup data
 * @returns true
 */
export async function createLineup(data: LineupsData): Promise<boolean> {
  // Add to Firestore
  const docRef = await addDoc(collection(fs, "lineups"), data);
  console.log("Document written with ID: ", docRef.id);
  return true;
}

/**
 * Updates a Lineup Entry on Firestore
 * Note that this essentially does the same as createLineup()
 * See for more information: https://firebase.google.com/docs/firestore/manage-data/add-data#update-data
 * @param data - the data to update with
 * @returns true
 */
export async function updateLineup(data: LineupsData): Promise<boolean> {
  const ref = doc(fs, `lineups`, data.id);

  // Ensure uppercase formatting
  const map_formatted = data.map.toUpperCase();
  const agent_formatted = data.agent.toUpperCase();

  await updateDoc(ref, {
    map: map_formatted,
    agent: agent_formatted,
    site: data.site,
    name: data.name,
    locationImage: data.locationImage,
    lineupImage: data.lineupImage,
    resultImage: data.resultImage,
  });

  return true;
}
