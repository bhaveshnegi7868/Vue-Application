<template>
  <div class="q-ma-sm">
    <div class="EventList_header f12">
      Event Attributes {{event.event?'-':''}} {{event.event}}
    </div>
    <div v-if="event != ''" class="row q-ml-sm q-my-xs">
      Name:
      <input class="input-box full-width" v-model="event.name" v-on:keyup="sendName" />
    </div>
    <div class="attributeDiv" v-if="event != ''">
        <div class="row" v-for="(key,localObj) in orderToShow" v-bind:key="localObj">
          <div class="row col-12" v-if="event[mappingDict[event.event]][key]">
          <div class="col-12 q-ml-sm q-my-none" v-if="key!='OccurenceLimit'">
            {{event[mappingDict[event.event]][key].Label}}
          </div>
          <div class="q-ml-sm q-my-xs" v-for="(obj,index) in event[mappingDict[event.event]][key].inputs" v-bind:key="index">
            <q-btn-dropdown
                  flat
                  class="full-width select-box"
                  :label="obj.value[event[mappingDict[event.event]][key][obj.name]] ? obj.value[event[mappingDict[event.event]][key][obj.name]] : event[mappingDict[event.event]][key].Label"
                  v-if="obj.Type == 'multiple-select-dropdown' && renderComponent1"
                >
                <q-btn
                  color="primary"
                  class="full-width"
                  icon-right="add"
                  label="Import"
                  @click="openImportCodesetPopupFun(key,index)"
                  v-close-popup
                />
                <div class="options-values" v-for="(opt,key1) in obj.value" v-bind:key="opt"  @click="makeSelected(key, obj, key1)">
                  {{opt}}
                </div>
            </q-btn-dropdown>
            <div class="col full-width q-my-xs" v-if="obj.Type == 'multiple-select'">
              <div class="">
                <div class="">
                   <select class="criteria-box  w9R" v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
                     <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                       {{opt}}
                     </option>
                   </select>
                </div>
              </div>
            </div>
            <div class="col dateInputBox q-my-xs q-pr-xs" v-if="obj.Type == 'date'">
                  <q-icon name="event"  class="cursor-pointer datePicker" v-if="renderComponent2">
                    <q-popup-proxy :ref="obj.name" transition-show="scale" transition-hide="scale">
                      <q-date v-model="event[mappingDict[event.event]][key][obj.name]" @input="hideProxy(obj.name)"></q-date>
                    </q-popup-proxy>
                  </q-icon>
                  {{event[mappingDict[event.event]][key][obj.name]?event[mappingDict[event.event]][key][obj.name]:'YYYY-MM-DD'}}
            </div>
            <div class="col full-width q-my-xs" v-if="obj.Type == 'text'">
              <input class="input-box full-width" v-model="event[mappingDict[event.event]][key][obj.name]"/>
            </div>
            <div class="col full-width q-my-xs" v-if="obj.Type == 'count'">
              <div class="row q-mt-xs">
                <div class="col ">
                  <select class="criteria-box  w9R" v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
                    <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                      {{opt}}
                    </option>
                  </select>
                </div>
                <div class="col q-mx-xs  q-ml-md">
                  <input class="input-box full-width" v-model="event[mappingDict[event.event]][key].count[obj.name]" v-on:keyup="sendName" />
                </div>
              </div>
            </div>
            <div class="col full-width q-my-xs" v-if="obj.Type == 'count-select'">
              <div class="q-mt-xs">
                <div class="col q-mr-xs  ">
                  <select class="criteria-box w9R "  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
                    <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                      {{opt}}
                    </option>
                  </select>
                </div>
                <div class="q-mx-xs  q-ml-md">
                  <input class="input-box w4R" />
                </div>
                <div class="q-mx-xs  " v-if="event[mappingDict[event.event]][key][obj.name] == 'Between' || event[mappingDict[event.event]][key][obj.name] == 'Not Between'" >
                  <span class="q-mx-xs">and </span>
                  <input class="input-box w4R" />
                </div>
              </div>
            </div>
            <div class="col full-width q-my-xs" v-if="obj.Type == 'day-between'">
              <div class="q-mt-xs">
                <div class="q-mr-xs">
                  <span class="q-mr-xs"> Between </span>
                  <input class="input-box  w4R q-mr-xs" />
                </div>
                <div class=" ">
                  <span class=""> day</span>
                  <select class="criteria-box  w9R" v-model="event[mappingDict[event.event]][key].daytypeOpt1" v-on:change="sendName">
                    <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                      {{opt}}
                    </option>
                  </select>
                </div>
                <div class="q-mr-xs">
                  <span class="q-mr-xs"> and </span>
                  <input class="input-box w4R q-mr-xs" />
                </div>
                <div class="">
                  <span class=""> day</span>
                  <select class="criteria-box  w9R" v-model="event[mappingDict[event.event]][key].daytypeOpt2" v-on:change="sendName">
                    <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                      {{opt}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col full-width q-my-xs" v-if="obj.Type == 'date-between'">
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
            <div class="col full-width q-my-xs"  v-if="obj.Type == 'checkbox'">
             {{event[mappingDict[event.event]][key].Label}}<q-checkbox :label="obj.Label"  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName" checked/>
            </div>
            <div class="col full-width q-my-xs" v-if="obj.Type == 'number'">
              <div class="row">
                <div class="">
                  <input class="input-box w4R"  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:keyup="sendName"/>
                </div>
              </div>
            </div>
            <div class="col full-width q-my-xs" v-if="obj.Type == 'single-select'">
              <div class="row" v-if="key != 'ConditionType' && key != 'ProviderSpecialty'">
                <div class="">
                  <select class="criteria-box w9R"  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
                    <option  v-for="(opt,val) in obj.value" v-bind:key="val" :value="val">
                      {{opt}}
                    </option>
                  </select>
                </div>
              </div>
              <div v-if="key == 'ConditionType' || key == 'ProviderSpecialty'">
                  <input class="criteria-box w9R" list="key" name="typecon" v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
                  <datalist id="key" >
                    <option v-for="(opt,val) in obj.value" v-bind:key="val" :value="val">
                      {{opt}}
                    </option>
                  </datalist>
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
import {
  QCheckbox,
  QDate,
  QIcon,
  QCard,
  QPopupProxy,
  QBtnDropdown,
  ClosePopup,
  QDialog
} from 'quasar'
export default {
  name: 'eventAttributes',
  components: {
    QDate,
    QIcon,
    QCard,
    QPopupProxy,
    QCheckbox,
    QBtnDropdown,
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
      shape: 'include',
      limit: true,
      sdate: '2019/02/01',
      edate: '2019/02/01',
      returnData: [],
      name1: '',
      orderToShow: [
        'listDiagnosis',
        'listProcedures',
        'listDrugs',
        'OccurenceLimit',
        'Occurrence',
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
          })
          that.event[that.mappingDict[that.event.event]][that.currentKey].inputs[that.currentIndex].value[JSON.stringify(resultArray)] = row.codeset_name
          that.renderComponent1 = false
          setTimeout(function () {
            that.$nextTick(() => {
              // Add the component back in
              that.renderComponent1 = true
            })
          }, 100)
          that.$q.loading.hide()
        }).catch(function () {
          that.$q.loading.hide()
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
    makeSelected (key, obj, name) {
      var that = this
      that.event[that.mappingDict[that.event.event]][key][obj.name] = name
      that.renderComponent1 = false
      setTimeout(function () {
        that.$nextTick(() => {
          // Add the component back in
          that.renderComponent1 = true
        })
      }, 100)
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
