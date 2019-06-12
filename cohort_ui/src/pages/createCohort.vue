<template>
  <q-page class="app-layout">
    <div class="row q-pa-lg">
        <q-card class="row col-8">
            <div class="col q-ma-sm">
                <q-input filled v-model="cname" placeholder="Cohort Name" />
            </div>
            <div class="col q-ma-sm">
                <q-input filled v-model="cdesc" placeholder="Cohort Description" />
            </div>
            <div class="col q-ma-sm">
                <q-select filled v-model="cgrp" :options="cGrpOpts" label="Cohort Group"/>
            </div>
            <div class="col q-ma-sm">
                <q-select filled v-model="cdtsource" :options="dtSourceOpts" label="Data Source"/>
            </div>
        </q-card>
        <q-card class="col-3 q-ma-sm q-pa-sm">
            <q-btn icon="img:statics/imgs/save.png" label="Save"/>
            <q-btn icon="img:statics/imgs/play.png" label="Run"/>
            <q-btn icon="img:statics/imgs/delete.png"/>
        </q-card>
    </div>
    <q-card class="row">
      <criteria-set class="col-2 q-pa-lg"></criteria-set>
      <criteria-set-details class="col-10 q-pa-lg" :cname="cname" :cdesc="cdesc"></criteria-set-details>
    </q-card>
   </q-page>
</template>

<style>
</style>

<script>
import criteriaSet from 'pages/criteriaSet'
import criteriaSetDetails from 'pages/criteriaSetDetails'
import {
  QInput,
  QCard,
  QSelect
} from 'quasar'
export default {
  name: 'createCohort',
  components: {
    QInput,
    QCard,
    QSelect,
    'criteria-set': criteriaSet,
    'criteria-set-details': criteriaSetDetails
  },
  data () {
    return {
      cname: '',
      cdesc: '',
      cgrp: '',
      cdtsource: '',
      scannedAisle: '',
      cGrpOpts: [
        { 'label': 'GRP1', 'value': 'GRP1' },
        { 'label': 'GRP2', 'value': 'GRP2' },
        { 'label': 'GRP3', 'value': 'GRP3' }
      ],
      dtSourceOpts: [
        { 'label': 'dt1', 'value': 'dt1' },
        { 'label': 'dt2', 'value': 'dt2' },
        { 'label': 'dt3', 'value': 'dt3' }
      ]
    }
  }
}
</script>
