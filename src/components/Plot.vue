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
import { getSimpleMovingAverage } from "@/utils/movingAverage";

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
      if (!("geolocation" in navigator)) {
        return alert("GPS not available");
      }
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { data } = await api.get("forecast", {
          params: {
            latitude: position.coords.latitude.toFixed(2),
            longitude: position.coords.longitude.toFixed(2),
            hourly: this.property,
          },
        });

        const movingAverage = getSimpleMovingAverage(
          data.hourly[this.property]
        );
        this.traces = [
          {
            x: data.hourly.time,
            y: data.hourly[this.property],
            mode: "markers+lines",
            marker: { size: 2, color: "red" },
            line: { color: "red" },
            name: "Temperature",
          },
          {
            x: data.hourly.time,
            y: movingAverage,
            fillcolor: "primary",
            name: "Moving Average",
            showLegend: false,
            type: "scatter",
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
      });
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
