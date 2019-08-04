<template>
  <div class="searchCode-card">
    <q-card class="q-px-md">
      <div class="q-my-sm searchCodesetHeader">Search Codes Using Key Words</div>
      <div class="row" >
        <div class="col-7 selected_events">
          <div>
                <el-input v-model="filter" placeholder="Search">
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                </el-input>
          </div>
          <div class="row table-box">
            <div class="col-3">
              <div class="q-pa-sm q-ma-sm filter-box">
                <q-list  bordered class="q-ma-sm" v-for="fil in filters" :key="fil.prop" >
                  <q-expansion-item
                    expand-separator
                    class="expansion-item-header"
                    :label="fil.label"
                  >
                    <q-card class="q-pa-sm">
                      <el-checkbox-group v-model="fil.value">
                        <el-checkbox v-for="av in fil.available" :key="av" :label="av"></el-checkbox>
                      </el-checkbox-group>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </div>
            </div>
            <div class="col-9">
              <q-table
                class="selected_events"
                :data="data"
                :columns="columns"
                row-key="target_concept_id"
                :pagination.sync="pagination"
                :loading="loading"
                :filter="filter"
                @request="onRequest"
                :selected-rows-label="getSelectedString"
                selection="multiple"
                :selected.sync="selected"
              />
              <!-- <data-tables
                :data="data"
                :filters="filters"
                @selection-change="handleSelectionChange"
                :pagination-props="{ background: true, pageSizes: [20, 10 , 5] }"
                class="selected_events"
                >
                <el-table-column type="selection" width="55">
                </el-table-column>
                <el-table-column v-for="title in titles" :prop="title.prop" :label="title.label" :key="title.prop" sortable="custom">
                </el-table-column>
              </data-tables> -->
            </div>
          </div>
          <!-- <q-table
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
          <template v-slot:body="props">
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
          </template>
          </q-table> -->
        </div>
        <div class="col-5">
          <div class="q-pa-sm selected-codes-card q-ml-md">
            <div class="body">
              <div class="categories_header">
                Selected Codes
              </div>
              <div class="selected_events">
                <q-card v-for="row in selected" :key="row.code" class="q-ma-md q-pa-sm" shadow-3>
                  {{row.target_concept_id}}-{{row.target_concept_name}}<br>
                  <div class="text-right">
                    {{row.domain_id}}-{{row.target_concept_vocab_id}}
                  </div>
                </q-card>
              </div>
            </div>
            <footer class="footer">
              <q-btn no-caps class="addtolist-btn" label="Add to list" @click="sendName"/>
            </footer>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import sourceData from '../json/sourceCodes.json'
