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

        <v-list-item-content>
          <v-list-item-title>Valups</v-list-item-title>
        </v-list-item-content>

        <v-btn icon v-if="!loggedIn" @click="pressLoginButton">
          <v-icon>mdi-login</v-icon>
        </v-btn>
        <v-btn icon v-else @click="pressProfileButton">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-img :src="selectedMap.image" class="map-image"></v-img>
        </v-list-item>
        <v-list-item>
          <v-select
            v-model="selectedMap"
            :items="MAP_DATA"
            label="Map"
            item-text="label"
            return-object
            @change="filterData(true)"
          >
          </v-select>
        </v-list-item>

        <v-list-item>
          <v-img
            :src="selectedMap.image"
            class="map-image"
            gradient="to top right, rgba(255,255,255,1), rgba(255,255,255,1)"
          >
            <v-img
              :src="selectedAgent.image"
              contain
              max-height="126"
              class="agent-display"
            ></v-img>
          </v-img>
        </v-list-item>
        <v-list-item>
          <v-select
            v-model="selectedAgent"
            :items="AGENT_DATA"
            label="Agent"
            item-text="label"
            return-object
            @change="filterData(true)"
          >
          </v-select>
        </v-list-item>

        <v-list-item>
          <v-select
            v-model="selectedSites"
            :items="selectedMap.sites"
            label="Sites"
            item-text="label"
            multiple
            @change="filterData(false)"
          >
          </v-select>
        </v-list-item>

        <v-list-item>
          <v-switch
            v-model="showFavourites"
            @change="favouriteCheck(showFavourites)"
          >
            <template v-slot:label>
              Show Favourites
              <v-icon v-show="!showFavourites">mdi-star-outline</v-icon>
              <v-icon v-show="showFavourites">mdi-star</v-icon>
            </template>
          </v-switch>
        </v-list-item>

        <v-list-item>
          <v-dialog v-model="showAddScreen" max-width="800px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                depressed
                elevation="2"
                raised
                rounded
                v-bind="attrs"
                v-on="on"
              >
                <v-icon left> mdi-plus </v-icon>
                Add Lineup
              </v-btn>
            </template>
            <add-lineup></add-lineup>
          </v-dialog>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-container>
      <v-row no-gutters id="draggableParent">
        <v-col
          v-for="item in filteredData"
          v-bind:key="
            item.map + '-' + item.site + '-' + item.name.replaceAll('', '-')
          "
          class="block-draggable"
          align-self="center"
          style="justify-items: center"
        >
          <info-card
            :id="item.id"
            :width="390"
            :label="item.name"
            :site="item.site"
            :locationImage="item.locationImage"
            :lineupImage="item.lineupImage"
            :resultImage="item.resultImage"
            :isFavourite="favourites.includes(item.id)"
            :favouriteButtonCallback="callbackFavouritePressed"
          ></info-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script lang="ts">
import InfoCard from "@/components/InfoCard.vue";
import AGENT_DATA from "@/data/agents";
import LINEUPS_DATA, { generateTestLineups } from "@/data/lineups/lineups_data";
import { LineupsData } from "@/data/lineups/lineups_interfaces";
import MAP_DATA from "@/data/maps";
import { getNameOrEmail, isLoggedIn } from "@/firebase/auth/auth";
import {
  addToFavourites,
  getFavourites,
  removeFromFavourites,
} from "@/firebase/database/database";
import {
  getLineups,
  getLineupsFavourites,
} from "@/firebase/firestore/firestore";
import router from "@/router";
import { Sortable, Plugins } from "@shopify/draggable";
import Vue from "vue";
import AddLineup from "@/components/AddLineup.vue";

export default Vue.extend({
  name: "HomeView",
  components: { InfoCard, AddLineup },
  data() {
    return {
      logo: require("@/assets/logo.png"),
      MAP_DATA: MAP_DATA,
      AGENT_DATA: AGENT_DATA,
      lineupData: LINEUPS_DATA,

      filteredData: [] as LineupsData[],
      selectedMap: MAP_DATA[0],
      selectedAgent: AGENT_DATA[0],
      selectedSites: ["A", "B", "C"],

      drawer: true,
      mini: true,

      displayName: "",
      loggedIn: false,

      showFavourites: false,
      favourites: [] as string[],

      showAddScreen: false,
    };
  },
  methods: {
    async filterData(resetSites: boolean) {
      const filterMap = (value: LineupsData) => {
        const selectedMapLabel = this.selectedMap.label;
        const currentMapLabel = value.map;

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
        const currentAgentLabel = value.agent;

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

      if (resetSites) {
        this.selectedSites = this.selectedMap.sites;
        this.lineupData = await getLineups(
          this.selectedMap.data,
          this.selectedAgent.data
        );
      }

      const freshFilteredData = this.lineupData
        .filter(filterMap)
        .filter(filterAgent)
        .filter(filterSite);
      this.filteredData = freshFilteredData;
    },
    pressLoginButton() {
      router.push("/login");
    },
    pressProfileButton() {
      router.push("/profile");
    },
    pressAddLineupButton() {
      router.push("/add");
    },

    async favouriteCheck(showFavouritesParam: boolean) {
      if (showFavouritesParam) {
        const favouritesLinesups = await getLineupsFavourites(this.favourites);
        this.filteredData = favouritesLinesups;
      }
    },
    setupFavouritesListener() {
      const callbackFunction = (a: string[]) => {
        this.favourites = a;
      };
      getFavourites(callbackFunction);
    },
    async callbackFavouritePressed(id: string, isFavourited: boolean) {
      console.log("id = " + id + " | isFavourited = " + isFavourited);

      if (isFavourited) {
        let returnBool = await addToFavourites(id);
        const suffix = returnBool ? "Success" : "Failure";
        console.log("Adding Favourite was a " + suffix);
      } else {
        let returnBool = await removeFromFavourites(id);
        const suffix = returnBool ? "Success" : "Failure";
        console.log("Removing Favourite was a " + suffix);
      }
    },
  },
  mounted() {
    // Firebase Login
    this.loggedIn = isLoggedIn();

    // Setup Firebase Favourites if Logged in
    if (this.loggedIn) {
      this.setupFavouritesListener();
    }

    // Name / Email from Firebase
    const retrievedName = getNameOrEmail();
    if (retrievedName !== null) {
      this.displayName = retrievedName;
    }

    // Open up Sidebar
    let setMini = () => {
      this.mini = false;
    };
    setTimeout(function () {
      setMini();
    }, 500);

    // Sortable
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
      distance: 1, // Needs to move at least 1 pixel before triggering. Needed for button pressing on sortable items
    });

    // Sortable Listeners
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

    // Initial Query
    // generateTestLineups();
    this.filterData(true);
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
  margin: 4px;
}

.map-image {
  border-radius: 5px;
}

.agent-display {
  border-radius: 5px;
}
</style>
