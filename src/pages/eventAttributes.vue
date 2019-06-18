<template>
  <div class="height-700">
    <div class="EventList_header">
      Event Attributes - {{event}}
    </div>
    <div class="row q-ma-lg" v-for="obj in apiData[event]" v-bind:key="obj.Label">
      <div class="row full-width" v-if="obj.Type == 'text'">
        <q-input filled outlined :placeholder="obj.Label" class="full-width" />
      </div>
      <div class="row full-width" v-if="obj.Type == 'multiple-select'">
        <div class="col-6" >
          <q-select filled outlined :label="obj.Label" class="full-width"/>
        </div>
        <div class="col">
          <q-radio v-model="shape" val="line" label="include" />
        </div>
        <div class="col">
          <q-radio v-model="shape" val="rectangle" label="exclude" />
        </div>
      </div>
      <div class="row full-width" v-if="obj.Type == 'single-select'">
        <div class="col-6" >
          <q-select filled outlined :label="obj.Label" class="full-width"/>
        </div>
      </div>
      <div class="row full-width" v-if="obj.Type == 'count'">
        <div class="col-9" >
          <q-select filled outlined :label="obj.Label" class="full-width" />
        </div>
        <div class="col-3">
          <q-input filled outlined class="full-width" />
        </div>
      </div>
      <div class="row full-width" v-if="obj.Type == 'count-select'">
        <div class="col-6" >
          <q-select filled outlined :label="obj.Label" class="full-width" />
        </div>
        <div class="col">
          <q-input filled outlined class="full-width" />
        </div>
        <div class="col">
          <q-input filled outlined class="full-width" />
        </div>
      </div>
      <div class="row full-width" v-if="obj.Type == 'date-between'">
        <div class="col-6" >
          <q-select filled outlined :label="obj.Label" class="full-width" />
        </div>
        <div class="col">
          <q-input filled v-model="date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
        <div class="col">
          <q-input filled v-model="date" mask="date" :rules="['date']">
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>
      </div>
      <q-checkbox :label="obj.Label" left-label  v-if="obj.Type == 'checkbox'"/>
    </div>
    <!-- <div class="row q-ma-lg">
      <q-select filled outlined label="Diagnosis Code Group" class="full-width" />
    </div>
    <div class="row q-ma-lg">
    </div>
    <div class="row q-ma-lg">
      <div class="col-9">
        <q-select filled outlined label="Age Of Occurences" class="full-width" />
      </div>
      <div class="col-3">
        <q-input filled outlined class="full-width" />
      </div>
    </div>
    <div class="row q-ma-lg">
      <q-select filled outlined label="Gender" class="full-width" />
    </div>
    <div class="row q-ma-lg">
      <q-select filled outlined label="Visit Type" class="full-width" />
    </div>
    <div class="row q-ma-lg">
      <q-checkbox v-model="orange" label="Limit Only To First Occurences" left-label/>
    </div> -->
  </div>
</template>
<script>
import diagnosisData from '../json/diagnosis.json'
import procedureData from '../json/procedure.json'
import treatementData from '../json/treatement.json'
import {
  QInput,
  QSelect,
  QCheckbox,
  QRadio,
  QDate,
  QIcon,
  QPopupProxy
} from 'quasar'
export default {
  name: 'eventAttributes',
  components: {
    QInput,
    QDate,
    QIcon,
    QRadio,
    QPopupProxy,
    'q-select': QSelect,
    QCheckbox
  },
  data () {
    return {
      apiData: {
        'Procedure': procedureData,
        'Diagnosis': diagnosisData,
        'Treatement': treatementData
      }
    }
  },
  methods: {
    addEvent () {
      var that = this
      if (that.eventArray[that.selectedCriteria] && that.selectedCriteria !== 'Select Event') {
        that.eventArray[that.selectedCriteria].push(that.selectedEvent)
      } else {
        that.eventArray[that.selectedCriteria] = [that.selectedEvent]
      }
      that.selectedEvent = 'Select Event'
    }
    /**
    * Given a generator function, this component's inputValue is set
    * to the return value of the generator.
    *
    * @param Function
    **/
  },
  props: {
    'event': String
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
