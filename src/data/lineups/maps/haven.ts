import { LineupsData, ValorantAgent, ValorantMap } from "../lineups_interfaces";

const haven_brimstone: LineupsData[] = [
  {
    id: "1",
    map: ValorantMap.HAVEN,
    site: "C",
    agent: ValorantAgent.BRIMSTONE,
    name: "Postplant Default C",
    locationImage:
      "https://cdn.discordapp.com/attachments/1067922239015624794/1067922435992735814/image.png",
    lineupImage:
      "https://cdn.discordapp.com/attachments/1067922239015624794/1068008592428499034/image.png",
    resultImage:
      "https://cdn.discordapp.com/attachments/1067922239015624794/1067922521762054215/image.png",
  },
  {
    id: "2",
    map: ValorantMap.HAVEN,
    site: "B",
    agent: ValorantAgent.BRIMSTONE,
    name: "Postplant Default B",
    locationImage:
      "https://cdn.discordapp.com/attachments/1067922239015624794/1067922928278183986/image.png",
    lineupImage:
      "https://cdn.discordapp.com/attachments/1067922239015624794/1068008958880657479/image.png",
    resultImage:
      "https://cdn.discordapp.com/attachments/1067922239015624794/1067922929804910622/image.png",
  },
];

export const haven: LineupsData[] = haven_brimstone; //.concat()
