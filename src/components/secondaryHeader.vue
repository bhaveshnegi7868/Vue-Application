<template>
  <q-toolbar class="secondary-header row justify-between">
    <div class="col-4 q-pa-md Cohort-Name">
      {{cohort_name.cohort_name}}
      {{cohort_name.cohort_status}}
    </div>
    <div class="" v-for="path in paths()" :key="path">
      <div class="col-4 q-px-auto">
        <q-item no-caps class="Rectangle-199 h35  q-ml-lg" v-bind:class="{'selected': path == selectedPage}" v-if="path == 'Cohort Definition'">
          <router-link class="textDecorNone" v-bind:class="{'disabled': !cohort_name.cohort_id}" :to="(!cohort_name.cohort_id?'':'' + cohort_name.cohort_id)"><label class="sub-level-menus-labels" style="cursor: pointer !important">{{path}}</label></router-link>
        </q-item>
        <q-item no-caps class="Rectangle-199 h35 q-ml-lg" v-bind:class="{'selected': path == selectedPage}" v-if="path == 'back'">
          <div class="textDecorNone" v-bind:class="{'disabled': !cohort_name.cohort_id}" v-on:click="doSomething()"><label no-caps class="sub-level-menus-labels" style="cursor: pointer !important">Cohort Definition</label></div>
        </q-item>
        <q-item no-caps class="Rectangle-199 h35 q-ml-lg" v-bind:class="{'selected': path == selectedPage}" v-if="path == 'Summary'">
          <router-link class="textDecorNone" v-bind:class="{'disabled': !cohort_name.cohort_id}" :to="(!cohort_name.cohort_id ?'':'/cohort/summary/' + cohort_name.cohort_id)"><label no-caps class="sub-level-menus-labels" style="cursor: pointer !important">{{path}}</label></router-link>
        </q-item>
      </div>
    </div>
    <div v-if="cohort_name.cohort_status === 'Success' || cohort_name.status === 'Success'" class="col-4 Cohort-Name" style="margin-left: 6em;">
      <q-item v-if="cohort_name.analysis_status === null" no-caps class="float-right Rectangle-199 h35 q-ml-lg" >
        <router-link class="textDecorNone"  :to="(!cohort_name.cohort_id ?'':'/cohort/analysis/' + cohort_name.cohort_id)">
          <q-btn outline rounded color="white"  size="10px" text-color="white" no-caps>Analysis Data Definition</q-btn>
        </router-link>
      </q-item>
      <q-item v-if="cohort_name.analysis_status !== null" no-caps class="float-right Rectangle-199 h35 q-ml-lg" >
        <router-link class="textDecorNone"  :to="(!cohort_name.cohort_id ?'':'/cohort/view/analysis/' + cohort_name.cohort_id)">
          <q-btn outline rounded color="white"  size="10px" text-color="white" no-caps>Analysis Data Definition</q-btn>
        </router-link>
      </q-item>
    </div>
    <div class="col">
    </div>
  </q-toolbar>
</template>
<script type="text/javascript">
import {
} from 'quasar'
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
export default {
  name: 'secondaryHeader',
  components: {
  },
  data () {
    return {
      paths: () => {
        const path = this.$route.path
        if (path.indexOf('/cohort/summary') !== -1) {
          return ['back', 'Summary']
        }
        return [
          'Cohort Definition',
          'Summary'
        ]
      }
    }
  },
  props: {
    'selectedPage': String,
    'cohort_name': Object
  },
  created () {
    console.log(this.selectedPage)
    var route = this.$route
    console.log(route.path)
  },
  methods: {
    doSomething () {
      window.history.back()
    }
  }
}
</script>
