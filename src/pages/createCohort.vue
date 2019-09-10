<template>
  <q-page class="app-layout ">
    <secondary-header :selectedPage="selectedPage" :cohort_name="baseObj" v-if="baseObj.cohort_id"></secondary-header>
    <div class="row createcohortHeaderform q-px-sm q-py-sm">
        <q-card class="row col-10 q-mr-xs">
            <div class="col-2 q-px-sm q-py-xs">
                <input class="input-box full-width" v-model="baseObj.cohort_name" placeholder="* Cohort Name" />
            </div>
            <div class="col-5 q-px-sm q-py-xs">
                <input class="input-box full-width" v-model="baseObj.cohort_desc" placeholder="* Cohort Description" />
            </div>
            <div class="col q-px-sm q-py-xs">
              <q-btn-dropdown
                  v-if="renderComponent1"
                  flat
                  no-caps
                  :label="baseObj.cohort_group ? baseObj.cohort_group : '* Cohort Group'"
                  class="full-width  f12 select-box"
                  @click="getCohortGroupList"
                  auto-close
                >
                <q-btn
                  color="primary"
                  class="full-width f10"
                  icon-right="add"
                  label="Add New Cohort Group"
                  @click="openCreateCohortGroupPopup"
                  v-close-popup
                />
                <q-card  class="bg-secondary text-white selected-btn-dropdown">
                  {{baseObj.cohort_group}}
                </q-card>
                <div class="options-values" v-for="opt in cohortGroups" v-bind:key="opt.name" @click="makeSelected('cohort_group',opt.name)" v-close-popup>
                  {{opt.name}}
                </div>
              </q-btn-dropdown>
            </div>
            <div class="col q-px-sm q-py-xs">
              <q-btn-dropdown
                  v-if="renderComponent1"
                  no-caps
                  flat
                  :label="baseObj.data_source ? baseObj.data_source : '* Datasource'"
                  class="full-width f12 select-box"
                  @click="getDataSourceList"
                  auto-close
                >
                <div class="options-values" v-for="opt in dataSources" v-bind:key="opt.name" @click="makeSelected('data_source',opt.name)" v-close-popup>
                  {{opt.name}}
                </div>
              </q-btn-dropdown>
            </div>
        </q-card>
        <q-card class="col row">
          <div class="col-2 createCohortbtnGrp q-mx-xs q-py-xs">
            <q-btn outlined icon="autorenew" class="f10 action-btns borC2 full-width" text-color="negative" @click="getCohortDict">
              <q-tooltip>
                Reset
              </q-tooltip>
            </q-btn>
          </div>
          <div class="col createCohortbtnGrp q-py-xs q-mx-xs" v-if="pagemethod !== 'update'">
            <q-btn outlined icon="save" :disable="!baseObj.cohort_name" label="Save" class="f10 action-btns borC2 q-mx-xs full-width" text-color="primary" @click="saveCohort"/>
          </div>
          <div class="col-5 createCohortbtnGrp q-py-xs q-mx-xs" v-if="pagemethod === 'update'">
            <q-btn outlined icon="save" :disable="!baseObj.cohort_name || !baseObj.cohort_desc || !baseObj.cohort_group || !baseObj.data_source" label="Update" class="f10 action-btns borC2 q-mx-xs full-width" text-color="primary" @click="saveCohort"/>
          </div>
          <div class="col createCohortbtnGrp q-py-xs q-mx-xs">
            <q-btn outlined icon="play_circle_filled" :disable="!baseObj.cohort_name || !baseObj.cohort_desc || !baseObj.cohort_group || !baseObj.data_source" label="Run" @click="runCohort()" class="f10  q-mx-xs action-btns borC3 full-width" text-color="positive"/>
          </div>
        </q-card>
    </div>
    <q-card class="row createBoxHeight q-mx-sm" >
      <div class="leftForm q-px-sm q-py-xs">
        <div class="categories_header">
            Criteria Set
        </div>
        <div class="header_Bor1"></div>
        <q-list class="categoriesListitems">
          <q-item
            clickable
            v-ripple
            class="categories_list"
            :active="link === 1"
            @click="markCriteriaAsSelected(baseObj.criteriaObj.PrimaryCriteria)"
            active-class="categories_Selected"
          >
            <q-item-section>
              <label>Primary Criteria</label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="criteria in baseObj.criteriaObj.InclusionRules"
            :key="criteria.id"
            clickable
            v-ripple
            class="categories_list ellipsis"
            :active="link === criteria.id"
            @click="markCriteriaAsSelected(criteria)"
            active-class="categories_Selected"
          >
            <q-item-section>
              <label  class="ellipsis">Inclusion Criteria - {{criteria.id-1}}</label>
            </q-item-section>
          </q-item>
        </q-list>
        <!-- <q-btn v-for="criteria in criteriaArray"  :key="criteria.id"  class="full-width" :class="criteriaClass[criteria.currentSelected]" @click="markCriteriaAsSelected(criteria)">
            <label v-if="criteria.ICriteriaSetName" class="ellipsis">{{criteria.ICriteriaSetName}}</label>
            <label v-if="criteria.PCriteriaSetName">{{criteria.PCriteriaSetName}}</label>
            <i class="fa fa-times-circle pull-right mar1"></i>
        </q-btn> -->
        <q-btn class="categories_addNew full-width" @click="addNewCriteria">
            Add Criteria Set
        </q-btn>
      </div>
      <div class="rightForm q-pa-sm" v-if="currentCriteria">
        <q-card class="row q-mx-sm shadow-2" v-if="currentCriteria['PCriteriaSetName'] === undefined">
          <div class="col-4 q-ma-sm">
            <input class="input-box full-width" v-model="currentInclusionObj.ICriteriaSetName" placeholder="Criteria Name" />
          </div>
          <div class="col q-ma-sm">
            <input class="input-box full-width" v-model="currentInclusionObj.ICriteriaSetDesc" placeholder="Criteria Description" />
          </div>
        </q-card>
        <q-card class="row q-mx-sm shadow-2" v-if="currentCriteria['PCriteriaSetName'] !== undefined">
          <div class="col-4 q-ma-sm">
            <input class="input-box full-width" v-model="currentCriteria.PCriteriaSetName" placeholder="Criteria Name" />
          </div>
          <div class="col q-ma-sm">
            <input class="input-box full-width" v-model="currentCriteria.PCriteriaSetDesc" placeholder="Criteria Description" />
          </div>
        </q-card>
        <div class="elements-block  h90 q-mt-sm">
            <q-card class="eventBox q-ma-sm shadow-2">
              <div class="eventList">
                <div class="EventList_header">
                    Events
                </div>
                <div class="header_Bor1"></div>
                <div :list="eventArray1" :group="{ name: 'people', pull: 'clone', put: false }">
                  <drag
                    class="Events"
                    v-for="(element) in eventArray1"
                    :key="element.id"
                    :transfer-data="{ element }"
                  >{{ element.name }}
                  </drag>
                </div>
              </div>
            </q-card>
            <q-card class="selectedEventBox q-ma-xs q-pa-md shadow-2 Rectangle-208">
              <q-card class="q-pa-sm f12 custom-card">
                <div class="row" v-if="currentCriteria['PCriteriaSetName'] === undefined">
                  <div class="col">
                    <select class="criteria-box H25" v-model="currentInclusionObj.Type">
                      <option disabled>Select</option>
                      <option value="ALL">All</option>
                      <option value="ANY">Any</option>
                    </select> of the criteria
                  </div>
                  <div class="col-md-3">
                    <q-btn no-caps class="add_group_bt float-right" label="Add Group" @click="addGroup"/>
                  </div>
                </div>
                <div class="list-group" id="list-group"  ref="test" group="people" v-if="renderComponent2">
                  <div
                    class="list-group-item"
                    v-for="(elementObj,index) in currentCriteria.CriteriaList"
                    :key="index"
                  >
                    <div>
                      <q-card class="custom-card row event-card w25R" :class="elementObj.currentSelected" align="left" @click.stop="showAttributes(elementObj,index)">
                        <div class="col ellipsis">
                          <label class="text-h6 q-pa-xs">{{elementObj.event}} <span v-if="elementObj.name"> - {{elementObj.name}} </span></label>
                        </div>
                        <div class="">
                          <q-btn v-if="currentCriteria['PCriteriaSetName'] !== undefined && !elementObj.CorrelatedCriteria" class="fCgreen q-px-none float-right f12" icon="add_circle" flat rounded  @click="addCorelatedCriteria(elementObj)" @click.stop.prevent="showAttributes()"/>
                        </div>
                        <div class="">
                          <q-btn class="fCgreen q-pl-none q-pr-xs float-right f12" icon="cancel" flat rounded @click.stop.prevent="showAttributes()"  @click="cancelEvent(elementObj.id,elementObj)"/>
                        </div>
                      </q-card>
                      <div v-if="elementObj.CorrelatedCriteria" class="corelated-criteria-block">
                        <input ref="textbox" class="input-box full-width q-mx-xs" v-model="elementObj.CorrelatedCriteria.Name" placeholder="Corelated Criteria Name" />
                        <div v-if="elementObj.CorrelatedCriteria.CriteriaList != ''" class="row full-width q-px-sm q-pb-sm">
                          <q-card
                          v-for="(elementObj1,index1) in elementObj.CorrelatedCriteria.CriteriaList"
                          :key="elementObj1.id"
                          :class="elementObj1.currentSelected"
                          class="custom-card-1 event-card "
                          @click.native="showAttributes(elementObj1,index,index1)"
                          align="left">
                            <div class="col ellipsis w5R">
                              <label class="text-h6  q-pa-lg">{{elementObj1.event}} <span v-if="elementObj1.name"> - {{elementObj1.name}} </span></label>
                            </div>
                            <div class="col-1">
                              <q-btn icon="cancel" class="fCgreen q-px-xs f12 float-right" flat rounded @click="cancelEvent1(elementObj1,elementObj)" @click.stop.prevent="showAttributes()"/>
                            </div>
                          </q-card>
                        </div>
                        <drop @drop="function(transferData, nativeEvent) { handleDropWithId(elementObj, transferData, nativeEvent) }" class="full-width" :id="'drop-zone-'+elementObj.id" >
                          <select class="categories_addNew text-h6 full-width" v-model="selectedEvent" label="Select Event" @change="handleDropWithId(elementObj)">
                              <option disabled>Select Event</option>
                              <option v-for="opt in eventArray1" v-bind:key="opt.value" :value="opt.name">
                                {{opt.name}}
                              </option>
                          </select>
                        </drop>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                    class="list-group-item"
                    v-for="(elementObj,index) in currentInclusionObj.Groups"
                    :key="index"
                  >
                   <div>
                      <q-card class="row sub-grp q-mt-sm q-mb-sm">
                        <div class="col-11 q-pa-sm">
                          <input class="input-box full-width q-mx-xs" v-model="elementObj.Name" placeholder="Group Name" />
                        </div>
                        <div class="col q-ml-lg q-px-xs q-mt-sm">
                          <q-btn class="fCgreen f12 q-px-xs float-right" icon="cancel" flat rounded @click="cancelEvent(elementObj.id)"/>
                        </div>
                        <div class="col-12 row  q-pa-sm">
                          <select class="criteria-box H25 q-mr-sm" v-model="elementObj.Type">
                            <option disabled>Select</option>
                            <option value="ALL">All</option>
                            <option value="ANY">Any</option>
                            </select> <span class="q-my-sm"> of the criteria </span>
                        </div>
                        <div class="row full-width">
                        <q-card
                          v-for="(elementObj1,index1) in elementObj.CriteriaList"
                          :key="elementObj1.id"
                          :class="elementObj1.currentSelected"
                          class="custom-card-1 event-card"
                          @click.native="showAttributes(elementObj1,index,index1)"
                          align="left">
                            <div class="col ellipsis w7R">
                              <label class="text-h6 q-pa-lg">{{elementObj1.event}} <span v-if="elementObj1.name"> - {{elementObj1.name}} </span></label>
                            </div>
                            <div class="col-1">
                              <q-btn icon="cancel" class="fCgreen q-px-xs f12 float-right" flat rounded @click="cancelEvent(elementObj1.id)"/>
                            </div>
                          </q-card>
                        </div>
                        <div class="row full-width q-px-sm q-pb-sm">
                          <drop @drop="handleDrop" class="full-width" :id="'drop-zone-'+elementObj.id" >
                            <select class="categories_addNew text-h6 full-width" v-model="selectedEvent" label="Select Event" @change="addEvent(elementObj.id)">
                                <option disabled>Select Event</option>
                                <option v-for="opt in eventArray1" v-bind:key="opt.value" :value="opt.name">
                                  {{opt.name}}
                                </option>
                            </select>
                          </drop>
                        </div>
                      </q-card>
                    </div>
                  </div>
                <div class="row full-width">
                  <drop @drop="handleDrop" class="full-width" >
                    <select class="categories_addNew text-h6 full-width" v-model="selectedEvent" label="Select Event" @change="addEvent">
                        <option disabled>Select Event</option>
                        <option v-for="opt in eventArray1" v-bind:key="opt.value" :value="opt.name">
                          {{opt.name}}
                        </option>
                    </select>
                  </drop>
                </div>
              </q-card>
              <q-card class="q-pa-sm q-mt-lg f12 custom-card">
                <div class="row">
                  <div class="col">
                    Limit initial events to
                    <select class="criteria-box H25 w9R" v-model="currentCriteria.PrimaryCriteriaLimit.Type">
                      <option v-for="opt in dtSourceOpts2" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row q-mt-lg" v-if="currentCriteria.ObservationWindow">
                    <div class="col">
                      Contineous enrollment w.r.t initial events index start date
                    </div>
                </div>
                <div class="row q-mt-xs" v-if="currentCriteria.ObservationWindow">
                  <div class="col">
                    Between <input  class="input-box H25 w4R" v-model="currentCriteria.ObservationWindow.PriorDays"/>
                     days before and <input  class="input-box H25 w4R" v-model="currentCriteria.ObservationWindow.PostDays"/> days after
                  </div>
                </div>
              </q-card>
            </q-card>
            <q-card class="attributeBox shadow-2 q-ma-xs">
              <event-attributes v-if="renderComponent" :mappingDict="mappingDict" :event="currentEvent" @inputChange="handleChange"></event-attributes>
            </q-card>
        </div>
      </div>
      <q-dialog
          v-model="dictPopup"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card>
            <div class="close-btn">
            <q-btn icon="img:/statics/imgs/closeModal.png" flat round dense v-close-popup ></q-btn>
            </div>
            <pre>{{baseObj}}</pre>
          </q-card>
      </q-dialog>
      <q-dialog v-model="createCohortGroupPopup">
        <q-card style="width: 700px; max-width: 80vw;">
          <div class="close-btn">
          <q-btn icon="img:/statics/imgs/closeModal.png" flat round dense v-close-popup ></q-btn>
          </div>
          <create-cohort-group name="cohort" @addCohort="addCohort"></create-cohort-group>
        </q-card>
      </q-dialog>
    </q-card>
   </q-page>
