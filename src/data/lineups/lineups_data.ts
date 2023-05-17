import { haven } from "./maps/haven";
import { LineupsData, ValorantMap } from "./lineups_interfaces";
import { ValorantAgent } from "./lineups_interfaces";

// const LINEUPS_DATA: LineupsData[] = haven; //.concat()

const LINEUPS_DATA: LineupsData[] = [];

export const generateTestLineups = () => {
  Object.values(ValorantMap).map((map) => {
    Object.values(ValorantAgent).map((agent) => {
      for (let i = 1; i < 10; i++) {
        const newData: LineupsData = {
          id: map + "_" + agent + "_" + i,
          map: map,
          site: i % 3 == 0 ? "A" : i % 3 == 1 ? "B" : "C",
          agent: agent,
          name: map + "_" + agent + "_" + i,
          locationImage: "https://picsum.photos/id/" + i * 3 + 1 + "/1920/1080",
          lineupImage: "https://picsum.photos/id/" + i * 3 + 2 + "/1920/1080",
          resultImage: "https://picsum.photos/id/" + i * 3 + 3 + "/1920/1080",
        };
        LINEUPS_DATA.push(newData);
      }
    });
  });
};

export default LINEUPS_DATA;
