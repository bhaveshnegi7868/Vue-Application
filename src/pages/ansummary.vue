<template>
  <q-page class="app-layout ">
    <analysis-header :selectedPage="selectedPage" :cohort_name="baseObj"></analysis-header>
    <q-card class="row  q-mx-sm" v-if="baseObj.status==='Pending'">
      <q-spinner-dots color="light-green" size="2.5rem" class="q-mx-auto" ></q-spinner-dots>
      <div class="col-12 text-center fc-theamGreen">
      <div class="q-mx-auto ">The cohort status is pending</div>
      </div>
      <div class="col-12 text-center fc-theamGreen">
      <div class="q-mx-auto">Please visit this page after some time</div>
      </div>
    </q-card>
    <q-card class="row  q-mx-sm" v-if="baseObj.status !='Pending'" >
      <div class="col-2 q-mt-sm pad0">
        <div class="categories_header ">
            Criteria Set
        </div>
        <div class="header_Bor1"></div>
        <div class="f12 q-mt-sm bor1grey" v-if="categories_header_render">
          <q-btn  class="f12 pad0 text-capitalize  full-width borderRad0" :class="row.class" v-for="row in availableReports" :key="row.apiKey">
          <!--<set>@click="(row.label === 'Attrition and Demographics' ? markSelected(row) : '')"</set>-->
              {{row.label}}
          </q-btn>
        </div>
      </div>
      <div class="col q-pa-sm" >
        <q-card class="row q-mx-sm shadow-2">
          <div class="col-4 q-ma-sm">
            <input class="input-box full-width"  v-model="baseObj.cohort_name" placeholder="Cohort Name" readonly/>
          </div>
          <div class="col q-ma-sm">
            <input class="input-box full-width"  placeholder="Cohort Description" v-model="baseObj.cohort_desc" readonly/>
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
            </div>
            <div class="row H30 col5 text-center">
              <div class="q-mx-sm q-py-xs col">
                {{baseObj.DataSource}}
              </div>
              <div class="q-mx-sm q-py-xs col">
                {{baseObj.cohort_created_by}}
              </div>
              <div class="q-mx-sm q-py-xs col">
                {{baseObj.cohort_executed_at}}
              </div>
              <div class="q-mx-sm q-py-xs col">
                {{baseObj.cohort_executed_at}}
              </div>
              <div class="q-mx-sm q-py-xs col">
                {{baseObj.status}}
              </div>
            </div>
          </div>
          <div  v-if="arrtitionNdemoGraph" class="col-12 q-mt-sm   shadow-2 cohortSummaryText col5">
            <div class="row f12">
              <div class="q-ma-sm col-11" style="margin-left: 40px;">
                <div class="row-inline bgCgreen q-px-xs q-py-xs ">
                  Patient Attrition Flow Summary
                </div>
                <div class="q-my-sm q-px-xs q-py-sm bor1grey H450">
                    <div class="row col-12 justify-center full-height full-width text-center">
                            <div class="col-5" style="padding-left:7em">
                                <q-card class="summary-card my-card text-black" style="height: 100%;">
                                <q-card-section>
                                <div class="text-h6">Cohort Population</div>
                                <div class="text-subtitle2">{{baseObj.result.Total}}&nbsp;M</div>
                                </q-card-section>
                                </q-card>
                            </div>
                        <div class="col-7" >
                            <div class="row" style="height: 5em;">
                                <q-card class="summary-card q-ml-md my-card text-black" style="width: 19em">
                                <q-card-section>
                                <div class="text-h6">Diagnosis</div>
                                <div class="text-subtitle2">{{baseObj.result.Diagnosis}}&nbsp;M</div>
                                </q-card-section>
                                </q-card>
                                <q-card class="summary-card q-ml-md my-card text-black" style="width: 19em">
                                <q-card-section>
                                <div class="text-h6">Procedures</div>
                                <div class="text-subtitle2">{{baseObj.result.Procedure}}&nbsp;M</div>
                                </q-card-section>
                                </q-card>
                            </div>
                            <div class="row q-mt-md" style="margin-left: 11em;height: 5em;">
                                <q-card class="summary-card my-card text-black" style="width: 19em">
                                <q-card-section>
                                <div class="text-h6">Treated</div>
                                <div class="text-subtitle2">{{baseObj.result.Treatment}}&nbsp;M</div>
                                </q-card-section>
                                </q-card>
                            </div>
                        </div>
                    </div>
                    <!-- <div class="bor1grey summeryBarGraph q-px-xs q-my-sm " >
                        <summery-graph :reportData="baseObj.report.age"></summery-graph>
                    </div> -->
                  <!-- <div class="q-mt-sm q-px-xs q-py-sm shadow-0 h40 col5">
                      <summary-attrition v-if="summaryGraphRender" :attritionData="baseObj.report.patient_count"></summary-attrition> -->
                      <!-- MI + UA only and age > 20
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
                        <q-icon class="float-right q-mx-xs q-my-xs q-ml-md "  name="img:statghtArrow.png" />
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
                          <q-icon class="float-right q-mx-xs q-my-xs" name="img:statightArrow.png" />
                          <div class="float-right q-mx-md W200 ">
                            <div class="col10 bgStatC1 W200 q-mx-xs catColorLbl text-center ">
                              52,810
                            </div>
                          </div>
                      </div>
                      <div class="q-mt-sm q-px-xs q-py-sm shadow-2 h40 col5">
                          No MI
                          <q-icon class="float-right q-mx-xs q-my-xs" name="img:staticsghtArrow.png" />
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
                        <div class="col10 bgStatC2 W150 q-mx-auto catColorLbl text-center ">
                          483,429
                        </div>
                      </div>
                  </div>
                  <div v-if="openFstChild2" class="bor1Lightgrey q-mx-sm q-px-sm q-py-sm">
                    <div class="q-mt-sm q-px-xs q-py-sm shadow-2 h40 col5">
                        Statins
                        <q-icon class="float-right q-mx-xs q-my-xs"  name="img:staticsightArrow.png" />
                        <div class="float-right q-mx-lg W200 ">
                          <div class="col10 bgStatC2 W150 q-ml-md catColorLbl text-center ">
                            448,219
                          </div>
                        </div>
                    </div>
                    <div class="q-mt-sm q-px-xs q-py-sm shadow-2 h40 col5">
                        FH
                        <q-icon class="float-right q-mx-xs q-my-xs" name="img:RightArrow.png" />
                        <div class="float-right q-mx-lg W200 ">
                          <div class="col10 bgStatC2 W150 q-ml-md  catColorLbl text-center ">
                            68,507
                          </div>
                        </div>
                    </div> -->
                  <!-- </div> -->
                </div>
              </div>
              <!-- <div class=" q-ma-sm   col  ">
                <div class="bgCgreen q-px-xs q-py-xs ">
                  Patient Demographics Summary
                </div>
                <div class="bor1grey summeryBarGraph q-px-xs q-my-sm " v-if="summaryGraphRender">
                  <summery-graph :reportData="baseObj.report.age"></summery-graph>
                </div>
                <div class="bor1grey row q-px-xs q-my-sm " v-if="summaryGraphRender">
                    <div class="col ">
                      <div class="By-GraphLbls q-my-xs">
                        By Gender
                        <div class="By-GraphLbls_Underline"></div>
                      </div>
                      <div class="genderGraph w10R q-mx-auto">
                        <q-icon class="bor1RlightGreygender q-my-xs" style="height: 20px;  20px;" name="img:statics/imgs/manImg.png" />
                        <q-icon class=" q-my-xs" style="height: 20px;  20px;" name="img:statics/imgs/womanImg.png" />
                      </div>
                      <div class="row q-my-xs w10R q-mx-auto q-mt-lg">
                        <div class="genderGraph-Count col q-mx-sm q-my-sm q-py-sm q-px-sm">{{baseObj.report.gender.male}}</div>
                        <div class="genderGraph-Count col q-mx-sm q-my-sm q-py-sm q-px-sm">{{baseObj.report.gender.female}}</div>
                      </div>
                    </div>
                    <div class="By-GraphLbls_devider"></div>
                    <div class="col">
                      <div class="By-GraphLbls q-my-xs q-mx-xs">
                        By Race
                        <div class="By-GraphLbls_Underline"></div>
                      </div>
                      <summery-piegraph></summery-piegraph>
                    </div>
                </div>
              </div> -->
            </div>
          </div>
          <div  v-if="otherEvnt" class="col-12 q-mt-sm   shadow-2 cohortSummaryText col5">
            <div class="row f12 bor1Lightgrey">
              <div class="col-12 q-pa-sm">
                <div class="lightGreen q-px-xs q-py-xs ">
                  Top  {{currentReportType.label}}
                </div>
                <div class="q-my-sm q-px-xs q-py-sm bor1Lightgrey H450">
                  <div class="bgClightGrey row q-px-xs q-py-xs ">
                    <div class="col">Condition</div>
                    <div class="col W200 q-mx-xl">Patient Count</div>
                    <div class="col q-mx-xl">Concept Id</div>
                    <div class="col">Prevalence %</div>
                    <!-- <div class="col">Length of Era</div> -->
                  </div>
                  <div class="row q-mt-sm q-px-xs q-py-xs shadow-2 h40 col5" v-for="(row, index) in baseObj.report" :key="index">
                      <div class="col">{{row.condition}}</div>
                      <div class="col q-mx-xl W200 ">
                      <div id="container" class="bgStatC1 W200">
                          <div class="clearfix q-pa-sm text-center">{{row.person_count}}</div>
                          <div class="arrow-right bgStatCBor1"></div>
                      </div>
                      </div>
                      <div class="col q-mx-xl" v-if="row.condition_concept_id">{{row.condition_concept_id}}</div>
                      <div class="col q-mx-xl" v-if="row.drug_concept_id">{{row.drug_concept_id}}</div>
                      <div class="col q-mx-xl" v-if="row.procedure_concept_id">{{row.procedure_concept_id}}</div>
                      <div class="col">{{ Math.round(row.Prevalence * 100)}}%</div>
                      <!-- <div class="col">124.78</div> -->
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
import analysisheader from 'components/analysisheader'
// import summeryGraph from 'components/summeryGraph'
// import summeryAttritionFlow from 'components/arrtitionFlow'
import axios from 'axios'
import {
  QSpinnerDots,
  QCard
} from 'quasar'
export default {
  name: 'createCohort',
  components: {
    QCard,
    'analysis-header': analysisheader,
    // 'summery-graph': summeryGraph,
    // 'summary-attrition': summeryAttritionFlow,
    QSpinnerDots
  },
  data () {
    return {
      summaryGraphRender: false,
      categories_header_render: true,
      availableReports: [
        { apiKey: 'attrition', label: 'Attrition and Demographics', class: { 'bgCgreen': true }, divToShow: 'arrtitionNdemoGraph' },
        { apiKey: 'diagnosis', label: 'Diagnosis', divToShow: 'otherEvnt' },
        { apiKey: 'treatment', label: 'Treatment', divToShow: 'otherEvnt' },
        { apiKey: 'procedure', label: 'Procedure', divToShow: 'otherEvnt' }
      ],
      baseObj: {
        'cohort_name': '',
        'description': '',
        'group': '',
        'datasource': ''
      },
      currentReportType: {
        apiKey: 'attrition'
      },
      openFstChild: 0,
      openScdChild: 0,
      openFstChild2: 0,
      openScdChild2: 0,
      arrtitionNdemoGraph: 1,
      otherEvnt: 0,
      selectedPage: 'Summary'
    }
  },
  mounted () {
    var that = this
    that.cohort_id = that.$route.params.cohort_id
    if (that.cohort_id) {
      that.getCohortDict(that.cohort_id)
    }
  },
  methods: {
    openChild (openFstChild) {
      openFstChild = !openFstChild
    },
    markSelected (row) {
      var that = this
      that.availableReports.forEach(function (nRow) {
        nRow.class = { 'bgCgreen': false }
        that[nRow.divToShow] = false
      })
      row.class = { 'bgCgreen': true }
      that.currentReportType = row
      that.getCohortReport()
      that.categories_header_render = false
      that.$nextTick(() => {
        that.categories_header_render = true
      })
    },
    getCohortDict () {
      var that = this
      var url = 'http://10.14.11.136:8003/api/v1/cohort/analysis/summary/' + that.cohort_id
      that.$q.loading.show()
      axios.get(url).then(function (response) {
        console.log(response.data)
        that.baseObj = response.data
        that.baseObj.cohort_id = that.cohort_id
        console.log(that.baseObj)
        // that.getCohortReport()
        that.$q.loading.hide()
      })
    },
    getCohortReport () {
      console.log('inside GetReport')
      var that = this
      that.summaryGraphRender = false
      var url = process.env.API_URL + 'cohort/summary/report/' + that.cohort_id + '/' + that.currentReportType.apiKey
      that.$q.loading.show()
      axios.get(url).then(function (response) {
        console.log(response.data.result)
        console.log('Response GetReport')
        that.baseObj.report = response.data.result
        that.summaryGraphRender = true
        that[that.currentReportType.divToShow] = true
        that.$q.loading.hide()
      })
    }
  }
}
</script>
