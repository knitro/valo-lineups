<template>
  <div>
    <v-navigation-drawer
      app
      v-model="drawer"
      :mini-variant.sync="mini"
      permanent
    >
      <v-list-item class="px-2">
        <v-list-item-avatar>
          <v-img :src="logo"></v-img>
        </v-list-item-avatar>

        <v-list-item-title>Valo Lineups</v-list-item-title>

        <v-btn icon @click.stop="mini = !mini">
          <v-icon>mdi-chevron-left</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <!-- <v-list-item>
          <v-img :src="selectedMap.image"></v-img>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Selected Map: {{ selectedMap.label }}
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item> -->
        <v-list-item>
          <v-select
            v-model="selectedMap"
            :items="MAP_DATA"
            label="Map"
            item-text="label"
            return-object
            @change="filterData"
          >
          </v-select>
        </v-list-item>

        <v-list-item>
          <v-select
            v-model="selectedSites"
            :items="['A', 'B', 'C']"
            label="Sites"
            item-text="label"
            multiple
            @change="filterData"
          >
          </v-select>
        </v-list-item>

        <!-- <v-list-item>
          <v-list-item-avatar>
            <v-img :src="selectedAgent.image"></v-img>
          </v-list-item-avatar>
          <v-list-item-title>
            Selected Agent: {{ selectedAgent.label }}
          </v-list-item-title>
        </v-list-item> -->
        <v-list-item>
          <v-select
            v-model="selectedAgent"
            :items="AGENT_DATA"
            label="Agent"
            item-text="label"
            return-object
            @change="filterData"
          >
          </v-select>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container>
      <!-- <v-row no-gutters>
        <v-col>Selected Map: {{ selectedMap.label }}</v-col>
        <v-col>Selected Agent: {{ selectedAgent.label }}</v-col>
        <v-col>Selected Site: {{ selectedSites }}</v-col>
      </v-row> -->

      <v-row no-gutters id="draggableParent">
        <v-col
          v-for="item in filteredData"
          v-bind:key="
            item.map + '-' + item.site + '-' + item.name.replaceAll('', '-')
          "
          class="block-draggable"
          align-self="center"
          :cols="3"
          style="justify-items: center"
        >
          <info-card
            :width="400"
            :label="item.name"
            :site="item.site"
            :locationImage="item.locationImage"
            :lineupImage="item.lineupImage"
            :resultImage="item.resultImage"
          ></info-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import AGENT_DATA, { AgentInformation } from "@/data/agents";
import LINEUPS_DATA from "@/data/lineups/lineups_data";
import {
  LineupsData,
  ValorantAgent,
  ValorantMap,
} from "@/data/lineups/lineups_interfaces";
import MAP_DATA, { MapInformation } from "@/data/maps";
import { Sortable, Plugins } from "@shopify/draggable";
import Vue from "vue";

export default Vue.extend({
  name: "HomeView",

  components: { InfoCard },
  setup() {
    return {
      logo: require("@/assets/logo.png"),
      MAP_DATA: MAP_DATA,
      AGENT_DATA: AGENT_DATA,
      lineupData: LINEUPS_DATA,
    };
  },
  data() {
    return {
      filteredData: [] as LineupsData[],
      selectedMap: MAP_DATA[0],
      selectedAgent: AGENT_DATA[0],
      selectedSites: ["A", "B", "C"],

      drawer: true,
      mini: true,
    };
  },
  methods: {
    filterData() {
      const filterMap = (value: LineupsData) => {
        const selectedMapLabel = this.selectedMap.label;
        const currentMapLabel = ValorantMap[value.map];

        if (selectedMapLabel === undefined) {
          console.log("Selected Map Undefined");
          return false;
        }
        if (currentMapLabel === undefined) {
          console.log("Current Map Undefined");
          return false;
        }

        const modifiedSelectedLabel = selectedMapLabel.toLowerCase().trim();
        const modifiedCurrentLabel = currentMapLabel.toLowerCase().trim();
        const returnValue = modifiedSelectedLabel === modifiedCurrentLabel;
        return returnValue;
      };
      const filterAgent = (value: LineupsData) => {
        const selectedAgentLabel = this.selectedAgent.label;
        const currentAgentLabel = ValorantAgent[value.agent];

        if (selectedAgentLabel === undefined) {
          console.log("Selected Agent Undefined");
          return false;
        }
        if (currentAgentLabel === undefined) {
          console.log("Current Agent Undefined");
          return false;
        }

        const modifiedSelectedLabel = selectedAgentLabel.toLowerCase().trim();
        const modifiedCurrentLabel = currentAgentLabel.toLowerCase().trim();
        const returnValue = modifiedSelectedLabel === modifiedCurrentLabel;
        return returnValue;
      };
      const filterSite = (value: LineupsData) => {
        return this.selectedSites.includes(value.site);
      };

      const freshFilteredData = this.lineupData
        .filter(filterMap)
        .filter(filterAgent)
        .filter(filterSite);
      this.filteredData = freshFilteredData;
      console.log("Data Filtered");
      console.log(freshFilteredData);
      console.log(this.filteredData);
    },
  },
  mounted() {
    const containers = document.querySelectorAll("#draggableParent");
    if (containers.length === 0) {
      return false;
    }
    const sortable = new Sortable(containers, {
      draggable: ".block-draggable",
      mirror: {
        constrainDimensions: true,
      },
      plugins: [Plugins.SortAnimation],
      swapAnimation: {
        horizontal: false,
        duration: 200,
        easingFunction: "ease-in-out",
      },
    });
    sortable.on("sortable:start", () => {
      console.log("sortable:start");
    });
    sortable.on("sortable:sort", () => {
      console.log("sortable:sort");
    });
    sortable.on("sortable:sorted", () => {
      console.log("sortable:sorted");
    });
    sortable.on("sortable:stop", () => {
      console.log("sortable:stop");
    });
  },
});
</script>
<style scoped lang="scss">
#draggableParent > span {
  display: inline-block;
  margin: 10px;
  padding: 30px 60px;
  color: white;
  font-size: 40px;
  border-radius: 20px;
  text-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}
.draggable-source--is-dragging {
  visibility: hidden;
}

.block-draggable {
  align-content: center;
}
</style>
