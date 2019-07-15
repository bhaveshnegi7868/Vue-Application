<template>
  <q-page class="app-layout ">
    <secondary-header :selectedPage="selectedPage" :cohort_name="currentcohort.name"></secondary-header>
    <div class="row q-px-sm q-py-sm">
        <q-card class="row col-10 q-mr-xs">
            <div class="col-3 q-pa-sm">
                <input class="input-box full-width" v-model="currentcohort.name" placeholder="Cohort Name" />
            </div>
            <div class="col-5 q-pa-sm">
                <input class="input-box full-width" v-model="currentcohort.description" placeholder="Cohort Description" />
            </div>
            <div class="col-2 q-pa-sm">
                <select class="select-box full-width" v-model="currentcohort.group"  placeholder="Cohort Group">
                  <option disabled>Cohort Group</option>
                  <option v-for="opt in cGrpOpts" v-bind:key="opt.value" :value="opt.value">
                    {{opt.label}}
                  </option>
                </select>
            </div>
            <div class="col-2 q-pa-sm">
                <select class="select-box full-width" v-model="currentcohort.datasource">
                  <option selected disabled>Datasource</option>
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
            <q-btn outlined icon="play_circle_filled" label="Run" class="f12 action-btns borC3 full-width" text-color="positive"/>
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
            {{criteria.name}}
            <i class="fa fa-times-circle pull-right mar1"></i>
        </q-btn>
        <q-btn class="categories_addNew full-width" @click="addNewCriteria">
            Add Criteria Set
        </q-btn>
      </div>
      <div class="rightForm q-pa-sm" v-if="currentCriteria">
        <q-card class="row q-mx-sm shadow-2">
          <div class="col-4 q-ma-sm">
            <input class="input-box full-width" v-model="currentCriteria.name" placeholder="Criteria Name" />
          </div>
          <div class="col q-ma-sm">
            <input class="input-box full-width" v-model="currentCriteria.description" placeholder="Criteria Description" />
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
                <div class="row">
                  <div class="col">
                    <select class="criteria-box" v-model="selectedCriteria">
                      <option disabled>Select</option>
                      <option>All</option>
                      <option>Some</option>
                    </select> of the criteria
                  </div>
                  <div class="col-md-3">
                    <q-btn no-caps class="add_group_bt float-right" label="Add Group" @click="addGroup"/>
                  </div>
                </div>
                <div class="list-group" id="list-group"  ref="test" group="people">
                  <div
                    class="list-group-item"
                    v-for="(elementObj,index) in eventArray[currentCriteria]"
                    :key="index"
                  >
                    <div v-if="elementObj.events">
                      <q-card class="row sub-grp q-mt-sm q-mb-sm">
                        <div class="col-9 q-pa-sm">
                          <q-badge color="positive" class="q-my-sm">{{elementObj.id}}</q-badge>
                          or
                          <select class="criteria-box" v-model="elementObj.option">
                            <option disabled>Select</option>
                            <option>All</option>
                            <option>Some</option>
                          </select> of the criteria
                        </div>
                        <div class="col q-ml-lg q-px-xs q-mt-sm">
                          <q-btn class="fCgreen f12 q-px-xs float-right" icon="cancel" flat rounded @click="cancelEvent(elementObj.id)"/>
                        </div>
                        <div class="row full-width">
                        <q-card
                          v-for="(elementObj1,index1) in elementObj.events"
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
                    <div v-if="!elementObj.events">
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
                    <select class="criteria-box customCard-SelectBox" v-model="cdtsrc">
                      <option selected disabled>Datasource</option>
                      <option v-for="opt in dtSourceOpts" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row q-mt-sm">
                  <div class="col">
                    Contineous enrollment w.r.t initial events index start date
                  </div>
                </div>
                <div class="row q-mt-xs">
                  <div class="col">
                    Between <select class="criteria-box customCard-SelectBox" v-model="cdtsrc">
                      <option selected disabled>Datasource</option>
                      <option v-for="opt in dtSourceOpts" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                    </select> days before and <select class="criteria-box customCard-SelectBox" v-model="cdtsrc">
                      <option selected disabled>Datasource</option>
                      <option v-for="opt in dtSourceOpts" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                    </select> days after
                  </div>
                </div>
              </q-card>
            </q-card>
            <q-card class="attributeBox shadow-2 q-ma-xs">
              <event-attributes :event="currentEvent" v-on:inputChange="handleChange"></event-attributes>
            </q-card>
        </div>
      </div>
    </q-card>
   </q-page>
</template>

<style>
</style>

