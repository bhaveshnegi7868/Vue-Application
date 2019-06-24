<template>
  <q-toolbar class="secondary-header row justify-between">
    <div class="col q-pa-md Cohort-Name">
      {{cohart_name}}
    </div>
    <div class="col-2" v-for="path in paths" :key="path">
      <q-btn no-caps class="Rectangle-199 selected q-ml-lg" v-if="path == selectedPage">
        <label class="sub-level-menus-labels">{{path}}</label>
      </q-btn>
      <q-btn no-caps class="Rectangle-199 q-ml-lg" v-if="path != selectedPage">
        <label no-caps class="sub-level-menus-labels">{{path}}</label>
      </q-btn>
    </div>
    <div class="col">
    </div>
  </q-toolbar>
</template>
<script type="text/javascript">
export default {
  name: 'secondaryHeader',
  components: {
  },
  data () {
    return {
      paths: [
        'Cohort Definition',
        'Summary'
      ]
    }
  },
  props: {
    'selectedPage': String,
    'cohart_name': String
  },
  created () {
    console.log(this.selectedPage)
  }
}
</script>
