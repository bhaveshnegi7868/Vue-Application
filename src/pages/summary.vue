<template>
  <q-page class="app-layout ">
    <secondary-header :selectedPage="selectedPage" :cohort_name="currentcohort.name"></secondary-header>
    <q-card class="row  q-mx-sm" >
      <div class="col-2 q-mt-sm pad0">
        <div class="categories_header ">
            Criteria Set
        </div>
        <div class="header_Bor1"></div>
        <div class="f12 q-mt-sm bor1grey">
          <q-btn  class="f12 pad0 text-capitalize  full-width borderRad0 " :class="{'bgCgreen': arrtitionNdemoGraph}"  @click="otherEvnt=0;arrtitionNdemoGraph=1;">
              Attrition and Demographics
          </q-btn>
          <q-btn  class="f12 pad0 text-capitalize full-width borderRad0" :class="{'bgCgreen': otherEvnt}"  @click="otherEvnt=1;arrtitionNdemoGraph=0;">
            Diagnosis
          </q-btn>
          <q-btn  class="f12 pad0 text-capitalize full-width borderRad0 " @click="otherEvnt=1;arrtitionNdemoGraph=0;">
            Treatment
          </q-btn>
          <q-btn  class="f12 pad0 text-capitalize full-width borderRad0"  @click="otherEvnt=1;arrtitionNdemoGraph=0;">
            Procedure
          </q-btn>
        </div>
      </div>
      <div class="col q-pa-sm" >
        <q-card class="row q-mx-sm shadow-2">
          <div class="col-4 q-ma-sm">
            <input class="input-box full-width"  placeholder="Cohort Name" />
          </div>
          <div class="col q-ma-sm">
            <input class="input-box full-width"  placeholder="Cohort Description" />
          </div>
        </q-card>
        <div class="elements-block row q-px-sm  q-mx-sm q-mt-sm shadow-2">
          <div class="col-12 q-mt-sm   shadow-2 cohortSummaryText col5">
            <div class="row BGC16 col5 text-center">
              <div class="q-mx-sm q-py-xs col">
                Source Data
              </div>
              <div class="q-mx-sm q-py-xs col">
                Executed By
              </div>
              <div class="q-mx-sm q-py-xs col">
                Executed Date
              </div>
              <div class="q-mx-sm q-py-xs col">
                Duration
              </div>
              <div class="q-mx-sm q-py-xs col">
                Status
              </div>
              <div class="q-mx-sm q-py-xs col">
                <q-icon name="av_timer" ></q-icon>
              </div>
            </div>
            <div class="row H30 col5 text-center">
              <div class="q-mx-sm q-py-xs col">
                Market Scan
              </div>
              <div class="q-mx-sm q-py-xs col">
                Swethank
              </div>
              <div class="q-mx-sm q-py-xs col">
                10 Jul 19
              </div>
              <div class="q-mx-sm q-py-xs col">
                02:50 Min
              </div>
              <div class="q-mx-sm q-py-xs col">
                Completed
              </div>
              <div class="q-mx-sm q-py-xs col">
              </div>
            </div>
          </div>
          <div  v-if="arrtitionNdemoGraph" class="col-12 q-mt-sm   shadow-2 cohortSummaryText col5">
            <div class="row f12">
              <div class="q-ma-sm col-7">
                <div class="bgCgreen q-px-xs q-py-xs ">
                  Patient Attrition Flow Summary
                </div>
                <div class="q-my-sm q-px-xs q-py-sm bor1grey H450">
                  <div class="q-mt-sm q-px-xs q-py-sm shadow-2 h40 col5">
                      MI + UA only and age > 20
                      <q-icon class="float-right q-mx-xs q-my-xs" @click="openFstChild=!openFstChild;openScdChild=0;" name="img:statics/imgs/greenRightArrow.png" />
                      <div class="float-right q-mx-xl W200 ">
                        <div class="col10 bgStatC1 q-mx-auto catColorLbl text-center ">
                          687,387
                        </div>
                      </div>
                  </div>
                  <div v-if="openFstChild" class="bor1Lightgrey q-mx-sm q-px-sm q-py-sm">
                    <div class="q-mt-sm q-px-xs q-py-sm shadow-2 h40 col5">
                        MI
                        <q-icon class="float-right q-mx-xs q-my-xs q-ml-md "  name="img:statics/imgs/greenRightArrow.png" />
                        <div class="float-right q-mx-lg W200 ">
                          <div class="col10 bgStatC1 W200 q-mx-sm catColorLbl text-center ">
                            649,743
                          </div>
                        </div>
                    </div>
                    <div class="q-mt-sm q-px-xs q-py-sm shadow-2 h40 col5">
                        UA only
                        <q-icon class="float-right q-mx-xs q-my-xs q-ml-md " @click="openScdChild=!openScdChild;" name="img:statics/imgs/greenRightArrow.png" />
                        <div class="float-right q-mx-lg W200 ">
                          <div class="col10 bgStatC1 W200 q-mx-sm  catColorLbl text-center ">
                            37,644
                          </div>
                        </div>
                    </div>
                    <div v-if="openScdChild" class="bor1Lightgrey q-mx-sm q-px-sm q-py-sm">
                      <div class="q-mt-sm q-px-xs q-py-sm shadow-2 h40 col5">
                          UA
                          <q-icon class="float-right q-mx-xs q-my-xs" name="img:statics/imgs/greenRightArrow.png" />
                          <div class="float-right q-mx-md W200 ">
                            <div class="col10 bgStatC1 W200 q-mx-xs catColorLbl text-center ">
                              52,810
                            </div>
                          </div>
                      </div>
                      <div class="q-mt-sm q-px-xs q-py-sm shadow-2 h40 col5">
                          No MI
                          <q-icon class="float-right q-mx-xs q-my-xs" name="img:statics/imgs/greenRightArrow.png" />
                          <div class="float-right q-mx-md W200 ">
                            <div class="col10 bgStatC1 W200 q-mx-xs catColorLbl text-center ">
                              12,678,320
                            </div>
                          </div>
                      </div>
                    </div>
                  </div>
                  <div class="q-mt-sm q-px-xs q-py-sm shadow-2 h40 col5">
                      Statins or FH
                      <q-icon class="float-right q-mx-xs q-my-xs" @click="openFstChild2=!openFstChild2;openScdChild2=0;" name="img:statics/imgs/greenRightArrow.png" />
                      <div class="float-right q-mx-xl W200 ">
                        <div class="col10 bgStatC2 W170 q-mx-sm catColorLbl text-center ">
                          483,429
                        </div>
                      </div>
                  </div>
                  <div v-if="openFstChild2" class="bor1Lightgrey q-mx-sm q-px-sm q-py-sm">
                    <div class="q-mt-sm q-px-xs q-py-sm shadow-2 h40 col5">
                        Statins
                        <q-icon class="float-right q-mx-xs q-my-xs"  name="img:statics/imgs/greenRightArrow.png" />
                        <div class="float-right q-mx-lg W200 ">
                          <div class="col10 bgStatC2 W170 q-mx-xs catColorLbl text-center ">
                            448,219
                          </div>
                        </div>
                    </div>
                    <div class="q-mt-sm q-px-xs q-py-sm shadow-2 h40 col5">
                        FH
                        <q-icon class="float-right q-mx-xs q-my-xs" name="img:statics/imgs/greenRightArrow.png" />
                        <div class="float-right q-mx-lg W200 ">
                          <div class="col10 bgStatC2 W170 q-mx-xs  catColorLbl text-center ">
                            68,507
                          </div>
                        </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class=" q-ma-sm   col  ">
                <div class="bgCgreen q-px-xs q-py-xs ">
                  Patient Demographics Summary
                </div>
                <div class="bor1grey q-px-xs q-my-sm ">
                  <summery-graph></summery-graph>
                </div>
              </div>
            </div>
          </div>
          <div  v-if="otherEvnt" class="col-12 q-mt-sm   shadow-2 cohortSummaryText col5">
            <div class="row f12 bor1Lightgrey">
              <div class="col-12 q-pa-sm">
                <div class="lightGreen q-px-xs q-py-xs ">
                  Top  Diagonasis
                </div>
                <div class="q-my-sm q-px-xs q-py-sm bor1Lightgrey H450">
                  <div class="bgClightGrey row q-px-xs q-py-xs ">
                    <div class="col">Condition</div>
                    <div class="col W200 q-mx-xl">Patient Count</div>
                    <div class="col q-mx-xl">Concept Id</div>
                    <div class="col">Prevalence %</div>
                    <div class="col">Length of Era</div>
                  </div>
                  <div class="row q-mt-sm q-px-xs q-py-xs shadow-2 h40 col5">
                      <div class="col">Diagnosis 01</div>
                      <div class="col q-mx-xl W200 ">
                      <div id="container" class="bgStatC1 W200">
                          <div class="clearfix q-pa-sm text-center">1,234,121</div>
                          <div class="arrow-right bgStatCBor1"></div>
                      </div>
                      </div>
                      <div class="col q-mx-xl">12345678</div>
                      <div class="col">89%</div>
                      <div class="col">124.78</div>
                  </div>
                  <div class="row q-mt-sm q-px-xs q-py-xs shadow-2 h40 col5">
                      <div class="col">Diagnosis 02</div>
                      <div class="col q-mx-xl W200 ">
                        <div id="container" class="bgStatC2 W170">
                            <div class="clearfix q-pa-sm text-center">1,234,121</div>
                            <div class="arrow-right bgStatCBor2"></div>
                        </div>
                      </div>
                      <div class="col q-mx-xl">12345678</div>
                      <div class="col">89%</div>
                      <div class="col">124.78</div>
                  </div>
                  <div class="row q-mt-sm q-px-xs q-py-xs shadow-2 h40 col5">
                      <div class="col">Diagnosis 03</div>
                      <div class="col q-mx-xl W200 ">
                        <div id="container" class="bgStatC3 W150">
                            <div class="clearfix q-pa-sm text-center">1,234,121</div>
                            <div class="arrow-right bgStatCBor3"></div>
                        </div>
                      </div>
                      <div class="col q-mx-xl">12345678</div>
                      <div class="col">89%</div>
                      <div class="col">124.78</div>
                  </div>
                  <div class="row q-mt-sm q-px-xs q-py-xs shadow-2 h40 col5">
                      <div class="col">Diagnosis 04</div>
                      <div class="col q-mx-xl W200 ">
                        <div id="container" class="bgStatC4 W120">
                            <div class="clearfix q-pa-sm text-center">1,234,121</div>
                            <div class="arrow-right bgStatCBor4"></div>
                        </div>
                      </div>
                      <div class="col q-mx-xl">12345678</div>
                      <div class="col">89%</div>
                      <div class="col">124.78</div>
                  </div>
                  <div class="row q-mt-sm q-px-xs q-py-xs shadow-2 h40 col5">
                      <div class="col">Diagnosis 05</div>
                      <div class="col q-mx-xl W200 ">
                        <div id="container" class="bgStatC5 W100">
                            <div class="clearfix q-pa-sm text-center">1,234,121</div>
                            <div class="arrow-right bgStatCBor5"></div>
                        </div>
                      </div>
                      <div class="col q-mx-xl">12345678</div>
                      <div class="col">89%</div>
                      <div class="col">124.78</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </q-card>
   </q-page>
</template>

<style>
</style>

<script>
import {} from 'vue-drag-drop'
import secondaryHeader from 'components/secondaryHeader'
import summeryGraph from 'components/summeryGraph'
import {
} from 'quasar'
export default {
  name: 'createCohort',
  components: {
    'secondary-header': secondaryHeader,
    'summery-graph': summeryGraph
  },
  data () {
    return {
      currentcohort: {
        'name': 'New cohort',
        'description': 'cohort Description',
        'group': 'GRP2',
        'datasource': 'dt1'
      },
      openFstChild: 0,
      openScdChild: 0,
      openFstChild2: 0,
      openScdChild2: 0,
      arrtitionNdemoGraph: 1,
      otherEvnt: 0,
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
    openChild (openFstChild) {
      openFstChild = !openFstChild
    },
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
