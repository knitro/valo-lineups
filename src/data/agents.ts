import { ValorantAgent } from "./lineups/lineups_interfaces";

export interface AgentInformation {
  label: string;
  image: string;
  data: ValorantAgent;
}

const AGENT_DATA: AgentInformation[] = [
  {
    label: "Astra",
    image: require("@/assets/agents/astra.webp"),
    data: ValorantAgent.ASTRA,
  },
  {
    label: "Breach",
    image: require("@/assets/agents/breach.webp"),
    data: ValorantAgent.BREACH,
  },
  {
    label: "Brimstone",
    image: require("@/assets/agents/brimstone.webp"),
    data: ValorantAgent.BRIMSTONE,
  },
  {
    label: "Chamber",
    image: require("@/assets/agents/chamber.webp"),
    data: ValorantAgent.CHAMBER,
  },
  {
    label: "Cypher",
    image: require("@/assets/agents/cypher.webp"),
    data: ValorantAgent.CYPHER,
  },
  {
    label: "Fade",
    image: require("@/assets/agents/fade.webp"),
    data: ValorantAgent.FADE,
  },
  {
    label: "Harbor",
    image: require("@/assets/agents/harbor.webp"),
    data: ValorantAgent.HARBOR,
  },
  {
    label: "Jett",
    image: require("@/assets/agents/jett.webp"),
    data: ValorantAgent.JETT,
  },
  {
    label: "Kayo",
    image: require("@/assets/agents/kayo.webp"),
    data: ValorantAgent.KAYO,
  },
  {
    label: "Killjoy",
    image: require("@/assets/agents/killjoy.webp"),
    data: ValorantAgent.KILLJOY,
  },
  {
    label: "Neon",
    image: require("@/assets/agents/neon.webp"),
    data: ValorantAgent.NEON,
  },
  {
    label: "Omen",
    image: require("@/assets/agents/omen.webp"),
    data: ValorantAgent.OMEN,
  },
  {
    label: "Phoenix",
    image: require("@/assets/agents/phoenix.webp"),
    data: ValorantAgent.PHOENIX,
  },
  {
    label: "Raze",
    image: require("@/assets/agents/raze.webp"),
    data: ValorantAgent.RAZE,
  },
  {
    label: "Reyna",
    image: require("@/assets/agents/reyna.webp"),
    data: ValorantAgent.REYNA,
  },
  {
    label: "Sage",
    image: require("@/assets/agents/sage.webp"),
    data: ValorantAgent.SAGE,
  },
  {
    label: "Skye",
    image: require("@/assets/agents/skye.webp"),
    data: ValorantAgent.SKYE,
  },
  {
    label: "Sova",
    image: require("@/assets/agents/sova.webp"),
    data: ValorantAgent.SOVA,
  },
  {
    label: "Viper",
    image: require("@/assets/agents/viper.webp"),
    data: ValorantAgent.VIPER,
  },
  {
    label: "Yoru",
    image: require("@/assets/agents/yoru.webp"),
    data: ValorantAgent.YORU,
  },
];

export default AGENT_DATA;
