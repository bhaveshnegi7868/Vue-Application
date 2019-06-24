<template>
  <q-page class="app-layout ">
    <secondary-header :selectedPage="selectedPage" :cohart_name="currentCohart.name"></secondary-header>
    <div class="row q-px-md q-py-sm">
        <q-card class="row col-9 q-mr-lg">
            <div class="col-3 q-pa-sm">
                <input class="input-box full-width" v-model="currentCohart.name" placeholder="Cohort Name" />
            </div>
            <div class="col-5 q-pa-sm">
                <input class="input-box full-width" v-model="currentCohart.description" placeholder="Cohort Description" />
            </div>
            <div class="col-2 q-pa-sm">
                <select class="select-box full-width" v-model="currentCohart.group"  placeholder="Cohort Group">
                  <option disabled>Cohort Group</option>
                  <option v-for="opt in cGrpOpts" v-bind:key="opt.value" :value="opt.value">
                    {{opt.label}}
                  </option>
                </select>
            </div>
            <div class="col-2 q-pa-sm">
                <select class="select-box full-width" v-model="currentCohart.datasource">
                  <option selected disabled>Datasource</option>
                  <option v-for="opt in dtSourceOpts" v-bind:key="opt.value" :value="opt.value">
                    {{opt.label}}
                  </option>
                </select>
            </div>
        </q-card>
        <q-card class="col q-pa-xs row">
          <div class="col-2 q-ml-sm q-mr-sm">
            <q-btn outlined icon="delete_forever" class="action-btns full-width q-pa-xs" text-color="negative"/>
          </div>
          <div class="col q-ml-sm q-mr-sm">
            <q-btn outlined icon="save" label="Save" class="action-btns full-width q-pa-xs" text-color="primary"/>
          </div>
          <div class="col q-ml-sm q-mr-sm">
            <q-btn outlined icon="play_circle_filled" label="Run" class="action-btns full-width q-pa-xs" text-color="positive"/>
          </div>
        </q-card>
    </div>
    <q-card class="row q-my-sm q-mx-sm q-ma-sm" >
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
        <q-card class="row shadow-7">
          <div class="col-4 q-ma-sm">
            <input class="input-box full-width" v-model="currentCriteria.name" placeholder="Criteria Name" />
          </div>
          <div class="col q-ma-sm">
            <input class="input-box full-width" v-model="currentCriteria.description" placeholder="Criteria Description" />
          </div>
        </q-card>
        <div class="elements-block  q-mt-sm">
            <q-card class="eventBox q-ma-xs shadow-7 height-700">
              <div class="col-2 eventList">
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
            <q-card class="selectedEventBox q-ma-xs q-pa-md shadow-7 Rectangle-208 height-700">
              <q-card class="q-pa-lg custom-card">
                <select class="criteria-box" v-model="selectedCriteria">
                  <option disabled>Select</option>
                  <option>All</option>
                  <option>Some</option>
                </select> of the criteria
                <div class="list-group" id="list-group"  ref="test" group="people">
                  <div
                    class="list-group-item"
                    v-for="(elementObj,index) in eventArray[currentCriteria]"
                    :key="index"
                  >
                    <div v-if="elementObj.events">
                      <q-card class="row sub-grp q-mt-sm q-mb-sm">
                        <div class="col-9 q-ml-sm q-pa-sm">
                          <q-badge color="positive" class="q-ma-sm">{{elementObj.id}}</q-badge>
                          or
                          <select class="criteria-box" v-model="elementObj.option">
                            <option disabled>Select</option>
                            <option>All</option>
                            <option>Some</option>
                          </select> of the criteria
                        </div>
                        <div class="col q-ml-lg q-mt-sm">
                          <q-btn class="" icon="cancel" flat rounded @click="cancelEvent(elementObj.id)"/>
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
                              <label class="text-h6 q-pa-lg">{{elementObj1.event}} - {{elementObj1.name}}</label>
                            </div>
                            <div class="col-2">
                            </div>
                            <div class="col-2 ">
                              <q-btn icon="cancel" flat rounded @click="cancelEvent(elementObj1.id)"/>
                            </div>
                          </q-card>
                        </div>
                        <div class="row full-width q-pa-lg">
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
                      <q-card class="custom-card event-card"  :class="elementObj.currentSelected" align="left" @click.native="showAttributes(elementObj,index)">
                        <div class="col-1">
                          <q-badge color="positive" class="q-ma-sm">{{elementObj.id}}</q-badge>
                        </div>
                        <div class="col-7">
                          <label class="text-h6 q-pa-xs">{{elementObj.event}} - {{elementObj.name}}</label>
                        </div>
                        <div class="col-2">
                        </div>
                        <div class="col-2">
                          <q-btn class="" icon="cancel" flat rounded @click="cancelEvent(elementObj.id)"/>
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
                <div class="row">
                  <!-- <q-btn no-caps class="add_group_bt q-ma-sm col-md-3" label="Add Criteria" @click="addCriteria"/> -->
                  <q-btn no-caps class="add_group_bt q-ma-sm col-md-3 offset-md-9" label="Add Group" @click="addGroup"/>
                </div>
              </q-card>
              <q-card class="q-pa-lg q-mt-lg custom-card">
                <div class="row">
                  <div class="col">
                    Limit initial events to
                    <select class="criteria-box" v-model="cdtsrc">
                      <option selected disabled>Datasource</option>
                      <option v-for="opt in dtSourceOpts" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row q-mt-md">
                  <div class="col">
                    Contineous enrollment w.r.t initial events index start date
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    Between <select class="criteria-box" v-model="cdtsrc">
                      <option selected disabled>Datasource</option>
                      <option v-for="opt in dtSourceOpts" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                    </select> days before and <select class="criteria-box" v-model="cdtsrc">
                      <option selected disabled>Datasource</option>
                      <option v-for="opt in dtSourceOpts" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                    </select> days after
                  </div>
                </div>
              </q-card>
            </q-card>
            <q-card class="attributeBox shadow-7 q-ma-xs" v-if="currentEvent">
              <event-attributes :event="currentEvent.event" v-on:inputChange="handleChange"></event-attributes>
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
      currentCohart: {
        'name': 'New Cohart',
        'description': 'Cohart Description',
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
          'description': 'This Is The Initial Cohart'
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
  methods: {
    showAttributes (event, mainIndex, subIndex = null) {
      var that = this
      that.currentEvent = event
      that.currentEvent['mainIndex'] = mainIndex
      that.currentEvent['subIndex'] = subIndex
      that.setQCardColor(that.currentEvent)
    },
    addGroup () {
      var that = this
      that.eventArray[that.currentCriteria].currentNumber = that.getNextDigit()
      that.currentGroup = that.eventArray[that.currentCriteria].currentNumber
      that.eventArray[that.currentCriteria].push({
        'id': that.currentGroup,
        'events': [],
        'currentSelected': 'full-width q-pa-sm q-ma-sm shadow-3 row'
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
              'currentSelected': 'q-pa-sm q-ma-sm shadow-3 row'
            })
          } else {
            that.eventArray[that.currentCriteria].currentNumber = that.getNextDigit()
            that.eventArray[that.currentCriteria].push({
              'id': that.eventArray[that.currentCriteria].currentNumber,
              'event': that.selectedEvent,
              'criteria': that.selectedCriteria,
              'currentSelected': 'q-pa-sm q-ma-sm shadow-3 row'
            })
          }
        } else {
          that.eventArray[that.currentCriteria].currentNumber = that.getNextDigit()
          that.eventArray[that.currentCriteria].push({
            'id': that.eventArray[that.currentCriteria].currentNumber,
            'event': that.selectedEvent,
            'criteria': that.selectedCriteria,
            'currentSelected': 'q-pa-sm q-ma-sm shadow-3 row'
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
    cancelEvent (id) {
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
              that.eventArray[that.currentCriteria][index].events[index1].currentSelected = 'q-pa-sm q-ma-sm shadow-3 row selected-criteria'
            } else {
              that.eventArray[that.currentCriteria][index].events[index1].currentSelected = 'q-pa-sm q-ma-sm shadow-3 row'
            }
          })
        } else {
          if (row.id.toString() === event.id.toString()) {
            that.eventArray[that.currentCriteria][index].currentSelected = 'q-pa-sm q-ma-sm shadow-3 row selected-criteria'
          } else {
            that.eventArray[that.currentCriteria][index].currentSelected = 'q-pa-sm q-ma-sm shadow-3 row'
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
      that.currentCriteria = criteria
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
          that.eventArray[that.currentCriteria][that.currentEvent.mainIndex].events[that.currentEvent.subIndex].name = event
        } else {
          that.eventArray[that.currentCriteria][that.currentEvent.mainIndex].name = event
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
