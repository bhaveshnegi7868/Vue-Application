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
              <router-link to="/cohort/create/">
                <q-btn color="green pull-left float-right" text-color="white" glossy unelevated icon="add" label="Create Cohort" />
              </router-link>
          </template>
          <q-td slot="body-cell-Cohortname" slot-scope="row" :props="row">
          <router-link to="cohort/create/">{{row.row.Cohortname1}}</router-link>
            </q-td>
          <q-td slot="body-cell-Actions" slot-scope="props" :props="props">
              <q-btn v-if="!cohartToggle" round color="green" size="0.5rem" icon="edit" @click="editCohart(props.row.cohort_id)"></q-btn>
              <q-btn round color="green" size="0.5rem" icon="file_copy" @click="copyCohart(props.row.cohort_id)"></q-btn>
              <q-btn v-if="!cohartToggle" round color="green" size="0.5rem" icon="delete_outline" @click="removeFromList(props.row.cohort_id);"></q-btn>
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
      data: []
    }
  },
  mounted () {
    var that = this
    that.getList()
  },
  methods: {
    removeFromList: function (id) {
      var that = this
      this.$swal({
        title: 'Are you sure?',
        text: 'You want To Delete This Cohart',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          this.deleteCohart(id).then(function (apiResult) {
            that.$swal(
              'Deleted!',
              'Cohart Deleted',
              'success'
            )
            that.getList()
          }).catch(function () {
            that.$swal({
              title: 'Deletion Failed',
              type: 'warning'
            })
          })
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
        url = process.env.API_URL + 'cohort/mycohorts/'
        // url += '?username=' + that.$q.sessionStorage.getItem('username')
      }
      axios.get(url).then(function (response) {
        that.data = response.data.result
        that.loading = false
      }).catch(function () {
        that.data = []
        that.loading = false
      })
    },
    copyCohart (id) {
      this.$router.push('/cohort/copy/' + id)
    },
    editCohart (id) {
      this.$router.push('/cohort/update/' + id)
    },
    deleteCohart (id) {
      var url = process.env.API_URL + 'cohort/delete/' + id
      return axios.delete(url)
    }
  }
}

</script>
