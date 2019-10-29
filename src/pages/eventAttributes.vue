<template>
  <div class="q-ma-sm ">
    <div class="EventList_header f12">
      Event Attributes {{event.event?'-':''}} {{event.event}}
    </div>
    <div v-if="event != ''" class="row q-ml-sm q-my-xs">
      Name:
      <input class="input-box full-width" v-model="event.name" v-on:keyup="sendName" />
    </div>
    <div class="attributeDiv" v-if="event != ''">
        <div class="row " v-for="(key,localObj) in orderToShow" v-bind:key="localObj">
          <div class="row q-mt-sm col-12" v-if="event[mappingDict[event.event]][key]">
          <div class="col-11 q-ml-sm q-mt-sm q-mb-xs" v-if="key!='OccurrenceLimit'">
            {{event[mappingDict[event.event]][key].Label}}
          </div>
          <div class="q-ml-sm " v-for="(obj,index) in event[mappingDict[event.event]][key].inputs" v-bind:key="index">
            <multiselect
              v-model="event[mappingDict[event.event]][key][obj.name]"
              :options="obj.value"
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
              color="theamGreen"
              rounded
              class="q-pa-xs q-ma-none importIcon"
              icon="add"
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
                      :taggable="true"
                      track-by="value"
                      label="label">
                    </multiselect>
                </div>
              </div>
            </div>
            <div class="col dateInputBox q-mb-xs q-pr-xs" v-if="obj.Type == 'date' && (index === 2 || excludeValues.indexOf(event[mappingDict[event.event]][key][event[mappingDict[event.event]][key].inputs[0].name]) !== -1)">
                  <q-icon name="event"  class="cursor-pointer datePicker" v-if="renderComponent2">
                    <q-popup-proxy :ref="obj.name" transition-show="scale" transition-hide="scale">
                      <q-date v-model="event[mappingDict[event.event]][key][obj.name]" @input="hideProxy(obj.name)"></q-date>
                    </q-popup-proxy>
                  </q-icon>
                  {{event[mappingDict[event.event]][key][obj.name]?event[mappingDict[event.event]][key][obj.name]:'YYYY-MM-DD'}}
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
                <div class="col q-mx-xs  q-ml-md">
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
                  <input type="number" v-model="event[mappingDict[event.event]][key].data.sday" class="input-box text-center  w4R q-mr-xs" />
                </div>
                <div class=" q-mr-xs ">
                  <span class="q-mr-xs"> day</span>
                  <select class="criteria-box  w4R" v-model="event[mappingDict[event.event]][key].data.stype" v-on:change="sendName">
                    <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                      {{opt}}
                    </option>
                  </select>
                </div>
                <div class=" q-mr-xs">
                  <span class="q-mr-xs"> and </span>
                  <input type="number" v-model="event[mappingDict[event.event]][key].data.eday" class="text-center input-box w4R q-mr-xs" />
                </div>
                <div class=" q-mr-xs">
                  <span class="q-mr-xs"> day</span>
                  <select class="criteria-box  w4R" v-model="event[mappingDict[event.event]][key].data.etype" v-on:change="sendName">
                    <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                      {{opt}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col full-width q-mb-xs" v-if="obj.Type == 'date-between' ">
              <div class="q-mt-xs">
                <div class="">
                <select class="criteria-box  w9R"  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName" >
                  <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                    {{opt}}
                  </option>
                </select>
                </div>
              </div>
            </div>
            <div class="col full-width row"  v-if="obj.Type == 'checkbox'">
            <div class="col q-my-sm">{{event[mappingDict[event.event]][key].Label}}</div>
            <div class="q-ma-xs "><span class="q-xt-sm"><input type="checkbox" v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName"/></span></div>
            </div>
            <div class="col full-width q-mb-xs" v-if="obj.Type == 'number' && (index !== 2 || excludeValues.indexOf(event[mappingDict[event.event]][key][event[mappingDict[event.event]][key].inputs[0].name]) !== -1)">
              <div class="row">
                <div class="">
                  <input type="number" class=" text-center input-box w4R"  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:keyup="sendName"/>
                </div>
              </div>
            </div>
            <div class="col full-width " v-if="obj.Type == 'single-select'">
              <div class="row" >
                <div class="">
                  <select class="criteria-box w9R"  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
                    <option  v-for="(opt,val) in obj.value" v-bind:key="val" :value="val">
                      {{opt}}
                    </option>
                  </select>
                </div>
              </div>
              <div v-if="key == 'ConditionType' || key == 'ProviderSpecialty'">
              <!-- <q-select v-model="model" :options="obj.value" label="Standard" ></q-select> -->
              </div>
            </div>
          </div>
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
  QDialog
} from 'quasar'
export default {
  name: 'eventAttributes',
  components: {
    QDate,
    QTooltip,
    QIcon,
    QCard,
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
        'Occurrence',
        'OccurrenceIndexStartDate',
        'OccurrenceStartDate',
        'Age',
        'Refills',
        'Quantity',
        'DaysSupply',
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
        that.$q.loading.show({
          spinnerSize: 140,
          message: 'Getting Data For Codeset ' + row.codeset_name,
          messageColor: 'black'
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
      that.$forceUpdate()
      this.$emit('inputChange', that.event)
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
    'mappingDict': Object
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
