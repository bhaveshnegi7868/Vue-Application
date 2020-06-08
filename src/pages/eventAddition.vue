<template>
  <div>
    <select class="select-box class_change" v-model="selectedCriteria">
      <option disabled>Select</option>
        <option v-for="opt in criteriaArray" v-bind:key="opt.value" :value="opt">
          {{opt}}
        </option>
    </select> of the criteria
    <draggable class="list-group" :list="eventArray" group="people" v-if="selectedCriteria != 'Select'">
      <div
        class="list-group-item"
        v-for="(elementObj,index) in eventArray"
        :key="index"
      >
        <div v-if="isArray(elementObj)">
          <div
            class="list-group-item"
            v-for="(element,index1) in elementObj"
            :key="index1"
          >
            <q-btn class="full-width q-ma-sm shadow-3" align="left" no-caps @click="showAttributes(element)">
              <q-badge color="positive" class="q-ma-xs ">{{index1+1}}</q-badge>
              <label class="text-h6 q-pl-lg">{{element}}</label>
              <q-icon  class="absolute-right q-mr-lg q-mt-sm" name="cancel"/>
            </q-btn>
          </div>
        </div>
      </div>
      <select class="categories_addNew text-h6 full-width" v-model="selectedEvent" label="Select Event" @change="addEvent">
          <option disabled>Select Event</option>
          <option v-for="opt in eventArray1" v-bind:key="opt.value" :value="opt.name">
            {{opt.name}}
          </option>
      </select>
    </draggable>
  </div>

</template>
<script>
export default {
  name: 'criteriaSet',
  methods: {
    /**
    * Given a generator function, this component's inputValue is set
    * to the return value of the generator.
    *
    * @param Function
    **/
    generateValue: function (generator) {
      // set this component's value prop as result of supplied generator function
      return 1
    }
  },

  props: {
    'value': String,
    'required': Boolean,
    'disable': Boolean,
    'label': String,
    'inputclasses': String,
    'componentclasses': String
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
