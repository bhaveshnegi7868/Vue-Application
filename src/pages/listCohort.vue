<template>
    <div class="mar10T cohort_body">
    <div class="row">
        <div class="col-2">
          <q-btn-toggle
              v-model="model" spread no-caps toggle-color="green"
              color="white"
                text-color="black"
                :options="[
                  {label: 'My Cohort', value: 'one'},
                  {label: 'All Cohorts', value: 'two'}
                ]"
              ></q-btn-toggle>
          </div>
        <div class="col">
        <router-link to="/create"><q-btn color="green pull-left float-right" text-color="white" glossy unelevated icon="add" label="Create Cohot" ></q-btn></router-link>
        <q-btn-dropdown class="float-right pull-left" color="grey-1" text-color="black" label="Cohort Group">
           <q-list>
             <q-item clickable v-close-popup>
               <q-item-section>
                 <q-item-label>Group-1</q-item-label>
               </q-item-section>
             </q-item>

             <q-item clickable v-close-popup>
               <q-item-section>
                 <q-item-label>Group-2</q-item-label>
               </q-item-section>
             </q-item>

             <q-item clickable v-close-popup>
               <q-item-section>
                 <q-item-label>Group-3</q-item-label>
               </q-item-section>
             </q-item>
           </q-list>
         </q-btn-dropdown>

        </div>
        </div>
      <div class="cohort_list-Table  ">
        <div class="q-pa-md">
          <q-table
            :data="data"
            :columns="columns"
            row-key="name"
          >
          <template v-slot:top-right>
            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>
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
    </div>
  </template>
<script>
import {
  QBtnToggle,
  QTable,
  QBtnDropdown,
  QList,
  QItem,
  QItemSection,
  QItemLabel,
  QInput,
  QTd
} from 'quasar'
export default {
  name: 'listCohort',
  components: {
    QInput,
    QBtnToggle,
    QTable,
    QBtnDropdown,
    QList,
    QItem,
    QItemSection,
    QItemLabel,
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
          Cohortname1: 'RA patients with specific drugs',
          Cohortdescription: 'RA patients taking market basket drugs',
          Createdby: 'Swetank Gupta',
          Createddate: '21-Mar-19',
          Executeddate: '21-Mar-19',
          Status: 'Processing',
          Actions: '14%'
        },
        {
          Cohortname1: 'Severe Asthma and Urticaria Cohort',
          Cohortdescription: 'Identify Chronic Urticaria patients who also have Severe Asthma',
          Createdby: 'Swetank Gupta',
          Createddate: '04-Nov-18',
          Executeddate: '04-Nov-18',
          Status: 'Completed',
          Actions: '8%'
        },
        {
          Cohortname1: 'Out Patient Cohort',
          Cohortdescription: 'Analyse OP patients drug share by Source of Business',
          Createdby: 'Varsha',
          Createddate: '09-Jun-18',
          Executeddate: '23-Oct-18',
          Status: 'Failed',
          Actions: '6%'
        },
        {
          Cohortname1: 'Severe Urticaria Cohort',
          Cohortdescription: 'Identify Chronic Urticaria patients who also have Severe Asthma',
          Createdby: 'Swetank Gupta',
          Createddate: '04-Aug-18',
          Executeddate: '09-Nov-18',
          Status: 'Failed',
          Actions: '8%'
        },
        {
          Cohortname1: 'Severe Asthma  Cohort',
          Cohortdescription: 'Identify Chronic Urticaria patients who also have Severe Asthma',
          Createdby: 'Rubesh Gupta',
          Createddate: '16-Oct-18',
          Executeddate: '04-Nov-18',
          Status: 'Completed',
          Actions: '8%'
        },
        {
          Cohortname1: 'Severe  Cohort',
          Cohortdescription: 'Identify Chronic Urticaria patients who also have Severe Asthma',
          Createdby: 'Saranya Gupta',
          Createddate: '04-Nov-18',
          Executeddate: '10-Dec-18',
          Status: 'Completed',
          Actions: '8%'
        }
      ]
    }
  },
  methods: {
    removeFromList: function (id) {
      console.log('removeFromList… id:')
      console.log(id)
      this.data.splice(id, 1)
    }
  }
}

</script>
