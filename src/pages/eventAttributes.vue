<template>
  <div class="q-ma-sm">
    <div class="EventList_header">
      Event Attributes - {{event.event}}
    </div>
    <div class="row q-ma-lg">
      Name:
      <input class="input-box full-width" v-model="event.name" v-on:keyup="sendName" />
    </div>
    <div class="attributeDiv" v-if="event != ''">
      <div class="row q-mx-lg q-my-sm" v-for="obj in apiData[event.event]" v-bind:key="obj.Label">
        <div class="row full-width" v-if="obj.Type == 'text'">
          {{obj.Label}}
          <input class="input-box full-width" v-model="returnData[obj.Label]"/>
        </div>
        <div class="full-width" v-if="obj.Type == 'multiple-select'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row ">
            <div class="col-6">
              <select class="full-width select-box" />
            </div>
            <div class="col">
              <q-radio val="line" label="include" />
            </div>
            <div class="col">
              <q-radio val="rectangle" label="exclude" />
            </div>
          </div>
        </div>
        <div class="full-width" v-if="obj.Type == 'single-select'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row">
            <div class="col-6">
              <select class="full-width select-box" />
            </div>
          </div>
        </div>
        <div class=" full-width" v-if="obj.Type == 'count'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row">
            <div class="col-6">
              <select class="full-width select-box" />
            </div>
            <div class="col q-ml-md">
              <input class="input-box full-width" />
            </div>
          </div>
        </div>
        <div class="full-width" v-if="obj.Type == 'count-select'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row">
            <div class="col-6 ">
              <select class="full-width select-box" />
            </div>
            <div class="col q-ml-md">
              <input class="input-box full-width" />
            </div>
            <div class="col q-ml-md">
              <input class="input-box full-width" />
            </div>
          </div>
        </div>
        <div class="full-width" v-if="obj.Type == 'date-between'">
          <div class="row">
            {{obj.Label}}
          </div>
          <div class="row">
            <div class="col-6">
              <select class="full-width select-box" />
            </div>
            <div class="col q-ml-md">
              <q-icon name="event" class="cursor-pointer date-select">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </div>
            <div class="col q-ml-md">
              <q-icon name="event" class="cursor-pointer date-select">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="date" @input="() => $refs.qDateProxy.hide()" />
                </q-popup-proxy>
              </q-icon>
            </div>
          </div>
        </div>
        <q-checkbox :label="obj.Label" left-label  v-if="obj.Type == 'checkbox'"/>
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
  QRadio,
  QDate,
  QIcon,
  QPopupProxy
} from 'quasar'
export default {
  name: 'eventAttributes',
  components: {
    QDate,
    QIcon,
    QRadio,
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
