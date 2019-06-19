<template>
    <div class="mar10T row cohort_body">

      <div class="col-2">
      <q-btn-toggle
          v-model="model" spread no-caps toggle-color="green"
          color="white"
            text-color="black"
            :options="[
              {label: 'My Cohort', value: 'one'},
              {label: 'All Cohorts', value: 'two'}
            ]"
          ></q-btn-toggle>
        </div>
      <div class="cohort_list-Table  ">
        <div class="q-pa-md">
          <q-table
            :data="data"
            :columns="columns"
            row-key="name"
          ></q-table>
        </div>
      </div>
    </div>
  </template>
<script>
import {
  QBtnToggle,
  QTable
} from 'quasar'
export default {
  name: 'listCohort',
  components: {
    QBtnToggle,
    QTable
  },
  data () {
    return {
      model: 'one',
      columns: [
        { name: 'Cohortname', field: 'Cohortname', label: 'Cohort name', align: 'left', sortable: true },
        { name: 'Cohortdescription', label: 'Cohort description', field: 'Cohortdescription', align: 'left', sortable: true },
        { name: 'Createdby', label: 'Created by', field: 'Createdby', sortable: true, align: 'left' },
        { name: 'Createddate', label: 'Created date', field: 'Createddate', sortable: true },
        { name: 'Executeddate', label: 'Executed date', field: 'Executeddate', sortable: true },
        { name: 'Status', label: 'Status', field: 'Status', sortable: true },
        { name: 'Actions', label: 'Actions', field: 'Actions' }
      ],
      data: [
        {
          Cohortname: 'RA patients with specific drugs',
          Cohortdescription: 'RA patients taking market basket drugs',
          Createdby: 'Swetank Gupta',
          Createddate: '21-Mar-19',
          Executeddate: '21-Mar-19',
          Status: 'Processing',
          Actions: '14%'
        },
        {
          Cohortname: 'Severe Asthma and Urticaria Cohort',
          Cohortdescription: 'Identify Chronic Urticaria patients who also have Severe Asthma',
          Createdby: 'Swetank Gupta',
          Createddate: '04-Nov-18',
          Executeddate: '04-Nov-18',
          Status: 'Completed',
          Actions: '8%'
        },
        {
          Cohortname: 'Out Patient Cohort',
          Cohortdescription: 'Analyse OP patients drug share by Source of Business',
          Createdby: 'Varsha',
          Createddate: '09-Jun-18',
          Executeddate: '23-Oct-18',
          Status: 'Failed',
          Actions: '6%'
        },
        {
          Cohortname: 'Severe Urticaria Cohort',
          Cohortdescription: 'Identify Chronic Urticaria patients who also have Severe Asthma',
          Createdby: 'Swetank Gupta',
          Createddate: '04-Aug-18',
          Executeddate: '09-Nov-18',
          Status: 'Failed',
          Actions: '8%'
        },
        {
          Cohortname: 'Severe Asthma  Cohort',
          Cohortdescription: 'Identify Chronic Urticaria patients who also have Severe Asthma',
          Createdby: 'Rubesh Gupta',
          Createddate: '16-Oct-18',
          Executeddate: '04-Nov-18',
          Status: 'Completed',
          Actions: '8%'
        },
        {
          Cohortname: 'Severe  Cohort',
          Cohortdescription: 'Identify Chronic Urticaria patients who also have Severe Asthma',
          Createdby: 'Saranya Gupta',
          Createddate: '04-Nov-18',
          Executeddate: '10-Dec-18',
          Status: 'Completed',
          Actions: '8%'
        }
      ]
    }
  }
}

</script>
