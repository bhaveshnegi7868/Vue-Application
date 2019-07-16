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
      <div class="row q-mx-lg q-my-sm" v-for="obj in apiData[event.event]" v-bind:key="obj.Label">
        <div class="row full-width q-my-sm" v-if="obj.Type == 'text'">
          {{obj.Label}}
          <input class="input-box full-width" v-model="returnData[obj.Label]"/>
        </div>
        <div class="full-width q-my-sm" v-if="obj.Type == 'multiple-select'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row q-mt-xs">
            <div class="col-5 q-mr-xs ">
               <select class="criteria-box w9R " v-model="event[obj.name]" v-on:change="sendName">
                 <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                   {{opt}}
                 </option>
               </select>
            </div>
          </div>
        </div>
        <div class="full-width q-my-sm" v-if="obj.Type == 'single-select'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row q-mt-xs">
            <div class="col-10 q-mr-xs ">
              <q-select class="w25R" filled v-model="event[obj.name]" v-on:change="sendName" multiple :options="obj.value" counter hint="With counter" style="width: 250px"
              ></q-select>
            </div>
          </div>
        </div>
        <div class=" full-width q-my-sm" v-if="obj.Type == 'count'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row q-mt-xs">
            <div class="col-5 q-mr-xs ">
              <select class="criteria-box w9R " v-model="event[obj.name]" v-on:change="sendName">
                <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                  {{opt}}
                </option>
              </select>
            </div>
            <div class="col q-mx-xs  q-ml-md">
              <input class="input-box full-width" v-model="event.count[obj.name]" v-on:keyup="sendName" />
            </div>
          </div>
        </div>
        <div class="full-width q-my-sm" v-if="obj.Type == 'count-select'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row q-mt-xs">
            <div class="col-4 q-mr-xs  ">
              <select class="criteria-box full-width "  v-model="event[obj.name]" v-on:change="sendName">
                <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                  {{opt}}
                </option>
              </select>
            </div>
            <div class="q-mx-xs  q-ml-md">
              <input class="input-box w4R" />
            </div>
            <div class="q-mx-xs  " v-if="event[obj.name] == 'Between' || event[obj.name] == 'Not Between'" >
              <span class="q-mx-xs">and </span>
              <input class="input-box w4R" />
            </div>
          </div>
        </div>
        <div class="full-width q-my-sm" v-if="obj.Type == 'day-between'">
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
              <select class="criteria-box  " v-model="event.daytypeOpt1" v-on:change="sendName">
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
              <select class="criteria-box  " v-model="event.daytypeOpt2" v-on:change="sendName">
                <option v-for="opt in obj.value" v-bind:key="opt" :value="opt">
                  {{opt}}
                </option>
              </select>
            </div>
          </div>
        </div>
        <div class="full-width q-my-sm" v-if="obj.Type == 'date-between'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row q-mt-xs">
            <div class=" q-mr-xs ">
            <select class="criteria-box  w9R"  v-model="event[obj.name]" v-on:change="sendName" >
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
            <div class=" datepckr q-ml-sm" v-if="event[obj.name] == 'Between' || event[obj.name] == 'Not Between'">
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
        <q-checkbox :label="obj.Label"  v-model="event[obj.name]" v-on:change="sendName" left-label q-my-xs  v-if="obj.Type == 'checkbox'"/>
        <div class=" full-width q-my-xs" v-if="obj.Type == 'number'">
          <div class="row">
            {{obj.Label}}
            <div class=" q-mx-md">
              <input class="input-box w4R"  v-model="event.countNumberType" v-on:keyup="sendName"/>
            </div>
            <div class=" q-mx-xs ">
              <select class="criteria-box w9R "  v-model="event[obj.name]" v-on:change="sendName">
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
import diagnosisData from '../json/diagnosis.json'
import procedureData from '../json/procedure.json'
import treatementData from '../json/treatement.json'
import {
  QCheckbox,
  QDate,
  QInput,
  QIcon,
  QSelect,
  QPopupProxy
} from 'quasar'
export default {
  name: 'eventAttributes',
  components: {
    QDate,
    QIcon,
    QInput,
    QSelect,
    QPopupProxy,
    QCheckbox
  },
  data () {
    return {
      apiData: {
        'Procedure': procedureData,
        'Diagnosis': diagnosisData,
        'Treatement': treatementData
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
