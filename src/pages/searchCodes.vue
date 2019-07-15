<template>
  <div>
    <q-card class="q-pa-md">
      <h6>Search Codes Using Key Words</h6>
      <div class="row">
        <div class="col-7">
          <q-table
            :dense="$q.screen.lt.md"
            :data="data"
            :columns="columns"
            row-key="code"
            :filter="filter"
            :selected-rows-label="getSelectedString"
            selection="multiple"
            :selected.sync="selected"
          >
          <template v-slot:top>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="" >
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </q-input>
          </template>
          <!-- <template v-slot:body="props">
            <q-tr :props="props">
              <q-td key="code" :props="props">
                {{ props.row.code }}
              </q-td>
              <q-td key="name" :props="props">{{ props.row.name }}</q-td>
              <q-td key="domain" :props="props">{{ props.row.domain }}</q-td>
              <q-td key="vocabulary" :props="props">{{ props.row.vocabulary }}</q-td>
            </q-tr>
            <q-tr v-show="props.expand" :props="props">
              <q-td colspan="100%">
                <div class="text-left">This is expand slot for row above: {{ props.row.name }}.</div>
              </q-td>
            </q-tr>
          </template> -->
          </q-table>
        </div>
        <div class="col-5">
          <div class="q-pa-sm selected-codes-card q-ml-md">
            <div class="categories_header">
              Selected Codes
            </div>
            <q-card v-for="row in selected" :key="row.code" class="q-ma-md q-pa-sm" shadow-3>
              {{row.code}}-{{row.name}}<br>
              <div class="text-right">
                {{row.domain}}-{{row.vocabulary}}
              </div>
            </q-card>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import {
  QCard,
  QTable,
  QInput
  // QTr,
  // QTd
} from 'quasar'
export default {
  name: 'searchCodes',
  components: {
    QCard,
    QTable,
    QInput
    // QTr,
    // QTd
  },
  data () {
    return {
      selected: [],
      filter: '',
      columns: [
        { name: 'code', field: 'code', label: 'Code', align: 'left', sortable: true },
        { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
        { name: 'domain', label: 'Domain', field: 'domain', sortable: true, align: 'left' },
        { name: 'vocabulary', label: 'Vocabulary', field: 'vocabulary', sortable: true }
      ],
      data: [
        {
          name: 'RA patients with specific drugs',
          code: 'Code 01',
          description: 'RA patients with specific drugs',
          domain: 'Domain 01',
          vocabulary: 'Vocabulary 01'
        },
        {
          name: 'RA patients with specific drugs',
          code: 'Code 02',
          description: 'RA patients with specific drugs',
          domain: 'Domain 02',
          vocabulary: 'Vocabulary 02'
        },
        {
          name: 'RA patients with specific drugs',
          code: 'Code 03',
          description: 'RA patients with specific drugs',
          domain: 'Domain 03',
          vocabulary: 'Vocabulary 03'
        },
        {
          name: 'RA patients with specific drugs',
          code: 'Code 04',
          description: 'RA patients with specific drugs',
          domain: 'Domain 04',
          vocabulary: 'Vocabulary 04'
        },
        {
          name: 'RA patients with specific drugs',
          code: 'Code 05',
          description: 'RA patients with specific drugs',
          domain: 'Domain 05',
          vocabulary: 'Vocabulary 05'
        }
      ]
    }
  },
  watch: {
    selected: function (newVal, oldVal) {
      this.$emit('selectedChange', newVal)
    }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    sendName (event) {
      var that = this
      this.$emit('inputChange', that.event)
    }
  }
}
</script>