import {
  QCard,
  QTable,
  QList,
  QExpansionItem
} from 'quasar'
export default {
  name: 'searchCodes',
  components: {
    QCard,
    QTable,
    QList,
    QExpansionItem
  },
  data () {
    return {
      selected: [],
      filter: '',
      filters: [
        {
          prop: 'domain_id',
          label: 'Domain Id',
          value: [],
          available: ['Domain 01', 'Domain 02', 'Domain 03']
        },
        {
          prop: 'source_vocabulary_id',
          label: 'Source Vocabulary Id',
          value: [],
          available: ['Vocabulary 01', 'Vocabulary 02', 'Vocabulary 03']
        }
      ],
      titles: [{
        prop: 'target_concept_id',
        label: 'Code'
      }, {
        prop: 'target_concept_name',
        label: 'Name'
      }, {
        prop: 'domain_id',
        label: 'Domain'
      }, {
        prop: 'target_concept_vocab_id',
        label: 'Vocabulary'
      }
      ],
      columns: [
        {
          name: 'target_concept_id',
          required: true,
          field: row => row.target_concept_id,
          format: val => `${val}`,
          label: 'Code',
          align: 'left',
          sortable: true
        },
        { name: 'target_concept_name', label: 'Name', field: 'target_concept_name', align: 'left', sortable: true, classes: 'ellipsis', style: 'max-width: 100px' },
        { name: 'domain_id', label: 'Domain', field: 'domain_id', sortable: true, align: 'left' },
        { name: 'target_concept_vocab_id', label: 'Vocabulary', field: 'target_concept_vocab_id', sortable: true }
      ],
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 3,
        rowsNumber: 10
      },
      loading: false,
      data: [],
      original: sourceData
      // [
      //   {
      //     name: 'RA patients with specific drugs',
      //     code: 'Code 01',
      //     description: 'RA patients with specific drugs',
      //     domain: 'Domain 01',
      //     vocabulary: 'Vocabulary 01'
      //   },
      //   {
      //     name: 'RA patients with specific drugs',
      //     code: 'Code 02',
      //     description: 'RA patients with specific drugs',
      //     domain: 'Domain 02',
      //     vocabulary: 'Vocabulary 02'
      //   },
      //   {
      //     name: 'RA patients with specific drugs',
      //     code: 'Code 03',
      //     description: 'RA patients with specific drugs',
      //     domain: 'Domain 03',
      //     vocabulary: 'Vocabulary 03'
      //   },
      //   {
      //     name: 'RA patients with specific drugs',
      //     code: 'Code 04',
      //     description: 'RA patients with specific drugs',
      //     domain: 'Domain 04',
      //     vocabulary: 'Vocabulary 04'
      //   },
      //   {
      //     name: 'RA patients with specific drugs',
      //     code: 'Code 05',
      //     description: 'RA patients with specific drugs',
      //     domain: 'Domain 05',
      //     vocabulary: 'Vocabulary 05'
      //   }
      // ]
    }
  },
  mounted () {
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    },
    addAll () {
      this.selected = this.data
      this.sendName()
    },
    handleSelectionChange (val) {
      this.selected = val
    },
    sendName (event) {
      var that = this
      this.$emit('selectedChange', that.selected)
    },
    onRequest (props) {
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      let filter = props.filter
      this.loading = true
      // emulate server
      setTimeout(() => {
        // update rowsCount with appropriate value
        this.pagination.rowsNumber = this.getRowsNumberCount(filter)
        // get all rows if "All" (0) is selected
        let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage
        // calculate starting row of data
        let startRow = (page - 1) * rowsPerPage
        // fetch data from "server"
        let returnedData = this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending)
        // clear out existing data and add new
        this.data.splice(0, this.data.length, ...returnedData)
        // don't forget to update local pagination object
        this.pagination.page = page
        this.pagination.rowsPerPage = rowsPerPage
        this.pagination.sortBy = sortBy
        this.pagination.descending = descending
        // ...and turn of loading indicator
        this.loading = false
      }, 1500)
    },
    // emulate ajax call
    // SELECT * FROM ... WHERE...LIMIT...
    fetchFromServer (startRow, count, filter, sortBy, descending) {
      let data = []
      if (!filter) {
        data = this.original.slice(startRow, startRow + count)
      } else {
        let found = 0
        for (let index = startRow, items = 0; index < this.original.length && items < count; ++index) {
          let row = this.original[index]
          // match filter?
          let toQuery = row['target_concept_id']
          if (typeof toQuery === 'number') {
            toQuery = toQuery.toString()
          }
          if (!toQuery.includes(filter)) {
            // get a different row, until one is found
            continue
          }
          ++found
          if (found >= startRow) {
            data.push(row)
            ++items
          }
        }
      }
      // handle sortBy
      if (sortBy) {
        data.sort((a, b) => {
          let x = descending ? b : a
          let y = descending ? a : b
          if (sortBy === 'desc') {
            // string sort
            return x[sortBy] > y[sortBy] ? 1 : x[sortBy] < y[sortBy] ? -1 : 0
          } else {
            // numeric sort
            return parseFloat(x[sortBy]) - parseFloat(y[sortBy])
          }
        })
      }
      return data
    },

    // emulate 'SELECT count(*) FROM ...WHERE...'
    getRowsNumberCount (filter) {
      if (!filter) {
        return this.original.length
      }
      let count = 0
      this.original.forEach((treat) => {
        let toQuery = treat['target_concept_id']
        if (typeof toQuery === 'number') {
          toQuery = toQuery.toString()
        }
        if (toQuery.includes(filter)) {
          ++count
        }
      })
      return count
    }
  }
}
</script>
