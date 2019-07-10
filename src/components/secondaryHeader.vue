<template>
  <q-toolbar class="secondary-header row justify-between">
    <div class="col q-pa-md Cohort-Name">
      {{cohort_name}}
    </div>
    <div v-for="path in paths" :key="path">
      <div class="col-4 text-center">
        <q-item no-caps class="Rectangle-199 h40 selected q-ml-lg" v-if="path == selectedPage">
          <label class="sub-level-menus-labels">{{path}}</label>
        </q-item>
        <q-item no-caps class="Rectangle-199 h40 q-ml-lg" v-if="path != selectedPage">
          <router-link to="/summary"><label no-caps class="sub-level-menus-labels">{{path}}</label></router-link>
        </q-item>
      </div>
    </div>
    <div class="col">
    </div>
  </q-toolbar>
</template>
<script type="text/javascript">
import {
} from 'quasar'
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
    'cohort_name': String
  },
  created () {
    console.log(this.selectedPage)
  }
}
</script>
