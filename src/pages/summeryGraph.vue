<template>
    <div class="mar10T cohort_body">
    <div class="row green">
      Patient Demographics Summarys
    </div>
    <template>
      <div class="small">
        <bar :chart-data="datacollection"></bar>
        <button @click="fillData()">Randomize</button>
      </div>
    </template>
    </div>
  </template>
<script>
import {
  Bar
}
  from 'vue-chartjs'
export default {
  components: { Bar },
  extends: Bar,
  props: ['data'],
  mounted: function () {
    this.renderChart(this.datacollection, this.options)
  },
  data () {
    return {
      datacollection: {
        labels: ['A', 'B', 'C'],
        datasets: [{
          label: ['One', 'Two', 'Three'],
          backgroundolor: ['RED', 'Green', 'Blue'],
          data: [30, 20, 50]
        }]
      },
      options: {
        title: {
          display: true,
          text: 'some title'
        }
      }
    }
  }
}

</script>
