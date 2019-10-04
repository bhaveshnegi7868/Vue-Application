<template>
    <div class="q-pa-xl codeSetPage" >
        <div v-if="errmsg" style="text-align: center; color: red; font-size: 16px;">
          Please select Codeset
        </div>
        <div class="">
          <q-table
            :data="data"
            :columns="columns"
            row-key="name"
            class="codeSetlist"
            :filter="filter"
            :pagination.sync="pagination"
          >
          <template v-slot:top-left>
            <q-btn-toggle
              v-model="codesetToggle" spread no-caps toggle-color="blue"
              color="white"
                text-color="black"
                :options="[
                  {label: 'My Codeset', value: 0},
                  {label: 'All Codesets', value: 1}
                ]"
                @input="getList"
              >
            </q-btn-toggle>
          </template>
          <template v-slot:top-right >
            <div class="row full-width">
              <el-input v-model="filter" class="col h2-5R searchBox q-ml-lg" placeholder="Search">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </el-input>
              <router-link v-if="!allowImport" to="/codeset/create" class="cretebtn col-4">
                <q-btn color="blue pull-left h2-5R float-right" text-color="white" glossy unelevated icon="add" label="Create Codeset" />
              </router-link>
              <router-link v-if="allowImport" to="/codeset/create" class="cretebtn col-4" target="_blank" v-close-popup>
                <q-btn color="blue pull-left h2-5R float-right" text-color="white" glossy unelevated icon="add" label="Create Codeset" />
              </router-link>
              </div>
          </template>
          <q-td slot="body-cell-Codesetname" slot-scope="row" :props="row">
            <router-link to="/codeset">{{row.row.Codesetname1}}</router-link>
          </q-td>
            <q-td class="tabledataEditbtn" slot="body-cell-Actions" slot-scope="props" :props="props">
                <q-btn v-if="(!codesetToggle || superuser) && allowImport==false" round color="theamBlue" size="0.5rem" icon="edit" @click="editCodeset(props.row.codeset_id)"></q-btn>
                <q-btn v-if="(!codesetToggle || superuser) && allowImport==false" round color="theamBlue" size="0.5rem" icon="file_copy" @click="copyCodeset(props.row.codeset_id)"></q-btn>
                <q-btn v-if="(!codesetToggle || superuser) && allowImport==false" round color="red" size="0.5rem" icon="delete_outline" @click="removeFromList(props.row.codeset_id);"></q-btn>
                <q-checkbox v-if="allowImport" v-model="props.row.selected"/>
            </q-td>
          </q-table>
        </div>
        <div class="footer" v-if="allowImport">
          <q-btn  class="q-ma-md" color="grey-9"  label="Cancel" v-close-popup></q-btn>
          <q-btn  class="q-ma-md" color="theamBlue" label="Import" @click="sendDataToParent"></q-btn>
        </div>
    </div>
  </template>
<script>
import axios from 'axios'
import {
  QBtnToggle,
  QTable,
  QTd,
  QCheckbox,
  ClosePopup
} from 'quasar'
export default {
  name: 'listCodeset',
  components: {
    QBtnToggle,
    QTable,
    QTd,
    QCheckbox
  },
  directives: {
    ClosePopup
  },
  data () {
    return {
      filter: '',
      errmsg: false,
      loading: true,
      codesetToggle: 0,
      searchModel: '',
      pagination: {
        rowsPerPage: 10
      },
      columns: [
        { name: 'codeset_name', field: 'codeset_name', label: 'Codeset name', align: 'left', sortable: true },
        { name: 'codeset_desc', label: 'Codeset description', field: 'codeset_desc', align: 'left', sortable: true, classes: 'ellipsis w20R' },
        { name: 'codeset_group', label: 'Codeset group', field: 'codeset_group', sortable: true, align: 'center' },
        { name: 'codeset_created_by', label: 'Created by', field: 'codeset_created_by', sortable: true, align: 'center' },
        { name: 'codeset_created_at', label: 'Created date', field: 'codeset_created_at', sortable: true, align: 'center' },
        { name: 'Actions', label: 'Actions', field: 'Actions', align: 'center' }
      ],
      data: [],
      superuser: false
    }
  },
  props: {
    allowImport: Boolean
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
        title: 'Are you sure?',
        text: 'You want To Delete This Codeset',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          this.deleteCodeset(id).then(function (apiResult) {
            that.$swal(
              'Deleted!',
              'Codeset Deleted',
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
    },
    getList () {
      var that = this
      var url = process.env.API_URL + 'codeset/list/'
      that.data = []
      that.loading = true
      if (!that.codesetToggle) {
        url = process.env.API_URL + 'codeset/mycodeset/'
      }
      that.$q.loading.show()
      axios.get(url).then(function (response) {
        response.data.result.forEach(function (row) {
          row.selected = false
          that.data.push(row)
        })
        that.$q.loading.hide()
      }).catch(function () {
        that.data = []
        that.loading = false
      })
    },
    copyCodeset (id) {
      debugger
      this.$router.push('/codeset/copy/' + id)
    },
    editCodeset (id) {
      this.$router.push('/codeset/update/' + id)
    },
    deleteCodeset (id) {
      var url = process.env.API_URL + 'codeset/delete/' + id
      return axios.delete(url)
    },
    sendDataToParent () {
      var that = this
      var arrayToSend = []
      that.data.forEach(function (row) {
        if (row.selected) {
          arrayToSend.push(row)
        }
      })
      if (arrayToSend.length >= 1) {
        this.$emit('addImports', arrayToSend)
      } else {
        that.errmsg = true
        setTimeout(function () { that.errmsg = false }, 3000)
      }
    }
  }
}

</script>
