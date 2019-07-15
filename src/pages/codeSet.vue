<template>
    <div class="q-px-xl q-py-sm">
        <div class="row q-py-sm">
        <q-card class="row col-9 q-mr-lg">
            <div class="col-3 q-pa-sm">
                <input class="input-box full-width"  placeholder="Cohort Name" />
            </div>
            <div class="col-6 q-pa-sm">
                <input class="input-box full-width"  placeholder="Cohort Description" />
            </div>
            <div class="col q-pa-sm">
                <select class="select-box full-width"   placeholder="Cohort Group">
                  <option disabled>Cohort Group</option>
                  <option v-for="opt in cGrpOpts" v-bind:key="opt.value" :value="opt.value">
                    {{opt.label}}
                  </option>
                </select>
            </div>
        </q-card>
        <q-card class="col row">
          <div class="col-2 q-ml-sm q-mr-sm">
            <q-btn outlined icon="delete_forever" class="action-btns full-width" text-color="negative"/>
          </div>
          <div class="col q-ml-sm q-mr-sm">
            <q-btn outlined icon="save" label="Save" class="action-btns full-width" text-color="primary"/>
          </div>
          <div class="col q-ml-sm q-mr-sm">
            <q-btn outlined icon="play_circle_filled" label="Run" class="action-btns full-width" text-color="positive"/>
          </div>
        </q-card>
        </div>
        <div class="row q-my-sm">
          <div class="col-6 q-mx-auto q-px-xl">
            <q-btn class="q-mx-xl" color="green" text-color="white" rounded unelevated @click="codesPopup = true" >
              <q-icon class="right-bordered-icon on-left" name="search"/>
              Search Codes
            </q-btn>
            <div class="upload-btn-wrapper">
              <q-btn class="q-mx-xl" color="green" text-color="white" rounded unelevated >
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
          <q-th key="podUpload2">
            <label>Standard Code Description</label><br>
            <span class="sub-header">Source Code Description</span>
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
          <q-th key="podUpload1">{{data.row.code}}</q-th>
          <q-th key="podUpload2">{{data.row.description}}</q-th>
          <q-th key="podUpload3"><q-checkbox v-model="data.row.exclude"/></q-th>
          <q-th key="podUpload4">
            <q-checkbox v-model="data.row.dependents"/>
            <q-btn outline no-caps class="userName" @click="dependentsPopup = true" >
              <q-icon name="img:/statics/imgs/group-519.png" size="20px"/>
            </q-btn>
          </q-th>
          <q-th key="podUpload5">
            <q-btn outline no-caps class="userName" @click="removeCodeFromList(data.row.code)">
              <q-icon name="delete_forever" size="23px"/>
            </q-btn>
          </q-th>
        </q-tr>
        </q-table>
        </div>
        <q-dialog
          v-model="codesPopup"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
        <q-card>
            <q-bar class="text-right">
              <q-space />
              <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>
            <search-codes v-on:selectedChange="handleChange"></search-codes>
          </q-card>
        </q-dialog>
        <q-dialog
          v-model="dependentsPopup"
          persistent
          :maximized="maximizedToggle"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
        <q-card>
            <q-bar class="text-right">
              <q-space />
              <q-btn dense flat icon="minimize" @click="maximizedToggle = false" :disable="!maximizedToggle">
                <q-tooltip v-if="maximizedToggle" content-class="bg-white text-primary">Minimize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="crop_square" @click="maximizedToggle = true" :disable="maximizedToggle">
                <q-tooltip v-if="!maximizedToggle" content-class="bg-white text-primary">Maximize</q-tooltip>
              </q-btn>
              <q-btn dense flat icon="close" v-close-popup>
                <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
              </q-btn>
            </q-bar>
            <dependent-codes v-on:selectedChange="handleChange"></dependent-codes>
          </q-card>
        </q-dialog>
    </div>
  </template>
<script>
import searchCodes from 'pages/searchCodes'
import dependentsCodes from 'pages/dependentCodes'
import {
  QTable,
  QTh,
  QTr,
  QCard,
  QBar,
  QCheckbox,
  QDialog,
  QTooltip,
  ClosePopup,
  QSpace
} from 'quasar'
export default {
  name: 'listCohort',
  components: {
    QTable,
    QBar,
    QTh,
    QTr,
    QCard,
    QCheckbox,
    QDialog,
    QTooltip,
    QSpace,
    'search-codes': searchCodes,
    'dependent-codes': dependentsCodes
  },
  directives: {
    ClosePopup
  },
  data () {
    return {
      maximizedToggle: true,
      selected: [],
      codesPopup: false,
      dependentsPopup: false,
      exclude: false,
      dependents: false,
      columns: [
        {
          name: 'code',
          required: true,
          label: 'Standard Code',
          align: 'left',
          field: row => row.code,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'description', align: 'center', label: 'Standard Code Description', field: 'description', sortable: true },
        {
          name: 'exclude',
          required: true,
          label: 'Exclude',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        {
          name: 'dependents',
          required: true,
          label: 'Dependents',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'Action', label: 'Action', align: 'right', field: 'action', sortable: true, sort: (a, b) => parseInt(a, 10) - parseInt(b, 10) }
      ],
      data: [
        {
          code: '1456729887',
          description: 'Standard Code Description from SNOMED',
          exclude: false,
          dependents: true
        },
        {
          code: '1456729847',
          description: 'Standard Code Description from SNOMED',
          exclude: false,
          dependents: true
        },
        {
          code: '1456729837',
          description: 'Standard Code Description from SNOMED',
          exclude: false,
          dependents: true
        }
      ]
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
          that.data.push(row)
        }
      })
    },
    checkIfCodeInList (row) {
      var that = this
      // var returnVal = false

      if (that.data.filter(row1 => row1.code === row.code).length) {
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
      var data = that.data.filter(row1 => row1.code === code)
      if (data.length > 0) {
        that.data.splice(data[0].__index, 1)
      }
    }
  }
}

</script>
