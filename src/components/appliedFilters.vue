<template>
  <div class="filtersList">
    <div class="row" v-for="(key,filter) in selectedFilters" :key="filter">
      <div v-for="(row,value) in key" :key="value">
        <label class="a-chip" v-if="row">
          <span class="a-chip-head">{{ filter.substring(0,1).toUpperCase() }}</span>
          {{value}}
        </label>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'appliedFilters',
  props: {
    selectedFilters: Object
  }
}
</script>
