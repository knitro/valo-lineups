<template>
  <v-card :width="width" class="mx-auto">
    <v-toolbar color="deep-purple">
      <v-toolbar-title class="text-h6 white--text pl-0">
        {{ site }}: {{ label }}
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn color="white" icon>
        <v-icon>mdi-star</v-icon>
      </v-btn>
    </v-toolbar>

    <v-card>
      <v-img :src="locationImage" :width="width"></v-img>
    </v-card>
    <v-card>
      <v-img :src="lineupImage" :width="width"></v-img>
    </v-card>
    <v-card>
      <v-img :src="resultImage" :width="width"></v-img>
    </v-card>
  </v-card>
</template>

<script lang="ts">
import Vue from "vue";
import { PropType } from "vue/types/v3-component-props";

export default Vue.extend({
  name: "InfoCard",
  props: {
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
  },
  data: () => ({}),
});
</script>
