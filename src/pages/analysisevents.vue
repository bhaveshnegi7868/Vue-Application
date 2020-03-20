<template>
  <div class="q-ma-sm ">
    <div class="EventList_header2 f12">
      Event Attributes {{event.event?'-':''}} {{event.event}}
    </div>
      <!-- {{pagemethod}} -->
    <div v-if="event != ''" class="row q-ml-sm q-my-xs">
      Name *
      <input class="input-box full-width" :disabled="pagemethod === 'view'" v-model="event.name" v-on:keyup="sendName" />
    </div>
    <div class="attributeDiv" v-if="event != ''">
        <div class="row " v-for="(key,localObj) in orderToShow" v-bind:key="localObj" >
            <!-- {{event[mappingDict[event.event]][key]}} -->
          <div class="row q-mt-sm col-12" v-if="event[mappingDict[event.event]][key] != undefined">
            <div class="col-11 q-ml-sm q-mt-sm q-mb-xs" v-if="key!='OccurrenceLimit' && (key!='OccurrenceIndexStartDate' || event.corelated != undefined)">
            {{event[mappingDict[event.event]][key].Label}} <span v-if="key == 'listDiagnosis' || key == 'listProcedures' || key == 'listDrugs'"> *</span><br>
            </div>
          <div class="q-ml-sm " v-for="(obj,index) in event[mappingDict[event.event]][key].inputs" v-bind:key="index">
            <multiselect
              v-model="event[mappingDict[event.event]][key][obj.name]"
              :options="obj.value"
              :disabled="pagemethod === 'view'"
              :searchable="true"
              :close-on-select="false"
              :show-labels="false"
              :placeholder="event[mappingDict[event.event]][key].Label"
              class="w12R mx-h25 q-mr-xs f12"
              v-if="obj.Type == 'multiple-select-dropdown' && renderComponent1"
              @input="makeSelected"
              track-by="value"
              label="label">
            </multiselect>
            <!-- <q-select
              use-input
              hide-selected
              fill-input
              transition-show="jump-down"
              transition-hide="jump-up"
              v-model="obj.value[event[mappingDict[event.event]][key][obj.name]]"
              :options="obj.value"
              @focus="getCohortGroupList"
              class="full-width f12 select-box"
              :filter="obj.value[event[mappingDict[event.event]][key].filter]"
              @input="makeSelected(key, obj, key1)"
              v-if="obj.Type == 'multiple-select-dropdown' && renderComponent1"
            /> -->
            <q-btn
              rounded
              class="q-pa-xs q-ma-none importIcon"
              :disabled="pagemethod === 'view'"
              icon="add"
              style="background-color: #1c464d !important; color: #ffffff"
              @click="openImportCodesetPopupFun(key,index)"
              v-if="obj.Type == 'multiple-select-dropdown' && renderComponent1"
              >
              <q-tooltip>
                Import codeset
              </q-tooltip>
              </q-btn>
            <!-- <q-btn-dropdown
                  flat
                  class="full-width w12R text-capitalize select-box" style="text-transform: capitalize;"
                  :label="obj.value[event[mappingDict[event.event]][key][obj.name]] ? obj.value[event[mappingDict[event.event]][key][obj.name]] : event[mappingDict[event.event]][key].Label"
                  v-if="obj.Type == 'multiple-select-dropdown' && renderComponent1"
                >
                <q-btn
                  color="theamGreen"
                  class="full-width "
                  icon-right="add"
                  label="Import"
                  @click="openImportCodesetPopupFun(key,index)"
                  v-close-popup
                />
                <div class="options-values  " v-for="(opt,key1) in obj.value" v-bind:key="opt"  @click="makeSelected(key, obj, key1)">
                  {{opt}}
                </div>
            </q-btn-dropdown> -->
            <div class="col full-width " v-if="obj.Type == 'multiple-select'">
              <div class="">
                <div class="">
                   <multiselect
                      v-model="event[mappingDict[event.event]][key][obj.name]"
                      :options="obj.value"
                      :searchable="true"
                      :close-on-select="false"
                      :show-labels="false"
                      :placeholder="event[mappingDict[event.event]][key].Label"
                      class="full-width eventDropdownAttr w13R f12"
                      v-if="renderComponent1"
                      @input="makeSelected"
                      :multiple="true"
                      :taggable="false"
                      track-by="value"
                      label="label">
                    </multiselect>
                </div>
              </div>
            </div>
            <div class="col full-width q-mb-xs" v-if="obj.Type == 'date' && (index === 2 || excludeValues.indexOf(event[mappingDict[event.event]][key][event[mappingDict[event.event]][key].inputs[0].name]) !== -1)">
              <div class="row">
                <div class="col dateInputBox q-mb-xs q-pr-xs" v-if="key == 'Occurrence' || (event[mappingDict[event.event]][key].Op && event[mappingDict[event.event]][key].Op !== 'undefined')">
                  <q-icon name="event"  class="cursor-pointer datePicker" v-if="renderComponent2">
                    <q-popup-proxy :ref="obj.name" transition-show="scale" transition-hide="scale">
                      <q-date v-model="event[mappingDict[event.event]][key][obj.name]" @input="hideProxy(obj.name)"></q-date>
                    </q-popup-proxy>
                  </q-icon>
                  {{event[mappingDict[event.event]][key][obj.name]?event[mappingDict[event.event]][key][obj.name]:'YYYY-MM-DD'}}
                </div>
              </div>
            </div>
            <div class="col full-width " v-if="obj.Type == 'text'">
              <input class="input-box full-width" v-model="event[mappingDict[event.event]][key][obj.name]"/>
            </div>
            <div class="col full-width q-mb-xs" v-if="obj.Type == 'count'">
              <div class="row q-mt-xs">
                <div class="col ">
                  <select class="criteria-box  w9R" v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
                    <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                      {{opt}}
                    </option>
                  </select>
                </div>
                <div class="col q-mx-xs  q-ml-md" >
                  <input type="number" class="input-box text-center full-width" v-model="event[mappingDict[event.event]][key].count[obj.name]" v-on:keyup="sendName" />
                </div>
              </div>
            </div>
            <div class="col full-width " v-if="obj.Type == 'count-select'">
              <div class="q-mt-xs">
                <div class="col q-mr-xs  ">
                  <select class="criteria-box w9R "  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
                    <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                      {{opt}}
                    </option>
                  </select>
                </div>
                <div class="q-mx-xs  q-ml-md">
                  <input type="number" class="text-center input-box w4R" />
                </div>
                <div class="q-mx-xs  " v-if="event[mappingDict[event.event]][key][obj.name] == 'Between' || event[mappingDict[event.event]][key][obj.name] == 'Not Between'" >
                </div>
              </div>
            </div>
            <div class="w30R full-width" v-if="obj.Type == 'day-between'">
              <div class="row full-width col-12 q-mt-xs">
                <div class=" q-mr-xs">
                  <span class="q-mr-xs"> Between </span>
                  <input :disabled="pagemethod === 'view'" class="input-box text-center  w5R q-mr-xs" value="ALL" list="listday2" type="text" maxlength="4" onkeypress="return event.charCode >= 48 && event.charCode <= 57"  v-model="event[mappingDict[event.event]][key].data.sday">
                  <datalist id="listday2">
                     <option value="ALL"/>
                     <option value="0"/>
                     <option value="1"/>
                     <option value="14"/>
                     <option value="21"/>
                     <option value="30"/>
                     <option value="60"/>
                     <option value="90"/>
                     <option value="120"/>
                     <option value="180"/>
                     <option value="365"/>
                     <option value="548"/>
                     <option value="730"/>
                     <option value="1095"/>
                   </datalist>
                 </div>
                 <div class=" q-mr-xs ">
                   <span class="q-mr-xs">day</span>
                   <select :disabled="pagemethod === 'view'" class="criteria-box w4R" v-model="event[mappingDict[event.event]][key].data.stype" v-on:change="sendName">
                     <option v-for="opt in indexloop" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                   </select>
                 </div>
                 <div class=" q-mr-xs">
                   <span class="q-mr-xs"> and </span>
                   <input :disabled="pagemethod === 'view'" class="input-box text-center  w5R q-mr-xs" list="listday1" maxlength="4" onkeypress="return event.charCode >= 48 && event.charCode <= 57" v-model="event[mappingDict[event.event]][key].data.eday">
                   <datalist id="listday1">
                     <option value="ALL"/>
                     <option value="0"/>
                     <option value="1"/>
                     <option value="14"/>
                     <option value="21"/>
                     <option value="30"/>
                     <option value="60"/>
                     <option value="90"/>
                     <option value="120"/>
                     <option value="180"/>
                     <option value="365"/>
                     <option value="548"/>
                     <option value="730"/>
                     <option value="1095"/>
                   </datalist>
                 </div>
                 <div class=" q-mr-xs">
                   <span class="q-mr-xs"> day</span>
                   <select :disabled="pagemethod === 'view'" class="criteria-box  w4R" v-model="event[mappingDict[event.event]][key].data.etype" v-on:change="sendName">
                     <option v-for="opt in indexloop" v-bind:key="opt.value" :value="opt.value">
                        {{opt.label}}
                      </option>
                   </select>
                 </div>
               </div>
             </div>
            <div class="col full-width " v-if="key == 'Occurrence' && obj.Type == 'single-select'">
              <div class="row" >
                <div class="">
                  <select class="criteria-box w9R"  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
                    <option  v-for="(opt,val) in obj.value" v-bind:key="val" :value="val">
                      {{opt}}
                    </option>
                  </select>
                </div>
              </div>
            </div>

          </div>
        </div>
        </div>
        <div class="row q-ml-sm q-mt-md col-12" v-if="event.event == 'Diagnosis'">
            <div class="col">
            Limit initial events to
            <select :disabled="pagemethod === 'view'" class="q-ml-sm criteria-box H25 w9R" v-model="event.analysislimit" label="Select" v-on:change="sendName">
                <option value=" " disabled>Select Initial event</option>
                <option  v-for="opt in dtSourceOpts2" :selected="opt.value === 'First'" v-bind:key="opt.value" :value="opt.value">
                <!-- {{opt}} -->
                {{opt.label}}
                </option>
            </select>
            </div>
        </div>
      </div>
    <q-dialog
         v-model="openImportCodesetPopup"
         no-backdrop-dismiss
         full-width
         full-height
       >
       <q-card>
       <div class="close-btn">
       <q-btn icon="img:/statics/imgs/closeModal.png" flat round dense v-close-popup ></q-btn>
       </div>
        <list-codeset :allowImport="true" @addImports="addImportData"></list-codeset>
       </q-card>
    </q-dialog>
  </div>
