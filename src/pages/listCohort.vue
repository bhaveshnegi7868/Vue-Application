<template>
    <div class="q-pa-xl">
        <div class="">
          <q-table
            :data="data"
            :columns="columns"
            row-key="name"
            :loading="loading"
            :filter="filter"
          >
          <template v-slot:top-left>
            <q-btn-toggle
              v-model="cohartToggle" spread no-caps toggle-color="green"
              color="white"
                text-color="black"
                :options="[
                  {label: 'My Cohort', value: 0},
                  {label: 'All Cohorts', value: 1}
                ]"
                @input="getList"
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
      searchModel: '',
      cohartToggle: 0,
      filter: '',
      loading: true,
      columns: [
        { name: 'cohort_name', field: 'cohort_name', label: 'Cohort name', align: 'left', sortable: true },
        { name: 'Cohortdescription', label: 'Cohort description', field: 'cohort_desc', align: 'left', sortable: true, classes: 'ellipsis', style: 'max-width: 130px' },
        { name: 'Createdby', label: 'Created by', field: 'cohort_created_by', sortable: true, align: 'left' },
        { name: 'Createddate', label: 'Created date', field: 'cohort_created_at', sortable: true },
        { name: 'Executeddate', label: 'Executed date', field: 'cohort_executed_at', sortable: true },
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
      this.$swal({
        title: 'Are you sure?',
        text: 'You want To Delete This Cohart',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          this.deleteCohart(id).then(function (apiResult) {
            debugger
          })
          this.$swal(
            'Deleted!',
            'Cohart Deleted',
            'success'
          )
        }
      })
      // console.log('removeFromList… id:')
      // console.log(id)
      // this.data.splice(id, 1)
    },
    getList () {
      var that = this
      var url = process.env.API_URL + 'cohort/list/'
      that.loading = true
      if (!that.cohartToggle) {
        url += '?username="' + that.$q.sessionStorage.getItem('username') + '"'
      }
      axios.get(url).then(function (response) {
        that.data = response.data.result
        that.loading = false
      })
    },
    readCookie (name) {
      var nameEQ = name + '='
      var ca = document.cookie.split(';')
      for (var i = 0; i < ca.length; i++) {
        var c = ca[i]
        while (c.charAt(0) === ' ') c = c.substring(1, c.length)
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length)
      }
      return null
    },
    deleteCohart (id) {
      console.log(id)
      var url = process.env.API_URL + 'cohort/delete_cohort/'
      var dataToSend = {
        cohort_id: 22
      }
      return axios.delete(url, dataToSend)
    }
  }
}

</script>
