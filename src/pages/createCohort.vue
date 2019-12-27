<template>
  <q-page class="app-layout " >
    <secondary-header :selectedPage="selectedPage" :cohort_name="baseObj" ></secondary-header>
    <div  class="row createcohortHeaderform q-px-sm q-py-sm" v-if="pagemethod != 'view'">
        <q-card class="row col-10 q-mr-xs">
            <div class="col-2 q-px-sm q-py-xs">
                <input class="input-box full-width" v-model="baseObj.cohort_name" @keydown.space.prevent placeholder="* Cohort Name" />
            </div>
            <div class="col-5 q-px-sm q-py-xs">
                <input class="input-box full-width" v-model="baseObj.cohort_desc" placeholder="Cohort Description" />
            </div>
            <div class="col q-px-sm q-py-xs">
              <q-select
                use-input
                hide-selected
                fill-input
                transition-show="jump-down"
                transition-hide="jump-up"
                v-model="baseObj.cohort_group"
                :options="cohortGroups"
                @focus="getCohortGroupList"
                class=" bor8R f12 select-box"
                @filter="cohortGroupfilterFn"
                placeholder="* Cohort Group"
              />
              <!-- <q-btn-dropdown
                  v-if="renderComponent1"
                  flat
                  no-caps
                  :label="baseObj.cohort_group ? baseObj.cohort_group : 'Cohort Group'"
                  class="full-width  f12 select-box"
                  @click="getCohortGroupList"
                  auto-close
                >
                <q-btn
                  color="theamGreen"
                  class="full-width f10"
                  icon-right="add"
                  label="Add New Cohort Group"
                  @click="openCreateCohortGroupPopup"
                  v-close-popup
                >
                </q-btn>
                <q-card  class="bg-secondary text-white selected-btn-dropdown">
                  {{baseObj.cohort_group}}
                </q-card>
                <div class="options-values" v-for="opt in cohortGroups" v-bind:key="opt.name" @click="makeSelected('cohort_group',opt.name)" v-close-popup>
                  {{opt.name}}
                </div>
              </q-btn-dropdown> -->
            </div>
            <div class=" q-px-xs q-py-xs ">
              <q-btn
                  color="theamGreen"
                  class="f10 bor8R w2R q-pa-none q-ma-none"
                  icon="add"
                  @click="openCreateCohortGroupPopup"
                >
                <q-tooltip>
                  Create Cohort Group
                </q-tooltip>
                </q-btn>
            </div>
            <div class="col q-px-sm q-py-xs">
              <q-select
                use-input
                hide-selected
                fill-input
                transition-show="jump-down"
                transition-hide="jump-up"
                v-model="baseObj.data_source"
                :options="dataSources"
                @focus="getDataSourceList"
                class="bor8R f12 select-box"
                @filter="datasourcefilterFn"
                Placeholder="* Datasource"
              />
              <!-- <q-btn-dropdown
                  v-if="renderComponent1"
                  no-caps
                  flat
                  :label="baseObj.data_source ? baseObj.data_source : 'Datasource'"
                  class="full-width f12 select-box"
                  @click="getDataSourceList"
                  auto-close
                >
                <div class="options-values" v-for="opt in dataSources" v-bind:key="opt.name" @click="makeSelected('data_source',opt.name)" v-close-popup>
                  {{opt.name}}
                </div>
              </q-btn-dropdown> -->
            </div>
        </q-card>
        <q-card class="col row">
          <div class="col-2 createCohortbtnGrp q-mx-xs q-py-xs">
            <q-btn outlined icon="autorenew" class="f10 action-btns borC2 full-width" text-color="negative" @click="reset">
              <q-tooltip>
                Reset
              </q-tooltip>
            </q-btn>
          </div>
          <div class="col createCohortbtnGrp q-py-xs q-mx-xs" v-if="pagemethod !== 'update'">
            <q-btn outlined icon="save" :disable="!baseObj.cohort_name" label="Save" class="f10 action-btns borC2 q-mx-xs full-width" text-color="primary" @click="saveCohort"/>
            <q-tooltip>
                Save
              </q-tooltip>
          </div>
          <div class="col-5 createCohortbtnGrp q-py-xs q-mx-xs" v-if="pagemethod === 'update'">
            <q-btn outlined icon="save" :disable="!baseObj.cohort_name" label="Update" class="f10 action-btns borC2 q-mx-xs full-width" text-color="primary" @click="saveCohort"/>
            <q-tooltip>
                Update
              </q-tooltip>
          </div>
          <div class="col createCohortbtnGrp q-py-xs q-mx-xs">
            <q-btn outlined icon="play_circle_filled" :disable="!((baseObj.cohort_name && baseObj.data_source && baseObj.cohort_group && baseObj.criteriaObj.PrimaryCriteria.CriteriaList.length >= 1 && baseObj.criteriaObj.PrimaryCriteria.CriteriaList[0].name) && (((baseObj.criteriaObj.PrimaryCriteria.CriteriaList[0].ConditionOccurrence != undefined) && (baseObj.criteriaObj.PrimaryCriteria.CriteriaList[0].ConditionOccurrence.listDiagnosis != undefined) && (baseObj.criteriaObj.PrimaryCriteria.CriteriaList[0].ConditionOccurrence.listDiagnosis.codeset != undefined)) || ((baseObj.criteriaObj.PrimaryCriteria.CriteriaList[0].DrugExposure != undefined) && (baseObj.criteriaObj.PrimaryCriteria.CriteriaList[0].DrugExposure.listDrugs != undefined) && (baseObj.criteriaObj.PrimaryCriteria.CriteriaList[0].DrugExposure.listDrugs.codeset != undefined)) || ((baseObj.criteriaObj.PrimaryCriteria.CriteriaList[0].ProcedureOccurrence != undefined) && (baseObj.criteriaObj.PrimaryCriteria.CriteriaList[0].ProcedureOccurrence.listProcedures != undefined) && (baseObj.criteriaObj.PrimaryCriteria.CriteriaList[0].ProcedureOccurrence.listProcedures.codeset != undefined))))" label="Run" @click="runCohort()" class="f10  q-mx-xs action-btns borC3 full-width" text-color="positive"/>
              <q-tooltip>
                Run
              </q-tooltip>
          </div>
        </q-card>
    </div>
    <q-card class="row createBoxHeight q-mx-sm" v-if="pagemethod != 'view'">
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
              <label>* Primary Criteria</label>
            </q-item-section>
          </q-item>
          <q-item
            v-for="(criteria,index) in baseObj.criteriaObj.InclusionRules"
            :key="criteria.id"
            clickable
            v-ripple
            class="categories_list ellipsis"
            :active="link === criteria.id"
            @click="markCriteriaAsSelected(criteria)"
            active-class="categories_Selected"
          >
            <q-item-section>
              <div  class="ellipsis" @click="markCriteriaAsSelected(criteria)">
              <span class="q-mr-md">Inclusion Criteria - {{index + 1}}</span>
              <div class="close-btn-criteria">
                <q-btn class="q-pa-none f8 q-mx-xs q-mt-xs float-right" icon="cancel" flat rounded @click="remselection(index)" @click.stop="markCriteriaAsSelected"/>
              </div>
              </div>
            </q-item-section>
          </q-item>
        </q-list>
        <q-btn class="categories_addNew full-width" @click="addNewCriteria">
            Add Criteria Set
        </q-btn>
        <!--<q-btn class="categories_addNew full-width" @click="createDictAndShow">
            Show Dict
        </q-btn>-->
      </div>
      <div class="rightForm q-pa-sm" v-if="currentCriteria">
        <q-card class="row q-mx-sm shadow-2" v-if="currentCriteria['PCriteriaSetName'] === undefined">
          <div class="col-4 q-ma-sm" >
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
                <div v-if="!currentInclusionObj.type">Any of the following criteria *</div>
                <div class="row" v-if="currentCriteria['PCriteriaSetName'] === undefined">
                  <div class="col" v-if="currentInclusionObj.type">
                    <select class="criteria-box H25" v-model="currentInclusionObj.type.op">
                      <option value="All">All</option>
                      <option value="Any">Any</option>
                      <option value="at most">At Most</option>
                      <option value="at least">At Least</option>
                    </select> &nbsp;
                    <!-- <input type="number" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  v-model="currentInclusionObj.type.count" class="q-mx-xs text-center q-pa-xs w2R input-box" v-if="currentInclusionObj.type.op === 'at most' || currentInclusionObj.type.op === 'at least'" min=0 :max="currentCriteria.CriteriaList.length+currentInclusionObj.Groups.length"> -->
                    <select class="criteria-box H25" v-model="currentInclusionObj.type.count" v-if="currentInclusionObj.type.op === 'at most' || currentInclusionObj.type.op === 'at least'">
                      <option value="0">0</option>
                      <option v-for="i in currentCriteria.CriteriaList.length+currentInclusionObj.Groups.length" v-bind:key="i">
                        {{i}}
                      </option>
                    </select>
                     of the following criteria
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
                          <q-btn v-if="currentCriteria['PCriteriaSetName'] !== undefined && elementObj.CorrelatedCriteria" class="fCgreen q-px-none float-right f12" icon="remove_circle" flat rounded  @click="removeCorelatedCriteria(elementObj)" @click.stop.prevent="showAttributes()"/>
                        </div>
                        <div class="">
                          <q-btn class="fCgreen q-pl-none q-pr-xs float-right f12" icon="cancel" flat rounded @click.stop.prevent="showAttributes()"  @click="cancelEvent(elementObj.id,elementObj)"/>
                        </div>
                      </q-card>
                      <div v-if="elementObj.CorrelatedCriteria" class="corelated-criteria-block">
                        <input ref="textbox" class="input-box full-width q-mx-xs" v-model="elementObj.CorrelatedCriteria.Name" placeholder="Corelated Criteria Name" />
                        <div v-if="elementObj.CorrelatedCriteria.CriteriaList != ''" class="row full-width ">
                          <q-card
                          v-for="(elementObj1,index1) in elementObj.CorrelatedCriteria.CriteriaList"
                          :key="elementObj1.id"
                          :class="elementObj1.currentSelected"
                          class="custom-card-2 event-card "
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
                        <div class="col q-px-sm q-pt-sm">
                          <input class="input-box full-width q-mx-xs" v-model="elementObj.Name" placeholder="Group Name" />
                        </div>
                        <div class="col-1 q-px-xs q-mt-xs">
                          <q-btn class="fCgreen f12 q-px-xs float-right" icon="cancel" flat rounded @click="cancelEvent(elementObj.id)"/>
                        </div>
                        <div class="col-12 row  q-px-sm q-pt-xs">
                          <select class="criteria-box H25 q-mr-sm" v-model="elementObj.type.op">
                            <option disabled>Select</option>
                            <option value="All">All</option>
                            <option value="Any">Any</option>
                            <option value="at most">At Most</option>
                            <option value="at least">At Least</option>
                            </select>
                            <input type="number" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="elementObj.type.count" class=" q-mx-xs text-center q-pa-xs w2R input-box" v-if="elementObj.type.op === 'at most' || elementObj.type.op === 'at least'" min=0 :max="elementObj.CriteriaList.length">
                            <span class="q-ma-xs"> of the criteria </span>
                        </div>
                        <div class="row q-px-sm q-pt-xs full-width">
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
              <q-card class="q-pa-sm q-mt-lg f12 custom-card" v-if="currentCriteria.ObservationWindow">
                <div class="row" v-if="currentCriteria.ObservationWindow">
                  <div class="col">
                    Limit initial events to
                    <select class="criteria-box H25 w9R" v-model="currentCriteria.PrimaryCriteriaLimit.Type" label="Select">
                      <option value=" " disabled>Select Initial event</option>
                      <option v-for="opt in dtSourceOpts2" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row q-mt-xs" v-if="currentCriteria.ObservationWindow">
                    <div class="col">
                      Continuous enrollment w.r.t initial events index start date
                    </div>
                </div>
                <div class="row q-mt-xs" v-if="currentCriteria.ObservationWindow">
                  <div class="col">
                    Between <input type="text" maxlength="5" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="input-box H25 w4R" v-model="currentCriteria.ObservationWindow.PriorDays"/>
                     days before and <input type="text" maxlength="5" onkeypress="return event.charCode >= 48 && event.charCode <= 57" class="input-box H25 w4R" v-model="currentCriteria.ObservationWindow.PostDays"/> days after
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
    <div  class="row createcohortHeaderform q-px-sm q-py-sm" v-if="pagemethod === 'view'">
        <q-card class="row col-12 ">
            <div class="col-2 q-px-sm q-py-xs">
                <input class="input-box full-width" readonly="true" v-model="baseObj.cohort_name" placeholder="* View Name" />
            </div>
            <div class="col-5 q-px-sm q-py-xs">
                <input class="input-box full-width" readonly="true" v-model="baseObj.cohort_desc" placeholder="Cohort Description" />
            </div>
            <div class="col q-px-sm q-py-xs">
              <!-- <q-btn-dropdown
                  v-if="renderComponent1"
                  disabled
                  flat
                  no-caps
                  :label="baseObj.cohort_group ? baseObj.cohort_group : 'Cohort Group'"
                  class="full-width  f12 select-box"
                  @click="getCohortGroupList"
                  auto-close
                > -->
                <q-btn
                  color="theamGreen"
                  class="full-width f12"
                  icon-right="add"
                  label="Add New Cohort Group"
                  @click="openCreateCohortGroupPopup"
                  v-close-popup
                />
                <!-- <q-card  class="bg-secondary text-white selected-btn-dropdown">
                  {{baseObj.cohort_group}}
                </q-card>
                <div class="options-values" v-for="opt in cohortGroups" v-bind:key="opt.name" @click="makeSelected('cohort_group',opt.name)" v-close-popup>
                  {{opt.name}}
                </div>
              </q-btn-dropdown> -->
            </div>
            <!-- <div class="col q-px-sm q-py-xs">
              <q-btn-dropdown
                  v-if="renderComponent1"
                  no-caps
                  disabled
                  flat
                  :label="baseObj.data_source ? baseObj.data_source : 'Datasource'"
                  class="full-width f12 select-box"
                  @click="getDataSourceList"
                  auto-close
                >
                <div class="options-values" v-for="opt in dataSources" v-bind:key="opt.name" @click="makeSelected('data_source',opt.name)" v-close-popup>
                  {{opt.name}}
                </div>
              </q-btn-dropdown>
            </div> -->
        </q-card>
    </div>
    <q-card class="row createBoxHeight q-mx-sm" v-if="pagemethod === 'view'">
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
            v-for="(criteria,index) in baseObj.criteriaObj.InclusionRules"
            :key="criteria.id"
            clickable
            v-ripple
            class="categories_list ellipsis"
            :active="link === criteria.id"
            @click="markCriteriaAsSelected(criteria)"
            active-class="categories_Selected"
          >
            <q-item-section>
              <div  class="ellipsis" @click="markCriteriaAsSelected(criteria)">
              <span class="q-mr-md">Inclusion Criteria - {{index + 1}}</span>
              </div>

            </q-item-section>
          </q-item>
        </q-list>
      </div>
      <div class="rightForm q-pa-sm" v-if="currentCriteria">
        <q-card class="row q-mx-sm shadow-2" v-if="currentCriteria['PCriteriaSetName'] === undefined">
          <div class="col-4 q-ma-sm">
            <input class="input-box full-width"  readonly="true" v-model="currentInclusionObj.ICriteriaSetName" placeholder="Criteria Name" />
          </div>
          <div class="col q-ma-sm">
            <input class="input-box full-width"  readonly="true" v-model="currentInclusionObj.ICriteriaSetDesc" placeholder="Criteria Description" />
          </div>
        </q-card>
        <q-card class="row q-mx-sm shadow-2"  readonly="true" v-if="currentCriteria['PCriteriaSetName'] !== undefined">
          <div class="col-4 q-ma-sm">
            <input class="input-box full-width"  readonly="true" v-model="currentCriteria.PCriteriaSetName" placeholder="Criteria Name" />
          </div>
          <div class="col q-ma-sm">
            <input class="input-box full-width"  readonly="true" v-model="currentCriteria.PCriteriaSetDesc" placeholder="Criteria Description" />
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
                  <div class="col" v-if="currentInclusionObj.type">
                    <select class="criteria-box H25" disabled v-model="currentInclusionObj.type.op">
                      <option disabled>Select</option>
                      <option value="All">All</option>
                      <option value="Any">Any</option>
                      <option value="at most">At Most</option>
                      <option value="at least">At Least</option>
                    </select>
                    <input type="number" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  readonly="true" v-model="currentInclusionObj.type.count" class="text-center q-pa-xs w2R  q-mx-xs input-box" v-if="currentInclusionObj.type.op === 'at most' || currentInclusionObj.type.op === 'at least'" min=0 :max="currentCriteria.CriteriaList.length+currentInclusionObj.Groups.length">
                     of the criteria
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
                      </q-card>
                      <div v-if="elementObj.CorrelatedCriteria" class="corelated-criteria-block">
                        <input ref="textbox"  readonly="true" class="input-box full-width q-mx-xs" v-model="elementObj.CorrelatedCriteria.Name" placeholder="Corelated Criteria Name" />
                        <div v-if="elementObj.CorrelatedCriteria.CriteriaList != ''" class="row full-width ">
                          <q-card
                          v-for="(elementObj1,index1) in elementObj.CorrelatedCriteria.CriteriaList"
                          :key="elementObj1.id"
                          :class="elementObj1.currentSelected"
                          class="custom-card-2 event-card "
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
                        <div class="col-12 q-pa-sm">
                          <input class="input-box full-width q-mx-xs"  readonly="true" v-model="elementObj.Name" placeholder="Group Name" />
                        </div>
                        <div class="col-12 row  q-pa-sm">
                          <select class="criteria-box H25 q-mr-sm" disabled v-model="elementObj.type.op">
                            <option disabled>Select</option>
                            <option value="All">All</option>
                            <option value="Any">Any</option>
                            <option value="at most">At Most</option>
                            <option value="at least">At Least</option>
                            </select>
                            <input type="number" onkeypress="return event.charCode >= 48 && event.charCode <= 57" readonly="true" v-model="elementObj.type.count" class="input-box text-center q-pa-xs w2R q-mx-xs " v-if="elementObj.type.op === 'at most' || elementObj.type.op === 'at least'" min=0 :max="elementObj.CriteriaList.length">
                            <span class="q-my-sm"> of the criteria </span>
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
                          </q-card>
                        </div>
                      </q-card>
                    </div>
                  </div>
              </q-card>
              <q-card class="q-pa-sm q-mt-lg f12 custom-card">
                <div class="row" v-if="currentCriteria.ObservationWindow">
                  <div class="col">
                    Limit initial events to
                    <option value="" selected disabled>Choose</option>
                    <select class="criteria-box H25 w9R" disabled v-model="currentCriteria.PrimaryCriteriaLimit.Type">
                      <option v-for="opt in dtSourceOpts2" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                    </select>
                  </div>
                </div>
                <div class="row q-mt-xs" v-if="currentCriteria.ObservationWindow">
                    <div class="col">
                      Continuous enrollment w.r.t initial events index start date
                    </div>
                </div>
                <div class="row q-mt-xs" v-if="currentCriteria.ObservationWindow">
                  <div class="col">
                    Between <input  readonly="true" class="input-box H25 w4R" v-model="currentCriteria.ObservationWindow.PriorDays"/>
                     days before and <input  readonly="true" class="input-box H25 w4R" v-model="currentCriteria.ObservationWindow.PostDays"/> days after
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
  ClosePopup,
  QSelect
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
    QSelect,
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
      cohortGroupFilter: '',
      renderComponent2: true,
      dictPopup: false,
      createCohortGroupPopup: false,
      // swal2-popup = false
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
            'ObservationWindow': {
              'PriorDays': 0,
              'PostDays': 0
            },
            'PrimaryCriteriaLimit': {
              'Type': 'First'
            }
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
          value: 'First',
          label: 'Earliest'
        },
        {
          value: 'All',
          label: 'All events'
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
    reset () {
      window.location.reload()
    },
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
    remselection (index) {
      this.baseObj.criteriaObj.InclusionRules.splice(index, 1)
      this.markCriteriaAsSelected(this.criteriaArray[0])
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
        that.$swal(
          'Done !',
          'Created successfully',
          'success'
        )
      }).catch(function () {
        that.$q.notify({
          color: 'theamBlue',
          textColor: 'white',
          message: 'Cohort group already exists',
          position: 'bottom-right',
          timeout: 3000
        })
      })
      // axios.post(url, datadict).then(function (response) {
      //   that.createCohortGroupPopup = false
      // }).catch(function () {
      //   that.$q.notify({
      //     color: 'green',
      //     textcolor: 'white',
      //     message: 'New cohort group created successfully',
      //     position: 'bottom-right',
      //     timeout: 3000
      //   })
      // })
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
        'type': {
          'op': 'Any'
        },
        'Name': '',
        'CriteriaList': [],
        'currentSelected': 'full-width q-pa-sm q-mt-xs yes35  shadow-2 row'
      })
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
      console.log('test check')
      var that = this
      console.log('mY check')
      if (that.selectedCriteria !== 'Select Event') {
        if (groupId) {
          if (groupId.constructor.name !== 'Event' && groupId !== 0) {
            var inde = that.getIndexWithId(groupId)
            that.currentInclusionObj.Groups[inde.index].CriteriaList.push({
              'id': that.getNextDigit(inde.lastChar),
              'event': that.selectedEvent,
              'criteria': that.selectedCriteria,
              'currentSelected': 'q-pa-sm yess3 q-mt-sm shadow-2 row',
              'corelated': true
            })
          } else {
            that.currentCriteria.currentNumber = that.getNextDigit()
            console.log('testing')
            console.log(that.currentCriteria)
            if (that.currentCriteria.PCriteriaSetName !== undefined) {
              that.currentCriteria['CriteriaList'].push({
                'id': that.currentCriteria.currentNumber,
                'event': that.selectedEvent,
                'criteria': that.selectedCriteria,
                'currentSelected': 'q-pa-sm yess5 q-mt-xs shadow-2 row'
              })
            } else {
              that.currentCriteria['CriteriaList'].push({
                'id': that.currentCriteria.currentNumber,
                'event': that.selectedEvent,
                'criteria': that.selectedCriteria,
                'currentSelected': 'q-pa-sm yess5 q-mt-xs shadow-2 row',
                'corelated': true
              })
            }
          }
        } else {
          that.currentCriteria.currentNumber = that.getNextDigit()
          that.currentCriteria.CriteriaList.push({
            'id': that.currentCriteria.currentNumber,
            'event': that.selectedEvent,
            'criteria': that.selectedCriteria,
            'currentSelected': 'q-pa-sm q-mt-xs yes44 shadow-2 row',
            'name': ''
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
        'type': {
          'op': 'Any'
        },
        'Name': elementObj.name,
        'CriteriaList': []
      }
      that.$nextTick(() => {
        that.renderComponent2 = true
      })
    },
    removeCorelatedCriteria (elementObj) {
      var that = this
      that.renderComponent2 = false
      elementObj.name = elementObj.CorrelatedCriteria.Name
      elementObj.CorrelatedCriteria = false
      that.$nextTick(() => {
        that.renderComponent2 = true
      })
      that.renderComponent = false
    },
    setQCardColor (event) {
      var that = this
      that.currentCriteria.CriteriaList.forEach(function (row, index) {
        if (row.id.toString() === event.id.toString()) {
          console.log('test Result')
          console.log(that.currentCriteria)
          that.currentCriteria.CriteriaList[index].currentSelected = 'q-pa-sm q-ma-sm shadow-2 yesss7 row selected-criteria'
        } else {
          that.currentCriteria.CriteriaList[index].currentSelected = 'q-pa-sm q-ma-sm shadow-2 yesss9 row'
        }
        if (row.CorrelatedCriteria) {
          try {
            row.CorrelatedCriteria.CriteriaList.forEach(function (row, index) {
              if (row.id.toString() === event.id.toString()) {
                row.currentSelected = 'q-pa-sm q-ma-sm shadow-2  yess8 row selected-criteria'
              } else {
                row.currentSelected = 'q-pa-sm q-ma-sm shadow-2 yess12 row'
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
              that.currentInclusionObj.Groups[index].CriteriaList[index1].currentSelected = 'q-pa-sm  q-mt-xs yess23 shadow-2 row selected-criteria'
            } else {
              that.currentInclusionObj.Groups[index].CriteriaList[index1].currentSelected = 'q-pa-sm q-mt-xs yes25 shadow-2 row'
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
      console.log(that.selectedCriteria)
      console.log(that.selectedEvent)
      elementObj.CorrelatedCriteria.CriteriaList.push({
        'id': that.getNextDigit(charToGet),
        'event': that.selectedEvent,
        'criteria': that.selectedCriteria,
        'currentSelected': 'q-pa-sm yess q-ma-sm yes34 shadow-2 row',
        'corelated': true
      })
      var container = this.$el.querySelector('#list-group')
      container.scrollTop = container.scrollHeight
      that.selectedEvent = 'Select Event'
    },
    markCriteriaAsSelected (criteria) {
      var that = this
      that.renderComponent = 0
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
          if (row.id === criteria.id) {
            that.link = row.id
            if (that.baseObj['criteriaObj']['InclusionRules'][index - 1]) {
              that.currentCriteria = that.baseObj['criteriaObj']['InclusionRules'][index - 1].expression
              that.currentInclusionObj = that.baseObj['criteriaObj']['InclusionRules'][index - 1]
            } else {
              // if (criteria) {
              //   that.baseObj['criteriaObj']['InclusionRules'][index - 1] = {
              //     'expression': {
              //       'CriteriaList': [],
              //       'ObservationWindow': false,
              //       'PrimaryCriteriaLimit': {}
              //     },
              //     'Groups': [],
              //     'type': {}
              //   }
              //   that.currentInclusionObj = that.baseObj['criteriaObj']['InclusionRules'][index - 1]
              //   that.currentCriteria = that.baseObj['criteriaObj']['InclusionRules'][index - 1].expression
              // }
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
      console.log('yesss')
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
      that.$forceUpdate()
    },
    addNewCriteria () {
      var that = this
      let criteriaObj = {
        'id': that.baseObj.criteriaObj.InclusionRules.length + 2,
        'ICriteriaSetName': '',
        'ICriteriaSetDesc': '',
        'type': {
          'op': 'Any',
          'count': 0
        },
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
        var arr = []
        response.data.result.forEach(function (row) {
          arr.push(row.name)
        })
        that.cohortGroups = arr
        that.loading = false
      })
    },
    getDataSourceList () {
      var that = this
      var url = process.env.API_URL + 'cohort/datasource/list/'
      axios.get(url).then(function (response) {
        var arr = []
        response.data.result.forEach(function (row) {
          arr.push(row.name)
        })
        that.dataSources = arr
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
        console.log(that.currentEvent)
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
        that.$swal({
          type: 'success',
          title: 'Updating Data, Please Wait',
          showConfirmButton: false,
          timer: 2000
        })
      }
      var url = process.env.API_URL + 'cohort/create/'
      var method
      console.log('save my obj Object')
      console.log(that.baseObj)
      that.baseObj.actual_JSON = {}
      that.baseObj.actual_JSON.PrimaryCriteria = {}
      that.baseObj.actual_JSON.PrimaryCriteria.Name = that.baseObj.criteriaObj.PrimaryCriteria.PCriteriaSetName
      that.baseObj.actual_JSON.PrimaryCriteria.Description = that.baseObj.criteriaObj.PrimaryCriteria.PCriteriaSetDesc
      that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList = []
      that.baseObj.criteriaObj.PrimaryCriteria.CriteriaList.forEach(function (data, index) {
        console.log('event loop')
        console.log(data)
        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index] = {}
        for (var key in data) {
          var resType = (typeof data[key])
          if (resType === 'object') {
            if (key === 'ConditionOccurrence' || key === 'DrugExposure' || key === 'ProcedureOccurrence') {
              if (!that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key]) {
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key] = {}
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key].Name = data.name
              }
            }
            for (var kIndx in data[key]) {
              if (kIndx === 'OccurrenceStartDate' || kIndx === 'Age' || kIndx === 'Refills' || kIndx === 'Quantity' || kIndx === 'DaysSupply') {
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx] = {}
                if (data[key][kIndx].Op !== '') {
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Op = data[key][kIndx].Op
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Value = data[key][kIndx].Value
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Extent = data[key][kIndx].Extent
                } else {
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Op = undefined
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Value = undefined
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Extent = undefined
                }
              }
              if (kIndx === 'OccurrenceStartDate') {
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx] = {}
                if (data[key][kIndx].Op !== '') {
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Op = data[key][kIndx].Op
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Value = data[key][kIndx].Extent
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Extent = data[key][kIndx].Value
                } else {
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Op = undefined
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Value = undefined
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Extent = undefined
                }
              }
              if (kIndx === 'OccurrenceLimit') {
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx] = {}
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].First = data[key][kIndx].value
              }
              if (kIndx === 'Gender' || kIndx === 'DrugType' || kIndx === 'ProviderSpecialty' || kIndx === 'VisitType' || kIndx === 'ProcedureType' || kIndx === 'ConditionType') {
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][data[key][kIndx].name] = {}
                if (data[key][kIndx][data[key][kIndx].inputs[0].name] && data[key][kIndx][data[key][kIndx].inputs[0].name].length !== 0) {
                  that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][data[key][kIndx].name] = []
                  data[key][kIndx][data[key][kIndx].inputs[0].name].forEach(function (v, k) {
                    that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][data[key][kIndx].name].push(v.value)
                  })
                }
              }
              if (kIndx === 'listDiagnosis' || kIndx === 'listProcedures' || kIndx === 'listDrugs') {
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key].Codeset = []
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key].Codeset = (data[key][kIndx].codeset && data[key][kIndx].codeset.value) ? data[key][kIndx].codeset.value : ''
              }
              if (kIndx === 'Occurrence') {
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx] = {}
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Count = data[key][kIndx].count
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].Type = data[key][kIndx].type
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][key][kIndx].IsDistinct = true
              }
            }
            if (key === 'CorrelatedCriteria') {
              console.log('CorrelatedCriteria Object')
              console.log(data[key])
              var coParentKey = (data.event === 'Treatment' ? 'DrugExposure' : (data.event === 'Diagnosis' ? 'ConditionOccurrence' : 'ProcedureOccurrence'))
              if (!that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey]) {
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey] = {}
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey].Name = data[key].Name
              }
              that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key] = {}
              that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].Name = data[key].Name
              that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList = []
              data[key].CriteriaList.forEach(function (codata, i) {
                console.log(codata)
                that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i] = {}
                for (var cokey in codata) {
                  var resType = (typeof codata[cokey])
                  if (resType === 'object') {
                    that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey] = {}
                    that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey].Name = codata.name
                    for (var cokIndx in codata[cokey]) {
                      console.log('Inside child loop CorrelatedCriteria Object')
                      console.log(cokIndx)
                      if (cokIndx === 'OccurrenceStartDate' || cokIndx === 'Age' || cokIndx === 'Refills' || cokIndx === 'Quantity' || cokIndx === 'DaysSupply') {
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx] = {}
                        if (codata[cokey][cokIndx].Op !== '') {
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Op = codata[cokey][cokIndx].Op
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Value = codata[cokey][cokIndx].Value
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Extent = codata[cokey][cokIndx].Extent
                        } else {
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Op = undefined
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Value = undefined
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Extent = undefined
                        }
                      }
                      if (cokIndx === 'OccurrenceStartDate') {
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx] = {}
                        if (codata[cokey][cokIndx].Op !== '') {
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Op = codata[cokey][cokIndx].Op
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Value = codata[cokey][cokIndx].Extent
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Extent = codata[cokey][cokIndx].Value
                        } else {
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Op = undefined
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Value = undefined
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Extent = undefined
                        }
                      }
                      if (cokIndx === 'OccurrenceLimit') {
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx] = {}
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].First = codata[cokey][cokIndx].Value
                      }
                      if (cokIndx === 'Gender' || cokIndx === 'DrugType' || cokIndx === 'ProviderSpecialty' || cokIndx === 'VisitType' || cokIndx === 'ProcedureType' || cokIndx === 'ConditionType') {
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][codata[cokey][cokIndx].name] = {}
                        if (codata[cokey][cokIndx][codata[cokey][cokIndx].inputs[0].name] && codata[cokey][cokIndx][codata[cokey][cokIndx].inputs[0].name].length !== 0) {
                          that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][[codata[cokey][cokIndx].name]] = []
                          codata[cokey][cokIndx][codata[cokey][cokIndx].inputs[0].name].forEach(function (v, k) {
                            that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][[codata[cokey][cokIndx].name]].push(v.value)
                          })
                        }
                      }
                      if (cokIndx === 'listDiagnosis' || cokIndx === 'listProcedures' || cokIndx === 'listDrugs') {
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey].Codeset = []
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey].Codeset = (codata[cokey][cokIndx].codeset && codata[cokey][cokIndx].codeset.value) ? codata[cokey][cokIndx].codeset.value : ''
                      }
                      if (cokIndx === 'Occurrence') {
                        console.log('Inside child loop CorrelatedCriteria Object')
                        console.log('occurance data')
                        console.log(codata[cokey][cokIndx].count)
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx] = {}
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Count = codata[cokey][cokIndx].count
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].Type = codata[cokey][cokIndx].type
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey][cokIndx].IsDistinct = true
                      }
                      if (cokIndx === 'OccurrenceIndexStartDate') {
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey].StartWindow = { 'Start': {}, 'End': {} }
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey].StartWindow.Start.Coeff = (codata[cokey][cokIndx].data.stype === 'After' ? 1 : -1)
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey].StartWindow.Start.Days = codata[cokey][cokIndx].data.sday
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey].StartWindow.End.Coeff = (codata[cokey][cokIndx].data.etype === 'After' ? 1 : -1)
                        that.baseObj.actual_JSON.PrimaryCriteria.CriteriaList[index][coParentKey][key].CriteriaList[i][cokey].StartWindow.End.Days = codata[cokey][cokIndx].data.eday
                      }
                    }
                  }
                }
              })
            }
          }
        }
      })
      that.baseObj.actual_JSON.PrimaryCriteria.PrimaryCriteriaLimit = that.baseObj.criteriaObj.PrimaryCriteria.PrimaryCriteriaLimit
      that.baseObj.actual_JSON.PrimaryCriteria.ObservationWindow = that.baseObj.criteriaObj.PrimaryCriteria.ObservationWindow
      console.log('Result JSON with PrimaryCriteria')
      console.log(that.baseObj.actual_JSON)
      that.baseObj.actual_JSON.InclusionRules = []
      that.baseObj.criteriaObj.InclusionRules.forEach(function (data, index) {
        console.log('Inclusion start')
        that.baseObj.actual_JSON.InclusionRules[index] = {}
        that.baseObj.actual_JSON.InclusionRules[index].Name = data.ICriteriaSetName
        that.baseObj.actual_JSON.InclusionRules[index].Desc = data.ICriteriaSetDesc
        that.baseObj.actual_JSON.InclusionRules[index].expression = {}
        that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList = []
        console.log('count check')
        console.log(that.baseObj.criteriaObj.InclusionRules[index].expression.CriteriaList)
        console.log(that.baseObj.criteriaObj.InclusionRules[index].expression.CriteriaList.length)
        that.baseObj.actual_JSON.InclusionRules[index].expression.Type = {}
        that.baseObj.actual_JSON.InclusionRules[index].expression.Type.op = data.type.op
        that.baseObj.actual_JSON.InclusionRules[index].expression.Type.count = data.type.op === 'Any' ? 0 : (data.type.op === 'All' ? (that.baseObj.criteriaObj.InclusionRules[index].expression.CriteriaList.length + that.baseObj.criteriaObj.InclusionRules[index].Groups.length) : data.type.count)
        that.baseObj.criteriaObj.InclusionRules[index].expression.CriteriaList.forEach(function (Idata, dindex) {
          console.log('event loop')
          console.log(Idata)
          that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex] = {}
          for (var key in Idata) {
            console.log('Inside Idata loop')
            console.log(key)
            var resType = (typeof Idata[key])
            if (resType === 'object') {
              console.log('Inside Idata object condition')
              console.log(key)
              if (key === 'ConditionOccurrence' || key === 'DrugExposure' || key === 'ProcedureOccurrence') {
                if (!that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key]) {
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key] = {}
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key].Name = Idata.name
                }
              }
              for (var kIndx in Idata[key]) {
                console.log('Inside Idata key loop')
                console.log(kIndx)
                console.log(Idata[key][kIndx])
                if (kIndx === 'OccurrenceStartDate' || kIndx === 'Age' || kIndx === 'Refills' || kIndx === 'Quantity' || kIndx === 'DaysSupply') {
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx] = {}
                  if (Idata[key][kIndx].Op !== '') {
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Op = Idata[key][kIndx].Op
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Value = Idata[key][kIndx].Value
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Extent = Idata[key][kIndx].Extent
                  } else {
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Op = undefined
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Value = undefined
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Extent = undefined
                  }
                }
                if (kIndx === 'OccurrenceStartDate') {
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx] = {}
                  if (Idata[key][kIndx].Op !== '') {
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Op = Idata[key][kIndx].Op
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Value = Idata[key][kIndx].Extent
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Extent = Idata[key][kIndx].Value
                  } else {
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Op = undefined
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Value = undefined
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Extent = undefined
                  }
                }
                if (kIndx === 'OccurrenceLimit') {
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx] = {}
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].First = Idata[key][kIndx].Value
                }
                if (kIndx === 'Gender' || kIndx === 'DrugType' || kIndx === 'ProviderSpecialty' || kIndx === 'VisitType' || kIndx === 'ProcedureType' || kIndx === 'ConditionType') {
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][Idata[key][kIndx].name] = {}
                  if (Idata[key][kIndx][Idata[key][kIndx].inputs[0].name] && Idata[key][kIndx][Idata[key][kIndx].inputs[0].name].length !== 0) {
                    that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][Idata[key][kIndx].name] = []
                    Idata[key][kIndx][Idata[key][kIndx].inputs[0].name].forEach(function (v, k) {
                      that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][Idata[key][kIndx].name].push(v.value)
                    })
                  }
                }
                if (kIndx === 'listDiagnosis' || kIndx === 'listProcedures' || kIndx === 'listDrugs') {
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key].Codeset = []
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key].Codeset = (Idata[key][kIndx].codeset && Idata[key][kIndx].codeset.value) ? Idata[key][kIndx].codeset.value : ''
                }
                if (kIndx === 'Occurrence') {
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx] = {}
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Count = Idata[key][kIndx].count
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].Type = Idata[key][kIndx].type
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key][kIndx].IsDistinct = true
                }
                if (kIndx === 'OccurrenceIndexStartDate') {
                  console.log('Insile OccurrenceIndexStartDate')
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key].StartWindow = { 'Start': {}, 'End': {} }
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key].StartWindow.Start.Coeff = (Idata[key][kIndx].data.stype === 'After' ? 1 : -1)
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key].StartWindow.Start.Days = Idata[key][kIndx].data.sday
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key].StartWindow.End.Coeff = (Idata[key][kIndx].data.etype === 'After' ? 1 : -1)
                  that.baseObj.actual_JSON.InclusionRules[index].expression.CriteriaList[dindex][key].StartWindow.End.Days = Idata[key][kIndx].data.eday
                }
              }
            }
          }
        })
        that.baseObj.actual_JSON.InclusionRules[index].expression.Groups = []
        console.log('Group Started')
        console.log(that.baseObj.criteriaObj.InclusionRules[index])
        that.baseObj.criteriaObj.InclusionRules[index].Groups.forEach(function (GrpData, Grpindex) {
          console.log('Group 1st line')
          console.log(GrpData)
          that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex] = {}
          that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].Name = GrpData.Name
          that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].Type = {}
          that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].Type.op = GrpData.type.op
          that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].Type.count = GrpData.type.op === 'Any' ? 0 : (GrpData.type.op === 'All' ? GrpData.CriteriaList.length : GrpData.type.count)
          console.log('Group 3st line')
          console.log(GrpData)
          that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList = []
          GrpData.CriteriaList.forEach(function (Idata, dindex) {
            console.log('Groups loop')
            console.log(Idata)
            that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex] = {}
            for (var key in Idata) {
              console.log('Inside Idata loop')
              console.log(key)
              var resType = (typeof Idata[key])
              if (resType === 'object') {
                console.log('Inside Idata object condition')
                console.log(key)
                if (key === 'ConditionOccurrence' || key === 'DrugExposure' || key === 'ProcedureOccurrence') {
                  if (!that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key]) {
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key] = {}
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key].Name = Idata.name
                  }
                }
                for (var kIndx in Idata[key]) {
                  console.log('Inside Idata key loop')
                  console.log(kIndx)
                  console.log(Idata[key][kIndx])
                  if (kIndx === 'OccurrenceStartDate' || kIndx === 'Age' || kIndx === 'Refills' || kIndx === 'Quantity' || kIndx === 'DaysSupply') {
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx] = {}
                    if (Idata[key][kIndx].Op !== '') {
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Op = Idata[key][kIndx].Op
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Value = Idata[key][kIndx].Value
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Extent = Idata[key][kIndx].Extent
                    } else {
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Op = undefined
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Value = undefined
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Extent = undefined
                    }
                  }
                  if (kIndx === 'OccurrenceStartDate') {
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx] = {}
                    if (Idata[key][kIndx].Op !== '') {
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Op = Idata[key][kIndx].Op
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Value = Idata[key][kIndx].Extent
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Extent = Idata[key][kIndx].Value
                    } else {
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Op = undefined
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Value = undefined
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Extent = undefined
                    }
                  }
                  if (kIndx === 'Gender' || kIndx === 'DrugType' || kIndx === 'ProviderSpecialty' || kIndx === 'VisitType' || kIndx === 'ProcedureType' || kIndx === 'ConditionType') {
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][Idata[key][kIndx].name] = {}
                    if (Idata[key][kIndx][Idata[key][kIndx].inputs[0].name] && Idata[key][kIndx][Idata[key][kIndx].inputs[0].name].length !== 0) {
                      that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][Idata[key][kIndx].name] = []
                      Idata[key][kIndx][Idata[key][kIndx].inputs[0].name].forEach(function (v, k) {
                        that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][Idata[key][kIndx].name].push(v.value)
                      })
                    }
                  }
                  if (kIndx === 'listDiagnosis' || kIndx === 'listProcedures' || kIndx === 'listDrugs') {
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key].Codeset = []
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key].Codeset = (Idata[key][kIndx].codeset && Idata[key][kIndx].codeset.value) ? Idata[key][kIndx].codeset.value : ''
                  }
                  if (kIndx === 'Occurrence') {
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx] = {}
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Count = Idata[key][kIndx].count
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].Type = Idata[key][kIndx].type
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key][kIndx].IsDistinct = true
                  }
                  if (kIndx === 'OccurrenceIndexStartDate') {
                    console.log('Insile OccurrenceIndexStartDate')
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key].StartWindow = { 'Start': {}, 'End': {} }
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key].StartWindow.Start.Coeff = (Idata[key][kIndx].data.stype === 'After' ? 1 : -1)
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key].StartWindow.Start.Days = Idata[key][kIndx].data.sday
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key].StartWindow.End.Coeff = (Idata[key][kIndx].data.etype === 'After' ? 1 : -1)
                    that.baseObj.actual_JSON.InclusionRules[index].expression.Groups[Grpindex].CriteriaList[dindex][key].StartWindow.End.Days = Idata[key][kIndx].data.eday
                  }
                }
              }
            }
          })
        })
      })

      console.log('Result JSON with Inclusion criteria')
      console.log(that.baseObj.actual_JSON)
      var successStatement = 'Cohort  Defination Saved Successfully'
      that.baseObj['created_by'] = that.$q.sessionStorage.getItem('username')
      if (that.pagemethod === 'update') {
        url = process.env.API_URL + 'cohort/update/'
        successStatement = 'Cohort Definition Saved Successfully'
        method = axios.put(url, that.baseObj)
      } else {
        that.baseObj.cohort_id = null
        method = axios.post(url, that.baseObj)
      }
      if (that.baseObj.run) {
        successStatement = 'Cohort Definition Saved Successfully and Run Has Been Initiated. Please Switch to Summary For Details.'
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
      if (that.baseObj.run) {
        this.$router.push('/cohort/summary/' + that.cohort_id)
      }
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
    },
    cohortGroupfilterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.cohortGroups = this.cohortGroups.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    },
    datasourcefilterFn (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.dataSources = this.dataSources.filter(v => v.toLowerCase().indexOf(needle) > -1)
      })
    }
  }
}
</script>
