<template>
  <q-toolbar class="secondary-header row justify-between">
    <div class="col-4 q-pa-md Cohort-Name">
      {{cohort_name.cohort_name}} - Analysis Data
    </div>
    <div class="" v-for="path in paths()" :key="path">
      <div class="col-4 q-px-auto">
        <q-item no-caps class="Rectangle-199 h35  q-ml-lg" v-bind:class="{'selected': path == selectedPage}" v-if="path == 'Definition'">
          <router-link class="textDecorNone" style="opacity: 1.6 !important" v-bind:class="{'disabled': (!cohort_name.cohort_id) || (pagemethod === 'view')}" :to="(!cohort_name.cohort_id?'':'/cohort/view/analysis/' + cohort_name.cohort_id)"><label class="sub-level-menus-labels" style="opacity: 1.6 !important">{{path}}</label></router-link>
        </q-item>
        <q-item no-caps class="Rectangle-199 h35 q-ml-lg" v-bind:class="{'selected': path == selectedPage}" v-if="path == 'back'">
          <div class="textDecorNone" v-bind:class="{'disabled': !cohort_name.cohort_id}" v-on:click="doSomething()"><label no-caps class="sub-level-menus-labels" style="cursor: pointer !important">Definition</label></div>
        </q-item>
        <q-item no-caps class="Rectangle-199 h35 q-ml-lg" v-bind:class="{'selected': path == selectedPage}" v-if="path == 'Summary'">
          <router-link class="textDecorNone" v-bind:class="{'disabled': !cohort_name.cohort_id}" :to="(!cohort_name.cohort_id ?'':'/cohort/summary/analysis/' + cohort_name.cohort_id)"><label no-caps class="sub-level-menus-labels" style="cursor: pointer !important">{{path}}</label></router-link>
        </q-item>
      </div>
    </div>
    <div class="col-4">
    <!-- <div v-if="pagemethod === 'update'" class="Cohort-Name" style="">
      <q-item no-caps class="float-right Rectangle-199 h35" >
          <q-btn outline rounded color="white" @click="viewAnalysis(cohort_name.cohort_id)" size="10px" text-color="white" no-caps>View Analysis</q-btn>
      </q-item>
    </div> -->
    <div class="Cohort-Name" style="" >
      <q-item no-caps class="float-right Rectangle-199 h35 q-ml-lg" >
        <router-link class="textDecorNone"  :to="(!cohort_name.cohort_id ?'':'/cohort/update/' + cohort_name.cohort_id)">
          <q-btn outline rounded color="white"  size="10px" text-color="white" no-caps>Cohort Definition</q-btn>
        </router-link>
      </q-item>
    </div>
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
        if (path.indexOf('/cohort/summary/analysis') !== -1) {
          return ['back', 'Summary']
        }
        return [
          'Definition',
          'Summary'
        ]
      }
    }
  },
  props: {
    'selectedPage': String,
    'cohort_name': Object,
    'pagemethod': Object
  },
  created () {
    console.log(this.selectedPage)
    var route = this.$route
    console.log(route.path)
  },
  methods: {
    doSomething () {
      var that = this
      that.$router.push('/cohort/view/analysis/' + that.cohort_name.cohort_id)
      return [
        'Definition',
        'Summary'
      ]
      // window.history.back()
    },
    viewAnalysis (id) {
      this.$router.push('/cohort/view/analysis/' + id)
      window.location.reload()
    }
  }
}
</script>
