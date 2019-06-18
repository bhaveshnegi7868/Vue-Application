<template>
  <q-page class="app-layout">
    <div class="row q-pa-lg">
        <q-card class="row col-9 q-mr-lg">
            <div class="col-3 q-pa-sm">
                <input class="input-box full-width" v-model="cname" placeholder="Cohort Name" />
            </div>
            <div class="col-5 q-pa-sm">
                <input class="input-box full-width" v-model="cdesc" placeholder="Cohort Description" />
            </div>
            <div class="col-2 q-pa-sm">
                <select class="select-box full-width" v-model="cgrp"  placeholder="Cohort Group">
                  <option disabled>Cohort Group</option>
                  <option v-for="opt in cGrpOpts" v-bind:key="opt.value" :value="opt.value">
                    {{opt.label}}
                  </option>
                </select>
            </div>
            <div class="col-2 q-pa-sm">
                <select class="select-box full-width" v-model="cdtsrc">
                  <option selected disabled>Datasource</option>
                  <option v-for="opt in dtSourceOpts" v-bind:key="opt.value" :value="opt.value">
                    {{opt.label}}
                  </option>
                </select>
            </div>
        </q-card>
        <q-card class="col-2 q-pa-xs">
            <q-btn outlined icon="delete_forever" class="action-btns q-pa-xs" text-color="negative"/>
            <q-btn outlined icon="save" label="Save" class="action-btns q-pa-xs" text-color="primary"/>
            <q-btn outlined icon="play_circle_filled" label="Run" class="action-btns q-pa-xs" text-color="positive"/>
        </q-card>
    </div>
    <q-card class="row q-pa-lg" >
      <div class="col-2 leftForm">
        <div class="categories_header">
            Criteria Set
        </div>
        <div class="header_Bor1"></div>
        <div class="categories_list">
            Initial Criteria
        </div>
        <div class="categories_Selected">
            Criteria Set 1
            <i class="fa fa-times-circle pull-right mar1"></i>
        </div>
        <q-btn class="categories_addNew full-width">
            Add New Criteria Set
        </q-btn>
      </div>
      <div class="col-10 q-pa-sm" >
        <q-card class="q-pa-sm row">
          <div class="col q-ma-sm">
            <input class="input-box full-width" v-model="cname" placeholder="Cohort Name" />
          </div>
          <div class="col q-ma-sm">
            <input class="input-box full-width" v-model="cdesc" placeholder="Cohort Description" />
          </div>
        </q-card>
        <div class="row q-mt-lg">
            <q-card class="col-2  q-pa-sm q-mr-lg">
              <div class="col-2 eventList">
                <div class="EventList_header">
                    Events
                </div>
                <div class="header_Bor1"></div>
                <div :list="eventArray1" :group="{ name: 'people', pull: 'clone', put: false }">
                  <drag
                    class="Events"
                    v-for="(element) in eventArray1"
                    :key="element"
                    :transfer-data="{ element }"
                  >{{ element.name }}
                  </drag>
                </div>
              </div>
            </q-card>
            <q-card class="col-5  q-pa-sm q-mr-lg Rectangle-208">
              <q-card class="q-pa-lg custom-card">
                <select class="select-box" v-model="selectedCriteria" :disabled="readonlyCriteriaSelect">
                  <option disabled>Select</option>
                    <option v-for="opt in criteriaArray" v-bind:key="opt.value" :value="opt">
                      {{opt}}
                    </option>
                </select> of the criteria
                <drop @drop="handleDrop" class="list-group" :list="eventArray" group="people" v-if="selectedCriteria != 'Select'">
                  <div
                    class="list-group-item"
                    v-for="(elementObj,index) in eventArray"
                    :key="index"
                  >
                    <div v-if="elementObj.events">
                      <q-card class="row sub-grp">
                        <div class="col-10">
                          <q-badge color="positive" class="q-ma-sm">{{elementObj.id}}</q-badge>
                        </div>
                        <div class="col-1">
                          <q-btn  class="" icon="cancel" flat rounded @click="cancelEvent(elementObj.id)"/>
                        </div>
                        <div class="row full-width">
                        <q-card
                          v-for="(elementObj1,index) in elementObj.events"
                          :key="index"
                          :class="elementObj1.currentSelected"
                          class="custom-card-1 "
                          align="left">
                            <div class="col-1">
                              <q-badge color="positive" class="q-ma-sm">{{elementObj1.id}}</q-badge>
                            </div>
                            <div class="col-7">
                              <label class="text-h6 q-pa-lg">{{elementObj1.event}}</label>
                            </div>
                            <div class="col-2">
                              <q-btn  class="" icon="play_arrow" color="positive" @click="showAttributes(elementObj1)"/>
                            </div>
                            <div class="col-2">
                              <q-btn  class="" icon="cancel" flat rounded @click="cancelEvent(elementObj1.id)"/>
                            </div>
                          </q-card>
                        </div>
                      </q-card>
                    </div>
                    <q-card class="custom-card" v-if="!elementObj.events" :class="elementObj.currentSelected" align="left">
                        <div class="col-1">
                          <q-badge color="positive" class="q-ma-sm">{{elementObj.id}}</q-badge>
                        </div>
                        <div class="col-7">
                          <label class="text-h6 q-pa-lg">{{elementObj.event}}</label>
                        </div>
                        <div class="col-2">
                          <q-btn  class="" icon="play_arrow" color="positive" @click="showAttributes(elementObj)"/>
                        </div>
                        <div class="col-2">
                          <q-btn  class="" icon="cancel" flat rounded @click="cancelEvent(elementObj.id)"/>
                        </div>
                      </q-card>
                  </div>
                </drop>
                <div class="row">
                  <select class="categories_addNew text-h6 full-width" v-model="selectedEvent" label="Select Event" @change="addEvent">
                      <option disabled>Select Event</option>
                      <option v-for="opt in eventArray1" v-bind:key="opt.value" :value="opt.name">
                        {{opt.name}}
                      </option>
                  </select>
                  <!-- <q-btn no-caps class="add_group_bt q-ma-sm col-md-3" label="Add Criteria" @click="addCriteria"/> -->
                  <q-btn no-caps class="add_group_bt q-ma-sm col-md-3 offset-md-9" label="Add Group" @click="addGroup" v-if="!openGroup"/>
                  <q-btn no-caps class="add_group_bt q-ma-sm col-md-3 offset-md-9" label="Close Group" @click="closeGroup" v-if="openGroup"/>
                </div>
              </q-card>
              <q-card class="q-pa-lg q-mt-lg custom-card">
                <div class="row">
                  <div class="col">
                    Limit initial events to
                    <select class="select-box" v-model="cdtsrc">
                      <option selected disabled>Datasource</option>
                      <option v-for="opt in dtSourceOpts" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    Contineous enrollment w.r.t initial events index start date
                  </div>
                </div>
                <div class="row">
                  <div class="col">
                    Between <select class="select-box" v-model="cdtsrc">
                      <option selected disabled>Datasource</option>
                      <option v-for="opt in dtSourceOpts" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                    </select> days before and <select class="select-box" v-model="cdtsrc">
                      <option selected disabled>Datasource</option>
                      <option v-for="opt in dtSourceOpts" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                    </select> days after
                  </div>
                </div>
              </q-card>
            </q-card>
            <q-card class="col-4 q-pa-lg" v-if="currentEvent">
              <event-attributes :event="currentEvent"></event-attributes>
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
    'event-attributes': eventAttributes
  },
  data () {
    return {
      cname: '',
      cdesc: '',
      cgrp: '',
      cdtsrc: '',
      cdtsource: '',
      scannedAisle: '',
      selectedEvent: 'Select Event',
      selectedCriteria: 'Select',
      readonlyCriteriaSelect: false,
      eventArray: [
      ],
      criteriaArray: [
        'Initial Criteria',
        'Criteria Set 1'
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
      currentNumber: 0,
      openGroup: false,
      currentGroup: 0
    }
  },
  methods: {
    showAttributes (event) {
      var that = this
      that.currentEvent = event.event
      that.setQCardColor(event.id)
    },
    addGroup () {
      var that = this
      that.currentNumber = that.getNextDigit()
      that.eventArray.push({
        'id': that.currentNumber,
        'events': [],
        'currentSelected': 'full-width q-pa-sm q-ma-sm shadow-3 row'
      })
      that.currentGroup = that.currentNumber
      that.readonlyCriteriaSelect = false
      that.openGroup = true
    },
    closeGroup () {
      var that = this
      that.readonlyCriteriaSelect = true
      that.openGroup = false
      that.currentGroup = 0
    },
    addEvent () {
      var that = this
      that.currentNumber = that.getNextDigit()
      if (that.selectedCriteria !== 'Select Event') {
        if (that.currentGroup !== 0) {
          that.eventArray[that.eventArray.length - 1].events.push({
            'id': that.currentNumber,
            'event': that.selectedEvent,
            'criteria': that.selectedCriteria,
            'currentSelected': 'q-pa-sm q-ma-sm shadow-3 row'
          })
        } else {
          that.eventArray.push({
            'id': that.currentNumber,
            'event': that.selectedEvent,
            'criteria': that.selectedCriteria,
            'currentSelected': 'q-pa-sm q-ma-sm shadow-3 row'
          })
        }
      }
      if (that.eventArray.length > 0) {
        that.readonlyCriteriaSelect = true
      } else {
        that.readonlyCriteriaSelect = false
      }
      that.selectedEvent = 'Select Event'
    },
    getNextDigit () {
      var that = this
      var newArray = that.currentNumber.toString().match(/[a-z]+|[^a-z]+/gi)
      if (that.openGroup) {
        if (newArray[1]) {
          return newArray[0].toString() + that.getNextCharacter(newArray[1])
        } else {
          return (parseInt(that.currentNumber)).toString() + 'A'
        }
      } else {
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
      that.eventArray.forEach(function (row, index) {
        if (row.id === id) {
          that.eventArray.splice(index, 1)
        }
      })
      if (that.eventArray.length > 0) {
        that.readonlyCriteriaSelect = true
      } else {
        that.readonlyCriteriaSelect = false
      }
    },
    setQCardColor (id) {
      var that = this
      that.eventArray.forEach(function (row, index) {
        if (row.id.toString() === id.toString()) {
          that.eventArray[index].currentSelected = 'full-width q-pa-sm q-ma-sm shadow-3 row bg-positive'
        } else {
          that.eventArray[index].currentSelected = 'full-width q-pa-sm q-ma-sm shadow-3 row'
        }
      })
    },
    handleDrop (data, event) {
      var that = this
      that.selectedEvent = data.element.name
      that.addEvent()
    }
  }
}
</script>
