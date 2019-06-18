<template>
  <div class="col">
  </div>
</template>
<script>
import {
  QInput
} from 'quasar'
export default {
  QInput,
  name: 'criteriaSetDetails',
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
    'componentclasses': String,
    'cdesc': String,
    'cname': String
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
