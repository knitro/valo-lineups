export interface LineupsData {
  id: string;
  map: ValorantMap;
  site: "A" | "B" | "C";
  agent: ValorantAgent;
  name: string;

  locationImage: string; // Where to shoot lineup
  lineupImage: string; // Where to aim lineup
  resultImage: string; // Where lineup ends up
}

export enum ValorantMap {
  ASCENT = "Ascent",
  BIND = "Bind",
  BREEZE = "Breeze",
  FRACTURE = "Fracture",
  HAVEN = "Haven",
  ICEBOX = "Icebox",
  LOTUS = "Lotus",
  PEARL = "Pearl",
  SPLIT = "Split",
  // ASCENT,
  // BIND,
  // BREEZE,
  // FRACTURE,
  // HAVEN,
  // ICEBOX,
  // LOTUS,
  // PEARL,
  // SPLIT,
}

export enum ValorantAgent {
  ASTRA = "Astra",
  BREACH = "Breach",
  BRIMSTONE = "Brimstone",
  CHAMBER = "Chamber",
  CYPHER = "Cypher",
  FADE = "Fade",
  GEKKO = "Gekko",
  HARBOR = "Harbor",
  JETT = "Jett",
  KAYO = "KAYO",
  KILLJOY = "Killjoy",
  NEON = "Neon",
  OMEN = "Omen",
  PHOENIX = "Phoenix",
  RAZE = "Raze",
  REYNA = "Reyna",
  SAGE = "Sage",
  SKYE = "Skye",
  SOVA = "Sova",
  VIPER = "Viper",
  YORU = "Yoru",
  // ASTRA,
  // BREACH,
  // BRIMSTONE,
  // CHAMBER,
  // CYPHER,
  // FADE,
  // GEKKO,
  // HARBOR,
  // JETT,
  // KAYO,
  // KILLJOY,
  // NEON,
  // OMEN,
  // PHOENIX,
  // RAZE,
  // REYNA,
  // SAGE,
  // SKYE,
  // SOVA,
  // VIPER,
  // YORU,
}
