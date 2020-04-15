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
          tick-strategy="leaf"
          :ticked.sync="tickedValues"
          :expanded.sync="expandedValues"
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
import {
  QCard,
  QTree
} from 'quasar'
export default {
  name: 'dependentsCodes',
  components: {
    QCard,
    QTree
  },
  props: {
    'desendents': Array,
    'ticked': Array,
    'expanded': Array
  },
  data () {
    return {
      tickedValues: [],
      expandedValues: [],
      finalValues: []
    }
  },
  methods: {
    sendName (event) {
      var that = this
      that.expanded = that.expandedValues
      that.ticked = that.tickedValues
      console.log(that.expandedValues)
      console.log(that.tickedValues)
      that.finalValues = that.tickedValues.concat(that.expandedValues)
      console.log(that.finalValues)
      this.$emit('updateDependents', that.finalValues)
    }
  }
}
</script>
