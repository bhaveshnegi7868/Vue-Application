<template>
  <div class="filtersList">
    <div class="row" v-for="(key,filter,index) in selectedFilters" :key="filter">
      <div v-for="(row,value) in key" :key="value">
        <div class="a-chip " v-if="row">
          <span class="a-chip-head" :class="'filtrC' +(index+1)">{{ filter.substring(0,1).toUpperCase() }}</span>
        {{value}}
          <q-btn class="q-pl-none q-ml-xs q-pr-xs float-right f8" icon="cancel" flat rounded  @click="removeFilter(filter,value)"/>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'appliedFilters',
  props: {
    selectedFilters: Object
  },
  methods: {
    removeFilter (filter, value) {
      this.selectedFilters[filter][value] = false
      this.$emit('selectedChange', this.selectedFilters)
    }
  }
}
</script>
