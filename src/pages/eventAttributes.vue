<template>
  <div class="q-ma-sm">
    <div class="EventList_header f12">
      Event Attributes {{event.event?'-':''}} {{event.event}}
    </div>
    <div v-if="event != ''" class="row q-mx-lg q-my-sm">
      Name:
      <input class="input-box full-width" v-model="event.name" v-on:keyup="sendName" />
    </div>
    <div class="attributeDiv" v-if="event != ''">
      <div class="row q-mx-lg q-my-sm" v-for="obj in apiData[event.event]" v-bind:key="obj.Label">
        <div class="row full-width q-my-xs" v-if="obj.Type == 'text'">
          {{obj.Label}}
          <input class="input-box full-width" v-model="returnData[obj.Label]"/>
        </div>
        <div class="full-width q-my-xs" v-if="obj.Type == 'multiple-select'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row q-mt-xs">
            <div class="col-5 q-mr-xs ">
               <select class="criteria-box w9R " v-model="obj.name">
                 <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                   {{opt}}
                 </option>
               </select>
            </div>
            <div class="col q-mx-xs  q-mx-sm">
              <q-radio dense v-model="shape" val="exclude" label="exclude" ></q-radio>
            </div>
            <div class="col q-mx-xs  q-mx-xs">
              <q-radio dense v-model="shape" val="include" label="include" ></q-radio>
            </div>
          </div>
        </div>
        <div class="full-width q-my-xs" v-if="obj.Type == 'single-select'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row q-mt-xs">
            <div class="col-5 q-mr-xs ">
               <select class="criteria-box w9R " v-model="obj.name">
                 <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                   {{opt}}
                 </option>
               </select>
            </div>
          </div>
        </div>
        <div class=" full-width q-my-xs" v-if="obj.Type == 'count'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row q-mt-xs">
            <div class="col-5 q-mr-xs ">
              <select class="criteria-box w9R " v-model="obj.name">
                <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                  {{opt}}
                </option>
              </select>
            </div>
            <div class="col q-mx-xs  q-ml-md">
              <input class="input-box full-width" />
            </div>
          </div>
        </div>
        <div class="full-width q-my-xs" v-if="obj.Type == 'count-select'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row q-mt-xs">
            <div class="q-mr-xs  ">
              <select class="criteria-box w9R " v-model="obj.name">
                <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                  {{opt}}
                </option>
              </select>
            </div>
            <div class="q-mx-xs  q-ml-sm">
              <input class="input-box w4R" />
            </div>
            <div class="q-mx-xs  q-ml-sm" v-if="obj.name == 'Between' || obj.name == 'Not Between'" >
              <span class="q-mr-sm">and </span>
              <input class="input-box w4R" />
            </div>
          </div>
        </div>
        <div class="full-width q-my-xs" v-if="obj.Type == 'day-between'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row q-mt-xs">
            <div class="q-mr-xs">
              <span class="q-mr-xs"> Between </span>
              <input class="input-box  w4R q-mr-xs" />
            </div>
            <div class="q-mr-xs ">
              <span class="q-mr-xs"> day</span>
              <select class="criteria-box  " v-model="obj.data.daytypeOpt1">
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
              <select class="criteria-box  " v-model="obj.data.daytypeOpt2">
                <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                  {{opt}}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="full-width q-my-xs" v-if="obj.Type == 'date-between'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row q-mt-xs">
            <div class=" q-mr-xs ">
            <select class="criteria-box  w9R" v-model="obj.data.type" >
              <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                {{opt}}
              </option>
            </select>
            </div>
            <div class=" datepckr q-ml-sm">
              <q-input class="w7R" filled v-model="sdate" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
            <div class=" datepckr q-ml-sm" v-if="obj.data.type == 'Between' || obj.data.type == 'Not Between'">
              <q-input class="w7R" filled v-model="edate" mask="date" :rules="['date']">
                <template v-slot:append>
                  <q-icon name="event" class="cursor-pointer">
                    <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                      <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" ></q-date>
                    </q-popup-proxy>
                  </q-icon>
                </template>
              </q-input>
            </div>
          </div>
        </div>
        <q-checkbox :label="obj.Label" v-model="limit" class="f10" left-label  v-if="obj.Type == 'checkbox'"/>
        <div class=" full-width q-my-xs" v-if="obj.Type == 'number'">
          <div class="row ">
            {{obj.Label}}
          </div>
          <div class="row q-mt-xs">
            <div class=" q-mr-xs">
              <input class="input-box w4R" />
            </div>
            <div class=" q-mx-xs ">
              <select class="criteria-box w9R " v-model="obj.name">
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
</template>
<script>
import listCodeset from 'pages/listCodeset'
import axios from 'axios'
import {
  QCheckbox,
  QRadio,
  QDate,
  QInput,
  QIcon,
  QPopupProxy
} from 'quasar'
export default {
  name: 'eventAttributes',
  components: {
    QDate,
    QIcon,
    QInput,
    QRadio,
    QPopupProxy,
    QCheckbox
  },
  data () {
    return {
      apiData: {
        'Procedure': procedureData,
        'Diagnosis': diagnosisData,
        'Treatment': treatmentData
      },
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
        var url = process.env.API_URL + 'codeset/get/' + row.codeset_id
        that.$q.loading.show({
          spinnerSize: 140,
          message: 'Getting Data For Codeset ' + row.codeset_name,
          messageColor: 'black'
        })
        axios.get(url).then(function (response) {
          response.data.codeset_data.forEach(function (row1) {
            that.event[that.mappingDict[that.event.event]][that.currentKey].inputs[that.currentIndex].value[row1.target_concept_id] = row1.target_concept_id
          })
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
      this.$emit('inputChange', that.event)
    }
    /**
    * Given a generator function, this component's inputValue is set
    * to the return value of the generator.
    *
    * @param Function
    **/
  },
  props: {
    'event': Object
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