</template>

<style>
</style>

<script>
import { Drag, Drop } from 'vue-drag-drop'
import axios from 'axios'
import eventAttributes from 'pages/eventAttributes'
import createCohortGroup from 'components/createCohortGroup'
import secondaryHeader from 'components/secondaryHeader'
import diagnosisData from '../json/diagnosisNew.json'
import procedureData from '../json/procedureNew.json'
import treatementData from '../json/treatmentNew.json'
import {
  QCard,
  Loading,
  QSpinnerIos,
  QTooltip,
  QDialog,
  ClosePopup
} from 'quasar'
Loading.show({
  spinner: QSpinnerIos,
  message: 'Running',
  messageColor: 'white',
  spinnerSize: 150, // in pixels
  spinnerColor: 'green',
  customClass: 'bg-light'
})
Loading.hide()
export default {
  name: 'createCohort',
  components: {
    QCard,
    QTooltip,
    Drag,
    Drop,
    QDialog,
    'event-attributes': eventAttributes,
    'secondary-header': secondaryHeader,
    'create-cohort-group': createCohortGroup
  },
  directives: {
    ClosePopup
  },
  data () {
    return {
      renderComponent: false,
      renderComponent1: true,
      renderComponent2: true,
      dictPopup: false,
      createCohortGroupPopup: false,
      apiData: {
        'Procedure': procedureData,
        'Diagnosis': diagnosisData,
        'Treatment': treatementData
      },
      mappingDict: {
        'Procedure': 'ProcedureOccurrence',
        'Diagnosis': 'ConditionOccurrence',
        'Treatment': 'DrugExposure'
      },
      reverseMappingDict: {
        'ProcedureOccurrence': 'Procedure',
        'ConditionOccurrence': 'Diagnosis',
        'DrugExposure': 'Treatment'
      },
      currentcohort: {
        'name': 'New cohort',
        'description': 'cohort Description',
        'group': 'GRP2',
        'datasource': 'dt1'
      },
      baseObj: {
        'criteriaObj': {
          'PrimaryCriteria': {
            'PCriteriaSetName': '',
            'PCriteriaSetDesc': '',
            'displayName': 'Initial Criteria',
            'CriteriaList': [],
            'ObservationWindow': {},
            'PrimaryCriteriaLimit': {}
          },
          'InclusionRules': []
        }
      },
      selectedPage: 'Cohort Definition',
      cname: '',
      cdesc: '',
      cgrp: '',
      cdtsrc: '',
      cdtsource: '',
      scannedAisle: '',
      selectedEvent: 'Select Event',
      selectedCriteria: 'Select',
      readonlyCriteriaSelect: false,
      eventArray: {},
      currentInclusionObj: {},
      currentCriteria: {
      },
      criteriaArray: [
        {
          'id': 'PrimaryCriteria',
          'PCriteriaSetName': '',
          'displayName': 'Initial Criteria',
          'currentSelected': 1,
          'PCriteriaSetDesc': ''
        }
      ],
      eventArray1: [
        { 'id': 1, 'name': 'Diagnosis' },
        { 'id': 2, 'name': 'Treatement' },
        { 'id': 3, 'name': 'Procedure' }
      ],
      cGrpOpts: [
        { 'label': 'GRP1', 'value': 'GRP1' },
        { 'label': 'GRP2', 'value': 'GRP2' },
        { 'label': 'GRP3', 'value': 'GRP3' }
      ],
      dtSourceOpts2: [
        {
          value: 'Latest',
          label: 'Latest'
        },
        {
          value: 'Earliest',
          label: 'Earliest'
        }
      ],
      dtSourceOpts: [
        {
          value: 'DRG',
          label: 'DRG'
        },
        {
          value: 'Optum',
          label: 'Optum'
        },
        {
          value: 'MarketScan',
          label: 'Market Scan'
        }
      ],
      dataSources: [],
      cohortGroups: [],
      currentEvent: {},
      openGroup: false,
      criteriaClass: [
        'categories_list',
        'categories_Selected'
      ],
      pagemethod: undefined
    }
  },
  mounted () {
    var that = this
    that.cohort_id = that.$route.params.cohort_id
    that.pagemethod = that.$route.params.method
    if (that.cohort_id) {
      that.getCohortDict(that.cohort_id)
    } else {
      that.markCriteriaAsSelected(that.criteriaArray[0])
    }
    that.getEventsDict()
  },
  methods: {
    openCreateCohortGroupPopup () {
      this.createCohortGroupPopup = false
      this.createCohortGroupPopup = true
    },
    createDictAndShow () {
      // var that = this
      // var allCriterias = Object.keys(that.eventArray)
      // var PrimaryCriteria = allCriterias.shift()
      // that.makePrimaryCriteria(PrimaryCriteria)
      // allCriterias.forEach(function (criteria) {
      // })
      this.dictPopup = true
    },
    addCohort (cohortGroup) {
      var that = this
      var url = process.env.API_URL + 'cohort/group/create'
      var datadict = {
        name: cohortGroup.name,
        description: cohortGroup.description,
        created_by: that.$q.sessionStorage.getItem('username')
      }
      axios.post(url, datadict).then(function (response) {
        that.createCohortGroupPopup = false
      }).catch(function (err) {
        that.$q.notify({
          color: 'black',
          textColor: 'white',
          message: err.message,
          position: 'bottom-right',
          timeout: 3000
        })
      })
    },
    makePrimaryCriteria (criteria) {
      var that = this
      that.baseObj.PrimaryCriteria.PCriteriaSetName = that.eventArray[criteria].name
      that.baseObj.PrimaryCriteria.PCriteriaSetDesc = that.eventArray[criteria].description
      that.baseObj.PrimaryCriteria.CriteriaList = that.eventArray[criteria]
    },
    showAttributes (event, mainIndex, subIndex) {
      if (mainIndex >= 0 && event !== '') {
        var that = this
        that.currentEvent = event
        that.currentEvent['mainIndex'] = mainIndex
        that.currentEvent['subIndex'] = subIndex
        if (that.currentEvent[that.mappingDict[event.event]] === undefined) {
          that.getEventAttributes(event.event)
          // that.currentEvent = Object.assign(that.currentEvent, JSON.parse(JSON.stringify(that.apiData[event.event])))
        }
        that.setQCardColor(that.currentEvent)
      } else { console.log('flase') }
      that.renderComponent = true
    },
    addGroup () {
      var that = this
      that.currentCriteria.currentNumber = that.getNextDigit()
      that.currentInclusionObj.Groups.push({
        'id': that.currentCriteria.currentNumber,
        'Type': 'ANY',
        'Name': '',
        'CriteriaList': [],
        'currentSelected': 'full-width q-pa-sm q-ma-sm shadow-2 row'
      })
      // that.$refs.test.click()
    },
    showLoading () {
      Loading.show({
        spinner: QSpinnerIos,
        message: 'Running',
        messageColor: 'white',
        spinnerSize: 150, // in pixels
        spinnerColor: 'green',
        customClass: 'bg-light'
      })

      // hiding in 2s
      this.timer = setTimeout(() => {
        Loading.hide()
        this.$router.push({ path: '/summary' })
        this.timer = void 0
      }, 10000)
    },
    closeGroup () {
      var that = this
      that.readonlyCriteriaSelect = true
      that.openGroup = false
      that.currentGroup = 0
    },
    getIndexWithId (groupId) {
      var that = this
      var indexToReturn = null
      groupId = parseInt(groupId)
      that.currentInclusionObj.Groups.forEach(function (data, index) {
        if (data.id === groupId) {
          indexToReturn = index
        }
      })
      var lastChar = 0
      that.currentInclusionObj.Groups[indexToReturn].CriteriaList.forEach(function (data) {
        lastChar = data.id.toString()
      })
      if (indexToReturn != null && lastChar === 0) {
        lastChar = groupId
      }
      return {
        'index': indexToReturn,
        'lastChar': lastChar
      }
    },
    addEvent (groupId = null) {
      var that = this
      if (that.selectedCriteria !== 'Select Event') {
        if (groupId) {
          if (groupId.constructor.name !== 'Event' && groupId !== 0) {
            var inde = that.getIndexWithId(groupId)
            that.currentInclusionObj.Groups[inde.index].CriteriaList.push({
              'id': that.getNextDigit(inde.lastChar),
              'event': that.selectedEvent,
              'criteria': that.selectedCriteria,
              'currentSelected': 'q-pa-sm q-ma-sm shadow-2 row'
            })
          } else {
            that.currentCriteria.currentNumber = that.getNextDigit()
            that.currentCriteria['CriteriaList'].push({
              'id': that.currentCriteria.currentNumber,
              'event': that.selectedEvent,
              'criteria': that.selectedCriteria,
              'currentSelected': 'q-pa-sm q-ma-sm shadow-2 row'
            })
          }
        } else {
          that.currentCriteria.currentNumber = that.getNextDigit()
          that.currentCriteria.CriteriaList.push({
            'id': that.currentCriteria.currentNumber,
            'event': that.selectedEvent,
            'criteria': that.selectedCriteria,
            'currentSelected': 'q-pa-sm q-ma-sm shadow-2 row'
          })
        }
      }
      var container = this.$el.querySelector('#list-group')
      container.scrollTop = container.scrollHeight
      if (that.currentCriteria.CriteriaList.length > 0) {
        that.readonlyCriteriaSelect = true
      } else {
        that.readonlyCriteriaSelect = false
      }
      that.selectedEvent = 'Select Event'
    },
    getNextDigit (key = null) {
      var that = this
      var newArray = []
      if (key) {
        newArray = key.toString().match(/[a-z]+|[^a-z]+/gi)
        if (newArray[1]) {
          return newArray[0].toString() + that.getNextCharacter(newArray[1])
        } else {
          return (parseInt(key)).toString() + 'A'
        }
      } else {
        newArray = that.currentCriteria.currentNumber.toString().match(/[a-z]+|[^a-z]+/gi)
        return parseInt(newArray[0]) + 1
      }
    },
    getNextCharacter (key) {
      var that = this
      if (key === 'Z' || key === 'z') {
        return String.fromCharCode(key.charCodeAt() - 25) + String.fromCharCode(key.charCodeAt() - 25) // AA or aa
      } else {
        var lastChar = key.slice(-1)
        var sub = key.slice(0, -1)
        if (lastChar === 'Z' || lastChar === 'z') {
          return that.getNextCharacter(sub) + String.fromCharCode(lastChar.charCodeAt() - 25)
        } else {
          return sub + String.fromCharCode(lastChar.charCodeAt() + 1)
        }
      }
    },
    NewGroup (id) {
      var returnData = typeof id === 'string'
      return returnData
    },
    cancelEvent1 (obj, parentObj) {
      var that = this
      parentObj.CorrelatedCriteria.CriteriaList.forEach(function (row, index) {
        if (row.id === obj.id) {
          parentObj.CorrelatedCriteria.CriteriaList.splice(index, 1)
        }
      })
      that.renderComponent2 = false
      setTimeout(function () {
        that.$nextTick(() => {
          that.renderComponent2 = true
          that.renderComponent = false
        })
      }, 100)
    },
    cancelEvent (id, keyCount) {
      var that = this
      var idArr = id.toString().match(/[a-z]+|[^a-z]+/gi)
      if (id.length > 1) {
        let retDict = that.getIndexWithId(idArr[0])
        that.currentInclusionObj.Groups[retDict.index].CriteriaList.forEach(function (row, index) {
          if (row.id === id) {
            that.currentInclusionObj.Groups[retDict.index].CriteriaList.splice(index, 1)
            that.renderComponent = false
          }
        })
      } else {
        that.currentCriteria.CriteriaList.forEach(function (row, index) {
          if (row.id === id) {
            that.currentCriteria.CriteriaList.splice(index, 1)
            that.renderComponent = false
          }
        })
        that.currentInclusionObj.Groups.forEach(function (row, index) {
          if (row.id === id) {
            that.currentInclusionObj.Groups.splice(index, 1)
            that.renderComponent = false
          }
        })
      }
      that.currentEvent = {}
      that.showAttributes('', null, null)
      // if (that.eventArray[that.currentCriteria.name].length > 0) {
      //   that.readonlyCriteriaSelect = true
      // } else {
      //   that.readonlyCriteriaSelect = false
      // }
      that.renderComponent = false
    },
    addCorelatedCriteria (elementObj) {
      var that = this
      that.renderComponent2 = false
      elementObj.CorrelatedCriteria = {
        'Type': 'ANY',
        'CriteriaList': []
      }
      setTimeout(function () {
        that.$nextTick(() => {
          that.renderComponent2 = true
        })
      }, 100)
    },
    setQCardColor (event) {
      var that = this
      that.currentCriteria.CriteriaList.forEach(function (row, index) {
        if (row.id.toString() === event.id.toString()) {
          that.currentCriteria.CriteriaList[index].currentSelected = 'q-pa-sm q-ma-sm shadow-2 row selected-criteria'
        } else {
          that.currentCriteria.CriteriaList[index].currentSelected = 'q-pa-sm q-ma-sm shadow-2 row'
        }
        if (row.CorrelatedCriteria) {
          try {
            row.CorrelatedCriteria.CriteriaList.forEach(function (row, index) {
              if (row.id.toString() === event.id.toString()) {
                row.currentSelected = 'q-pa-sm q-ma-sm shadow-2 row selected-criteria'
              } else {
                row.currentSelected = 'q-pa-sm q-ma-sm shadow-2 row'
              }
            })
          } catch {
            console.log('Error !!')
          }
        }
      })
      try {
        that.currentInclusionObj.Groups.forEach(function (row, index) {
          row.CriteriaList.forEach(function (row1, index1) {
            if (row1.id.toString() === event.id.toString()) {
              that.currentInclusionObj.Groups[index].CriteriaList[index1].currentSelected = 'q-pa-sm q-ma-sm shadow-2 row selected-criteria'
            } else {
              that.currentInclusionObj.Groups[index].CriteriaList[index1].currentSelected = 'q-pa-sm q-ma-sm shadow-2 row'
            }
          })
        })
      } catch {
        console.log('Error !!')
      }
    },
    handleDrop (data, event) {
      var that = this
      that.selectedEvent = data.element.name
      if (event.currentTarget.getAttribute('id')) {
        var groupID = parseInt(event.currentTarget.getAttribute('id').split('-').pop())
        that.addEvent(groupID)
      } else {
        that.addEvent()
      }
    },
    handleDropWithId (elementObj, data = null, event = null) {
      var that = this
      if (that.selectedEvent === 'Select Event') {
        that.selectedEvent = data.element.name
      }
      let heightOfArray = elementObj.CorrelatedCriteria.CriteriaList.length
      let charToGet = elementObj.id
      if (heightOfArray > 0) {
        charToGet = elementObj.CorrelatedCriteria.CriteriaList[heightOfArray - 1].id
      }
      elementObj.CorrelatedCriteria.CriteriaList.push({
        'id': that.getNextDigit(charToGet),
        'event': that.selectedEvent,
        'criteria': that.selectedCriteria,
        'currentSelected': 'q-pa-sm q-ma-sm shadow-2 row'
      })
      var container = this.$el.querySelector('#list-group')
      container.scrollTop = container.scrollHeight
      that.selectedEvent = 'Select Event'
    },
    markCriteriaAsSelected (criteria) {
      var that = this
      that.criteriaArray.forEach(function (row, index) {
        if (index === 0) {
          if (row.PCriteriaSetName === criteria.PCriteriaSetName) {
            that.link = 1
            that.currentCriteria = that.baseObj['criteriaObj']['PrimaryCriteria']
            that.currentCriteria.PCriteriaSetName = row.PCriteriaSetName
            that.currentCriteria.PCriteriaSetDesc = row.PCriteriaSetDesc
            that.currentInclusionObj = {}
            row.currentSelected = 1
          } else {
            row.currentSelected = 0
          }
        } else {
          debugger
          if (row.id === criteria.id) {
            that.link = row.id
            if (that.baseObj['criteriaObj']['InclusionRules'][index - 1]) {
              that.currentCriteria = that.baseObj['criteriaObj']['InclusionRules'][index - 1].expression
              that.currentInclusionObj = that.baseObj['criteriaObj']['InclusionRules'][index - 1]
            } else {
              that.baseObj['criteriaObj']['InclusionRules'][index - 1] = {
                'expression': {
                  'CriteriaList': [],
                  'ObservationWindow': false,
                  'PrimaryCriteriaLimit': {}
                },
                'Groups': []
              }
              that.currentInclusionObj = that.baseObj['criteriaObj']['InclusionRules'][index - 1]
              that.currentCriteria = that.baseObj['criteriaObj']['InclusionRules'][index - 1].expression
            }
            row.currentSelected = 1
          } else {
            row.currentSelected = 0
          }
        }
        if (that.currentCriteria.currentGroup === undefined) {
          that.currentCriteria.currentGroup = 0
          that.currentCriteria.currentNumber = 0
          that.ObjectToIterate = []
        }
      })
    },
    handleChange (event) {
      var that = this
      // that.renderComponent = false
      // debugger
      if (that.currentEvent.mainIndex != null) {
        if (that.currentEvent.subIndex != null) {
          that.currentInclusionObj.Groups[event.mainIndex].CriteriaList[event.subIndex] = event
        } else {
          that.currentCriteria.CriteriaList[event.mainIndex] = event
        }
      }
      // that.$nextTick(() => {
      //   // Add the component back in
      //   that.renderComponent = true
      // })
    },
    addNewCriteria () {
      var that = this
      let criteriaObj = {
        'id': that.baseObj.criteriaObj.InclusionRules.length + 2,
        'ICriteriaSetName': '',
        'ICriteriaSetDesc': '',
        'Type': 'ANY',
        'currentSelected': 0,
        'expression': {
          'CriteriaList': [],
          'ObservationWindow': false,
          'PrimaryCriteriaLimit': {}
        },
        'Groups': []
      }
      that.baseObj.criteriaObj.InclusionRules.push(criteriaObj)
      that.criteriaArray.push(criteriaObj)
    },
    getCohortGroupList () {
      var that = this
      var url = process.env.API_URL + 'cohort/group/list/'
      axios.get(url).then(function (response) {
        that.cohortGroups = response.data.result
        that.loading = false
      })
    },
    getDataSourceList () {
      var that = this
      var url = process.env.API_URL + 'cohort/datasource/list/'
      axios.get(url).then(function (response) {
        that.dataSources = response.data.result
        that.loading = false
      })
    },
    getCohortDict () {
      var that = this
      var url = process.env.API_URL + 'cohort/get/' + that.cohort_id
      that.$q.loading.show()
      axios.get(url).then(function (response) {
        that.baseObj = response.data
        that.criteriaArray = [
          {
            'id': 'PrimaryCriteria',
            'PCriteriaSetName': response.data.criteriaObj.PrimaryCriteria.PCriteriaSetName,
            'currentSelected': 1,
            'PCriteriaSetDesc': response.data.criteriaObj.PrimaryCriteria.PCriteriaSetDesc
          }
        ]
        response.data.criteriaObj.InclusionRules.forEach(function (row) {
          that.criteriaArray.push({
            'ICriteriaSetName': row.ICriteriaSetName,
            'currentSelected': 0,
            'ICriteriaSetDesc': row.ICriteriaSetDesc,
            'id': row.id
          })
        })
        if (that.pagemethod === 'copy') {
          that.baseObj.cohort_name = ''
        }
        that.markCriteriaAsSelected(that.criteriaArray[0])
        // that.dtSourceOpts = response.data.result
        // that.loading = false
        that.$q.loading.hide()
      })
    },
    getEventsDict () {
      var that = this
      var url = process.env.API_URL + 'cohort/events/list/'
      axios.get(url).then(function (response) {
        that.eventArray1 = []
        let id = 0
        response.data.data.forEach(function (row) {
          id++
          that.eventArray1.push({
            id: id,
            name: row
          })
        })
        // that.dtSourceOpts = response.data.result
        // that.loading = false
      })
    },
    getEventAttributes (event) {
      var that = this
      that.$q.loading.show()
      var url = process.env.API_URL + 'cohort/' + that.capitalizeFirstLetter(event)
      axios.get(url).then(function (response) {
        that.$q.loading.hide()
        console.log('eventResponse')
        console.log(response.data.data)
        var newEventArray = []
        var eventArrayResData = response.data.data
        if (eventArrayResData.listDiagnosis) {
          newEventArray.push(eventArrayResData.listDiagnosis)
        }
        if (eventArrayResData.OccurenceLimit) {
          newEventArray.push(eventArrayResData.OccurenceLimit)
        }
        if (eventArrayResData.listDiagnosis) {
          newEventArray.push(eventArrayResData.listDiagnosis)
        }
        if (eventArrayResData.OccurenceLimit) {
          newEventArray.push(eventArrayResData.OccurenceLimit)
        }
        that.currentEvent = Object.assign(that.currentEvent, response.data.data)
        that.renderComponent = false
        setTimeout(function () {
          that.$nextTick(() => {
            // Add the component back in
            that.renderComponent = true
          })
        }, 100)
        // that.dtSourceOpts = response.data.result
        // that.loading = false
      })
    },
    capitalizeFirstLetter (event) {
      var lower = event.toLowerCase()
      return lower.charAt(0).toUpperCase() + lower.substring(1)
    },
    runCohort () {
      var that = this
      that.baseObj.run = true
      that.baseObj.criteriaObj.PrimaryCriteria = { 'Name': 'RA Patient Cohort', 'Description': 'CriteriaSet Description', 'CriteriaList': [ { 'ConditionOccurrence': { 'Name': 'Diagnosis - RA at least 2 occurrences', 'Codeset': [ 74125, 4035611, 4083556, 80809, 78230, 4107913, 4035611, 4083556, 4117686 ], 'Occurrence': { 'IsDistinct': false, 'Count': 2, 'Type': 'at least' } } }, { 'DrugExposure': { 'Name': 'Treatment - RA', 'Codeset': [1592626, 1594147, 937369, 36185701], 'Occurrence': { 'IsDistinct': false, 'Count': 1, 'Type': 'at least' }, 'CorrelatedCriteria': { 'Name': 'RA Treatment with at least 1 diagnosis', 'Type': 'ALL', 'CriteriaList': [ { 'ConditionOccurrence': { 'Name': 'Diagnosis - At least 1 occur', 'Codeset': [74125, 4035611, 4083556, 80809, 78230, 4107913, 4035611, 4083556, 4117686], 'Occurrence': { 'IsDistinct': false, 'Count': 1, 'Type': 'at least' }, 'StartWindow': { 'End': { 'Coeff': 1, 'Days': 0 }, 'Start': { 'Coeff': -1, 'Days': 0 } } } } ] } } } ], 'ObservationWindow': { 'PriorDays': 0, 'PostDays': 0 }, 'PrimaryCriteriaLimit': { 'Type': 'First' } }
      that.saveCohort()
    },
    saveCohort () {
      var that = this
      if (that.baseObj.run) {
        that.$q.loading.show({
          spinnerSize: 140,
          message: 'Saving And Running Data, Please Wait',
          messageColor: 'black'
        })
      } else {
        that.$q.loading.show({
          spinnerSize: 140,
          message: 'Saving Data, Please Wait',
          messageColor: 'black'
        })
      }
      var url = process.env.API_URL + 'cohort/create/'
      var method
      var successStatement = 'Cohort  Defination Saved Successfully'
      that.baseObj['created_by'] = that.$q.sessionStorage.getItem('username')
      if (that.pagemethod === 'update') {
        url = process.env.API_URL + 'cohort/update/'
        successStatement = 'Cohort Defination Saved Successfully'
        method = axios.put(url, that.baseObj)
      } else {
        that.baseObj.cohort_id = null
        method = axios.post(url, that.baseObj)
      }
      method.then(function (response) {
        that.$q.notify({
          color: 'green',
          textColor: 'white',
          message: successStatement,
          timeout: 3000
        })
        that.$q.loading.hide()
        if (response.data.cohort_id) {
          that.$router.push('/cohort/update/' + response.data.cohort_id)
          that.cohort_id = response.data.cohort_id
          that.pagemethod = 'update'
          that.getCohortDict(that.cohort_id)
        }
      }).catch(function (err) {
        that.$q.loading.hide()
        that.$q.notify({
          color: 'black',
          textColor: 'white',
          message: err.response.data.message,
          timeout: 3000
        })
      })
    },
    makeSelected (type, name) {
      var that = this
      that.renderComponent1 = false
      that.baseObj[type] = name
      setTimeout(function () {
        that.$nextTick(() => {
          // Add the component back in
          that.renderComponent1 = true
        })
      }, 100)
    }
  }
}
</script>