<script>
import { Drag, Drop } from 'vue-drag-drop'
import eventAttributes from 'pages/eventAttributes'
import secondaryHeader from 'components/secondaryHeader'
import {
  QCard,
  QBadge
} from 'quasar'
export default {
  name: 'createCohort',
  components: {
    QCard,
    QBadge,
    Drag,
    Drop,
    'event-attributes': eventAttributes,
    'secondary-header': secondaryHeader
  },
  data () {
    return {
      currentcohort: {
        'name': 'New cohort',
        'description': 'cohort Description',
        'group': 'GRP2',
        'datasource': 'dt1'
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
      currentCriteria: '',
      criteriaArray: [
        {
          'name': 'Initial Criteria',
          'currentSelected': 1,
          'description': 'This Is The Initial cohort'
        },
        {
          'name': 'Criteria Set 1',
          'currentSelected': 0,
          'description': 'This Is Criteria Set 1'
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
      dtSourceOpts: [
        { 'label': 'dt1', 'value': 'dt1' },
        { 'label': 'dt2', 'value': 'dt2' },
        { 'label': 'dt3', 'value': 'dt3' }
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
    showAttributes (event, mainIndex, subIndex) {
      console.log(mainIndex)
      if (mainIndex >= 0) {
        var that = this
        that.currentEvent = event
        that.currentEvent['mainIndex'] = mainIndex
        that.currentEvent['subIndex'] = subIndex
        that.setQCardColor(that.currentEvent)
      } else { console.log('flase') }
    },
    addGroup () {
      var that = this
      that.eventArray[that.currentCriteria].currentNumber = that.getNextDigit()
      that.currentGroup = that.eventArray[that.currentCriteria].currentNumber
      that.eventArray[that.currentCriteria].push({
        'id': that.currentGroup,
        'events': [],
        'currentSelected': 'full-width q-pa-sm q-ma-sm shadow-2 row'
      })
      that.$refs.test.click()
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
      that.eventArray[that.currentCriteria].forEach(function (data, index) {
        if (data.id === groupId) {
          indexToReturn = index
        }
      })
      var lastChar = 0
      that.eventArray[that.currentCriteria][indexToReturn].events.forEach(function (data) {
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
            that.eventArray[that.currentCriteria][inde.index].events.push({
              'id': that.getNextDigit(inde.lastChar),
              'event': that.selectedEvent,
              'criteria': that.selectedCriteria,
              'currentSelected': 'q-pa-sm q-ma-sm shadow-2 row'
            })
          } else {
            that.eventArray[that.currentCriteria].currentNumber = that.getNextDigit()
            that.eventArray[that.currentCriteria].push({
              'id': that.eventArray[that.currentCriteria].currentNumber,
              'event': that.selectedEvent,
              'criteria': that.selectedCriteria,
              'currentSelected': 'q-pa-sm q-ma-sm shadow-2 row'
            })
          }
        } else {
          that.eventArray[that.currentCriteria].currentNumber = that.getNextDigit()
          that.eventArray[that.currentCriteria].push({
            'id': that.eventArray[that.currentCriteria].currentNumber,
            'event': that.selectedEvent,
            'criteria': that.selectedCriteria,
            'currentSelected': 'q-pa-sm q-ma-sm shadow-2 row'
          })
        }
      }
      var container = this.$el.querySelector('#list-group')
      container.scrollTop = container.scrollHeight
      if (that.eventArray[that.currentCriteria].length > 0) {
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
        newArray = that.eventArray[that.currentCriteria].currentNumber.toString().match(/[a-z]+|[^a-z]+/gi)
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
        that.eventArray[that.currentCriteria][retDict.index].events.forEach(function (row, index) {
          if (row.id === id) {
            that.eventArray[that.currentCriteria][retDict.index].events.splice(index, 1)
          }
        })
      } else {
        that.eventArray[that.currentCriteria].forEach(function (row, index) {
          if (row.id === id) {
            that.eventArray[that.currentCriteria].splice(index, 1)
          }
        })
      }
      that.currentEvent = ''
      that.showAttributes('', null, null)
      if (that.eventArray[that.currentCriteria].length > 0) {
        that.readonlyCriteriaSelect = true
      } else {
        that.readonlyCriteriaSelect = false
      }
    },
    setQCardColor (event) {
      var that = this
      that.eventArray[that.currentCriteria].forEach(function (row, index) {
        if (row.events) {
          row.events.forEach(function (row1, index1) {
            if (row1.id.toString() === event.id.toString()) {
              that.eventArray[that.currentCriteria][index].events[index1].currentSelected = 'q-pa-sm q-ma-sm shadow-2 row selected-criteria'
            } else {
              that.eventArray[that.currentCriteria][index].events[index1].currentSelected = 'q-pa-sm q-ma-sm shadow-2 row'
            }
          })
        } else {
          if (row.id.toString() === event.id.toString()) {
            that.eventArray[that.currentCriteria][index].currentSelected = 'q-pa-sm q-ma-sm shadow-2 row selected-criteria'
          } else {
            that.eventArray[that.currentCriteria][index].currentSelected = 'q-pa-sm q-ma-sm shadow-2 row'
          }
        }
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
      that.currentCriteria = criteria.name
      if (!(that.currentCriteria in that.eventArray)) {
        that.eventArray[that.currentCriteria] = []
        that.eventArray[that.currentCriteria].currentGroup = 0
        that.eventArray[that.currentCriteria].currentNumber = 0
      }
      that.criteriaArray.forEach(function (row, index) {
        if (row.name === criteria.name) {
          row.currentSelected = 1
        } else {
          row.currentSelected = 0
        }
      })
    },
    handleChange (event) {
      var that = this
      if (that.currentEvent.mainIndex != null) {
        if (that.currentEvent.subIndex != null) {
          that.eventArray[that.currentCriteria][that.currentEvent.mainIndex].events[that.currentEvent.subIndex] = event
        } else {
          that.eventArray[that.currentCriteria][that.currentEvent.mainIndex] = event
        }
      }
    },
    addNewCriteria () {
      var that = this
      that.criteriaArray.push({
        'name': 'New Criteria',
        'description': '',
        'currentSelected': 0
      })
    }
  }
}
</script>
