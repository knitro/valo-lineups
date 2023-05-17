<template>
  <v-card :width="width" class="mx-auto">
    <v-toolbar color="deep-purple">
      <v-toolbar-title class="text-h6 white--text pl-0">
        {{ site }}: {{ label }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn
        color="white"
        icon
        @click="favouriteButtonCallback(id, !isFavourite)"
      >
        <v-icon v-show="!isFavourite">mdi-star-outline</v-icon>
        <v-icon v-show="isFavourite">mdi-star</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card>
      <v-img :src="locationImage" :width="width" :height="(width / 16) * 9">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>
    </v-card>
    <v-card>
      <v-img :src="lineupImage" :width="width" :height="(width / 16) * 9">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>
    </v-card>
    <v-card>
      <v-img :src="resultImage" :width="width" :height="(width / 16) * 9">
        <template v-slot:placeholder>
          <div class="d-flex align-center justify-center fill-height">
            <v-progress-circular
              color="grey-lighten-4"
              indeterminate
            ></v-progress-circular>
          </div>
        </template>
      </v-img>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue/types/v3-component-props";

export default Vue.extend({
  name: "InfoCard",
  props: {
    id: {
      type: String,
      required: true,
    },
    width: {
      type: Number,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    site: {
      type: String as PropType<"A" | "B" | "C">,
      required: true,
    },
    locationImage: {
      type: String,
      required: true,
    },
    lineupImage: {
      type: String,
      required: true,
    },
    resultImage: {
      type: String,
      required: true,
    },
    isFavourite: {
      type: Boolean,
      required: true,
    },
    favouriteButtonCallback: {
      type: Function as PropType<(id: string, isFavourited: boolean) => void>,
      required: true,
    },
  },
  data: () => ({}),
});
</script>
