<template>
  <q-toolbar class="secondary-header row justify-between">
    <div class="col-4 q-pa-md Cohort-Name">
      {{cohort_name.cohort_name}}
    </div>
    <div class="" v-for="path in paths()" :key="path">
      <div class="col-4 q-px-auto">
        <q-item no-caps class="Rectangle-199 h35  q-ml-lg" v-bind:class="{'selected': path == selectedPage}" v-if="path == 'Analysis Definition'">
          <router-link class="textDecorNone" v-bind:class="{'disabled': !cohort_name.cohort_id}" :to="(!cohort_name.cohort_id?'':'/cohort/update/analysis' + cohort_name.cohort_id)"><label class="sub-level-menus-labels" style="cursor: pointer !important">{{path}}</label></router-link>
        </q-item>
        <q-item no-caps class="Rectangle-199 h35 q-ml-lg" v-bind:class="{'selected': path == selectedPage}" v-if="path == 'back'">
          <div class="textDecorNone" v-bind:class="{'disabled': !cohort_name.cohort_id}" v-on:click="doSomething()"><label no-caps class="sub-level-menus-labels" style="cursor: pointer !important">Analysis Definition</label></div>
        </q-item>
        <q-item no-caps class="Rectangle-199 h35 q-ml-lg" v-bind:class="{'selected': path == selectedPage}" v-if="path == 'Analysis Summary'">
          <router-link class="textDecorNone" v-bind:class="{'disabled': !cohort_name.cohort_id}" :to="(!cohort_name.cohort_id ?'':'/cohort/summary/analysis/' + cohort_name.cohort_id)"><label no-caps class="sub-level-menus-labels" style="cursor: pointer !important">{{path}}</label></router-link>
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
          return ['back', 'Analysis Summary']
        }
        return [
          'Analysis Definition',
          'Analysis Summary'
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
      var that = this
      that.$router.push('/cohort/update/analysis/' + that.cohort_name.cohort_id)
      return [
        'Analysis Definition',
        'Analysis Summary'
      ]
      // window.history.back()
    }
  }
}
</script>
