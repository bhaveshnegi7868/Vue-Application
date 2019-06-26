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
                <q-btn
                icon="img:statics/imgs/userIcon.png"
                icon-right="more_vert"
                outline
                no-caps
                class="userName headerRight"
                label="John Doe"
                />
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
