
<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['Data1', 'Data2', 'data3', 'Data4', 'Data5'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: 'green',
          data: [60, 45, 40, 10, 70, 5]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  }),

  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>
