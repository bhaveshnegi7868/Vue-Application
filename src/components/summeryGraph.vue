
<script>
import { Bar } from 'vue-chartjs'
export default {
  extends: Bar,
  props: {
    reportData: Object
  },
  mounted () {
    var that = this
    that.generateChart()
  },
  methods: {
    generateChart () {
      debugger
      var chartdata = {
        labels: this.reportData.age_range,
        datasets: [{
          label: 'Patient Count',
          backgroundColor: '#6b9840',
          data: this.reportData.count
        }]
      }
      var options = {
        responsive: true,
        maintainAspectRatio: false
      }
      this.renderChart(chartdata, options)
    }
  }
}
</script>