</template>
<script>
import listCodeset from 'pages/listCodeset'
import axios from 'axios'
import Multiselect from 'vue-multiselect'
import {
  QDate,
  QIcon,
  QCard,
  // QSelect,
  QPopupProxy,
  // QBtnDropdown,
  ClosePopup,
  QTooltip,
  QBtn,
  QDialog
} from 'quasar'
export default {
  name: 'eventAttributes',
  components: {
    QDate,
    QTooltip,
    QIcon,
    QCard,
    QBtn,
    QPopupProxy,
    Multiselect,
    // QBtnDropdown,
    // QSelect,
    QDialog,
    'list-codeset': listCodeset
  },
  directives: {
    ClosePopup
  },
  data () {
    return {
      indexloop: [
        {
          value: '-1',
          label: 'Before'
        },
        {
          value: '1',
          label: 'After'
        }
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
      renderComponent1: true,
      renderComponent2: true,
      openImportCodesetPopup: false,
      excludeValues: ['bt', '!bt'],
      shape: 'include',
      limit: true,
      sdate: '2019/02/01',
      edate: '2019/02/01',
      returnData: [],
      name1: '',
      filterOptions: [],
      orderToShow: [
        'listDiagnosis',
        'listProcedures',
        'listDrugs',
        'OccurrenceLimit',
        // 'Occurrence',
        'OccurrenceIndexStartDate',
        'limit',
        // 'OccurrenceStartDate',
        'Age',
        // 'Refills',
        // 'Quantity',
        // 'DaysSupply',
        'Gender',
        'ConditionType',
        'ProviderSpecialty',
        'VisitType',
        'timeStamp'
      ]
    }
  },
  methods: {
    createValue (val, done, objData) {
      if (val.length > 0) {
        if (!objData.includes(val)) {
          objData.push(val)
        }
        done(val, 'toggle')
      }
    },
    filterFn (val, update, objData) {
    },
    addImportData (data) {
      var that = this
      data.forEach(function (row) {
        var url = process.env.API_URL + 'codeset/get/' + row.codeset_id
        that.$swal({
          type: 'success',
          title: 'Getting Data For Codeset ' + row.codeset_name,
          showConfirmButton: false,
          timer: 2000
        })
        axios.get(url).then(function (response) {
          var resultArray = []
          response.data.codeset_data.forEach(function (row1) {
            resultArray.push(row1.target_concept_id)
            resultArray.concat(row1.dependentsCodes)
          })
          if (that.event[that.mappingDict[that.event.event]][that.currentKey].inputs[that.currentIndex].value === {}) {
            that.event[that.mappingDict[that.event.event]][that.currentKey].inputs[that.currentIndex].value = []
          }
          if (that.event[that.mappingDict[that.event.event]][that.currentKey].inputs[that.currentIndex].value.filter(v => v.label.toLowerCase() === row.codeset_name.toLowerCase()).length === 0) {
            that.event[that.mappingDict[that.event.event]][that.currentKey].inputs[that.currentIndex].value.push({
              'label': row.codeset_name,
              'value': resultArray
            })
          } else {
            console.log(that.event[that.mappingDict[that.event.event]][that.currentKey].inputs[that.currentIndex].value.filter(v => v.label.toLowerCase() === row.codeset_name.toLowerCase()))
            // that.$q.loading.hide()
            that.$q.notify({
              color: 'black',
              textColor: 'white',
              message: 'Duplicate Item With Same Name',
              timeout: 3000
            })
          }
          that.renderComponent1 = false
          setTimeout(function () {
            that.$nextTick(() => {
              // Add the component back in
              that.renderComponent1 = true
            })
          }, 100)
          that.$q.loading.hide()
        }).catch(function (err) {
          that.$q.loading.hide()
          console.log(err)
          that.$q.notify({
            color: 'black',
            textColor: 'white',
            message: 'Failed Recieving Codeset Data Of ' + row.name,
            timeout: 3000
          })
        })
      })
      this.openImportCodesetPopup = false
    },
    openImportCodesetPopupFun (key, ind) {
      var that = this
      that.currentKey = key
      that.currentIndex = ind
      this.openImportCodesetPopup = false
      this.openImportCodesetPopup = true
    },
    sendName (event) {
      var that = this
      console.log(that.event)
      that.$emit('inputChange', that.event)
      that.$forceUpdate()
    },
    hideProxy (prox) {
      var that = this
      that.renderComponent2 = false
      setTimeout(function () {
        that.$nextTick(() => {
          // Add the component back in
          that.renderComponent2 = true
        })
      }, 100)
      this.$refs[prox][0].hide()
    },
    makeSelected () {
      var that = this
      that.renderComponent1 = false
      that.$nextTick(() => {
        // Add the component back in
        that.renderComponent1 = true
      })
      this.$emit('inputChange', this.event)
    },
    commonFilter (val, data, data1, data2) {
      debugger
      const needle = val.toLowerCase()
      this.cohortGroups = this.cohortGroups.filter(v => v.toLowerCase().indexOf(needle) > -1)
    }
    /**
    * Given a generator function, this component's inputValue is set
    * to the return value of the generator.
    *
    * @param Function
    **/
  },
  props: {
    'event': Object,
    'mappingDict': Object,
    'pagemethod': Object
  },

  computed: {
    model: {
      get () {
        return this.value
      },
      set (value) {
        this.$emit('input', value)
      }
    }
  }
}
</script>

<style>
.icon-generate {
  float:right;
  width:16px;
  height:16px;
  border:1px dashed red;
}
</style>
