<template>
  <div clas="searchCode-card">
    <div class="row" >
      <div class="w17R">
        <div class="q-my-md q-ml-md q-mr-xs searchCodesetHeader">Search Codes Using Key Words</div>
      </div>
      <div class="col-9 q-mr-lg">
        <div class="q-ma-sm">
              <el-input v-model="filter" placeholder="Search">
                <template v-slot:prepend>
                  <q-icon name="search" />
                </template>
              </el-input>
        </div>
      </div>
    </div>
    <q-card class="q-px-md q-py-xs">
      <div class="row" >
        <div class="col-8 ">
          <div class="q-mb-sm row bor1Lightgrey selectedFilter">
            <div class="Applied-Filters">Applied Filters</div>
            <applied-filters :selectedFilters="selectedFilters" v-if="showFilters"></applied-filters>
          </div>
          <div class="selected_events1 table-box">
            <div class="row col">
              <div class="col">
                <div class="q-pa-xs q-ma-xs filter-box">
                  <q-list  bordered class="q-my-sm q-mx-xs" v-for="(fil,key) in filters" :key="key" >
                    <q-expansion-item
                      expand-separator
                      class="expansion-item-header f12 filterItemList text-capitalize"
                      :label="key"
                    >
                      <q-card class="q-px-sm f10">
                        <div v-for="av in fil" :key="av">
                          <input v-model="selectedFilters[key][av]"  type="checkbox" @input="refreshAppliedFilters"> {{av}}
                        </div>
                      </q-card>
                    </q-expansion-item>
                  </q-list>
                </div>
              </div>
              <div class="col-10">
                <q-table
                  id="codesTable"
                  class="selected_events1"
                  :data="data"
                  :columns="columns"
                  row-key="concept_code"
                  :pagination.sync="pagination"
                  :loading="loading"
                  :filter="filter"
                  @request="onRequest"
                  :selected-rows-label="getSelectedString"
                  selection="multiple"
                  :selected.sync="selected"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="q-pa-sm selected-codes-card q-ml-md">
            <div class="body">
              <div class="categories_header">
                Selected Codes
              </div>
              <div class="selected_events">
                <q-card v-for="row in selected" :key="row.code" class="q-ma-md row q-pa-sm" shadow-3>
                  <div class="ellipsis col-11 f12 q-pr-sm">{{row.concept_code}} - {{row.concept_name}}</div>
                  <div class="text-right col">
                    <q-btn class="fCgreen f8 q-px-xs q-py-none float-right" icon="cancel" flat rounded @click="remselection()"/>
                  </div>
                  <div class="col-12">
                    <div class="text-right f10 fc-theamGreen">
                      {{row.domain_id}}-{{row.vocabulary_id}}
                    </div>
                  </div>
                </q-card>
              </div>
            </div>
            <footer class="footer" v-if="selected!=''">
              <q-btn no-caps class="addtolist-btn" label="Add to list" @click="sendName"/>
            </footer>
          </div>
        </div>
      </div>
    </q-card>
  </div>
</template>

<script>
import axios from 'axios'
import sourceData from '../json/sourceCodes.json'
import appliedFilters from 'components/appliedFilters'
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
    QExpansionItem,
    'applied-filters': appliedFilters
  },
  data () {
    return {
      selected: [],
      filter: '',
      showFilters: false,
      filters: [],
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
          name: 'concept_code',
          required: true,
          field: row => row.concept_code,
          format: val => `${val}`,
          label: 'Code',
          align: 'left',
          sortable: true
        },
        { name: 'concept_name', label: 'Name', field: 'concept_name', align: 'left', sortable: true, classes: 'ellipsis', style: 'max-width: 250px' },
        { name: 'domain_id', label: 'Domain', field: 'domain_id', sortable: true, align: 'center', style: 'max-width: 100px' },
        { name: 'vocabulary_id', label: 'Vocabulary', field: 'vocabulary_id', align: 'left', sortable: true }
      ],
      pagination: {
        sortBy: 'name',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      loading: false,
      data: [],
      original: sourceData,
      selectedFilters: {}
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
    this.getFilters()
    this.onRequest({
      pagination: this.pagination,
      filter: undefined
    })
  },
  methods: {
    refreshAppliedFilters () {
      var that = this
      setTimeout(function () {
        that.showFilters = false
        that.$nextTick().then(() => {
          that.showFilters = true
        })
        that.onRequest({
          pagination: that.pagination,
          filter: undefined
        })
      }, 200)
    },
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
    getFilters () {
      var that = this
      axios({
        method: 'get',
        url: process.env['API_URL'] + 'codeset/codes/filters/'
      }).then(function (response) {
        that.filters = response.data
        delete that.filters.success
        Object.keys(response.data).forEach(function (row) {
          that.selectedFilters[row] = {}
          if (Array.isArray(response.data[row])) {
            response.data[row].forEach(function (child) {
              that.selectedFilters[row][child] = false
            })
          }
        })
      }).catch(function (err) {
        alert(err.message)
      })
    },
    onRequest (props) {
      let { page, rowsPerPage, rowsNumber, sortBy, descending } = props.pagination
      let filter = props.filter
      this.loading = true
      let fetchCount = rowsPerPage === 0 ? rowsNumber : rowsPerPage
      let startRow = (page - 1) * rowsPerPage
      this.fetchFromServer(startRow, fetchCount, filter, sortBy, descending, page, rowsPerPage)
    },
    fetchFromServer (startRow, count, filter, sortBy, descending, page, rowsPerPage) {
      let data = []
      let that = this
      var url = process.env['API_URL'] + 'codeset/codes/list/?page=' + page + '&pagecount=' + rowsPerPage
      if (filter) {
        url += '&search=' + filter
      }
      Object.keys(that.selectedFilters).forEach(function (key) {
        Object.keys(that.selectedFilters[key]).forEach(function (value, r, data) {
          if (that.selectedFilters[key][value]) {
            url += '&' + key + '=' + value
          }
        })
      })
      axios({
        method: 'get',
        url: url
      }).then(function (response) {
        that.data = response.data.result
        that.pagination.page = page
        that.pagination.rowsPerPage = rowsPerPage
        that.pagination.sortBy = sortBy
        that.pagination.descending = descending
        that.pagination.rowsNumber = response.data.count
        that.loading = false
        var container = that.$el.querySelector('#codesTable')
        container.scrollTop = 0
      }).catch(function (err) {
        alert(err.message)
      })
      return data
    }
  }
}
</script>
