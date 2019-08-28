<template>
  <q-toolbar class="secondary-header row justify-between">
    <div class="col-4 q-pa-md Cohort-Name">
      {{cohort_name}}
    </div>
    <div class="" v-for="path in paths" :key="path">
      <div class="col-4 q-px-auto ">
        <q-item no-caps class="Rectangle-199 h35  q-ml-lg" v-bind:class="{'selected': path == selectedPage}" v-if="path != 'Summary'">
          <router-link class="textDecorNone" to="/cohort/create"><label class="sub-level-menus-labels">{{path}}</label></router-link>
        </q-item>
        <q-item no-caps class="Rectangle-199 h35 q-ml-lg" v-bind:class="{'selected': path == selectedPage}" v-if="path == 'Summary'">
          <router-link class="textDecorNone" to="/cohort/summary"><label no-caps class="sub-level-menus-labels">{{path}}</label></router-link>
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
