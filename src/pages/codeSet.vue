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
            <q-btn class="q-mx-xl" color="green" text-color="white" glossy unelevated icon="search" label="Purple text" ></q-btn>

            <div class="upload-btn-wrapper">
              <q-btn class="q-mx-xl btn" color="green " text-color="white" glossy unelevated icon="backup" label="Purple text" ></q-btn>
              <input type="file" name="myfile" />
            </div>
          </div>
        </div>
        <div class="">
          <q-table
          :data="data"
          :columns="columns"
          row-key="name"
          :selected-rows-label="getSelectedString"
          selection="multiple"
          :selected.sync="selected"
        >
        <q-td slot="body-cell-exclude" slot-scope="aaa" :aaa="aaa">
          <q-btn round color="green" size="0.5rem" icon="delete_outline"></q-btn>
        </q-td>
        <q-td slot="body-cell-dependents" slot-scope="props" :props="props">
          <q-btn round color="green" size="0.5rem" icon="delete_outline"></q-btn>
        </q-td>
        <q-td slot="body-cell-Action" slot-scope="props" :props="props">
          <q-btn round color="green" size="0.5rem" icon="delete_outline" @click="removeFromList(props.row.__index);"></q-btn>
        </q-td>
        </q-table>
        </div>
    </div>
  </template>
<script>
import {
  QTable,
  QCard
} from 'quasar'
export default {
  name: 'listCohort',
  components: {
    QTable,
    QCard
  },
  data () {
    return {
      selected: [],
      columns: [
        {
          name: 'Stndrd_Code',
          required: true,
          label: 'Standard Code',
          align: 'left',
          field: row => row.name,
          format: val => `${val}`,
          sortable: true
        },
        { name: 'stndrd_Des', align: 'center', label: 'Standard Code Description', field: 'calories', sortable: true },
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
          name: '1456729887',
          calories: 'Standard Code Description from SNOMED'
        },
        {
          name: '1456729887',
          calories: 'Standard Code Description from SNOMED'
        },
        {
          name: '1456729887',
          calories: 'Standard Code Description from SNOMED'
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
    }
  }
}

</script>
