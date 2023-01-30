export interface MapInformation {
  label: string;
  image: string;
  sites: ("A" | "B" | "C")[];
}

const MAP_DATA: MapInformation[] = [
  {
    label: "Ascent",
    image: require("@/assets/maps/ascent.webp"),
    sites: ["A", "B"],
  },
  {
    label: "Bind",
    image: require("@/assets/maps/bind.webp"),
    sites: ["A", "B"],
  },
  {
    label: "Breeze",
    image: require("@/assets/maps/breeze.webp"),
    sites: ["A", "B"],
  },
  {
    label: "Fracture",
    image: require("@/assets/maps/fracture.webp"),
    sites: ["A", "B"],
  },
  {
    label: "Haven",
    image: require("@/assets/maps/haven.webp"),
    sites: ["A", "B", "C"],
  },
  {
    label: "Icebox",
    image: require("@/assets/maps/icebox.webp"),
    sites: ["A", "B"],
  },
  {
    label: "Lotus",
    image: require("@/assets/maps/lotus.webp"),
    sites: ["A", "B", "C"],
  },
  {
    label: "Pearl",
    image: require("@/assets/maps/pearl.webp"),
    sites: ["A", "B"],
  },
  {
    label: "Split",
    image: require("@/assets/maps/split.webp"),
    sites: ["A", "B"],
  },
];

export default MAP_DATA;
