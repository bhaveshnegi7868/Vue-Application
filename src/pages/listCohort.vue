<template>
    <div class="q-pa-xl">
        <div class="">
          <q-table
            :data="data"
            :columns="columns"
            row-key="name"
            :loading="loading"
            :filter="filter"
            :pagination.sync="pagination"
            binary-state-sort
          >
          <template v-slot:top-left >
            <q-btn-toggle
              v-model="cohortToggle" spread no-caps toggle-color="green"
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
          <template v-slot:top-right >
              <el-input v-model="filter" class="w23R searchBox q-mx-sm" placeholder="Search">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </el-input>
              <router-link to="/cohort/create/" class="cretebtn q-ml-sm w12R">
                <q-btn color="green pull-left float-right" text-color="white" glossy unelevated icon="add" label="Create Cohort" />
              </router-link>
          </template>
          <q-td slot="body-cell-cohort_name" slot-scope="row" :props="row" >
            <router-link  :to="'/cohort/view/' + row.row.cohort_id" >
              {{row.row.cohort_name}}
            </router-link >
          </q-td>
          <q-td  slot="body-cell-analysis_data" slot-scope="row" :props="row" >
            <router-link v-if="(row.row.status) && !(row.row.an_status == 'Pending') && !(row.row.an_status == 'SUCCESS') && !(row.row.an_status == 'Warning') && !(row.row.an_status == 'to_be_run') && !(row.row.an_status == 'Failed')"  :to="'/cohort/analysis/' + row.row.cohort_id" >
              <q-btn  size="10px"  style="width: 72px;background: #3f868a !important;" text-color="white" no-caps >Create</q-btn>
            </router-link >
            <router-link v-if="(row.row.status) && (row.row.an_status == 'Pending')"  :to="'/cohort/view/analysis/' + row.row.cohort_id" >
              <q-btn  size="10px" style="width: 72px;background: #b7a931 !important;" text-color="white" no-caps>Pending</q-btn>
            </router-link >
            <router-link v-if="(row.row.status) && (row.row.an_status == 'SUCCESS')"  :to="'/cohort/summary/analysis/' + row.row.cohort_id" >
              <q-btn  size="10px" style="width: 72px;background: #6b9840 !important;" text-color="white" no-caps>Success</q-btn>
            </router-link >
            <router-link v-if="(row.row.status) && (row.row.an_status == 'to_be_run')"  :to="'/cohort/view/analysis/' + row.row.cohort_id" >
              <q-btn  size="10px" style="width: 72px;background: #3f868a !important;" text-color="white" no-caps>Saved</q-btn>
              <q-tooltip>Analysis Data Definition is Saved, Please run to generate the Summary</q-tooltip>
            </router-link >
            <q-icon v-if="((row.row.cohort_status === 'SUCCESS') || ((row.row.cohort_status === 'Pending'))) && (row.row.analysis_status === 'Warning' )" name="warning" class="text-red" style="font-size: 20px;" >
              <q-tooltip>Cohort definition got updated, please run again to reflect the recent changes.</q-tooltip>
            </q-icon>
            <router-link  v-if="((row.row.cohort_status === 'SUCCESS') || ((row.row.cohort_status === 'Pending'))) && (row.row.analysis_status === 'Warning')" :to="'/cohort/summary/analysis/' + row.row.cohort_id" >
              <q-btn :disable="!(row.row.cohort_status === 'SUCCESS')" size="10px"  style="background: #6b9840 !important;margin-right:2em" text-color="white" no-caps>Success</q-btn>
            </router-link >
            <router-link v-if="(row.row.status) && (row.row.an_status == 'Failed')"  :to="'/cohort/view/analysis/' + row.row.cohort_id" >
              <q-btn  size="10px" style="width: 72px;background: #f44336 !important;" text-color="white" no-caps>Failed</q-btn>
            </router-link>
          </q-td>
          <q-td class="tabledataEditbtn" slot="body-cell-Actions" slot-scope="props" :props="props">
              <q-btn v-if="!cohortToggle || superuser" round color="theamGreen" size="0.5rem" icon="edit" @click="editCohort(props.row.cohort_id)">
                <q-tooltip>
                  Edit
                </q-tooltip>
              </q-btn>
              <q-btn round color="theamGreen" size="0.5rem" icon="file_copy" @click="copyCohort(props.row.cohort_id)">
                <q-tooltip>
                  Copy
                </q-tooltip>
              </q-btn>
              <q-btn v-if="!cohortToggle || superuser" round color="red" size="0.5rem" icon="delete_outline" @click="removeFromList(props.row.cohort_id);">
                <q-tooltip>
                  Delete
                </q-tooltip>
              </q-btn>
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
  QTooltip,
  QTd
} from 'quasar'
export default {
  name: 'listCohort',
  components: {
    QBtnToggle,
    QTable,
    QTooltip,
    QTd
  },
  data () {
    return {
      sizes: [ 'xs', 'sm', 'md', 'lg', 'xl' ],
      searchModel: '',
      cohortToggle: 0,
      filter: '',
      status: false,
      an_status: '',
      loading: true,
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        { name: 'cohort_name', field: 'cohort_name', label: 'Cohort name', align: 'left', sortable: true },
        { name: 'Cohortdescription', label: 'Cohort description', field: 'cohort_desc', align: 'left', sortable: true, classes: 'w25R ellipsis', style: 'max-width: 130px' },
        { name: 'Createdby', label: 'Created by', field: 'cohort_created_by', sortable: true, align: 'left' },
        { name: 'Createddate', label: 'Created date', field: 'cohort_created_at', sortable: true, align: 'left' },
        { name: 'Executeddate', label: 'Executed date', field: 'cohort_executed_at', sortable: true, align: 'left' },
        { name: 'Status', label: 'Status', field: 'cohort_status', sortable: true, align: 'left' },
        { name: 'analysis_data', label: 'Analysis Data', field: 'analysis_data', sortable: true, align: 'center' },
        { name: 'Actions', label: 'Actions', field: 'Actions' }
      ],
      data: [],
      superuser: false
    }
  },
  mounted () {
    var that = this
    that.superuser = that.$q.localStorage.getItem('is_superuser')
    that.getList()
  },
  methods: {
    removeFromList: function (id) {
      var that = this
      this.$swal({
        backdrop: true,
        allowOutsideClick: false,
        title: 'Are you sure?',
        text: 'You want To Delete This Cohort',
        type: 'error',
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          this.deleteCohort(id).then(function (apiResult) {
            that.$swal(
              'Deleted!',
              'Cohort Deleted',
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
      if (!that.cohortToggle) {
        url = process.env.API_URL + 'cohort/mycohorts/'
        // url += '?username=' + that.$q.sessionStorage.getItem('username')
      }
      axios.get(url).then(function (response) {
        console.log(response)
        that.data = response.data.result
        that.data.forEach(function (el) {
          el['status'] = el.cohort_status === 'SUCCESS'
          if (el.analysis_status === 'Pending') {
            el['an_status'] = 'Pending'
          }
          if (el.analysis_status === 'SUCCESS') {
            el['an_status'] = 'SUCCESS'
          }
          if (el.analysis_status === 'Warning') {
            el['an_status'] = 'Warning'
          }
          if (el.analysis_status === 'To be run') {
            el['an_status'] = 'to_be_run'
          }
          if (el.analysis_status === 'Failed') {
            el['an_status'] = 'Failed'
          }
        })
        that.loading = false
      }).catch(function () {
        that.data = []
        that.loading = false
      })
    },
    copyCohort (id) {
      this.$router.push('/cohort/copy/' + id)
    },
    editCohort (id) {
      this.$router.push('/cohort/update/' + id)
    },
    deleteCohort (id) {
      var url = process.env.API_URL + 'cohort/delete/' + id
      return axios.delete(url)
    }
  }
}

</script>
