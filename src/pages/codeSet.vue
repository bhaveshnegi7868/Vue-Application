<template>
  <div class="q-px-xl q-py-sm codeSetPage">
    <div class="row q-py-sm">
      <q-card class="row col q-mr-sm">
          <div class="col-2 q-pa-xs">
            <span id="input-name">
              <input class="input-box full-width" v-model="baseObj.codeset_name" v-on:blur="codenamecheck(baseObj.codeset_name)" placeholder="Codeset Name" />
            </span>
          </div>
          <div class="col-5 q-pa-xs" style="width: 45%;">
              <input class="input-box full-width" v-model="baseObj.codeset_desc" placeholder="Codeset Description" />
          </div>
          <div class="col-4 q-px-sm q-py-xs">
            <span id="input-group">
              <q-select
                use-input
                hide-selected
                fill-input
                transition-show="jump-down"
                transition-hide="jump-up"
                v-model="baseObj.codeset_group"
                :options="codesetGroups"
                @focus="getCodesetGroupList"
                class="bor8R f12 select-box"
                @filter="codesetGroupfilterFn"
                Placeholder="Codeset Group"
              />
            </span>
          </div>
          <!-- <div class="col q-px-sm q-py-xs">
            <q-btn-dropdown
                  v-if="renderComponent1"
                  flat
                  no-caps
                  class=" full-width f12 q-py-xs select-box"
                  :label="baseObj.codeset_group ? baseObj.codeset_group : 'Codeset Group'"
                  @click="getCodesetGroupList"
                >
                <q-btn
                  color="theamBlue"
                  class="full-width"
                  icon-right="add"
                  label="Add New Codeset Group"
                  @click="openCreateCodesetGroupPopup"
                  v-close-popup
                />
                <div class="options-values" v-for="opt in codesetGroups" v-bind:key="opt.name" @click="makeSelected('codeset_group',opt.name)">
                  {{opt.name}}
                </div>
            </q-btn-dropdown> -->
              <div class="q-px-xs q-py-xs ">
                <q-btn
                  color="theamBlue"
                  class="f10 bor8R w2R q-pa-none q-ma-none"
                  icon="add"
                  @click="openCreateCodesetGroupPopup"
                >
                <q-tooltip>
                  Create Codeset Group
                </q-tooltip>
                </q-btn>
              </div>
      </q-card>
      <q-card class="w7R codeSetActionbtns row">
        <div class="col-3 q-ml-xs q-mr-xs q-py-xs">
          <q-btn outlined icon="autorenew" class="action-btns f10 full-width" text-color="negative" @click="reset">
            <q-tooltip>
              Reset
            </q-tooltip>
          </q-btn>
        </div>
        <div class="col q-ml-xs q-mr-xs q-py-xs" v-if="pagemethod != 'update'">
          <q-btn outlined icon="save" label="Save"  :disable="!(baseObj.codeset_name && error_message && baseObj.codeset_group && tableflag)" class="action-btns f10 full-width" text-color="primary" @click="saveCodeset" ></q-btn>
            <q-tooltip>
              Save
            </q-tooltip>
        </div>
        <div class="col q-ml-xs q-mr-xs q-py-xs" v-if="pagemethod == 'copy'">
          <q-btn outlined icon="update" label="Update" :disable="!(baseObj.codeset_name && error_message && tableflag)" class="action-btns f10 full-width" text-color="primary" @click="saveCodeset">
            <q-tooltip>
              Update
            </q-tooltip>
          </q-btn>
        </div>
        <div class="col q-ml-xs q-mr-xs q-py-xs" v-if="pagemethod == 'update'">
          <q-btn outlined icon="update" :disable="!(baseObj.codeset_name && error_message && baseObj.codeset_data.length !== 0)" label="Update" class="action-btns f10 full-width" text-color="primary" @click="saveCodeset">
            <q-tooltip>
              Update
            </q-tooltip>
          </q-btn>
        </div>
      </q-card>
    </div>
    <div class="row q-my-sm">
      <div class="col-7 row q-mx-auto q-px-xl">
        <div class="col q-px-lg">
          <q-btn class="" color="theamBlue" text-color="white" rounded unelevated @click="codesPopup = true" >
            <q-icon class="right-bordered-icon on-left" name="search"/>
            Search Codes
          </q-btn>
        </div>
        <div class="upload-btn-wrapper">
          <q-btn class="q-mx hover-upload"  color="theamBlue" text-color="white" rounded unelevated style="cursor:pointer !important;">
            <q-icon class="right-bordered-icon on-left" name="backup"/>
            <input type="file" style="" ref="file" name="myfile" accept=".csv" @input="updateFile" />
            Upload Codes
          </q-btn>
          <q-btn class="hover-upload"  @click="downloadTemplate()" text-color="white" rounded unelevated style="cursor:pointer !important;">
            <q-icon name="img:/statics/imgs/layout.png" size="18px"/>
            <q-tooltip anchor="center right" self="center left" :offset="[10, 10]">Download sample file</q-tooltip>
          </q-btn>
        </div>
        </div>
      </div>
    <div class="">
      <q-table
      v-if="renderComponent"
      class="my-sticky-header-table codesetDataTable text-center"
      :data="baseObj.codeset_data"
      :columns="columns"
      :pagination.sync="pagination"
      row-key="dependents"
      :selected-rows-label="getSelectedString"
      selection="multiple"
      :selected.sync="selected"
    >
    <q-tr  slot="header" class="table-header-codeset">
      <q-th key="podUpload1" class="sortable">
        <label>Standard code</label><br>
        <span class="sub-header fc-theamBlue ">Source code</span>
      </q-th>
      <q-th class="codetDes w30R" key="podUpload2">
        <label>Standard code description</label><br>
        <span class="sub-header fc-theamBlue">Source code description</span>
      </q-th>
      <q-th key="podUpload6" >
        <label>Standard vocabulary</label><br>
        <span class="sub-header fc-theamBlue">Source vocabulary</span>
      </q-th>
      <!--<q-th key="podUpload3">
        <q-checkbox v-model="exclude" label="Exclude" />
      </q-th>-->
      <q-th key="podUpload4" >
        <q-checkbox toggle-indeterminate v-model="allDependents" @input="checkAll($event)" label="Descendants" />
      </q-th>
      <q-th key="podUpload5" class="w4R">
        <q-btn outline no-caps class="codeSetdelete" @click="removeAllCodesFromList()">
          <q-btn name="delete_forever" round color="theamBlue" icon="delete_outline" :disable="(!(baseObj.codeset_data) || (baseObj.codeset_data).length == 0)" size="0.8rem"></q-btn>
          <q-tooltip>Delete</q-tooltip>
        </q-btn>
      </q-th>
    </q-tr>
    <q-tr slot="body" slot-scope="data" :props="data">
      <q-th key="podUpload1">
        {{data.row.target_concept_id}}<br>
        <span class="f10 fc-theamBlue">{{data.row.source_concept_code}}</span>
      </q-th>
      <q-th key="podUpload2" class="ellipsis" style="max-width: 200px">{{data.row.target_concept_name}}<br>
      <span class="f10 fc-theamBlue">{{data.row.source_concept_name}}</span></q-th>
      <q-th key="podUpload6"> {{data.row.target_concept_vocab_id}}<br>
      <span class="f10 fc-theamBlue">{{data.row.source_concept_vocab_id}}</span> </q-th>
      <q-th key="podUpload4">
        <div class="row">
          <div class="col-8 row q-mx-auto">
            <div class="col codeSetPage" >
              <label class="checkbox-container">
                <q-checkbox v-model="data.row.dependents" @input="getDependents(data.row, $event)"/>
              </label>
            </div>
            <div class="col dependentsIcon">
              <q-btn outline no-caps class="" @click="openDependentpopup(data.row)" >
                <q-icon name="img:/statics/imgs/group-519.png" size="16px"/>
              </q-btn>
            </div>
          </div>
        </div>
      </q-th>
      <q-th key="podUpload5">
        <q-btn outline no-caps class="codeSetdelete" @click="removeCodeFromList(data.row.target_concept_id)">
          <q-btn name="delete_forever" round color="theamBlue" icon="delete_outline" size="0.6rem" />
          <q-tooltip>Delete</q-tooltip>
        </q-btn>
      </q-th>
    </q-tr>
    </q-table>
    </div>
    <q-dialog
      class="searchcodePopup"
      v-model="codesPopup"
      full-width
      full-height
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
          <div class="close-btn">
            <q-btn icon="img:/statics/imgs/closeModal.png" flat round dense v-close-popup ></q-btn>
          </div>
          <search-codes @selectedChange="handleChange"></search-codes>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dependentsPopup"
      full-width
      full-height
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
              <div class="close-btn">
              <q-btn icon="img:/statics/imgs/closeModal.png" flat round dense v-close-popup ></q-btn>
              </div>
        <dependent-codes :desendents="currentDependents" :ticked="currentSelected" @updateDependents="updateDependents"></dependent-codes>
      </q-card>
    </q-dialog>
    <q-dialog v-model="createCodesetGroupPopup">
        <q-card style="width: 700px; max-width: 80vw;">
          <div class="close-btn">
          <q-btn icon="img:/statics/imgs/closeModal.png" flat round dense v-close-popup ></q-btn>
          </div>
          <create-cohort-group name="codeset" @addCohort="addCodeset"></create-cohort-group>
        </q-card>
      </q-dialog>
    </div>
