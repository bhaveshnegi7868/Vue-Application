<template>
  <div>
    <div class="EventList_header">
      Event Attributes - {{event}}
    </div>
    <div class="row q-ma-lg" v-for="obj in apiData" v-bind:key="obj.Label">
      <q-input filled outlined :placeholder="obj.Label" class="full-width" v-if="obj.Type == 'text'"/>
      <q-select filled outlined :label="obj.Label" class="full-width"  v-if="obj.Type == 'multiple'"/>
      <div class="row full-width" v-if="obj.Type == 'count'">
        <div class="col-9" >
          <q-select filled outlined :label="obj.Label" class="full-width" />
        </div>
        <div class="col-3">
          <q-input filled outlined class="full-width" />
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
import jsonData from '../json/attributes.json'
import {
  QInput,
  QSelect,
  QCheckbox
} from 'quasar'
export default {
  name: 'eventAttributes',
  components: {
    QInput,
    'q-select': QSelect,
    QCheckbox
  },
  data () {
    return {
      apiData: jsonData
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
