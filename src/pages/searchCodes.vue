<template>
  <div clas="searchCode-card ">
    <div class="row" v-if="currentDependents.length === 0">
      <div class="w17R">
        <div class="q-my-md q-ml-md q-mr-xs searchCodesetHeader">Search Codes Using Keywords</div>
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
    <q-card class="q-px-xs q-py-xs" v-if="currentDependents.length === 0">
      <div class="row" >
        <div class="col-8 codeSetPage">
          <div class="q-mb-sm row bor1Lightgrey selectedFilter">
            <div class="Applied-Filters">Applied Filters</div>
            <applied-filters :selectedFilters="selectedFilters" v-if="showFilters" @selectedChange="applyFilterChange"></applied-filters>
          </div>
          <div class="selected_events1 table-box">
            <div class="row col">
              <div class="col">
                <div class="q-pa-xs q-ma-xs filter-box">
                  <q-list  bordered class="q-my-sm q-mx-xs" v-for="(fil,key,index) in filters" :key="key" >
                    <q-expansion-item
                      expand-separator
                      class="expansion-item-header f12 filterItemList text-capitalize"
                    >
                    <template v-slot:header>
                      <q-item-section avatar :class="'filtrC' +(index+1)">
                        <div></div>
                      </q-item-section>

                      <q-item-section >
                        {{key}}
                      </q-item-section>
                    </template>
                      <q-card class="q-px-sm f10">
                        <div v-for="av in fil" :key="av" class="ellipsis">
                          <input v-model="selectedFilters[key][av]"  type="checkbox" @input="refreshAppliedFilters"> {{av}}
                          <q-tooltip>
                             {{av}}
                          </q-tooltip>
                        </div>
                      </q-card>
                    </q-expansion-item>
                  </q-list>
                </div>
              </div>
              <div class="w80P">
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
                  :rows-per-page-options="paginationOptions"
                >
                  <q-td class="tabledataEditbtn" slot="body-cell-Actions" slot-scope="props" :props="props">
                    <div class="col dependentsIcon">
                      <q-btn outline no-caps class="" @click="openDependentpopup(props.row)" >
                        <q-icon name="img:/statics/imgs/group-519.png" size="16px"/>
                      </q-btn>
                    </div>
                  </q-td>
                </q-table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="q-pa-sm selected-codes-card q-ml-md">
            <div class="body">
              <div class="codeCategories_header">
                Selected Codes
              </div>
              <div class="selected_events q-mt-sm">
                <q-card v-for="(row,index) in selected" :key="row.code" class="q-ma-xs row q-pa-xs" shadow-3>
                  <div class="ellipsis col-11 f12 q-pr-sm">{{row.concept_code}} - {{row.concept_name}}</div>
                  <div class="text-right col">
                    <q-btn class="fCblue f8 q-px-xs q-py-none float-right" icon="cancel" flat rounded @click="remselection(index)"/>
                  </div>
                  <div class="col-12">
                    <div class="text-right f10 fc-theamBlue">
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
    <dependent-codes :desendents="currentDependents" @updateDependents="updateDependents" v-if="currentDependents.length"></dependent-codes>
  </div>
</template>

<script>
import axios from 'axios'
import sourceData from '../json/sourceCodes.json'
import appliedFilters from 'components/appliedFilters'
import dependentsCodes from 'pages/dependentCodes'
import {
  QCard,
  QTable,
  QList,
  QTd,
  QTooltip,
  QExpansionItem
} from 'quasar'
export default {
  name: 'searchCodes',
  components: {
    QCard,
    QTable,
    QTooltip,
    QList,
    QExpansionItem,
    QTd,
    'applied-filters': appliedFilters,
    'dependent-codes': dependentsCodes
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
        { name: 'domain_id', label: 'Domain', field: 'domain_id', sortable: true, classes: 'ellipsis', align: 'center', style: 'max-width: 100px' },
        { name: 'vocabulary_id', label: 'Vocabulary', field: 'vocabulary_id', classes: 'ellipsis', align: 'right', sortable: true, style: 'max-width: 100px' },
        { name: 'Actions', label: 'Actions', field: 'Actions' }
      ],
      pagination: {
        sortBy: 'domain_id',
        descending: false,
        page: 1,
        rowsPerPage: 10,
        rowsNumber: 10
      },
      paginationOptions: [
        3, 10, 20, 50, 100, 1000
      ],
      loading: false,
      data: [],
      currentDependents: [],
      dependentsPopup: false,
      original: sourceData,
      selectedFilters: {}
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
    applyFilterChange (selFil) {
      this.selectedFilters = selFil
      this.refreshAppliedFilters()
    },
    remselection (index) {
      this.selected.splice(index, 1)
    },
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
        console.log(response.data)
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
      that.setFiltrs = false
      var url = process.env['API_URL'] + 'codeset/codes/list/?page=' + page + '&pagecount=' + rowsPerPage
      if (sortBy) {
        url += '&sort_by_column=' + sortBy
        if (descending) {
          url += '&sort_type=desc'
        } else {
          url += '&sort_type=asc'
        }
      }
      if (that.filter) {
        url += '&search=' + that.filter
      }
      Object.keys(that.selectedFilters).forEach(function (key) {
        Object.keys(that.selectedFilters[key]).forEach(function (value, r, data) {
          if (that.selectedFilters[key][value]) {
            that.setFiltrs = true
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
        if (that.setFiltrs) {
          that.filters = response.data.distinct_filters
          console.log('final Res')
          console.log(that.selectedFilters)
        } else {
          that.getFilters()
        }
      }).catch(function (err) {
        alert(err.message)
      })
      return data
    },
    openDependentpopup (row) {
      console.log(row)
      var that = this
      that.currentRow = row
      let conceptId = row.concept_code
      that.currentDependents = []
      var url = process.env.API_URL + 'codeset/nonstandard/descendents/' + conceptId + '/'
      axios.get(url).then(function (response) {
        that.currentDependents = response.data.result.children || []
        that.dependentsPopup = true
      }).catch(function () {

      })
    },
    updateDependents (data) {
      var that = this
      data.forEach(function (row) {
        if (that.selected.filter(row1 => row1.concept_code === row).length === 0) {
          that.selected.push({
            'concept_code': row
          })
        }
      })
      that.currentDependents = []
    }
  }
}
</script>
