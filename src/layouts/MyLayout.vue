<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="Top---Menu-Bar pad10LR q-pa-xs">
        <q-toolbar-title>
            <div class="headerLeft">
                <router-link v-if="Cohorts=='Cohorts'" class="textDecorNone" to="/cohort/list"><img :src="mainLogo" class="logo"></router-link>
                <router-link v-if="Cohorts=='Code-Group'" class="textDecorNone" to="/codeset/list"><img :src="mainLogo" class="logo"></router-link>
            </div>

            <div class="headerRight">
                <div class="TopMenu">
                  <router-link class="textDecorNone" to="/cohort/list"><span :class="Cohorts" class="q-ml-sm">Cohort</span></router-link>
                  <router-link class="textDecorNone" to="/codeset/list" target="_blank"><span :class="CodeGroup" class="q-ml-lg">Codeset</span></router-link>
                </div>
                <q-btn
                  icon="img:statics/imgs/userIcon.png"
                  outline
                  no-caps
                  class="userName text-capitalize"
                  :label="$q.localStorage.getItem('username')"
                >
              </q-btn>
                <q-btn
                  icon-right="power_settings_new"
                  outline
                  no-caps
                  class="userName"
                  @click="logout"
                >
                <q-tooltip anchor="bottom middle" self="center left">
                  Logout
                </q-tooltip>
              </q-btn>
            </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import axios from 'axios'
import {
  openURL,
  QTooltip
} from 'quasar'
export default {
  components: {
    QTooltip
  },
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop,
      Cohorts: 'Cohorts',
      CodeGroup: 'Code-Group',
      toUrl: '/cohort/list',
      mainLogo: '/statics/imgs/logo.png',
      paths: [
        'Cohort Definition',
        'Summary'
      ]
    }
  },
  props: {
    'selectedPage': String
  },
  mounted () {
    var that = this
    if (!this.$q.localStorage.getItem('username')) {
      this.$router.push('/login')
    } else {
      this.$router.push('/cohort/list')
    }
    axios.defaults.headers.common = {
      Authorization: 'ApiKey ' + that.$q.localStorage.getItem('username') + ':' + that.$q.localStorage.getItem('apikey')
    }
    if (this.$route.path.indexOf('codeset') !== -1) {
      this.Cohorts = 'Code-Group'
      this.CodeGroup = 'Cohorts'
      this.toUrl = '/codeset/list'
      this.mainLogo = '/statics/imgs/group-212@3x.jpg'
    } else {
      this.Cohorts = 'Cohorts'
      this.CodeGroup = 'Code-Group'
      this.toUrl = '/cohort/list'
      this.mainLogo = '/statics/imgs/logo.png'
    }
  },
  created () {
    var that = this
    if (!this.$q.localStorage.getItem('username')) {
      this.$router.push('/login')
    } else {
      this.$router.push('/cohort/list')
    }
    axios.defaults.headers.common = {
      Authorization: 'ApiKey ' + that.$q.localStorage.getItem('username') + ':' + that.$q.localStorage.getItem('apikey')
    }
    if (this.$route.path.indexOf('codeset') !== -1) {
      this.Cohorts = 'Code-Group'
      this.CodeGroup = 'Cohorts'
      this.toUrl = '/codeset/list'
      this.mainLogo = '/statics/imgs/group-212@3x.jpg'
    } else {
      this.Cohorts = 'Cohorts'
      this.CodeGroup = 'Code-Group'
      this.toUrl = '/cohort/list'
      this.mainLogo = '/statics/imgs/logo.png'
    }
  },
  watch: {
    $route (to, from) {
      if (!this.$q.localStorage.getItem('username')) {
        this.$router.push('/login')
      } else {
        this.$router.push('/cohort/list')
      }
      if (this.$route.path.indexOf('codeset') !== -1) {
        this.Cohorts = 'Code-Group'
        this.CodeGroup = 'Cohorts'
        this.toUrl = '/codeset/list'
        this.mainLogo = '/statics/imgs/group-212@3x.jpg'
      } else {
        this.Cohorts = 'Cohorts'
        this.toUrl = '/cohort/list'
        this.CodeGroup = 'Code-Group'
        this.mainLogo = '/statics/imgs/logo.png'
      }
    }
  },
  methods: {
    openURL,
    logout: function () {
      let that = this
      let datadict = {
        'username': sessionStorage.getItem('username')
      }
      axios.post(process.env.API_URL + 'accounts/logout/', datadict).then(function (response) {
        axios.defaults.headers.common = {}
        that.$q.sessionStorage.clear()
        that.$router.push('/login')
        that.btnLoading = false
      }).catch(function (error) {
        console.log(error)
        that.$router.push('/login')
      })
    }
  }
}
</script>

<style>
</style>
