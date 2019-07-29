<template>
  <q-page class="app-layout ">
    <secondary-header :selectedPage="selectedPage" :cohort_name="currentcohort.name"></secondary-header>
    <div class="row q-px-sm q-py-sm">
        <q-card class="row col-10 q-mr-xs">
            <div class="col-4 q-pa-sm">
                <input class="input-box full-width" v-model="currentcohort.name" placeholder="Cohort Name" />
            </div>
            <div class="col-6 q-pa-sm">
                <input class="input-box full-width" v-model="currentcohort.description" placeholder="Cohort Description" />
            </div>
            <div class="col q-pa-sm">
                <select required class="select-box full-width" v-model="currentcohort.datasource" placeholder="datasource">
                  <option value="Datasource" hidden selected >Datasource</option>
                  <option v-for="opt in dtSourceOpts" v-bind:key="opt.value" :value="opt.value">
                    {{opt.label}}
                  </option>
                </select>
            </div>
        </q-card>
        <q-card class="col row">
          <div class="col-2 q-mx-xs">
            <q-btn outlined icon="delete_forever" class="f12 action-btns borC1 full-width" text-color="negative"/>
          </div>
          <div class="col q-mx-xs">
            <q-btn outlined icon="save" label="Save" class="f12 action-btns borC2 full-width" text-color="primary"/>
          </div>
          <div class="col q-mx-xs">
            <q-btn outlined icon="play_circle_filled" label="Run" @click="showLoading()" class="f12 action-btns borC3 full-width" text-color="positive"/>
          </div>
        </q-card>
    </div>
    <q-card class="row  q-mx-sm" >
      <div class="leftForm q-pa-sm">
        <div class="categories_header">
            Criteria Set
        </div>
        <div class="header_Bor1"></div>
        <q-btn v-for="criteria in criteriaArray"  :key="criteria.name"  class="full-width" :class="criteriaClass[criteria.currentSelected]" @click="markCriteriaAsSelected(criteria)">
            <label v-if="criteria.ICriteriaListName">{{criteria.ICriteriaListName}}</label>
            <label v-if="criteria.PCriteriaListName">{{criteria.PCriteriaListName}}</label>
            <i class="fa fa-times-circle pull-right mar1"></i>
        </q-btn>
        <q-btn class="categories_addNew full-width" @click="addNewCriteria">
            Add Criteria Set
        </q-btn>
        <q-btn class="categories_addNew full-width" @click="createDictAndShow">
            Show Dict
        </q-btn>
      </div>
      <div class="rightForm q-pa-sm" v-if="currentCriteria">
        <q-card class="row q-mx-sm shadow-2" v-if="currentCriteria['PCriteriaListName'] === undefined">
          <div class="col-4 q-ma-sm">
            <input class="input-box full-width" v-model="currentInclusionObj.ICriteriaListName" placeholder="Criteria Name" />
          </div>
          <div class="col q-ma-sm">
            <input class="input-box full-width" v-model="currentInclusionObj.ICriteriaListDesc" placeholder="Criteria Description" />
          </div>
        </q-card>
        <q-card class="row q-mx-sm shadow-2" v-if="currentCriteria['PCriteriaListName'] !== undefined">
          <div class="col-4 q-ma-sm">
            <input class="input-box full-width" v-model="currentCriteria.PCriteriaListName" placeholder="Criteria Name" />
          </div>
          <div class="col q-ma-sm">
            <input class="input-box full-width" v-model="currentCriteria.PCriteriaListDesc" placeholder="Criteria Description" />
          </div>
        </q-card>
        <div class="elements-block  q-mt-sm">
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
              <q-card class="q-pa-sm custom-card">
                <div class="row" v-if="currentCriteria['PCriteriaListName'] === undefined">
                  <div class="col">
                    <select class="criteria-box" v-model="currentInclusionObj.Type">
                      <option disabled>Select</option>
                      <option>All</option>
                      <option>Any</option>
                    </select> of the criteria
                  </div>
                  <div class="col-md-3">
                    <q-btn no-caps class="add_group_bt float-right" label="Add Group" @click="addGroup"/>
                  </div>
                </div>
                <div class="list-group" id="list-group"  ref="test" group="people">
                  <div
                    class="list-group-item"
                    v-for="(elementObj,index) in currentCriteria.CriteriaList"
                    :key="index"
                  >
                    <div>
                      <q-card class="custom-card event-card"  :class="elementObj.currentSelected" align="left" @click.stop="showAttributes(elementObj,index)">
                        <div class="col-1">
                          <q-badge color="positive" class="q-ma-sm">{{elementObj.id}}</q-badge>
                        </div>
                        <div class="col-7">
                          <label class="text-h6 q-pa-xs">{{elementObj.event}} <span v-if="elementObj.name"> - {{elementObj.name}} </span></label>
                        </div>
                        <div class="col-2">
                        </div>
                        <div class="col-2">
                          <q-btn class="fCgreen q-px-sm f12  float-right" icon="cancel" flat rounded @click.stop.prevent="showAttributes()"  @click="cancelEvent(elementObj.id,elementObj)"/>
                        </div>
                      </q-card>
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
                        <div class="col-9 q-pa-sm">
                          <select class="criteria-box" v-model="elementObj.Type">
                            <option disabled>Select</option>
                            <option value="ALL">All</option>
                            <option value="ANY">Any</option>
                          </select> of the criteria
                        </div>
                        <div class="col q-ml-lg q-px-xs q-mt-sm">
                          <q-btn class="fCgreen f12 q-px-xs float-right" icon="cancel" flat rounded @click="cancelEvent(elementObj.id)"/>
                        </div>
                        <div class="col-12 row  q-pa-sm">
                            <q-badge color="positive" class="q-my-sm">{{elementObj.id}}</q-badge>
                            <input class="input-box col-11 q-mx-xs" v-model="elementObj.Name" placeholder="Group Name" />
                        </div>
                        <div class="row full-width">
                        <q-card
                          v-for="(elementObj1,index1) in elementObj.CriteriaList"
                          :key="elementObj1.id"
                          :class="elementObj1.currentSelected"
                          class="custom-card-1 event-card"
                          @click.native="showAttributes(elementObj1,index,index1)"
                          align="left">
                            <div class="col-1">
                              <q-badge color="positive" class="q-ma-sm">{{elementObj1.id}}</q-badge>
                            </div>
                            <div class="col-7">
                              <label class="text-h6 q-pa-lg">{{elementObj1.event}} <span v-if="elementObj1.name"> - {{elementObj1.name}} </span></label>
                            </div>
                            <div class="col-2">
                            </div>
                            <div class="col-2 ">
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
              <q-card class="q-pa-lg q-mt-lg custom-card">
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
              <event-attributes :mappingDict="mappingDict" :event="currentEvent" v-on:inputChange="handleChange"></event-attributes>
            </q-card>
        </div>
      </div>
      <q-dialog
          v-model="dictPopup"
          transition-show="slide-up"
          transition-hide="slide-down"
        >
          <q-card>
            <pre>{{baseObj}}</pre>
          </q-card>
      </q-dialog>
    </q-card>
   </q-page>
