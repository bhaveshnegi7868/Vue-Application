<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar class="Top---Menu-Bar pad10LR q-pa-xs">
        <q-toolbar-title>
            <div class="headerLeft">
                <img src="../statics/imgs/logo.png" class="logo">
            </div>

            <div class="headerRight">
                <div class="TopMenu">
                  <span class="Cohorts q-ml-sm">Cohort</span>
                  <span class="Code-Group q-ml-lg">Code-Group</span>
                </div>

                <img src="../statics/imgs/Settings.png" class="Setting">
                <div class="row">
                  <div class="col">
                    <img src="../statics/imgs/userIcon.png" class="userIcon">
                  </div>
                  <div class="col">
                    <span class="userName">John Doe</span>
                  </div>
                </div>
            </div>
        </q-toolbar-title>
      </q-toolbar>
      <q-toolbar class="secondary-header row justify-between">
        <div class="col Cohort-Name">
        </div>
        <div class="col">
          <q-btn class="Rectangle-199 selected q-ml-lg ">
            <label class="sub-level-menus-labels">Cohort Definition</label>
          </q-btn>
          <q-btn class="Rectangle-199 q-ml-lg">
            <label class="sub-level-menus-labels">Summary</label>
          </q-btn>
        </div>
        <div class="col">
        </div>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
