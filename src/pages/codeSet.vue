<template>
  <div class="q-px-xl q-py-sm">
    <div class="row q-py-sm">
      <q-card class="row col-11 q-mr-sm">
          <div class="col-3 q-pa-xs">
              <input class="input-box full-width" v-model="baseObj.codeset_name" placeholder="Codeset Name" />
          </div>
          <div class="col-6 q-pa-xs">
              <input class="input-box full-width" v-model="baseObj.codeset_desc" placeholder="Codeset Description" />
          </div>
          <div class="col createCodesetForm q-pa-xs">
              <q-btn-dropdown
                  v-if="renderComponent1"
                  flat
                  no-caps
                  class="full-width f12 q-py-xs select-box"
                  :label="baseObj.codeset_group ? baseObj.codeset_group : 'Codeset Group'"
                  @click="getCodesetGroupList"
                >
                <q-btn
                  color="primary"
                  class="full-width"
                  icon-right="add"
                  label="Add New Codeset Group"
                  @click="openCreateCodesetGroupPopup"
                  v-close-popup
                />
                <div class="options-values" v-for="opt in codesetGroups" v-bind:key="opt.name" @click="makeSelected('codeset_group',opt.name)">
                  {{opt.name}}
                </div>
              </q-btn-dropdown>
          </div>
      </q-card>
      <q-card class="col codeSetActionbtns row">
        <div class="col q-ml-sm q-mr-sm q-py-xs">
          <q-btn outlined icon="autorenew" class="action-btns f10 full-width" text-color="negative" @click="getCodesetDict">
            <q-tooltip>
              Reset
            </q-tooltip>
          </q-btn>
        </div>
        <div class="col q-ml-sm q-mr-sm q-py-xs" v-if="pagemethod != 'update'">
          <q-btn outlined icon="save" class="action-btns f10 full-width" text-color="primary" @click="saveCodeset">
            <q-tooltip>
              Save
            </q-tooltip>
          </q-btn>
        </div>
        <div class="col q-ml-sm q-mr-sm q-py-xs" v-if="pagemethod == 'update'">
          <q-btn outlined icon="save" class="action-btns f10 full-width" text-color="primary" @click="saveCodeset">
            <q-tooltip>
              Update
            </q-tooltip>
          </q-btn>
        </div>
      </q-card>
    </div>
    <div class="row q-my-sm">
      <div class="col-6 row q-mx-auto q-px-xl">
        <div class="col q-px-lg">
          <q-btn class="q-mx-lg" color="theamGreen" text-color="white" rounded unelevated @click="codesPopup = true" >
            <q-icon class="right-bordered-icon on-left" name="search"/>
            Search Codes
          </q-btn>
        </div>
        <div class="upload-btn-wrapper col">
          <q-btn class="q-mx-lg" color="theamGreen" text-color="white" rounded unelevated >
            <q-icon class="right-bordered-icon on-left" name="backup"/>
            Upload Codes
          </q-btn>
          <input type="file" name="myfile" />
        </div>
      </div>
    </div>
    <div class="">
      <q-table
      v-if="renderComponent"
      class="my-sticky-header-table codesetDataTable text-center"
      :data="baseObj.codeset_data"
      :columns="columns"
      row-key="name"
    >
    <q-tr slot="header" class="table-header-codeset">
      <q-th key="podUpload1">
        <label>Standard Code</label><br>
        <span class="sub-header fc-theamGreen ">Source Code</span>
      </q-th>
      <q-th class="codetDes w30R" key="podUpload2">
        <label>Standard Code Description</label><br>
        <span class="sub-header fc-theamGreen">Source Code Description</span>
      </q-th>
      <q-th key="podUpload6">
        <label>Standard Vocabulary</label><br>
        <span class="sub-header fc-theamGreen">Source Vocabulary</span>
      </q-th>
      <!--<q-th key="podUpload3">
        <q-checkbox v-model="exclude" label="Exclude" />
      </q-th>-->
      <q-th key="podUpload4">
        <q-checkbox v-model="dependents" label="Dependents" />
      </q-th>
      <q-th key="podUpload5">
        <q-btn outline no-caps class="userName" @click="removeAllCodesFromList()">
          <q-icon name="delete_forever" size="23px"/>
        </q-btn>
      </q-th>
    </q-tr>
    <q-tr slot="body" slot-scope="data" :props="data">
      <q-th key="podUpload1">{{data.row.target_concept_id}}</q-th>
      <q-th key="podUpload2" class="ellipsis" style="max-width: 200px">{{data.row.target_concept_name}}</q-th>

      <q-th key="podUpload6"> - </q-th>
      <q-th key="podUpload3">
        <label class="checkbox-container">
          <input type="checkbox" v-model="data.row.exclude"/>
          <span class="checkmark"></span>
        </label>
      </q-th>
      <q-th key="podUpload4">
        <div class="row">
          <div class="col" style="margin-top: 12px;">
            <label class="checkbox-container">
              <input type="checkbox" v-model="data.row.dependents"/>
              <span class="checkmark"></span>
            </label>
          </div>
          <div class="col">
            <q-btn outline no-caps class="userName" @click="openDependentpopup(data.row)" >
              <q-icon name="img:/statics/imgs/group-519.png" size="20px"/>
            </q-btn>
          </div>
        </div>
      </q-th>
      <q-th key="podUpload5">
        <q-btn outline no-caps class="userName" @click="removeCodeFromList(data.row.target_concept_id)">
          <q-icon name="delete_forever" size="23px"/>
        </q-btn>
      </q-th>
    </q-tr>
    </q-table>
    </div>
    <q-dialog
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
          <q-card-section class="row items-center">
              <div class="float-rights">
              <q-btn icon="img:/statics/imgs/closeModal.png" flat round dense v-close-popup ></q-btn>
              </div>
            </q-card-section>
        <dependent-codes :desendents="currentDependents" @updateDependents="updateDependents"></dependent-codes>
      </q-card>
    </q-dialog>
    <q-dialog v-model="createCodesetGroupPopup">
        <q-card style="width: 700px; max-width: 80vw;">
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
  QTh,
  QTr,
  QCard,
  QCheckbox,
  QDialog,
  QTooltip,
  ClosePopup,
  QCardSection
} from 'quasar'
export default {
  name: 'listCohort',
  components: {
    QTable,
    QTh,
    QTooltip,
    QTr,
    QCard,
    QCheckbox,
    QDialog,
    QCardSection,
    'search-codes': searchCodes,
    'dependent-codes': dependentsCodes,
    'create-cohort-group': createCohortGroup
  },
  directives: {
    ClosePopup
  },
  data () {
    return {
      baseObj: {},
      renderComponent: true,
      renderComponent1: true,
      currentDependents: [],
      codesetGroups: [],
      maximizedToggle: true,
      selected: [],
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
          label: 'Dependents',
          align: 'left',
          field: row => row.dependents,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'Action', label: 'Action', align: 'right', field: 'action', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
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
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    removeFromList: function (id) {
      console.log('removeFromList… id:')
      console.log(id)
      this.data.splice(id, 1)
    },
    addToList (value) {
      var that = this
      var selectedCodes = []
      value.forEach(function (row) {
        if (that.checkIfCodeInList(row)) {
          selectedCodes.push(row.concept_code)
        } else {
          that.$q.notify({
            color: 'red',
            textColor: 'white',
            message: row.concept_code + ' is already available.',
            position: 'bottom-right',
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
          that.$q.notify({
            color: 'red',
            textColor: 'white',
            message: row.target_concept_id + ' is added successfully',
            position: 'bottom-right',
            timeout: 3000
          })
        })
        that.codesPopup = false
        that.$q.loading.hide()
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
      this.baseObj.codeset_data = []
      that.renderComponent = false
      setTimeout(function () {
        that.$nextTick(() => {
          // Add the component back in
          that.renderComponent = true
        })
      }, 100)
    },
    removeCodeFromList (code) {
      var that = this
      var data = that.baseObj.codeset_data.filter(row1 => row1.target_concept_id === code)
      if (data.length > 0) {
        that.baseObj.codeset_data.splice(data[0].__index, 1)
      }
      that.renderComponent = false
      setTimeout(function () {
        that.$nextTick(() => {
          // Add the component back in
          that.renderComponent = true
        })
      }, 100)
    },
    openDependentpopup (row) {
      var that = this
      that.currentRow = row
      let conceptId = row.target_concept_id
      that.currentDependents = []
      var url = process.env.API_URL + 'codeset/descendents/' + conceptId
      axios.get(url).then(function (response) {
        that.currentDependents = response.data.result.children
        that.dependentsPopup = true
      }).catch(function () {
        that.$q.notify({
          color: 'red',
          textColor: 'white',
          message: 'No Dependents Available For ' + conceptId + '.',
          position: 'bottom-right',
          timeout: 3000
        })
      })
    },
    savedSuccessfully () {
      var that = this
      that.$q.notify({
        color: 'green',
        textColor: 'white',
        message: 'Code Set Saved Successfully',
        position: 'bottom-right',
        timeout: 3000
      })
    },
    openCreateCodesetGroupPopup () {
      this.createCodesetGroupPopup = false
      this.createCodesetGroupPopup = true
    },
    addCodeset (group) {
      var that = this
      var url = process.env.API_URL + 'codeset/group/create'
      that.$q.loading.show()
      var datadict = {
        name: group.name,
        description: group.description,
        created_by: that.$q.sessionStorage.getItem('username')
      }
      axios.post(url, datadict).then(function (response) {
        that.createCodesetGroupPopup = false
        that.$q.loading.hide()
      }).catch(function (err) {
        that.$q.loading.hide()
        that.$q.notify({
          color: 'black',
          textColor: 'white',
          message: err.message,
          position: 'bottom-right',
          timeout: 3000
        })
      })
    },
    getCodesetGroupList () {
      var that = this
      var url = process.env.API_URL + 'codeset/group/list/'
      axios.get(url).then(function (response) {
        that.codesetGroups = response.data.result
        that.loading = false
      })
    },
    saveCodeset () {
      var that = this
      that.$q.loading.show()
      var url = process.env.API_URL + 'codeset/create/'
      var method
      var message = 'Codeset Created Successfully'
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
          color: 'green',
          textColor: 'white',
          message: message,
          timeout: 3000
        })
        that.$q.loading.hide()
        if (response.data.codeset_id) {
          that.$router.push('/codeset/update/' + response.data.codeset_id)
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
    getCodesetDict () {
      var that = this
      var url = process.env.API_URL + 'codeset/get/' + that.codeset_id
      that.$q.loading.show()
      axios.get(url).then(function (response) {
        that.baseObj = response.data
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
    updateDependents (response) {
      var that = this
      that.currentRow.dependentsList = response
    }
  }
}

</script>