</template>

<style>
</style>

<script>
import { Drag, Drop } from 'vue-drag-drop'
import eventAttributes from 'pages/eventAttributes'
import secondaryHeader from 'components/secondaryHeader'
import diagnosisData from '../json/diagnosisNew.json'
import procedureData from '../json/procedureNew.json'
import treatementData from '../json/treatmentNew.json'
import {
  QCard,
  Loading,
  QSpinnerIos,
  QBadge,
  QDialog
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
    QBadge,
    Drag,
    Drop,
    QDialog,
    'event-attributes': eventAttributes,
    'secondary-header': secondaryHeader
  },
  data () {
    return {
      dictPopup: false,
      apiData: {
        'Procedure': procedureData,
        'Diagnosis': diagnosisData,
        'Treatement': treatementData
      },
      mappingDict: {
        'Procedure': 'ProcedureOccurrence',
        'Diagnosis': 'ConditionOccurrence',
        'Treatement': 'DrugExposure'
      },
      currentcohort: {
        'name': 'New cohort',
        'description': 'cohort Description',
        'group': 'GRP2',
        'datasource': 'dt1'
      },
      baseObj: {
        'PrimaryCriteria': {
          'PCriteriaListName': '',
          'PCriteriaListDesc': '',
          'CriteriaList': [],
          'ObservationWindow': {},
          'PrimaryCriteriaLimit': {}
        },
        'InclusionRules': []
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
          'PCriteriaListName': 'Initial Criteria',
          'currentSelected': 1,
          'PCriteriaListDesc': 'This Is The Initial cohort'
        },
        {
          'ICriteriaListName': 'Criteria Set 1',
          'currentSelected': 0,
          'ICriteriaListDesc': 'This Is Criteria Set 1'
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

      currentEvent: '',
      openGroup: false,
      criteriaClass: [
        'categories_list',
        'categories_Selected'
      ]
    }
  },
  created () {
    this.markCriteriaAsSelected(this.criteriaArray[0])
  },
  methods: {
    createDictAndShow () {
      // var that = this
      // var allCriterias = Object.keys(that.eventArray)
      // var PrimaryCriteria = allCriterias.shift()
      // that.makePrimaryCriteria(PrimaryCriteria)
      // allCriterias.forEach(function (criteria) {
      // })
      this.dictPopup = true
    },
    makePrimaryCriteria (criteria) {
      var that = this
      that.baseObj.PrimaryCriteria.PCriteriaListName = that.eventArray[criteria].name
      that.baseObj.PrimaryCriteria.PCriteriaListDesc = that.eventArray[criteria].description
      that.baseObj.PrimaryCriteria.CriteriaList = that.eventArray[criteria]
    },
    showAttributes (event, mainIndex, subIndex) {
      if (mainIndex >= 0 && event !== '') {
        var that = this
        that.currentEvent = event
        that.currentEvent['mainIndex'] = mainIndex
        that.currentEvent['subIndex'] = subIndex
        if (that.currentEvent[that.mappingDict[event.event]] === undefined) {
          that.currentEvent = Object.assign(that.currentEvent, JSON.parse(JSON.stringify(that.apiData[event.event])))
        }
        that.setQCardColor(that.currentEvent)
      } else { console.log('flase') }
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
      that.$refs.test.click()
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
    cancelEvent (id, keyCount) {
      var that = this
      var idArr = id.toString().match(/[a-z]+|[^a-z]+/gi)
      if (id.length > 1) {
        let retDict = that.getIndexWithId(idArr[0])
        that.currentInclusionObj.Groups[retDict.index].CriteriaList.forEach(function (row, index) {
          if (row.id === id) {
            that.currentInclusionObj.Groups[retDict.index].CriteriaList.splice(index, 1)
          }
        })
      } else {
        that.currentCriteria.CriteriaList.forEach(function (row, index) {
          if (row.id === id) {
            that.currentCriteria.CriteriaList.splice(index, 1)
          }
        })
        that.currentInclusionObj.Groups.forEach(function (row, index) {
          if (row.id === id) {
            that.currentInclusionObj.Groups.splice(index, 1)
          }
        })
      }
      that.currentEvent = ''
      that.showAttributes('', null, null)
      // if (that.eventArray[that.currentCriteria.name].length > 0) {
      //   that.readonlyCriteriaSelect = true
      // } else {
      //   that.readonlyCriteriaSelect = false
      // }
    },
    setQCardColor (event) {
      var that = this
      that.currentCriteria.CriteriaList.forEach(function (row, index) {
        if (row.id.toString() === event.id.toString()) {
          that.currentCriteria.CriteriaList[index].currentSelected = 'q-pa-sm q-ma-sm shadow-2 row selected-criteria'
        } else {
          that.currentCriteria.CriteriaList[index].currentSelected = 'q-pa-sm q-ma-sm shadow-2 row'
        }
      })
      that.currentInclusionObj.Groups.forEach(function (row, index) {
        row.CriteriaList.forEach(function (row1, index1) {
          if (row1.id.toString() === event.id.toString()) {
            that.currentInclusionObj.Groups[index].CriteriaList[index1].currentSelected = 'q-pa-sm q-ma-sm shadow-2 row selected-criteria'
          } else {
            that.currentInclusionObj.Groups[index].CriteriaList[index1].currentSelected = 'q-pa-sm q-ma-sm shadow-2 row'
          }
        })
      })
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
    markCriteriaAsSelected (criteria) {
      var that = this
      // if (!(that.currentCriteria.name in that.eventArray)) {
      //   that.eventArray[that.currentCriteria.name] = criteria
      //   that.eventArray[that.currentCriteria.name].CriteriaList = []
      //   that.eventArray[that.currentCriteria.name].currentGroup = 0
      //   that.eventArray[that.currentCriteria.name].currentNumber = 0
      // }
      that.criteriaArray.forEach(function (row, index) {
        if (index === 0) {
          if (row.PCriteriaListName === criteria.PCriteriaListName) {
            that.currentCriteria = that.baseObj['PrimaryCriteria']
            that.currentCriteria.PCriteriaListName = row.PCriteriaListName
            that.currentCriteria.PCriteriaListDesc = row.PCriteriaListDesc
            that.currentInclusionObj = {}
            row.currentSelected = 1
          } else {
            row.currentSelected = 0
          }
        } else {
          if (row.ICriteriaListName === criteria.ICriteriaListName) {
            if (that.baseObj['InclusionRules'][index - 1]) {
              that.currentCriteria = that.baseObj['InclusionRules'][index - 1].expression
              that.currentInclusionObj = that.baseObj['InclusionRules'][index - 1]
            } else {
              that.baseObj['InclusionRules'][index - 1] = {
                'expression': {
                  'CriteriaList': [],
                  'ObservationWindow': false,
                  'PrimaryCriteriaLimit': {}
                },
                'Groups': []
              }
              that.currentInclusionObj = that.baseObj['InclusionRules'][index - 1]
              that.currentCriteria = that.baseObj['InclusionRules'][index - 1].expression
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
      if (that.currentEvent.mainIndex != null) {
        if (that.currentEvent.subIndex != null) {
          that.currentInclusionObj.Groups[event.mainIndex].CriteriaList[event.subIndex] = event
        } else {
          that.currentCriteria.CriteriaList[event.mainIndex] = event
        }
      }
    },
    addNewCriteria () {
      var that = this
      that.criteriaArray.push({
        'ICriteriaListName': 'New Criteria',
        'ICriteriaListDesc': '',
        'currentSelected': 0
      })
    }
  }
}
</script>
