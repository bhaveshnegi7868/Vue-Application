
<script>
import { Pie } from 'vue-chartjs'
export default {
  extends: Pie,
  data: () => ({
    chartdata: {
      labels: ['20-40', '41-50', '51-60', '61-70', '70+'],
      datasets: [
        {
          label: 'Patient count',
          backgroundColor: ['#6b9840', '#92ba46', '#a7c83c', '#388e0c', '#75e00e', '#75e00e'],
          data: [19341, 62342, 104185, 184513, 50047, 5]
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
