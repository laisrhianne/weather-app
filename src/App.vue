<template>
  <v-app>
    <v-row>
      <v-col cols="2">
        <v-tabs app vertical v-model="tabIndex">
          <v-tab>Temperature</v-tab>
          <v-tab>Precipitation</v-tab>
        </v-tabs>
      </v-col>
    </v-row>

    <v-main>
      <Plot :property="tab" />
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";
import Plot from "@/components/Plot.vue";

export default Vue.extend({
  name: "App",

  components: { Plot },

  data: () => ({
    tabIndex: 0,
  }),

  methods: {},

  computed: {
    tab: function () {
      return this?.tabIndex === 0 ? "temperature_2m" : "precipitation";
    },
  },
});
</script>
