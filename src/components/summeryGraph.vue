
<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  data: () => ({
    chartdata: {
      labels: ['0-20', '21-30', '31-40', '41-50', '51-60', '60+'],
      datasets: [
        {
          label: 'Patient count',
          backgroundColor: '#6b9840',
          data: [14503, 48343, 58011, 91852, 159532, 111189]
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
