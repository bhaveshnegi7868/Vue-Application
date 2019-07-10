<template>
  <q-page class="app-layout ">
    <secondary-header :selectedPage="selectedPage" :cohort_name="currentcohort.name"></secondary-header>
    <q-card class="row q-my-sm q-mx-sm q-ma-sm" >
      <div class="leftForm q-pa-sm">
      asfdsf
      </div>
      <div class="rightForm q-pa-sm " v-if="currentCriteria" >
      hfjhfj
      </div>
    </q-card>
   </q-page>
</template>
<style>
</style>
<script>
import secondaryHeader from 'components/secondaryHeader'
import {
} from 'quasar'
export default {
  name: 'createCohort',
  components: {
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
      selectedPage: 'Summary',
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
