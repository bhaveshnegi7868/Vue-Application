<template>
  <div class="q-px-xl q-py-sm">
    <div class="row q-py-sm">
      <q-card class="row col-9 q-mr-lg">
          <div class="col-4 q-pa-sm">
              <input class="input-box full-width"  placeholder="Codeset Name" />
          </div>
          <div class="col-8 q-pa-sm">
              <input class="input-box full-width"  placeholder="Codeset Description" />
          </div>
      </q-card>
      <q-card class="col row">
        <div class="col q-ml-sm q-mr-sm">
          <q-btn outlined icon="delete_forever" class="action-btns full-width" text-color="negative"/>
        </div>
        <div class="col q-ml-sm q-mr-sm">
          <q-btn outlined icon="save" label="Save" class="action-btns full-width" text-color="primary" @click="savedSuccessfully"/>
        </div>
      </q-card>
    </div>
    <div class="row q-my-sm">
      <div class="col-6 row q-mx-auto q-px-xl">
        <div class="col">
          <q-btn class="" color="green" text-color="white" rounded unelevated @click="codesPopup = true" >
            <q-icon class="right-bordered-icon on-left" name="search"/>
            Search Codes
          </q-btn>
        </div>
        <div class="upload-btn-wrapper col">
          <q-btn class="" color="green" text-color="white" rounded unelevated >
            <q-icon class="right-bordered-icon on-left" name="backup"/>
            Upload Codes
          </q-btn>
          <input type="file" name="myfile" />
        </div>
      </div>
    </div>
    <div class="">
      <q-table
      class="my-sticky-header-table text-center"
      :data="data"
      :columns="columns"
      row-key="name"
    >
    <q-tr slot="header" class="table-header-codeset">
      <q-th key="podUpload1">
        <label>Standard Code</label><br>
        <span class="sub-header">Source Code</span>
      </q-th>
      <q-th class="codetDes w30R" key="podUpload2">
        <label>Standard Code Description</label><br>
        <span class="sub-header">Source Code Description</span>
      </q-th>
      <q-th key="podUpload6">
        <label>Standard Vocabulary</label><br>
        <span class="sub-header">Source Vocabulary</span>
      </q-th>
      <q-th key="podUpload3">
        <q-checkbox v-model="exclude" label="Exclude" />
      </q-th>
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
      <q-th key="podUpload2">{{data.row.target_concept_name}}</q-th>

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
            <q-btn outline no-caps class="userName" @click="openDependentpopup(data.row.target_concept_id)" >
              <q-icon name="img:/statics/imgs/group-519.png" size="20px"/>
            </q-btn>
          </div>
        </div>
      </q-th>
      <q-th key="podUpload5">
        <q-btn outline no-caps class="userName" @click="removeCodeFromList(data.row.source_code)">
          <q-icon name="delete_forever" size="23px"/>
        </q-btn>
      </q-th>
    </q-tr>
    </q-table>
    </div>
    <q-dialog
      v-model="codesPopup"
      full-width
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <q-btn dense flat icon="close" v-close-popup class="float-right">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
        <search-codes v-on:selectedChange="handleChange"></search-codes>
      </q-card>
    </q-dialog>
    <q-dialog
      v-model="dependentsPopup"
      full-width
      transition-show="slide-up"
      transition-hide="slide-down"
    >
      <q-card>
        <dependent-codes :desendents="currentDependents" v-on:selectedChange="handleChange"></dependent-codes>
      </q-card>
    </q-dialog>
    </div>
</template>
<script>
import searchCodes from 'pages/searchCodes'
import dependentsCodes from 'pages/dependentCodes'
import dependentJson from '../json/sourcecodewith_descendant_v2.json'
import {
  QTable,
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
    QTh,
    QTr,
    QCard,
    QCheckbox,
    QDialog,
    QTooltip,
    'search-codes': searchCodes,
    'dependent-codes': dependentsCodes
  },
  directives: {
    ClosePopup
  },
  data () {
    return {
      currentDependents: [],
      maximizedToggle: true,
      selected: [],
      codesPopup: false,
      dependentsPopup: false,
      exclude: false,
      dependents: false,
      dependentsJson: dependentJson,
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
          name: 'exclude',
          required: true,
          label: 'Exclude',
          align: 'left',
          field: row => row.exclude,
          format: val => `${val}`,
          sortable: true
        },
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
      value.forEach(function (row) {
        if (that.checkIfCodeInList(row)) {
          row.exclude = false
          row.dependents = false
          that.data.push(row)

          that.$q.notify({
            color: 'black',
            textColor: 'white',
            message: row.target_concept_id + ' has been added successfully.',
            position: 'bottom-right',
            timeout: 3000
          })
        } else {
          that.$q.notify({
            color: 'red',
            textColor: 'white',
            message: row.target_concept_id + ' is already available.',
            position: 'bottom-right',
            timeout: 3000
          })
        }
      })
    },
    checkIfCodeInList (row) {
      var that = this
      // var returnVal = false

      if (that.data.filter(row1 => row1.target_concept_id === row.target_concept_id).length) {
        return false
      } else {
        return true
      }
    },
    handleChange: function (value) {
      this.addToList(value)
    },
    removeAllCodesFromList () {
      this.data = []
    },
    removeCodeFromList (code) {
      var that = this
      var data = that.data.filter(row1 => row1.target_concept_id === code)
      if (data.length > 0) {
        that.data.splice(data[0].__index, 1)
      }
    },
    openDependentpopup (conceptId) {
      var that = this
      that.currentDependents = []
      that.dependentsJson.forEach(function (row) {
        if (row.target_concept_id === conceptId) {
          that.currentDependents = row.descendant
          that.dependentsPopup = true
        }
      })
      if (that.currentDependents.length === 0) {
        that.$q.notify({
          color: 'red',
          textColor: 'white',
          message: 'No Dependents Available For ' + conceptId + '.',
          position: 'bottom-right',
          timeout: 3000
        })
      }
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
    }
  }
}

</script>
