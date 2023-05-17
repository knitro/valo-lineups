import { ValorantMap } from "./lineups/lineups_interfaces";

export interface MapInformation {
  label: string;
  image: string;
  sites: ("A" | "B" | "C")[];
  data: ValorantMap;
}

const MAP_DATA: MapInformation[] = [
  {
    label: "Ascent",
    image: require("@/assets/maps/ascent.webp"),
    sites: ["A", "B"],
    data: ValorantMap.ASCENT,
  },
  {
    label: "Bind",
    image: require("@/assets/maps/bind.webp"),
    sites: ["A", "B"],
    data: ValorantMap.BIND,
  },
  {
    label: "Breeze",
    image: require("@/assets/maps/breeze.webp"),
    sites: ["A", "B"],
    data: ValorantMap.BREEZE,
  },
  {
    label: "Fracture",
    image: require("@/assets/maps/fracture.webp"),
    sites: ["A", "B"],
    data: ValorantMap.FRACTURE,
  },
  {
    label: "Haven",
    image: require("@/assets/maps/haven.webp"),
    sites: ["A", "B", "C"],
    data: ValorantMap.HAVEN,
  },
  {
    label: "Icebox",
    image: require("@/assets/maps/icebox.webp"),
    sites: ["A", "B"],
    data: ValorantMap.ICEBOX,
  },
  {
    label: "Lotus",
    image: require("@/assets/maps/lotus.webp"),
    sites: ["A", "B", "C"],
    data: ValorantMap.LOTUS,
  },
  {
    label: "Pearl",
    image: require("@/assets/maps/pearl.webp"),
    sites: ["A", "B"],
    data: ValorantMap.PEARL,
  },
  {
    label: "Split",
    image: require("@/assets/maps/split.webp"),
    sites: ["A", "B"],
    data: ValorantMap.SPLIT,
  },
];

export default MAP_DATA;
