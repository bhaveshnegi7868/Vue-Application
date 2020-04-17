<template>
  <div class="row codeSetPage">
  <div class="col-12">
    <div class="q-my-md q-ml-md q-mr-xs searchCodesetHeader">Descendants</div>
  </div>
    <q-card class="q-pa-md q-mx-auto">

      <div class="row justify-center">
        <q-tree
          :nodes="desendents"
          node-key="Code"
          tick-strategy="strict"
          tick-sub-strategy="leaf"
          :ticked.sync="tickedValues"
          :expanded.sync="expandedValues"
          :selected.sync="selectedValues"
          default-expand-all
        >
          <template v-slot:default-header="prop">
            <q-card class="q-pa-md unselected-card">
              {{prop.node.Code}} | {{prop.node.Name}}
            </q-card>
          </template>
        </q-tree>
      </div>

    </q-card>
    <div class="footer">
        <q-btn  class="q-ma-md" color="theamBlue" label="Save" @click="sendName"></q-btn>
      </div>
  </div>
</template>

<script>

import { QTree as QTreeBase } from 'quasar'

const QTree = {
  mixins: [ QTreeBase ],
  props: {
    tickSubStrategy: {
      type: String,
      default: 'none',
      validator: v => ['leaf'].includes(v)
    }
  },
  methods: {
    __onTickedClick (meta, state) {
      if (meta.indeterminate === true) {
        state = meta.indeterminateNextState
      }
      if (meta.strictTicking) {
        const keys = []
        if (this.tickSubStrategy === 'leaf') {
          const travel = meta => {
            if (meta.isParent) {
              keys.push(meta.key)
              meta.children.forEach(travel)
            } else if (
              meta.noTick !== true &&
              meta.tickable === true &&
              (meta.leafFilteredTicking !== true || meta.matchesFilter === true)
            ) {
              keys.push(meta.key)
            }
          }
          travel(meta)
        } else {
          keys.push(meta.key)
        }
        this.setTicked(keys, state)
      } else if (meta.leafTicking) {
        const keys = []
        const travel = meta => {
          if (meta.isParent) {
            if (state !== true && meta.noTick !== true && meta.tickable === true) {
              keys.push(meta.key)
            }
            if (meta.leafTicking === true) {
              meta.children.forEach(travel)
            }
          } else if (
            meta.noTick !== true &&
            meta.tickable === true &&
            (meta.leafFilteredTicking !== true || meta.matchesFilter === true)
          ) {
            keys.push(meta.key)
          }
        }
        travel(meta)
        this.setTicked(keys, state)
      }
    }
  }
}

export default {
  name: 'dependentsCodes',
  components: {
    QTree
  },
  props: {
    'desendents': Array,
    'ticked': Array,
    'expanded': Array,
    'selected': Array
  },
  data () {
    return {
      tickedValues: this.ticked,
      expandedValues: [],
      selectedValues: []
    }
  },
  methods: {
    sendName () {
      var that = this
      this.$emit('updateDependents', that.tickedValues)
    }
  }
}
</script>
