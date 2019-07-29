<template>
  <div class="q-ma-sm">
    <div class="EventList_header">
      Event Attributes {{event.event?'-':''}} {{event.event}}
    </div>
    <div v-if="event != ''" class="row q-mx-lg q-my-sm">
      Name:
      <input class="input-box full-width" v-model="event.name" v-on:keyup="sendName" />
    </div>
    <div class="attributeDiv" v-if="event != ''">
        <div class="row" v-for="(localObj,key) in event[mappingDict[event.event]]" v-bind:key="key">
          <div class="col-3 q-mx-lg q-my-sm q-pa-sm">
            {{localObj.Label}}
          </div>
          <div class="col row q-mx-lg q-my-sm" v-for="(obj,index) in localObj.inputs" v-bind:key="index">
            <q-btn-dropdown
                  flat
                  class="full-width select-box"
                  :label="localObj.Label"
                  v-if="obj.Type == 'multiple-select-dropdown'"
                >
                <q-btn
                  color="primary"
                  class="full-width"
                  icon-right="add"
                  label="Import"
                  @click="openImportCodesetPopupFun(obj.value)"
                  v-close-popup
                />
                <div  class="bg-secondary text-white selected-btn-dropdown full-width">
                  {{event[mappingDict[event.event]][key][obj.name]}}
                </div>
                <div class="options-values" v-for="opt in obj.value" v-bind:key="opt" @click="event[mappingDict[event.event]][key][obj.name] = opt">
                  {{opt}}
                </div>
            </q-btn-dropdown>
            <div class="col full-width q-my-sm" v-if="obj.Type == 'multiple-select'">
              <div class="q-mt-xs">
                <div class="q-mr-xs">
                   <select class="criteria-box w9R " v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
                     <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                       {{opt}}
                     </option>
                   </select>
                </div>
              </div>
            </div>
            <div class="col datepckr q-ml-sm" v-if="obj.Type == 'date'">
              <q-input class="w7R" filled v-model="event[mappingDict[event.event]][key][obj.name]" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy :ref="obj.name" transition-show="scale" transition-hide="scale">
                      <q-date v-model="event[mappingDict[event.event]][key][obj.name]" @input="hideProxy(obj.name)"></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class="col full-width q-my-sm" v-if="obj.Type == 'text'">
              <input class="input-box full-width" v-model="event[mappingDict[event.event]][key][obj.name]"/>
            </div>
            <div class="col full-width q-my-sm" v-if="obj.Type == 'count'">
              <div class="row q-mt-xs">
                <div class="col q-mr-xs ">
                  <select class="criteria-box w9R " v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
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
            <div class="col full-width q-my-sm" v-if="obj.Type == 'count-select'">
              <div class="q-mt-xs">
                <div class="col q-mr-xs  ">
                  <select class="criteria-box full-width "  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
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
            <div class="col full-width q-my-sm" v-if="obj.Type == 'day-between'">
              <div class="q-mt-xs">
                <div class="q-mr-xs">
                  <span class="q-mr-xs"> Between </span>
                  <input class="input-box  w4R q-mr-xs" />
                </div>
                <div class="q-mr-xs ">
                  <span class="q-mr-xs"> day</span>
                  <select class="criteria-box  " v-model="event[mappingDict[event.event]][key].daytypeOpt1" v-on:change="sendName">
                    <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                      {{opt}}
                    </option>
                  </select>
                </div>
                <div class="q-mr-xs">
                  <span class="q-mr-xs"> and </span>
                  <input class="input-box w4R q-mr-xs" />
                </div>
                <div class="q-mr-xs ">
                  <span class="q-mr-xs"> day</span>
                  <select class="criteria-box  " v-model="event[mappingDict[event.event]][key].daytypeOpt2" v-on:change="sendName">
                    <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                      {{opt}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
            <div class="col full-width q-my-sm" v-if="obj.Type == 'date-between'">
              <div class="q-mt-xs">
                <div class=" q-mr-xs ">
                <select class="criteria-box  w9R"  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName" >
                  <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                    {{opt}}
                  </option>
                </select>
                </div>
                <div class=" datepckr q-ml-sm" v-if="event[obj.name] == 'Between' || event[obj.name] == 'Not Between'">
                  <q-input class="w7R" filled v-model="edate" mask="date" :rules="['date']">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                          <q-date v-model="event[mappingDict[event.event]][key][obj.name]" @input="() => $refs.qDateProxy.hide()" ></q-date>
                        </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
              </div>
            </div>
            <q-checkbox :label="obj.Label"  v-model="event[obj.name]" v-on:change="sendName" left-label q-my-xs  v-if="obj.Type == 'checkbox'"/>
            <div class="col full-width q-my-xs" v-if="obj.Type == 'number'">
              <div class="row">
                <div class=" q-mx-md">
                  <input class="input-box w4R"  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:keyup="sendName"/>
                </div>
              </div>
            </div>
            <div class="col full-width q-my-xs" v-if="obj.Type == 'single-select'">
              <div class="row">
                <div class=" q-mx-xs ">
                  <select class="criteria-box w9R "  v-model="event[mappingDict[event.event]][key][obj.name]" v-on:change="sendName">
                    <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                      {{opt}}
                    </option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <q-dialog
         v-model="openImportCodesetPopup" no-backdrop-dismiss
         full-width
       >
       <q-card>
        <list-codeset :allowImport="true" @addImports="addImportData"></list-codeset>
       </q-card>
    </q-dialog>
  </div>
</template>
<script>
import listCodeset from 'pages/listCodeset'
import {
  QCheckbox,
  QDate,
  QInput,
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
    QInput,
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
      openImportCodesetPopup: false,
      shape: 'include',
      limit: true,
      sdate: '2019/02/01',
      edate: '2019/02/01',
      returnData: [],
      name1: ''
    }
  },
  methods: {
    addImportData (data) {
      var that = this
      data.forEach(function (row) {
        that.currentValueObject.push(row.Codesetname1)
      })
      this.openImportCodesetPopup = false
    },
    openImportCodesetPopupFun (array) {
      this.currentValueObject = array
      this.openImportCodesetPopup = false
      this.openImportCodesetPopup = true
    },
    sendName (event) {
      var that = this
      this.$emit('inputChange', that.event)
    },
    hideProxy (prox) {
      debugger
      this.$refs[prox][0].hide()
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
