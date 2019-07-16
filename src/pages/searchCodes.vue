<template>
  <div>
    <q-card class="q-pa-md">
      <h6>Search Codes Using Key Words</h6>
      <div class="row" >
        <div class="col-7 selected_events">
          <div>
            <el-row>
              <el-col :span="24">
                <el-input v-model="filters[2].value" placeholder="Search">
                  <template v-slot:prepend>
                    <q-icon name="search" />
                  </template>
                  <template v-slot:append>
                    <el-button type="Info" @click="addAll()">Add All</el-button>
                  </template>
                </el-input>
              </el-col>
            </el-row>
          </div>
          <div class="row table-box">
            <!-- <div class="col-3">
              <div class="q-pa-sm q-ma-sm filter-box">
                <q-list  bordered class="rounded-borders q-ma-sm" v-for="fil in filters" :key="fil.prop" >
                  <q-expansion-item
                    expand-separator
                    :label="fil.prop"
                  >
                    <q-card class="q-pa-sm filter-box-1">
                      <el-checkbox-group v-model="fil.value">
                        <el-checkbox v-for="av in fil.available" :key="av" :label="av"></el-checkbox>
                      </el-checkbox-group>
                    </q-card>
                  </q-expansion-item>
                </q-list>
              </div>
            </div> -->
            <div class="col-12">
              <data-tables
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
              </data-tables>
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
  QCard
  // QList,
  // QExpansionItem
} from 'quasar'
export default {
  name: 'searchCodes',
  components: {
    QCard
    // QList,
    // QExpansionItem
  },
  data () {
    return {
      selected: [],
      filter: '',
      filters: [
        {
          prop: 'domain_id',
          value: [],
          available: ['Domain 01', 'Domain 02', 'Domain 03']
        },
        {
          prop: 'source_vocabulary_id',
          value: [],
          available: ['Vocabulary 01', 'Vocabulary 02', 'Vocabulary 03']
        },
        {
          prop: ['domain_id', 'target_concept_id', 'target_concept_name', 'target_concept_vocab_id'],
          value: ''
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
        { name: 'code', field: 'code', label: 'Code', align: 'left', sortable: true },
        { name: 'name', label: 'Name', field: 'name', align: 'left', sortable: true },
        { name: 'domain', label: 'Domain', field: 'domain', sortable: true, align: 'left' },
        { name: 'vocabulary', label: 'Vocabulary', field: 'vocabulary', sortable: true }
      ],
      data: sourceData
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
    }
  }
}
</script>
