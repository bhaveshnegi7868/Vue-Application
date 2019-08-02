<template>
    <div class="q-pa-xl">
        <div class="">
          <q-table
            :data="data"
            :columns="columns"
            row-key="name"
          >
          <template v-slot:top-left>
            <q-btn-toggle
              v-model="model" spread no-caps toggle-color="green"
              color="white"
                text-color="black"
                :options="[
                  {label: 'My Cohort', value: 'one'},
                  {label: 'All Cohorts', value: 'two'}
                ]"
              >
            </q-btn-toggle>
          </template>
          <template v-slot:top-right>
              <q-input class="float-right" borderless dense debounce="300" v-model="filter" placeholder="">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
              <router-link to="/create">
                <q-btn color="green pull-left float-right" text-color="white" glossy unelevated icon="add" label="Create Cohort" />
              </router-link>
          </template>
          <q-td slot="body-cell-Cohortname" slot-scope="row" :props="row">
          <router-link to="/create/">{{row.row.Cohortname1}}</router-link>
            </q-td>
          <q-td slot="body-cell-Actions" slot-scope="props" :props="props">
              <q-btn round color="green" size="0.5rem" icon="file_copy" ></q-btn>
              <q-btn round color="green" size="0.5rem" icon="delete_outline" @click="removeFromList(props.row.__index);"></q-btn>
            </q-td>
          </q-table>
        </div>
    </div>
  </template>
<script>
import axios from 'axios'
import {
  QBtnToggle,
  QTable,
  QInput,
  QTd
} from 'quasar'
export default {
  name: 'listCohort',
  components: {
    QInput,
    QBtnToggle,
    QTable,
    QTd
  },
  data () {
    return {
      model: 'one',
      searchModel: '',
      columns: [
        { name: 'Cohortname', field: 'Cohortname1', label: 'Cohort name', align: 'left', sortable: true },
        { name: 'Cohortdescription', label: 'Cohort description', field: 'Cohortdescription', align: 'left', sortable: true },
        { name: 'Createdby', label: 'Created by', field: 'Createdby', sortable: true, align: 'left' },
        { name: 'Createddate', label: 'Created date', field: 'Createddate', sortable: true },
        { name: 'Executeddate', label: 'Executed date', field: 'Executeddate', sortable: true },
        { name: 'Status', label: 'Status', field: 'Status', sortable: true },
        { name: 'Actions', label: 'Actions', field: 'Actions' }
      ],
      data: [
        {
          Cohortname1: 'CHD with CV events',
          Cohortdescription: 'Diagnosed with unstable angina or Myocardial Infarction (MI)',
          Createdby: 'Muthu R',
          Createddate: '01-Jul-19',
          Executeddate: '16-Jul-19',
          Status: 'Completed',
          Actions: '14%'
        }
      ]
    }
  },
  mounted () {
    var that = this
    that.getList()
  },
  methods: {
    removeFromList: function (id) {
      console.log('removeFromList… id:')
      console.log(id)
      this.data.splice(id, 1)
    },
    getList() {
      axios.post(process.env.API_URL+'accounts/login/', datadict).then(function(response) {
    }
  }
}

</script>
