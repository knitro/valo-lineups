export interface LineupsData {
  map: ValorantMap;
  site: "A" | "B" | "C";
  agent: ValorantAgent;
  name: string;

  locationImage: string; // Where to shoot lineup
  lineupImage: string; // Where to aim lineup
  resultImage: string; // Where lineup ends up
}

export enum ValorantMap {
  ASCENT,
  BIND,
  BREEZE,
  FRACTURE,
  HAVEN,
  ICEBOX,
  LOTUS,
  PEARL,
  SPLIT,
}

export enum ValorantAgent {
  ASTRA,
  BREACH,
  BRIMSTONE,
  CHAMBER,
  CYPHER,
  FADE,
  HARBOR,
  JETT,
  KAYO,
  KILLJOY,
  NEON,
  OMEN,
  PHOENIX,
  RAZE,
  REYNA,
  SAGE,
  SKYE,
  SOVA,
  VIPER,
  YORU,
}
