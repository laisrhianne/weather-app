<template>
  <v-container>
    <v-row>
      <v-col>
        <Plotly :data="traces" :layout="layout" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from "vue";
import { Plotly } from "vue-plotly";
import { api } from "@/api";

export default Vue.extend({
  name: "Plot",

  components: { Plotly },

  props: {
    property: String,
  },

  data: () => ({
    traces: [],
    layout: {},
  }),

  methods: {
    fetchData: async function () {
      const { data } = await api.get("forecast", {
        params: {
          latitude: -5.89,
          longitude: -35.18,
          hourly: this.property,
        },
      });
      this.traces = [
        {
          x: data.hourly.time,
          y: data.hourly["temperature_2m"],
          mode: "markers+lines",
          marker: { size: 2, color: "red" },
          line: { color: "red" },
          name: "Temperature",
        },
      ];
      this.layout = {
        showlegend: false,
        margin: {
          l: 50,
          r: 50,
          b: 50,
          t: 50,
        },
        xaxis: {
          showticklabels: true,
        },
        yaxis: {
          showticklabels: true,
        },
      };
    },
  },

  created: async function () {
    await this.fetchData();
  },

  watch: {
    property: async function () {
      await this.fetchData();
    },
  },
});
</script>