</template>
<script>
import createCohortGroup from 'components/createCohortGroup'
import searchCodes from 'pages/searchCodes'
import dependentsCodes from 'pages/dependentCodes'
import dependentJson from '../json/sourcecodewith_descendant_v2.json'
import axios from 'axios'
import {
  QTable,
  QSelect,
  QTh,
  QTr,
  QCard,
  QCheckbox,
  QDialog,
  QTooltip,
  ClosePopup
} from 'quasar'
export default {
  name: 'listCohort',
  components: {
    QTable,
    QSelect,
    QTh,
    QTooltip,
    QTr,
    QCard,
    QCheckbox,
    QDialog,
    'search-codes': searchCodes,
    'dependent-codes': dependentsCodes,
    'create-cohort-group': createCohortGroup
  },
  directives: {
    ClosePopup
  },
  data () {
    return {
      pagemethod: '',
      ticked: [],
      baseObj: {},
      pagination: {
        rowsPerPage: 10
      },
      url: 'http://10.14.11.136:8006/api/v1/codeset/download/csv/',
      renderComponent: true,
      renderComponent1: true,
      currentSelected: [],
      error_message: true,
      currentDependents: [],
      allDependents: false,
      currentDependentsList: [],
      codes_list: [],
      concept_id_check: {},
      table_list: [],
      codesetGroups: [],
      maximizedToggle: true,
      selected: [],
      tableflag: false,
      codesetGroupfilter: '',
      decendentChildFlags: [],
      codesPopup: false,
      dependentsPopup: false,
      exclude: false,
      dependents: false,
      createCodesetGroupPopup: false,
      dependentsJson: dependentJson,
      currentRow: {},
      columns: [
        {
          name: 'target_concept_id',
          required: true,
          label: 'Standard Code',
          align: 'left',
          field: row => row.target_concept_id,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'target_concept_name', align: 'center', label: 'Standard Code Description', field: 'description', sortable: true },
        { name: 'target_concept_vocabulary', align: 'center', label: 'Standard Vocabulary', field: 'vocabulary', sortable: true },
        {
          name: 'dependents',
          required: true,
          label: 'Descendants',
          align: 'center',
          classes: 'w7R',
          field: row => row.dependents,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'Action', label: 'Action', align: 'center', field: 'action', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      data: []
    }
  },
  mounted () {
    var that = this
    that.codeset_id = that.$route.params.codeset_id
    that.pagemethod = that.$route.params.method
    if (that.codeset_id) {
      that.getCodesetDict()
    }
  },
  methods: {
    downloadTemplate () {
      axios({
        method: 'get',
        url: this.url,
        responseType: 'arraybuffer'
      })
        .then(response => {
          this.forceFileDownload(response)
        })
        .catch(() => console.log('error occured'))
    },
    forceFileDownload (response) {
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'Sample Template.csv')
      document.body.appendChild(link)
      link.click()
    },
    reset () {
      var that = this
      if (that.codeset_id) {
        that.getCodesetDict()
      } else {
        that.baseObj = {}
      }
    },
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    removeFromList: function (id) {
      this.data.splice(id, 1)
    },
    addToList (value) {
      var that = this
      var selectedCodes = []

      value.forEach(function (row) {
        if (that.checkIfCodeInList(row)) {
          var code = row.concept_code + row.vocabulary_id
          selectedCodes.push(code)
        } else {
          that.$q.notify({
            color: 'red',
            textColor: 'white',
            message: row.concept_code + ' Already Exists.',
            timeout: 3000
          })
        }
      })
      if (selectedCodes.length) {
        that.gatherStandardCodes(selectedCodes)
      }
    },
    gatherStandardCodes (selectedCodes) {
      var that = this
      var url = process.env.API_URL + 'codeset/codes/addtolist/'
      that.$q.loading.show()
      if (that.baseObj.codeset_data === undefined) {
        that.baseObj.codeset_data = []
      }
      axios.post(url, { 'codes': selectedCodes }).then(function (response) {
        response.data.result.forEach(function (row) {
          row.exclude = false
          row.dependents = false
          that.baseObj.codeset_data.push(row)
        })
        response.data.decendent_child_flags.forEach(function (val) {
        })
        that.codesPopup = false
        that.renderComponent = false
        setTimeout(function () {
          that.$nextTick(() => {
            that.renderComponent = true
          })
        }, 100)
        that.$q.loading.hide()
      }).catch(function () {
        that.$q.loading.hide()
      })
    },
    checkIfCodeInList (row) {
      var that = this
      if (that.baseObj.codeset_data === undefined) {
        return true
      }
      if (that.baseObj.codeset_data.filter(row1 => row1.source_concept_code === row.concept_code).length) {
        return false
      } else {
        return true
      }
    },
    handleChange: function (value) {
      this.addToList(value)
      this.table_list = value
      if (value[0].tabledata === false) {
        this.tableflag = true
      }
    },
    makeSelected (type, name) {
      var that = this
      that.renderComponent1 = false
      that.baseObj[type] = name
      setTimeout(function () {
        that.$nextTick(() => {
          // Add the component back in
          that.renderComponent1 = true
        })
      }, 100)
    },
    removeAllCodesFromList () {
      var that = this
      if ((this.baseObj.codeset_data).length > 0) {
        this.$swal({
          backdrop: true,
          allowOutsideClick: false,
          title: 'Are you sure?',
          text: 'You want To Delete all',
          type: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Delete'
        }).then((result) => {
          if (result.value) {
            this.baseObj.codeset_data = []
            that.renderComponent = false
            setTimeout(function () {
              that.$nextTick(() => {
              // Add the component back in
                that.tableflag = false
                that.renderComponent = true
              })
            }, 100)
          }
        })
      }
    },
    removeAllCodesFromList2 () {
    },
    checkAll (event) {
      var that = this
      let list = []
      that.baseObj.codeset_data.forEach(function (value, key) {
        list.push(that.baseObj.codeset_data[key].target_concept_id)
      })
      if (event) {
        that.allDependents = true
      } else {
        that.allDependents = false
        that.currentSelected = []
      }
      that.baseObj.codeset_data.forEach(function (row) {
        if (event) {
          row.dependents = true
        } else {
          row.dependents = false
        }
      })
      var url = process.env.API_URL + 'codeset/descendents/?codes=' + JSON.stringify(list) + '&checkall=' + that.allDependents
      axios.get(url).then(function (response) {
        response.data.result.forEach(function (value, key) {
          value.code_list.push(value.hierarchy.Code)
          that.concept_id_check[value.hierarchy.Code] = value.code_list
          that.currentSelected = value.code_list
        })
      }).catch(function () {

      })
    },
    removeCodeFromList (code) {
      var that = this
      this.$swal({
        backdrop: true,
        allowOutsideClick: false,
        title: 'Are you sure?',
        text: 'You want to delete this code',
        type: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Delete'
      }).then((result) => {
        if (result.value) {
          var data = that.baseObj.codeset_data.filter(row1 => row1.target_concept_id === code)
          if (data.length > 0) {
            that.baseObj.codeset_data.splice(data[0].__index, 1)
          }
          that.renderComponent = false
          setTimeout(function () {
            that.$nextTick(() => {
              if (that.baseObj.codeset_data.length === 0) {
                that.tableflag = false
              }
              that.renderComponent = true
            })
          }, 100)
          that.$swal(
            'Deleted!',
            'Code Deleted',
            'success'
          )
        }
      })
    },
    // checkDpendanceAll (row) {
    //   var that = this
    //   that.currentRow = row
    //   that.currentDependents = []
    //   that.currentSelected = row.dependentsCodes || []
    //   var selectedCodes = ['35622281', '35622307', '35622308', '35622310', '35622286', '73574']
    //   var checkall = true
    //   var url = process.env.API_URL + 'codeset/descendents/?checkall=' + checkall
    //   selectedCodes.forEach(function (value) {
    //     url += '&codes=' + value
    //   })
    //   axios.get(url).then(function (response) {
    //     that.currentDependents[0] = response.data.result
    //     that.currentDependentsList = response.data.result.codes_list
    //     that.dependentsPopup = true
    //   }).catch(function () {

    //   })
    // },
    openDependentpopup (row) {
      var that = this
      that.currentRow = row
      that.currentDependents = []
      var checkall = false
      var url = process.env.API_URL + 'codeset/descendents/?codes=' + that.currentRow.target_concept_id + '&checkall=' + checkall
      axios.get(url).then(function (response) {
        that.currentDependents[0] = response.data.result.hierarchy
        that.currentDependentsList = response.data.result.code_list
        if (that.currentDependents[0] !== undefined) {
          that.currentDependentsList.push(that.currentRow.target_concept_id)
          that.dependentsPopup = true
        } else {
          that.$q.notify({
            color: 'black',
            textColor: 'white',
            message: 'No descendants found',
            timeout: 1300
          })
        }
      }).catch(function () {

      })
    },
    savedSuccessfully () {
    },
    getDependents (row, event) {
      var that = this
      that.currentRow = row
      var checkall = false
      if (event) {
        var url = process.env.API_URL + 'codeset/descendents/?codes=' + that.currentRow.target_concept_id + '&checkall=' + checkall
        axios.get(url).then(function (response) {
          that.codes_list = response.data.result.code_list
          if (that.codes_list !== undefined || that.allDependents === true) {
            that.codes_list.push(that.currentRow.target_concept_id)
            that.concept_id_check[that.currentRow.target_concept_id] = that.codes_list
            that.currentSelected = that.codes_list
          } else {
            that.codes_list = []
          }
        }).catch(function () {
        })
        that.table_list.forEach(function (value, key) {
          if (that.currentRow.target_concept_id === that.table_list[key].concept_id) {
            that.table_list[key].tabledata = true
          }
        })
      } else {
        that.currentSelected = []
        that.concept_id_check[that.currentRow.target_concept_id] = []
        that.table_list.forEach(function (value, key) {
          if (that.currentRow.target_concept_id === that.table_list[key].concept_id) {
            that.table_list[key].tabledata = false
          }
        })
      }
      that.isAllDescendantsSelected()
      // let checkData = that.table_list.filter(data => { return data.tabledata === true })
      // if (checkData.length !== that.table_list.length) {
      //   that.allDependents = null
      // } else if (checkData.length === 0) {
      //   that.allDependents = false
      // } else {
      //   that.allDependents = true
      // }
      that.$forceUpdate()
    },
    openCreateCodesetGroupPopup () {
      this.createCodesetGroupPopup = false
      this.createCodesetGroupPopup = true
    },
    addCodeset (group) {
      var that = this
      var url = process.env.API_URL + 'codeset/group/create'
      var datadict = {
        name: group.name,
        description: group.description,
        created_by: that.$q.sessionStorage.getItem('username')
      }
      axios.post(url, datadict).then(function (response) {
        that.createCodesetGroupPopup = false
        that.$swal(
          'Done !',
          'Created successfully',
          'success'
        )
      }).catch(function () {
        that.$q.notify({
          color: 'theamBlue',
          textColor: 'white',
          message: 'Codeset group already exists',
          position: 'bottom-right',
          timeout: 3000
        })
      })
    },
    getCodesetGroupList () {
      var that = this
      var url = process.env.API_URL + 'codeset/group/list/'
      axios.get(url).then(function (response) {
        var arr = []
        response.data.result.forEach(function (row) {
          arr.push(row.name)
        })
        that.codesetGroups = arr
        that.loading = false
      })
    },
    saveCodeset () {
      var that = this
      that.$q.loading.show()
      var url = process.env.API_URL + 'codeset/create/'
      var method
      var message = 'Codeset Created Successfully'
      that.baseObj.codeset_data.forEach(function (value, key) {
        that.baseObj.codeset_data[key].dependentsCodes = that.concept_id_check[value.target_concept_id]
      })
      that.baseObj['created_by'] = that.$q.sessionStorage.getItem('username')
      if (that.pagemethod === 'update') {
        url = process.env.API_URL + 'codeset/update/'
        method = axios.put(url, that.baseObj)
        message = 'Codeset Updated Successfully'
      } else {
        that.baseObj.codeset_id = null
        method = axios.post(url, that.baseObj)
      }
      method.then(function (response) {
        that.$q.notify({
          color: 'blue',
          textColor: 'white',
          message: message,
          timeout: 3000
        })
        that.$q.loading.hide()
        if (response.data.codeset_id) {
          that.$router.push('/codeset/update/' + response.data.codeset_id)
          that.codeset_id = response.data.codeset_id
          that.pagemethod = 'update'
          that.getCodesetDict(that.codeset_id)
        }
      }).catch(function (err) {
        that.$q.loading.hide()
        that.$q.notify({
          color: 'black',
          textColor: 'white',
          message: err.response.data.message,
          timeout: 3000
        })
      })
    },
    codesetGroupfilterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.codesetGroups = this.codesetGroups.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    getCodesetDict () {
      var that = this
      var url = process.env.API_URL + 'codeset/get/' + that.codeset_id
      that.$q.loading.show()
      axios.get(url).then(function (response) {
        that.baseObj = response.data
        if (that.pagemethod === 'copy') {
          that.baseObj.codeset_name = ''
          that.baseObj.codeset_id = null
        }
        that.$q.loading.hide()
      }).catch(function () {
        that.$q.loading.hide()
        that.$q.notify({
          color: 'black',
          textColor: 'white',
          message: 'Reset Failed',
          timeout: 3000
        })
      })
    },
    isAllDescendantsSelected () {
      let flag = this.baseObj.codeset_data.map(el => {
        return el.dependents
      })
      if (flag.indexOf(null) === -1 && flag.indexOf(false) === -1) {
        this.allDependents = true
      } else if (flag.indexOf(null) === -1 && flag.indexOf(true) === -1) {
        this.allDependents = false
      } else {
        this.allDependents = null
      }
    },

    updateDependents (response) {
      var that = this
      that.currentSelected = response
      that.currentSelected = [...new Set(that.currentSelected)]
      if (that.currentSelected.length === 0) {
        that.currentRow.dependents = false
      } else {
        if (that.currentSelected.length === that.currentDependentsList.length) {
          that.currentRow.dependents = true
          // that.allDependents = null
        } else {
          that.currentRow.dependents = null
          // that.allDependents = null
        }
      }
      that.isAllDescendantsSelected()
      // that.currentSelected.push(that.currentRow.target_concept_id)
      // that.concept_id_check[that.currentRow.target_concept_id] = that.currentSelected
      // if (response.length === 0) {
      //   console.log('Inside If')
      //   that.currentRow.dependents = false
      // } else if (that.currentDependentsList.length === response.length) {
      //   console.log('Inside Else If')
      //   that.currentRow.dependents = true
      // } else {
      //   console.log('Inside Else If else')
      //   that.currentRow.dependents = null
      // }
      that.dependentsPopup = false
    },
    codenamecheck (name) {
      var that = this
      if (that.pagemethod !== 'update') {
        var codesetName = name
        var url = process.env.API_URL + 'codeset/name/validation/?name=' + codesetName
        var method = axios.get(url, codesetName)
        method.then(function (response) {
          that.error_message = true
        }).catch(function () {
          that.error_message = false
          that.$q.notify({
            color: 'red',
            textColor: 'white',
            message: 'Codeset name already exists',
            timeout: 1000
          })
        })
      }
    },
    updateFile () {
      var that = this
      let curFile = that.$refs.file.files[0]
      let formData = new FormData()
      formData.append('File', curFile)
      var url = process.env.API_URL + 'codeset/codes/upload/'
      that.$q.loading.show()
      if (that.baseObj.codeset_data === undefined) {
        that.baseObj.codeset_data = []
      }
      axios.post(url, formData).then(function (response) {
        response.data.matched_upload_codes.forEach(function (row) {
          row.exclude = false
          row.dependents = false
          if (that.checkIfCodeInList(row)) {
            that.baseObj.codeset_data.push(row)
          }
        })
        that.renderComponent = false
        setTimeout(function () {
          that.$nextTick(() => {
            that.renderComponent = true
            that.tableflag = true
          })
        }, 100)
        that.$q.loading.hide()
        that.$q.notify({
          color: 'black',
          textColor: 'white',
          message: 'File Uploaded Successfully',
          timeout: 3000
        })
      }).catch(function (err) {
        that.$q.loading.hide()
        that.$q.notify({
          color: 'black',
          textColor: 'white',
          message: err.response.data.message,
          timeout: 3000
        })
      })
    }
  }
}

</script>
