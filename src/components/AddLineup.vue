<template>
  <div>
    <v-row no-gutters>
      <v-col cols="6">
        <v-card class="grid-margin">
          <v-card-title>Add a Lineup</v-card-title>
          <v-list-item>
            <v-text-field
              label="Lineup Name"
              v-model="currentName"
              hint="The name of your lineup (Eg. Default Plant from A Main)"
              filled
              @change="updateName"
            ></v-text-field>
          </v-list-item>

          <v-list-item>
            <v-img
              :src="currentMap.image"
              class="map-image"
              max-height="90"
            ></v-img>
          </v-list-item>
          <v-list-item>
            <v-select
              v-model="currentMap"
              :items="MAP_DATA"
              label="Map"
              item-text="label"
              return-object
              @change="updateMap"
            >
            </v-select>
          </v-list-item>

          <v-list-item>
            <v-img
              :src="currentMap.image"
              class="map-image"
              max-height="90"
              gradient="to top right, rgba(255,255,255,1), rgba(255,255,255,1)"
            >
              <v-img
                :src="currentAgent.image"
                contain
                max-height="90"
                class="agent-display"
              ></v-img>
            </v-img>
          </v-list-item>

          <v-list-item>
            <v-select
              v-model="currentAgent"
              :items="AGENT_DATA"
              label="Agent"
              item-text="label"
              return-object
              @change="updateAgent"
            >
            </v-select>
          </v-list-item>

          <v-list-item>
            <v-select
              v-model="currentSite"
              :items="currentMap.sites"
              label="Site"
              item-text="label"
              @change="updateSite"
            >
            </v-select>
          </v-list-item>

          <v-list-item>
            <v-text-field
              label="Location Image URL"
              v-model="currentLocationImage"
              hint="The position where you need to lineup"
              filled
              @change="updateLocationImage"
            ></v-text-field>
          </v-list-item>

          <v-list-item>
            <v-text-field
              label="Lineup Image URL"
              v-model="currentLineupImage"
              hint="Where you need to aim from the position"
              filled
              @change="updateLineupImage"
            ></v-text-field>
          </v-list-item>

          <v-list-item>
            <v-text-field
              label="Result Image URL"
              v-model="currentResultImage"
              hint="Where the lineup lands"
              filled
              @change="updateResultImage"
            ></v-text-field>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col cols="6">
        <info-card
          :id="item.id"
          :width="390"
          :label="item.name"
          :site="item.site"
          :locationImage="item.locationImage"
          :lineupImage="item.lineupImage"
          :resultImage="item.resultImage"
          :isFavourite="false"
          :favouriteButtonCallback="() => {}"
          class="grid-margin"
        ></info-card>
        <v-card class="grid-margin">
          <v-btn
            depressed
            elevation="2"
            raised
            @click="pressAddLineupButton"
            x-large
            block
            dark
            color="deep-purple"
          >
            <v-icon left> mdi-plus </v-icon>Add Lineup</v-btn
          >
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import router from "@/router";
import AGENT_DATA from "@/data/agents";
import MAP_DATA from "@/data/maps";
import {
  LineupsData,
  ValorantAgent,
  ValorantMap,
} from "@/data/lineups/lineups_interfaces";
import InfoCard from "@/components/InfoCard.vue";
import { createLineup } from "@/firebase/firestore/firestore";

export default Vue.extend({
  name: "AddLineup",
  components: {
    InfoCard,
  },
  setup() {
    return {
      MAP_DATA: MAP_DATA,
      AGENT_DATA: AGENT_DATA,
    };
  },
  data() {
    return {
      currentMap: MAP_DATA[0],
      currentSite: "A" as "A" | "B" | "C",
      currentAgent: AGENT_DATA[0],
      currentName: "",
      currentLocationImage: "",
      currentLineupImage: "",
      currentResultImage: "",

      item: {
        id: "0", // Arbitrary
        map: ValorantMap.ASCENT,
        site: "A",
        agent: ValorantAgent.ASTRA,
        name: "Name Here",
        locationImage: "",
        lineupImage: "",
        resultImage: "",
      } as LineupsData,

      fabHidden: false,
    };
  },
  // mounted() {},
  methods: {
    updateMap() {
      this.item.map = this.currentMap.data;
    },
    updateSite() {
      this.item.site = this.currentSite;
    },
    updateAgent() {
      this.item.agent = this.currentAgent.data;
    },
    updateName() {
      this.item.name = this.currentName;
    },
    updateLocationImage() {
      this.item.locationImage = this.currentLocationImage;
    },
    updateLineupImage() {
      this.item.lineupImage = this.currentLineupImage;
    },
    updateResultImage() {
      this.item.resultImage = this.currentResultImage;
    },
    goToHome() {
      router.push("/home");
    },
    pressAddLineupButton() {
      createLineup(this.item);
    },
  },
});
</script>

<style scoped lang="scss">
.grid-margin {
  margin: 20px;
}
</style>
