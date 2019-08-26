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
          <q-btn  class="f12 pad0 text-capitalize full-width borderRad0" :class="{'bgCgreen': otherEvnt}">
            Diagnosis
          </q-btn>
          <q-btn  class="f12 pad0 text-capitalize full-width borderRad0 " >
            Treatment
          </q-btn>
          <q-btn  class="f12 pad0 text-capitalize full-width borderRad0" >
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
            </div>
            <div class="row H30 col5 text-center">
              <div class="q-mx-sm q-py-xs col">
                Market Scan
              </div>
              <div class="q-mx-sm q-py-xs col">
                Muthu R
              </div>
              <div class="q-mx-sm q-py-xs col">
                10 Jul 19
              </div>
              <div class="q-mx-sm q-py-xs col">
                10 Sec
              </div>
              <div class="q-mx-sm q-py-xs col">
                Completed
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
                    </div>
                  </div>
                </div>
              </div>
              <div class=" q-ma-sm   col  ">
                <div class="bgCgreen q-px-xs q-py-xs ">
                  Patient Demographics Summary
                </div>
                <div class="bor1grey summeryBarGraph q-px-xs q-my-sm ">
                  <summery-graph></summery-graph>
                </div>
                <div class="bor1grey row q-px-xs q-my-sm ">
                    <div class="col ">
                      <div class="By-GraphLbls q-my-xs">
                        By Gender
                        <div class="By-GraphLbls_Underline"></div>
                      </div>
                      <div class="genderGraph q-mx-xs">
                        <q-icon class="bor1RlightGreygender q-my-xs" style="height: 20px; width: 20px;" name="img:statics/imgs/manImg.png" />
                        <q-icon class=" q-my-xs" style="height: 20px; width: 20px;" name="img:statics/imgs/womanImg.png" />
                      </div>
                      <div class="row q-my-xs q-mt-lg">
                        <div class="genderGraph-Count col q-mx-sm q-my-sm q-py-sm q-px-sm">28374</div>
                        <div class="genderGraph-Count col q-mx-sm q-my-sm q-py-sm q-px-sm">43876</div>
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
import summeryPiegraph from 'components/summeryPieGraph'
import {
} from 'quasar'
export default {
  name: 'createCohort',
  components: {
    'secondary-header': secondaryHeader,
    'summery-graph': summeryGraph,
    'summery-piegraph': summeryPiegraph
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
      selectedPage: 'Summary'
    }
  },
  methods: {
    openChild (openFstChild) {
      debugger
      openFstChild = !openFstChild
    }
  }
}
</script>
