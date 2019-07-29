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
                  {label: 'My Codeset', value: 'one'},
                  {label: 'All Codesets', value: 'two'}
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
              <router-link to="/codeset">
                <q-btn color="green pull-left float-right" text-color="white" glossy unelevated icon="add" label="Create Codeset" />
              </router-link>
          </template>
          <q-td slot="body-cell-Codesetname" slot-scope="row" :props="row">
          <router-link to="/codeset">{{row.row.Codesetname1}}</router-link>
            </q-td>
            <q-td slot="body-cell-Actions" slot-scope="props" :props="props">
                <q-btn round color="green" size="0.5rem" icon="file_copy" v-if="allowImport==false"></q-btn>
                <q-btn round color="green" size="0.5rem" icon="delete_outline" @click="removeFromList(props.row.__index); " v-if="allowImport==false"></q-btn>
                <q-checkbox v-if="allowImport" v-model="props.row.selected"/>
            </q-td>
          </q-table>
        </div>
        <div class="footer" v-if="allowImport">
          <q-btn  class="q-ma-md" color="grey-9"  label="Cancel" ></q-btn>
          <q-btn  class="q-ma-md" color="green-9" v-close-popup label="Import" @click="sendDataToParent"></q-btn>
        </div>
    </div>
  </template>
<script>
import {
  QBtnToggle,
  QTable,
  QInput,
  QTd,
  QCheckbox,
  ClosePopup
} from 'quasar'
export default {
  name: 'listCodeset',
  components: {
    QInput,
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
      model: 'one',
      searchModel: '',
      columns: [
        { name: 'Codesetname', field: 'Codesetname1', label: 'Codeset name', align: 'left', sortable: true },
        { name: 'Codesetdescription', label: 'Codeset description', field: 'Codesetdescription', align: 'left', sortable: true },
        { name: 'Createdby', label: 'Created by', field: 'Createdby', sortable: true, align: 'left' },
        { name: 'Createddate', label: 'Created date', field: 'Createddate', sortable: true },
        { name: 'Actions', label: 'Actions', field: 'Actions' }
      ],
      data: [
        {
          Codesetname1: 'Myocardial Infarction',
          Codesetdescription: 'Myocardial Infarction',
          Createdby: 'Muthu R',
          Createddate: '01-Jul-19',
          Actions: '14%',
          selected: false
        },
        {
          Codesetname1: 'Unstable Angina',
          Codesetdescription: 'Unstable Angina',
          Createdby: 'Muthu R',
          Createddate: '01-Jul-19',
          Actions: '8%',
          selected: false
        },
        {
          Codesetname1: 'Statins',
          Codesetdescription: 'Statins',
          Createdby: 'Muthu R',
          Createddate: '01-Jul-19',
          Actions: '6%',
          selected: false
        },
        {
          Codesetname1: 'Familal hypercholestrolemia',
          Codesetdescription: 'Familal hypercholestrolemia',
          Createdby: 'Muthu R',
          Createddate: '01-Jul-19',
          Actions: '8%',
          selected: false
        }
      ]
    }
  },
  props: {
    allowImport: Boolean
  },
  methods: {
    removeFromList: function (id) {
      console.log('removeFromList… id:')
      console.log(id)
      this.data.splice(id, 1)
    },
    sendDataToParent () {
      var returnArray = []
      this.data.forEach(function (row) {
        if (row.selected) {
          returnArray.push(row)
        }
      })
      debugger
      this.$emit('addImports', returnArray)
    }
  }
}

</script>
