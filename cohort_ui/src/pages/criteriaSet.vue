<template>
  <div>
    <div class="col-2 leftForm">
        <div class="categories_header">
            Criteria Set
        </div>
        <div class="header_Bor1"></div>
        <div class="categories_list">
            Initial Criteria
        </div>
        <div class="categories_Selected">
            Criteria Set 1
            <i class="fa fa-times-circle pull-right mar1"></i>
        </div>
        <q-btn class="categories_addNew full-width">
            Add New Criteria Set
        </q-btn>
    </div>
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
